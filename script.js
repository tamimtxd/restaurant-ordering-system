// =====================
// CONFIGURATION
// =====================

// Simulated URL structure: ?table=X (in real usage, QR code would link to this)
// Example: https://rannaghor.com/order?table=5

// =====================
// DATA
// =====================

const menuItems = [
    // Biriyani
    { id: 1, name: "Kacchi Biriyani", namebn: "কাচ্চি বিরিয়ানি", category: "biriyani", price: 350, emoji: "🍛", desc: "Aromatic mutton biriyani with potatoes", spicy: 2, popular: true },
    { id: 2, name: "Chicken Biriyani", namebn: "চিকেন বিরিয়ানি", category: "biriyani", price: 280, emoji: "🍗", desc: "Fragrant rice with tender chicken pieces", spicy: 2 },
    { id: 3, name: "Beef Tehari", namebn: "গরুর তেহারি", category: "biriyani", price: 300, emoji: "🥩", desc: "Spiced beef with aromatic rice", spicy: 3 },

    // Curry
    { id: 4, name: "Chicken Rezala", namebn: "চিকেন রেজালা", category: "curry", price: 320, emoji: "🍛", desc: "Creamy white curry with tender chicken", spicy: 1 },
    { id: 5, name: "Mutton Bhuna", namebn: "মাটন ভুনা", category: "curry", price: 380, emoji: "🍖", desc: "Slow-cooked mutton in rich spices", spicy: 3, popular: true },
    { id: 6, name: "Chingri Malai", namebn: "চিংড়ি মালাই", category: "curry", price: 450, emoji: "🦐", desc: "Prawns in coconut milk curry", spicy: 1 },
    { id: 7, name: "Ilish Bhapa", namebn: "ইলিশ ভাপা", category: "curry", price: 500, emoji: "🐟", desc: "Steamed hilsa in mustard paste", spicy: 2 },
    { id: 8, name: "Beef Kala Bhuna", namebn: "গরুর কালা ভুনা", category: "curry", price: 360, emoji: "🥘", desc: "Chittagong style dark beef curry", spicy: 3 },

    // Kebab
    { id: 9, name: "Chicken Tikka", namebn: "চিকেন টিক্কা", category: "kebab", price: 280, emoji: "🍢", desc: "Grilled marinated chicken pieces", spicy: 2 },
    { id: 10, name: "Beef Seekh Kebab", namebn: "বিফ সিক কাবাব", category: "kebab", price: 320, emoji: "🥙", desc: "Spiced minced beef on skewers", spicy: 2 },
    { id: 11, name: "Mutton Boti Kebab", namebn: "মাটন বটি কাবাব", category: "kebab", price: 350, emoji: "🍖", desc: "Tender mutton cubes grilled", spicy: 2 },
    { id: 12, name: "Tangri Kebab", namebn: "টাংরি কাবাব", category: "kebab", price: 300, emoji: "🍗", desc: "Marinated chicken drumsticks", spicy: 2, popular: true },

    // Snacks
    { id: 13, name: "Samosa", namebn: "সমুচা", category: "snacks", price: 40, emoji: "🥟", desc: "Crispy pastry with spiced filling (2 pcs)", spicy: 1 },
    { id: 14, name: "Singara", namebn: "সিঙ্গারা", category: "snacks", price: 30, emoji: "🔺", desc: "Bengali style potato samosa (2 pcs)", spicy: 1 },
    { id: 15, name: "Fuchka", namebn: "ফুচকা", category: "snacks", price: 60, emoji: "🫓", desc: "Crispy shells with tangy water (6 pcs)", spicy: 2, popular: true },
    { id: 16, name: "Chotpoti", namebn: "চটপটি", category: "snacks", price: 80, emoji: "🥣", desc: "Spicy chickpea street food", spicy: 2 },
    { id: 17, name: "Jhalmuri", namebn: "ঝালমুড়ি", category: "snacks", price: 50, emoji: "🍿", desc: "Spiced puffed rice mix", spicy: 2 },

    // Dessert
    { id: 18, name: "Roshogolla", namebn: "রসগোল্লা", category: "dessert", price: 40, emoji: "⚪", desc: "Soft cheese balls in syrup (2 pcs)", spicy: 0 },
    { id: 19, name: "Mishti Doi", namebn: "মিষ্টি দই", category: "dessert", price: 60, emoji: "🍮", desc: "Sweet fermented yogurt", spicy: 0, popular: true },
    { id: 20, name: "Chomchom", namebn: "চমচম", category: "dessert", price: 50, emoji: "🟤", desc: "Oval shaped sweet (2 pcs)", spicy: 0 },
    { id: 21, name: "Firni", namebn: "ফিরনি", category: "dessert", price: 70, emoji: "🥛", desc: "Rice pudding with nuts", spicy: 0 },
    { id: 22, name: "Jilapi", namebn: "জিলাপি", category: "dessert", price: 80, emoji: "🌀", desc: "Crispy sweet spirals", spicy: 0 },

    // Drinks
    { id: 23, name: "Borhani", namebn: "বোরহানি", category: "drinks", price: 60, emoji: "🥛", desc: "Spiced yogurt drink", spicy: 1, popular: true },
    { id: 24, name: "Lassi", namebn: "লাচ্ছি", category: "drinks", price: 80, emoji: "🥤", desc: "Sweet yogurt smoothie", spicy: 0 },
    { id: 25, name: "Mango Lassi", namebn: "আমের লাচ্ছি", category: "drinks", price: 100, emoji: "🥭", desc: "Mango flavored lassi", spicy: 0 },
    { id: 26, name: "Cha", namebn: "চা", category: "drinks", price: 30, emoji: "🍵", desc: "Traditional milk tea", spicy: 0 },
    { id: 27, name: "Doodh Cha", namebn: "দুধ চা", category: "drinks", price: 50, emoji: "☕", desc: "Creamy milk tea", spicy: 0 },
];

