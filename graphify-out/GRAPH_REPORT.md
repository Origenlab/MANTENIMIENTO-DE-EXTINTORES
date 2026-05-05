# Graph Report - /Users/frankoropeza/Desktop/CLIENTES/MANEXT  (2026-04-17)

## Corpus Check
- 7 files · ~114,906 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 61 nodes · 127 edges · 12 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Componentes Astro — Añadidos 2026-05-05

| Nodo | Archivo | Relaciones |
|------|---------|------------|
| `SectionHeader.astro` | `src/components/SectionHeader.astro` | importado por `index.astro` |
| `SectionHeader CSS (.sh)` | `public/css/section-redesign.css` | usado por `SectionHeader.astro` |
| `index.astro` | `src/pages/index.astro` | importa `SectionHeader.astro`, `Hero.astro` |

### SectionHeader.astro — Ficha técnica
- **Props:** `title` (req), `subtitle`, `eyebrow`, `paragraphs[]`
- **Layout sin paragraphs:** `.sh--center` — una columna centrada
- **Layout con paragraphs:** `.sh--split` — grid 1fr 1fr, borde rojo izquierdo, badge rojo subtitle, columna derecha con borde vertical
- **CSS override:** usa `!important` en `.sh__title` para ganar especificidad a `.services h2` y `.extinguishers h2`
- **Aplicado en index.astro:** sección `.services` y sección `.extinguishers`

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]

## God Nodes (most connected - your core abstractions)
1. `renderProducts()` - 9 edges
2. `renderProductCard()` - 7 edges
3. `initCatalogPage()` - 7 edges
4. `loadArticlesData()` - 7 edges
5. `renderBlogPage()` - 7 edges
6. `loadProductsData()` - 6 edges
7. `getProductUrl()` - 6 edges
8. `getImageUrl()` - 6 edges
9. `renderPostCard()` - 6 edges
10. `initCategoryPage()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `initCatalogPage()` --calls--> `loadProductsData()`  [EXTRACTED]
  /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/catalog-system.js → /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/catalog-system.js  _Bridges community 0 → community 1_
- `loadArticlesData()` --calls--> `getBasePath()`  [EXTRACTED]
  /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js → /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js  _Bridges community 3 → community 6_
- `getImageUrl()` --calls--> `getBasePath()`  [EXTRACTED]
  /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js → /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js  _Bridges community 3 → community 2_
- `initBlogMain()` --calls--> `loadArticlesData()`  [EXTRACTED]
  /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js → /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js  _Bridges community 6 → community 5_
- `initCategoryPage()` --calls--> `loadArticlesData()`  [EXTRACTED]
  /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js → /Users/frankoropeza/Desktop/CLIENTES/MANEXT/public/js/blog-system.js  _Bridges community 6 → community 4_

## Communities

### Community 0 - "Community 0"
Cohesion: 0.36
Nodes (13): getBasePath(), getCategoryById(), getImageUrl(), getProductUrl(), getRelatedProducts(), getWhatsAppUrl(), initFeaturedProducts(), initProductPage() (+5 more)

### Community 1 - "Community 1"
Cohesion: 0.27
Nodes (11): clearFilters(), filterProducts(), initCatalogPage(), renderNoProducts(), renderPaginationControls(), renderProducts(), setupCategoryFilters(), setupClearFilters() (+3 more)

### Community 2 - "Community 2"
Cohesion: 0.43
Nodes (8): getArticleUrl(), getCategoryById(), getImageUrl(), hexToRgb(), renderArticleCard(), renderPopularPost(), renderPostCard(), renderRelatedCard()

### Community 3 - "Community 3"
Cohesion: 0.4
Nodes (2): getBasePath(), renderCategoryCard()

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (6): createPagination(), filterByCategory(), getFilteredArticles(), initCategoryPage(), searchArticles(), sortByDate()

### Community 5 - "Community 5"
Cohesion: 0.4
Nodes (5): initBlogMain(), renderBlogPage(), renderCategoryTags(), renderPagination(), resetFilters()

### Community 6 - "Community 6"
Cohesion: 1.0
Nodes (3): getRelatedArticles(), initArticlePage(), loadArticlesData()

### Community 7 - "Community 7"
Cohesion: 1.0
Nodes (0): 

### Community 8 - "Community 8"
Cohesion: 1.0
Nodes (0): 

### Community 9 - "Community 9"
Cohesion: 1.0
Nodes (0): 

### Community 10 - "Community 10"
Cohesion: 1.0
Nodes (0): 

### Community 11 - "Community 11"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **Thin community `Community 7`** (1 nodes): `astro.config.mjs`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 8`** (1 nodes): `webpack.config.prod.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (1 nodes): `webpack.config.dev.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 10`** (1 nodes): `webpack.common.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 11`** (1 nodes): `content.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderProducts()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **Why does `loadArticlesData()` connect `Community 6` to `Community 3`, `Community 4`, `Community 5`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._
- **Why does `renderBlogPage()` connect `Community 5` to `Community 2`, `Community 3`, `Community 4`?**
  _High betweenness centrality (0.004) - this node is a cross-community bridge._