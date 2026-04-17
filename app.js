/* ===== GLOWNEST BEAUTY - Main App ===== */

// ===== PRODUCT DATA =====
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Rose Glow Serum', category: 'Skincare', price: 89, rating: 4.9, emoji: '🌹', color: '#fce4ec',
    desc: 'A luxurious vitamin C serum infused with Bulgarian rose extract and hyaluronic acid. Brightens, firms, and deeply hydrates for a radiant, glass-skin effect.',
    tags: ['Brightening', 'Anti-aging', 'Hydrating'],
    reviews: [
      { author: 'Sofia M.', stars: 5, text: 'My skin has never looked better. Absolutely magical.' },
      { author: 'Aria K.', stars: 5, text: 'Faded my dark spots in 2 weeks. Worth every penny.' }
    ]
  },
  { id: 2, name: 'Velvet Matte Lip', category: 'Makeup', price: 34, rating: 4.7, emoji: '💄', color: '#fce4ec',
    desc: 'Long-lasting velvet matte formula enriched with vitamin E and jojoba oil. Comfortable all-day wear with intense pigmentation.',
    tags: ['Long-lasting', 'Moisturizing', 'Vegan'],
    reviews: [
      { author: 'Lena R.', stars: 5, text: 'The most comfortable matte lip I\'ve ever worn.' },
      { author: 'Maya T.', stars: 4, text: 'Beautiful color payoff, lasts all day.' }
    ]
  },
  { id: 3, name: 'Golden Hour Oil', category: 'Haircare', price: 62, rating: 4.8, emoji: '✨', color: '#fff8e1',
    desc: 'A lightweight, multi-use hair oil blended with argan, marula, and 24k gold flakes. Adds mirror-like shine and tames frizz instantly.',
    tags: ['Shine', 'Frizz Control', 'Nourishing'],
    reviews: [
      { author: 'Priya S.', stars: 5, text: 'My hair looks like it\'s from a shampoo commercial.' },
      { author: 'Chloe B.', stars: 5, text: 'Smells divine and works even better.' }
    ]
  },
  { id: 4, name: 'Cloud Cream Moisturizer', category: 'Skincare', price: 74, rating: 4.9, emoji: '☁️', color: '#e8f5e9',
    desc: 'An ultra-light whipped moisturizer with ceramides, niacinamide, and peptides. Melts into skin for 72-hour hydration without any heaviness.',
    tags: ['72hr Hydration', 'Ceramides', 'All Skin Types'],
    reviews: [
      { author: 'Emma L.', stars: 5, text: 'Feels like a cloud on my skin. Incredible texture.' },
      { author: 'Zoe W.', stars: 5, text: 'Finally a moisturizer that doesn\'t break me out.' }
    ]
  },
  { id: 5, name: 'Petal Blush Palette', category: 'Makeup', price: 58, rating: 4.6, emoji: '🌸', color: '#fce4ec',
    desc: 'A curated palette of 6 buildable blush shades from soft petal pink to warm terracotta. Silky formula blends effortlessly.',
    tags: ['Buildable', 'Blendable', 'Cruelty-free'],
    reviews: [
      { author: 'Isla F.', stars: 5, text: 'The shades are so wearable and pigmented.' },
      { author: 'Nora J.', stars: 4, text: 'Beautiful packaging and great quality.' }
    ]
  },
  { id: 6, name: 'Silk Repair Mask', category: 'Haircare', price: 48, rating: 4.8, emoji: '🌿', color: '#e8f5e9',
    desc: 'An intensive overnight hair mask with silk proteins, keratin, and botanical extracts. Restores damaged hair to silky perfection.',
    tags: ['Repair', 'Overnight', 'Keratin'],
    reviews: [
      { author: 'Ava C.', stars: 5, text: 'My bleached hair feels brand new after one use.' },
      { author: 'Mia D.', stars: 5, text: 'The best hair mask I\'ve ever tried, period.' }
    ]
  },
  { id: 7, name: 'Dew Drop Toner', category: 'Skincare', price: 42, rating: 4.7, emoji: '💧', color: '#e3f2fd',
    desc: 'A hydrating essence toner with green tea, centella asiatica, and beta-glucan. Preps skin for maximum absorption of serums.',
    tags: ['Hydrating', 'Calming', 'Essence'],
    reviews: [
      { author: 'Lily P.', stars: 5, text: 'My skin drinks this up. Glowing every morning.' },
      { author: 'Rose T.', stars: 4, text: 'Great for layering under my serum.' }
    ]
  },
  { id: 8, name: 'Luminous Foundation', category: 'Makeup', price: 68, rating: 4.5, emoji: '🪞', color: '#fff3e0',
    desc: 'A skin-like satin foundation with SPF 30 and skincare actives. Buildable coverage that looks like your skin, but better.',
    tags: ['SPF 30', 'Buildable', 'Skin-like'],
    reviews: [
      { author: 'Jade M.', stars: 5, text: 'Looks like I\'m not wearing anything. Perfect.' },
      { author: 'Stella K.', stars: 4, text: 'Great coverage and lasts all day.' }
    ]
  }
];

