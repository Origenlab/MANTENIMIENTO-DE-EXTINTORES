# Estudio de mercado y arquitectura SEO — expansión de 230 productos MANEXT

Fecha de revisión: 2026-07-15
Estado: investigación validada e integrada al catálogo público

## Resultado ejecutivo

El catálogo contiene 46 familias matriz y cinco productos comercialmente distinguibles por cada familia, para un total de 230 variantes y 276 fichas públicas:

| Grupo | Familias | Propuestas |
|---|---:|---:|
| Extintores portátiles | 15 | 75 |
| Móviles e industriales | 8 | 40 |
| Automáticos y aplicación local | 5 | 25 |
| Accesorios y protección | 10 | 50 |
| Refacciones y consumibles | 8 | 40 |
| **Total** | **46** | **230** |

La matriz completa vive en `src/data/catalog-expansion/` y en `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx`. Su publicación se controla mediante `src/data/catalog-expansion/publication.mjs`.

## Qué se encontró en el mercado

Los fabricantes y proveedores especializados organizan su oferta mediante variables que sí cambian la decisión de compra: agente, capacidad, montaje, caudal, sector, compatibilidad y aplicación. Por ello, las propuestas no se limitaron a cambiar una palabra del nombre.

- En portátiles, las variantes relevantes son capacidad y riesgo: PQS ABC/BC, Purple-K, CO₂, agua, water mist, espumas, químico húmedo, agentes limpios, clase D y soluciones ensayadas para baterías.
- En equipos industriales, cambian la capacidad, descarga, carro, presión almacenada u operación por cartucho y el entorno de uso.
- En sistemas automáticos, la ficha sólo es útil si explica cobertura, activación, compatibilidad e integración; no debe presentarse como solución universal.
- En accesorios, material, montaje, resistencia ambiental y dimensiones justifican productos separados.
- En refacciones y consumibles, la compatibilidad con fabricante, modelo, válvula, agente o concentración es el dato comercial decisivo.

## Criterio para aceptar una ficha independiente

Una propuesta se conserva únicamente cuando cumple estas condiciones:

1. Resuelve una necesidad o aplicación reconocible para el comprador.
2. Tiene una variable técnica o comercial verificable.
3. Puede sostener una intención de búsqueda propia.
4. Requiere información, selección o limitaciones específicas.
5. No colisiona con el slug, nombre o tema primario de las 46 fichas actuales.

Esto reduce el riesgo de páginas puerta y de canibalización. La prueba automatizada también exige unicidad de ID, slug, canonical, H1, SEO title y palabra clave primaria, y compara la similitud editorial entre las 26,335 parejas posibles con un umbral Jaccard menor a 0.72.

## Modelo SEO y de conversión

Cada propuesta ya define:

- palabra clave primaria e intención de búsqueda;
- slug, canonical, H1, SEO title y meta description;
- texto específico para el enlace de la card;
- necesidad, propuesta de valor, criterio de selección y limitación;
- producto y variante que debe precargar el formulario de WhatsApp;
- fuentes técnicas, fuentes normativas y fecha de revisión.

La promesa comercial continúa siendo **Cotización personalizada**. No se han inventado precios, descuentos, stock, ratings, certificaciones, garantías ni plazos. Las fichas futuras deben conservar el template aprobado: contenido técnico original, FAQ contextual y formulario de cotización en un único módulo de dos columnas.

## Fuentes primarias consultadas

La matriz registra 24 fuentes técnicas/comerciales primarias y dos fuentes normativas primarias. Las principales son:

- Amerex: catálogo general, CO₂ portátil y rodante, water mist, clase D, clase K y manuales: https://amerex-fire.com/products/fire-extinguishers/
- Badger: equipos rodantes y soportes vehiculares: https://www.badgerfire.com/products/wheeled-stored-pressure
- Ansul R-102: sistemas de supresión para cocinas: https://www.ansul.com/restaurant-systems/r-102-restaurant-fire-suppression-system/r102_restaurant_fire_suppression_system_fsp/r-102-restaurant-fire-suppression-system
- Chemours FE-36: agente limpio: https://www.chemours.com/en/brands-and-products/fire-suppressants/products/fe36
- AVD Fire: equipos para baterías de ion-litio: https://www.avdfire.com/lithium-battery-fire-extinguishers/
- BIOEX y Angus Fire: espumas F3 y AR-AFFF: https://www.bio-ex.com/en/ y https://www.firefightingfoam.com/assets/Uploads/SALES-SHEETS/1x1-AR-AFFF-C6-FX141117A-Rev0219D.pdf
- Kidde, Steel Fire, Guardian, Larsen's, Brady y STI: gabinetes, soportes, señalización, partes y protección.
- NOM-002-STPS-2010 en DOF: https://dof.gob.mx/normasOficiales/4228/stps/stps.htm
- NOM-154-SCFI-2005 en DOF: https://www.dof.gob.mx/normasOficiales/791/NOM-154-SCFI-2005/NOM-154-SCFI-2005.htm

El inventario URL por URL y su cobertura de propuestas está en la hoja **Fuentes** del Excel.

## Riesgos y límites

- Una propuesta validada como concepto no garantiza disponibilidad comercial en México.
- Ratings, listados, capacidades y compatibilidad deben verificarse contra el modelo exacto antes de publicar.
- Clase D y baterías de ion-litio requieren selección por peligro específico; no deben comunicarse como equivalentes.
- La NOM-154 regula mantenimiento, recarga y servicio; no debe utilizarse para atribuir certificaciones inexistentes a un producto.
- Las futuras modificaciones deben mantener la revisión editorial automatizada y humana para evitar thin content.

## Distribución publicada

1. Portátiles: 75 propuestas.
2. Industriales: 40 propuestas.
3. Automáticos: 25 propuestas.
4. Accesorios: 50 propuestas.
5. Refacciones: 40 propuestas.

Cada modificación debe pasar validación técnica y editorial, build, pruebas, QA visual y revisión de enlaces internos antes de entrar a producción. La disponibilidad, el modelo exacto y la documentación se confirman durante la cotización.
