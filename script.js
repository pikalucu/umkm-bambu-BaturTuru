// ============================================================
//   PringBatur - Main JavaScript
// ============================================================

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: 'Kursi Bambu Minimalis',
    category: 'perabot',
    price: 320000,
    image: 'images/kursi_bambu.png',
    badge: 'Terlaris',
    rating: 4.9,
    reviews: 128,
    desc: 'Kursi bambu dengan desain minimalis modern yang kokoh dan nyaman. Dibuat dari bambu pilihan yang telah diawetkan, cocok untuk penggunaan indoor maupun outdoor. Finishing natural memberi kesan hangat dan alami.',
    specs: { Material: 'Bambu Petung', Dimensi: '60x55x85 cm', Berat: '4.5 kg', Finishing: 'Natural Oil' },
    tag: 'unggulan'
  },
  {
    id: 2,
    name: 'Lampu Gantung Bambu',
    category: 'dekorasi',
    price: 185000,
    image: 'images/lampu_bambu.png',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 94,
    desc: 'Lampu gantung bambu anyam dengan motif tradisional yang menghasilkan cahaya hangat dan dramatis. Ideal sebagai centerpiece ruang tamu atau restoran. Tersedia dalam 3 ukuran.',
    specs: { Material: 'Bambu Apus', Dimensi: 'Ø30x40 cm', Kabel: '150 cm', Bohlam: 'E27 (Tidak termasuk)' },
    tag: 'unggulan'
  },
  {
    id: 3,
    name: 'Keranjang Bambu Anyam',
    category: 'dekorasi',
    price: 75000,
    image: 'images/keranjang_bambu.png',
    badge: 'New',
    rating: 4.7,
    reviews: 67,
    desc: 'Keranjang bambu anyaman tradisional yang kuat dan serbaguna. Cocok untuk menyimpan buah, sayuran, atau barang-barang kecil. Tersedia dalam berbagai ukuran S, M, dan L.',
    specs: { Material: 'Bambu Wulung', Dimensi: 'Ø25x20 cm (M)', Berat: '0.4 kg', Finishing: 'Natural Varnish' },
    tag: 'terbaru'
  },
  {
    id: 4,
    name: 'Nampan Bambu Persegi',
    category: 'dekorasi',
    price: 60000,
    image: 'images/nampan_bambu.png',
    badge: null,
    rating: 4.6,
    reviews: 43,
    desc: 'Nampan bambu persegi dengan tepian tinggi yang elegan. Cocok untuk menyajikan makanan dan minuman, atau sebagai dekorasi meja. Mudah dibersihkan dan tahan lama.',
    specs: { Material: 'Bambu Apus', Dimensi: '40x30x5 cm', Berat: '0.3 kg', Finishing: 'Food-safe Lacquer' },
    tag: 'termurah'
  },
  {
    id: 5,
    name: 'Meja Bambu Minimalis',
    category: 'perabot',
    price: 520000,
    image: 'images/meja_bambu.png',
    badge: null,
    rating: 4.8,
    reviews: 52,
    desc: 'Meja bambu dengan desain minimalis dan rak penyimpanan di bawahnya. Sempurna untuk ruang tamu, teras, atau sudut baca. Material bambu solid yang kuat dan tahan lama.',
    specs: { Material: 'Bambu Petung', Dimensi: '60x40x55 cm', Berat: '6 kg', Finishing: 'Walnut Stain' },
    tag: 'unggulan'
  },
  {
    id: 6,
    name: 'Hiasan Dinding Bambu',
    category: 'dekorasi',
    price: 120000,
    image: 'images/hiasan_dinding.png',
    badge: 'New',
    rating: 4.9,
    reviews: 38,
    desc: 'Panel hiasan dinding dengan anyaman bambu motif geometris tradisional. Hadirkan nuansa boho-chic dan natural ke dalam rumah Anda. Ringan, mudah dipasang, dan tahan lama.',
    specs: { Material: 'Bambu Wulung', Dimensi: '50x50 cm', Berat: '0.8 kg', Warna: 'Natural Brown' },
    tag: 'terbaru'
  },
  {
    id: 7,
    name: 'Set Keranjang Bumbu',
    category: 'dekorasi',
    price: 85000,
    image: 'images/keranjang_bambu.png',
    badge: null,
    rating: 4.5,
    reviews: 29,
    desc: 'Set 3 keranjang bumbu berbahan bambu untuk dapur Anda. Tersedia dalam ukuran kecil, sedang, dan besar. Sangat fungsional dan estetis, cocok untuk dapur bergaya rustic.',
    specs: { Material: 'Bambu Apus', Isi: '3 buah (S,M,L)', Berat: '0.6 kg', Finishing: 'Natural' },
    tag: 'termurah'
  },
  {
    id: 8,
    name: 'Rak Bambu 3 Susun',
    category: 'perabot',
    price: 430000,
    image: 'images/meja_bambu.png',
    badge: 'Terlaris',
    rating: 4.7,
    reviews: 71,
    desc: 'Rak bambu 3 tingkat yang kokoh dan stylish. Cocok untuk menyimpan tanaman, buku, dekorasi, atau perlengkapan dapur. Desain ramping yang tidak memakan banyak tempat.',
    specs: { Material: 'Bambu Petung', Dimensi: '40x30x90 cm', Berat: '5.5 kg', Finishing: 'Natural Oil' },
    tag: 'terlaris'
  }
];

