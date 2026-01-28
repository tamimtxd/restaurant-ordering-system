/**
 * Kitchen Dashboard Logic - Rannaghor
 * Handles Realtime Order Monitoring and Status Updates
 */

// State
let orders = [];

// DOM Elements
const DOM = {
    lists: {
        'received': document.getElementById('list-received'),
        'preparing': document.getElementById('list-preparing'),
        'ready': document.getElementById('list-ready'),
        'served': document.getElementById('list-served')
    },
    counts: {
        'received': document.getElementById('count-received'),
        'preparing': document.getElementById('count-preparing'),
        'ready': document.getElementById('count-ready'),
        'served': document.getElementById('count-served')
    },
    totalActive: document.getElementById('totalActiveCount'),
    notificationSound: document.getElementById('orderSound'),
    connectionStatus: document.getElementById('connectionStatus')
};

/**
 * Initialize Dashboard
 */
async function init() {
    console.log('Kitchen Dashboard Initializing...');

    // Fetch initial active orders
    await fetchActiveOrders();

    // Setup Realtime Subscription
    setupRealtime();

    // Refresh elapsed time every minute
    setInterval(renderDashboard, 60000);
}

/**
 * Fetch orders that are not served yet
 */
async function fetchActiveOrders() {
    try {
        console.log('Fetching active orders...');
        const { data, error } = await supabaseClient
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50); // Get last 50 orders (includes active + recently served)

        if (error) throw error;

        // Merge keeping local updates if needed, but for kitchen usually DB is source of truth
        orders = data || [];
        renderDashboard();
    } catch (err) {
        console.error('Error fetching orders:', err.message);
    }
}

/**
 * Setup Realtime Listeners
 */
let pollingInterval = null;

function setupRealtime() {
    console.log('Setting up Realtime subscription...');

    // Cleanup existing subscription if any
    supabaseClient.removeAllChannels();

    const channel = supabaseClient
        .channel('kitchen-orders')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'orders'
        }, (payload) => {
            console.log('Realtime payload received:', payload);
            handleOrderUpdate(payload);
        })
        .subscribe((status, err) => {
            console.log('Subscription status:', status);
            updateConnectionBadge(status);

            if (status === 'SUBSCRIBED') {
                console.log('Connected to Realtime successfully');
                // Stop polling if we were fallback-ing
                if (pollingInterval) {
                    clearInterval(pollingInterval);
                    pollingInterval = null;
                }
            } else if (status === 'TIMED_OUT' || status === 'CLOSED') {
                console.warn('Realtime connection failed. Starting fallback polling...');
                if (!pollingInterval) {
                    startPollingFallback();
                }
            }
        });
}

/**
 * Fallback: Poll the database if Realtime fails
 */
function startPollingFallback() {
    if (pollingInterval) clearInterval(pollingInterval);

    console.log('Polling fallback active (fetching every 2 seconds)');
    pollingInterval = setInterval(async () => {
        await fetchActiveOrders();
    }, 2000); // 2 second refresh
}

/**
 * Update the Connection UI badge
 */
function updateConnectionBadge(status) {
    if (!DOM.connectionStatus) return;

    const dot = DOM.connectionStatus.querySelector('.status-dot');
    const text = DOM.connectionStatus.querySelector('.status-text');

    if (status === 'SUBSCRIBED') {
        DOM.connectionStatus.classList.remove('offline');
        DOM.connectionStatus.classList.add('online');
        if (text) text.textContent = 'Live';
    } else {
        DOM.connectionStatus.classList.remove('online');
        DOM.connectionStatus.classList.add('offline');
        if (text) text.textContent = 'Connecting...';
    }
}

/**
 * Handle Realtime Payloads
 */
function handleOrderUpdate(payload) {
    const eventType = payload.eventType;
    const newRecord = payload.new;
    const oldRecord = payload.old;

    if (eventType === 'INSERT') {
        // Double check it's not a 'served' order (shouldn't be, but for safety)
        if (newRecord.status === 'served') return;

        // Only add if not already in list
        const exists = orders.find(o => o.id === newRecord.id);
        if (!exists) {
            console.log('New order inserted:', newRecord);
            orders.push(newRecord);
            playNotification();
        }
    } else if (eventType === 'UPDATE') {
        console.log('Order updated:', newRecord);
        const index = orders.findIndex(o => o.id === newRecord.id);
        if (index !== -1) {
            orders[index] = newRecord;
        } else {
            // If not in our list (could be a served order we skipped previously), add it
            orders.push(newRecord);
        }
    } else if (eventType === 'DELETE') {
        console.log('Order deleted:', oldRecord);
        orders = orders.filter(o => o.id !== oldRecord.id);
    }

    renderDashboard();
}

/**
 * Render all columns
 */
