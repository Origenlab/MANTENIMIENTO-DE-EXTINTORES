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

La expansión de 230 productos ya está investigada y validada como blueprint: cinco propuestas por cada una de las 46 familias públicas. No volver a inventar una lista paralela.

Fuente de datos: `src/data/catalog-expansion/`. Excel maestro: `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx`. Procedimiento: `docs/catalogo/EXPANSION-230-PRODUCTOS.md`. Estudio: `docs/research/2026-07-15-expansion-230-productos-manext.md`.

Las propuestas todavía no se importan en el catálogo público. Deben publicarse en cinco lotes —portátiles, industriales, automáticos, accesorios y refacciones— después de confirmar disponibilidad, modelo, datos técnicos, contenido final, recursos visuales y aprobación.

Cada propuesta ya contiene un objetivo SEO, diferenciación, selección, limitaciones, CTA y fuentes. Mantener IDs, slugs, canonical, H1 y keywords únicos; no rebajar el umbral de originalidad ni publicar contenido generado en masa sin revisión humana.

## Publicación y verificación live

- Cuando Frank indique **“commit y push”**, el resultado esperado no termina en subir una rama: incluye integrar los cambios aprobados en `main`, esperar el workflow de producción y comprobar el dominio live.
- Repositorio: `Origenlab/MANTENIMIENTO-DE-EXTINTORES`; cuenta operativa de GitHub: `Origenlab`.
- Workflow: `.github/workflows/deploy.yml` → **Deploy to Cloudflare Pages** al recibir un push en `main`.
- Antes de publicar: ejecutar `npm run build`, `npm test`, `npx astro check` y `git diff --check`.
- No declarar el sitio live sólo porque el deploy esté verde. Comparar el SHA de `main` con `https://mantenimientodeextintores.mx/build-id.txt`.
- Si el build, los checks, el deploy o la huella del dominio fallan, diagnosticar y corregir; no afirmar que producción quedó actualizada.
- Procedimiento completo: `docs/obsidian/Workflow — Subir Cambios a GitHub.md`.
