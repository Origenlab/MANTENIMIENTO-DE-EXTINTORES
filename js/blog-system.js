(function() {
'use strict';

// ============================================
// BLOG SYSTEM v8.0
// MANEXT - Mantenimiento de Extintores
// ============================================

var BLOG_CONFIG = {
    articlesPerPage: 12,
    dataPath: 'data/articles.json',
    defaultImage: 'img/img-index/venta-de-extintores.avif',
    searchMinLength: 2
};

var articlesData = null;
var currentFilter = null;
var currentSearch = '';
var currentPage = 1;

// ---- UTILITY FUNCTIONS ----

function getBasePath() {
    var path = window.location.pathname;
    if (path.includes('/blog/')) return '../';
    return '';
}

async function loadArticlesData() {
    if (articlesData) return articlesData;
    var basePath = getBasePath();
    try {
        var response = await fetch(basePath + BLOG_CONFIG.dataPath);
        if (!response.ok) throw new Error('Error loading data');
        articlesData = await response.json();
        return articlesData;
    } catch (error) {
        console.error('Error loading articles:', error);
        return null;
    }
}

function getCategoryById(categories, categoryId) {
    return categories.find(function(cat) { return cat.id === categoryId; }) || null;
}

function filterByCategory(articles, categoryId) {
    if (!categoryId) return articles;
    return articles.filter(function(a) { return a.category === categoryId; });
}

function searchArticles(articles, query) {
    if (!query || query.length < BLOG_CONFIG.searchMinLength) return articles;
    var q = query.toLowerCase().trim();
    return articles.filter(function(a) {
        return (a.title && a.title.toLowerCase().includes(q)) ||
               (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
               (a.tags && a.tags.some(function(tag) { return tag.toLowerCase().includes(q); }));
    });
}

function sortByDate(articles) {
    return [].concat(articles).sort(function(a, b) {
        return new Date(b.date || 0) - new Date(a.date || 0);
    });
}

function formatDate(dateString) {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-MX', options);
}

function getArticleUrl(article) {
    var path = window.location.pathname;
    if (path.includes('/blog/')) return article.slug + '.html';
    return 'blog/' + article.slug + '.html';
}

function getImageUrl(imagePath) {
    var basePath = getBasePath();
    return basePath + (imagePath || BLOG_CONFIG.defaultImage);
}

// ---- POST CARD RENDERING (new design matching mesas-de-dulces) ----

function renderPostCard(article, categories) {
    var category = getCategoryById(categories, article.category);
    var articleUrl = getArticleUrl(article);
    var imageUrl = getImageUrl(article.image);
    var bgColor = category ? 'rgba(' + hexToRgb(category.color) + ', 0.1)' : 'rgba(211,47,47,0.1)';
    var textColor = category ? category.color : '#d32f2f';
    var catName = category ? category.name : 'General';

    return '\n' +
'<article class="post-card">\n' +
'    <a href="' + articleUrl + '">\n' +
'        <img src="' + imageUrl + '" alt="' + article.title + '" loading="lazy" width="400" height="250">\n' +
'    </a>\n' +
'    <div class="post-meta">\n' +
'        <span class="read-time">\n' +
'            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>\n' +
'            ' + (article.readTime || '5 min') + '\n' +
'        </span>\n' +
'        <span class="category" style="background: ' + bgColor + '; color: ' + textColor + '">' + catName + '</span>\n' +
'    </div>\n' +
'    <h3><a href="' + articleUrl + '">' + article.title + '</a></h3>\n' +
'    <p>' + article.excerpt + '</p>\n' +
'    <a href="' + articleUrl + '" class="btn-primary">\n' +
'        ' + (article.cta || 'Leer art\u00edculo') + '\n' +
'        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>\n' +
'    </a>\n' +
'</article>';
}

function hexToRgb(hex) {
    if (!hex) return '211,47,47';
    hex = hex.replace('#', '');
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return r + ',' + g + ',' + b;
}

// ---- CATEGORY TAGS RENDERING (in hero) ----

function renderCategoryTags(categories) {
    var html = '<div class="blog-categories">';
    html += '<a href="#" class="category-tag active" data-category="">Todos</a>';
    categories.forEach(function(cat) {
        html += '<a href="#" class="category-tag" data-category="' + cat.id + '">' + cat.name + '</a>';
    });
    html += '</div>';
    return html;
}

// ---- PAGINATION ----

function renderPagination(totalArticles, page, totalPages) {
    if (totalPages <= 1) return '';

    var html = '<div class="pagination">';

    // Previous arrow
    html += '<button class="pagination-arrow' + (page === 1 ? ' disabled' : '') + '" data-page="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>';
    html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>';
    html += '</button>';

    // Page numbers
    html += '<ul class="pagination-list">';
    for (var i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
            html += '<li class="pagination-item"><button class="pagination-link' + (i === page ? ' active' : '') + '" data-page="' + i + '">' + i + '</button></li>';
        } else if (i === page - 2 || i === page + 2) {
            html += '<li class="pagination-item"><span class="pagination-link">...</span></li>';
        }
    }
    html += '</ul>';

    // Next arrow
    html += '<button class="pagination-arrow' + (page === totalPages ? ' disabled' : '') + '" data-page="' + (page + 1) + '"' + (page === totalPages ? ' disabled' : '') + '>';
    html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
    html += '</button>';

    html += '</div>';

    // Info text
    var start = (page - 1) * BLOG_CONFIG.articlesPerPage + 1;
    var end = Math.min(page * BLOG_CONFIG.articlesPerPage, totalArticles);
    html += '<p class="pagination-info">Mostrando ' + start + '-' + end + ' de ' + totalArticles + ' art\u00edculos</p>';

    return html;
}

// ---- MAIN BLOG PAGE ----

function getFilteredArticles(data) {
    var articles = [].concat(data.articles);
    articles = sortByDate(articles);
    if (currentFilter) {
        articles = filterByCategory(articles, currentFilter);
    }
    if (currentSearch) {
        articles = searchArticles(articles, currentSearch);
    }
    return articles;
}

function renderBlogPage(data) {
    var postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;

    var filtered = getFilteredArticles(data);
    var totalPages = Math.ceil(filtered.length / BLOG_CONFIG.articlesPerPage);

    // Clamp current page
    if (currentPage > totalPages) currentPage = totalPages || 1;

    var start = (currentPage - 1) * BLOG_CONFIG.articlesPerPage;
    var pageArticles = filtered.slice(start, start + BLOG_CONFIG.articlesPerPage);

    if (pageArticles.length === 0) {
        postsGrid.innerHTML =
            '<div class="no-articles" style="grid-column: 1/-1;">' +
                '<p>' + (currentSearch ? 'No se encontraron art\u00edculos para "' + currentSearch + '"' : 'No hay art\u00edculos en esta categor\u00eda todav\u00eda.') + '</p>' +
                '<p style="margin-top: 10px;"><a href="#" onclick="window.ManextBlog.resetFilters(); return false;" style="color: #d32f2f; font-weight: 600;">Ver todos los art\u00edculos</a></p>' +
            '</div>';
        return;
    }

    var html = pageArticles.map(function(a) {
        return renderPostCard(a, data.categories);
    }).join('');
    html += '<div style="grid-column: 1/-1;">' + renderPagination(filtered.length, currentPage, totalPages) + '</div>';

    postsGrid.innerHTML = html;

    // Attach pagination events
    postsGrid.querySelectorAll('[data-page]').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var pg = parseInt(this.dataset.page);
            if (pg >= 1 && pg <= totalPages && pg !== currentPage) {
                currentPage = pg;
                renderBlogPage(data);
                var blogContent = document.querySelector('.blog-content');
                if (blogContent) {
                    blogContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Update results info
    var resultsInfo = document.getElementById('results-info');
    if (resultsInfo) {
        if (currentFilter || currentSearch) {
            var cat = currentFilter ? getCategoryById(data.categories, currentFilter) : null;
            var catName = cat ? cat.name : '';
            var text = filtered.length + ' art\u00edculo' + (filtered.length !== 1 ? 's' : '');
            if (catName) text += ' en "' + catName + '"';
            if (currentSearch) text += ' para "' + currentSearch + '"';
            resultsInfo.textContent = text;
            resultsInfo.style.display = 'block';
        } else {
            resultsInfo.style.display = 'none';
        }
    }
}

async function initBlogMain() {
    var data = await loadArticlesData();
    if (!data) {
        var postsGrid = document.getElementById('posts-grid');
        if (postsGrid) postsGrid.innerHTML = '<div class="no-articles" style="grid-column:1/-1;"><p>Error al cargar los art\u00edculos. Por favor recarga la p\u00e1gina.</p></div>';
        return;
    }

    // Render category tags in hero
    var categoriesContainer = document.getElementById('blog-categories');
    if (categoriesContainer) {
        categoriesContainer.innerHTML = renderCategoryTags(data.categories);

        // Category click handlers
        categoriesContainer.querySelectorAll('.category-tag').forEach(function(tag) {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                categoriesContainer.querySelectorAll('.category-tag').forEach(function(t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
                currentFilter = this.dataset.category || null;
                currentPage = 1;
                renderBlogPage(data);
            });
        });
    }

    // Search handler
    var searchInput = document.getElementById('blog-search-input');
    var searchBtn = document.getElementById('blog-search-btn');
    var searchTimeout;

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            var self = this;
            searchTimeout = setTimeout(function() {
                currentSearch = self.value.trim();
                currentPage = 1;
                renderBlogPage(data);
            }, 300);
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                clearTimeout(searchTimeout);
                currentSearch = this.value.trim();
                currentPage = 1;
                renderBlogPage(data);
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (searchInput) {
                currentSearch = searchInput.value.trim();
                currentPage = 1;
                renderBlogPage(data);
            }
        });
    }

    // Initial render
    renderBlogPage(data);
}

// ---- BACKWARD COMPATIBLE: Blog card rendering (for old layout) ----

function renderArticleCard(article, categories) {
    var category = getCategoryById(categories, article.category);
    var articleUrl = getArticleUrl(article);
    var imageUrl = getImageUrl(article.image);
    var featuredAttr = article.featured ? ' data-featured="true"' : '';
    return '\n' +
'<article class="blog-card" data-category="' + article.category + '"' + featuredAttr + '>\n' +
'<a href="' + articleUrl + '" class="blog-card-image">\n' +
'<img src="' + imageUrl + '" alt="' + article.title + '" loading="lazy" width="400" height="250">\n' +
'<span class="blog-category" style="background: ' + (category ? (category.gradient || category.color) : '#d32f2f') + '">' + (category ? category.name : 'General') + '</span>\n' +
'</a>\n' +
'<div class="blog-card-content">\n' +
'<div class="blog-meta">\n' +
'<span class="blog-read-time">' + (article.readTime || '5 min') + ' de lectura</span>\n' +
'</div>\n' +
'<h2 class="blog-card-title">\n' +
'<a href="' + articleUrl + '">' + article.title + '</a>\n' +
'</h2>\n' +
'<p class="blog-card-excerpt">' + article.excerpt + '</p>\n' +
'<a href="' + articleUrl + '" class="blog-read-more">\n' +
(article.cta || 'Leer art\u00edculo completo') + '\n' +
'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">\n' +
'<line x1="5" y1="12" x2="19" y2="12"></line>\n' +
'<polyline points="12 5 19 12 12 19"></polyline>\n' +
'</svg>\n' +
'</a>\n' +
'</div>\n' +
'</article>';
}

function renderCategoryCard(category) {
    var basePath = getBasePath();
    var imageUrl = basePath + (category.image || 'img/img-index/venta-de-extintores.avif');
    var path = window.location.pathname;
    var categoryUrl = path.includes('/blog/') ? (category.slug + '.html') : ('blog/' + category.slug + '.html');
    return '\n' +
'<a href="' + categoryUrl + '" class="category-card">\n' +
'<div class="category-card-image">\n' +
'<img src="' + imageUrl + '" alt="' + category.name + '" loading="lazy" width="400" height="200">\n' +
'<div class="category-card-overlay" style="background: ' + category.gradient + '"></div>\n' +
'</div>\n' +
'<div class="category-card-content">\n' +
'<h3>' + category.name + '</h3>\n' +
'<p>' + category.description + '</p>\n' +
'<span class="category-link" style="color: ' + category.color + '">Ver art\u00edculos \u2192</span>\n' +
'</div>\n' +
'</a>';
}

function renderPopularPost(article, categories) {
    var articleUrl = getArticleUrl(article);
    var imageUrl = getImageUrl(article.image);
    return '\n' +
'<article class="popular-post">\n' +
'<a href="' + articleUrl + '" class="popular-post-image">\n' +
'<img src="' + imageUrl + '" alt="' + article.title + '" loading="lazy">\n' +
'</a>\n' +
'<div class="popular-post-content">\n' +
'<h4><a href="' + articleUrl + '">' + article.title + '</a></h4>\n' +
'</div>\n' +
'</article>';
}

// ---- CATEGORY PAGE ----

async function initCategoryPage(categoryId) {
    var articlesContainer = document.getElementById('articles-container');
    var popularContainer = document.getElementById('popular-articles');
    var data = await loadArticlesData();
    if (!data) return;

    var categoryArticles = filterByCategory(data.articles, categoryId);
    var sortedArticles = sortByDate(categoryArticles);

    if (articlesContainer) {
        if (sortedArticles.length > 0) {
            createPagination(sortedArticles, articlesContainer, renderArticleCard, data.categories);
        } else {
            articlesContainer.innerHTML = '<p class="no-articles">No hay art\u00edculos en esta categor\u00eda todav\u00eda.</p>';
        }
    }

    if (popularContainer) {
        var otherArticles = data.articles.filter(function(a) {
            return a.category !== categoryId && a.featured;
        }).slice(0, 3);
        popularContainer.innerHTML = otherArticles.map(function(a) {
            return renderPopularPost(a, data.categories);
        }).join('');
    }

    return data;
}

// Legacy pagination for old blog-card layout
function createPagination(articles, container, renderFn, categories) {
    var totalPages = Math.ceil(articles.length / 6);
    var page = 1;

    function showPage(p) {
        page = p;
        var start = (p - 1) * 6;
        var pageArticles = articles.slice(start, start + 6);
        var html = pageArticles.map(function(a) {
            return renderFn(a, categories);
        }).join('');

        if (totalPages > 1) {
            html += '<div class="blog-pagination">';
            html += '<a href="#" class="pagination-btn' + (p === 1 ? ' disabled' : '') + '" data-page="' + (p - 1) + '">';
            html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg> Anterior';
            html += '</a>';
            html += '<div class="pagination-numbers">';
            for (var i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= p - 1 && i <= p + 1)) {
                    html += '<a href="#" class="pagination-number' + (i === p ? ' active' : '') + '" data-page="' + i + '">' + i + '</a>';
                } else if (i === p - 2 || i === p + 2) {
                    html += '<span class="pagination-ellipsis">...</span>';
                }
            }
            html += '</div>';
            html += '<a href="#" class="pagination-btn' + (p === totalPages ? ' disabled' : '') + '" data-page="' + (p + 1) + '">';
            html += 'Siguiente <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
            html += '</a>';
            html += '</div>';
        }

        container.innerHTML = html;
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

// ---- ARTICLE PAGE FUNCTIONS ----

async function getRelatedArticles(currentSlug, categoryId, limit) {
    if (typeof limit === 'undefined') limit = 3;
    var data = await loadArticlesData();
    if (!data) return [];

    var currentArticle = data.articles.find(function(a) { return a.slug === currentSlug; });
    var related = [];

    if (currentArticle && currentArticle.related && currentArticle.related.length > 0) {
        related = currentArticle.related
            .map(function(slug) { return data.articles.find(function(a) { return a.slug === slug; }); })
            .filter(function(a) { return a !== undefined; });
    }

    if (related.length < limit) {
        var sameCategory = data.articles.filter(function(a) {
            return a.slug !== currentSlug && a.category === categoryId && !related.find(function(r) { return r.slug === a.slug; });
        });
        related = related.concat(sameCategory.slice(0, limit - related.length));
    }

    if (related.length < limit) {
        var otherArticles = data.articles.filter(function(a) {
            return a.slug !== currentSlug && a.category !== categoryId && !related.find(function(r) { return r.slug === a.slug; });
        });
        related = related.concat(otherArticles.slice(0, limit - related.length));
    }

    return related.slice(0, limit);
}

function renderRelatedCard(article, categories) {
    var category = getCategoryById(categories, article.category);
    var articleUrl = getArticleUrl(article);
    var imageUrl = getImageUrl(article.image);
    return '\n' +
'<a href="' + articleUrl + '" class="related-card">\n' +
'<div class="related-card-image">\n' +
'<img src="' + imageUrl + '" alt="' + article.title + '" loading="lazy">\n' +
'<span class="related-card-category" style="background: ' + (category ? category.color : '#d32f2f') + '">' + (category ? category.name : 'General') + '</span>\n' +
'</div>\n' +
'<div class="related-card-content">\n' +
'<h3 class="related-card-title">' + article.title + '</h3>\n' +
'<p class="related-card-excerpt">' + article.excerpt.substring(0, 100) + '...</p>\n' +
'<div class="related-card-meta">\n' +
'<span>' + (article.readTime || '5 min') + ' lectura</span>\n' +
'</div>\n' +
'</div>\n' +
'</a>';
}

async function initArticlePage(currentSlug, categoryId) {
    var relatedContainer = document.getElementById('related-articles');
    if (!relatedContainer) return;

    var data = await loadArticlesData();
    if (!data) {
        relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No se pudieron cargar los art\u00edculos relacionados.</p>';
        return;
    }

    var relatedArticles = await getRelatedArticles(currentSlug, categoryId, 3);
    if (relatedArticles.length === 0) {
        relatedContainer.innerHTML = '<p style="text-align:center;color:#666;">No hay art\u00edculos relacionados disponibles.</p>';
        return;
    }

    relatedContainer.innerHTML = relatedArticles.map(function(a) {
        return renderRelatedCard(a, data.categories);
    }).join('');
}

function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach(function(item) {
        var question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                item.classList.toggle('active');
            });
        }
    });
}

