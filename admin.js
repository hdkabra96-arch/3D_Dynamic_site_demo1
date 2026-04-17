/* ===== GLOWNEST ADMIN PANEL ===== */

// ===== DEFAULT PRODUCTS (seeded from main site) =====
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Rose Glow Serum', category: 'Skincare', price: 89, comparePrice: null, stock: 45, rating: 4.9, emoji: '🌹', color: '#fce4ec', image: null,
    desc: 'A luxurious vitamin C serum infused with Bulgarian rose extract and hyaluronic acid. Brightens, firms, and deeply hydrates for a radiant, glass-skin effect.',
    tags: ['Brightening', 'Anti-aging', 'Hydrating'], ingredients: 'Rose Extract, Vitamin C, Hyaluronic Acid',
    skinType: 'All Skin Types', size: '30ml', active: true,
    badges: { new: false, best: true, sale: false, vegan: true },
    reviews: [{ author: 'Sofia M.', stars: 5, text: 'My skin has never looked better.' }, { author: 'Aria K.', stars: 5, text: 'Faded my dark spots in 2 weeks.' }]
  },
  { id: 2, name: 'Velvet Matte Lip', category: 'Makeup', price: 34, comparePrice: 42, stock: 80, rating: 4.7, emoji: '💄', color: '#fce4ec', image: null,
    desc: 'Long-lasting velvet matte formula enriched with vitamin E and jojoba oil.',
    tags: ['Long-lasting', 'Moisturizing', 'Vegan'], ingredients: 'Vitamin E, Jojoba Oil',
    skinType: '', size: '3.5g', active: true,
    badges: { new: false, best: false, sale: true, vegan: true },
    reviews: [{ author: 'Lena R.', stars: 5, text: 'The most comfortable matte lip.' }]
  },
  { id: 3, name: 'Golden Hour Oil', category: 'Haircare', price: 62, comparePrice: null, stock: 30, rating: 4.8, emoji: '✨', color: '#fff8e1', image: null,
    desc: 'A lightweight, multi-use hair oil blended with argan, marula, and 24k gold flakes.',
    tags: ['Shine', 'Frizz Control', 'Nourishing'], ingredients: 'Argan Oil, Marula Oil, Gold Flakes',
    skinType: '', size: '50ml', active: true,
    badges: { new: false, best: true, sale: false, vegan: false },
    reviews: [{ author: 'Priya S.', stars: 5, text: 'My hair looks like a shampoo commercial.' }]
  },
  { id: 4, name: 'Cloud Cream Moisturizer', category: 'Skincare', price: 74, comparePrice: null, stock: 55, rating: 4.9, emoji: '☁️', color: '#e8f5e9', image: null,
    desc: 'An ultra-light whipped moisturizer with ceramides, niacinamide, and peptides.',
    tags: ['72hr Hydration', 'Ceramides', 'All Skin Types'], ingredients: 'Ceramides, Niacinamide, Peptides',
    skinType: 'All Skin Types', size: '50ml', active: true,
    badges: { new: true, best: true, sale: false, vegan: true },
    reviews: [{ author: 'Emma L.', stars: 5, text: 'Feels like a cloud on my skin.' }]
  },
  { id: 5, name: 'Petal Blush Palette', category: 'Makeup', price: 58, comparePrice: 70, stock: 25, rating: 4.6, emoji: '🌸', color: '#fce4ec', image: null,
    desc: 'A curated palette of 6 buildable blush shades from soft petal pink to warm terracotta.',
    tags: ['Buildable', 'Blendable', 'Cruelty-free'], ingredients: 'Mica, Talc, Botanical Extracts',
    skinType: '', size: '12g', active: true,
    badges: { new: false, best: false, sale: true, vegan: false },
    reviews: [{ author: 'Isla F.', stars: 5, text: 'The shades are so wearable.' }]
  },
  { id: 6, name: 'Silk Repair Mask', category: 'Haircare', price: 48, comparePrice: null, stock: 40, rating: 4.8, emoji: '🌿', color: '#e8f5e9', image: null,
    desc: 'An intensive overnight hair mask with silk proteins, keratin, and botanical extracts.',
    tags: ['Repair', 'Overnight', 'Keratin'], ingredients: 'Silk Proteins, Keratin, Argan Oil',
    skinType: '', size: '200ml', active: true,
    badges: { new: false, best: false, sale: false, vegan: false },
    reviews: [{ author: 'Ava C.', stars: 5, text: 'My bleached hair feels brand new.' }]
  },
  { id: 7, name: 'Dew Drop Toner', category: 'Skincare', price: 42, comparePrice: null, stock: 60, rating: 4.7, emoji: '💧', color: '#e3f2fd', image: null,
    desc: 'A hydrating essence toner with green tea, centella asiatica, and beta-glucan.',
    tags: ['Hydrating', 'Calming', 'Essence'], ingredients: 'Green Tea, Centella Asiatica, Beta-Glucan',
    skinType: 'Sensitive', size: '150ml', active: true,
    badges: { new: true, best: false, sale: false, vegan: true },
    reviews: [{ author: 'Lily P.', stars: 5, text: 'My skin drinks this up.' }]
  },
  { id: 8, name: 'Luminous Foundation', category: 'Makeup', price: 68, comparePrice: null, stock: 35, rating: 4.5, emoji: '🪞', color: '#fff3e0', image: null,
    desc: 'A skin-like satin foundation with SPF 30 and skincare actives.',
    tags: ['SPF 30', 'Buildable', 'Skin-like'], ingredients: 'SPF 30, Niacinamide, Hyaluronic Acid',
    skinType: 'All Skin Types', size: '30ml', active: true,
    badges: { new: false, best: false, sale: false, vegan: false },
    reviews: [{ author: 'Jade M.', stars: 5, text: 'Looks like I\'m not wearing anything.' }]
  }
];

