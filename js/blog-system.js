(function() {'use strict';const CONFIG = {articlesPerPage: 6,dataPath: 'data/articles.json',defaultImage: 'img/img-index/venta-de-extintores.webp'};let articlesData = null;function getBasePath() {const path = window.location.pathname;if (path.includes('/blog/')) {return '../';}return '';}
async function loadArticlesData() {if (articlesData) return articlesData;const basePath = getBasePath();try {const response = await fetch(basePath + CONFIG.dataPath);if (!response.ok) throw new Error('Error cargando datos');articlesData = await response.json();return articlesData;} catch (error) {console.error('Error cargando artículos:', error);return null;}}
function getCategoryById(categories, categoryId) {return categories.find(cat => cat.id === categoryId) || null;}
function filterByCategory(articles, categoryId) {if (!categoryId) return articles;return articles.filter(article => article.category === categoryId);}
function sortByDate(articles) {return [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));}
function formatDate(dateString) {const options = { year: 'numeric', month: 'long', day: 'numeric' };return new Date(dateString).toLocaleDateString('es-MX', options);}
function getArticleUrl(article, categories) {const path = window.location.pathname;if (path.includes('/blog/')) {return `${article.slug}.html`;}return `blog/${article.slug}.html`;}
function getImageUrl(imagePath) {const basePath = getBasePath();return basePath + (imagePath || CONFIG.defaultImage);}
function renderArticleCard(article, categories) {const category = getCategoryById(categories, article.category);const articleUrl = getArticleUrl(article, categories);const imageUrl = getImageUrl(article.image);const featuredAttr = article.featured ? 'data-featured="true"' : '';return `
<article class="blog-card" data-category="${article.category}" ${featuredAttr}>
<a href="${articleUrl}" class="blog-card-image">
<img src="${imageUrl}" alt="${article.title}" loading="lazy" width="400" height="250">
<span class="blog-category" style="background: ${category ? category.gradient || category.color : '#d32f2f'}">${category ? category.name : 'General'}</span>
</a>
<div class="blog-card-content">
<div class="blog-meta">
<span class="blog-read-time">${article.readTime || '5 min'} de lectura</span>
</div>
<h2 class="blog-card-title">
<a href="${articleUrl}">${article.title}</a>
</h2>
<p class="blog-card-excerpt">${article.excerpt}</p>
<a href="${articleUrl}" class="blog-read-more">
${article.cta || 'Leer artículo completo'}
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<line x1="5" y1="12" x2="19" y2="12"></line>
<polyline points="12 5 19 12 12 19"></polyline>
</svg>
</a>
</div>
</article>
`;}
function renderCategoryCard(category) {const basePath = getBasePath();const imageUrl = basePath + (category.image || 'img/img-index/venta-de-extintores.avif');const path = window.location.pathname;const categoryUrl = path.includes('/blog/') ? `${category.slug}.html` : `blog/${category.slug}.html`;return `
<a href="${categoryUrl}" class="category-card">
<div class="category-card-image">
<img src="${imageUrl}" alt="${category.name}" loading="lazy" width="400" height="200">
<div class="category-card-overlay" style="background: ${category.gradient}"></div>
</div>
<div class="category-card-content">
<h3>${category.name}</h3>
<p>${category.description}</p>
<span class="category-link" style="color: ${category.color}">Ver artículos →</span>
</div>
</a>
`;}
function renderPopularPost(article, categories) {const articleUrl = getArticleUrl(article, categories);const imageUrl = getImageUrl(article.image);return `
<article class="popular-post">
<a href="${articleUrl}" class="popular-post-image">
<img src="${imageUrl}" alt="${article.title}" loading="lazy">
</a>
<div class="popular-post-content">
<h4><a href="${articleUrl}">${article.title}</a></h4>
</div>
</article>
`;}
function createPagination(articles, container, renderFn, categories) {const totalPages = Math.ceil(articles.length / CONFIG.articlesPerPage);let currentPage = 1;function showPage(page) {currentPage = page;const start = (page - 1) * CONFIG.articlesPerPage;const end = start + CONFIG.articlesPerPage;const pageArticles = articles.slice(start, end);const articlesHtml = pageArticles.map(article => renderFn(article, categories)).join('');const paginationHtml = renderPaginationControls(currentPage, totalPages);container.innerHTML = articlesHtml + paginationHtml;container.querySelectorAll('[data-page]').forEach(btn => {btn.addEventListener('click', function(e) {e.preventDefault();if (this.classList.contains('disabled')) return;const newPage = parseInt(this.dataset.page);if (newPage >= 1 && newPage <= totalPages) {showPage(newPage);container.scrollIntoView({ behavior: 'smooth', block: 'start' });}});});}
function renderPaginationControls(current, total) {if (total <= 1) return '';let html = '<div class="blog-pagination">';html += `<a href="#" class="pagination-btn ${current === 1 ? 'disabled' : ''}" data-page="${current - 1}">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<polyline points="15 18 9 12 15 6"></polyline>
</svg> Anterior
</a>`;html += '<div class="pagination-numbers">';for (let i = 1; i <= total; i++) {if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {html += `<a href="#" class="pagination-number ${i === current ? 'active' : ''}" data-page="${i}">${i}</a>`;} else if (i === current - 2 || i === current + 2) {html += '<span class="pagination-ellipsis">...</span>';}}
html += '</div>';html += `<a href="#" class="pagination-btn ${current === total ? 'disabled' : ''}" data-page="${current + 1}">
Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
<polyline points="9 18 15 12 9 6"></polyline>
</svg>
</a>`;html += '</div>';return html;}
showPage(1);}
async function initBlogMain() {const articlesContainer = document.getElementById('articles-container');const categoriesContainer = document.getElementById('categories-container');const popularContainer = document.getElementById('popular-articles');const data = await loadArticlesData();if (!data) {if (articlesContainer) articlesContainer.innerHTML = '<p style="text-align:center;color:#666;padding:2rem;">Error al cargar los artículos. Por favor recarga la página.</p>';return;}if (categoriesContainer) {const categoriesHtml = data.categories.map(cat => renderCategoryCard(cat)).join('');categoriesContainer.innerHTML = categoriesHtml;}
if (articlesContainer) {const sortedArticles = sortByDate(data.articles);createPagination(sortedArticles, articlesContainer, renderArticleCard, data.categories);}
if (popularContainer) {const featured = data.articles.filter(a => a.featured).slice(0, 3);const popularHtml = featured.map(article => renderPopularPost(article, data.categories)).join('');popularContainer.innerHTML = popularHtml;}}
async function initCategoryPage(categoryId) {const articlesContainer = document.getElementById('articles-container');const popularContainer = document.getElementById('popular-articles');const data = await loadArticlesData();if (!data) return;const categoryArticles = filterByCategory(data.articles, categoryId);const sortedArticles = sortByDate(categoryArticles);if (articlesContainer) {if (sortedArticles.length > 0) {createPagination(sortedArticles, articlesContainer, renderArticleCard, data.categories);} else {articlesContainer.innerHTML = '<p class="no-articles">No hay artículos en esta categoría todavía.</p>';}}
if (popularContainer) {const otherArticles = data.articles.filter(a => a.category !== categoryId && a.featured).slice(0, 3);const popularHtml = otherArticles.map(article => renderPopularPost(article, data.categories)).join('');popularContainer.innerHTML = popularHtml;}
return data;}
async function getRelatedArticles(currentSlug, categoryId, limit = 3) {const data = await loadArticlesData();if (!data) return [];const currentArticle = data.articles.find(a => a.slug === currentSlug);let related = [];if (currentArticle && currentArticle.related && currentArticle.related.length > 0) {const relatedSlugs = currentArticle.related;related = relatedSlugs.map(slug => data.articles.find(a => a.slug === slug)).filter(a => a !== undefined);}
if (related.length < limit) {const sameCategory = data.articles.filter(a => a.slug !== currentSlug && a.category === categoryId && !related.find(r => r.slug === a.slug));related = [...related, ...sameCategory.slice(0, limit - related.length)];}
if (related.length < limit) {const otherArticles = data.articles.filter(a => a.slug !== currentSlug && a.category !== categoryId && !related.find(r => r.slug === a.slug));related = [...related, ...otherArticles.slice(0, limit - related.length)];}
return related.slice(0, limit);}
function renderRelatedCard(article, categories) {const category = getCategoryById(categories, article.category);const articleUrl = getArticleUrl(article, categories);const imageUrl = getImageUrl(article.image);return `
<a href="${articleUrl}" class="related-card">
<div class="related-card-image">
<img src="${imageUrl}" alt="${article.title}" loading="lazy">
<span class="related-card-category" style="background: ${category ? category.color : '#d32f2f'}">${category ? category.name : 'General'}</span>
</div>
<div class="related-card-content">
<h3 class="related-card-title">${article.title}</h3>
<p class="related-card-excerpt">${article.excerpt.substring(0, 100)}...</p>
<div class="related-card-meta">
<span>${article.readTime || '5 min'} lectura</span>
</div>
</div>
</a>
`;}
async function initArticlePage(currentSlug, categoryId) {const relatedContainer = document.getElementById('related-articles');if (!relatedContainer) return;const data = await loadArticlesData();if (!data) {relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No se pudieron cargar los artículos relacionados.</p>';return;}
const relatedArticles = await getRelatedArticles(currentSlug, categoryId, 3);if (relatedArticles.length === 0) {relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No hay artículos relacionados disponibles.</p>';return;}
const relatedHtml = relatedArticles.map(article => renderRelatedCard(article, data.categories)).join('');relatedContainer.innerHTML = relatedHtml;}
function initFaqAccordion() {const faqItems = document.querySelectorAll('.faq-item');faqItems.forEach(item => {const question = item.querySelector('.faq-question');if (question) {question.addEventListener('click', () => {item.classList.toggle('active');});}});}
function initTocScrollSpy() {const tocLinks = document.querySelectorAll('.toc-list a');const sections = document.querySelectorAll('h2[id], h3[id]');if (tocLinks.length === 0 || sections.length === 0) return;function updateActiveLink() {let current = '';sections.forEach(section => {const sectionTop = section.offsetTop;if (window.pageYOffset >= sectionTop - 150) {current = section.getAttribute('id');}});tocLinks.forEach(link => {link.classList.remove('active');if (link.getAttribute('href') === '#' + current) {link.classList.add('active');}});}
window.addEventListener('scroll', updateActiveLink);updateActiveLink();}
window.ManextBlog = {init: loadArticlesData,initMain: initBlogMain,initCategory: initCategoryPage,initArticle: initArticlePage,initFaq: initFaqAccordion,initToc: initTocScrollSpy,getRelated: getRelatedArticles,renderCard: renderArticleCard,renderRelated: renderRelatedCard,renderPopular: renderPopularPost,getBasePath: getBasePath,formatDate: formatDate};document.addEventListener('DOMContentLoaded', function() {const path = window.location.pathname;if (path.endsWith('/blog/') || path.endsWith('/blog/index.html') || path === '/blog/' || path === '/blog/index.html') {initBlogMain();}
if (document.querySelector('.faq-item')) {initFaqAccordion();}
if (document.querySelector('.toc-list')) {initTocScrollSpy();}
const relatedContainer = document.getElementById('related-articles');if (relatedContainer) {const slug = relatedContainer.dataset.slug;const category = relatedContainer.dataset.category;if (slug && category) {initArticlePage(slug, category);}}});})();
