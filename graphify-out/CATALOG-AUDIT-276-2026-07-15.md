# MANEXT Catalog Graph Audit — 276 fichas

Fuente completa: `docs/audits/2026-07-15-auditoria-integral-catalogo-276.md`.

## Estado del grafo

- 276 nodos de producto: 46 matrices + 230 variantes.
- 1,380 aristas producto → producto.
- Cero enlaces rotos y cero huérfanos internos.
- Cada producto recibe cinco enlaces desde su propia familia.
- 46 componentes fuertemente conectados, todos de seis nodos.
- Cero aristas entre familias y cero entre grupos.
- Cero fichas con enlaces entrantes desde artículos, sectores o servicios fuera del catálogo.

## Diagnóstico

El grafo tiene integridad estructural, pero no distribuye autoridad temática fuera de cada familia. La expansión creó 46 islas correctas pero independientes.

## Modelo objetivo

```text
Catálogo
  -> hub de grupo
    -> hub de familia
      -> matriz + variantes
      -> familias relacionadas
      -> accesorios compatibles
      -> sector / aplicación
      -> guía / norma
      -> servicio
```

Relaciones explícitas recomendadas:

- `relatedProductIds`
- `compatibleAccessoryIds`
- `sectorLinks`
- `guideLinks`
- `serviceLinks`

## Gates automáticos

- cero IDs inexistentes;
- cero autorreferencias;
- cero destinos rotos;
- al menos dos puentes entre familias cuando sean técnicamente válidos;
- un enlace editorial entrante para cada producto comercial prioritario;
- anchors descriptivos y no repetidos mecánicamente;
- reducción de 46 componentes aislados.

## Incidencias relacionadas

- El `ItemList` usa `detailUrl` en vez de `productPageUrl`: 269 URLs terminan en anclas y siete en páginas de servicio.
- La paginación es solo cliente: las 276 cards permanecen en un HTML de 1.25 MB.
- Solo existen nueve imágenes únicas para 276 fichas.