let currentFilter = 'all';
let currentSort = 'unggulan';
let searchQuery = '';

// ---- Render Products ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  
  // Filter by category AND search query (restricting search to name/title only)
  let filtered = products.filter(p => {
    const matchCategory = currentFilter === 'all' || p.category === currentFilter;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Sort
  if (currentSort === 'termurah') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'terlaris') filtered.sort((a, b) => b.reviews - a.reviews);
  else if (currentSort === 'terbaru') filtered.sort((a, b) => b.id - a.id);
  else filtered.sort((a, b) => (b.tag === 'unggulan' ? 1 : 0) - (a.tag === 'unggulan' ? 1 : 0));

  // Update result count text
  if (countEl) {
    if (searchQuery) {
      countEl.innerHTML = `Menemukan <strong>${filtered.length}</strong> produk untuk "${searchQuery}"`;
    } else {
      const catText = currentFilter === 'all' ? 'semua' : categoryLabel(currentFilter);
      countEl.innerHTML = `Menampilkan <strong>${filtered.length}</strong> produk kategori ${catText}`;
    }
  }

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-light);">
      <div style="font-size:3rem;margin-bottom:12px;">🎋</div>
      <p>Tidak ada produk yang cocok dengan kriteria Anda</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    // Hide 'Promo' badge as it represents discounts
    const displayBadge = (p.badge && p.badge !== 'Promo') ? p.badge : null;

    return `
      <div class="product-card reveal" data-id="${p.id}" onclick="openModal(${p.id})">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
          ${displayBadge ? `<div class="product-badge ${displayBadge === 'New' || displayBadge === 'Terbaru' ? 'new' : ''}">${displayBadge}</div>` : ''}
          <div class="product-overlay">
            <button class="btn-order-wa" onclick="orderViaWA(event, ${p.id})">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Pesan WA
            </button>
            <button class="btn-detail" onclick="openModal(event, ${p.id})">Detail</button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-category">${categoryLabel(p.category)}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price-row">
            <div>
              <div class="product-price">${formatPrice(p.price)}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-apply reveal animation
  observeReveal();
}

function categoryLabel(cat) {
  const labels = {
    perabot: 'Perabot', dekorasi: 'Dekorasi',
    peralatan: 'Peralatan', aksesoris: 'Aksesoris'
  };
  return labels[cat] || cat;
}

function formatPrice(p) {
  return 'Rp' + p.toLocaleString('id-ID');
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '★'.repeat(full);
  if (half) s += '⭐';
  s += '☆'.repeat(5 - full - (half ? 1 : 0));
  return s;
}

// ---- Pending Filter State (applied only when Terapkan is clicked) ----
let pendingFilter = 'all';
let pendingSort = 'unggulan';

// ---- Init pill click listeners (not inline onclick, use data attrs) ----
function initFilterListeners() {
  // Category pills
  document.querySelectorAll('#categoryPillsGroup .cat-pill').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#categoryPillsGroup .cat-pill').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      pendingFilter = this.getAttribute('data-cat');
    });
  });

  // Sort tabs
  document.querySelectorAll('#sortTabsGroup .filter-tab').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('#sortTabsGroup .filter-tab').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      pendingSort = this.getAttribute('data-sort');
    });
  });
}

// ---- Apply Filter ----
function applyFilter() {
  currentFilter = pendingFilter;
  currentSort = pendingSort;
  renderProducts();
  // Close the panel after applying
  const panel = document.getElementById('filterPanel');
  const btn = document.getElementById('btnFilterToggle');
  const backdrop = document.getElementById('filterBackdrop');
  if (panel) panel.classList.remove('active');
  if (btn) btn.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- Reset Filter ----
function resetFilter() {
  pendingFilter = 'all';
  pendingSort = 'unggulan';
  // Reset UI pills
  document.querySelectorAll('#categoryPillsGroup .cat-pill').forEach(b => b.classList.remove('active'));
  const allPill = document.querySelector('#categoryPillsGroup .cat-pill[data-cat="all"]');
  if (allPill) allPill.classList.add('active');
  document.querySelectorAll('#sortTabsGroup .filter-tab').forEach(b => b.classList.remove('active'));
  const unggulanTab = document.querySelector('#sortTabsGroup .filter-tab[data-sort="unggulan"]');
  if (unggulanTab) unggulanTab.classList.add('active');
}

// ---- Filter by Category (legacy, kept for compatibility) ----
function filterProducts(cat, el) {
  currentFilter = cat;
  
  // Sync the pills inside the filter panel to match
  document.querySelectorAll('#categoryPillsGroup .cat-pill').forEach(b => {
    if (b.getAttribute('data-cat') === cat) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
  pendingFilter = cat;
  
  document.querySelectorAll('.cat-pill').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts();
  
  // Smooth scroll to product grid
  const prodSection = document.getElementById('produk');
  if (prodSection) {
    prodSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ---- Search Handler ----
function handleSearch() {
  const input = document.getElementById('productSearch');
  searchQuery = input.value.trim();
  renderProducts();
}

// ---- Sort Products (legacy, kept for compatibility) ----
function sortProducts(sort, el) {
  currentSort = sort;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts();
}



// ---- Order via WhatsApp ----
function orderViaWA(e, id) {
  if (e) e.stopPropagation();
  const p = products.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(
    `Halo PringBatur! 😊\n\nSaya ingin memesan:\n*${p.name}*\nHarga: ${formatPrice(p.price)}\n\nMohon info ketersediaan dan cara pemesanannya. Terima kasih!`
  );
  window.open(`https://wa.me/6285213168134?text=${msg}`, '_blank');
}

