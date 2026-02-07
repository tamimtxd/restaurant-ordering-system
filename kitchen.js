/**
 * Kitchen Dashboard Logic - Rannaghor
 * Handles Realtime Order Monitoring, Status Updates, Search, and Mobile UI
 */

// State
let orders = [];
let waiterCalls = [];
let searchQuery = '';
let activeMobileColumn = 'received';

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
    mobileCounts: {
        'received': document.getElementById('mobile-count-received'),
        'preparing': document.getElementById('mobile-count-preparing'),
        'ready': document.getElementById('mobile-count-ready'),
        'served': document.getElementById('mobile-count-served')
    },
    totalActive: document.getElementById('totalActiveCount'),
    notificationSound: document.getElementById('orderSound'),
    connectionStatus: document.getElementById('connectionStatus'),
    orderSearch: document.getElementById('orderSearch'),
    clearSearch: document.getElementById('clearSearch'),
    mobileTabs: document.querySelectorAll('.mobile-tab'),
    columns: document.querySelectorAll('.order-column'),
    serviceAlerts: document.getElementById('serviceAlerts')
};

/**
 * Initialize Dashboard
 */
async function init() {
    console.log('Kitchen Dashboard Initializing...');

    setupEventListeners();
    await Promise.all([
        fetchActiveOrders(),
        fetchWaiterCalls()
    ]);
    setupRealtime();

    // Refresh elapsed time every 30 seconds for higher precision
    setInterval(renderDashboard, 30000);
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
    // Search
    if (DOM.orderSearch) {
        DOM.orderSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase();
            if (DOM.clearSearch) {
                DOM.clearSearch.classList.toggle('hidden', !searchQuery);
            }
            renderDashboard();
        });
    }

    if (DOM.clearSearch) {
        DOM.clearSearch.addEventListener('click', () => {
            DOM.orderSearch.value = '';
            searchQuery = '';
            DOM.clearSearch.classList.add('hidden');
            renderDashboard();
        });
    }

    // Mobile Column Switching
    DOM.mobileTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const columnId = tab.dataset.column;
            switchMobileColumn(columnId);
        });
    });
}

/**
 * Switch Mobile Column
 */
function switchMobileColumn(columnId) {
    activeMobileColumn = columnId;

    // Update tabs
    DOM.mobileTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.column === columnId);
    });

    // Update columns
    DOM.columns.forEach(col => {
        col.classList.toggle('active', col.id === `column-${columnId}`);
    });
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
            .limit(100);

        if (error) throw error;
        orders = data || [];
        renderDashboard();
    } catch (err) {
        console.error('Error fetching orders:', err.message);
    }
}

async function fetchWaiterCalls() {
    try {
        const { data, error } = await supabaseClient
            .from('waiter_calls')
            .select('*')
            .eq('status', 'pending')
            .order('created_at', { ascending: true });

        if (error) throw error;
        waiterCalls = data || [];
        renderServiceAlerts();
    } catch (err) {
        console.error('Error fetching waiter calls:', err.message);
    }
}

/**
 * Setup Realtime Listeners
 */
let pollingInterval = null;

function setupRealtime() {
    supabaseClient.removeAllChannels();

    // Orders Channel
    const ordersChannel = supabaseClient
        .channel('kitchen-orders')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'orders'
        }, (payload) => {
            handleOrderUpdate(payload);
        })
        .subscribe();

    // Waiter Calls Channel
    const waiterChannel = supabaseClient
        .channel('waiter-calls')
        .on('postgres_changes', {
            event: '*',
            schema: 'public',
            table: 'waiter_calls'
        }, (payload) => {
            handleWaiterUpdate(payload);
        })
        .subscribe((status) => {
            if (status === 'TIMED_OUT' || status === 'CLOSED') {
                if (!pollingInterval) startPollingFallback();
            }
        });
}

function startPollingFallback() {
    if (pollingInterval) clearInterval(pollingInterval);
    pollingInterval = setInterval(() => {
        fetchActiveOrders();
        fetchWaiterCalls();
    }, 5000);
}

/**
 * Handle Realtime Payloads for Waiter
 */
