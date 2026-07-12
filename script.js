// ============================================================
//   BambuRara - Main JavaScript
// ============================================================

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: 'Box Tutup Mika',
    category: 'dekorasi',
    price: 30000,
    image: 'images/BoxTutup_Mika.png',
    badge: 'Terlaris',
    rating: 4.9,
    reviews: 128,
    desc: 'Box bambu anyaman dengan penutup mika transparan yang elegan. Sangat cocok untuk wadah hantaran, hampers, souvenir, atau kado pernikahan. Finishing bersih dan rapi.',
    specs: { Material: 'Bambu Apus & Mika', Dimensi: '25x25 cm & 30x30 cm', Finishing: 'Natural Bleach' },
    tag: 'unggulan'
  },
  {
    id: 2,
    name: 'Rak Bambu',
    category: 'perabot',
    price: 150000,
    image: 'images/Rak_Bambu.png',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 94,
    desc: 'Rak bambu serbaguna dengan konstruksi yang kokoh dan estetika natural. Cocok untuk menaruh tanaman hias, dekorasi ruangan, buku, atau pernak-pernik rumah tangga.',
    specs: { Material: 'Bambu Wulung & Petung', Dimensi: '40x30x70 cm', Finishing: 'Natural Glossy Varnish' },
    tag: 'unggulan'
  },
  {
    id: 3,
    name: 'Rantang Kotak',
    category: 'peralatan',
    price: 25000,
    image: 'images/Rantang_Kotak.png',
    badge: 'New',
    rating: 4.7,
    reviews: 67,
    desc: 'Rantang anyaman bambu berbentuk kotak tradisional yang fungsional dan estetis. Pilihan ramah lingkungan untuk wadah katering, berkat makanan, atau penyimpanan serbaguna.',
    specs: { Material: 'Bambu Wulung', Dimensi: '20x20x15 cm', Finishing: 'Natural Raw' },
    tag: 'terbaru'
  },
  {
    id: 4,
    name: 'Rantang Kotak Truntum',
    category: 'peralatan',
    price: 30000,
    image: 'images/Rantang_Kotak_Truntum.png',
    badge: 'New',
    rating: 4.8,
    reviews: 43,
    desc: 'Rantang kotak anyaman dengan motif batik Truntum yang sangat menawan. Memiliki nilai seni tinggi, cocok untuk hantaran istimewa atau hampers hari raya.',
    specs: { Material: 'Bambu Apus Pilihan', Dimensi: '22x22x15 cm', Finishing: 'Natural Motif' },
    tag: 'unggulan'
  },
  {
    id: 5,
    name: 'Rantang Kotak 2 Susun',
    category: 'peralatan',
    price: 50000,
    image: 'images/RantangKotak_2_Susun.png',
    badge: null,
    rating: 4.7,
    reviews: 52,
    desc: 'Rantang anyaman bambu model tingkat dua susun dengan pegangan yang kokoh. Kapasitas lebih besar untuk membawa makanan porsi dobel atau paket hampers yang lengkap.',
    specs: { Material: 'Bambu Wulung Kuat', Dimensi: '20x20x28 cm', Finishing: 'Natural Fine Sanded' },
    tag: 'terbaru'
  },
  {
    id: 6,
    name: 'Tas Jinjing',
    category: 'aksesoris',
    price: 25000,
    image: 'images/Tas_Jinjing.png',
    badge: null,
    rating: 4.6,
    reviews: 38,
    desc: 'Tas jinjing anyaman bambu dengan pegangan yang fleksibel dan modis. Ideal digunakan untuk belanja ramah lingkungan, piknik, atau sebagai kemasan souvenir acara adat.',
    specs: { Material: 'Bambu Tali / Apus', Dimensi: '30x12x25 cm', Finishing: 'Natural Lacquer' },
    tag: 'termurah'
  },
  {
    id: 7,
    name: 'Sokase Jinjing',
    category: 'aksesoris',
    price: 30000,
    image: 'images/Sokase_jinjing.png',
    badge: null,
    rating: 4.8,
    reviews: 45,
    desc: 'Sokase jinjing anyaman bambu yang cantik dan fungsional. Dilengkapi dengan tali jinjing yang kuat, sangat pas untuk wadah hantaran, hampers, atau wadah barang pribadi Anda.',
    specs: { Material: 'Bambu Apus Pilihan', Dimensi: '22x22x20 cm', Finishing: 'Natural Bleach' },
    tag: 'unggulan'
  }
];

