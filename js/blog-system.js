/**
 * MANEXT Blog System
 * Sistema de renderizado dinámico de artículos desde JSON
 * Permite automatizar la generación de cards de artículos
 */

(function() {
  'use strict';

  // Configuración
  const CONFIG = {
    articlesPerPage: 6,
    dataPath: 'data/articles.json',
    defaultImage: 'img/img-index/venta-de-extintores.webp'
  };

  // Cache de datos
  let articlesData = null;

  /**
   * Detecta el nivel de profundidad de la página actual
   */
  function getBasePath() {
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;

    if (path.includes('/blog/') && path.split('/').length > 3) {
      return '../../'; // Nivel 2: blog/categoria/articulo.html
    } else if (path.includes('/blog/')) {
      return '../'; // Nivel 1: blog/categoria.html
    }
    return ''; // Nivel 0: blog.html
  }

  /**
   * Carga los datos del JSON
   */
  async function loadArticlesData() {
    if (articlesData) return articlesData;

    const basePath = getBasePath();
    try {
      const response = await fetch(basePath + CONFIG.dataPath);
      if (!response.ok) throw new Error('Error cargando datos');
      articlesData = await response.json();
      return articlesData;
    } catch (error) {
      console.error('Error cargando artículos:', error);
      return null;
    }
  }

  /**
   * Obtiene la categoría por ID
   */
  function getCategoryById(categories, categoryId) {
    return categories.find(cat => cat.id === categoryId) || null;
  }

  /**
   * Filtra artículos por categoría
   */
  function filterByCategory(articles, categoryId) {
    if (!categoryId) return articles;
    return articles.filter(article => article.category === categoryId);
  }

  /**
   * Ordena artículos por fecha (más reciente primero)
   */
  function sortByDate(articles) {
    return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  /**
   * Formatea fecha en español
   */
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
  }

  /**
   * Genera la URL del artículo
   */
  function getArticleUrl(article, categories) {
    const category = getCategoryById(categories, article.category);
    const basePath = getBasePath();
    if (category) {
      return `${basePath}blog/${category.slug}/${article.slug}.html`;
    }
    return `${basePath}blog/${article.slug}.html`;
  }

  /**
   * Genera la URL de la imagen
   */
  function getImageUrl(imagePath) {
    const basePath = getBasePath();
    return basePath + (imagePath || CONFIG.defaultImage);
  }

  /**
   * Renderiza una card de artículo
   */
  function renderArticleCard(article, categories) {
    const category = getCategoryById(categories, article.category);
    const articleUrl = getArticleUrl(article, categories);
    const imageUrl = getImageUrl(article.image);

    return `
      <article class="blog-card" data-date="${article.date}" data-category="${article.category}">
        <a href="${articleUrl}" class="blog-card-image">
          <img src="${imageUrl}" alt="${article.title}" loading="lazy">
          <span class="blog-category" style="background: ${category ? category.color : '#d32f2f'}">${category ? category.name : 'General'}</span>
        </a>
        <div class="blog-card-content">
          <div class="blog-meta">
            <span class="blog-date">${formatDate(article.date)}</span>
            <span class="blog-read-time">${article.readTime || '5 min'} lectura</span>
          </div>
          <h2 class="blog-card-title">
            <a href="${articleUrl}">${article.title}</a>
          </h2>
          <p class="blog-card-excerpt">${article.excerpt}</p>
          <a href="${articleUrl}" class="blog-read-more">
            Leer artículo
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </div>
      </article>
    `;
  }

  /**
   * Renderiza una card de categoría
   */
  function renderCategoryCard(category) {
    const basePath = getBasePath();
    const icons = {
      'shield': '<path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>',
      'fire-extinguisher': '<path d="M8 2h8v2h-8zM7 6h10v14H7z"/><circle cx="12" cy="13" r="2"/>',
      'tools': '<path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>',
      'fire': '<path d="M17.66 11.2C17.43 10.9 17.15 10.64 16.89 10.38C16.22 9.78 15.46 9.35 14.82 8.72C13.33 7.26 13 4.85 13.95 3C13 3.23 12.17 3.75 11.46 4.32C8.87 6.4 7.85 10.07 9.07 13.22C9.11 13.32 9.15 13.42 9.15 13.55C9.15 13.77 9 13.97 8.8 14.05C8.57 14.15 8.33 14.09 8.14 13.93C8.08 13.88 8.04 13.83 8 13.76C6.87 12.33 6.69 10.28 7.45 8.64C5.78 10 4.87 12.3 5 14.47C5.06 14.97 5.12 15.47 5.29 15.97C5.43 16.57 5.7 17.17 6 17.7C7.08 19.43 8.95 20.67 10.96 20.92C13.1 21.19 15.39 20.8 17.03 19.32C18.86 17.66 19.5 15 18.56 12.72L18.43 12.46C18.22 12 17.66 11.2 17.66 11.2z"/>',
      'certificate': '<path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
      'building': '<path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.3l7-3.11v8.8z"/>',
      'alert': '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>',
      'chart': '<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>',
      'factory': '<path d="M22 9L12 2 2 9h9v13h2V9h9z"/>',
      'home': '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>'
    };

    const iconSvg = icons[category.icon] || icons['shield'];

    return `
      <a href="${basePath}blog/${category.slug}.html" class="category-card">
        <div class="category-card-icon" style="background: ${category.gradient}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">${iconSvg}</svg>
        </div>
        <div class="category-card-content">
          <h3>${category.name}</h3>
          <p>${category.description}</p>
          <span class="category-link" style="color: ${category.color}">Ver artículos →</span>
        </div>
      </a>
    `;
  }

  /**
   * Renderiza artículos populares (sidebar)
   */
  function renderPopularPost(article, categories) {
    const articleUrl = getArticleUrl(article, categories);
    const imageUrl = getImageUrl(article.image);

    return `
      <article class="popular-post">
        <a href="${articleUrl}" class="popular-post-image">
          <img src="${imageUrl}" alt="${article.title}" loading="lazy">
        </a>
        <div class="popular-post-content">
          <h4><a href="${articleUrl}">${article.title}</a></h4>
        </div>
      </article>
    `;
  }

  /**
   * Sistema de paginación
   */
  function createPagination(articles, container, renderFn, categories) {
    const totalPages = Math.ceil(articles.length / CONFIG.articlesPerPage);
    let currentPage = 1;

    function showPage(page) {
      currentPage = page;
      const start = (page - 1) * CONFIG.articlesPerPage;
      const end = start + CONFIG.articlesPerPage;
      const pageArticles = articles.slice(start, end);

      // Renderizar artículos
      const articlesHtml = pageArticles.map(article => renderFn(article, categories)).join('');

      // Agregar paginación
      const paginationHtml = renderPaginationControls(currentPage, totalPages);

      container.innerHTML = articlesHtml + paginationHtml;

      // Event listeners para paginación
      container.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          if (this.classList.contains('disabled')) return;
          const newPage = parseInt(this.dataset.page);
          if (newPage >= 1 && newPage <= totalPages) {
            showPage(newPage);
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }

    function renderPaginationControls(current, total) {
      if (total <= 1) return '';

      let html = '<div class="blog-pagination">';

      // Anterior
      html += `<a href="#" class="pagination-btn ${current === 1 ? 'disabled' : ''}" data-page="${current - 1}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg> Anterior
      </a>`;

      // Números
      html += '<div class="pagination-numbers">';
      for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
          html += `<a href="#" class="pagination-number ${i === current ? 'active' : ''}" data-page="${i}">${i}</a>`;
        } else if (i === current - 2 || i === current + 2) {
          html += '<span class="pagination-ellipsis">...</span>';
        }
      }
      html += '</div>';

      // Siguiente
      html += `<a href="#" class="pagination-btn ${current === total ? 'disabled' : ''}" data-page="${current + 1}">
        Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>`;

      html += '</div>';
      return html;
    }

    showPage(1);
  }

  /**
   * Inicializa el blog principal (blog.html)
   */
  async function initBlogMain() {
    const articlesContainer = document.getElementById('articles-container');
    const categoriesContainer = document.getElementById('categories-container');
    const popularContainer = document.getElementById('popular-articles');

    const data = await loadArticlesData();
    if (!data) return;

    // Renderizar categorías
    if (categoriesContainer) {
      const categoriesHtml = data.categories.map(cat => renderCategoryCard(cat)).join('');
      categoriesContainer.innerHTML = categoriesHtml;
    }

    // Renderizar artículos con paginación
    if (articlesContainer) {
      const sortedArticles = sortByDate(data.articles);
      createPagination(sortedArticles, articlesContainer, renderArticleCard, data.categories);
    }

    // Renderizar artículos populares
    if (popularContainer) {
      const featured = data.articles.filter(a => a.featured).slice(0, 3);
      const popularHtml = featured.map(article => renderPopularPost(article, data.categories)).join('');
      popularContainer.innerHTML = popularHtml;
    }
  }

  /**
   * Inicializa página de categoría (blog/categoria.html)
   */
  async function initCategoryPage(categoryId) {
    const articlesContainer = document.getElementById('articles-container');
    const popularContainer = document.getElementById('popular-articles');

    const data = await loadArticlesData();
    if (!data) return;

    // Filtrar artículos por categoría
    const categoryArticles = filterByCategory(data.articles, categoryId);
    const sortedArticles = sortByDate(categoryArticles);

    // Renderizar artículos
    if (articlesContainer) {
      if (sortedArticles.length > 0) {
        createPagination(sortedArticles, articlesContainer, renderArticleCard, data.categories);
      } else {
        articlesContainer.innerHTML = '<p class="no-articles">No hay artículos en esta categoría todavía.</p>';
      }
    }

    // Artículos populares (de otras categorías)
    if (popularContainer) {
      const otherArticles = data.articles.filter(a => a.category !== categoryId && a.featured).slice(0, 3);
      const popularHtml = otherArticles.map(article => renderPopularPost(article, data.categories)).join('');
      popularContainer.innerHTML = popularHtml;
    }

    return data;
  }

  /**
   * Obtiene artículos relacionados
   */
  async function getRelatedArticles(currentSlug, categoryId, limit = 3) {
    const data = await loadArticlesData();
    if (!data) return [];

    return data.articles
      .filter(a => a.slug !== currentSlug && a.category === categoryId)
      .slice(0, limit);
  }

  // API pública
  window.ManextBlog = {
    init: loadArticlesData,
    initMain: initBlogMain,
    initCategory: initCategoryPage,
    getRelated: getRelatedArticles,
    renderCard: renderArticleCard,
    renderPopular: renderPopularPost,
    getBasePath: getBasePath
  };

  // Auto-inicialización según la página
  document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;

    // Detectar tipo de página
    if (path.endsWith('/blog.html') || path.endsWith('/blog/')) {
      initBlogMain();
    }
  });

})();