// Load from admin localStorage if available, otherwise use defaults
function loadSiteProducts() {
  try {
    const stored = localStorage.getItem('glownest_site_products');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_PRODUCTS;
}

const PRODUCTS = loadSiteProducts();

// ===== STATE =====
let cart = [];
let currentPage = 'home';
let productQty = 1;
let activeProductId = null;
let heroScene, heroCamera, heroRenderer, heroBottle, heroAnimId;
let productScene, productCamera, productRenderer, productModel, productAnimId;
let productIsDragging = false, productLastX = 0, productLastY = 0;
let productRotX = 0, productRotY = 0;
let bgScene, bgCamera, bgRenderer, bgParticles, bgAnimId;
let aboutScene, aboutCamera, aboutRenderer, aboutAnimId;

// ===== NAVIGATION =====
function navigateTo(page, productId = null) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const target = document.getElementById(`page-${page}`);
  if (target) { target.classList.add('active'); }

  const navLink = document.querySelector(`[data-page="${page}"]`);
  if (navLink) navLink.classList.add('active');

  currentPage = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Stop previous 3D scenes
  if (heroAnimId) { cancelAnimationFrame(heroAnimId); heroAnimId = null; }
  if (productAnimId) { cancelAnimationFrame(productAnimId); productAnimId = null; }
  if (aboutAnimId) { cancelAnimationFrame(aboutAnimId); aboutAnimId = null; }

  if (page === 'home') initHeroScene();
  if (page === 'shop') { renderShopGrid(); setTimeout(initShopHeroCanvas, 80); }
  if (page === 'product' && productId) {
    activeProductId = productId;
    renderProductDetail(productId);
  }
  if (page === 'about') setTimeout(initAboutScene, 100);
}

// Nav link clicks
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(link.dataset.page);
    // Close mobile menu if open
    document.getElementById('nav-drawer').classList.remove('open');
    document.getElementById('nav-hamburger').classList.remove('open');
  });
});

// Hamburger menu toggle
document.getElementById('nav-hamburger').addEventListener('click', () => {
  document.getElementById('nav-hamburger').classList.toggle('open');
  document.getElementById('nav-drawer').classList.toggle('open');
});

// Close drawer when clicking outside
document.getElementById('nav-drawer').addEventListener('click', e => {
  if (e.target.id === 'nav-drawer') {
    document.getElementById('nav-drawer').classList.remove('open');
    document.getElementById('nav-hamburger').classList.remove('open');
  }
});

// CTA buttons
document.querySelectorAll('[data-page]').forEach(btn => {
  if (!btn.classList.contains('nav-link')) {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  }
});

// Category cards
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    navigateTo('shop');
    setTimeout(() => {
      document.getElementById('filter-category').value = card.dataset.category;
      renderShopGrid();
    }, 100);
  });
});

// Back button
document.getElementById('back-btn').addEventListener('click', () => navigateTo('shop'));

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});

