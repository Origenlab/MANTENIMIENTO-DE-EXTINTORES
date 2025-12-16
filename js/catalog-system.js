/**
 * MANEXT Catalog System v2.0
 * Sistema de renderizado dinamico de productos desde JSON con paginacion
 * Simplificado: todos los productos en un grid con paginacion (sin tabs ni filtros)
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
  function renderProductCard(product, categories) {
    var category = getCategoryById(categories, product.category);
    var productUrl = getProductUrl(product, categories);
    var imageUrl = getImageUrl(product.image);
    var whatsappUrl = getWhatsAppUrl(product);

    var badgeClass = product.badgeType === 'nom' ? 'nom' :
                     product.badgeType === 'featured' ? 'featured' :
                     product.badgeType === 'premium' ? 'premium' : '';

    var categoryName = category ? category.name : 'General';

    var html = '<article class="product-card">';
    html += '  <a href="' + productUrl + '" class="product-card-image">';
    html += '    <img src="' + imageUrl + '" alt="' + product.title + '" loading="lazy">';
    html += '    <span class="product-category" style="background: ' + (category ? category.color : '#d32f2f') + '">' + categoryName + '</span>';
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
   * Renderiza controles de paginacion
   */
  function renderPaginationControls(current, total) {
    if (total <= 1) return '';

    var html = '<div class="catalog-pagination">';

    // Anterior
    html += '<a href="#" class="pagination-btn ' + (current === 1 ? 'disabled' : '') + '" data-page="' + (current - 1) + '">';
    html += '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
    html += '    <polyline points="15 18 9 12 15 6"></polyline>';
    html += '  </svg> Anterior';
    html += '</a>';

    // Numeros
    html += '<div class="pagination-numbers">';
    for (var i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
        html += '<a href="#" class="pagination-number ' + (i === current ? 'active' : '') + '" data-page="' + i + '">' + i + '</a>';
      } else if (i === current - 2 || i === current + 2) {
        html += '<span class="pagination-ellipsis">...</span>';
      }
    }
    html += '</div>';

    // Siguiente
    html += '<a href="#" class="pagination-btn ' + (current === total ? 'disabled' : '') + '" data-page="' + (current + 1) + '">';
    html += '  Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';
    html += '    <polyline points="9 18 15 12 9 6"></polyline>';
    html += '  </svg>';
    html += '</a>';

    html += '</div>';
    return html;
  }

  /**
   * Sistema de paginacion
   */
  function createPagination(products, container, categories) {
    var totalPages = Math.ceil(products.length / CONFIG.productsPerPage);
    var currentPage = 1;

    function showPage(page) {
      currentPage = page;
      var start = (page - 1) * CONFIG.productsPerPage;
      var end = start + CONFIG.productsPerPage;
      var pageProducts = products.slice(start, end);

      // Renderizar productos
      var productsHtml = pageProducts.map(function(product) {
        return renderProductCard(product, categories);
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
            showPage(newPage);
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    showPage(1);
  }

  /**
   * Inicializa la pagina del catalogo (version simplificada con paginacion)
   */
  async function initCatalogPage() {
    var productsContainer = document.getElementById('products-container');

    var data = await loadProductsData();
    if (!data) {
      if (productsContainer) {
        productsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #666;">Error al cargar los productos. Por favor recarga la página.</p>';
      }
      return;
    }

    // Renderizar todos los productos con paginacion
    if (productsContainer) {
      var allProducts = sortByCapacity(data.products);
      createPagination(allProducts, productsContainer, data.categories);
    }
  }

  /**
   * Renderiza una card de producto relacionado (version compacta)
   */
  function renderRelatedProductCard(product, categories) {
    var category = getCategoryById(categories, product.category);
    var productUrl = getProductUrl(product, categories);
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
   * Obtiene productos relacionados usando el campo 'related' del JSON
   */
  async function getRelatedProducts(currentSlug, categoryId, limit) {
    limit = limit || 4;
    var data = await loadProductsData();
    if (!data) return [];

    // Buscar el producto actual para obtener sus relacionados predefinidos
    var currentProduct = data.products.find(function(p) {
      return p.slug === currentSlug || p.id === currentSlug;
    });
    var related = [];

    // Si el producto tiene relacionados predefinidos, usarlos primero
    if (currentProduct && currentProduct.related && currentProduct.related.length > 0) {
      var relatedIds = currentProduct.related;
      related = relatedIds
        .map(function(id) {
          return data.products.find(function(p) {
            return p.id === id || p.slug === id;
          });
        })
        .filter(function(p) { return p !== undefined; });
    }

    // Si no hay suficientes, agregar de la misma categoria
    if (related.length < limit) {
      var sameCategory = data.products.filter(function(p) {
        return p.slug !== currentSlug &&
               p.id !== currentSlug &&
               p.category === categoryId &&
               !related.find(function(r) { return r.id === p.id; });
      });
      related = related.concat(sameCategory.slice(0, limit - related.length));
    }

    // Si aun no hay suficientes, agregar de otras categorias
    if (related.length < limit) {
      var otherProducts = data.products.filter(function(p) {
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

    var data = await loadProductsData();
    if (!data) {
      relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No se pudieron cargar los productos relacionados.</p>';
      return;
    }

    // Obtener productos relacionados
    var relatedProducts = await getRelatedProducts(currentSlug, categoryId, 4);

    if (relatedProducts.length === 0) {
      relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No hay productos relacionados disponibles.</p>';
      return;
    }

    // Renderizar productos relacionados
    var relatedHtml = relatedProducts.map(function(product) {
      return renderRelatedProductCard(product, data.categories);
    }).join('');
    relatedContainer.innerHTML = relatedHtml;
  }

  /**
   * Renderiza una card mini de producto (para sidebar de articulos)
   */
  function renderMiniProductCard(product, categories) {
    var productUrl = getProductUrl(product, categories);
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

    var data = await loadProductsData();
    if (!data) return;

    // Obtener productos destacados
    var featured = data.products
      .filter(function(p) { return p.featured; })
      .slice(0, limit);

    if (featured.length === 0) return;

    container.innerHTML = featured.map(function(p) {
      return renderMiniProductCard(p, data.categories);
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
    getWhatsAppUrl: getWhatsAppUrl
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
