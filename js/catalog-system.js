/**
 * MANEXT Catalog System v3.0
 * Sistema de renderizado dinamico de productos con filtros y busqueda
 */

(function() {
  'use strict';

  // Configuracion
  const CONFIG = {
    productsPerPage: 9,
    dataPath: 'data/products.json',
    defaultImage: 'img/img-index/extintor.webp',
    whatsappNumber: '5215539689272'
  };

  // Estado de la aplicacion
  let state = {
    products: [],
    categories: [],
    filteredProducts: [],
    currentCategory: 'all',
    searchQuery: '',
    currentPage: 1
  };

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
    const basePath = getBasePath();
    try {
      const response = await fetch(basePath + CONFIG.dataPath);
      if (!response.ok) throw new Error('Error cargando datos');
      const data = await response.json();
      state.products = data.products || [];
      state.categories = data.categories || [];
      state.filteredProducts = [...state.products];
      return data;
    } catch (error) {
      console.error('Error cargando productos:', error);
      return null;
    }
  }

  /**
   * Obtiene la categoria por ID
   */
  function getCategoryById(categoryId) {
    return state.categories.find(cat => cat.id === categoryId) || null;
  }

  /**
   * Filtra productos por categoria y busqueda
   */
  function filterProducts() {
    let filtered = [...state.products];

    // Filtrar por categoria
    if (state.currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === state.currentCategory);
    }

    // Filtrar por busqueda
    if (state.searchQuery.trim()) {
      const query = state.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
        return p.title.toLowerCase().includes(query) ||
               p.capacity.toLowerCase().includes(query) ||
               p.excerpt.toLowerCase().includes(query) ||
               (p.category && p.category.toLowerCase().includes(query));
      });
    }

    // Ordenar por capacidad
    filtered.sort((a, b) => a.capacityValue - b.capacityValue);

    state.filteredProducts = filtered;
    state.currentPage = 1;
  }

  /**
   * Actualiza los contadores de categorias
   */
  function updateCategoryCounts() {
    const counts = {
      all: state.products.length,
      pqs: 0,
      co2: 0,
      agua: 0,
      tipok: 0,
      espuma: 0,
      limpios: 0
    };

    state.products.forEach(p => {
      switch(p.category) {
        case 'polvo-quimico-seco': counts.pqs++; break;
        case 'co2': counts.co2++; break;
        case 'agua-presion': counts.agua++; break;
        case 'tipo-k': counts.tipok++; break;
        case 'espuma-afff': counts.espuma++; break;
        case 'agentes-limpios': counts.limpios++; break;
      }
    });

    console.log('Product counts:', counts);

    // Actualizar DOM
    const countAll = document.getElementById('count-all');
    const countPqs = document.getElementById('count-pqs');
    const countCo2 = document.getElementById('count-co2');
    const countAgua = document.getElementById('count-agua');
    const countTipok = document.getElementById('count-tipok');
    const countEspuma = document.getElementById('count-espuma');
    const countLimpios = document.getElementById('count-limpios');

    if (countAll) countAll.textContent = counts.all;
    if (countPqs) countPqs.textContent = counts.pqs;
    if (countCo2) countCo2.textContent = counts.co2;
    if (countAgua) countAgua.textContent = counts.agua;
    if (countTipok) countTipok.textContent = counts.tipok;
    if (countEspuma) countEspuma.textContent = counts.espuma;
    if (countLimpios) countLimpios.textContent = counts.limpios;
  }

  /**
   * Genera la URL del producto
   */
  function getProductUrl(product) {
    const category = getCategoryById(product.category);
    const basePath = getBasePath();
    if (category) {
      return basePath + 'productos/' + category.slug + '/' + product.slug + '.html';
    }
    return basePath + 'productos/' + product.slug + '.html';
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
    const message = encodeURIComponent('Hola, quiero cotizar ' + product.title);
    return 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + message;
  }

  /**
   * Genera badges de clases de fuego
   */
  function renderFireClassBadges(fireClasses) {
    return fireClasses.map(function(cls) {
      var classLower = cls.toLowerCase();
      return '<span class="class-badge class-' + classLower + '">Clase ' + cls + '</span>';
    }).join('');
  }

  /**
   * Renderiza una card de producto para el catalogo
   */
  function renderProductCard(product) {
    var category = getCategoryById(product.category);
    var productUrl = getProductUrl(product);
    var imageUrl = getImageUrl(product.image);
    var whatsappUrl = getWhatsAppUrl(product);

    var badgeClass = product.badgeType === 'nom' ? 'nom' :
                     product.badgeType === 'featured' ? 'featured' :
                     product.badgeType === 'premium' ? 'premium' : '';

    var categoryName = category ? category.name : 'General';
    var categoryColor = category ? category.color : '#d32f2f';

    var html = '<article class="product-card">';
    html += '  <a href="' + productUrl + '" class="product-card-image">';
    html += '    <img src="' + imageUrl + '" alt="' + product.title + '" loading="lazy">';
    html += '    <span class="product-category" style="background: ' + categoryColor + '">' + categoryName + '</span>';
    if (product.badge) {
      html += '    <span class="product-badge ' + badgeClass + '">' + product.badge + '</span>';
    }
    html += '  </a>';
    html += '  <div class="product-card-content">';
    html += '    <div class="product-meta">';
    html += '      <span class="product-capacity">' + product.capacity + '</span>';
    html += '      <span class="product-range">' + product.range + '</span>';
    html += '    </div>';
    html += '    <h2 class="product-card-title">';
    html += '      <a href="' + productUrl + '">' + product.title + '</a>';
    html += '    </h2>';
    html += '    <div class="product-classes">';
    html += '      ' + renderFireClassBadges(product.fireClasses);
    html += '    </div>';
    html += '    <p class="product-card-excerpt">' + product.excerpt + '</p>';
    html += '    <div class="product-actions">';
    html += '      <a href="' + whatsappUrl + '" class="btn-cotizar" target="_blank" rel="noopener">';
    html += '        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    html += '        Cotizar';
    html += '      </a>';
    html += '      <a href="' + productUrl + '" class="btn-detalles">';
    html += '        Ver detalles';
    html += '        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
    html += '      </a>';
    html += '    </div>';
    html += '  </div>';
    html += '</article>';

    return html;
  }

  /**
   * Renderiza mensaje de no productos
   */
  function renderNoProducts() {
    return '<div class="no-products">' +
      '<div class="no-products-icon">🔍</div>' +
      '<h3>No se encontraron productos</h3>' +
      '<p>Intenta con otra búsqueda o categoría</p>' +
      '<button type="button" class="clear-filters-btn" onclick="ManextCatalog.clearFilters()">Ver todos los productos</button>' +
      '</div>';
  }

  /**
   * Renderiza controles de paginacion
   */
  function renderPaginationControls(current, total) {
    if (total <= 1) return '';

    var html = '<div class="catalog-pagination">';

    // Anterior
    html += '<button type="button" class="pagination-btn ' + (current === 1 ? 'disabled' : '') + '" data-page="' + (current - 1) + '">';
    html += '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
    html += '    <polyline points="15 18 9 12 15 6"></polyline>';
    html += '  </svg> Anterior';
    html += '</button>';

    // Numeros
    html += '<div class="pagination-numbers">';
    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
        html += '<button type="button" class="pagination-number ' + (i === current ? 'active' : '') + '" data-page="' + i + '">' + i + '</button>';
      } else if (i === current - 2 || i === current + 2) {
        html += '<span class="pagination-ellipsis">...</span>';
      }
    }
    html += '</div>';

    // Siguiente
    html += '<button type="button" class="pagination-btn ' + (current === total ? 'disabled' : '') + '" data-page="' + (current + 1) + '">';
    html += '  Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
    html += '    <polyline points="9 18 15 12 9 6"></polyline>';
    html += '  </svg>';
    html += '</button>';

    html += '</div>';
    return html;
  }

  /**
   * Renderiza los productos en el contenedor
   */
  function renderProducts() {
    var container = document.getElementById('products-container');
    if (!container) return;

    var products = state.filteredProducts;
    var totalPages = Math.ceil(products.length / CONFIG.productsPerPage);
    var currentPage = state.currentPage;

    // Si no hay productos
    if (products.length === 0) {
      container.innerHTML = renderNoProducts();
      updateResultsInfo(0);
      return;
    }

    // Obtener productos de la pagina actual
    var start = (currentPage - 1) * CONFIG.productsPerPage;
    var end = start + CONFIG.productsPerPage;
    var pageProducts = products.slice(start, end);

    // Renderizar productos
    var productsHtml = pageProducts.map(function(product) {
      return renderProductCard(product);
    }).join('');

    // Agregar paginacion
    var paginationHtml = renderPaginationControls(currentPage, totalPages);

    container.innerHTML = productsHtml + paginationHtml;

    // Event listeners para paginacion
    container.querySelectorAll('[data-page]').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('disabled')) return;
        var newPage = parseInt(this.dataset.page);
        if (newPage >= 1 && newPage <= totalPages) {
          state.currentPage = newPage;
          renderProducts();
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    updateResultsInfo(products.length);
  }

  /**
   * Actualiza la info de resultados
   */
  function updateResultsInfo(count) {
    var resultsInfo = document.getElementById('search-results-info');
    var resultsCount = document.getElementById('results-count');

    if (resultsInfo && resultsCount) {
      if (state.currentCategory !== 'all' || state.searchQuery.trim()) {
        resultsInfo.style.display = 'flex';
        resultsCount.textContent = count;
      } else {
        resultsInfo.style.display = 'none';
      }
    }
  }

  /**
   * Configura los filtros de categoria
   */
  function setupCategoryFilters() {
    var filtersContainer = document.getElementById('category-filters');
    if (!filtersContainer) return;

    filtersContainer.addEventListener('click', function(e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      var category = btn.dataset.category;
      state.currentCategory = category;

      // Actualizar UI de botones
      filtersContainer.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Filtrar y renderizar
      filterProducts();
      renderProducts();
    });
  }

  /**
   * Configura el buscador
   */
  function setupSearch() {
    var searchInput = document.getElementById('catalog-search');
    var clearSearchBtn = document.getElementById('clear-search');

    if (!searchInput) return;

    var searchTimeout;

    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      var value = this.value;

      // Mostrar/ocultar boton de limpiar
      if (clearSearchBtn) {
        clearSearchBtn.style.display = value.length > 0 ? 'flex' : 'none';
      }

      // Debounce
      searchTimeout = setTimeout(function() {
        state.searchQuery = value;
        filterProducts();
        renderProducts();
      }, 300);
    });

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        this.style.display = 'none';
        state.searchQuery = '';
        filterProducts();
        renderProducts();
      });
    }
  }

  /**
   * Configura el boton de limpiar filtros
   */
  function setupClearFilters() {
    var clearBtn = document.getElementById('clear-filters');
    if (!clearBtn) return;

    clearBtn.addEventListener('click', function() {
      clearFilters();
    });
  }

  /**
   * Limpia todos los filtros
   */
  function clearFilters() {
    state.currentCategory = 'all';
    state.searchQuery = '';
    state.currentPage = 1;

    // Limpiar input de busqueda
    var searchInput = document.getElementById('catalog-search');
    var clearSearchBtn = document.getElementById('clear-search');
    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.style.display = 'none';

    // Actualizar botones de filtro
    var filtersContainer = document.getElementById('category-filters');
    if (filtersContainer) {
      filtersContainer.querySelectorAll('.filter-btn').forEach(function(b) {
        b.classList.remove('active');
        if (b.dataset.category === 'all') {
          b.classList.add('active');
        }
      });
    }

    filterProducts();
    renderProducts();
  }

  /**
   * Inicializa la pagina del catalogo
   */
  async function initCatalogPage() {
    var productsContainer = document.getElementById('products-container');

    var data = await loadProductsData();
    if (!data) {
      if (productsContainer) {
        productsContainer.innerHTML = '<div class="no-products"><div class="no-products-icon">⚠️</div><h3>Error al cargar</h3><p>Por favor recarga la página</p></div>';
      }
      return;
    }

    // Actualizar contadores
    updateCategoryCounts();

    // Configurar filtros y busqueda
    setupCategoryFilters();
    setupSearch();
    setupClearFilters();

    // Renderizar productos
    renderProducts();
  }

  /**
   * Renderiza una card de producto relacionado (version compacta)
   */
  function renderRelatedProductCard(product) {
    var productUrl = getProductUrl(product);
    var imageUrl = getImageUrl(product.image);

    var html = '<a href="' + productUrl + '" class="related-card">';
    html += '  <div class="related-card-image">';
    html += '    <img src="' + imageUrl + '" alt="' + product.title + '" loading="lazy">';
    html += '  </div>';
    html += '  <div class="related-card-content">';
    html += '    <h3 class="related-card-title">' + product.title + '</h3>';
    html += '    <p class="related-card-capacity">' + product.capacity + ' | ' + product.range + '</p>';
    html += '    <div class="related-card-badges">';
    html += '      ' + renderFireClassBadges(product.fireClasses);
    html += '    </div>';
    html += '    <span class="related-card-link">Ver detalles →</span>';
    html += '  </div>';
    html += '</a>';

    return html;
  }

  /**
   * Obtiene productos relacionados
   */
  async function getRelatedProducts(currentSlug, categoryId, limit) {
    limit = limit || 4;
    if (state.products.length === 0) {
      await loadProductsData();
    }

    // Buscar el producto actual para obtener sus relacionados predefinidos
    var currentProduct = state.products.find(function(p) {
      return p.slug === currentSlug || p.id === currentSlug;
    });
    var related = [];

    // Si el producto tiene relacionados predefinidos, usarlos primero
    if (currentProduct && currentProduct.related && currentProduct.related.length > 0) {
      var relatedIds = currentProduct.related;
      related = relatedIds
        .map(function(id) {
          return state.products.find(function(p) {
            return p.id === id || p.slug === id;
          });
        })
        .filter(function(p) { return p !== undefined; });
    }

    // Si no hay suficientes, agregar de la misma categoria
    if (related.length < limit) {
      var sameCategory = state.products.filter(function(p) {
        return p.slug !== currentSlug &&
               p.id !== currentSlug &&
               p.category === categoryId &&
               !related.find(function(r) { return r.id === p.id; });
      });
      related = related.concat(sameCategory.slice(0, limit - related.length));
    }

    // Si aun no hay suficientes, agregar de otras categorias
    if (related.length < limit) {
      var otherProducts = state.products.filter(function(p) {
        return p.slug !== currentSlug &&
               p.id !== currentSlug &&
               p.category !== categoryId &&
               !related.find(function(r) { return r.id === p.id; });
      });
      related = related.concat(otherProducts.slice(0, limit - related.length));
    }

    return related.slice(0, limit);
  }

  /**
   * Inicializa la pagina de producto (carga productos relacionados)
   */
  async function initProductPage(currentSlug, categoryId) {
    var relatedContainer = document.getElementById('related-products');

    if (!relatedContainer) return;

    if (state.products.length === 0) {
      await loadProductsData();
    }

    // Obtener productos relacionados
    var relatedProducts = await getRelatedProducts(currentSlug, categoryId, 4);

    if (relatedProducts.length === 0) {
      relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No hay productos relacionados disponibles.</p>';
      return;
    }

    // Renderizar productos relacionados
    var relatedHtml = relatedProducts.map(function(product) {
      return renderRelatedProductCard(product);
    }).join('');
    relatedContainer.innerHTML = relatedHtml;
  }

  /**
   * Renderiza una card mini de producto (para sidebar de articulos)
   */
  function renderMiniProductCard(product) {
    var productUrl = getProductUrl(product);
    var imageUrl = getImageUrl(product.image);

    var html = '<a href="' + productUrl + '" class="product-mini-card">';
    html += '  <div class="product-mini-image">';
    html += '    <img src="' + imageUrl + '" alt="' + product.title + '" loading="lazy">';
    html += '  </div>';
    html += '  <div class="product-mini-info">';
    html += '    <span class="product-mini-name">' + product.title + '</span>';
    html += '    <span class="product-mini-capacity">' + product.capacity + '</span>';
    html += '  </div>';
    html += '</a>';

    return html;
  }

  /**
   * Inicializa productos destacados en sidebar de articulos
   */
  async function initFeaturedProducts(limit) {
    limit = limit || 3;
    var container = document.querySelector('.product-mini-list');
    if (!container) return;

    if (state.products.length === 0) {
      await loadProductsData();
    }

    // Obtener productos destacados
    var featured = state.products
      .filter(function(p) { return p.featured; })
      .slice(0, limit);

    if (featured.length === 0) return;

    container.innerHTML = featured.map(function(p) {
      return renderMiniProductCard(p);
    }).join('');
  }

  // API publica
  window.ManextCatalog = {
    init: loadProductsData,
    initCatalog: initCatalogPage,
    initProduct: initProductPage,
    initFeatured: initFeaturedProducts,
    getRelated: getRelatedProducts,
    renderCard: renderProductCard,
    renderRelated: renderRelatedProductCard,
    renderMini: renderMiniProductCard,
    getBasePath: getBasePath,
    getProductUrl: getProductUrl,
    getWhatsAppUrl: getWhatsAppUrl,
    clearFilters: clearFilters,
    getState: function() { return state; }
  };

  // Auto-inicializacion segun la pagina
  document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;

    // Detectar pagina de catalogo
    if (path.endsWith('/catalogo.html') || path.endsWith('/catalogo/') || path === '/catalogo.html') {
      initCatalogPage();
    }

    // Inicializar productos destacados si existe el contenedor
    if (document.querySelector('.product-mini-list')) {
      initFeaturedProducts();
    }

    // Inicializar productos relacionados si existe el contenedor
    var relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
      var slug = relatedContainer.dataset.slug;
      var category = relatedContainer.dataset.category;
      if (slug && category) {
        initProductPage(slug, category);
      }
    }
  });

})();
