/**
 * Viryo Digital Store & Admin Engine
 * Vanilla JavaScript E-Commerce & Dashboard State Manager
 */

// -------------------------------------------------------------------
// 1. INITIAL SEED DATA
// -------------------------------------------------------------------
const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Source Code POS & Kasir Pintar (CI3 + MySQL)',
    category: 'source-code',
    price: 350000,
    origPrice: 500000,
    stock: 99,
    badge: 'Best Seller',
    promo: 'Diskon 30%',
    icon: 'ri-store-3-line',
    desc: 'Aplikasi kasir web responsif berbasis Code Igniter 3 & MySQL. Dilengkapi fitur multi-user kasir, cetak struk thermal 58/80mm, barcode scanner, manajemen stok otomatis, dan laporan laba-rugi terperinci.',
    features: ['Code Igniter 3 Core', 'MySQL Relasional 3NF', 'Cetak Struk Thermal', 'Multi-User & Hak Akses', 'Export Excel & PDF']
  },
  {
    id: 'prod-002',
    name: 'RESTful API Starter Kit (PHP 8.3 + JWT)',
    category: 'api-backend',
    price: 175000,
    origPrice: 250000,
    stock: 120,
    badge: 'Popular',
    promo: 'Diskon 30%',
    icon: 'ri-server-line',
    desc: 'Boilerplate RESTful API siap pakai dengan PHP 8.3 murni. Menyediakan autentikasi JWT token, middleware rate-limiting, CORS, standard response JSON, validasi input, dan dokumentasi Postman Collection.',
    features: ['PHP 8.3 Engine', 'JWT Authentication', 'Rate Limiting Guard', 'Input Sanitization', 'Postman Collection']
  },
  {
    id: 'prod-003',
    name: 'Sistem Informasi Manajemen Dokumen & Arsip',
    category: 'source-code',
    price: 275000,
    origPrice: 400000,
    stock: 65,
    badge: 'Recommended',
    promo: 'Diskon 31%',
    icon: 'ri-file-shield-line',
    desc: 'Sistem manajemen arsip surat masuk dan keluar berbasis Code Igniter 3 & Tailwind CSS. Mendukung upload berkas PDF terenkripsi, tracking disposisi surat berjenjang, dan notifikasi status via WhatsApp.',
    features: ['Code Igniter 3 + Tailwind', 'Tracking Disposisi', 'Enkripsi Berkas Dokumen', 'Pencarian Cepat OCR/Tags', 'Responsif Mobile']
  },
  {
    id: 'prod-004',
    name: 'Jasa Integrasi WhatsApp Gateway & Notifikasi',
    category: 'service',
    price: 450000,
    origPrice: 650000,
    stock: 15,
    badge: 'Service',
    promo: 'Hemat Rp 200k',
    icon: 'ri-whatsapp-line',
    desc: 'Layanan integrasi API WhatsApp resmi atau gateway pihak ketiga ke aplikasi web Anda. Berguna untuk mengirimkan notifikasi OTP, invoice pembayaran, status pesanan, dan konfirmasi otomatis tanpa delay.',
    features: ['Kirim OTP Instan', 'Notifikasi Invoice Otomatis', 'Webhook Pesan Masuk', 'Dukungan Multi-Device', 'Garansi Setup 30 Hari']
  },
  {
    id: 'prod-005',
    name: 'Skema Database Relasional E-Commerce (MySQL)',
    category: 'database',
    price: 95000,
    origPrice: 150000,
    stock: 250,
    badge: 'Hot Item',
    promo: 'Diskon 36%',
    icon: 'ri-database-2-line',
    desc: 'Rancangan arsitektur database relasional lengkap untuk platform e-commerce dan marketplace. Terdiri dari 38 tabel normalisasi 3NF, query view optimasi laporan, indexing performa tinggi, dan file SQL dump 10.000 sample data.',
    features: ['38 Tabel Normalisasi 3NF', 'Diagram ERD Lengkap (PNG/PDF)', 'Query Stored Procedure & Views', 'Optimasi B-Tree Indexing', 'Dummy Data 10k Record']
  },
  {
    id: 'prod-006',
    name: 'Dashboard Admin Glassmorphism UI (HTML + Tailwind)',
    category: 'template',
    price: 120000,
    origPrice: 180000,
    stock: 80,
    badge: 'Modern UI',
    promo: 'Diskon 33%',
    icon: 'ri-dashboard-3-line',
    desc: 'Template dashboard antarmuka admin bernuansa modern dark glassmorphism. Dilengkapi grafik interaktif Chart.js, 15+ widget metrik responsif, data tables dengan filter, form elements, dan dark/light theme switchable.',
    features: ['HTML5 & Tailwind CSS', 'Mode Terang & Gelap', 'Grafik Chart.js Interaktif', '15+ Widget Metrik Siap Pakai', 'Zero Build Tool Needed']
  }
];