// ===== BACKGROUND 3D SCENE =====
function initBgScene() {
  const canvas = document.getElementById('bg-canvas');
  bgScene = new THREE.Scene();
  bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  bgCamera.position.z = 30;

  bgRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  bgRenderer.setSize(window.innerWidth, window.innerHeight);
  bgRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Ambient + directional lights
  bgScene.add(new THREE.AmbientLight(0xfce4ec, 0.8));
  const dirLight = new THREE.DirectionalLight(0xf48fb1, 1.2);
  dirLight.position.set(10, 10, 10);
  bgScene.add(dirLight);
  const goldLight = new THREE.PointLight(0xd4a853, 1.5, 60);
  goldLight.position.set(-15, 5, 5);
  bgScene.add(goldLight);

  // Floating glass spheres
  const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
  bgParticles = [];
  const sphereColors = [0xf48fb1, 0xfce4ec, 0xd4a853, 0xf8bbd0, 0xfff9c4];
  for (let i = 0; i < 18; i++) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: sphereColors[i % sphereColors.length],
      transparent: true, opacity: 0.25 + Math.random() * 0.2,
      roughness: 0.05, metalness: 0.1,
      transmission: 0.8, thickness: 1.5,
    });
    const scale = 0.4 + Math.random() * 1.8;
    const mesh = new THREE.Mesh(sphereGeo, mat);
    mesh.scale.setScalar(scale);
    mesh.position.set(
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20 - 10
    );
    mesh.userData = {
      speed: 0.003 + Math.random() * 0.005,
      offset: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.01
    };
    bgScene.add(mesh);
    bgParticles.push(mesh);
  }

  // Particle dust
  const dustGeo = new THREE.BufferGeometry();
  const dustCount = 200;
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount * 3; i++) dustPos[i] = (Math.random() - 0.5) * 80;
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0xf48fb1, size: 0.15, transparent: true, opacity: 0.5 });
  bgScene.add(new THREE.Points(dustGeo, dustMat));

  // Reflective floor plane
  const floorGeo = new THREE.PlaneGeometry(120, 120);
  const floorMat = new THREE.MeshPhysicalMaterial({
    color: 0xfce4ec, transparent: true, opacity: 0.08,
    roughness: 0.05, metalness: 0.9,
    side: THREE.DoubleSide,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -18;
  bgScene.add(floor);

  // DNA helix strands
  const helixGroup = new THREE.Group();
  const helixMat1 = new THREE.MeshBasicMaterial({ color: 0xf48fb1, transparent: true, opacity: 0.5 });
  const helixMat2 = new THREE.MeshBasicMaterial({ color: 0xd4a853, transparent: true, opacity: 0.5 });
  const sphereS = new THREE.SphereGeometry(0.12, 8, 8);
  for (let i = 0; i < 40; i++) {
    const t = (i / 40) * Math.PI * 6;
    const s1 = new THREE.Mesh(sphereS, helixMat1);
    s1.position.set(Math.cos(t) * 1.5, i * 0.4 - 8, Math.sin(t) * 1.5 - 20);
    helixGroup.add(s1);
    const s2 = new THREE.Mesh(sphereS, helixMat2);
    s2.position.set(Math.cos(t + Math.PI) * 1.5, i * 0.4 - 8, Math.sin(t + Math.PI) * 1.5 - 20);
    helixGroup.add(s2);
    if (i % 4 === 0) {
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, 3, 8);
      const bar = new THREE.Mesh(barGeo, new THREE.MeshBasicMaterial({ color: 0xfce4ec, transparent: true, opacity: 0.3 }));
      bar.position.set(0, i * 0.4 - 8, -20);
      bar.rotation.z = Math.PI / 2;
      bar.rotation.y = t;
      helixGroup.add(bar);
    }
  }
  bgScene.add(helixGroup);
  helixGroup.userData.isHelix = true;
  bgParticles.push(helixGroup);

  animateBg();

  window.addEventListener('resize', () => {
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
  });
}

