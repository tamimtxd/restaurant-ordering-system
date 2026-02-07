/* ============================================
   RANNAGHOR - RESTAURANT ORDERING SYSTEM
   Complete JavaScript Application (FIXED)
   ============================================ */

// ==========================================
// 1. CONFIGURATION & DATA
// ==========================================

// Timing Constants (Issue #4: Magic Numbers)
const TIMINGS = {
    MODAL_TRANSITION: 300,      // Modal open/close animation duration
    TOAST_DURATION: 3000,        // How long toasts stay visible
    ANIMATION_DELAY: 100,        // General animation delay
    CART_TRANSITION: 300,        // Cart sidebar transition
    TABLE_SELECT_DELAY: 800,     // Delay before hiding welcome screen
    ORDER_STATUS_PREPARING: 5000,  // Time until order moves to "ready"
    ORDER_STATUS_READY: 15000,     // Time until order is "ready"
    ORDER_STATUS_SERVED: 25000     // Time until order is "served"
};

// Z-Index System (Issue #4: Magic Numbers)
const Z_INDEX = {
    MODAL: 3000,
    TOAST: 5000,
    NAVBAR: 1000,
    BOTTOM_NAV: 1000,
    FLOATING: 1500,
    CART: 2000,
    OVERLAY: 1999,
    WELCOME: 100
};

// Layout Constants (Issue #4: Magic Numbers)
const LAYOUT = {
    MOBILE_NAV_HEIGHT: '80px',
    TRACK_BUTTON_OFFSET: '80px'
};

const CONFIG = {
    vatRate: 0.05,
    currency: '৳',  // Fixed Issue #1: XSS - Changed from HTML to plain text
    currencySymbol: '৳',
    estimatedTime: '15-20 min',
    orderStatusDelay: {
        preparing: TIMINGS.ORDER_STATUS_PREPARING,
        ready: TIMINGS.ORDER_STATUS_READY,
        served: TIMINGS.ORDER_STATUS_SERVED
    },
    toastDuration: TIMINGS.TOAST_DURATION,
    animationDelay: TIMINGS.ANIMATION_DELAY
};

