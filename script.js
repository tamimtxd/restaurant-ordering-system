/* ============================================
   RANNAGHOR - RESTAURANT ORDERING SYSTEM
   Complete JavaScript Application (FIXED)
   ============================================ */

// ==========================================
// 1. CONFIGURATION & DATA
// ==========================================

const CONFIG = {
    vatRate: 0.05,
    currency: '৳',
    estimatedTime: '15-20 min',
    orderStatusDelay: {
        preparing: 5000,
        ready: 15000,
        served: 25000
    },
    toastDuration: 3000,
    animationDelay: 100
};

// Menu Items Data
const menuItems = [
    // Biriyani
    { id: 1, name: "Kacchi Biriyani", namebn: "কাচ্চি বিরিয়ানি", category: "biriyani", price: 350, emoji: "🍛", desc: "Aromatic mutton biriyani with potatoes", spicy: 2, popular: true },
    { id: 2, name: "Chicken Biriyani", namebn: "চিকেন বিরিয়ানি", category: "biriyani", price: 280, emoji: "🍗", desc: "Fragrant rice with tender chicken pieces", spicy: 2 },
    { id: 3, name: "Beef Tehari", namebn: "গরুর তেহারি", category: "biriyani", price: 300, emoji: "🥩", desc: "Spiced beef with aromatic rice", spicy: 3 },
    { id: 4, name: "Morog Polao", namebn: "মোরগ পোলাও", category: "biriyani", price: 320, emoji: "🍚", desc: "Chicken with fragrant pulao rice", spicy: 1 },

    // Curry
    { id: 5, name: "Chicken Rezala", namebn: "চিকেন রেজালা", category: "curry", price: 320, emoji: "🍛", desc: "Creamy white curry with tender chicken", spicy: 1 },
    { id: 6, name: "Mutton Bhuna", namebn: "মাটন ভুনা", category: "curry", price: 380, emoji: "🍖", desc: "Slow-cooked mutton in rich spices", spicy: 3, popular: true },
    { id: 7, name: "Chingri Malai", namebn: "চিংড়ি মালাই", category: "curry", price: 450, emoji: "🦐", desc: "Prawns in coconut milk curry", spicy: 1 },
    { id: 8, name: "Ilish Bhapa", namebn: "ইলিশ ভাপা", category: "curry", price: 500, emoji: "🐟", desc: "Steamed hilsa in mustard paste", spicy: 2 },
    { id: 9, name: "Beef Kala Bhuna", namebn: "গরুর কালা ভুনা", category: "curry", price: 360, emoji: "🥘", desc: "Chittagong style dark beef curry", spicy: 3 },
    { id: 10, name: "Chicken Kosha", namebn: "চিকেন কষা", category: "curry", price: 280, emoji: "🍗", desc: "Bengali style slow-cooked chicken", spicy: 2 },

    // Kebab
    { id: 11, name: "Chicken Tikka", namebn: "চিকেন টিক্কা", category: "kebab", price: 280, emoji: "🍢", desc: "Grilled marinated chicken pieces", spicy: 2 },
    { id: 12, name: "Beef Seekh Kebab", namebn: "বিফ সিক কাবাব", category: "kebab", price: 320, emoji: "🥙", desc: "Spiced minced beef on skewers", spicy: 2 },
    { id: 13, name: "Mutton Boti Kebab", namebn: "মাটন বটি কাবাব", category: "kebab", price: 350, emoji: "🍖", desc: "Tender mutton cubes grilled", spicy: 2 },
    { id: 14, name: "Tangri Kebab", namebn: "টাংরি কাবাব", category: "kebab", price: 300, emoji: "🍗", desc: "Marinated chicken drumsticks", spicy: 2, popular: true },
    { id: 15, name: "Reshmi Kebab", namebn: "রেশমি কাবাব", category: "kebab", price: 290, emoji: "🥓", desc: "Soft and silky chicken kebab", spicy: 1 },

    // Snacks
    { id: 16, name: "Samosa", namebn: "সমুচা", category: "snacks", price: 40, emoji: "🥟", desc: "Crispy pastry with spiced filling (2 pcs)", spicy: 1 },
    { id: 17, name: "Singara", namebn: "সিঙ্গারা", category: "snacks", price: 30, emoji: "🔺", desc: "Bengali style potato samosa (2 pcs)", spicy: 1 },
    { id: 18, name: "Fuchka", namebn: "ফুচকা", category: "snacks", price: 60, emoji: "🫓", desc: "Crispy shells with tangy water (6 pcs)", spicy: 2, popular: true },
    { id: 19, name: "Chotpoti", namebn: "চটপটি", category: "snacks", price: 80, emoji: "🥣", desc: "Spicy chickpea street food", spicy: 2 },
    { id: 20, name: "Jhalmuri", namebn: "ঝালমুড়ি", category: "snacks", price: 50, emoji: "🍿", desc: "Spiced puffed rice mix", spicy: 2 },
    { id: 21, name: "Peyaju", namebn: "পেঁয়াজু", category: "snacks", price: 35, emoji: "🧅", desc: "Crispy onion fritters (4 pcs)", spicy: 1 },
    { id: 22, name: "Beguni", namebn: "বেগুনি", category: "snacks", price: 35, emoji: "🍆", desc: "Fried eggplant fritters (4 pcs)", spicy: 1 },

    // Dessert
    { id: 23, name: "Roshogolla", namebn: "রসগোল্লা", category: "dessert", price: 40, emoji: "⚪", desc: "Soft cheese balls in syrup (2 pcs)", spicy: 0 },
    { id: 24, name: "Mishti Doi", namebn: "মিষ্টি দই", category: "dessert", price: 60, emoji: "🍮", desc: "Sweet fermented yogurt", spicy: 0, popular: true },
    { id: 25, name: "Chomchom", namebn: "চমচম", category: "dessert", price: 50, emoji: "🟤", desc: "Oval shaped sweet (2 pcs)", spicy: 0 },
    { id: 26, name: "Firni", namebn: "ফিরনি", category: "dessert", price: 70, emoji: "🥛", desc: "Rice pudding with nuts", spicy: 0 },
    { id: 27, name: "Jilapi", namebn: "জিলাপি", category: "dessert", price: 80, emoji: "🌀", desc: "Crispy sweet spirals", spicy: 0 },
    { id: 28, name: "Rasmalai", namebn: "রসমালাই", category: "dessert", price: 90, emoji: "🥮", desc: "Cheese patties in sweet milk (2 pcs)", spicy: 0 },

    // Drinks
    { id: 29, name: "Borhani", namebn: "বোরহানি", category: "drinks", price: 60, emoji: "🥛", desc: "Spiced yogurt drink", spicy: 1, popular: true },
    { id: 30, name: "Lassi", namebn: "লাচ্ছি", category: "drinks", price: 80, emoji: "🥤", desc: "Sweet yogurt smoothie", spicy: 0 },
    { id: 31, name: "Mango Lassi", namebn: "আমের লাচ্ছি", category: "drinks", price: 100, emoji: "🥭", desc: "Mango flavored lassi", spicy: 0 },
    { id: 32, name: "Cha", namebn: "চা", category: "drinks", price: 30, emoji: "🍵", desc: "Traditional milk tea", spicy: 0 },
    { id: 33, name: "Doodh Cha", namebn: "দুধ চা", category: "drinks", price: 50, emoji: "☕", desc: "Creamy milk tea", spicy: 0 },
    { id: 34, name: "Lemon Soda", namebn: "লেবু সোডা", category: "drinks", price: 40, emoji: "🍋", desc: "Fresh lemon with soda", spicy: 0 },
];