function initTocScrollSpy() {
    var tocLinks = document.querySelectorAll('.toc-list a, .toc a, .sidebar-toc a');
    var sections = document.querySelectorAll('h2[id], h3[id]');
    if (tocLinks.length === 0 || sections.length === 0) return;

    function updateActiveLink() {
        var current = '';
        sections.forEach(function(section) {
            if (window.pageYOffset >= section.offsetTop - 150) {
                current = section.getAttribute('id');
            }
        });
        tocLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

// ---- RESET FILTERS ----

function resetFilters() {
    currentFilter = null;
    currentSearch = '';
    currentPage = 1;

    var searchInput = document.getElementById('blog-search-input');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.category-tag').forEach(function(t) {
        t.classList.remove('active');
    });
    var allTag = document.querySelector('.category-tag[data-category=""]');
    if (allTag) allTag.classList.add('active');

    loadArticlesData().then(function(data) {
        if (data) renderBlogPage(data);
    });
}

// ---- PUBLIC API ----

window.ManextBlog = {
    init: loadArticlesData,
    initMain: initBlogMain,
    initCategory: initCategoryPage,
    initArticle: initArticlePage,
    initFaq: initFaqAccordion,
    initToc: initTocScrollSpy,
    getRelated: getRelatedArticles,
    renderCard: renderArticleCard,
    renderPostCard: renderPostCard,
    renderRelated: renderRelatedCard,
    renderPopular: renderPopularPost,
    getBasePath: getBasePath,
    formatDate: formatDate,
    resetFilters: resetFilters
};

// ---- AUTO-INIT ----

document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;

    // Blog main page - new design with posts-grid
    if (document.getElementById('posts-grid')) {
        initBlogMain();
    }
    // Legacy blog main page with articles-container
    else if (path.endsWith('/blog/') || path.endsWith('/blog/index.html')) {
        if (document.getElementById('articles-container')) {
            initBlogMain();
        }
    }

    // FAQ accordion
    if (document.querySelector('.faq-item')) {
        initFaqAccordion();
    }

    // TOC scroll spy
    if (document.querySelector('.toc-list') || document.querySelector('.toc') || document.querySelector('.sidebar-toc')) {
        initTocScrollSpy();
    }

    // Related articles (for article pages)
    var relatedContainer = document.getElementById('related-articles');
    if (relatedContainer) {
        var slug = relatedContainer.dataset.slug;
        var category = relatedContainer.dataset.category;
        if (slug && category) {
            initArticlePage(slug, category);
        }
    }
});

})();
