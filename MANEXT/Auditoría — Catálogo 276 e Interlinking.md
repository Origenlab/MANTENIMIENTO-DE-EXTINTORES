---
proyecto: MANEXT
tipo: auditoria
fecha: 2026-07-15
estado: acciones_requeridas
---

# Auditoría — Catálogo 276 e Interlinking

La auditoría completa vive en `docs/audits/2026-07-15-auditoria-integral-catalogo-276.md` y su espejo de grafo en `graphify-out/CATALOG-AUDIT-276-2026-07-15.md`.

## Resultado ejecutivo

- 276 cards, detalles, slugs, URLs y canonicals únicos.
- Cero fichas huérfanas, enlaces rotos o imágenes rotas.
- Las 276 fichas están en sitemap y son indexables.
- Titles, metas, H1, keywords, FAQs y schemas son únicos.
- El grafo se divide en 46 islas de seis productos; no existe interlinking entre familias ni desde contenido editorial.
- El schema `ItemList` usa URLs incorrectas por consultar `detailUrl` en lugar de `productPageUrl`.
- El catálogo inicial pesa 1.25 MB porque renderiza las 276 cards y las oculta con JS.
- Solo existen nueve imágenes únicas.
- `npm audit` registra diez vulnerabilidades, cinco altas; se recomienda Astro 6.4.8.

## Prioridad de trabajo

1. Corregir schema `ItemList` y prueba de regresión.
2. Actualizar Astro/sitemap y repetir QA.
3. Añadir relaciones tipadas entre familias, accesorios, sectores, guías y servicios.
4. Crear hubs rastreables y enlaces desde contenido no catálogo.
5. Implementar paginación renderizada.
6. Producir imágenes originales para las 46 familias matriz.
7. Endurecer CI/CD y encabezados de seguridad.

## Contrato de interlinking futuro

Usar relaciones explícitas, no inferencias automáticas por keyword:

```js
relatedProductIds: []
compatibleAccessoryIds: []
sectorLinks: []
guideLinks: []
serviceLinks: []
```

Antes de publicar: cero IDs rotos, cero autorreferencias, anchors descriptivos, dos puentes de familia cuando sean válidos y un enlace editorial entrante para cada producto prioritario.

Relacionadas: [[Productos — Catálogo y Plantilla]] · [[Productos — Expansión 230]] · [[Estado del Sitio — Hallazgos y Sprints]]
