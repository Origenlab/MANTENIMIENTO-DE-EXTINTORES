# Graph Report - /Users/frankoropeza/Desktop/CLIENTES/MANEXT  (2026-04-17)

## Corpus Check
- 7 files · ~114,906 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 61 nodes · 127 edges · 12 communities detected
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Design System MANEXT — Actualizado 2026-05-05

### Niveles de página
- **L1** → `index.astro` — página principal, diseño de referencia ✅
- **L2** → 17 páginas internas — deben homologarse contra L1

---

### Componentes Astro del Design System

| Nodo | Archivo | Relaciones |
|------|---------|------------|
| `SectionHeader.astro` | `src/components/SectionHeader.astro` | importado por todas las L2 |
| `SectionHeader CSS (.sh)` | `public/css/section-redesign.css` | usado por `SectionHeader.astro` |
| `Hero.astro` | `src/components/Hero.astro` | variant="page" en L2, variant="home" en L1 |
| `Layout.astro` | `src/layouts/Layout.astro` | wrapper de todas las páginas |
| `index.astro` | `src/pages/index.astro` | L1 — referencia de diseño |
| `servicios.astro` | `src/pages/servicios.astro` | L2 ✅ primera homologada |

---

### SectionHeader.astro — Ficha técnica
- **Props:** `title` (req), `subtitle`, `eyebrow`, `paragraphs[]`
- **Layout sin paragraphs:** `.sh--center` — una columna centrada
- **Layout con paragraphs:** `.sh--split` — grid 1fr 1fr, borde rojo izquierdo, badge rojo subtitle, columna derecha con borde vertical
- **REGLA L2:** SIEMPRE usar `paragraphs={[...]}` — `.sh--center` NO aceptado en páginas internas
- **Margen:** `clamp(3rem, 5vw, 5rem)` top y bottom
- **CSS override:** usa `!important` en `.sh__title` para ganar especificidad

---

### Pre-footer strip (.pf-strip)
- **CSS:** `public/css/section-redesign.css` — bloque `.pf-strip / .pf-card`
- **Estructura card correcta:** `.pf-card__icon` (SVG 22px) + `.pf-card__body` (`<strong>` + `<span>`) + `.pf-card__arrow`
- **NUNCA:** `pf-card__eyebrow` / `pf-card__title` — clases sin CSS, estructura vieja
- **Última card:** `.pf-card--featured` (fondo rojo, siempre Cotización/Contacto)
- **Grid:** 6 cols desktop → 3 tablet → 2 móvil

---

### FAQ + Cotización unificado (.faq.faq-cotizacion)
- **Patrón:** `<section class="faq faq-cotizacion">` con `SectionHeader` + `faq-cot-layout`
- **Left:** `.faq-cot-left` — 9 items accordion (`.faq-item` > `.faq-question` + `.faq-answer`)
- **Right:** `.faq-cot-right` > `.quote-card` > `form#whatsappForm[NombrePagina].quote-form`
- **ID del form:** único por página (`#whatsappFormServicios`, `#whatsappFormExtintores`, etc.)

---

### Anatomía L2 canónica (orden de secciones)
```
<Layout>
  <Hero variant="page" paragraphs={[...]} />
  [sección principal con SectionHeader + content]
  [secciones secundarias con SectionHeader + content]
  <section class="faq faq-cotizacion">
    <SectionHeader eyebrow="FAQ y Cotización" paragraphs={[...]} />
    <div class="faq-cot-layout">
      <div class="faq-cot-left"> 9 FAQs </div>
      <div class="faq-cot-right"> quote-card form </div>
    </div>
  </section>
  <nav class="pf-strip"> 6 cards </nav>
  <script is:inline> FAQ accordion </script>
  <script is:inline> WhatsApp form </script>
</Layout>
```

---

### Checklist L2 (8 pasos)
1. `import SectionHeader` en frontmatter
2. Trailing slashes — `grep href` y eliminar TODAS en links internos
3. Hero `variant="page"` con `paragraphs` y `services` sin trailing slash
4. `section.services-detail` → SectionHeader + `services-grid` (cards) + SectionHeader separador + módulos `service-detail-item`
5. `section.faq.faq-cotizacion` → SectionHeader + 9 FAQs izq + quote-card form der (ID único por página)
6. `nav.pf-strip` → 6 cards con `pf-card__icon` SVG + `pf-card__body` (NUNCA `pf-card__eyebrow`/`pf-card__title`)
7. Scripts inline — FAQ accordion + WhatsApp form con ID `#whatsappForm[NombrePagina]`
8. Eliminar todo patrón legacy (ver tabla de prohibidos en memory)

---

### Estado de homologación L2 (17 páginas)

| Página | Archivo | Estado |
|--------|---------|--------|
| Servicios | `servicios.astro` | ✅ 2026-05-05 |
| Extintores | `extintores.astro` | ✅ 2026-05-05 |
| Recarga de Extintores | `recarga-de-extintores.astro` | ✅ 2026-05-05 |
| Mantenimiento Preventivo | `mantenimiento-preventivo.astro` | ⏳ |
| Prueba Hidrostática | `prueba-hidrostatica.astro` | ⏳ |
| Capacitación Brigadas | `capacitacion-brigadas.astro` | ⏳ |
| Señalización | `senalizacion.astro` | ⏳ |
| Venta de Extintores | `venta-de-extintores.astro` | ⏳ |
| PQS / Polvo Químico | `polvo-quimico-seco.astro` | ⏳ |
| CO₂ | `co2.astro` | ⏳ |
| Espuma AFFF | `espuma-afff.astro` | ⏳ |
| Tipo K | `tipo-k.astro` | ⏳ |
| Agentes Limpios | `agentes-limpios.astro` | ⏳ |
| Agua a Presión | `agua-presion.astro` | ⏳ |
| Catálogo | `catalogo.astro` | ⏳ |
| Nosotros | `nosotros.astro` | ⏳ |
| Contacto | `contacto.astro` | ⏳ |

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