function renderDashboard() {
    // Group orders by status with stable sorting
    const groups = {
        'received': orders.filter(o => o.status === 'received').sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || b.id - a.id),
        'preparing': orders.filter(o => o.status === 'preparing').sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || b.id - a.id),
        'ready': orders.filter(o => o.status === 'ready').sort((a, b) => new Date(a.created_at) - new Date(b.created_at) || b.id - a.id),
        'served': orders.filter(o => o.status === 'served').sort((a, b) => new Date(b.created_at) - new Date(a.created_at) || b.id - a.id).slice(0, 15)
    };

    // Update Counts
    let total = 0;
    Object.keys(groups).forEach(status => {
        if (DOM.counts[status]) DOM.counts[status].textContent = groups[status].length;
        total += groups[status].length;

        // ID-Based Granular Updates to Prevent Flicker
        if (DOM.lists[status]) {
            const listEl = DOM.lists[status];
            const newOrders = groups[status];

            // Build a map of existing cards by ID for easy lookup
            const existingCardsMap = {};
            Array.from(listEl.children).forEach(card => {
                const id = card.getAttribute('data-order-id');
                if (id) existingCardsMap[id] = card;
            });

            // We need to re-render if the order of IDs changed OR if contents changed
            const newOrderIds = newOrders.map(o => String(o.id)).join(',');
            const currentOrderIds = Array.from(listEl.children).map(c => c.getAttribute('data-order-id')).join(',');

            if (newOrderIds === currentOrderIds) {
                // Same order: Update individual cards if content changed (e.g. time)
                newOrders.forEach((order, idx) => {
                    const card = listEl.children[idx];
                    const newHTML = createOrderCard(order);
                    if (card.outerHTML !== newHTML) {
                        card.outerHTML = newHTML;
                    }
                });
            } else {
                // Different order or count: Re-render list
                // (Note: we use innerHTML here, but we could do more complex DOM moving if needed.
                // For kitchen, count changes are less frequent than time updates).
                const listHTML = newOrders.map(order => createOrderCard(order)).join('');
                if (listEl.innerHTML !== listHTML) {
                    listEl.innerHTML = listHTML;
                }
            }
        }
    });

    if (DOM.totalActive) DOM.totalActive.textContent = total;
}

/**
 * Create HTML for an order card
 */
function createOrderCard(order) {
    const timeAgo = formatTimeAgo(order.created_at);

    // Buttons based on status
    let actionBtn = '';
    if (order.status === 'received') {
        actionBtn = `<button class="btn-kitchen btn-next" onclick="updateStatus('${order.id}', 'preparing')">Start Cooking</button>`;
    } else if (order.status === 'preparing') {
        actionBtn = `<button class="btn-kitchen btn-finish" onclick="updateStatus('${order.id}', 'ready')">Ready</button>`;
    } else if (order.status === 'ready') {
        actionBtn = `<button class="btn-kitchen btn-serve" onclick="updateStatus('${order.id}', 'served')">Mark Served</button>`;
    } else if (order.status === 'served') {
        actionBtn = `<span class="served-badge">Served ✅</span>`;
    }

    // Ensure items is an array (might be stringified if using certain DB settings)
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    return `
        <article class="kitchen-card" data-order-id="${order.id}">
            <div class="card-header">
                <span class="order-id">#${order.order_number}</span>
                <span class="table-badge">Table ${order.table_number}</span>
            </div>
            <div class="card-items">
                ${items.map(item => `
                    <div class="card-item-row">
                        <span>${item.emoji} ${item.name}</span>
                        <span class="item-qty">x${item.qty}</span>
                    </div>
                `).join('')}
            </div>
            ${order.instructions ? `<div class="card-instructions">"${order.instructions}"</div>` : ''}
            <div class="card-footer">
                <span class="time-elapsed">${timeAgo}</span>
                <div class="card-actions">
                    ${actionBtn}
                </div>
            </div>
        </article>
    `;
}

/**
 * Update order status in Supabase
 */
async function updateStatus(id, newStatus) {
    try {
        console.log(`Updating status for ${id} to ${newStatus}`);

        // Optimistic UI update: Update local state immediately
        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex !== -1) {
            orders[orderIndex].status = newStatus;
            renderDashboard();
        }

        const { data, error } = await supabaseClient
            .from('orders')
            .update({ status: newStatus })
            .eq('id', id)
            .select();

        if (error) throw error;

        if (data && data.length > 0) {
            console.log('Status updated successfully in DB:', data[0].status);
        } else {
            console.warn('DB update completed but no rows returned. Check if ID exists.');
        }
    } catch (err) {
        console.error('Error updating status:', err.message);
        alert('Failed to update status. Please try again.');
        // Re-fetch to clear invalid optimistic state
        await fetchActiveOrders();
    }
}

// Make updateStatus globally available for onclick
window.updateStatus = updateStatus;

/**
 * Utils
 */
function formatTimeAgo(timestamp) {
    const diff = Math.floor((new Date() - new Date(timestamp)) / 60000);
    if (diff < 1) return 'Just now';
    if (diff === 1) return '1 min ago';
    return `${diff} mins ago`;
}

function playNotification() {
    if (DOM.notificationSound) {
        DOM.notificationSound.play().catch(e => console.warn('Sound blocked by browser'));
    }
}

// Start app
document.addEventListener('DOMContentLoaded', init);