// Special Items Data
const specialItems = [
    {
        id: 'special1',
        name: "Kacchi Biriyani (Special)",
        namebn: "কাচ্চি বিরিয়ানি (স্পেশাল)",
        price: 320,
        originalPrice: 400,
        emoji: "🍛",
        desc: "Premium mutton slow-cooked with aromatic basmati rice, saffron & secret spices",
        spicy: 2,
        category: "biriyani"
    },
    {
        id: 'special2',
        name: "Chingri Malai Curry",
        namebn: "চিংড়ি মালাই কারি",
        price: 450,
        emoji: "🦐",
        desc: "Jumbo prawns cooked in rich coconut milk with authentic Bengali spices",
        spicy: 1,
        category: "curry"
    }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================

const state = {
    currentTable: null,
    cart: [],
    orders: [],
    selectedCategory: 'all',
    searchQuery: '',
    selectedItem: null,
    selectedItemQty: 1,
    isCartOpen: false,
    isMobileMenuOpen: false,
    specialItemsInitialized: false // Flag to prevent multiple listeners
};

// ==========================================
// 3. DOM ELEMENTS
// ==========================================

const DOM = {
    // Welcome Screen
    welcomeScreen: document.getElementById('welcomeScreen'),
    tableCards: document.querySelectorAll('.table-btn-compact'),

    // Navigation
    navbar: document.getElementById('navbar'),
    tableBadge: document.getElementById('tableBadge'),
    tableNumberDisplay: document.getElementById('tableNumberDisplay'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileMenu: document.getElementById('mobileMenu'),

    // Main Content
    mainContent: document.getElementById('mainContent'),
    heroTableNumber: document.getElementById('heroTableNumber'),
    sessionInfo: document.getElementById('sessionInfo'),

    // Menu
    menuGrid: document.getElementById('menuGrid'),
    categoryTabs: document.querySelectorAll('.category-tab'),
    menuSearch: document.getElementById('menuSearch'),
    clearSearch: document.getElementById('clearSearch'),
    noResults: document.getElementById('noResults'),

    // Cart
    cartBtn: document.getElementById('cartBtn'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    closeCart: document.getElementById('closeCart'),
    cartItems: document.getElementById('cartItems'),
    emptyCart: document.getElementById('emptyCart'),
    cartSummary: document.getElementById('cartSummary'),
    cartCount: document.getElementById('cartCount'),
    cartTableNumber: document.getElementById('cartTableNumber'),
    subtotal: document.getElementById('subtotal'),
    vat: document.getElementById('vat'),
    total: document.getElementById('total'),
    instructions: document.getElementById('instructions'),
    placeOrderBtn: document.getElementById('placeOrder'),

    // Floating Elements
    floatingCart: document.getElementById('floatingCart'),
    floatingCartBtn: document.getElementById('floatingCartBtn'),
    floatingCartCount: document.getElementById('floatingCartCount'),
    floatingTrackOrder: document.getElementById('floatingTrackOrder'),
    floatingTrackBtn: document.getElementById('floatingTrackBtn'),
    floatingOrderCount: document.getElementById('floatingOrderCount'),
    backToTop: document.getElementById('backToTop'),

    // Modals
    successModal: document.getElementById('successModal'),
    orderNumber: document.getElementById('orderNumber'),
    successTableNumber: document.getElementById('successTableNumber'),
    closeSuccessModal: document.getElementById('closeSuccessModal'),

    ordersModal: document.getElementById('ordersModal'),
    ordersList: document.getElementById('ordersList'),
    noOrders: document.getElementById('noOrders'),
    closeOrdersModal: document.getElementById('closeOrdersModal'),
    viewOrdersBtn: document.getElementById('viewOrdersBtn'),
    mobileOrdersBtn: document.getElementById('mobileOrdersBtn'),

    trackOrderModal: document.getElementById('trackOrderModal'),
    trackOrderList: document.getElementById('trackOrderList'),
    noActiveOrders: document.getElementById('noActiveOrders'),
    closeTrackOrderModal: document.getElementById('closeTrackOrderModal'),

    waiterModal: document.getElementById('waiterModal'),
    waiterTableNumber: document.getElementById('waiterTableNumber'),
    cancelWaiter: document.getElementById('cancelWaiter'),
    confirmWaiter: document.getElementById('confirmWaiter'),
    callWaiterBtn: document.getElementById('callWaiterBtn'),
    mobileWaiterBtn: document.getElementById('mobileWaiterBtn'),

    waiterCalledModal: document.getElementById('waiterCalledModal'),
    waiterCalledTableNumber: document.getElementById('waiterCalledTableNumber'),
    closeWaiterCalled: document.getElementById('closeWaiterCalled'),

    itemModal: document.getElementById('itemModal'),
    closeItemModal: document.getElementById('closeItemModal'),
    itemModalIcon: document.getElementById('itemModalIcon'),
    itemModalTitle: document.getElementById('itemModalTitle'),
    itemModalTitleBn: document.getElementById('itemModalTitleBn'),
    itemModalDesc: document.getElementById('itemModalDesc'),
    itemModalSpicy: document.getElementById('itemModalSpicy'),
    itemModalCategory: document.getElementById('itemModalCategory'),
    itemModalPrice: document.getElementById('itemModalPrice'),
    itemQtyMinus: document.getElementById('itemQtyMinus'),
    itemQtyValue: document.getElementById('itemQtyValue'),
    itemQtyPlus: document.getElementById('itemQtyPlus'),
    itemTotalPrice: document.getElementById('itemTotalPrice'),
    addItemToCart: document.getElementById('addItemToCart'),

    // Order Badges
    activeOrdersBadge: document.getElementById('activeOrdersBadge'),
    mobileOrdersBadge: document.getElementById('mobileOrdersBadge'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
};

// ==========================================
// 4. INITIALIZATION
// ==========================================

function init() {
    const tableFromURL = getTableFromURL();

    if (tableFromURL) {
        setTable(tableFromURL);
    } else {
        showWelcomeScreen();
    }

    setupEventListeners();
    initScrollObserver();

    // Initialize special items listeners ONCE
    initSpecialItems();
}

document.addEventListener('DOMContentLoaded', init);

// ==========================================
// 5. TABLE DETECTION & SELECTION
// ==========================================

function getTableFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('table');
}

function setTable(tableNumber) {
    console.log('setTable called with:', tableNumber);
    if (!tableNumber) return;

    state.currentTable = tableNumber;

    const url = new URL(window.location);
    url.searchParams.set('table', tableNumber);
    window.history.pushState({}, '', url);

    updateTableDisplays(tableNumber);
    hideWelcomeScreen();
    showMainContent();
    loadFromStorage();
    renderMenu();
    updateOrderBadges();

    if (window.innerWidth < 768 && DOM.floatingCart) {
        DOM.floatingCart.classList.remove('hidden');
    }
}

function updateTableDisplays(tableNumber) {
    const displays = [
        DOM.tableNumberDisplay,
        DOM.heroTableNumber,
        DOM.cartTableNumber,
        DOM.waiterTableNumber,
        DOM.waiterCalledTableNumber,
        DOM.successTableNumber
    ];

    displays.forEach(el => {
        if (el) el.textContent = tableNumber;
    });

    if (DOM.tableBadge) {
        DOM.tableBadge.classList.remove('hidden');
    }
}

function showWelcomeScreen() {
    if (DOM.welcomeScreen) {
        DOM.welcomeScreen.style.display = 'flex';
    }
}

function hideWelcomeScreen() {
    if (DOM.welcomeScreen) {
        DOM.welcomeScreen.style.display = 'none';
    }
}

function showMainContent() {
    if (DOM.mainContent) {
        DOM.mainContent.classList.add('visible');
    }
}

// ==========================================
// 6. MENU FUNCTIONS
// ==========================================

function renderMenu(category = 'all', searchQuery = '') {
    if (!DOM.menuGrid) return;

    let filtered = [...menuItems];

    if (category !== 'all') {
        filtered = filtered.filter(item => item.category === category);
    }

    if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.namebn.includes(query) ||
            item.desc.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );
    }

    if (filtered.length === 0) {
        DOM.noResults.classList.remove('hidden');
        DOM.menuGrid.innerHTML = '';
        return;
    } else {
        DOM.noResults.classList.add('hidden');
    }

    DOM.menuGrid.innerHTML = filtered.map((item, index) => createMenuItemHTML(item, index)).join('');

    observeScrollElements();
    attachMenuItemListeners();
}

function createMenuItemHTML(item, index) {
    const spicyIndicator = getSpicyIndicator(item.spicy);
    const delay = Math.min(index * 0.05, 0.5);

    return `
        <article class="food-card scroll-reveal" data-id="${item.id}" role="listitem" style="transition-delay: ${delay}s">
            <div class="food-card-content">
                <div class="food-card-header">
                    <div class="food-card-icon">${item.emoji}</div>
                    <div class="food-card-badges">
                        ${item.popular ? '<span class="food-badge popular">Popular</span>' : ''}
                        ${item.spicy >= 3 ? '<span class="food-badge spicy">Spicy</span>' : ''}
                    </div>
                </div>
                <h3 class="food-card-title">${item.name}</h3>
                <p class="food-card-title-bn">${item.namebn}</p>
                <p class="food-card-description">${item.desc}</p>
                <div class="food-card-footer">
                    <span class="food-card-price gradient-text">${CONFIG.currency}${item.price}</span>
                    <button class="btn btn-primary btn-add btn-menu-item" data-id="${item.id}" aria-label="Add ${item.name} to cart">
                        Add +
                    </button>
                </div>
            </div>
        </article>
    `;
}

function getSpicyIndicator(level) {
    if (!level) return '';
    return '🌶️'.repeat(level);
}

// Attach listeners ONLY to menu grid items (not special items)
function attachMenuItemListeners() {
    // Add to cart buttons - only menu items
    document.querySelectorAll('.btn-menu-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(btn.dataset.id);
        });
    });

    // Card click for details
    document.querySelectorAll('.food-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-add')) {
                openItemModal(card.dataset.id);
            }
        });
    });
}