// Menu Items Data (Fallback data)
let menuItems = [
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

// Special Items Data (Fallback data)
let specialItems = [
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
    specialItemsInitialized: false, // Flag to prevent multiple listeners
    html5QrCode: null // QR Scanner instance
};

// ==========================================
// 3. DOM ELEMENTS
// ==========================================

const DOM = {
    // Welcome Screen
    welcomeScreen: document.getElementById('welcomeScreen'),
    tableCards: document.querySelectorAll('.table-btn-compact, .table-card-premium'),

    scannerSection: document.getElementById('scannerSection'),
    manualSelection: document.getElementById('manualSelection'),
    toggleManualBtn: document.getElementById('toggleManualBtn'),
    kitchenAdminBtn: document.getElementById('kitchenAdminBtn'),


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
    mobileBottomNav: document.querySelector('.mobile-bottom-nav'),

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
    mobileOrdersBtn: document.getElementById('bottomNavOrdersBtn'), // Updated to new ID

    trackOrderModal: document.getElementById('trackOrderModal'),
    trackOrderList: document.getElementById('trackOrderList'),
    noActiveOrders: document.getElementById('noActiveOrders'),
    closeTrackOrderModal: document.getElementById('closeTrackOrderModal'),

    waiterModal: document.getElementById('waiterModal'),
    waiterTableNumber: document.getElementById('waiterTableNumber'),
    cancelWaiter: document.getElementById('cancelWaiter'),
    confirmWaiter: document.getElementById('confirmWaiter'),
    callWaiterBtn: document.getElementById('callWaiterBtn'),
    mobileWaiterBtn: document.getElementById('bottomNavWaiterBtn'), // Updated to new ID

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
    mobileOrdersBadge: document.getElementById('bottomNavOrdersBadge'),

    // Toast Container
    toastContainer: document.getElementById('toastContainer')
};

// ==========================================
// 4. INITIALIZATION
// ==========================================

async function init() {
    const tableFromURL = getTableFromURL();

    if (tableFromURL) {
        setTable(tableFromURL);
    } else {
        showWelcomeScreen();
        initQRScanner();
    }

    setupEventListeners();
    initScrollObserver();

    // Fetch dynamic menu items from Supabase
    await fetchMenuItems();

    // Initialize special items listeners ONCE
    initSpecialItems();

    // Sync active orders with Supabase Realtime
    syncActiveOrders();
}

/**
 * Sync active orders from LocalStorage with Supabase
 */
function syncActiveOrders() {
    if (typeof SUPABASE_URL === 'undefined' || SUPABASE_URL === 'YOUR_SUPABASE_URL') return;

    state.orders.forEach(order => {
        if (order.status !== 'served') {
            subscribeToOrderUpdates(order.id);
        }
    });
}

/**
 * Fetch menu items from Supabase
 */
async function fetchMenuItems() {
    if (typeof SUPABASE_URL === 'undefined' || SUPABASE_URL === 'YOUR_SUPABASE_URL') {
        console.warn('Supabase not configured. Using fallback menu data.');
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('menu_items')
            .select('*');

        if (error) throw error;

        if (data && data.length > 0) {
            // Map Supabase data to local format if necessary
            const remoteMenuItems = data.filter(item => !item.is_special).map(item => ({
                id: item.id,
                name: item.name,
                namebn: item.namebn,
                category: item.category,
                price: item.price,
                emoji: item.emoji,
                desc: item.description,
                spicy: item.spicy,
                popular: item.popular
            }));

            const remoteSpecialItems = data.filter(item => item.is_special).map(item => ({
                id: item.id,
                name: item.name,
                namebn: item.namebn,
                category: item.category,
                price: item.price,
                originalPrice: item.original_price,
                emoji: item.emoji,
                desc: item.description,
                spicy: item.spicy
            }));

            if (remoteMenuItems.length > 0) menuItems = remoteMenuItems;
            if (remoteSpecialItems.length > 0) specialItems = remoteSpecialItems;

            console.log('Menu items fetched from Supabase');
            renderMenu(state.selectedCategory, state.searchQuery);
        }
    } catch (err) {
        console.error('Error fetching menu items:', err.message);
        showToast('Using local menu data (Offline mode)', 'info');
    }
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
        document.body.classList.add('welcome-active');
    }
}

function hideWelcomeScreen() {
    if (DOM.welcomeScreen) {
        DOM.welcomeScreen.style.display = 'none';
        document.body.classList.remove('welcome-active');
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

    // Add to cart buttons
    document.querySelectorAll('.btn-special').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            addToCart(btn.dataset.id);
        });
    });

    // Special card click for details (Fix Issue: Not opening)
    document.querySelectorAll('.special-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Find the button inside the card to get the ID
            const btn = card.querySelector('.btn-special');
            if (btn && !e.target.closest('.btn-add')) {
                openItemModal(btn.dataset.id);
            }
        });
        // Make it look clickable
        card.style.cursor = 'pointer';
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
    console.log('addToCart called for ID:', id);
    try {
        let item = menuItems.find(i => i.id == id) || specialItems.find(i => i.id == id);
        if (!item) {
            console.error('Item not found for ID:', id);
            return;
        }

        const existingItem = state.cart.find(i => i.id == id);

        if (existingItem) {
            existingItem.qty++;
            console.log('Incremented quantity for:', item.name);
        } else {
            state.cart.push({ ...item, qty: 1 });
            console.log('Added new item:', item.name);
        }

        updateCart();
        saveToStorage();
        showToast(`${item.name} added to cart! 🛒`);
        animateCartIcon();
    } catch (error) {
        console.error('Error in addToCart:', error);
        showToast('Error adding to cart', 'error');
    }
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

    if (DOM.subtotal) DOM.subtotal.innerHTML = `${CONFIG.currency}${subtotal}`;
    if (DOM.vat) DOM.vat.innerHTML = `${CONFIG.currency}${vatAmount}`;
    if (DOM.total) DOM.total.innerHTML = `${CONFIG.currency}${totalAmount}`;

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

