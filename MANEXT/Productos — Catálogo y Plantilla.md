---
proyecto: MANEXT
tipo: nota-operativa
estado: vigente
actualizado: 2026-07-15
tags:
  - manext
  - catalogo
  - faq
  - seo
---

# Productos — Catálogo y Plantilla

La fuente canónica es `docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md`. Esta nota conserva el contrato operativo para Obsidian.

## Arquitectura vigente

- Las fichas viven en `/catalogo/[slug]`; `/productos/[...slug]` es legacy.
- Los productos se agregan en `src/data/catalog-product-details.mjs`, sin crear una página Astro individual.
- Las cards se conectan con `productPageUrl` en `src/data/catalog-products.mjs`.
- La referencia visual y técnica es `/catalogo/extintor-co2-portatil`.
- El modelo comercial es **Cotización personalizada** y no publica precios inventados.

## Contrato FAQ global

- Toda sección FAQ existente debe publicar al menos 8 preguntas visibles, únicas y contextuales.
- El contenido visible y el schema `FAQPage` deben provenir del mismo arreglo.
- Las páginas generales consumen `src/data/site-faqs.mjs` y el componente `src/components/FaqList.astro`.
- Las 46 fichas del catálogo obtienen sus FAQs desde el perfil editorial compartido; no se editan páginas Astro individuales.
- FAQ y cotización forman un único módulo de dos columnas y se apilan en móvil cuando la página incluye formulario.
- No se inventan precios, stock, certificaciones, garantías, plazos ni resultados regulatorios.

## Validación obligatoria

1. Ejecutar `npm run build`.
2. Ejecutar `npm test`.
3. Ejecutar `npx astro check`.
4. Revisar escritorio y móvil, incluida la paridad entre preguntas visibles y `FAQPage`.

## Referencias

- [[Reglas del Sistema MANEXT]]
- [[HERO-DESIGN-SYSTEM]]
- `MEMORY.md`
- `graphify-out/PRODUCT-CATALOG-TEMPLATE.md`