// Initialize special items separately (called only once)
function initSpecialItems() {
    if (state.specialItemsInitialized) return;

    document.querySelectorAll('.btn-special').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            addToCart(btn.dataset.id);
        });
    });

    state.specialItemsInitialized = true;
}

function setCategory(category) {
    state.selectedCategory = category;

    DOM.categoryTabs.forEach(tab => {
        const isActive = tab.dataset.category === category;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive);
    });

    renderMenu(category, state.searchQuery);
}

// ==========================================
// 7. SEARCH FUNCTIONALITY
// ==========================================

function handleSearch(query) {
    state.searchQuery = query;

    if (DOM.clearSearch) {
        DOM.clearSearch.classList.toggle('hidden', !query);
    }

    renderMenu(state.selectedCategory, query);
}

function clearSearch() {
    state.searchQuery = '';
    if (DOM.menuSearch) {
        DOM.menuSearch.value = '';
    }
    if (DOM.clearSearch) {
        DOM.clearSearch.classList.add('hidden');
    }
    renderMenu(state.selectedCategory, '');
}

// ==========================================
// 8. CART FUNCTIONS
// ==========================================

function addToCart(id) {
    let item = menuItems.find(i => i.id == id) || specialItems.find(i => i.id == id);
    if (!item) return;

    const existingItem = state.cart.find(i => i.id == id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        state.cart.push({ ...item, qty: 1 });
    }

    updateCart();
    saveToStorage();
    showToast(`${item.name} added to cart! 🛒`);
    animateCartIcon();
}