let bgMouseX = 0, bgMouseY = 0;
window.addEventListener('mousemove', e => {
  bgMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
  bgMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

function animateBg() {
  bgAnimId = requestAnimationFrame(animateBg);
  const t = Date.now() * 0.001;
  bgParticles.forEach(mesh => {
    if (mesh.userData.isHelix) {
      mesh.rotation.y = t * 0.15;
      return;
    }
    const { speed, offset, rotSpeed } = mesh.userData;
    mesh.position.y += Math.sin(t * speed + offset) * 0.02;
    mesh.rotation.x += rotSpeed;
    mesh.rotation.y += rotSpeed * 0.7;
  });
  bgCamera.position.x += (bgMouseX * 3 - bgCamera.position.x) * 0.02;
  bgCamera.position.y += (-bgMouseY * 2 - bgCamera.position.y) * 0.02;
  bgCamera.lookAt(bgScene.position);
  bgRenderer.render(bgScene, bgCamera);
}

// ===== HERO 3D SCENE (Serum Bottle) =====
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  if (heroRenderer) { heroRenderer.dispose(); }

  heroScene = new THREE.Scene();
  heroCamera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  heroCamera.position.set(0, 0, 6);

  heroRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  heroRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  heroRenderer.shadowMap.enabled = true;

  // Lights
  heroScene.add(new THREE.AmbientLight(0xfce4ec, 1.2));
  const key = new THREE.DirectionalLight(0xffffff, 2);
  key.position.set(3, 5, 5);
  heroScene.add(key);
  const fill = new THREE.PointLight(0xf48fb1, 2, 20);
  fill.position.set(-4, 2, 3);
  heroScene.add(fill);
  const rim = new THREE.PointLight(0xd4a853, 1.5, 15);
  rim.position.set(0, -3, -3);
  heroScene.add(rim);

  // Build serum bottle group
  heroBottle = new THREE.Group();

  // Bottle body
  const bodyGeo = new THREE.CylinderGeometry(0.55, 0.65, 2.8, 64, 1, false);
  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xfce4ec, transparent: true, opacity: 0.75,
    roughness: 0.05, metalness: 0.1,
    transmission: 0.6, thickness: 2,
    envMapIntensity: 1.5,
  });
  heroBottle.add(new THREE.Mesh(bodyGeo, bodyMat));

  // Liquid inside
  const liquidGeo = new THREE.CylinderGeometry(0.45, 0.55, 2.2, 32);
  const liquidMat = new THREE.MeshPhysicalMaterial({
    color: 0xf48fb1, transparent: true, opacity: 0.5,
    roughness: 0.1, metalness: 0,
  });
  const liquid = new THREE.Mesh(liquidGeo, liquidMat);
  liquid.position.y = -0.2;
  heroBottle.add(liquid);

  // Neck
  const neckGeo = new THREE.CylinderGeometry(0.22, 0.5, 0.5, 32);
  const neckMat = new THREE.MeshPhysicalMaterial({ color: 0xfce4ec, roughness: 0.1, metalness: 0.2 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.y = 1.65;
  heroBottle.add(neck);

  // Cap
  const capGeo = new THREE.CylinderGeometry(0.25, 0.22, 0.7, 32);
  const capMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a853, roughness: 0.2, metalness: 0.8 });
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.y = 2.25;
  heroBottle.add(cap);

  // Cap top sphere
  const capTopGeo = new THREE.SphereGeometry(0.25, 32, 32);
  const capTop = new THREE.Mesh(capTopGeo, capMat);
  capTop.position.y = 2.65;
  heroBottle.add(capTop);

  // Label band
  const labelGeo = new THREE.CylinderGeometry(0.56, 0.56, 0.8, 64, 1, true);
  const labelMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3, side: THREE.DoubleSide });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.y = -0.2;
  heroBottle.add(label);

  // Floating rings
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.TorusGeometry(1.2 + i * 0.4, 0.02, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf48fb1, transparent: true, opacity: 0.3 - i * 0.08 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + i * 0.3;
    ring.userData.ringIdx = i;
    heroBottle.add(ring);
  }

  heroScene.add(heroBottle);

  // Glowing halo disc behind bottle
  const haloGeo = new THREE.CircleGeometry(2.5, 64);
  const haloMat = new THREE.MeshBasicMaterial({
    color: 0xf48fb1, transparent: true, opacity: 0.08,
    side: THREE.DoubleSide,
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  halo.position.z = -1.5;
  heroScene.add(halo);

  // Second halo ring
  const halo2Geo = new THREE.RingGeometry(2.2, 2.6, 64);
  const halo2Mat = new THREE.MeshBasicMaterial({ color: 0xd4a853, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
  heroScene.add(new THREE.Mesh(halo2Geo, halo2Mat));

  // Floating particles around bottle
  const pGeo = new THREE.BufferGeometry();
  const pCount = 80;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 1.5 + Math.random() * 2;
    pPos[i * 3] = Math.cos(angle) * r;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
    pPos[i * 3 + 2] = Math.sin(angle) * r;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0xf48fb1, size: 0.06, transparent: true, opacity: 0.8 });
  heroScene.add(new THREE.Points(pGeo, pMat));

  animateHero();
}

function animateHero() {
  heroAnimId = requestAnimationFrame(animateHero);
  const t = Date.now() * 0.001;
  if (heroBottle) {
    heroBottle.rotation.y = t * 0.5;
    heroBottle.position.y = Math.sin(t * 0.8) * 0.15;
    heroBottle.children.forEach(child => {
      if (child.userData.ringIdx !== undefined) {
        child.rotation.z = t * (0.3 + child.userData.ringIdx * 0.1);
      }
    });
  }
  heroRenderer.render(heroScene, heroCamera);
}

// ===== PRODUCT DETAIL 3D SCENE =====
function initProductScene(product) {
  const canvas = document.getElementById('product-canvas');
  if (!canvas) return;
  if (productRenderer) { productRenderer.dispose(); }

  productScene = new THREE.Scene();
  productCamera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  productCamera.position.set(0, 0, 5);

  productRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  productRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  productRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  productScene.add(new THREE.AmbientLight(0xfce4ec, 1.5));
  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(4, 6, 6);
  productScene.add(key);
  const fill = new THREE.PointLight(0xf48fb1, 2, 20);
  fill.position.set(-4, 0, 4);
  productScene.add(fill);
  const gold = new THREE.PointLight(0xd4a853, 1.5, 15);
  gold.position.set(0, -4, 2);
  productScene.add(gold);

  productModel = new THREE.Group();
  productRotX = 0; productRotY = 0;

  // Build different shapes per category
  const colorMap = { Skincare: 0xf48fb1, Makeup: 0xe91e8c, Haircare: 0x81c784 };
  const baseColor = colorMap[product.category] || 0xf48fb1;

  if (product.category === 'Skincare') {
    buildSerumBottle(productModel, baseColor);
  } else if (product.category === 'Makeup') {
    buildMakeupProduct(productModel, baseColor);
  } else {
    buildHaircareProduct(productModel, baseColor);
  }

  productScene.add(productModel);

  // Orbit particles
  const pGeo = new THREE.BufferGeometry();
  const pCount = 60;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const a = (i / pCount) * Math.PI * 2;
    const r = 2 + Math.random() * 0.5;
    pPos[i * 3] = Math.cos(a) * r;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
    pPos[i * 3 + 2] = Math.sin(a) * r;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  productScene.add(new THREE.Points(pGeo, new THREE.PointsMaterial({ color: baseColor, size: 0.05, transparent: true, opacity: 0.7 })));

  setupProductInteraction(canvas);
  animateProduct();
}

function buildSerumBottle(group, color) {
  const mat = new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: 0.7, roughness: 0.05, metalness: 0.1, transmission: 0.5, thickness: 2 });
  group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 3, 64), mat));
  const capMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a853, roughness: 0.2, metalness: 0.8 });
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.8, 32), capMat);
  cap.position.y = 1.9;
  group.add(cap);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.55, 0.5, 32), mat);
  neck.position.y = 1.75;
  group.add(neck);
}

