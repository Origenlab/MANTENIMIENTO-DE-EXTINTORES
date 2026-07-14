---
type: "explain"
date: "2026-07-14T23:36:39.498948+00:00"
question: "¿Cómo se crean las nuevas fichas de producto del catálogo MANEXT?"
contributor: "graphify"
outcome: "useful"
source_nodes: ["src_components_catalog_productdetailtemplate", "src_components_catalog_quoteform", "src_data_catalog_product_details_catalogproductdetails"]
---

# Q: ¿Cómo se crean las nuevas fichas de producto del catálogo MANEXT?

## Answer

Usar la ruta estática /catalogo/[slug] y conservar ProductDetailTemplate.astro como plantilla única. Cada producto se añade a src/data/catalog-products.mjs y src/data/catalog-product-details.mjs; debe mantener FAQ y formulario de cotización por WhatsApp en dos columnas, schemas Product y FAQPage sin precios ficticios, cero animaciones salvo transiciones de botones, enlaces internos y pruebas actualizadas. La referencia aprobada es /catalogo/extintor-co2-portatil. Consultar MEMORY.md y docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md antes de editar.

## Outcome

- Signal: useful

## Source Nodes

- src_components_catalog_productdetailtemplate
- src_components_catalog_quoteform
- src_data_catalog_product_details_catalogproductdetails