const specialItems = [
    { id: 'special1', name: "Kacchi Biriyani (Special)", price: 320, originalPrice: 400, emoji: "🍛", desc: "Premium mutton biriyani" },
    { id: 'special2', name: "Chingri Malai Curry", price: 450, emoji: "🦐", desc: "Jumbo prawns in coconut" },
];

// =====================
// STATE
// =====================

let currentTable = null;
let cart = [];
let orders = [];

// =====================
// DOM ELEMENTS
// =====================

const welcomeScreen = document.getElementById('welcomeScreen');
const mainContent = document.getElementById('mainContent');
const menuGrid = document.getElementById('menuGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartSummary = document.getElementById('cartSummary');
const cartCount = document.getElementById('cartCount');
const floatingCartCount = document.getElementById('floatingCartCount');
const subtotalEl = document.getElementById('subtotal');
const vatEl = document.getElementById('vat');
const totalEl = document.getElementById('total');
const placeOrderBtn = document.getElementById('placeOrder');
const successModal = document.getElementById('successModal');
const ordersModal = document.getElementById('ordersModal');
const waiterModal = document.getElementById('waiterModal');
const waiterCalledModal = document.getElementById('waiterCalledModal');

// =====================
// TABLE DETECTION
// =====================

function getTableFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('table');
}

function setTable(tableNumber) {
    currentTable = tableNumber;

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('table', tableNumber);
    window.history.pushState({}, '', url);

    // Update all table displays
    document.getElementById('tableNumberDisplay').textContent = tableNumber;
    document.getElementById('heroTableNumber').textContent = tableNumber;
    document.getElementById('cartTableNumber').textContent = tableNumber;
    document.getElementById('waiterTableNumber').textContent = tableNumber;
    document.getElementById('waiterCalledTableNumber').textContent = tableNumber;

    // Show table badge
    document.getElementById('tableBadge').classList.remove('hidden');
    document.getElementById('tableBadge').classList.add('flex');

    // Hide welcome screen, show main content
    welcomeScreen.style.display = 'none';
    mainContent.classList.remove('opacity-0');

    // Show floating cart on mobile
    document.getElementById('floatingCart').classList.remove('hidden');

    // Load any saved cart for this table
    loadCartFromStorage();

    // Initialize menu
    renderMenu();
    initScrollReveal();
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem(`cart_table_${currentTable}`);
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }

    const savedOrders = localStorage.getItem(`orders_table_${currentTable}`);
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
        updateOrdersBadge();
    }
}