const INITIAL_ORDERS = [
  {
    id: 'ORD-20261105-1021',
    date: '2026-11-05 14:32',
    customerName: 'Budi Santoso',
    customerPhone: '6281234567890',
    customerEmail: 'budi@example.com',
    items: [
      { id: 'prod-001', name: 'Source Code POS & Kasir Pintar (CI3 + MySQL)', price: 350000, qty: 1 }
    ],
    total: 350000,
    paymentMethod: 'QRIS',
    status: 'completed',
    notes: 'Kirim link download ke WhatsApp'
  },
  {
    id: 'ORD-20261106-4491',
    date: '2026-11-06 09:15',
    customerName: 'Rian Hidayat',
    customerPhone: '6285712345678',
    customerEmail: 'rian@techcorp.id',
    items: [
      { id: 'prod-002', name: 'RESTful API Starter Kit (PHP 8.3 + JWT)', price: 175000, qty: 1 },
      { id: 'prod-005', name: 'Skema Database Relasional E-Commerce (MySQL)', price: 95000, qty: 1 }
    ],
    total: 270000,
    paymentMethod: 'Transfer Bank BCA',
    status: 'processing',
    notes: 'Sudah upload bukti transfer'
  },
  {
    id: 'ORD-20261106-8812',
    date: '2026-11-06 10:10',
    customerName: 'Siti Rahmawati',
    customerPhone: '6289988776655',
    customerEmail: 'siti@fashionstore.com',
    items: [
      { id: 'prod-004', name: 'Jasa Integrasi WhatsApp Gateway & Notifikasi', price: 450000, qty: 1 }
    ],
    total: 450000,
    paymentMethod: 'WhatsApp Direct',
    status: 'pending',
    notes: 'Menunggu konfirmasi via WhatsApp'
  }
];

const INITIAL_SETTINGS = {
  storeName: 'Infix Store',
  storeTagline: 'Source Code & Layanan Backend Berkualitas Tinggi',
  whatsappNumber: '6281234567890',
  currency: 'IDR'
};

