# Operación de la expansión de 230 productos

Este documento explica cómo convertir el blueprint aprobado en fichas públicas sin perder calidad, SEO ni trazabilidad.

## Estado publicado

- 46 familias matriz permanecen como páginas principales.
- 230 variantes están publicadas desde `src/data/catalog-expansion/`.
- `src/data/catalog-expansion/publication.mjs` adapta propuestas, perfiles editoriales, fuentes y relaciones.
- El catálogo público reúne 276 cards y 276 fichas en `/catalogo/[slug]`.

## Archivos fuente

| Archivo | Alcance |
|---|---|
| `src/data/catalog-expansion/portables.mjs` | 75 propuestas |
| `src/data/catalog-expansion/industrial.mjs` | 40 propuestas |
| `src/data/catalog-expansion/automatic.mjs` | 25 propuestas |
| `src/data/catalog-expansion/accessories.mjs` | 50 propuestas |
| `src/data/catalog-expansion/parts.mjs` | 40 propuestas |
| `src/data/catalog-expansion/schema.mjs` | contrato y validación de datos |
| `src/data/catalog-expansion/publication.mjs` | adaptación pública, perfiles y relaciones familiares |
| `tests/catalog-expansion-proposals.test.mjs` | cobertura, unicidad, SEO, fuentes y originalidad |
| `tests/catalog-expansion-publication.test.mjs` | integración de cards, detalles, fuentes y navegación |

## Flujo para mantener o ampliar un lote

1. Seleccionar las familias del lote según prioridad y demanda.
2. Confirmar con Compras marca, modelo, capacidades y disponibilidad.
3. Validar con el responsable técnico agente, aplicaciones, compatibilidad y limitaciones.
4. Reescribir el blueprint como contenido final humano: resumen, beneficios, tabla técnica, selección, usos, limitaciones y ocho FAQ contextuales.
5. Conseguir imagen o recurso visual autorizado y redactar alt text específico.
6. Crear objetos finales en `src/data/catalog-product-details.mjs`.
7. Crear cards finales en `src/data/catalog-products.mjs` con `productPageUrl`.
8. Revisar canonical, enlazado interno, schema Product/FAQPage/BreadcrumbList y precarga de cotización.
9. Ejecutar `npm run build`, después `npm test`, después QA visual desktop y móvil.
10. Publicar únicamente cuando el cambio completo esté aprobado.

## Reglas que no se negocian

- Ruta vigente: `/catalogo/[slug]`.
- No crear una página Astro individual por producto.
- Cotización personalizada; no inventar precios, ofertas, ratings, stock o certificaciones.
- FAQ y cotización permanecen en un módulo de dos columnas y se apilan en móvil.
- Mínimo ocho preguntas visibles, originales y coherentes con el schema.
- Sin animaciones ni transiciones fuera de botones y CTA.
- Fuentes primarias para afirmaciones técnicas y normativas.
- No añadir una variante sólo porque pueda generarse; debe conservar diferenciación y evidencia.

## Gate de aceptación por producto

- [ ] Producto y variante pueden cotizarse sujetos a validación técnica y disponibilidad.
- [ ] Fuente primaria asociada al modelo o a la categoría exacta.
- [ ] Aplicación y limitaciones revisadas técnicamente.
- [ ] Slug, keyword, H1, title, meta y canonical sin colisiones.
- [ ] Contenido sustancial y diferente a la familia padre y a sus hermanos.
- [ ] Card con enlace descriptivo, no genérico.
- [ ] Formulario precarga producto y variante correctos.
- [ ] Ocho FAQ contextuales visibles y en schema.
- [ ] Imagen autorizada, dimensiones optimizadas y alt específico.
- [ ] Build, tests y revisión visual aprobados.

## Comandos de control

```bash
node --test tests/catalog-expansion-proposals.test.mjs
npm run build
npm test
git diff --check
```

## Referencias

- Diseño aprobado: `docs/superpowers/specs/2026-07-15-expansion-230-productos-design.md`
- Plan ejecutado: `docs/superpowers/plans/2026-07-15-matriz-expansion-230-productos.md`
- Estudio: `docs/research/2026-07-15-expansion-230-productos-manext.md`
- Excel: `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx`
- Template vigente: `docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md`