async function placeOrder() {
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

    // Save to Supabase if configured
    if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        try {
            // Stringify items if your DB expects a string/text column
            const { data, error } = await supabaseClient
                .from('orders')
                .insert([{
                    order_number: order.id,
                    table_number: parseInt(order.table),
                    items: order.items, // Supabase usually handles JS arrays for jsonb
                    subtotal: order.subtotal,
                    vat: order.vat,
                    total: order.total,
                    instructions: order.instructions,
                    status: order.status
                }])
                .select(); // Get back the record to confirm

            if (error) throw error;
            console.log('Order saved to Supabase successfully');
        } catch (err) {
            console.error('Error saving order to Supabase:', err.message);
            showToast('Order saved locally (Offline mode)', 'info');
        }
    }

    state.orders.unshift(order);
    saveToStorage();

    state.cart = [];
    updateCart();
    if (DOM.instructions) DOM.instructions.value = '';

    updateOrderBadges();
    closeCart();
    showSuccessModal(orderNumber);

    // Subscribe to updates regardless of Supabase success (uses local ID which matches order_number)
    if (typeof SUPABASE_URL !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
        subscribeToOrderUpdates(orderNumber);
    } else {
        simulateOrderProgress(orderNumber);
    }
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
    console.log(`Updating order #${orderNumber} status to: ${newStatus}`);

    // Use loose equality and string conversion to be safe with IDs
    const order = state.orders.find(o => String(o.id) === String(orderNumber));

    if (!order) {
        console.warn(`Order #${orderNumber} not found in local state.`);
        return;
    }

    const statusIndex = { 'received': 0, 'preparing': 1, 'ready': 2, 'served': 3 };
    const newStatusIndex = statusIndex[newStatus];

    // Trigger animation BEFORE changing status (if modal is open)
    if (DOM.trackOrderModal && !DOM.trackOrderModal.classList.contains('hidden')) {
        // We update the status first so renderTrackOrders sees the new state
        order.status = newStatus;
        renderTrackOrders();
    }

    order.status = newStatus;
    saveToStorage();
    updateOrderBadges();

    // If modal is open, we need to refresh the list
    if (DOM.trackOrderModal && !DOM.trackOrderModal.classList.contains('hidden')) {
        renderTrackOrders();
    }

    if (DOM.ordersModal && !DOM.ordersModal.classList.contains('hidden')) {
        renderOrders();
    }
}