// ===== STATE =====
let products = [];
let deleteTargetId = null;
let selectedColor = '#fce4ec';
let currentImageDataUrl = null;

// ===== STORAGE =====
function loadProducts() {
  try {
    const stored = localStorage.getItem('glownest_products');
    products = stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  } catch { products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)); }
}

function saveProducts() {
  localStorage.setItem('glownest_products', JSON.stringify(products));
  // Also write a simplified version for the main site to read
  const siteProducts = products.filter(p => p.active).map(p => ({
    id: p.id, name: p.name, category: p.category, price: p.price,
    rating: p.rating || 4.5, emoji: p.emoji, color: p.color,
    image: p.image || null, desc: p.desc,
    tags: p.tags || [], reviews: p.reviews || []
  }));
  localStorage.setItem('glownest_site_products', JSON.stringify(siteProducts));
}

function nextId() {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

// ===== LOGIN =====
document.getElementById('login-form').addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (user === 'admin' && pass === 'admin123') {
    document.getElementById('login-screen').style.opacity = '0';
    document.getElementById('login-screen').style.transform = 'scale(1.05)';
    setTimeout(() => {
      document.getElementById('login-screen').classList.add('hidden');
      document.getElementById('admin-app').classList.remove('hidden');
      initAdmin();
    }, 400);
  } else {
    document.getElementById('login-error').classList.remove('hidden');
    document.getElementById('login-pass').value = '';
  }
});

document.getElementById('login-screen').style.transition = 'opacity 0.4s, transform 0.4s';

document.getElementById('toggle-pw').addEventListener('click', () => {
  const inp = document.getElementById('login-pass');
  inp.type = inp.type === 'password' ? 'text' : 'password';
});

document.getElementById('logout-btn').addEventListener('click', () => {
  document.getElementById('admin-app').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
  document.getElementById('login-screen').style.opacity = '1';
  document.getElementById('login-screen').style.transform = 'scale(1)';
  document.getElementById('login-user').value = '';
  document.getElementById('login-pass').value = '';
});