function addToCartWithQty(id, qty) {
    let item = menuItems.find(i => i.id == id) || specialItems.find(i => i.id == id);
    if (!item || qty < 1) return;

    const existingItem = state.cart.find(i => i.id == id);

    if (existingItem) {
        existingItem.qty += qty;
    } else {
        state.cart.push({ ...item, qty: qty });
    }

    updateCart();
    saveToStorage();
    showToast(`${qty}x ${item.name} added to cart! 🛒`);
    animateCartIcon();
}

function updateCartItemQty(id, change) {
    const item = state.cart.find(i => i.id == id);
    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
        removeFromCart(id);
    } else {
        updateCart();
        saveToStorage();
    }
}

function removeFromCart(id) {
    state.cart = state.cart.filter(i => i.id != id);
    updateCart();
    saveToStorage();
}

function updateCart() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const vatAmount = Math.round(subtotal * CONFIG.vatRate);
    const totalAmount = subtotal + vatAmount;

    updateCartBadges(totalItems);

    if (DOM.subtotal) DOM.subtotal.textContent = `${CONFIG.currency}${subtotal}`;
    if (DOM.vat) DOM.vat.textContent = `${CONFIG.currency}${vatAmount}`;
    if (DOM.total) DOM.total.textContent = `${CONFIG.currency}${totalAmount}`;

    const isEmpty = state.cart.length === 0;
    if (DOM.emptyCart) DOM.emptyCart.classList.toggle('hidden', !isEmpty);
    if (DOM.cartSummary) DOM.cartSummary.classList.toggle('hidden', isEmpty);

    renderCartItems();
}

function updateCartBadges(count) {
    const badges = [DOM.cartCount, DOM.floatingCartCount];

    badges.forEach(badge => {
        if (badge) {
            badge.textContent = count;
            badge.classList.toggle('hidden', count === 0);
        }
    });
}