// -------------------------------------------------------------------
// 2. STORAGE REPOSITORY
// -------------------------------------------------------------------
const StoreStorage = {
  getProducts() {
    const raw = localStorage.getItem('VIRYO_STORE_PRODUCTS');
    // If empty or has invitation seed, refresh with Infix developer catalog
    if (!raw || raw.includes('Undangan Digital')) {
      localStorage.setItem('VIRYO_STORE_PRODUCTS', JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    try {
      return JSON.parse(raw);
    } catch (_) {
      return INITIAL_PRODUCTS;
    }
  },

  saveProducts(products) {
    localStorage.setItem('VIRYO_STORE_PRODUCTS', JSON.stringify(products));
    window.dispatchEvent(new Event('store_data_updated'));
  },

  getOrders() {
    const raw = localStorage.getItem('VIRYO_STORE_ORDERS');
    if (!raw) {
      localStorage.setItem('VIRYO_STORE_ORDERS', JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch (_) {
      return INITIAL_ORDERS;
    }
  },

  saveOrders(orders) {
    localStorage.setItem('VIRYO_STORE_ORDERS', JSON.stringify(orders));
    window.dispatchEvent(new Event('store_data_updated'));
  },

  getSettings() {
    const raw = localStorage.getItem('VIRYO_STORE_SETTINGS');
    if (!raw) {
      localStorage.setItem('VIRYO_STORE_SETTINGS', JSON.stringify(INITIAL_SETTINGS));
      return INITIAL_SETTINGS;
    }
    try {
      return JSON.parse(raw);
    } catch (_) {
      return INITIAL_SETTINGS;
    }
  },

  saveSettings(settings) {
    localStorage.setItem('VIRYO_STORE_SETTINGS', JSON.stringify(settings));
    window.dispatchEvent(new Event('store_data_updated'));
  },

  resetDemoData() {
    localStorage.setItem('VIRYO_STORE_PRODUCTS', JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem('VIRYO_STORE_ORDERS', JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem('VIRYO_STORE_SETTINGS', JSON.stringify(INITIAL_SETTINGS));
    window.dispatchEvent(new Event('store_data_updated'));
  }
};

// -------------------------------------------------------------------
// 3. CART SYSTEM
// -------------------------------------------------------------------
const CartManager = {
  getCart() {
    const raw = localStorage.getItem('VIRYO_STORE_CART');
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch (_) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem('VIRYO_STORE_CART', JSON.stringify(cart));
    this.updateBadge();
    window.dispatchEvent(new Event('store_cart_updated'));
  },

  addItem(productId) {
    const products = StoreStorage.getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        qty: 1
      });
    }

    this.saveCart(cart);
    showToast(`"${product.name}" ditambahkan ke keranjang!`, 'success');
  },

  updateQuantity(productId, delta) {
    let cart = this.getCart();
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) {
        cart.splice(index, 1);
      }
    }
    this.saveCart(cart);
  },

  removeItem(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    showToast('Produk dihapus dari keranjang', 'success');
  },

  clearCart() {
    localStorage.removeItem('VIRYO_STORE_CART');
    this.updateBadge();
    window.dispatchEvent(new Event('store_cart_updated'));
  },

  getTotal() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  },

  getCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.qty, 0);
  },

  updateBadge() {
    const badge = document.getElementById('cartCounterBadge');
    if (!badge) return;
    const count = this.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
};

// -------------------------------------------------------------------
// 4. UTILITY HELPERS
// -------------------------------------------------------------------
function formatIDR(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}

function showToast(message, type = 'success') {
  let toast = document.getElementById('storeToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'storeToast';
    toast.className = 'store-toast';
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? 'ri-checkbox-circle-fill text-emerald-400' : 'ri-error-warning-fill text-rose-400';
  toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
  toast.className = `store-toast ${type} show`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// -------------------------------------------------------------------
// 5. THEME TOGGLER (SHARED WITH PORTFOLIO)
// -------------------------------------------------------------------
function initSharedTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlRoot = document.documentElement;

  const savedTheme = localStorage.getItem('viryo_portfolio_theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
    htmlRoot.setAttribute('data-theme', 'light');
  } else {
    htmlRoot.removeAttribute('data-theme');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isLight = htmlRoot.getAttribute('data-theme') === 'light';
      htmlRoot.classList.add('theme-switching');

      if (isLight) {
        htmlRoot.removeAttribute('data-theme');
        localStorage.setItem('viryo_portfolio_theme', 'dark');
      } else {
        htmlRoot.setAttribute('data-theme', 'light');
        localStorage.setItem('viryo_portfolio_theme', 'light');
      }

      setTimeout(() => {
        htmlRoot.classList.remove('theme-switching');
      }, 50);
    });
  }
}