// ===== NAVIGATION =====
function switchView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');
  document.querySelector(`[data-view="${viewName}"]`)?.classList.add('active');
  const titles = { dashboard: 'Dashboard', products: 'Products', 'add-product': 'Add Product', orders: 'Orders', analytics: 'Analytics' };
  document.getElementById('view-title').textContent = titles[viewName] || viewName;
  if (viewName === 'dashboard') renderDashboard();
  if (viewName === 'products') renderProductsTable();
  if (viewName === 'analytics') renderAnalytics();
  if (viewName === 'add-product') {
    document.getElementById('view-title').textContent = document.getElementById('edit-id').value ? 'Edit Product' : 'Add Product';
  }
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => { e.preventDefault(); switchView(item.dataset.view); });
});

// ===== DASHBOARD =====
function renderDashboard() {
  const active = products.filter(p => p.active);
  document.getElementById('stat-products').textContent = products.length;
  const avgPrice = active.length ? (active.reduce((s, p) => s + p.price, 0) / active.length).toFixed(0) : 0;
  document.getElementById('stat-avg-price').textContent = '$' + avgPrice;
  const avgRating = active.length ? (active.reduce((s, p) => s + (p.rating || 0), 0) / active.length).toFixed(1) : 0;
  document.getElementById('stat-avg-rating').textContent = '★ ' + avgRating;

  // Recent products
  const recent = [...products].reverse().slice(0, 5);
  document.getElementById('recent-products-list').innerHTML = recent.map(p => `
    <div class="recent-item">
      <span class="recent-emoji">${p.emoji}</span>
      <div class="recent-info">
        <div class="recent-name">${p.name}</div>
        <div class="recent-cat">${p.category}</div>
      </div>
      <span class="recent-price">$${p.price}</span>
    </div>
  `).join('');

  // Category chart
  const cats = { Skincare: 0, Makeup: 0, Haircare: 0 };
  products.forEach(p => { if (cats[p.category] !== undefined) cats[p.category]++; });
  const total = products.length || 1;
  const catColors = { Skincare: '', Makeup: 'gold', Haircare: 'green' };
  document.getElementById('category-chart').innerHTML = Object.entries(cats).map(([cat, count]) => `
    <div class="cat-bar-row">
      <div class="cat-bar-label"><span>${cat}</span><span>${count} products</span></div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill ${catColors[cat]}" style="width:${(count/total*100).toFixed(0)}%"></div>
      </div>
    </div>
  `).join('');
}