function buildMakeupProduct(group, color) {
  // Lipstick shape
  const tubeMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a853, roughness: 0.2, metalness: 0.9 });
  group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 2.5, 32), tubeMat));
  const lipMat = new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0 });
  const lip = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.2, 32), lipMat);
  lip.position.y = 1.85;
  group.add(lip);
  const tipGeo = new THREE.CylinderGeometry(0.1, 0.42, 0.5, 32);
  const tip = new THREE.Mesh(tipGeo, lipMat);
  tip.position.y = 2.7;
  group.add(tip);
}

function buildHaircareProduct(group, color) {
  // Bottle with pump
  const mat = new THREE.MeshPhysicalMaterial({ color, transparent: true, opacity: 0.8, roughness: 0.1, metalness: 0.05 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.8, 2.8, 32), mat);
  group.add(body);
  const pumpMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a853, roughness: 0.3, metalness: 0.7 });
  const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 16), pumpMat);
  pump.position.y = 2.2;
  group.add(pump);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), pumpMat);
  head.position.y = 2.9;
  group.add(head);
}

function setupProductInteraction(canvas) {
  let startX, startY;
  canvas.addEventListener('mousedown', e => { productIsDragging = true; startX = e.clientX; startY = e.clientY; });
  window.addEventListener('mouseup', () => { productIsDragging = false; });
  window.addEventListener('mousemove', e => {
    if (!productIsDragging) return;
    productRotY += (e.clientX - startX) * 0.01;
    productRotX += (e.clientY - startY) * 0.01;
    startX = e.clientX; startY = e.clientY;
  });
  canvas.addEventListener('wheel', e => {
    productCamera.position.z = Math.max(2, Math.min(10, productCamera.position.z + e.deltaY * 0.01));
  });
  // Touch
  canvas.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; });
  canvas.addEventListener('touchmove', e => {
    productRotY += (e.touches[0].clientX - startX) * 0.01;
    productRotX += (e.touches[0].clientY - startY) * 0.01;
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
  });
}

function animateProduct() {
  productAnimId = requestAnimationFrame(animateProduct);
  const t = Date.now() * 0.001;
  if (productModel) {
    if (!productIsDragging) {
      productRotY += 0.005;
    }
    productModel.rotation.y = productRotY;
    productModel.rotation.x = productRotX;
    productModel.position.y = Math.sin(t * 0.8) * 0.1;
  }
  productRenderer.render(productScene, productCamera);
}