// -------------------------------------------------------------------
// 6. SHOP FRONT-END LOGIC
// -------------------------------------------------------------------
function initShopPage() {
  initSharedTheme();
  CartManager.updateBadge();

  const productGrid = document.getElementById('productGrid');
  const categoryChips = document.querySelectorAll('.category-chip');
  const searchInput = document.getElementById('storeSearchInput');
  const sortSelect = document.getElementById('storeSortSelect');

  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const openCheckoutBtn = document.getElementById('openCheckoutBtn');

  // Checkout modal elements
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutItemsSummary = document.getElementById('checkoutItemsSummary');
  const checkoutGrandTotal = document.getElementById('checkoutGrandTotal');

  // Detail modal elements
  const detailModal = document.getElementById('productDetailModal');
  const closeDetailBtn = document.getElementById('closeDetailBtn');
  const detailModalBody = document.getElementById('productDetailBody');

  let activeCategory = 'all';
  let searchQuery = '';
  let activeSort = 'latest';

  function renderProducts() {
    if (!productGrid) return;
    const allProducts = StoreStorage.getProducts();

    // 1. Filter category
    let filtered = allProducts.filter(p => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.features.some(f => f.toLowerCase().includes(q));
      }
      return true;
    });

    // 2. Sort
    if (activeSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (filtered.length === 0) {
      productGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="ri-search-line" style="font-size: 3rem; opacity: 0.3; display: block; margin-bottom: 1rem;"></i>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">Tidak Ada Produk Ditemukan</h3>
          <p>Coba gunakan kata kunci lain atau pilih kategori yang berbeda.</p>
        </div>
      `;
      return;
    }

    productGrid.innerHTML = filtered.map(p => {
      const origPriceHtml = p.origPrice ? `<span class="product-price-orig">${formatIDR(p.origPrice)}</span>` : '';
      const promoBadgeHtml = p.promo ? `<div class="product-promo-badge">${p.promo}</div>` : '';
      const pillsHtml = p.features.slice(0, 3).map(f => `<span class="feature-pill">${f}</span>`).join('');

      return `
        <div class="product-card" onclick="handleCardClick(event, '${p.id}')">
          <div class="product-card-banner">
            <span class="product-category-badge">${p.category}</span>
            ${promoBadgeHtml}
            <i class="${p.icon || 'ri-code-box-line'} product-banner-icon"></i>
          </div>
          <div class="product-card-body">
            <h3 class="product-title">${p.name}</h3>
            <p class="product-desc">${p.desc}</p>
            <div class="product-features-pills">
              ${pillsHtml}
            </div>
          </div>
          <div class="product-card-footer">
            <div class="product-price-box">
              ${origPriceHtml}
              <span class="product-price-current">${formatIDR(p.price)}</span>
            </div>
            <div class="product-actions">
              <button class="btn-detail" onclick="event.stopPropagation(); openProductDetail('${p.id}')" title="Lihat Detail Produk">
                <i class="ri-eye-line"></i>
              </button>
              <button class="btn-add-cart" onclick="event.stopPropagation(); CartManager.addItem('${p.id}')">
                <i class="ri-shopping-bag-3-line"></i> Beli
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Categories Filter
  categoryChips.forEach(chip => {
    chip.addEventListener('click', () => {
      categoryChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-category');
      renderProducts();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort Select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderProducts();
    });
  }

  // Cart Drawer Open/Close
  function openCart() {
    renderCart();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Render Cart Drawer
  function renderCart() {
    if (!cartItemsList) return;
    const cart = CartManager.getCart();

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="ri-shopping-cart-2-line"></i>
          <h4>Keranjang Anda Kosong</h4>
          <p style="font-size: 0.85rem; margin-top: 0.4rem;">Silakan jelajahi katalog produk kami untuk menambahkan item.</p>
        </div>
      `;
      if (cartSubtotalEl) cartSubtotalEl.textContent = formatIDR(0);
      if (cartTotalEl) cartTotalEl.textContent = formatIDR(0);
      if (openCheckoutBtn) openCheckoutBtn.disabled = true;
      return;
    }

    if (openCheckoutBtn) openCheckoutBtn.disabled = false;
    const total = CartManager.getTotal();
    if (cartSubtotalEl) cartSubtotalEl.textContent = formatIDR(total);
    if (cartTotalEl) cartTotalEl.textContent = formatIDR(total);

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">
          <i class="${item.icon || 'ri-code-box-line'}"></i>
        </div>
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">${formatIDR(item.price)}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="CartManager.updateQuantity('${item.id}', -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="CartManager.updateQuantity('${item.id}', 1)">+</button>
          <button class="qty-btn" style="color:#ef4444;" onclick="CartManager.removeItem('${item.id}')" title="Hapus Item">
            <i class="ri-delete-bin-line"></i>
          </button>
        </div>
      </div>
    `).join('');
  }

  // Open Checkout Modal
  if (openCheckoutBtn) {
    openCheckoutBtn.addEventListener('click', () => {
      closeCart();
      const cart = CartManager.getCart();
      if (cart.length === 0) return;

      if (checkoutItemsSummary) {
        checkoutItemsSummary.innerHTML = cart.map(i => `
          <div style="display:flex; justify-content:space-between; font-size:0.86rem; color:var(--text-secondary); margin-bottom:0.4rem;">
            <span>${i.name} <strong>x${i.qty}</strong></span>
            <span style="font-family:'JetBrains Mono',monospace;">${formatIDR(i.price * i.qty)}</span>
          </div>
        `).join('');
      }

      if (checkoutGrandTotal) {
        checkoutGrandTotal.textContent = formatIDR(CartManager.getTotal());
      }

      checkoutModal.classList.add('open');
    });
  }

  if (closeCheckoutBtn) closeCheckoutBtn.addEventListener('click', () => checkoutModal.classList.remove('open'));
  if (cancelCheckoutBtn) cancelCheckoutBtn.addEventListener('click', () => checkoutModal.classList.remove('open'));

  // Submit Checkout Form
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cart = CartManager.getCart();
      if (cart.length === 0) return;

      const name = document.getElementById('custName').value.trim();
      const phone = document.getElementById('custPhone').value.trim();
      const email = document.getElementById('custEmail').value.trim();
      const payment = document.getElementById('custPayment').value;
      const notes = document.getElementById('custNotes').value.trim();

      const orderId = 'ORD-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
      const total = CartManager.getTotal();

      const newOrder = {
        id: orderId,
        date: new Date().toISOString().slice(0, 16).replace('T', ' '),
        customerName: name,
        customerPhone: phone,
        customerEmail: email,
        items: cart,
        total: total,
        paymentMethod: payment,
        status: 'pending',
        notes: notes
      };

      const orders = StoreStorage.getOrders();
      orders.unshift(newOrder);
      StoreStorage.saveOrders(orders);

      CartManager.clearCart();
      checkoutModal.classList.remove('open');

      // Build WhatsApp message
      const settings = StoreStorage.getSettings();
      let waText = `Halo *${settings.storeName}*, saya ingin konfirmasi pesanan:\n\n`;
      waText += `*No. Pesanan:* ${orderId}\n`;
      waText += `*Nama:* ${name}\n`;
      waText += `*WhatsApp:* ${phone}\n`;
      waText += `*Metode Bayar:* ${payment}\n\n`;
      waText += `*Daftar Produk:*\n`;
      cart.forEach((c, idx) => {
        waText += `${idx + 1}. ${c.name} (x${c.qty}) - ${formatIDR(c.price * c.qty)}\n`;
      });
      waText += `\n*Total Bayar:* ${formatIDR(total)}\n`;
      if (notes) waText += `*Catatan:* ${notes}\n`;
      waText += `\nMohon petunjuk pembayaran & pengiriman link download. Terima kasih!`;

      const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(waText)}`;

      // Show Success Modal / Alert
      showToast('Pesanan berhasil dibuat! Membuka WhatsApp...', 'success');
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 800);
    });
  }

  // Global listeners for data updates
  window.addEventListener('store_data_updated', renderProducts);
  window.addEventListener('store_cart_updated', renderCart);

  // Initial render
  renderProducts();
}

// Product card click handler (especially useful on mobile where whole card can be tapped)
window.handleCardClick = function(event, productId) {
  if (event.target.closest('.btn-add-cart') || event.target.closest('.btn-detail')) {
    return;
  }
  window.openProductDetail(productId);
};

// Product detail modal opener
window.openProductDetail = function(productId) {
  const detailModal = document.getElementById('productDetailModal');
  const detailModalBody = document.getElementById('productDetailBody');
  if (!detailModal || !detailModalBody) return;

  const products = StoreStorage.getProducts();
  const product = products.find(p => p.id === productId);
  if (!product) return;

  detailModalBody.innerHTML = `
    <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem;">
      <div style="width:4.5rem; height:4.5rem; border-radius:1rem; background:var(--tag-bg); display:flex; align-items:center; justify-content:center; font-size:2.25rem; color:var(--brand-cyan-light); flex-shrink:0;">
        <i class="${product.icon || 'ri-code-box-line'}"></i>
      </div>
      <div>
        <span class="product-category-badge" style="position:static; display:inline-block; margin-bottom:0.4rem;">${product.category}</span>
        <h3 style="font-size:1.35rem; font-weight:800; line-height:1.2; color:var(--text-primary);">${product.name}</h3>
        <div style="margin-top:0.35rem;">
          ${product.origPrice ? `<span style="text-decoration:line-through; color:var(--text-muted); font-size:0.85rem; margin-right:0.5rem; font-family:'JetBrains Mono',monospace;">${formatIDR(product.origPrice)}</span>` : ''}
          <span style="font-size:1.45rem; font-weight:800; color:var(--brand-cyan-light); font-family:'JetBrains Mono',monospace;">${formatIDR(product.price)}</span>
        </div>
      </div>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:0.92rem; font-weight:700; color:var(--text-primary); margin-bottom:0.5rem;">Deskripsi Produk</h4>
      <p style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">${product.desc}</p>
    </div>

    <div style="margin-bottom:1.5rem;">
      <h4 style="font-size:0.92rem; font-weight:700; color:var(--text-primary); margin-bottom:0.65rem;">Fitur &amp; Spesifikasi Utama</h4>
      <div style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
        ${product.features.map(f => `
          <div style="display:flex; align-items:center; gap:0.6rem; font-size:0.88rem; color:var(--text-primary); background:var(--bg-card); padding:0.55rem 0.85rem; border-radius:0.5rem; border:1px solid var(--border-subtle);">
            <i class="ri-checkbox-circle-fill text-emerald-400"></i>
            <span>${f}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; padding-top:1rem; border-top:1px solid var(--border-subtle);">
      <span style="font-size:0.85rem; color:var(--text-muted);">Tersedia: <strong>${product.stock} lisensi/unit</strong></span>
      <button class="btn-add-cart" style="padding:0.75rem 1.5rem;" onclick="CartManager.addItem('${product.id}'); document.getElementById('productDetailModal').classList.remove('open');">
        <i class="ri-shopping-bag-3-line"></i> Masukkan Keranjang
      </button>
    </div>
  `;

  detailModal.classList.add('open');
};

// -------------------------------------------------------------------
// 7. ADMIN DASHBOARD LOGIC
// -------------------------------------------------------------------
function initAdminPage() {
  initSharedTheme();

  // Navigation tabs in admin
  const navItems = document.querySelectorAll('.admin-nav-item');
  const sections = {
    overview: document.getElementById('secOverview'),
    products: document.getElementById('secProducts'),
    orders: document.getElementById('secOrders'),
    settings: document.getElementById('secSettings')
  };

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      const targetSec = item.getAttribute('data-section');
      Object.keys(sections).forEach(key => {
        if (sections[key]) {
          sections[key].style.display = key === targetSec ? 'block' : 'none';
        }
      });
    });
  });

  // Calculate & Render Stats
  function renderStats() {
    const products = StoreStorage.getProducts();
    const orders = StoreStorage.getOrders();

    const totalRevenue = orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.total, 0);

    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const totalOrders = orders.length;
    const totalProducts = products.length;

    const elRevenue = document.getElementById('statTotalRevenue');
    const elOrders = document.getElementById('statTotalOrders');
    const elPending = document.getElementById('statPendingOrders');
    const elProducts = document.getElementById('statTotalProducts');

    if (elRevenue) elRevenue.textContent = formatIDR(totalRevenue);
    if (elOrders) elOrders.textContent = totalOrders;
    if (elPending) elPending.textContent = pendingOrders;
    if (elProducts) elProducts.textContent = totalProducts;
  }

  // Render Product Table in Admin
  function renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTbody');
    if (!tbody) return;

    const products = StoreStorage.getProducts();
    if (products.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem;">Belum ada produk terdaftar.</td></tr>`;
      return;
    }

    tbody.innerHTML = products.map(p => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="width:2.5rem; height:2.5rem; border-radius:0.5rem; background:var(--tag-bg); display:flex; align-items:center; justify-content:center; color:var(--brand-cyan-light); font-size:1.25rem;">
              <i class="${p.icon || 'ri-code-box-line'}"></i>
            </div>
            <div>
              <div style="font-weight:700; color:var(--text-primary);">${p.name}</div>
              <div style="font-size:0.75rem; color:var(--text-muted); font-family:'JetBrains Mono',monospace;">${p.id}</div>
            </div>
          </div>
        </td>
        <td><span class="status-badge processing">${p.category}</span></td>
        <td style="font-family:'JetBrains Mono',monospace; font-weight:700; color:var(--brand-cyan-light);">${formatIDR(p.price)}</td>
        <td style="font-family:'JetBrains Mono',monospace;">${p.stock} unit</td>
        <td><span class="status-badge completed">${p.badge || 'Active'}</span></td>
        <td>
          <div style="display:flex; gap:0.4rem;">
            <button class="table-action-btn" onclick="openEditProductModal('${p.id}')" title="Edit Produk">
              <i class="ri-edit-line"></i>
            </button>
            <button class="table-action-btn delete" onclick="deleteProduct('${p.id}')" title="Hapus Produk">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Render Orders Table in Admin
  function renderAdminOrdersTable() {
    const tbody = document.getElementById('adminOrdersTbody');
    if (!tbody) return;

    const orders = StoreStorage.getOrders();
    if (orders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem;">Belum ada pesanan masuk.</td></tr>`;
      return;
    }

    tbody.innerHTML = orders.map(o => {
      const itemsList = o.items.map(i => `${i.name} (x${i.qty})`).join(', ');

      return `
        <tr>
          <td style="font-family:'JetBrains Mono',monospace; font-weight:700; color:var(--brand-cyan-light);">${o.id}</td>
          <td>
            <div style="font-weight:700; color:var(--text-primary);">${o.customerName}</div>
            <div style="font-size:0.78rem; color:var(--text-muted);">${o.customerPhone} | ${o.customerEmail}</div>
          </td>
          <td style="max-width:200px; font-size:0.82rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${itemsList}">${itemsList}</td>
          <td style="font-family:'JetBrains Mono',monospace; font-weight:700;">${formatIDR(o.total)}</td>
          <td><span style="font-size:0.8rem; color:var(--text-muted);">${o.paymentMethod}</span></td>
          <td>
            <select class="form-control" style="padding:0.25rem 0.5rem; font-size:0.78rem;" onchange="updateOrderStatus('${o.id}', this.value)">
              <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Menunggu Pembayaran</option>
              <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Diproses</option>
              <option value="completed" ${o.status === 'completed' ? 'selected' : ''}>Selesai</option>
              <option value="cancelled" ${o.status === 'cancelled' ? 'selected' : ''}>Dibatalkan</option>
            </select>
          </td>
          <td>
            <button class="table-action-btn delete" onclick="deleteOrder('${o.id}')" title="Hapus Pesanan">
              <i class="ri-delete-bin-line"></i>
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }

  // Settings Form
  const settingsForm = document.getElementById('adminSettingsForm');
  if (settingsForm) {
    const s = StoreStorage.getSettings();
    document.getElementById('setStoreName').value = s.storeName || '';
    document.getElementById('setStoreTagline').value = s.storeTagline || '';
    document.getElementById('setStoreWa').value = s.whatsappNumber || '';

    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const updated = {
        storeName: document.getElementById('setStoreName').value.trim(),
        storeTagline: document.getElementById('setStoreTagline').value.trim(),
        whatsappNumber: document.getElementById('setStoreWa').value.trim(),
        currency: 'IDR'
      };
      StoreStorage.saveSettings(updated);
      showToast('Pengaturan toko berhasil disimpan!', 'success');
    });
  }

  // Reset Demo Data Button
  const resetDemoBtn = document.getElementById('resetDemoDataBtn');
  if (resetDemoBtn) {
    resetDemoBtn.addEventListener('click', () => {
      if (confirm('Kembalikan semua produk dan pesanan ke data demo default?')) {
        StoreStorage.resetDemoData();
        showToast('Data demo berhasil di-reset!', 'success');
        refreshAdmin();
      }
    });
  }

  function refreshAdmin() {
    renderStats();
    renderAdminProductsTable();
    renderAdminOrdersTable();
  }

  window.addEventListener('store_data_updated', refreshAdmin);
  refreshAdmin();
}

// Global Admin Action Handlers
window.openAddProductModal = function() {
  const modal = document.getElementById('productFormModal');
  const form = document.getElementById('productAdminForm');
  if (!modal || !form) return;

  document.getElementById('modalFormTitle').textContent = 'Tambah Produk Baru';
  form.reset();
  document.getElementById('prodId').value = '';
  modal.classList.add('open');
};

window.openEditProductModal = function(productId) {
  const modal = document.getElementById('productFormModal');
  if (!modal) return;

  const products = StoreStorage.getProducts();
  const p = products.find(prod => prod.id === productId);
  if (!p) return;

  document.getElementById('modalFormTitle').textContent = 'Edit Produk';
  document.getElementById('prodId').value = p.id;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodOrigPrice').value = p.origPrice || '';
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodBadge').value = p.badge || '';
  document.getElementById('prodIcon').value = p.icon || 'ri-code-box-line';
  document.getElementById('prodDesc').value = p.desc || '';
  document.getElementById('prodFeatures').value = (p.features || []).join('\n');

  modal.classList.add('open');
};

window.saveProductFromModal = function(e) {
  e.preventDefault();
  const id = document.getElementById('prodId').value;
  const name = document.getElementById('prodName').value.trim();
  const category = document.getElementById('prodCategory').value;
  const price = parseInt(document.getElementById('prodPrice').value, 10) || 0;
  const origPrice = parseInt(document.getElementById('prodOrigPrice').value, 10) || 0;
  const stock = parseInt(document.getElementById('prodStock').value, 10) || 0;
  const badge = document.getElementById('prodBadge').value.trim();
  const icon = document.getElementById('prodIcon').value.trim() || 'ri-code-box-line';
  const desc = document.getElementById('prodDesc').value.trim();
  const features = document.getElementById('prodFeatures').value.split('\n').map(s => s.trim()).filter(Boolean);

  let products = StoreStorage.getProducts();

  if (id) {
    // Edit existing
    const index = products.findIndex(p => p.id === id);
    if (index > -1) {
      products[index] = {
        ...products[index],
        name, category, price, origPrice, stock, badge, icon, desc, features
      };
      showToast('Produk berhasil diperbarui!', 'success');
    }
  } else {
    // Add new
    const newId = 'prod-' + String(products.length + 1).padStart(3, '0');
    products.unshift({
      id: newId,
      name, category, price, origPrice, stock, badge, icon, desc, features
    });
    showToast('Produk baru berhasil ditambahkan!', 'success');
  }

  StoreStorage.saveProducts(products);
  document.getElementById('productFormModal').classList.remove('open');
};

window.deleteProduct = function(productId) {
  if (confirm('Yakin ingin menghapus produk ini dari katalog?')) {
    let products = StoreStorage.getProducts();
    products = products.filter(p => p.id !== productId);
    StoreStorage.saveProducts(products);
    showToast('Produk berhasil dihapus.', 'success');
  }
};

window.updateOrderStatus = function(orderId, newStatus) {
  let orders = StoreStorage.getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    StoreStorage.saveOrders(orders);
    showToast(`Status pesanan ${orderId} diubah menjadi: ${newStatus}`, 'success');
  }
};

window.deleteOrder = function(orderId) {
  if (confirm('Hapus riwayat pesanan ini?')) {
    let orders = StoreStorage.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    StoreStorage.saveOrders(orders);
    showToast('Pesanan berhasil dihapus.', 'success');
  }
};