function updateOrderBadges() {
    const activeOrdersCount = state.orders.filter(o => o.status !== 'served').length;

    const badges = [DOM.activeOrdersBadge, DOM.mobileOrdersBadge];
    badges.forEach(badge => {
        if (badge) {
            badge.textContent = activeOrdersCount;
            badge.classList.toggle('hidden', activeOrdersCount === 0);
        }
    });

    if (DOM.floatingTrackOrder) {
        // Hide tracking button if all orders are served
        DOM.floatingTrackOrder.classList.toggle('hidden', activeOrdersCount === 0);
    }
    if (DOM.floatingOrderCount) {
        DOM.floatingOrderCount.textContent = activeOrdersCount;
        DOM.floatingOrderCount.classList.toggle('hidden', activeOrdersCount === 0);
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

    const activeOrders = state.orders;

    if (activeOrders.length === 0) {
        DOM.trackOrderList.innerHTML = '';
        return;
    }

    // 1. CAPTURE current visual states BEFORE any DOM changes
    const previousStates = {};
    document.querySelectorAll('.track-order-card').forEach(card => {
        const id = card.getAttribute('data-order-id');
        const progress = card.querySelector('.status-progress-fill');
        if (id && progress) {
            previousStates[id] = parseInt(progress.getAttribute('data-current-step'));
        }
    });

    // 2. BUILD the HTML blocks, incorporating previous states to prevent reset flicker
    const listEl = DOM.trackOrderList;
    const currentCards = Array.from(listEl.children);

    const orderHTMLBlocks = activeOrders.map((order) => {
        const isServed = order.status === 'served';
        const statusIndex = { 'received': 0, 'preparing': 1, 'ready': 2, 'served': 3 };
        const targetStep = statusIndex[order.status] || 0;

        // Use previous step as starting point if it exists
        const startStep = previousStates[order.id] !== undefined ? previousStates[order.id] : -1;
        const initialWidth = startStep >= 0 ? (startStep / 3) * 100 : 0;

        // Helper for initial step visuals
        const getStepStyle = (idx) => {
            if (startStep === -1) return '';
            if (idx < startStep || (idx === startStep && idx === 3))
                return 'background: #10b981;'; // Removed glow for Served
            if (idx === startStep)
                return 'background: var(--gradient-primary); box-shadow: 0 0 20px rgba(255, 140, 0, 0.6);';
            return '';
        };
        const getLabelClass = (idx) => {
            if (idx < startStep || (idx === startStep && idx === 3)) return 'completed';
            if (idx === startStep) return 'active';
            return '';
        };

        return {
            id: order.id,
            status: order.status,
            html: `
            <div class="track-order-card ${isServed ? 'order-served' : ''}" 
                 data-order-id="${order.id}" 
                 data-last-status="${order.status}">
                <div class="track-order-header">
                    <div>
                        <div class="track-order-id">Order #${order.id}</div>
                        <div class="track-order-time">${formatTime(order.timestamp)}</div>
                    </div>
                    ${isServed ? `
                        <span class="track-status-badge completed">✅ Served</span>
                    ` : `
                        <span class="track-status-badge">
                            <span class="live-dot"></span>
                            In Progress
                        </span>
                    `}
                </div>

                <!-- Status Tracker (Shows if active, or if just transitioning to Served) -->
                ${(() => {
                    const showTracker = !isServed || (isServed && startStep >= 0 && startStep < 3);
                    return `
                    <div class="status-tracker ${showTracker ? '' : 'hidden'}">
                        <div class="status-steps">
                            <div class="status-progress-line">
                                <div class="track-progress-${order.id} status-progress-fill" 
                                     style="width: ${initialWidth}%" 
                                     data-current-step="${startStep}"></div>
                            </div>
                            
                            ${['Received', 'Preparing', 'Ready', 'Served'].map((label, idx) => `
                                <div class="track-step-${order.id}-${idx} status-step">
                                    <div class="step-icon" style="${getStepStyle(idx)}">${['📝', '👨‍🍳', '🍽️', '✅'][idx]}</div>
                                    <span class="step-label ${getLabelClass(idx)}">${label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    `;
                })()}

                ${isServed ? `
                    <div class="served-confirmation">
                        <p>This order was served. Enjoy your meal! ❤️</p>
                    </div>
                ` : ''}

                <div class="track-order-items">
                    ${order.items.map(item => `
                        <div class="order-item-row">
                            <span>${item.emoji} ${item.name} <span class="item-qty">×${item.qty}</span></span>
                            <span>${CONFIG.currency}${item.price * item.qty}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="track-order-footer">
                    <div class="track-total">
                        <span class="track-total-label">Total</span>
                        <span class="track-total-value gradient-text">${CONFIG.currency}${order.total}</span>
                    </div>
                    ${!isServed ? `
                        <div class="track-eta">
                            <span class="track-eta-label">Estimated</span>
                            <span class="track-eta-value">${CONFIG.estimatedTime}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            `
        };
    });

    // 3. GRANULAR DOM UPDATE
    if (currentCards.length === orderHTMLBlocks.length && currentCards.length > 0) {
        orderHTMLBlocks.forEach((data, idx) => {
            const card = currentCards[idx];
            if (card.getAttribute('data-order-id') !== String(data.id) ||
                card.getAttribute('data-last-status') !== data.status) {
                card.outerHTML = data.html;
            }
        });
    } else {
        listEl.innerHTML = orderHTMLBlocks.map(d => d.html).join('');
    }

    // 4. TRIGGER targeted animations
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            activeOrders.forEach((order) => {
                const statusIndex = { 'received': 0, 'preparing': 1, 'ready': 2, 'served': 3 };
                const targetStep = statusIndex[order.status] || 0;
                const progressBar = document.querySelector(`.track-progress-${order.id}`);

                if (!progressBar) return;

                const currentStep = parseInt(progressBar.getAttribute('data-current-step'));
                let animationMode = false;

                if (!DOM.trackOrderModal.classList.contains('visible')) {
                    animationMode = 'full';
                } else if (currentStep < targetStep) {
                    animationMode = 'delta';
                }

                animateTrackOrderStatus(order.id, targetStep, animationMode);
            });
        });
    });
}

// Animate the track order status - animates UP TO the actual order status
function animateTrackOrderStatus(orderId, targetStep, mode = 'full') {
    const progressBar = document.querySelector(`.track-progress-${orderId}`);
    if (!progressBar) return;

    // Helper function to set step visual state immediately
    const setStepState = (step, state) => {
        const stepEl = document.querySelector(`.track-step-${orderId}-${step}`);
        if (!stepEl) return;
        const icon = stepEl.querySelector('.step-icon');
        const text = stepEl.querySelector('.step-label');

        if (state === 'completed') {
            if (icon) {
                icon.style.background = '#10b981';
                // Remove glow for Served step (step 3)
                icon.style.boxShadow = step === 3 ? 'none' : '0 0 15px rgba(16, 185, 129, 0.5)';
                icon.classList.remove('active');
                icon.classList.add('completed');
            }
            if (text) {
                text.style.color = '#10b981';
                text.classList.remove('active');
                text.classList.add('completed');
            }
        } else if (state === 'active') {
            if (icon) {
                icon.style.background = 'linear-gradient(135deg, #FF8C00 0%, #DC143C 100%)';
                icon.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.6)';
                icon.classList.add('active');
                icon.classList.remove('completed');
            }
            if (text) {
                text.style.color = '#FF8C00';
                text.classList.add('active');
                text.classList.remove('completed');
            }
        } else {
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
    };

    const currentStep = parseInt(progressBar.getAttribute('data-current-step'));

    if (!mode) {
        // Immediate sync: No animation
        for (let i = 0; i <= 3; i++) {
            if (i < targetStep) {
                setStepState(i, 'completed');
            } else if (i === targetStep) {
                // If it's the final step (Served), show as completed
                setStepState(i, i === 3 ? 'completed' : 'active');
            } else {
                setStepState(i, 'disabled');
            }
        }
        progressBar.style.width = `${(targetStep / 3) * 100}%`;
        progressBar.setAttribute('data-current-step', targetStep);
        return;
    }

    if (mode === 'full') {
        // Full Intro: Reset and animate from 0
        for (let i = 0; i <= 3; i++) setStepState(i, 'disabled');
        progressBar.style.width = '0%';
        progressBar.setAttribute('data-current-step', -1);

        animateSteps(0, targetStep);
    } else if (mode === 'delta') {
        // Delta Update: Animate from current to target
        // We DO NOT reset the progress bar here. We start from where we left off.
        const startFrom = Math.max(0, currentStep + 1);
        if (startFrom <= targetStep) {
            animateSteps(startFrom, targetStep);
        }
    }

    function animateSteps(start, end) {
        const stepDelay = 600;
        let animatedCount = 0;

        for (let step = start; step <= end; step++) {
            (function (s, index) {
                const delay = index * stepDelay;
                setTimeout(() => {
                    // Turn PREVIOUS step green (completed)
                    if (s > 0) {
                        setStepState(s - 1, 'completed');
                    }

                    // For the VERY LAST STEP (3 - Served), we want it to look completed (green)
                    // instead of remaining orange (active) forever
                    if (s === 3) {
                        setStepState(s, 'completed');
                        // Use a longer delay to hide the tracker after the completion is seen
                        setTimeout(() => {
                            const tracker = progressBar.closest('.status-tracker');
                            if (tracker) {
                                tracker.style.opacity = '0';
                                tracker.style.transition = 'opacity 0.6s ease';
                                setTimeout(() => tracker.classList.add('hidden'), 600);
                            }
                        }, 2000);
                    } else {
                        // Make CURRENT step orange (active)
                        setStepState(s, 'active');
                    }

                    // Update progress bar
                    const progressWidth = (s / 3) * 100;
                    progressBar.style.width = `${progressWidth}%`;
                    progressBar.setAttribute('data-current-step', s);
                }, delay);
            })(step, animatedCount);
            animatedCount++;
        }
    }
}

// ==========================================
// 10. MODAL FUNCTIONS
// ==========================================

function showModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('visible'), 10);
}

function hideModal(modal) {
    if (!modal) return;
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.add('hidden'), 300);
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

    // Issue #5: Fixed - Clean single approach for spicy indicator (removed duplication)
    if (DOM.itemModalSpicy) {
        if (item.spicy) {
            DOM.itemModalSpicy.textContent = 'Spicy';
            DOM.itemModalSpicy.style.display = 'inline-block';
        } else {
            DOM.itemModalSpicy.style.display = 'none';
        }
    }

    if (DOM.itemModalCategory) DOM.itemModalCategory.textContent = item.category;
    // Issue #1: Fixed XSS - changed innerHTML to textContent
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
        DOM.itemTotalPrice.innerHTML = `${CONFIG.currency}${total}`;
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

async function confirmCallWaiter() {
    if (!state.currentTable) {
        showToast('Please select a table first!', 'error');
        return;
    }

    try {
        const { error } = await supabaseClient
            .from('waiter_calls')
            .insert([{
                table_number: state.currentTable,
                status: 'pending'
            }]);

        if (error) throw error;

        hideModal(DOM.waiterModal);
        if (DOM.waiterCalledTableNumber) DOM.waiterCalledTableNumber.textContent = state.currentTable;
        showModal(DOM.waiterCalledModal);
        showToast('🔔 Waiter has been notified!');
    } catch (err) {
        console.error('Error calling waiter:', err.message);
        showToast('Failed to notify waiter. Please try again.', 'error');
    }
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
        const tableBtn = e.target.closest('.table-btn-compact, .table-card-premium');
        if (tableBtn) {
            console.log('Table clicked (Delegation):', tableBtn.dataset.table);

            // Only trigger if not already handled (optional check, but harmless to call setTable twice rarely)
            handleTableSelect(tableBtn);
        }
    });

    function handleTableSelect(card) {
        if (!card) return;

        // Visual feedback
        const allCards = document.querySelectorAll('.table-btn-compact, .table-card-premium');
        allCards.forEach(c => {
            c.setAttribute('aria-checked', 'false');
            c.classList.remove('selected');
        });


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
    if (DOM.mobileOrdersBtn) DOM.mobileOrdersBtn.addEventListener('click', showOrdersModal);
    if (DOM.closeOrdersModal) DOM.closeOrdersModal.addEventListener('click', () => hideModal(DOM.ordersModal));

    // Track order
    if (DOM.floatingTrackBtn) DOM.floatingTrackBtn.addEventListener('click', showTrackOrderModal);
    if (DOM.closeTrackOrderModal) DOM.closeTrackOrderModal.addEventListener('click', () => hideModal(DOM.trackOrderModal));

    // Success modal
    if (DOM.closeSuccessModal) DOM.closeSuccessModal.addEventListener('click', () => hideModal(DOM.successModal));

    // Waiter modals
    if (DOM.callWaiterBtn) DOM.callWaiterBtn.addEventListener('click', showWaiterModal);
    if (DOM.mobileWaiterBtn) DOM.mobileWaiterBtn.addEventListener('click', showWaiterModal);
    if (DOM.cancelWaiter) DOM.cancelWaiter.addEventListener('click', () => hideModal(DOM.waiterModal));
    if (DOM.confirmWaiter) DOM.confirmWaiter.addEventListener('click', confirmCallWaiter);
    if (DOM.closeWaiterCalled) DOM.closeWaiterCalled.addEventListener('click', () => hideModal(DOM.waiterCalledModal));

    // Welcome Screen Scanner & Admin Logic
    const toggleBtn = document.getElementById('toggleManualBtn');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleManualSelection);
        console.log('toggleManualBtn listener attached');
    } else {
        console.warn('toggleManualBtn not found in DOM');
    }

    const adminBtn = document.getElementById('kitchenAdminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', handleKitchenAdmin);
        console.log('kitchenAdminBtn listener attached');
    } else {
        console.warn('kitchenAdminBtn not found in DOM');
    }

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

    // Keyboard navigation removed (function undefined)

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
        // Issue #2: Improved error handling with user-friendly toast
        showToast('Unable to save data. Please check your browser settings.', 'warning');
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
        // Issue #2: Improved error handling - silently handle corrupted data
        state.cart = [];
        state.orders = [];
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

/**
 * Realtime subscription for customer's specific order
 */
function subscribeToOrderUpdates(orderNumber) {
    if (typeof supabaseClient === 'undefined') return;

    console.log(`Subscribing to Realtime updates for Order #${orderNumber}`);

    // Ensure we don't have multiple subscriptions for the same order
    const channelName = `cust-order-${orderNumber}`;

    const channel = supabaseClient
        .channel(channelName)
        .on('postgres_changes', {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `order_number=eq.${orderNumber}`
        }, (payload) => {
            console.log(`Realtime update for #${orderNumber}:`, payload.new.status);
            updateOrderStatus(orderNumber, payload.new.status);

            // Show toast for transparency
            const statusEmojis = { 'preparing': '👨‍🍳', 'ready': '🍽️', 'served': '✅' };
            const emoji = statusEmojis[payload.new.status] || '🔔';
            showToast(`${emoji} Order #${orderNumber} status: ${payload.new.status}`);
        })
        .subscribe((status) => {
            console.log(`Subscription status for #${orderNumber}:`, status);
        });

    return channel;
}

window.updateCartItemQty = updateCartItemQty;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.openItemModal = openItemModal;

// ==========================================
// 17. QR SCANNER & ADMIN LOGIC
// ==========================================

async function initQRScanner() {
    console.log('initQRScanner called');

    // Check if welcome screen is active (either style.display is flex OR it has the welcome-active class on body)
    const isWelcomeVisible = DOM.welcomeScreen && (DOM.welcomeScreen.style.display !== 'none') && document.body.classList.contains('welcome-active');

    if (!isWelcomeVisible) {
        console.log('initQRScanner: welcome screen not visible, skipping');
        return;
    }

    // Check if Html5Qrcode is loaded
    if (typeof Html5Qrcode === 'undefined') {
        console.error('Html5Qrcode library not loaded!');
        toggleManualSelection();
        return;
    }

    // Prevent double init
    if (state.html5QrCode) return;

    state.html5QrCode = new Html5Qrcode("reader");

    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };

    try {
        await state.html5QrCode.start(
            { facingMode: "environment" },
            config,
            onScanSuccess
        );
    } catch (err) {
        console.warn("QR Scanner Error:", err);
        // Fallback to manual selection if camera fails
        toggleManualSelection();
        showToast("Camera access denied or unavailable. Please select table manually.", "info");
    }
}

function onScanSuccess(decodedText, decodedResult) {
    console.log(`Scan result: ${decodedText}`);

    try {
        const url = new URL(decodedText);
        const table = url.searchParams.get("table");

        if (table) {
            showToast(`Table ${table} Detected! 🎯`, "success");
            stopQRScanner();
            setTable(table);
        } else {
            showToast("Invalid QR Code. Please scan a table QR.", "warning");
        }
    } catch (e) {
        // Handle non-URL QR codes or other formats
        if (!isNaN(decodedText) && (decodedText >= 1 && decodedText <= 4)) {
            showToast(`Table ${decodedText} Detected! 🎯`, "success");
            stopQRScanner();
            setTable(decodedText);
        } else {
            showToast("Invalid QR Code.", "warning");
        }
    }
}

async function stopQRScanner() {
    if (state.html5QrCode) {
        try {
            await state.html5QrCode.stop();
            state.html5QrCode = null;
        } catch (err) {
            console.error("Error stopping scanner:", err);
        }
    }
}

function toggleManualSelection() {
    console.log('toggleManualSelection called');
    const manual = document.getElementById('manualSelection');
    const scanner = document.getElementById('scannerSection');
    const toggleBtn = document.getElementById('toggleManualBtn');

    if (!manual || !scanner) return;

    const isManualHidden = manual.classList.contains("hidden");

    if (isManualHidden) {
        manual.classList.remove("hidden");
        scanner.classList.add("hidden");
        if (toggleBtn) toggleBtn.textContent = "Switch to Scanner";
        stopQRScanner();
    } else {
        manual.classList.add("hidden");
        scanner.classList.remove("hidden");
        if (toggleBtn) toggleBtn.textContent = "Switch to Manual Selection";
        initQRScanner();
    }
}

function handleKitchenAdmin() {
    const password = prompt("Enter Kitchen Dashboard Password:");
    if (password === "123") {
        window.open("kitchen.html", "_blank");
    } else if (password !== null) {
        showToast("Incorrect Password!", "error");
    }
}