// ---- Modal ----
function openModal(idOrEvent, maybeId) {
  let id;
  if (typeof idOrEvent === 'number') {
    id = idOrEvent;
  } else if (maybeId !== undefined) {
    if (idOrEvent && idOrEvent.stopPropagation) idOrEvent.stopPropagation();
    id = maybeId;
  } else {
    return;
  }

  const p = products.find(x => x.id === id);
  if (!p) return;

  document.getElementById('modalImg').src = p.image;
  document.getElementById('modalImg').alt = p.name;
  document.getElementById('modalCat').textContent = categoryLabel(p.category);
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalPrice').textContent = formatPrice(p.price);
  document.getElementById('modalDesc').textContent = p.desc;

  const specsEl = document.getElementById('modalSpecs');
  specsEl.innerHTML = Object.entries(p.specs).map(([k,v]) => `
    <div class="spec-item"><label>${k}</label><span>${v}</span></div>
  `).join('');

  const actionsEl = document.getElementById('modalActions');
  const msg = encodeURIComponent(`Halo PringBatur! Saya ingin memesan *${p.name}* (${formatPrice(p.price)}). Apakah tersedia?`);
  actionsEl.innerHTML = `
    <a href="https://wa.me/6285213168134?text=${msg}" target="_blank" class="btn btn-wa" style="flex:1;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      Pesan via WhatsApp
    </a>
  `;

  document.getElementById('productModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('productModal').classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('productModal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

// Close on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ---- Toast Notification ----
function showToast(msg, icon = '✅') {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.querySelector('.toast-icon').textContent = icon;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}



// ---- Newsletter ----
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (!email || !email.includes('@')) {
    showToast('Masukkan email yang valid!', '⚠️');
    return;
  }
  showToast('Berhasil berlangganan newsletter! 🎉', '✅');
  document.getElementById('newsletterEmail').value = '';
}

// ---- Navbar Scroll ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  // Float to top button
  const floatTop = document.getElementById('floatTop');
  if (window.scrollY > 400) floatTop.classList.add('visible');
  else floatTop.classList.remove('visible');
  
  // Shift floating buttons up when footer is visible to prevent overlap
  const floatingBtns = document.querySelector('.floating-buttons');
  if (floatingBtns) {
    const footer = document.querySelector('footer');
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top < window.innerHeight) {
        const offset = window.innerHeight - footerRect.top;
        floatingBtns.style.transform = `translateY(-${offset}px)`;
      } else {
        floatingBtns.style.transform = 'translateY(0)';
      }
    }
  }
});

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileMenuClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Scroll Reveal ----
function observeReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)');
  if (!reveals.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -40px 0px' });
  
  reveals.forEach(el => {
    // Immediately show elements already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      observer.observe(el);
    }
  });
}