function saveCartToStorage() {
    localStorage.setItem(`cart_table_${currentTable}`, JSON.stringify(cart));
}

function saveOrdersToStorage() {
    localStorage.setItem(`orders_table_${currentTable}`, JSON.stringify(orders));
}

// =====================
// INITIALIZATION
// =====================

function init() {
    const tableFromURL = getTableFromURL();

    if (tableFromURL) {
        // Table detected from URL (simulating QR scan)
        setTable(tableFromURL);
    } else {
        // No table in URL - show welcome/selection screen
        welcomeScreen.style.display = 'flex';
    }

    // Setup table selection cards
    document.querySelectorAll('.table-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.table-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            setTimeout(() => {
                setTable(card.dataset.table);
            }, 300);
        });
    });

    // Setup event listeners
    setupEventListeners();
}

// =====================
// MENU RENDERING
// =====================

function renderMenu(category = 'all') {
    const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

    menuGrid.innerHTML = filtered.map((item, index) => `
                <div class="scroll-reveal food-card rounded-2xl overflow-hidden" style="transition-delay: ${0.1 + index * 0.03}s" data-category="${item.category}">
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div class="text-5xl">${item.emoji}</div>
                            <div class="flex flex-col items-end gap-1">
                                ${item.popular ? '<span class="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full">Popular</span>' : ''}
                            </div>
                        </div>
                        <h3 class="text-xl font-display font-bold mb-1">${item.name}</h3>
                        <p class="text-orange-400 text-sm mb-2">${item.namebn}</p>
                        <p class="text-gray-400 text-sm mb-4">${item.desc}</p>
                        <div class="flex items-center justify-between">
                            <span class="text-2xl font-bold gradient-text">৳${item.price}</span>
                            <button class="add-to-cart-btn glow-btn px-5 py-2 rounded-full font-medium text-sm" data-id="${item.id}">
                                Add +
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

    // Re-observe for scroll reveal
    document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => observer.observe(el));

    // Add event listeners for add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => addToCart(btn.dataset.id));
    });
}

// =====================
// CART FUNCTIONS
// =====================

function addToCart(id) {
    let item = menuItems.find(i => i.id == id) || specialItems.find(i => i.id == id);
    if (!item) return;

    const existingItem = cart.find(i => i.id == id);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    updateCart();
    saveCartToStorage();

    // Bounce animation
    cartCount.classList.add('cart-bounce');
    setTimeout(() => cartCount.classList.remove('cart-bounce'), 500);

    // Show quick feedback
    showToast(`${item.name} added to cart!`);
}

function updateCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vat = Math.round(subtotal * 0.05);
    const total = subtotal + vat;

    // Update count badges
    if (totalItems > 0) {
        cartCount.textContent = totalItems;
        cartCount.classList.remove('hidden');
        floatingCartCount.textContent = totalItems;
        emptyCart.classList.add('hidden');
        cartSummary.classList.remove('hidden');
    } else {
        cartCount.classList.add('hidden');
        floatingCartCount.textContent = '0';
        emptyCart.classList.remove('hidden');
        cartSummary.classList.add('hidden');
    }

    // Update totals
    subtotalEl.textContent = `৳${subtotal}`;
    vatEl.textContent = `৳${vat}`;
    totalEl.textContent = `৳${total}`;

    // Render cart items
    cartItems.innerHTML = cart.map(item => `
                <div class="flex items-center gap-4 bg-white/5 rounded-xl p-4">
                    <div class="text-3xl">${item.emoji}</div>
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold truncate">${item.name}</h4>
                        <p class="text-orange-400 text-sm">৳${item.price} each</p>
                    </div>
                    <div class="flex items-center gap-2">
                        <button class="qty-btn w-8 h-8 rounded-full border border-white/20 flex items-center justify-center" onclick="updateQty('${item.id}', -1)">-</button>
                        <span class="w-8 text-center">${item.qty}</span>
                        <button class="qty-btn w-8 h-8 rounded-full border border-white/20 flex items-center justify-center" onclick="updateQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `).join('');
}

function updateQty(id, change) {
    const item = cart.find(i => i.id == id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id != id);
        }
        updateCart();
        saveCartToStorage();
    }
}

