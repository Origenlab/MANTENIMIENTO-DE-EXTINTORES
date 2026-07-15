# MANEXT — Grafo de expansión del catálogo

## Nodo raíz

`catalogo-expansion-230` representa las 230 variantes públicas vinculadas a 46 familias matriz.

## Relaciones

```text
catalogProducts (276 fichas públicas)
├── catalogMatrixProducts (46 familias)
└── buildPublishedExpansionProducts (230 variantes)
    └── catalogExpansionByParent
    ├── portables.mjs    → 15 familias × 5 = 75
    ├── industrial.mjs   →  8 familias × 5 = 40
    ├── automatic.mjs    →  5 familias × 5 = 25
    ├── accessories.mjs  → 10 familias × 5 = 50
    └── parts.mjs        →  8 familias × 5 = 40
                                  total = 230
```

Cada propuesta enlaza conceptualmente con:

- una familia padre mediante `parentId`;
- un grupo comercial mediante `group`;
- una futura URL mediante `slug` y `canonical`;
- una intención SEO mediante `primaryKeyword`, `searchIntent`, `h1`, `seoTitle` y `metaDescription`;
- el embudo de conversión mediante `cardAnchor`, `quoteProduct` y `quoteVariant`;
- evidencia mediante `primarySources`, `normativeSources` y `sourceReviewedAt`.

## Estado del flujo

```text
research → validated → approved → published
                                      ↑
                       estado vigente del catálogo
```

Las 230 propuestas aprobadas se adaptan mediante `publication.mjs`; el resultado añade perfiles editoriales, fuentes y navegación padre/hermanos sin duplicar páginas Astro.

## Invariantes

- Cinco hijos por cada familia actual.
- IDs, slugs, keywords, H1, SEO titles y canonicals únicos.
- Similitud editorial por debajo de 0.72.
- Al menos una fuente primaria y una limitación explícita.
- Cotización personalizada sin datos comerciales inventados.
- Template `/catalogo/[slug]` compartido.
- Sin movimiento salvo botones y CTA.

## Documentos enlazados

- `docs/catalogo/EXPANSION-230-PRODUCTOS.md`
- `docs/research/2026-07-15-expansion-230-productos-manext.md`
- `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx`
- `tests/catalog-expansion-proposals.test.mjs`
- `tests/catalog-expansion-publication.test.mjs`