// ---- Counter Animation ----
function animateCounter(el, target, suffix = '') {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current.toLocaleString('id-ID') + suffix;
  }, 25);
}

function initCounters() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        const suffix = target >= 1000 ? '+' : (target < 100 ? '+' : '+');
        animateCounter(entry.target, target, suffix);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => observer.observe(el));
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Ensure mobile menu is always closed on load
  const mobileMenuEl = document.getElementById('mobileMenu');
  if (mobileMenuEl) mobileMenuEl.classList.remove('open');
  
  renderProducts();
  initFilterListeners();
  
  // Enable reveal animations (progressive enhancement)
  document.body.setAttribute('data-reveal', '1');
  
  // Small delay to ensure DOM is painted, then trigger reveal
  setTimeout(() => {
    observeReveal();
  }, 80);
  
  initCounters();
  
  // Add floating bamboo leaves to hero
  createHeroLeaves();
  
  // Initialize Parallax Scroll Gallery
  initParallaxGallery();
  
  // Initialize Drag-to-Scroll for Gallery
  initDragScroll();
});

// ---- Floating Hero Leaves ----
function createHeroLeaves() {
  const hero = document.getElementById('hero');
  if (!hero) return;
  const leaves = ['🎋', '🍀', '🌿', '🍃', '🎋', '🍃'];
  leaves.forEach((leaf, i) => {
    const el = document.createElement('div');
    el.className = 'hero-leaf';
    el.textContent = leaf;
    el.style.left = (10 + i * 16) + '%';
    el.style.bottom = '-60px';
    el.style.fontSize = (1.5 + Math.random()) + 'rem';
    el.style.animationDuration = (12 + i * 4) + 's';
    el.style.animationDelay = (i * 2) + 's';
    hero.appendChild(el);
  });
}

