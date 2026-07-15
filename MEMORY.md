# MANEXT — Memoria operativa

Actualizada: 2026-07-15

## Catálogo y fichas de producto

- La plantilla vigente para nuevas fichas vive en `/catalogo/[slug]`, no en la ruta legacy `/productos/[...slug]`.
- La referencia aprobada es `http://localhost:4310/catalogo/extintor-co2-portatil`.
- Fuente de datos: `src/data/catalog-product-details.mjs`.
- Route factory: `src/pages/catalogo/[slug].astro`.
- Template compartido: `src/components/catalog/ProductDetailTemplate.astro`.
- Estilos: `public/css/catalog-product-detail.css`.
- Cotización: `src/components/catalog/QuoteForm.astro` + `public/js/catalog-system.js`.
- Para conectar una card, agregar `productPageUrl` en `src/data/catalog-products.mjs`.
- No crear un archivo Astro individual por producto; agregar un objeto al dataset.
- FAQ y cotización son un solo módulo: FAQ izquierda, WhatsApp derecha; una columna en móvil.
- Toda sección FAQ existente debe publicar al menos 8 preguntas visibles, únicas y contextuales.
- El contenido visible y el schema `FAQPage` deben provenir del mismo arreglo de datos.
- Las 46 fichas del catálogo obtienen sus FAQs desde el perfil editorial compartido; no se editan páginas Astro individuales.
- Comercial: **Cotización personalizada**, sin precios públicos.
- SEO: Product + FAQPage + BreadcrumbList; no inventar Offer, price, rating, brand, stock, certificaciones, garantías, plazos ni resultados regulatorios.
- Normativa: usar fuentes primarias y describir con exactitud el alcance de NOM-002-STPS-2010 y NOM-154-SCFI-2005.
- Movimiento: ninguna animación o transición fuera de botones/CTA.
- URLs internas y canonical sin trailing slash.
- Gate obligatorio: `npm run build`, después `npm test`, después revisión visual desktop y 390 × 844 px.
- Documentación completa: `docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md`.
- Espejo Graphify: `graphify-out/PRODUCT-CATALOG-TEMPLATE.md`.
- Espejo Obsidian: `MANEXT/Productos — Catálogo y Plantilla.md`.

## Próximo producto sugerido

Extintor PQS ABC portátil. Investigar clases A/B/C, capacidades, aplicaciones, limitaciones, normativa y fuentes antes de duplicar conceptualmente el objeto CO₂.