function renderCartItems() {
    if (!DOM.cartItems) return;

    DOM.cartItems.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-icon">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${CONFIG.currency}${item.price} each</div>
            </div>
            <div class="cart-item-quantity">
                <button class="qty-btn" onclick="updateCartItemQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
                <span class="qty-value">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartItemQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
            </div>
        </div>
    `).join('');
}

function animateCartIcon() {
    if (DOM.cartCount) {
        DOM.cartCount.classList.add('cart-bounce');
        setTimeout(() => DOM.cartCount.classList.remove('cart-bounce'), 400);
    }
}

function openCart() {
    state.isCartOpen = true;
    if (DOM.cartSidebar) DOM.cartSidebar.classList.add('open');
    if (DOM.cartOverlay) DOM.cartOverlay.classList.remove('hidden');
    setTimeout(() => {
        if (DOM.cartOverlay) DOM.cartOverlay.classList.add('visible');
    }, 10);
    document.body.classList.add('cart-open');
}

function closeCart() {
    state.isCartOpen = false;
    if (DOM.cartSidebar) DOM.cartSidebar.classList.remove('open');
    if (DOM.cartOverlay) DOM.cartOverlay.classList.remove('visible');
    setTimeout(() => {
        if (DOM.cartOverlay) DOM.cartOverlay.classList.add('hidden');
    }, 300);
    document.body.classList.remove('cart-open');
}

// ==========================================
// 9. ORDER FUNCTIONS
// ==========================================

function placeOrder() {
    if (state.cart.length === 0) {
        showToast('Your cart is empty!', 'warning');
        return;
    }

    const orderNumber = generateOrderNumber();

    const order = {
        id: orderNumber,
        table: state.currentTable,
        items: [...state.cart],
        subtotal: state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        vat: Math.round(state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0) * CONFIG.vatRate),
        total: 0,
        instructions: DOM.instructions?.value || '',
        status: 'received',
        timestamp: new Date().toISOString()
    };
    order.total = order.subtotal + order.vat;

    state.orders.unshift(order);
    saveToStorage();

    state.cart = [];
    updateCart();
    if (DOM.instructions) DOM.instructions.value = '';

    updateOrderBadges();
    closeCart();
    showSuccessModal(orderNumber);
    simulateOrderProgress(orderNumber);
}

function generateOrderNumber() {
    return Math.floor(10000 + Math.random() * 90000);
}

function simulateOrderProgress(orderNumber) {
    const { preparing, ready, served } = CONFIG.orderStatusDelay;

    setTimeout(() => {
        updateOrderStatus(orderNumber, 'preparing');
        showToast('👨‍🍳 Your order is being prepared!');
    }, preparing);

    setTimeout(() => {
        updateOrderStatus(orderNumber, 'ready');
        showToast('🍽️ Your order is ready!');
    }, ready);

    setTimeout(() => {
        updateOrderStatus(orderNumber, 'served');
        showToast('✅ Order served. Enjoy your meal!');
        updateOrderBadges();
    }, served);
}

function updateOrderStatus(orderNumber, newStatus) {
    const order = state.orders.find(o => o.id === orderNumber);
    if (!order) return;

    const statusIndex = { 'received': 0, 'preparing': 1, 'ready': 2, 'served': 3 };
    const newStatusIndex = statusIndex[newStatus];

    // Trigger animation BEFORE changing status (if modal is open)
    if (!DOM.trackOrderModal.classList.contains('hidden')) {
        const activeOrders = state.orders.filter(o => o.status !== 'served');
        const orderIndex = activeOrders.findIndex(o => o.id === orderNumber);

        if (orderIndex !== -1) {
            animateSingleStep(orderIndex, newStatusIndex);
        }
    }

    order.status = newStatus;
    saveToStorage();
}

function updateOrderBadges() {
    const activeCount = state.orders.filter(o => o.status !== 'served').length;

    const badges = [DOM.activeOrdersBadge, DOM.mobileOrdersBadge];
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = activeCount;
            badge.classList.toggle('hidden', activeCount === 0);
        }
    });

    if (DOM.floatingTrackOrder) {
        DOM.floatingTrackOrder.classList.toggle('hidden', activeCount === 0);
    }
    if (DOM.floatingOrderCount) {
        DOM.floatingOrderCount.textContent = activeCount;
    }
}

function renderOrders() {
    if (!DOM.ordersList) return;

    if (state.orders.length === 0) {
        DOM.ordersList.innerHTML = '';
        if (DOM.noOrders) DOM.noOrders.classList.remove('hidden');
        return;
    }

    if (DOM.noOrders) DOM.noOrders.classList.add('hidden');

    DOM.ordersList.innerHTML = state.orders.map(order => {
        const statusConfig = {
            'received': { label: '📝 Received', class: 'active' },
            'preparing': { label: '👨‍🍳 Preparing', class: 'active' },
            'ready': { label: '🍽️ Ready', class: 'active' },
            'served': { label: '✅ Served', class: 'completed' }
        };

        const status = statusConfig[order.status];

        return `
            <div class="order-item">
                <div class="order-header">
                    <div>
                        <div class="order-id">Order #${order.id}</div>
                        <div class="order-time">${formatDate(order.timestamp)}</div>
                    </div>
                    <span class="order-status ${status.class}">${status.label}</span>
                </div>
                <div class="order-items-list">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span>${item.emoji} ${item.name} <span class="item-qty">×${item.qty}</span></span>
                            <span>${CONFIG.currency}${item.price * item.qty}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <span>Total (incl. VAT)</span>
                    <span class="total-value gradient-text">${CONFIG.currency}${order.total}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderTrackOrders() {
    if (!DOM.trackOrderList) return;

    const activeOrders = state.orders.filter(o => o.status !== 'served');

    if (activeOrders.length === 0) {
        DOM.trackOrderList.innerHTML = '';
        if (DOM.noActiveOrders) DOM.noActiveOrders.classList.remove('hidden');
        return;
    }

    if (DOM.noActiveOrders) DOM.noActiveOrders.classList.add('hidden');

    DOM.trackOrderList.innerHTML = activeOrders.map((order, orderIndex) => {
        return `
            <div class="track-order-card" data-order-id="${order.id}">
                <div class="track-order-header">
                    <div>
                        <div class="track-order-id">Order #${order.id}</div>
                        <div class="track-order-time">${formatTime(order.timestamp)}</div>
                    </div>
                    <span class="track-status-badge">
                        <span class="live-dot"></span>
                        In Progress
                    </span>
                </div>

                <!-- Status Tracker -->
                <div class="status-tracker">
                    <div class="status-steps">
                        <div class="status-progress-line">
                            <div class="track-progress-${orderIndex} status-progress-fill" style="width: 0%"></div>
                        </div>
                        
                        <div class="track-step-${orderIndex}-0 status-step">
                            <div class="step-icon">📝</div>
                            <span class="step-label">Received</span>
                        </div>
                        
                        <div class="track-step-${orderIndex}-1 status-step">
                            <div class="step-icon">👨‍🍳</div>
                            <span class="step-label">Preparing</span>
                        </div>
                        
                        <div class="track-step-${orderIndex}-2 status-step">
                            <div class="step-icon">🍽️</div>
                            <span class="step-label">Ready</span>
                        </div>
                        
                        <div class="track-step-${orderIndex}-3 status-step">
                            <div class="step-icon">✅</div>
                            <span class="step-label">Served</span>
                        </div>
                    </div>
                </div>

                <!-- Order Items -->
                <div class="track-order-items">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span>${item.emoji} ${item.name} <span class="item-qty">×${item.qty}</span></span>
                            <span>${CONFIG.currency}${item.price * item.qty}</span>
                        </div>
                    `).join('')}
                </div>

                <!-- Footer -->
                <div class="track-order-footer">
                    <div class="track-total">
                        <span class="track-total-label">Total</span>
                        <span class="track-total-value gradient-text">${CONFIG.currency}${order.total}</span>
                    </div>
                    <div class="track-eta">
                        <span class="track-eta-label">Estimated</span>
                        <span class="track-eta-value">${CONFIG.estimatedTime}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Animate status trackers after render
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            activeOrders.forEach((order, orderIndex) => {
                const statusIndex = { 'received': 0, 'preparing': 1, 'ready': 2, 'served': 3 };
                const currentStep = statusIndex[order.status];
                animateTrackOrderStatus(orderIndex, currentStep);
            });
        });
    });
}

