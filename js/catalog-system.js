/**
 * MANEXT Catalog System
 * Sistema de renderizado dinamico de productos desde JSON
 * Permite automatizar la generacion de cards de productos
 * Similar a blog-system.js pero para productos
 */

(function() {
  'use strict';

  // Configuracion
  const CONFIG = {
    productsPerPage: 12,
    dataPath: 'data/products.json',
    defaultImage: 'img/img-index/extintor.webp',
    whatsappNumber: '5215539689272'
  };

  // Cache de datos
  let productsData = null;

  /**
   * Detecta el nivel de profundidad de la pagina actual
   */
  function getBasePath() {
    const path = window.location.pathname;

    if (path.includes('/productos/') && path.split('/').length > 3) {
      return '../../'; // Nivel 2: productos/categoria/producto.html
    } else if (path.includes('/productos/')) {
      return '../'; // Nivel 1: productos/producto.html
    }
    return ''; // Nivel 0: catalogo.html
  }

  /**
   * Carga los datos del JSON
   */
  async function loadProductsData() {
    if (productsData) return productsData;

    const basePath = getBasePath();
    try {
      const response = await fetch(basePath + CONFIG.dataPath);
      if (!response.ok) throw new Error('Error cargando datos');
      productsData = await response.json();
      return productsData;
    } catch (error) {
      console.error('Error cargando productos:', error);
      return null;
    }
  }

  /**
   * Obtiene la categoria por ID
   */
  function getCategoryById(categories, categoryId) {
    return categories.find(cat => cat.id === categoryId) || null;
  }

  /**
   * Filtra productos por categoria
   */
  function filterByCategory(products, categoryId) {
    if (!categoryId) return products;
    return products.filter(product => product.category === categoryId);
  }

  /**
   * Filtra productos por clase de fuego
   */
  function filterByFireClass(products, fireClass) {
    if (!fireClass || fireClass === 'all') return products;
    return products.filter(product => product.fireClasses.includes(fireClass));
  }

  /**
   * Filtra productos por tipo de capacidad
   */
  function filterByCapacity(products, capacityType) {
    if (!capacityType || capacityType === 'all') return products;
    return products.filter(product => product.capacityType === capacityType);
  }

  /**
   * Ordena productos por capacidad
   */
  function sortByCapacity(products) {
    return [...products].sort((a, b) => a.capacityValue - b.capacityValue);
  }

  /**
   * Genera la URL del producto
   */
  function getProductUrl(product, categories) {
    const category = getCategoryById(categories, product.category);
    const basePath = getBasePath();
    if (category) {
      return `${basePath}productos/${category.slug}/${product.slug}.html`;
    }
    return `${basePath}productos/${product.slug}.html`;
  }

  /**
   * Genera la URL de la imagen
   */
  function getImageUrl(imagePath) {
    const basePath = getBasePath();
    return basePath + (imagePath || CONFIG.defaultImage);
  }

  /**
   * Genera URL de WhatsApp para cotizacion
   */
  function getWhatsAppUrl(product) {
    const message = encodeURIComponent(`Hola, quiero cotizar ${product.title}`);
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
  }

  /**
   * Genera badges de clases de fuego
   */
  function renderFireClassBadges(fireClasses) {
    return fireClasses.map(cls => {
      const classLower = cls.toLowerCase();
      return `<span class="class-badge class-${classLower}">Clase ${cls}</span>`;
    }).join('');
  }

  /**
   * Renderiza una card de producto para el catalogo
   */
  function renderProductCard(product, categories) {
    const category = getCategoryById(categories, product.category);
    const productUrl = getProductUrl(product, categories);
    const imageUrl = getImageUrl(product.image);
    const whatsappUrl = getWhatsAppUrl(product);

    const badgeClass = product.badgeType === 'nom' ? 'nom' :
                       product.badgeType === 'featured' ? 'featured' :
                       product.badgeType === 'premium' ? 'premium' : '';

    return `
      <div class="product-card" data-clase="${product.fireClasses.join(' ')}" data-capacidad="${product.capacityType}" data-category="${product.category}">
        <div class="product-image-wrapper">
          <span class="product-badge ${badgeClass}">${product.badge}</span>
          <img src="${imageUrl}" alt="${product.title}" width="640" height="480" loading="lazy" />
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.title}</h3>
          <p class="product-capacity">Capacidad: ${product.capacity} | Alcance: ${product.range}</p>
          <div class="product-classes">
            ${renderFireClassBadges(product.fireClasses)}
          </div>
          <ul class="product-features">
            ${product.features.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <div class="product-actions">
            <a href="${whatsappUrl}" class="btn-cotizar" target="_blank" rel="noopener">Cotizar Ahora</a>
            <a href="${productUrl}" class="btn-detalles">Detalles</a>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Renderiza una card de producto relacionado (version compacta)
   */
  function renderRelatedProductCard(product, categories) {
    const category = getCategoryById(categories, product.category);
    const productUrl = getProductUrl(product, categories);
    const imageUrl = getImageUrl(product.image);

    return `
      <a href="${productUrl}" class="related-card">
        <div class="related-card-image">
          <img src="${imageUrl}" alt="${product.title}" loading="lazy">
        </div>
        <div class="related-card-content">
          <h3 class="related-card-title">${product.title}</h3>
          <p class="related-card-capacity">${product.capacity} | ${product.range}</p>
          <div class="related-card-badges">
            ${renderFireClassBadges(product.fireClasses)}
          </div>
          <span class="related-card-link">Ver detalles →</span>
        </div>
      </a>
    `;
  }

  /**
   * Renderiza una card mini de producto (para sidebar de articulos)
   */
  function renderMiniProductCard(product, categories) {
    const productUrl = getProductUrl(product, categories);
    const imageUrl = getImageUrl(product.image);

    return `
      <a href="${productUrl}" class="product-mini-card">
        <div class="product-mini-image">
          <img src="${imageUrl}" alt="${product.title}" loading="lazy">
        </div>
        <div class="product-mini-info">
          <span class="product-mini-name">${product.title}</span>
          <span class="product-mini-capacity">${product.capacity}</span>
        </div>
      </a>
    `;
  }

  /**
   * Inicializa la pagina del catalogo
   */
  async function initCatalogPage() {
    const data = await loadProductsData();
    if (!data) return;

    // Inicializar tabs
    initCatalogTabs(data);

    // Inicializar filtros
    initCatalogFilters(data);

    // Renderizar productos iniciales (primera categoria)
    renderCategoryProducts('polvo-quimico-seco', data);
  }

  /**
   * Inicializa los tabs del catalogo
   */
  function initCatalogTabs(data) {
    const tabButtons = document.querySelectorAll('.tab-button[data-tab]');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remover active de todos
        tabButtons.forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));

        // Activar el seleccionado
        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(`tab-${tabId}`);
        if (tabContent) {
          tabContent.classList.add('active');
        }

        // Renderizar productos de la categoria
        const category = data.categories.find(c => c.tabId === tabId);
        if (category) {
          renderCategoryProducts(category.id, data);
        }
      });
    });
  }

  /**
   * Inicializa los filtros del catalogo
   */
  function initCatalogFilters(data) {
    const filterClase = document.getElementById('filterClase');
    const filterCapacidad = document.getElementById('filterCapacidad');

    if (filterClase) {
      filterClase.addEventListener('change', () => applyFilters(data));
    }

    if (filterCapacidad) {
      filterCapacidad.addEventListener('change', () => applyFilters(data));
    }
  }

  /**
   * Aplica filtros a los productos visibles
   */
  function applyFilters(data) {
    const filterClase = document.getElementById('filterClase');
    const filterCapacidad = document.getElementById('filterCapacidad');

    const selectedClass = filterClase ? filterClase.value : 'all';
    const selectedCapacity = filterCapacidad ? filterCapacidad.value : 'all';

    // Obtener la categoria activa
    const activeTab = document.querySelector('.tab-button.active');
    if (!activeTab) return;

    const tabId = activeTab.getAttribute('data-tab');
    const category = data.categories.find(c => c.tabId === tabId);
    if (!category) return;

    // Filtrar productos
    let products = filterByCategory(data.products, category.id);
    products = filterByFireClass(products, selectedClass);
    products = filterByCapacity(products, selectedCapacity);
    products = sortByCapacity(products);

    // Renderizar
    const grid = document.querySelector(`#tab-${tabId} .products-grid`);
    if (grid) {
      if (products.length === 0) {
        grid.innerHTML = '<p class="no-products">No hay productos que coincidan con los filtros seleccionados.</p>';
      } else {
        grid.innerHTML = products.map(p => renderProductCard(p, data.categories)).join('');
      }
    }
  }

  /**
   * Renderiza productos de una categoria
   */
  function renderCategoryProducts(categoryId, data) {
    const category = getCategoryById(data.categories, categoryId);
    if (!category) return;

    let products = filterByCategory(data.products, categoryId);
    products = sortByCapacity(products);

    const grid = document.querySelector(`#tab-${category.tabId} .products-grid`);
    if (grid) {
      grid.innerHTML = products.map(p => renderProductCard(p, data.categories)).join('');
    }

    // Actualizar contador de productos
    const badge = document.querySelector(`#tab-${category.tabId} .category-badge`);
    if (badge) {
      badge.textContent = `${products.length} Modelos Disponibles`;
    }
  }

  /**
   * Obtiene productos relacionados usando el campo 'related' del JSON
   */
  async function getRelatedProducts(currentSlug, categoryId, limit = 4) {
    const data = await loadProductsData();
    if (!data) return [];

    // Buscar el producto actual para obtener sus relacionados predefinidos
    const currentProduct = data.products.find(p => p.slug === currentSlug || p.id === currentSlug);
    let related = [];

    // Si el producto tiene relacionados predefinidos, usarlos primero
    if (currentProduct && currentProduct.related && currentProduct.related.length > 0) {
      const relatedIds = currentProduct.related;
      related = relatedIds
        .map(id => data.products.find(p => p.id === id || p.slug === id))
        .filter(p => p !== undefined);
    }

    // Si no hay suficientes, agregar de la misma categoria
    if (related.length < limit) {
      const sameCategory = data.products
        .filter(p => p.slug !== currentSlug &&
                     p.id !== currentSlug &&
                     p.category === categoryId &&
                     !related.find(r => r.id === p.id));
      related = [...related, ...sameCategory.slice(0, limit - related.length)];
    }

    // Si aun no hay suficientes, agregar de otras categorias
    if (related.length < limit) {
      const otherProducts = data.products
        .filter(p => p.slug !== currentSlug &&
                     p.id !== currentSlug &&
                     p.category !== categoryId &&
                     !related.find(r => r.id === p.id));
      related = [...related, ...otherProducts.slice(0, limit - related.length)];
    }

    return related.slice(0, limit);
  }

  /**
   * Inicializa la pagina de producto (carga productos relacionados)
   */
  async function initProductPage(currentSlug, categoryId) {
    const relatedContainer = document.getElementById('related-products');

    if (!relatedContainer) return;

    const data = await loadProductsData();
    if (!data) {
      relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No se pudieron cargar los productos relacionados.</p>';
      return;
    }

    // Obtener productos relacionados
    const relatedProducts = await getRelatedProducts(currentSlug, categoryId, 4);

    if (relatedProducts.length === 0) {
      relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No hay productos relacionados disponibles.</p>';
      return;
    }

    // Renderizar productos relacionados
    const relatedHtml = relatedProducts.map(product => renderRelatedProductCard(product, data.categories)).join('');
    relatedContainer.innerHTML = relatedHtml;
  }

  /**
   * Inicializa productos destacados en sidebar de articulos
   */
  async function initFeaturedProducts(limit = 3) {
    const container = document.querySelector('.product-mini-list');
    if (!container) return;

    const data = await loadProductsData();
    if (!data) return;

    // Obtener productos destacados
    const featured = data.products
      .filter(p => p.featured)
      .slice(0, limit);

    if (featured.length === 0) return;

    container.innerHTML = featured.map(p => renderMiniProductCard(p, data.categories)).join('');
  }

  /**
   * Obtiene productos por categoria para widgets
   */
  async function getProductsByCategory(categoryId, limit = 4) {
    const data = await loadProductsData();
    if (!data) return [];

    return filterByCategory(data.products, categoryId)
      .sort((a, b) => a.capacityValue - b.capacityValue)
      .slice(0, limit);
  }

  /**
   * Busca productos por texto
   */
  async function searchProducts(query, limit = 10) {
    const data = await loadProductsData();
    if (!data || !query) return [];

    const queryLower = query.toLowerCase();
    return data.products
      .filter(p =>
        p.title.toLowerCase().includes(queryLower) ||
        p.excerpt.toLowerCase().includes(queryLower) ||
        p.category.toLowerCase().includes(queryLower)
      )
      .slice(0, limit);
  }

  // API publica
  window.ManextCatalog = {
    init: loadProductsData,
    initCatalog: initCatalogPage,
    initProduct: initProductPage,
    initFeatured: initFeaturedProducts,
    getRelated: getRelatedProducts,
    getByCategory: getProductsByCategory,
    search: searchProducts,
    renderCard: renderProductCard,
    renderRelated: renderRelatedProductCard,
    renderMini: renderMiniProductCard,
    getBasePath: getBasePath,
    getProductUrl: getProductUrl,
    getWhatsAppUrl: getWhatsAppUrl
  };

  // Auto-inicializacion segun la pagina
  document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;

    // Detectar pagina de catalogo
    if (path.endsWith('/catalogo.html') || path.endsWith('/catalogo/')) {
      initCatalogPage();
    }

    // Inicializar productos destacados si existe el contenedor
    if (document.querySelector('.product-mini-list')) {
      initFeaturedProducts();
    }

    // Inicializar productos relacionados si existe el contenedor
    const relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
      const slug = relatedContainer.dataset.slug;
      const category = relatedContainer.dataset.category;
      if (slug && category) {
        initProductPage(slug, category);
      }
    }
  });

})();