// ===== PRODUCTS TABLE =====
function renderProductsTable(filter = '') {
  const search = (document.getElementById('search-products')?.value || '').toLowerCase();
  const cat = document.getElementById('filter-cat')?.value || 'all';
  let list = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.category.toLowerCase().includes(search);
    const matchCat = cat === 'all' || p.category === cat;
    return matchSearch && matchCat;
  });

  const tbody = document.getElementById('products-tbody');
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="empty-table">No products found.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map(p => {
    const badges = [];
    if (p.badges?.new) badges.push('<span class="badge-pill badge-new">New</span>');
    if (p.badges?.best) badges.push('<span class="badge-pill badge-best">Best</span>');
    if (p.badges?.sale) badges.push('<span class="badge-pill badge-sale">Sale</span>');
    if (p.badges?.vegan) badges.push('<span class="badge-pill badge-vegan">Vegan</span>');

    const imgCell = p.image
      ? `<img src="${p.image}" class="table-img" alt="${p.name}" />`
      : `<div class="table-img-placeholder" style="background:${p.color}">${p.emoji}</div>`;

    return `
      <tr>
        <td>${imgCell}</td>
        <td>
          <strong>${p.name}</strong>
          ${badges.length ? `<div style="margin-top:4px;display:flex;gap:4px;flex-wrap:wrap">${badges.join('')}</div>` : ''}
        </td>
        <td>${p.category}</td>
        <td>
          <strong>$${p.price}</strong>
          ${p.comparePrice ? `<br/><span style="text-decoration:line-through;color:var(--text-3);font-size:0.78rem">$${p.comparePrice}</span>` : ''}
        </td>
        <td>★ ${p.rating || '—'}</td>
        <td>${p.stock ?? '—'}</td>
        <td><span class="badge-pill ${p.active ? 'badge-active' : 'badge-inactive'}">${p.active ? 'Active' : 'Hidden'}</span></td>
        <td>
          <div class="action-btns">
            <button class="btn-edit" onclick="editProduct(${p.id})">Edit</button>
            <button class="btn-delete" onclick="promptDelete(${p.id})">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

document.getElementById('search-products')?.addEventListener('input', () => renderProductsTable());
document.getElementById('filter-cat')?.addEventListener('change', () => renderProductsTable());

// ===== PRODUCT FORM =====
function resetForm() {
  document.getElementById('product-form').reset();
  document.getElementById('edit-id').value = '';
  document.getElementById('form-mode-label').textContent = 'New Product';
  document.getElementById('save-btn-text').textContent = 'Save Product';
  document.getElementById('desc-count').textContent = '0';
  document.getElementById('tags-preview').innerHTML = '';
  document.getElementById('preview-name').textContent = 'Product Name';
  document.getElementById('preview-cat').textContent = 'Category';
  document.getElementById('preview-price').textContent = '$0.00';
  document.getElementById('preview-emoji').textContent = '🌹';
  document.getElementById('preview-badges').innerHTML = '';
  document.getElementById('f-emoji').value = '';
  document.getElementById('f-active').checked = true;
  document.getElementById('status-label').textContent = 'Active (visible on site)';
  currentImageDataUrl = null;
  selectedColor = '#fce4ec';
  document.getElementById('preview-img-area').style.background = 'linear-gradient(135deg, #fce4ec, #fff8e1)';
  document.getElementById('image-preview').classList.add('hidden');
  document.getElementById('upload-placeholder').classList.remove('hidden');
  document.getElementById('remove-image-btn').classList.add('hidden');
  document.getElementById('f-image-url').value = '';
  document.getElementById('preview-img').classList.add('hidden');
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.color === '#fce4ec'));
  document.querySelectorAll('.emoji-opt').forEach(e => e.classList.remove('selected'));
  clearErrors();
}

document.getElementById('reset-form-btn').addEventListener('click', resetForm);

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  resetForm();
  switchView('add-product');
  document.getElementById('view-title').textContent = 'Edit Product';
  document.getElementById('form-mode-label').textContent = 'Edit Product';
  document.getElementById('save-btn-text').textContent = 'Update Product';
  document.getElementById('edit-id').value = id;

  document.getElementById('f-name').value = p.name;
  document.getElementById('f-category').value = p.category;
  document.getElementById('f-price').value = p.price;
  document.getElementById('f-compare-price').value = p.comparePrice || '';
  document.getElementById('f-stock').value = p.stock ?? '';
  document.getElementById('f-rating').value = p.rating || '';
  document.getElementById('f-emoji').value = p.emoji || '';
  document.getElementById('f-desc').value = p.desc || '';
  document.getElementById('desc-count').textContent = (p.desc || '').length;
  document.getElementById('f-tags').value = (p.tags || []).join(', ');
  document.getElementById('f-ingredients').value = p.ingredients || '';
  document.getElementById('f-skin-type').value = p.skinType || '';
  document.getElementById('f-size').value = p.size || '';
  document.getElementById('f-active').checked = p.active !== false;
  document.getElementById('status-label').textContent = p.active !== false ? 'Active (visible on site)' : 'Hidden';
  document.getElementById('f-badge-new').checked = p.badges?.new || false;
  document.getElementById('f-badge-best').checked = p.badges?.best || false;
  document.getElementById('f-badge-sale').checked = p.badges?.sale || false;
  document.getElementById('f-badge-vegan').checked = p.badges?.vegan || false;

  selectedColor = p.color || '#fce4ec';
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.color === selectedColor));
  document.getElementById('custom-color').value = selectedColor;

  if (p.image) {
    currentImageDataUrl = p.image;
    document.getElementById('image-preview').src = p.image;
    document.getElementById('image-preview').classList.remove('hidden');
    document.getElementById('upload-placeholder').classList.add('hidden');
    document.getElementById('remove-image-btn').classList.remove('hidden');
    document.getElementById('preview-img').src = p.image;
    document.getElementById('preview-img').classList.remove('hidden');
  }

  updatePreview();
  renderTagsPreview();
}

// ===== FORM VALIDATION =====
function clearErrors() {
  ['name','category','price','stock','desc'].forEach(f => {
    document.getElementById(`err-${f}`).textContent = '';
  });
}

function validateForm() {
  clearErrors(); let valid = true;
  const checks = [
    { id: 'f-name', err: 'err-name', msg: 'Product name is required.' },
    { id: 'f-category', err: 'err-category', msg: 'Please select a category.' },
    { id: 'f-price', err: 'err-price', msg: 'Price is required.' },
    { id: 'f-stock', err: 'err-stock', msg: 'Stock quantity is required.' },
    { id: 'f-desc', err: 'err-desc', msg: 'Description is required.' },
  ];
  checks.forEach(c => {
    const val = document.getElementById(c.id).value.trim();
    if (!val) { document.getElementById(c.err).textContent = c.msg; valid = false; }
  });
  const price = parseFloat(document.getElementById('f-price').value);
  if (!isNaN(price) && price < 0) { document.getElementById('err-price').textContent = 'Price must be positive.'; valid = false; }
  return valid;
}

// ===== SAVE PRODUCT =====
document.getElementById('product-form').addEventListener('submit', e => {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = document.getElementById('save-btn');
  btn.disabled = true;
  document.getElementById('save-btn-text').textContent = 'Saving...';

  setTimeout(() => {
    const editId = document.getElementById('edit-id').value;
    const tagsRaw = document.getElementById('f-tags').value;
    const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

    const productData = {
      name: document.getElementById('f-name').value.trim(),
      category: document.getElementById('f-category').value,
      price: parseFloat(document.getElementById('f-price').value),
      comparePrice: parseFloat(document.getElementById('f-compare-price').value) || null,
      stock: parseInt(document.getElementById('f-stock').value) || 0,
      rating: parseFloat(document.getElementById('f-rating').value) || 4.5,
      emoji: document.getElementById('f-emoji').value.trim() || '🌹',
      color: selectedColor,
      image: currentImageDataUrl || null,
      desc: document.getElementById('f-desc').value.trim(),
      tags,
      ingredients: document.getElementById('f-ingredients').value.trim(),
      skinType: document.getElementById('f-skin-type').value,
      size: document.getElementById('f-size').value.trim(),
      active: document.getElementById('f-active').checked,
      badges: {
        new: document.getElementById('f-badge-new').checked,
        best: document.getElementById('f-badge-best').checked,
        sale: document.getElementById('f-badge-sale').checked,
        vegan: document.getElementById('f-badge-vegan').checked,
      },
      reviews: []
    };

    if (editId) {
      const idx = products.findIndex(p => p.id === parseInt(editId));
      if (idx !== -1) {
        productData.id = parseInt(editId);
        productData.reviews = products[idx].reviews || [];
        products[idx] = productData;
        showToast('Product updated successfully', 'success');
      }
    } else {
      productData.id = nextId();
      products.push(productData);
      showToast('Product added to catalog', 'success');
    }

    saveProducts();
    btn.disabled = false;
    document.getElementById('save-btn-text').textContent = editId ? 'Update Product' : 'Save Product';
    resetForm();
    switchView('products');
  }, 600);
});

// ===== DELETE =====
function promptDelete(id) {
  deleteTargetId = id;
  document.getElementById('delete-modal').classList.remove('hidden');
}
document.getElementById('cancel-delete').addEventListener('click', () => {
  document.getElementById('delete-modal').classList.add('hidden');
  deleteTargetId = null;
});
document.getElementById('confirm-delete').addEventListener('click', () => {
  if (deleteTargetId !== null) {
    products = products.filter(p => p.id !== deleteTargetId);
    saveProducts();
    renderProductsTable();
    showToast('Product deleted', 'error');
  }
  document.getElementById('delete-modal').classList.add('hidden');
  deleteTargetId = null;
});

// ===== IMAGE UPLOAD =====
const uploadZone = document.getElementById('upload-zone');
const fileInput = document.getElementById('f-image');

uploadZone.addEventListener('dragover', e => { e.preventDefault(); uploadZone.classList.add('drag-over'); });
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('drag-over'));
uploadZone.addEventListener('drop', e => {
  e.preventDefault(); uploadZone.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file) handleImageFile(file);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleImageFile(fileInput.files[0]);
});

function handleImageFile(file) {
  if (!file.type.startsWith('image/')) { showToast('Please upload an image file', 'error'); return; }
  if (file.size > 5 * 1024 * 1024) { showToast('Image must be under 5MB', 'error'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    currentImageDataUrl = e.target.result;
    showImagePreview(currentImageDataUrl);
    updatePreview();
  };
  reader.readAsDataURL(file);
}

function showImagePreview(src) {
  document.getElementById('image-preview').src = src;
  document.getElementById('image-preview').classList.remove('hidden');
  document.getElementById('upload-placeholder').classList.add('hidden');
  document.getElementById('remove-image-btn').classList.remove('hidden');
}

document.getElementById('remove-image-btn').addEventListener('click', e => {
  e.stopPropagation();
  currentImageDataUrl = null;
  fileInput.value = '';
  document.getElementById('image-preview').classList.add('hidden');
  document.getElementById('upload-placeholder').classList.remove('hidden');
  document.getElementById('remove-image-btn').classList.add('hidden');
  document.getElementById('preview-img').classList.add('hidden');
  document.getElementById('f-image-url').value = '';
  updatePreview();
});

document.getElementById('f-image-url').addEventListener('input', function() {
  const url = this.value.trim();
  if (url) {
    currentImageDataUrl = url;
    showImagePreview(url);
    updatePreview();
  }
});

// ===== LIVE PREVIEW =====
function updatePreview() {
  const name = document.getElementById('f-name').value || 'Product Name';
  const cat = document.getElementById('f-category').value || 'Category';
  const price = document.getElementById('f-price').value || '0';
  const emoji = document.getElementById('f-emoji').value || '🌹';

  document.getElementById('preview-name').textContent = name;
  document.getElementById('preview-cat').textContent = cat;
  document.getElementById('preview-price').textContent = '$' + parseFloat(price || 0).toFixed(2);
  document.getElementById('preview-emoji').textContent = emoji;

  const imgEl = document.getElementById('preview-img');
  if (currentImageDataUrl) {
    imgEl.src = currentImageDataUrl;
    imgEl.classList.remove('hidden');
  } else {
    imgEl.classList.add('hidden');
  }

  document.getElementById('preview-img-area').style.background =
    `linear-gradient(135deg, ${selectedColor}, #fff8e1)`;

  // Badges
  const badges = [];
  if (document.getElementById('f-badge-new').checked) badges.push('<span class="badge-pill badge-new">New</span>');
  if (document.getElementById('f-badge-best').checked) badges.push('<span class="badge-pill badge-best">Best</span>');
  if (document.getElementById('f-badge-sale').checked) badges.push('<span class="badge-pill badge-sale">Sale</span>');
  if (document.getElementById('f-badge-vegan').checked) badges.push('<span class="badge-pill badge-vegan">Vegan</span>');
  document.getElementById('preview-badges').innerHTML = badges.join('');
}

// Live preview listeners
['f-name','f-category','f-price','f-emoji'].forEach(id => {
  document.getElementById(id)?.addEventListener('input', updatePreview);
});
['f-badge-new','f-badge-best','f-badge-sale','f-badge-vegan'].forEach(id => {
  document.getElementById(id)?.addEventListener('change', updatePreview);
});

// Emoji presets
document.querySelectorAll('.emoji-opt').forEach(opt => {
  opt.addEventListener('click', () => {
    document.getElementById('f-emoji').value = opt.dataset.emoji;
    document.querySelectorAll('.emoji-opt').forEach(e => e.classList.remove('selected'));
    opt.classList.add('selected');
    updatePreview();
  });
});

// Color swatches
document.querySelectorAll('.swatch').forEach(swatch => {
  swatch.addEventListener('click', () => {
    selectedColor = swatch.dataset.color;
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
    swatch.classList.add('active');
    document.getElementById('custom-color').value = selectedColor;
    updatePreview();
  });
});
document.getElementById('custom-color').addEventListener('input', function() {
  selectedColor = this.value;
  document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
  updatePreview();
});

// Tags preview
function renderTagsPreview() {
  const raw = document.getElementById('f-tags').value;
  const tags = raw.split(',').map(t => t.trim()).filter(Boolean);
  document.getElementById('tags-preview').innerHTML = tags.map(t => `<span class="tag-chip">${t}</span>`).join('');
}
document.getElementById('f-tags').addEventListener('input', renderTagsPreview);

// Desc char count
document.getElementById('f-desc').addEventListener('input', function() {
  document.getElementById('desc-count').textContent = this.value.length;
});

// Toggle status label
document.getElementById('f-active').addEventListener('change', function() {
  document.getElementById('status-label').textContent = this.checked ? 'Active (visible on site)' : 'Hidden';
});

// ===== ANALYTICS =====
function renderAnalytics() {
  // Category bars
  const cats = { Skincare: 0, Makeup: 0, Haircare: 0 };
  products.forEach(p => { if (cats[p.category] !== undefined) cats[p.category]++; });
  const maxCat = Math.max(...Object.values(cats), 1);
  const catColors = { Skincare: '', Makeup: 'gold', Haircare: 'green' };
  document.getElementById('analytics-cat-bars').innerHTML = Object.entries(cats).map(([cat, count]) => `
    <div class="cat-bar-row">
      <div class="cat-bar-label"><span>${cat}</span><span>${count}</span></div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill ${catColors[cat]}" style="width:${(count/maxCat*100).toFixed(0)}%"></div>
      </div>
    </div>
  `).join('');

  // Price distribution
  const ranges = [
    { label: 'Under $30', min: 0, max: 30 },
    { label: '$30–$60', min: 30, max: 60 },
    { label: '$60–$100', min: 60, max: 100 },
    { label: 'Over $100', min: 100, max: Infinity },
  ];
  const priceCounts = ranges.map(r => ({
    label: r.label,
    count: products.filter(p => p.price >= r.min && p.price < r.max).length
  }));
  const maxP = Math.max(...priceCounts.map(r => r.count), 1);
  document.getElementById('analytics-price-bars').innerHTML = priceCounts.map(r => `
    <div class="cat-bar-row">
      <div class="cat-bar-label"><span>${r.label}</span><span>${r.count}</span></div>
      <div class="cat-bar-track">
        <div class="cat-bar-fill gold" style="width:${(r.count/maxP*100).toFixed(0)}%"></div>
      </div>
    </div>
  `).join('');

  // Top rated
  const topRated = [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
  document.getElementById('analytics-top-rated').innerHTML = topRated.map((p, i) => `
    <div class="top-rated-item">
      <div class="top-rated-rank">${i + 1}</div>
      <span style="font-size:1.6rem">${p.emoji}</span>
      <div class="top-rated-info">
        <div class="top-rated-name">${p.name}</div>
        <div class="top-rated-cat">${p.category} · $${p.price}</div>
      </div>
      <div class="top-rated-stars">★ ${p.rating || '—'}</div>
    </div>
  `).join('');
}

// ===== TOAST =====
function showToast(msg, type = '') {
  const t = document.getElementById('admin-toast');
  t.textContent = msg;
  t.className = 'admin-toast show' + (type ? ' ' + type : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.classList.remove('show'); }, 3000);
}

// ===== INIT =====
function initAdmin() {
  loadProducts();
  renderDashboard();
  renderProductsTable();
  initMobileSidebar();
}

function initMobileSidebar() {
  const toggleBtn = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('admin-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!toggleBtn) return;

  function isMobile() { return window.innerWidth <= 700; }

  function updateToggleVisibility() {
    toggleBtn.style.display = isMobile() ? 'flex' : 'none';
    overlay.style.display = 'none';
    if (isMobile()) sidebar.classList.remove('mobile-open');
  }

  updateToggleVisibility();
  window.addEventListener('resize', updateToggleVisibility);

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('mobile-open');
    overlay.style.display = sidebar.classList.contains('mobile-open') ? 'block' : 'none';
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    overlay.style.display = 'none';
  });
}

// Auto-init if already logged in (dev convenience)
// initAdmin(); // uncomment to skip login during dev