// Animate the track order status - animates UP TO the actual order status
function animateTrackOrderStatus(orderIndex, targetStep) {
    const progressBar = document.querySelector(`.track-progress-${orderIndex}`);
    if (!progressBar) return;

    // First, reset ALL steps to initial gray state
    for (let i = 0; i <= 3; i++) {
        const stepEl = document.querySelector(`.track-step-${orderIndex}-${i}`);
        if (stepEl) {
            const icon = stepEl.querySelector('.step-icon');
            const text = stepEl.querySelector('.step-label');
            if (icon) {
                icon.style.background = 'rgba(255, 255, 255, 0.1)';
                icon.style.boxShadow = 'none';
                icon.classList.remove('active', 'completed');
            }
            if (text) {
                text.style.color = '';
                text.classList.remove('active', 'completed');
            }
        }
    }
    progressBar.style.width = '0%';

    const stepDelay = 600;

    // Animate from step 0 UP TO targetStep
    for (let step = 0; step <= targetStep; step++) {
        (function (currentStep) {
            const delay = currentStep * stepDelay;

            setTimeout(() => {
                // Turn PREVIOUS step green (completed)
                if (currentStep > 0) {
                    const prevStepEl = document.querySelector(`.track-step-${orderIndex}-${currentStep - 1}`);
                    if (prevStepEl) {
                        const prevIcon = prevStepEl.querySelector('.step-icon');
                        const prevText = prevStepEl.querySelector('.step-label');
                        if (prevIcon) {
                            prevIcon.style.background = '#10b981';
                            prevIcon.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                            prevIcon.classList.remove('active');
                            prevIcon.classList.add('completed');
                        }
                        if (prevText) {
                            prevText.style.color = '#10b981';
                            prevText.classList.remove('active');
                            prevText.classList.add('completed');
                        }
                    }
                }

                // Make CURRENT step orange (active)
                const stepEl = document.querySelector(`.track-step-${orderIndex}-${currentStep}`);
                if (stepEl) {
                    const icon = stepEl.querySelector('.step-icon');
                    const text = stepEl.querySelector('.step-label');
                    if (icon) {
                        icon.style.background = 'linear-gradient(135deg, #FF8C00 0%, #DC143C 100%)';
                        icon.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.6)';
                        icon.classList.add('active');
                    }
                    if (text) {
                        text.style.color = '#FF8C00';
                        text.classList.add('active');
                    }
                }

                // Update progress bar
                const progressWidth = (currentStep / 3) * 100;
                progressBar.style.width = `${progressWidth}%`;
            }, delay);
        })(step);
    }
}

// Animate a single step transition (when status changes in real-time)
function animateSingleStep(orderIndex, newStatusIndex) {
    const prevStepIndex = newStatusIndex - 1;
    const progressBar = document.querySelector(`.track-progress-${orderIndex}`);

    // Turn previous step green (completed)
    if (prevStepIndex >= 0) {
        const prevStepEl = document.querySelector(`.track-step-${orderIndex}-${prevStepIndex}`);
        if (prevStepEl) {
            const prevIcon = prevStepEl.querySelector('.step-icon');
            const prevText = prevStepEl.querySelector('.step-label');
            if (prevIcon) {
                prevIcon.style.background = '#10b981';
                prevIcon.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                prevIcon.classList.remove('active');
                prevIcon.classList.add('completed');
            }
            if (prevText) {
                prevText.style.color = '#10b981';
                prevText.classList.remove('active');
                prevText.classList.add('completed');
            }
        }
    }

    // Turn current step orange (active)
    const currentStepEl = document.querySelector(`.track-step-${orderIndex}-${newStatusIndex}`);
    if (currentStepEl) {
        const icon = currentStepEl.querySelector('.step-icon');
        const text = currentStepEl.querySelector('.step-label');
        if (icon) {
            icon.style.background = 'linear-gradient(135deg, #FF8C00 0%, #DC143C 100%)';
            icon.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.6)';
            icon.classList.add('active');
        }
        if (text) {
            text.style.color = '#FF8C00';
            text.classList.add('active');
        }
    }

    // Update progress bar
    if (progressBar) {
        const progressWidth = (newStatusIndex / 3) * 100;
        progressBar.style.width = `${progressWidth}%`;
    }

    // If served, re-render after animation to remove from list
    if (newStatusIndex === 3) {
        setTimeout(() => {
            renderTrackOrders();
        }, 2000);
    }
}