// ===== ABOUT 3D SCENE =====
function initAboutScene() {
  const canvas = document.getElementById('about-canvas');
  if (!canvas) return;
  if (aboutRenderer) { aboutRenderer.dispose(); }

  aboutScene = new THREE.Scene();
  aboutCamera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  aboutCamera.position.z = 12;

  aboutRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  aboutRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
  aboutRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  aboutScene.add(new THREE.AmbientLight(0xfce4ec, 1));
  const light = new THREE.PointLight(0xf48fb1, 3, 30);
  light.position.set(5, 5, 5);
  aboutScene.add(light);
  const gold = new THREE.PointLight(0xd4a853, 2, 20);
  gold.position.set(-5, -3, 3);
  aboutScene.add(gold);

  const aboutObjects = [];
  const shapes = [
    new THREE.SphereGeometry(0.6, 32, 32),
    new THREE.TorusGeometry(0.5, 0.15, 16, 100),
    new THREE.OctahedronGeometry(0.6),
    new THREE.IcosahedronGeometry(0.5),
  ];
  const colors = [0xf48fb1, 0xd4a853, 0xfce4ec, 0xe91e8c, 0x81c784];

  for (let i = 0; i < 12; i++) {
    const geo = shapes[i % shapes.length];
    const mat = new THREE.MeshPhysicalMaterial({
      color: colors[i % colors.length],
      transparent: true, opacity: 0.4 + Math.random() * 0.3,
      roughness: 0.1, metalness: 0.3,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8 - 4
    );
    mesh.userData = {
      speed: 0.003 + Math.random() * 0.005,
      offset: Math.random() * Math.PI * 2,
      rotX: (Math.random() - 0.5) * 0.02,
      rotY: (Math.random() - 0.5) * 0.02,
    };
    aboutScene.add(mesh);
    aboutObjects.push(mesh);
  }

  function animateAbout() {
    aboutAnimId = requestAnimationFrame(animateAbout);
    const t = Date.now() * 0.001;
    aboutObjects.forEach(obj => {
      obj.position.y += Math.sin(t * obj.userData.speed + obj.userData.offset) * 0.01;
      obj.rotation.x += obj.userData.rotX;
      obj.rotation.y += obj.userData.rotY;
    });
    aboutCamera.position.x += (bgMouseX * 2 - aboutCamera.position.x) * 0.02;
    aboutCamera.position.y += (-bgMouseY * 1.5 - aboutCamera.position.y) * 0.02;
    aboutCamera.lookAt(aboutScene.position);
    aboutRenderer.render(aboutScene, aboutCamera);
  }
  animateAbout();
}

// ===== HERO PARTICLES (DOM) =====
function initHeroParticles() {
  const container = document.getElementById('hero-particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 20;
    p.style.cssText = `
      width: ${size}px; height: ${size}px;
      left: ${Math.random() * 100}%;
      animation-duration: ${8 + Math.random() * 12}s;
      animation-delay: ${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
}

// ===== PRODUCT CARDS =====
function createProductCard(product, onClick) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
    <div class="product-card-img" style="background: linear-gradient(135deg, ${product.color}, #fff);">
      <span>${product.emoji}</span>
    </div>
    <div class="product-card-body">
      <div class="product-card-category">${product.category}</div>
      <div class="product-card-name">${product.name}</div>
      <div class="product-card-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating}</div>
      <div class="product-card-footer">
        <span class="product-card-price">$${product.price}</span>
        <button class="add-to-cart-btn" title="Add to cart">+</button>
      </div>
    </div>
  `;
  card.querySelector('.product-card-img').addEventListener('click', onClick);
  card.querySelector('.product-card-name').addEventListener('click', onClick);
  card.querySelector('.add-to-cart-btn').addEventListener('click', e => {
    e.stopPropagation();
    addToCart(product);
  });

  // 3D tilt effect
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-12px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });

  return card;
}

// ===== FEATURED GRID =====
function renderFeaturedGrid() {
  const grid = document.getElementById('featured-grid');
  PRODUCTS.slice(0, 4).forEach(product => {
    grid.appendChild(createProductCard(product, () => navigateTo('product', product.id)));
  });
}

// ===== SHOP GRID =====
function renderShopGrid() {
  const grid = document.getElementById('shop-grid');
  grid.innerHTML = '';
  const category = document.getElementById('filter-category').value;
  const maxPrice = parseFloat(document.getElementById('filter-price').value);
  const minRating = parseFloat(document.getElementById('filter-rating').value);

  const filtered = PRODUCTS.filter(p =>
    (category === 'all' || p.category === category) &&
    p.price <= maxPrice &&
    p.rating >= minRating
  );

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="color:var(--text-light);padding:40px;grid-column:1/-1;text-align:center;">No products match your filters.</p>';
    return;
  }

  filtered.forEach((product, i) => {
    const card = createProductCard(product, () => navigateTo('product', product.id));
    card.style.animationDelay = `${i * 0.08}s`;
    card.style.animation = 'fadeInPage 0.5s ease both';
    grid.appendChild(card);
  });
}