// =====================
// ORDER FUNCTIONS
// =====================

function placeOrder() {
    if (cart.length === 0) return;

    const orderNumber = Math.floor(10000 + Math.random() * 90000);
    const order = {
        id: orderNumber,
        table: currentTable,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        instructions: document.getElementById('instructions').value,
        status: 'received',
        timestamp: new Date().toISOString()
    };

    orders.unshift(order);
    saveOrdersToStorage();
    updateOrdersBadge();

    // Show order number and table
    document.getElementById('orderNumber').textContent = orderNumber;
    document.getElementById('successTableNumber').textContent = currentTable;

    // Clear cart
    cart = [];
    updateCart();
    saveCartToStorage();
    document.getElementById('instructions').value = '';

    // Close cart, show success
    cartSidebar.classList.remove('open');
    cartOverlay.classList.add('hidden');
    successModal.classList.remove('hidden');

    // Simulate order status progression (for demo)
    simulateOrderProgress(orderNumber);
}

function simulateOrderProgress(orderNumber) {
    // After 5 seconds, move to "preparing"
    setTimeout(() => {
        const order = orders.find(o => o.id === orderNumber);
        if (order && order.status === 'received') {
            // Trigger animation FIRST (before status change)
            triggerStatusAnimation(orderNumber, 1);
            // Then change status
            order.status = 'preparing';
            saveOrdersToStorage();
            showToast('👨‍🍳 Your order is being prepared!');
        }
    }, 5000);

    // After 15 seconds, move to "ready"
    setTimeout(() => {
        const order = orders.find(o => o.id === orderNumber);
        if (order && order.status === 'preparing') {
            // Trigger animation FIRST (before status change)
            triggerStatusAnimation(orderNumber, 2);
            // Then change status
            order.status = 'ready';
            saveOrdersToStorage();
            showToast('🍽️ Your order is ready!');
        }
    }, 15000);

    // After 25 seconds, move to "served"
    setTimeout(() => {
        const order = orders.find(o => o.id === orderNumber);
        if (order && order.status === 'ready') {
            // Trigger animation FIRST (while order is still "ready" status)
            triggerStatusAnimation(orderNumber, 3);
            // Then change status after a short delay for animation to complete
            setTimeout(() => {
                order.status = 'served';
                saveOrdersToStorage();
                updateOrdersBadge();
            }, 500);
            showToast('✅ Order served. Enjoy your meal!');
        }
    }, 25000);
}

// Trigger animation when status changes (toast appears)
function triggerStatusAnimation(orderNumber, newStatusIndex) {
    const trackOrderModal = document.getElementById('trackOrderModal');

    // Check if Track Order modal is open
    if (!trackOrderModal.classList.contains('hidden')) {
        // Find the order index in active orders
        const activeOrders = orders.filter(o => o.status !== 'served');
        const orderIndex = activeOrders.findIndex(o => o.id === orderNumber);

        if (orderIndex !== -1) {
            // Animate just the status change (single step transition)
            animateSingleStep(orderIndex, newStatusIndex);
        }
    }
}

// Animate a single step transition (when status changes in real-time)
function animateSingleStep(orderIndex, newStatusIndex) {
    const prevStepIndex = newStatusIndex - 1;

    // Get the progress bar
    const progressBar = document.querySelector(`.track-progress-${orderIndex}`);

    // Turn previous step green (completed)
    if (prevStepIndex >= 0) {
        const prevStepEl = document.querySelector(`.track-step-${orderIndex}-${prevStepIndex}`);
        if (prevStepEl) {
            const prevIcon = prevStepEl.querySelector('.step-icon');
            const prevText = prevStepEl.querySelector('span:last-child');
            prevIcon.style.background = '#10b981';
            prevIcon.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
            prevIcon.classList.remove('step-active-glow');
            prevText.className = 'text-xs text-green-400';
        }
    }

    // Turn current step orange (active) with pulsing glow
    const currentStepEl = document.querySelector(`.track-step-${orderIndex}-${newStatusIndex}`);
    if (currentStepEl) {
        const icon = currentStepEl.querySelector('.step-icon');
        const text = currentStepEl.querySelector('span:last-child');
        icon.style.background = 'linear-gradient(135deg, #FF8C00 0%, #DC143C 100%)';
        icon.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.6)';
        icon.classList.add('step-active-glow');
        text.className = 'text-xs text-orange-400';
    }

    // Update progress bar
    if (progressBar) {
        const progressWidth = (newStatusIndex / 3) * 100;
        progressBar.style.width = `${progressWidth}%`;
    }

    // If served, update the badge after animation
    if (newStatusIndex === 3) {
        setTimeout(() => {
            // Re-render to remove served orders from active list
            renderTrackOrder();
        }, 2000);
    }
}