// ---- Parallax Horizontal Scroll Gallery ----
function initParallaxGallery() {
  const container = document.getElementById('galleryScroll');
  const cards = document.querySelectorAll('.gallery-card');
  if (!container || !cards.length) return;

  function updateParallax() {
    const center = window.innerWidth / 2;
    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + card.offsetWidth / 2;
      
      // Calculate normalized distance from screen center (-1 to 1)
      const distFromCenter = cardCenter - center;
      const normalizedDist = Math.max(-1, Math.min(1, distFromCenter / (window.innerWidth / 1.3)));
      
      // 1. Image parallax shift
      const offset = distFromCenter * -0.18;
      const img = card.querySelector('img');
      if (img) {
        img.style.setProperty('--px', `${offset}px`);
      }
      
      // 2. Card Scale & Rotation (3D Tilt)
      const scale = 1 - Math.abs(normalizedDist) * 0.08; // 1.0 at center, 0.92 at edges
      const rotateY = normalizedDist * -10; // slight 3D rotation facing center
      card.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;
      
      // 3. Dynamic Card Shadow Depth
      const shadowOpacity = 0.06 + (1 - Math.abs(normalizedDist)) * 0.12;
      card.style.boxShadow = `0 20px 48px rgba(74, 62, 42, ${shadowOpacity})`;
      
      // 4. Card Info overlay text fade & slide
      const info = card.querySelector('.gallery-info');
      if (info) {
        const infoTranslate = Math.abs(normalizedDist) * 16;
        const infoOpacity = 1 - Math.abs(normalizedDist) * 0.35;
        info.style.transform = `translateY(${infoTranslate}px)`;
        info.style.opacity = infoOpacity;
      }
    });
  }

  // Smooth scroll listener
  let ticking = false;
  container.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  });

  window.addEventListener('resize', updateParallax);
  
  // Initial run
  updateParallax();
}

// ---- Drag Scroll & Button Scroll for Gallery ----
function initDragScroll() {
  const slider = document.getElementById('galleryScroll');
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let velX = 0;
  let momentumID;

  function disableSnap() {
    slider.style.scrollSnapType = 'none';
  }

  function enableSnap() {
    slider.style.scrollSnapType = 'x mandatory';
  }

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    slider.style.userSelect = 'none';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAnimationFrame(momentumID);
    disableSnap();
  });

  slider.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.userSelect = 'auto';
      beginMomentum();
    }
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
    slider.style.userSelect = 'auto';
    beginMomentum();
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // drag speed multiplier
    const prevScrollLeft = slider.scrollLeft;
    slider.scrollLeft = scrollLeft - walk;
    velX = slider.scrollLeft - prevScrollLeft; // track drag velocity
  });

  // Inertia momentum loop
  function beginMomentum() {
    cancelAnimationFrame(momentumID);
    momentumID = requestAnimationFrame(momentumLoop);
  }

  function momentumLoop() {
    slider.scrollLeft += velX;
    velX *= 0.92; // friction factor
    if (Math.abs(velX) > 0.5) {
      momentumID = requestAnimationFrame(momentumLoop);
    } else {
      enableSnap(); // smoothly snap to center when momentum stops
    }
  }
}

function scrollGallery(direction) {
  const container = document.getElementById('galleryScroll');
  if (!container) return;
  const card = container.querySelector('.gallery-card');
  const cardWidth = card ? card.offsetWidth : 300;
  const gap = 24; // gallery gap
  
  // Disable snap briefly to allow smooth JS programmatic scroll, then re-enable
  container.style.scrollSnapType = 'none';
  container.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: 'smooth'
  });
  
  // Re-enable snap after animation completes
  setTimeout(() => {
    container.style.scrollSnapType = 'x mandatory';
  }, 400);
}

function toggleFilterPanel(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('filterPanel');
  const btn = document.getElementById('btnFilterToggle');
  const backdrop = document.getElementById('filterBackdrop');
  if (panel && btn) {
    const isOpen = panel.classList.contains('active');
    if (isOpen) {
      panel.classList.remove('active');
      btn.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      panel.classList.add('active');
      btn.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      if (window.innerWidth <= 576) {
        document.body.style.overflow = 'hidden';
      }
    }
  }
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
  const anchor = document.getElementById('filterDropdownAnchor');
  const panel = document.getElementById('filterPanel');
  const btn = document.getElementById('btnFilterToggle');
  const backdrop = document.getElementById('filterBackdrop');
  if (anchor && !anchor.contains(e.target) && backdrop && !backdrop.contains(e.target)) {
    if (panel) panel.classList.remove('active');
    if (btn) btn.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
});