// Filter listeners
document.getElementById('filter-category').addEventListener('change', renderShopGrid);
document.getElementById('filter-rating').addEventListener('change', renderShopGrid);
document.getElementById('filter-price').addEventListener('input', function() {
  document.getElementById('price-val').textContent = this.value;
  renderShopGrid();
});

// ===== PRODUCT DETAIL =====
function renderProductDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const panel = document.getElementById('product-info-panel');
  panel.innerHTML = `
    <div class="product-detail-category">${product.category}</div>
    <h1 class="product-detail-name">${product.name}</h1>
    <div class="product-detail-rating">${'★'.repeat(Math.floor(product.rating))} ${product.rating} (${product.reviews.length * 12} reviews)</div>
    <div class="product-detail-price">$${product.price}</div>
    <p class="product-detail-desc">${product.desc}</p>
    <div class="product-detail-tags">
      ${product.tags.map(t => `<span class="tag">${t}</span>`).join('')}
    </div>
    <div class="product-detail-actions">
      <div class="qty-selector">
        <button class="qty-btn" id="qty-minus">−</button>
        <span class="qty-num" id="qty-display">1</span>
        <button class="qty-btn" id="qty-plus">+</button>
      </div>
      <button class="btn-primary" id="detail-add-cart">Add to Cart</button>
    </div>
    <div class="reviews-section">
      <h3>Customer Reviews</h3>
      ${product.reviews.map(r => `
        <div class="review-item">
          <div class="review-header">
            <span class="review-author">${r.author}</span>
            <span class="review-stars">${'★'.repeat(r.stars)}</span>
          </div>
          <p class="review-text">${r.text}</p>
        </div>
      `).join('')}
    </div>
  `;

  productQty = 1;
  document.getElementById('qty-minus').addEventListener('click', () => {
    if (productQty > 1) { productQty--; document.getElementById('qty-display').textContent = productQty; }
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    productQty++; document.getElementById('qty-display').textContent = productQty;
  });
  document.getElementById('detail-add-cart').addEventListener('click', () => {
    for (let i = 0; i < productQty; i++) addToCart(product);
  });

  setTimeout(() => initProductScene(product), 100);
}

// ===== CART =====
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...product, qty: 1 }); }
  updateCartUI();
  showToast(`${product.emoji} ${product.name} added to cart`);
  animateCartBtn();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = total.toFixed(2);

  const itemsEl = document.getElementById('cart-items');
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛍️</div><p>Your cart is empty</p></div>`;
    return;
  }
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name} ${item.qty > 1 ? `×${item.qty}` : ''}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}">✕</button>
    </div>
  `).join('');

  itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
  });
}

function animateCartBtn() {
  const btn = document.getElementById('cart-btn');
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => { btn.style.transform = ''; }, 300);
}

// Cart open/close
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cart-sidebar').classList.add('open');
  document.getElementById('cart-overlay').classList.add('active');
});
function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.getElementById('cart-overlay').classList.remove('active');
}
document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('cart-overlay').addEventListener('click', closeCart);

// ===== TOAST =====
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('form-success').classList.remove('hidden');
  e.target.reset();
  setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 4000);
});

// ===== SCROLL REVEAL (About) =====
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ===== PARALLAX =====
function initParallax() {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && currentPage === 'home') {
      heroContent.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
  });
}

// ===== SPARKLE TRAIL =====
function initSparkleTrail() {
  const canvas = document.getElementById('sparkle-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const sparkles = [];
  let mouseX = 0, mouseY = 0, lastX = 0, lastY = 0;

  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

  function spawnSparkle(x, y) {
    const colors = ['#f48fb1','#d4a853','#e91e8c','#fce4ec','#fff9c4'];
    sparkles.push({
      x, y,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3 - 1,
      size: 2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1, decay: 0.02 + Math.random() * 0.03,
      shape: Math.random() > 0.5 ? 'star' : 'circle'
    });
  }

  function drawStar(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
      const b = (i * 4 * Math.PI) / 5 + (2 * Math.PI) / 5 - Math.PI / 2;
      if (i === 0) ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a));
      else ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      ctx.lineTo(x + (r * 0.4) * Math.cos(b), y + (r * 0.4) * Math.sin(b));
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  }

  function animateSparkles() {
    requestAnimationFrame(animateSparkles);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dx = mouseX - lastX, dy = mouseY - lastY;
    if (Math.abs(dx) + Math.abs(dy) > 4) {
      for (let i = 0; i < 2; i++) spawnSparkle(mouseX, mouseY);
      lastX = mouseX; lastY = mouseY;
    }
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      s.x += s.vx; s.y += s.vy; s.vy += 0.05; s.life -= s.decay;
      if (s.life <= 0) { sparkles.splice(i, 1); continue; }
      if (s.shape === 'star') {
        drawStar(ctx, s.x, s.y, s.size, s.color, s.life);
      } else {
        ctx.save();
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill(); ctx.restore();
      }
    }
  }
  animateSparkles();
}