let currentFilter = 'all';
let currentSort = 'unggulan';
let searchQuery = '';

// ---- Render Products ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
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
    `Halo BambuRara! 😊\n\nSaya ingin memesan:\n*${p.name}*\nHarga: ${formatPrice(p.price)}\n\nMohon info ketersediaan dan cara pemesanannya. Terima kasih!`
  );
  window.open(`https://wa.me/6282221367185?text=${msg}`, '_blank');
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
  const msg = encodeURIComponent(`Halo BambuRara! Saya ingin memesan *${p.name}* (${formatPrice(p.price)}). Apakah tersedia?`);
  actionsEl.innerHTML = `
    <a href="https://wa.me/6282221367185?text=${msg}" target="_blank" class="btn btn-wa" style="flex:1;justify-content:center;">
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
  
  // Initialize Infinite Scroll (Loop) Gallery (must run before parallax)
  initInfiniteScrollGallery();

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
  if (!container) return;
  const cards = document.querySelectorAll('.gallery-card');
  if (!cards.length) return;

  let containerWidth = container.clientWidth;
  let cardMetrics = [];

  function cacheMetrics() {
    containerWidth = container.clientWidth;
    cardMetrics = Array.from(cards).map(card => {
      return {
        element: card,
        offsetLeft: card.offsetLeft,
        width: card.offsetWidth,
        img: card.querySelector('img'),
        info: card.querySelector('.gallery-info')
      };
    });
  }

  // Cache metrics immediately
  cacheMetrics();

  function updateParallax() {
    const scrollLeft = container.scrollLeft;
    const center = containerWidth / 2;

    cardMetrics.forEach(metric => {
      const cardCenter = metric.offsetLeft + metric.width / 2;
      const distFromCenter = cardCenter - scrollLeft - center;
      const normalizedDist = Math.max(-1, Math.min(1, distFromCenter / (containerWidth / 1.3)));

      // 1. Image parallax shift
      const offset = distFromCenter * -0.18;
      if (metric.img) {
        metric.img.style.setProperty('--px', `${offset}px`);
      }

      // 2. Card Scale & Rotation (3D Tilt)
      const scale = 1 - Math.abs(normalizedDist) * 0.08;
      const rotateY = normalizedDist * -10;
      metric.element.style.transform = `scale(${scale}) rotateY(${rotateY}deg)`;

      // 3. Dynamic Card Shadow Depth
      const shadowOpacity = 0.06 + (1 - Math.abs(normalizedDist)) * 0.12;
      metric.element.style.boxShadow = `0 20px 48px rgba(74, 62, 42, ${shadowOpacity})`;

      // 4. Card Info overlay text fade & slide
      if (metric.info) {
        const infoTranslate = Math.abs(normalizedDist) * 16;
        const infoOpacity = 1 - Math.abs(normalizedDist) * 0.35;
        metric.info.style.transform = `translateY(${infoTranslate}px)`;
        metric.info.style.opacity = infoOpacity;
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

  window.addEventListener('resize', () => {
    cacheMetrics();
    updateParallax();
  });

  // Initial run
  updateParallax();
}

// ---- Infinite Scroll (Loop) for Gallery ----
function initInfiniteScrollGallery() {
  const container = document.getElementById('galleryScroll');
  if (!container) return;

  const originalCards = Array.from(container.children);
  const cardCount = originalCards.length;
  if (cardCount === 0) return;

  // Clone items and prepend/append them to form [CloneStarts, Originals, CloneEnds]
  // Prepend clones
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone-start');
    container.insertBefore(clone, container.firstChild);
  });

  // Append clones
  originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.classList.add('clone-end');
    container.appendChild(clone);
  });

  // Calculate full width of one set of cards (including gaps)
  function calculateSetWidth() {
    const firstOriginal = container.querySelector('.gallery-card:not(.clone-start):not(.clone-end)');
    if (!firstOriginal) return 0;
    const nextOriginal = firstOriginal.nextElementSibling;
    if (!nextOriginal) return cardCount * firstOriginal.offsetWidth;
    
    // Step width = card offsetLeft difference (guarantees pixel perfect gap detection)
    const stepWidth = nextOriginal.offsetLeft - firstOriginal.offsetLeft;
    return cardCount * stepWidth;
  }

  let setWidth = calculateSetWidth();
  container.infiniteSetWidth = setWidth; // Store on DOM object for drag scroll reference

  // Initial scroll position: start of original cards (middle section)
  container.scrollLeft = setWidth;

  // Recalculate setWidth on window resize
  window.addEventListener('resize', () => {
    setWidth = calculateSetWidth();
    container.infiniteSetWidth = setWidth;
  });

  // Wrap-around scroll listener (instant, synchronous jump)
  container.addEventListener('scroll', () => {
    const currentScroll = container.scrollLeft;

    // Left boundary: we entered the start clones
    if (currentScroll < setWidth) {
      container.scrollLeft = currentScroll + setWidth;
      
      // If user is currently dragging, adjust drag starting point to match new scroll position
      if (container.isDragging) {
        container.dragStartScrollLeft += setWidth;
      }
    }
    // Right boundary: we entered the end clones
    else if (currentScroll >= 2 * setWidth) {
      container.scrollLeft = currentScroll - setWidth;
      
      if (container.isDragging) {
        container.dragStartScrollLeft -= setWidth;
      }
    }
  });
}

// ---- Drag Scroll & Button Scroll for Gallery ----
function initDragScroll() {
  const slider = document.getElementById('galleryScroll');
  if (!slider) return;

  let isDown = false;
  let velX = 0;
  let momentumID;

  let touchStartX = 0;
  let touchStartY = 0;
  let isTouchDragging = false;

  function disableSnap() {
    slider.style.scrollSnapType = 'none';
  }

  function enableSnap() {
    slider.style.scrollSnapType = 'x mandatory';
  }

  // --- Mouse Events ---
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    slider.style.userSelect = 'none';
    
    // Save to DOM object so it can be adjusted on infinite wrap-around
    slider.dragStartX = e.pageX - slider.offsetLeft;
    slider.dragStartScrollLeft = slider.scrollLeft;
    slider.isDragging = true;
    
    cancelAnimationFrame(momentumID);
    disableSnap();
  });

  slider.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.userSelect = 'auto';
      slider.isDragging = false;
      beginMomentum();
    }
  });

  slider.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      slider.style.cursor = 'grab';
      slider.style.userSelect = 'auto';
      slider.isDragging = false;
      beginMomentum();
    }
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - slider.dragStartX) * 1.5; // drag speed multiplier
    const prevScrollLeft = slider.scrollLeft;
    slider.scrollLeft = slider.dragStartScrollLeft - walk;
    
    // Calculate raw difference
    let diff = slider.scrollLeft - prevScrollLeft;
    
    // If wrap-around happened, adjust diff to avoid huge velocity jump
    const setWidth = slider.infiniteSetWidth || 2408;
    if (Math.abs(diff) > setWidth / 2) {
      if (diff > 0) diff -= setWidth;
      else diff += setWidth;
    }
    
    velX = diff; // track drag velocity without snap jumps
  });

  // --- Touch Events ---
  slider.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    isDown = true;
    slider.isDragging = true;
    isTouchDragging = false;
    
    slider.dragStartX = touch.pageX - slider.offsetLeft;
    slider.dragStartScrollLeft = slider.scrollLeft;
    
    cancelAnimationFrame(momentumID);
    disableSnap();
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const touch = e.touches[0];
    
    const deltaX = Math.abs(touch.pageX - touchStartX);
    const deltaY = Math.abs(touch.pageY - touchStartY);
    
    // Determine drag direction (mostly horizontal and moved at least 8px)
    if (!isTouchDragging && deltaX > deltaY && deltaX > 8) {
      isTouchDragging = true;
    }
    
    if (isTouchDragging) {
      // Prevent browser from scrolling vertically when actively dragging the carousel
      if (e.cancelable) e.preventDefault();
      
      const x = touch.pageX - slider.offsetLeft;
      const walk = (x - slider.dragStartX) * 1.5; // drag speed multiplier
      const prevScrollLeft = slider.scrollLeft;
      slider.scrollLeft = slider.dragStartScrollLeft - walk;
      
      let diff = slider.scrollLeft - prevScrollLeft;
      const setWidth = slider.infiniteSetWidth || 2408;
      if (Math.abs(diff) > setWidth / 2) {
        if (diff > 0) diff -= setWidth;
        else diff += setWidth;
      }
      
      velX = diff;
    }
  }, { passive: false });

  slider.addEventListener('touchend', () => {
    if (isDown) {
      isDown = false;
      slider.isDragging = false;
      isTouchDragging = false;
      beginMomentum();
    }
  });

  slider.addEventListener('touchcancel', () => {
    if (isDown) {
      isDown = false;
      slider.isDragging = false;
      isTouchDragging = false;
      beginMomentum();
    }
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