// ==========================================
// 10. MODAL FUNCTIONS
// ==========================================

function showModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);
    document.body.classList.add('modal-open');
}

function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
    document.body.classList.remove('modal-open');
}

function showSuccessModal(orderNumber) {
    if (DOM.orderNumber) DOM.orderNumber.textContent = orderNumber;
    if (DOM.successTableNumber) DOM.successTableNumber.textContent = state.currentTable;
    showModal(DOM.successModal);
}

function showOrdersModal() {
    renderOrders();
    showModal(DOM.ordersModal);
}

function showTrackOrderModal() {
    renderTrackOrders();
    showModal(DOM.trackOrderModal);
}

function openItemModal(id) {
    const item = menuItems.find(i => i.id == id) || specialItems.find(i => i.id == id);
    if (!item) return;

    state.selectedItem = item;
    state.selectedItemQty = 1;

    if (DOM.itemModalIcon) DOM.itemModalIcon.textContent = item.emoji;
    if (DOM.itemModalTitle) DOM.itemModalTitle.textContent = item.name;
    if (DOM.itemModalTitleBn) DOM.itemModalTitleBn.textContent = item.namebn || '';
    if (DOM.itemModalDesc) DOM.itemModalDesc.textContent = item.desc;
    if (DOM.itemModalSpicy) DOM.itemModalSpicy.textContent = getSpicyIndicator(item.spicy);
    if (DOM.itemModalCategory) DOM.itemModalCategory.textContent = item.category;
    if (DOM.itemModalPrice) DOM.itemModalPrice.textContent = `${CONFIG.currency}${item.price}`;
    if (DOM.itemQtyValue) DOM.itemQtyValue.textContent = '1';
    if (DOM.itemTotalPrice) DOM.itemTotalPrice.textContent = `${CONFIG.currency}${item.price}`;

    showModal(DOM.itemModal);
}

function updateItemModalQty(change) {
    state.selectedItemQty = Math.max(1, state.selectedItemQty + change);
    if (DOM.itemQtyValue) DOM.itemQtyValue.textContent = state.selectedItemQty;

    if (state.selectedItem && DOM.itemTotalPrice) {
        const total = state.selectedItem.price * state.selectedItemQty;
        DOM.itemTotalPrice.textContent = `${CONFIG.currency}${total}`;
    }
}

function addSelectedItemToCart() {
    if (!state.selectedItem) return;
    addToCartWithQty(state.selectedItem.id, state.selectedItemQty);
    hideModal(DOM.itemModal);
    state.selectedItem = null;
    state.selectedItemQty = 1;
}

// ==========================================
// 11. WAITER FUNCTIONS
// ==========================================

function showWaiterModal() {
    if (DOM.waiterTableNumber) DOM.waiterTableNumber.textContent = state.currentTable;
    showModal(DOM.waiterModal);
}

function confirmCallWaiter() {
    hideModal(DOM.waiterModal);
    if (DOM.waiterCalledTableNumber) DOM.waiterCalledTableNumber.textContent = state.currentTable;
    showModal(DOM.waiterCalledModal);
    showToast('🔔 Waiter has been notified!');
}
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleScroll() {
    const scrollY = window.scrollY;

    if (DOM.navbar) {
        DOM.navbar.classList.toggle('scrolled', scrollY > 50);
    }

    if (DOM.backToTop) {
        DOM.backToTop.classList.toggle('visible', scrollY > 500);
    }

    if (window.innerWidth < 768 && DOM.floatingCart && state.currentTable) {
        DOM.floatingCart.classList.toggle('hidden', scrollY < 200);
    }
}

// ==========================================
// 13. TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = 'success') {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.setAttribute('role', 'alert');

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, CONFIG.toastDuration);
}

// ==========================================
// 14. SCROLL & ANIMATION
// ==========================================

const scrollObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

function initScrollObserver() {
    observeScrollElements();
}

function observeScrollElements() {
    document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => {
        scrollObserver.observe(el);
    });
}

function handleMouseMove(e) {
    const orbs = document.querySelectorAll('.orb');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
}

// ==========================================
// 15. EVENT LISTENERS
// ==========================================