// ===== SHOP HERO CANVAS =====
function initShopHeroCanvas() {
  const canvas = document.getElementById('shop-hero-canvas');
  if (!canvas) return;
  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  cam.position.z = 14;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xfce4ec, 1));
  const pl = new THREE.PointLight(0xf48fb1, 3, 40);
  pl.position.set(5, 5, 5); scene.add(pl);
  const gl = new THREE.PointLight(0xd4a853, 2, 30);
  gl.position.set(-5, -3, 3); scene.add(gl);

  const objs = [];
  const emojis3D = ['🌹','💄','✨','☁️','🌸','🌿','💧','🪞'];
  const geos = [
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.TorusGeometry(0.4, 0.12, 16, 60),
    new THREE.OctahedronGeometry(0.5),
    new THREE.IcosahedronGeometry(0.45),
    new THREE.TetrahedronGeometry(0.5),
  ];
  const colors = [0xf48fb1, 0xd4a853, 0xe91e8c, 0xfce4ec, 0x81c784, 0xfff9c4];
  for (let i = 0; i < 20; i++) {
    const mat = new THREE.MeshPhysicalMaterial({
      color: colors[i % colors.length],
      transparent: true, opacity: 0.35 + Math.random() * 0.3,
      roughness: 0.1, metalness: 0.4,
    });
    const mesh = new THREE.Mesh(geos[i % geos.length], mat);
    mesh.position.set((Math.random() - 0.5) * 24, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8 - 4);
    mesh.userData = { vy: 0.002 + Math.random() * 0.004, off: Math.random() * Math.PI * 2, rx: (Math.random()-0.5)*0.02, ry: (Math.random()-0.5)*0.02 };
    scene.add(mesh); objs.push(mesh);
  }

  // Wave mesh
  const waveGeo = new THREE.PlaneGeometry(30, 8, 60, 20);
  const waveMat = new THREE.MeshPhysicalMaterial({
    color: 0xf48fb1, transparent: true, opacity: 0.12,
    roughness: 0.3, metalness: 0.1, side: THREE.DoubleSide,
    wireframe: false,
  });
  const wave = new THREE.Mesh(waveGeo, waveMat);
  wave.rotation.x = -Math.PI / 4;
  wave.position.y = -2; wave.position.z = -3;
  scene.add(wave);

  function animateShopHero() {
    requestAnimationFrame(animateShopHero);
    const t = Date.now() * 0.001;
    objs.forEach(o => {
      o.position.y += Math.sin(t * o.userData.vy * 100 + o.userData.off) * 0.008;
      o.rotation.x += o.userData.rx; o.rotation.y += o.userData.ry;
    });
    // Animate wave vertices
    const pos = waveGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      pos.setZ(i, Math.sin(x * 0.5 + t) * 0.4 + Math.cos(y * 0.8 + t * 0.7) * 0.3);
    }
    pos.needsUpdate = true;
    waveGeo.computeVertexNormals();
    renderer.render(scene, cam);
  }
  animateShopHero();
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (window.scrollY / total * 100) + '%' : '0%';
  });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let rx = 0, ry = 0;
  window.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    rx += (e.clientX - rx) * 0.12; ry += (e.clientY - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  });
  function smoothRing() {
    requestAnimationFrame(smoothRing);
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  }
  smoothRing();
  document.querySelectorAll('button, a, .product-card, .category-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.width = '14px'; dot.style.height = '14px';
      ring.style.width = '56px'; ring.style.height = '56px';
      ring.style.borderColor = 'rgba(233,30,140,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.width = '8px'; dot.style.height = '8px';
      ring.style.width = '36px'; ring.style.height = '36px';
      ring.style.borderColor = 'rgba(233,30,140,0.5)';
    });
  });
}

// ===== INIT =====
function init() {
  initBgScene();
  initHeroParticles();
  initSparkleTrail();
  initScrollProgress();
  initCustomCursor();
  renderFeaturedGrid();
  renderShopGrid();
  initScrollReveal();
  initParallax();
  updateCartUI();
  navigateTo('home');
}

init();