function handleWaiterUpdate(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    if (eventType === 'INSERT') {
        if (newRecord.status === 'pending') {
            waiterCalls.push(newRecord);
            playNotification(); // Maybe a different sound eventually
        }
    } else if (eventType === 'UPDATE') {
        if (newRecord.status === 'resolved') {
            waiterCalls = waiterCalls.filter(c => c.id !== newRecord.id);
        } else {
            const index = waiterCalls.findIndex(c => c.id === newRecord.id);
            if (index !== -1) waiterCalls[index] = newRecord;
        }
    } else if (eventType === 'DELETE') {
        waiterCalls = waiterCalls.filter(c => c.id !== oldRecord.id);
    }

    renderServiceAlerts();
}

/**
 * Render Service Alerts (Waiter Calls)
 */
function renderServiceAlerts() {
    if (!DOM.serviceAlerts) return;

    if (waiterCalls.length === 0) {
        DOM.serviceAlerts.classList.add('hidden');
        DOM.serviceAlerts.innerHTML = '';
        return;
    }

    DOM.serviceAlerts.classList.remove('hidden');
    DOM.serviceAlerts.innerHTML = waiterCalls.map(call => `
        <div class="service-alert" data-call-id="${call.id}">
            <span class="alert-icon">🔔</span>
            <span class="alert-text">Table ${call.table_number} is calling!</span>
            <button class="btn-resolve-alert" onclick="resolveServiceAlert('${call.id}')">Handled</button>
        </div>
    `).join('');
}

/**
 * Resolve Service Alert
 */
async function resolveServiceAlert(id) {
    try {
        // Optimistic UI
        waiterCalls = waiterCalls.filter(c => c.id !== id);
        renderServiceAlerts();

        const { error } = await supabaseClient
            .from('waiter_calls')
            .update({ status: 'resolved' })
            .eq('id', id);

        if (error) throw error;
    } catch (err) {
        console.error('Resolve failed:', err);
        fetchWaiterCalls();
    }
}

/**
 * Handle Realtime Payloads for Orders
 */
function handleOrderUpdate(payload) {
    const { eventType, new: newRecord, old: oldRecord } = payload;

    if (eventType === 'INSERT') {
        if (!orders.find(o => o.id === newRecord.id)) {
            orders.unshift(newRecord);
            playNotification();
        }
    } else if (eventType === 'UPDATE') {
        const index = orders.findIndex(o => o.id === newRecord.id);
        if (index !== -1) orders[index] = newRecord;
        else orders.unshift(newRecord);
    } else if (eventType === 'DELETE') {
        orders = orders.filter(o => o.id !== oldRecord.id);
    }

    renderDashboard();
}

/**
 * Render all columns
 */