function updateOrdersBadge() {
    const activeOrders = orders.filter(o => o.status !== 'served').length;
    const badge = document.getElementById('activeOrdersBadge');
    const floatingTrackOrder = document.getElementById('floatingTrackOrder');
    const floatingOrderCount = document.getElementById('floatingOrderCount');

    if (activeOrders > 0) {
        badge.textContent = activeOrders;
        badge.classList.remove('hidden');
        badge.classList.add('flex');

        // Show floating track order button
        floatingTrackOrder.classList.remove('hidden');
        floatingOrderCount.textContent = activeOrders;
    } else {
        badge.classList.add('hidden');
        floatingTrackOrder.classList.add('hidden');
    }
}

// Simple order history (My Orders)
function renderOrders() {
    const ordersList = document.getElementById('ordersList');
    const noOrders = document.getElementById('noOrders');

    if (orders.length === 0) {
        ordersList.innerHTML = '';
        noOrders.classList.remove('hidden');
        return;
    }

    noOrders.classList.add('hidden');
    ordersList.innerHTML = orders.map(order => {
        const statusLabels = {
            'received': '📝 Received',
            'preparing': '👨‍🍳 Preparing',
            'ready': '🍽️ Ready',
            'served': '✅ Served'
        };

        return `
                    <div class="order-history-item bg-white/5 rounded-2xl p-4">
                        <div class="flex items-center justify-between mb-3">
                            <div>
                                <span class="font-bold">Order #${order.id}</span>
                                <div class="text-gray-500 text-xs">${new Date(order.timestamp).toLocaleString()}</div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-xs px-2 py-1 rounded-full ${order.status === 'served' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}">${statusLabels[order.status]}</span>
                            </div>
                        </div>

                        <!-- Order Items -->
                        <div class="space-y-1 mb-3">
                            ${order.items.map(item => `
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-400">${item.emoji} ${item.name} <span class="text-orange-400">x${item.qty}</span></span>
                                    <span>৳${item.price * item.qty}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Total -->
                        <div class="flex justify-between pt-2 border-t border-white/10">
                            <span class="text-sm">Total (incl. VAT)</span>
                            <span class="font-bold gradient-text">৳${Math.round(order.total * 1.05)}</span>
                        </div>
                    </div>
                `;
    }).join('');
}

// Track Order with visual status (Track Order button)
function renderTrackOrder() {
    const trackOrderList = document.getElementById('trackOrderList');
    const noActiveOrders = document.getElementById('noActiveOrders');
    const trackOrderModal = document.getElementById('trackOrderModal');

    const activeOrders = orders.filter(o => o.status !== 'served');

    if (activeOrders.length === 0) {
        trackOrderList.innerHTML = '';
        noActiveOrders.classList.remove('hidden');
        return;
    }

    noActiveOrders.classList.add('hidden');
    trackOrderList.innerHTML = activeOrders.map((order, orderIndex) => {
        const statusIndex = {
            'received': 0,
            'preparing': 1,
            'ready': 2,
            'served': 3
        };
        const currentStatusIndex = statusIndex[order.status];

        return `
                    <div class="bg-white/5 rounded-2xl p-5 border border-orange-500/20">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <span class="font-bold text-xl">Order #${order.id}</span>
                                <div class="text-gray-500 text-xs">${new Date(order.timestamp).toLocaleTimeString()}</div>
                            </div>
                            <div class="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full">
                                <div class="live-dot"></div>
                                <span class="text-xs text-orange-400">In Progress</span>
                            </div>
                        </div>

                        <!-- Visual Status Tracker with Animation -->
                        <div class="bg-black/30 rounded-2xl p-6 mb-4">
                            <div class="flex items-center justify-between relative">
                                <!-- Progress Line -->
                                <div class="absolute top-5 left-8 right-8 h-1 bg-white/10">
                                    <div class="track-progress-${orderIndex} h-full bg-gradient-to-r from-green-500 to-orange-500 transition-all duration-1000" style="width: 0%"></div>
                                </div>
                                
                                <!-- Step 1: Received -->
                                <div class="track-step-${orderIndex}-0 flex flex-col items-center relative z-10">
                                    <div class="step-icon w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg bg-white/10">📝</div>
                                    <span class="text-xs text-gray-500">Received</span>
                                </div>
                                
                                <!-- Step 2: Preparing -->
                                <div class="track-step-${orderIndex}-1 flex flex-col items-center relative z-10">
                                    <div class="step-icon w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg bg-white/10">👨‍🍳</div>
                                    <span class="text-xs text-gray-500">Preparing</span>
                                </div>
                                
                                <!-- Step 3: Ready -->
                                <div class="track-step-${orderIndex}-2 flex flex-col items-center relative z-10">
                                    <div class="step-icon w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg bg-white/10">🍽️</div>
                                    <span class="text-xs text-gray-500">Ready</span>
                                </div>
                                
                                <!-- Step 4: Served -->
                                <div class="track-step-${orderIndex}-3 flex flex-col items-center relative z-10">
                                    <div class="step-icon w-10 h-10 rounded-full flex items-center justify-center mb-2 text-lg bg-white/10">✅</div>
                                    <span class="text-xs text-gray-500">Served</span>
                                </div>
                            </div>
                        </div>

                        <!-- Order Items -->
                        <div class="space-y-2 mb-4">
                            ${order.items.map(item => `
                                <div class="flex justify-between text-sm">
                                    <span class="text-gray-400">${item.emoji} ${item.name} <span class="text-orange-400">x${item.qty}</span></span>
                                    <span>৳${item.price * item.qty}</span>
                                </div>
                            `).join('')}
                        </div>

                        <!-- Total & Estimated Time -->
                        <div class="flex justify-between items-center pt-3 border-t border-white/10">
                            <div>
                                <span class="text-sm text-gray-400">Total</span>
                                <span class="font-bold gradient-text ml-2">৳${Math.round(order.total * 1.05)}</span>
                            </div>
                            <div class="text-right">
                                <span class="text-xs text-gray-500">Estimated</span>
                                <span class="text-sm text-white font-medium ml-1">15-20 mins</span>
                            </div>
                        </div>
                    </div>
                `;
    }).join('');

    // Animate each order's status tracker
    activeOrders.forEach((order, orderIndex) => {
        const statusIndex = {
            'received': 0,
            'preparing': 1,
            'ready': 2,
            'served': 3
        };
        const currentStatusIndex = statusIndex[order.status];

        animateTrackOrderStatus(orderIndex, currentStatusIndex);
    });
}

// Animate the track order status - animates UP TO the actual order status
function animateTrackOrderStatus(orderIndex, targetStep) {
    // Use requestAnimationFrame to ensure DOM is fully ready
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const progressBar = document.querySelector(`.track-progress-${orderIndex}`);
            if (!progressBar) return;

            // First, reset ALL steps to initial gray state
            for (let i = 0; i <= 3; i++) {
                const stepEl = document.querySelector(`.track-step-${orderIndex}-${i}`);
                if (stepEl) {
                    const icon = stepEl.querySelector('.step-icon');
                    const text = stepEl.querySelector('span:last-child');
                    icon.style.background = 'rgba(255, 255, 255, 0.1)';
                    icon.style.boxShadow = 'none';
                    icon.classList.remove('step-active-glow');
                    text.className = 'text-xs text-gray-500';
                }
            }
            progressBar.style.width = '0%';

            const stepDelay = 600; // 600ms between each step

            // Animate from step 0 UP TO targetStep (actual order status)
            for (let step = 0; step <= targetStep; step++) {
                (function (currentStep) {
                    const delay = currentStep * stepDelay;

                    setTimeout(() => {
                        // Turn PREVIOUS step green (completed)
                        if (currentStep > 0) {
                            const prevStepEl = document.querySelector(`.track-step-${orderIndex}-${currentStep - 1}`);
                            if (prevStepEl) {
                                const prevIcon = prevStepEl.querySelector('.step-icon');
                                const prevText = prevStepEl.querySelector('span:last-child');
                                prevIcon.style.background = '#10b981';
                                prevIcon.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                                prevIcon.classList.remove('step-active-glow');
                                prevText.className = 'text-xs text-green-400';
                            }
                        }

                        // Make CURRENT step orange (active)
                        const stepEl = document.querySelector(`.track-step-${orderIndex}-${currentStep}`);
                        if (stepEl) {
                            const icon = stepEl.querySelector('.step-icon');
                            const text = stepEl.querySelector('span:last-child');
                            icon.style.background = 'linear-gradient(135deg, #FF8C00 0%, #DC143C 100%)';
                            icon.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.6)';
                            text.className = 'text-xs text-orange-400';

                            // Add pulsing glow ONLY on the final step (targetStep)
                            if (currentStep === targetStep) {
                                icon.classList.add('step-active-glow');
                            }
                        }

                        // Update progress bar
                        const progressWidth = (currentStep / 3) * 100;
                        progressBar.style.width = `${progressWidth}%`;
                    }, delay);
                })(step);
            }
        });
    });
}

// =====================
// TOAST NOTIFICATION
// =====================

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg z-[80] transition-all duration-300 transform translate-y-4 opacity-0';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-4', 'opacity-0');
    }, 100);

    setTimeout(() => {
        toast.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// =====================
// EVENT LISTENERS
// =====================

function setupEventListeners() {
    // Category tabs
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.category-tab').forEach(t => {
                t.classList.remove('active');
                if (!t.classList.contains('active')) {
                    t.classList.add('border', 'border-white/20');
                }
            });
            tab.classList.add('active');
            tab.classList.remove('border', 'border-white/20');
            renderMenu(tab.dataset.category);
        });
    });

    // Cart sidebar
    cartBtn.addEventListener('click', openCart);
    document.getElementById('floatingCartBtn').addEventListener('click', openCart);
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);

    // Place order
    placeOrderBtn.addEventListener('click', placeOrder);

    // Success modal
    document.getElementById('closeSuccessModal').addEventListener('click', () => {
        successModal.classList.add('hidden');
    });

    // Orders modal
    document.getElementById('viewOrdersBtn').addEventListener('click', () => {
        renderOrders();
        ordersModal.classList.remove('hidden');
    });
    document.getElementById('closeOrdersModal').addEventListener('click', () => {
        ordersModal.classList.add('hidden');
    });

    // Floating track order button - opens Track Order modal with visual status
    document.getElementById('floatingTrackBtn').addEventListener('click', () => {
        renderTrackOrder();
        document.getElementById('trackOrderModal').classList.remove('hidden');
    });

    // Close Track Order modal
    document.getElementById('closeTrackOrderModal').addEventListener('click', () => {
        document.getElementById('trackOrderModal').classList.add('hidden');
    });

    // Call waiter
    document.getElementById('callWaiterBtn').addEventListener('click', () => {
        waiterModal.classList.remove('hidden');
    });
    document.getElementById('cancelWaiter').addEventListener('click', () => {
        waiterModal.classList.add('hidden');
    });
    document.getElementById('confirmWaiter').addEventListener('click', () => {
        waiterModal.classList.add('hidden');
        waiterCalledModal.classList.remove('hidden');
    });
    document.getElementById('closeWaiterCalled').addEventListener('click', () => {
        waiterCalledModal.classList.add('hidden');
    });

    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(26, 10, 0, 0.98)';
        } else {
            nav.style.background = 'rgba(26, 10, 0, 0.9)';
        }
    });

    // Parallax effect for orbs
    document.addEventListener('mousemove', (e) => {
        const orbs = document.querySelectorAll('.orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 10;
            orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.remove('hidden');
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.add('hidden');
}

// =====================
// SCROLL REVEAL
// =====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

function initScrollReveal() {
    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// =====================
// INITIALIZE
// =====================

init();
