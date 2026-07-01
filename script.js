// ============================================================
//   BambuKita - Main JavaScript
// ============================================================

// ---- Product Data ----
const products = [
  {
    id: 1,
    name: 'Kursi Bambu Minimalis',
    category: 'perabot',
    price: 250000,
    originalPrice: 320000,
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
    price: 150000,
    originalPrice: 185000,
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
    category: 'peralatan',
    price: 75000,
    originalPrice: null,
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
    category: 'peralatan',
    price: 60000,
    originalPrice: null,
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
    price: 420000,
    originalPrice: 520000,
    image: 'images/meja_bambu.png',
    badge: 'Promo',
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
    price: 95000,
    originalPrice: 120000,
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
    category: 'peralatan',
    price: 85000,
    originalPrice: null,
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
    price: 350000,
    originalPrice: 430000,
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
let wishlist = new Set();

// ---- Render Products ----
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  let filtered = currentFilter === 'all'
    ? [...products]
    : products.filter(p => p.category === currentFilter);

  // Sort
  if (currentSort === 'termurah') filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === 'terlaris') filtered.sort((a, b) => b.reviews - a.reviews);
  else if (currentSort === 'terbaru') filtered.sort((a, b) => b.id - a.id);
  else filtered.sort((a, b) => (b.tag === 'unggulan' ? 1 : 0) - (a.tag === 'unggulan' ? 1 : 0));

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--text-light);">
      <div style="font-size:3rem;margin-bottom:12px;">🎋</div>
      <p>Tidak ada produk dalam kategori ini</p>
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card reveal" data-id="${p.id}" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        ${p.badge ? `<div class="product-badge ${p.badge === 'New' || p.badge === 'Terbaru' ? 'new' : ''}">${p.badge}</div>` : ''}
        <button class="product-wishlist ${wishlist.has(p.id) ? 'liked' : ''}" onclick="toggleWishlist(event, ${p.id})" id="wish-${p.id}" title="Simpan ke Wishlist">
          ${wishlist.has(p.id) ? '❤️' : '🤍'}
        </button>
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
        <div class="product-rating">
          <div class="stars">${renderStars(p.rating)}</div>
          <span class="rating-count">(${p.reviews} ulasan)</span>
        </div>
        <div class="product-price-row">
          <div>
            <div class="product-price">${formatPrice(p.price)}</div>
            ${p.originalPrice ? `<div class="product-price-original">${formatPrice(p.originalPrice)}</div>` : ''}
          </div>
          ${p.originalPrice ? `<div style="background:linear-gradient(135deg,var(--accent),var(--accent-light));color:white;font-size:0.7rem;font-weight:700;padding:4px 10px;border-radius:50px;">Hemat ${Math.round((1-p.price/p.originalPrice)*100)}%</div>` : ''}
        </div>
      </div>
    </div>
  `).join('');

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

// ---- Filter by Category ----
function filterProducts(cat, el) {
  currentFilter = cat;
  // Update active card
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts();
  document.getElementById('produk').scrollIntoView({ behavior: 'smooth' });
}

// ---- Sort Products ----
function sortProducts(sort, el) {
  currentSort = sort;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
  renderProducts();
}

// ---- Toggle Wishlist ----
function toggleWishlist(e, id) {
  e.stopPropagation();
  const btn = document.getElementById('wish-' + id);
  if (wishlist.has(id)) {
    wishlist.delete(id);
    btn.innerHTML = '🤍';
    btn.classList.remove('liked');
    showToast('Dihapus dari wishlist', '🗑️');
  } else {
    wishlist.add(id);
    btn.innerHTML = '❤️';
    btn.classList.add('liked');
    showToast('Ditambahkan ke wishlist!', '❤️');
  }
}

// ---- Order via WhatsApp ----
function orderViaWA(e, id) {
  if (e) e.stopPropagation();
  const p = products.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(
    `Halo BambuKita! 😊\n\nSaya ingin memesan:\n*${p.name}*\nHarga: ${formatPrice(p.price)}\n\nMohon info ketersediaan dan cara pemesanannya. Terima kasih!`
  );
  window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
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
  document.getElementById('modalStars').textContent = renderStars(p.rating);
  document.getElementById('modalRating').textContent = `${p.rating} (${p.reviews} ulasan)`;
  document.getElementById('modalPrice').textContent = formatPrice(p.price);
  document.getElementById('modalDesc').textContent = p.desc;

  const specsEl = document.getElementById('modalSpecs');
  specsEl.innerHTML = Object.entries(p.specs).map(([k,v]) => `
    <div class="spec-item"><label>${k}</label><span>${v}</span></div>
  `).join('');

  const actionsEl = document.getElementById('modalActions');
  const msg = encodeURIComponent(`Halo BambuKita! Saya ingin memesan *${p.name}* (${formatPrice(p.price)}). Apakah tersedia?`);
  actionsEl.innerHTML = `
    <a href="https://wa.me/6281234567890?text=${msg}" target="_blank" class="btn btn-wa" style="flex:1;justify-content:center;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      Pesan via WhatsApp
    </a>
    <button onclick="toggleWishlist(event, ${p.id})" class="btn btn-outline" style="padding:14px 18px;" title="Wishlist">
      ${wishlist.has(p.id) ? '❤️' : '🤍'}
    </button>
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

// ---- Contact Form ----
function handleFormSubmit(e) {
  e.preventDefault();
  const nama = document.getElementById('nama').value;
  const telepon = document.getElementById('telepon').value;
  const produkMinat = document.getElementById('produk-minat').value;
  const pesan = document.getElementById('pesan').value;

  const msg = encodeURIComponent(
    `Halo BambuKita! 😊\n\nNama: ${nama}\nTelepon: ${telepon}\nMinat Produk: ${produkMinat || 'Tidak disebutkan'}\n\nPesan:\n${pesan}`
  );
  window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
  showToast('Pesan dikirim via WhatsApp! 🎉', '✅');
  e.target.reset();
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
});

// ---- Mobile Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
mobileMenuClose.addEventListener('click', () => mobileMenu.classList.remove('open'));

function closeMobileMenu() { mobileMenu.classList.remove('open'); }

// ---- Scroll Reveal ----
function observeReveal() {
  const reveals = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));
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
  renderProducts();
  observeReveal();
  initCounters();
});