function setupEventListeners() {
    // Table selection (Robust Implementation)
    console.log('SetupEventListeners: initializing table selection');

    // Method 1: Direct attachment (backup)
    if (DOM.tableCards && DOM.tableCards.length > 0) {
        DOM.tableCards.forEach(card => {
            card.addEventListener('click', (e) => {
                console.log('Table clicked (Direct):', card.dataset.table);
                handleTableSelect(card);
            });
        });
    } else {
        console.error('CRITICAL: DOM.tableCards not found or empty!');
        // Re-query in case DOM was not ready
        const cards = document.querySelectorAll('.table-btn-compact');
        console.log('Re-query found cards:', cards.length);
        cards.forEach(card => {
            card.addEventListener('click', () => handleTableSelect(card));
        });
    }

    // Method 2: Global Delegation (Safety Net)
    document.addEventListener('click', (e) => {
        const tableBtn = e.target.closest('.table-btn-compact');
        if (tableBtn) {
            console.log('Table clicked (Delegation):', tableBtn.dataset.table);
            // Only trigger if not already handled (optional check, but harmless to call setTable twice rarely)
            handleTableSelect(tableBtn);
        }
    });

    function handleTableSelect(card) {
        if (!card) return;

        // Visual feedback
        document.querySelectorAll('.table-btn-compact').forEach(c => c.setAttribute('aria-checked', 'false'));
        document.querySelectorAll('.table-btn-compact').forEach(c => c.classList.remove('selected')); // Remove class from ALL

        card.setAttribute('aria-checked', 'true');
        card.classList.add('selected');

        console.log('Setting table to:', card.dataset.table);
        setTimeout(() => setTable(card.dataset.table), 100);
    }

    // Category tabs
    DOM.categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => setCategory(tab.dataset.category));
    });

    // Search
    if (DOM.menuSearch) {
        DOM.menuSearch.addEventListener('input', (e) => handleSearch(e.target.value));
        DOM.menuSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') clearSearch();
        });
    }

    if (DOM.clearSearch) {
        DOM.clearSearch.addEventListener('click', clearSearch);
    }

    // Cart
    if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', openCart);
    if (DOM.floatingCartBtn) DOM.floatingCartBtn.addEventListener('click', openCart);
    if (DOM.closeCart) DOM.closeCart.addEventListener('click', closeCart);
    if (DOM.cartOverlay) DOM.cartOverlay.addEventListener('click', closeCart);
    if (DOM.placeOrderBtn) DOM.placeOrderBtn.addEventListener('click', placeOrder);

    // Orders modal
    if (DOM.viewOrdersBtn) DOM.viewOrdersBtn.addEventListener('click', showOrdersModal);
    if (DOM.mobileOrdersBtn) {
        DOM.mobileOrdersBtn.addEventListener('click', () => {
            // Legacy closeMobileMenu removed
            showOrdersModal();
        });
    }
    if (DOM.closeOrdersModal) DOM.closeOrdersModal.addEventListener('click', () => hideModal(DOM.ordersModal));

    // Track order
    if (DOM.floatingTrackBtn) DOM.floatingTrackBtn.addEventListener('click', showTrackOrderModal);
    if (DOM.closeTrackOrderModal) DOM.closeTrackOrderModal.addEventListener('click', () => hideModal(DOM.trackOrderModal));

    // Success modal
    if (DOM.closeSuccessModal) DOM.closeSuccessModal.addEventListener('click', () => hideModal(DOM.successModal));

    // Waiter modals
    if (DOM.callWaiterBtn) DOM.callWaiterBtn.addEventListener('click', showWaiterModal);
    if (DOM.mobileWaiterBtn) {
        DOM.mobileWaiterBtn.addEventListener('click', () => {
            // Legacy closeMobileMenu removed
            showWaiterModal();
        });
    }
    if (DOM.cancelWaiter) DOM.cancelWaiter.addEventListener('click', () => hideModal(DOM.waiterModal));
    if (DOM.confirmWaiter) DOM.confirmWaiter.addEventListener('click', confirmCallWaiter);
    if (DOM.closeWaiterCalled) DOM.closeWaiterCalled.addEventListener('click', () => hideModal(DOM.waiterCalledModal));

    // Item modal
    if (DOM.closeItemModal) DOM.closeItemModal.addEventListener('click', () => hideModal(DOM.itemModal));
    if (DOM.itemQtyMinus) DOM.itemQtyMinus.addEventListener('click', () => updateItemModalQty(-1));
    if (DOM.itemQtyPlus) DOM.itemQtyPlus.addEventListener('click', () => updateItemModalQty(1));
    if (DOM.addItemToCart) DOM.addItemToCart.addEventListener('click', addSelectedItemToCart);

    // Back to top
    if (DOM.backToTop) DOM.backToTop.addEventListener('click', scrollToTop);

    // Scroll events
    window.addEventListener('scroll', debounce(handleScroll, 10));

    // Mouse move for parallax
    document.addEventListener('mousemove', throttle(handleMouseMove, 50));

    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);

    // Window resize
    window.addEventListener('resize', debounce(handleResize, 100));

    // Modal backdrop clicks
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) hideModal(modal);
        });
    });

    // Prevent body scroll when modal is open
    document.addEventListener('touchmove', (e) => {
        if (document.body.classList.contains('modal-open') || document.body.classList.contains('cart-open')) {
            const target = e.target;
            if (!target.closest('.modal-body') && !target.closest('.cart-content')) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}

function handleResize() {
    if (window.innerWidth >= 768 && state.isMobileMenuOpen) {
        // Legacy closeMobileMenu removed
    }

    if (DOM.floatingCart && state.currentTable) {
        DOM.floatingCart.classList.toggle('hidden', window.innerWidth >= 768);
    }
}

// ==========================================
// 16. UTILITY FUNCTIONS
// ==========================================

function saveToStorage() {
    if (!state.currentTable) return;

    const data = {
        cart: state.cart,
        orders: state.orders
    };

    try {
        localStorage.setItem(`rannaghor_table_${state.currentTable}`, JSON.stringify(data));
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadFromStorage() {
    if (!state.currentTable) return;

    try {
        const data = localStorage.getItem(`rannaghor_table_${state.currentTable}`);
        if (data) {
            const parsed = JSON.parse(data);
            state.cart = parsed.cart || [];
            state.orders = parsed.orders || [];
            updateCart();
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
}

function formatDate(isoString) {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function formatTime(isoString) {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==========================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ==========================================

window.updateCartItemQty = updateCartItemQty;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.openItemModal = openItemModal;