function renderDashboard() {
    // Apply search filter if active
    let filteredOrders = orders;
    if (searchQuery) {
        filteredOrders = orders.filter(o => {
            const tableNum = (o.table_number || '').toString();
            const orderNum = (o.order_number || '').toString();

            // Flexible table match: matches "4", "Table 4", or "t4"
            const tableMatch = tableNum.includes(searchQuery) ||
                `table ${tableNum}`.toLowerCase().includes(searchQuery) ||
                `t${tableNum}`.toLowerCase().includes(searchQuery);

            const orderMatch = orderNum.includes(searchQuery);

            // Check items for food names safely
            let foodMatch = false;
            try {
                const items = typeof o.items === 'string' ? JSON.parse(o.items) : o.items;
                if (Array.isArray(items)) {
                    foodMatch = items.some(item =>
                        (item.name && item.name.toLowerCase().includes(searchQuery)) ||
                        (item.namebn && item.namebn.includes(searchQuery))
                    );
                }
            } catch (e) {
                console.error("Error parsing items for search:", e);
            }

            return tableMatch || orderMatch || foodMatch;
        });
    }

    // Grouping
    const groups = {
        'received': filteredOrders.filter(o => o.status === 'received').sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
        'preparing': filteredOrders.filter(o => o.status === 'preparing').sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
        'ready': filteredOrders.filter(o => o.status === 'ready').sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
        'served': filteredOrders.filter(o => o.status === 'served').sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10)
    };

    // Update Counts
    let activeTotal = 0;
    Object.keys(groups).forEach(status => {
        const count = groups[status].length;
        if (DOM.counts[status]) DOM.counts[status].textContent = count;
        if (DOM.mobileCounts[status]) DOM.mobileCounts[status].textContent = count;
        if (status !== 'served') activeTotal += count;

        // Render List
        if (DOM.lists[status]) {
            const listEl = DOM.lists[status];
            const newOrders = groups[status];

            // Generate IDs string to check if the sequence changed
            const newIds = newOrders.map(o => o.id).join(',');
            const currentIds = Array.from(listEl.children).map(child => child.dataset.orderId).join(',');

            if (newIds !== currentIds) {
                // Sequence or items changed: Full refresh
                listEl.innerHTML = newOrders.map(o => createOrderCard(o)).join('');
            } else {
                // Sequence is same: Only update time labels for existing cards
                newOrders.forEach((order, idx) => {
                    const card = listEl.children[idx];
                    const timeInfo = getTimeInfo(order.created_at);
                    const timeEl = card.querySelector('.time-elapsed');
                    if (timeEl) {
                        const newTimeHtml = `<span class="time-icon">⏱️</span> ${timeInfo.label}`;
                        if (timeEl.innerHTML !== newTimeHtml) {
                            timeEl.innerHTML = newTimeHtml;
                            // Also update classes for warnings
                            timeEl.className = `time-elapsed ${timeInfo.textClass}`;
                        }
                    }
                });
            }
        }
    });

    if (DOM.totalActive) DOM.totalActive.textContent = activeTotal;
}

/**
 * Create HTML for an order card
 */
function createOrderCard(order) {
    const timeInfo = getTimeInfo(order.created_at);
    const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

    let actionBtn = '';
    if (order.status === 'received') {
        actionBtn = `<button class="btn-kitchen btn-next" onclick="updateStatus('${order.id}', 'preparing')">Start Cooking</button>`;
    } else if (order.status === 'preparing') {
        actionBtn = `<button class="btn-kitchen btn-finish" onclick="updateStatus('${order.id}', 'ready')">Ready</button>`;
    } else if (order.status === 'ready') {
        actionBtn = `<button class="btn-kitchen btn-serve" onclick="updateStatus('${order.id}', 'served')">Serve</button>`;
    } else {
        actionBtn = `<span class="served-badge">Served ✅</span>`;
    }

    return `
        <article class="kitchen-card ${timeInfo.class}" data-order-id="${order.id}">
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
                <span class="time-elapsed ${timeInfo.textClass}">
                    <span class="time-icon">⏱️</span> ${timeInfo.label}
                </span>
                <div class="card-actions">
                    ${actionBtn}
                </div>
            </div>
        </article>
    `;
}

/**
 * Get time-based classes and labels
 */
function getTimeInfo(timestamp) {
    const diffMs = new Date() - new Date(timestamp);
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    let label = '';
    if (days > 0) {
        label = `${days}d ago`;
    } else if (hours > 0) {
        label = `${hours}h ago`;
    } else if (mins < 1) {
        label = 'Just now';
    } else {
        label = `${mins}m ago`;
    }

    let textClass = '';
    if (mins >= 15) textClass = 'time-danger';
    else if (mins >= 10) textClass = 'time-warning';

    return { label, textClass, class: '' };
}

/**
 * Update order status
 */
async function updateStatus(id, newStatus) {
    try {
        // Optimistic UI
        const o = orders.find(o => o.id === id);
        if (o) o.status = newStatus;
        renderDashboard();

        const { error } = await supabaseClient
            .from('orders')
            .update({ status: newStatus })
            .eq('id', id);

        if (error) throw error;
    } catch (err) {
        console.error('Update failed:', err);
        await fetchActiveOrders();
    }
}

function playNotification() {
    if (DOM.notificationSound) {
        DOM.notificationSound.play().catch(() => { });
    }
}

// Global scope for onclick
window.updateStatus = updateStatus;

// Start app
document.addEventListener('DOMContentLoaded', init);
