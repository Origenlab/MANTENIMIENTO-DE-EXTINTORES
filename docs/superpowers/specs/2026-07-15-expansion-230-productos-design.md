# Expansión de 230 productos del catálogo MANEXT — Diseño aprobado

**Fecha:** 15 de julio de 2026
**Estado:** aprobado para publicación completa
**Base actual:** 46 familias, 46 cards y 46 fichas activas
**Resultado previsto:** 46 páginas matriz + 230 productos derivados = 276 fichas
**Modelo comercial:** cotización personalizada, sin precios públicos

## 1. Objetivo

Ampliar el catálogo consultivo de MANEXT con cinco productos derivados reales para cada una de las 46 familias actuales. Cada producto nuevo tendrá una card y una ficha propia en `/catalogo/[slug]`, contenido técnico verificable, una intención de búsqueda diferenciada y una cotización contextual por WhatsApp.

La expansión debe aumentar cobertura comercial y orgánica sin convertir capacidades, sectores o palabras clave en páginas repetitivas. Una URL sólo será publicable cuando represente una configuración que un comprador pueda identificar, comparar y cotizar de forma independiente.

## 2. Decisión de arquitectura

Se evaluaron tres modelos:

1. **Cinco capacidades por familia.** Es fácil de producir, pero genera páginas casi idénticas y no funciona bien para accesorios, refacciones o sistemas automáticos.
2. **Cinco aplicaciones por familia.** Cubre búsquedas sectoriales, pero puede crear páginas de entrada artificiales cuando sólo cambia el nombre del sector.
3. **Modelo híbrido.** Combina capacidad, configuración, ambiente, aplicación y especialización según la naturaleza de cada familia.

Se aprueba el **modelo híbrido**. Las 46 fichas existentes permanecen como páginas matriz. Cada matriz enlazará cinco productos derivados; cada derivado enlazará de regreso a su matriz y a otros productos realmente relacionados.

## 3. Alcance cuantificado

| Grupo actual | Familias matriz | Derivados por familia | Fichas nuevas |
|---|---:|---:|---:|
| Extintores portátiles | 15 | 5 | 75 |
| Móviles e industriales | 8 | 5 | 40 |
| Automáticos y aplicación local | 5 | 5 | 25 |
| Accesorios y protección | 10 | 5 | 50 |
| Refacciones y consumibles | 8 | 5 | 40 |
| **Total** | **46** | **5** | **230** |

El catálogo final tendrá 276 fichas si las 230 propuestas superan la validación. Si una propuesta no puede demostrarse como producto real, se reemplazará antes de publicarse; el cupo de cinco no justifica inventar una oferta.

## 4. Qué significa “producto derivado real”

Un derivado debe cumplir todos los criterios siguientes:

- pertenece inequívocamente a una familia matriz existente;
- tiene una diferencia comercial observable: capacidad, construcción, montaje, agente, compatibilidad, aplicación ensayada o entorno de uso;
- puede describirse sin cambiar únicamente el sector o insertar una palabra clave;
- tiene al menos una fuente primaria técnica o normativa y, cuando corresponde, documentación oficial de fabricante;
- no promete marca, modelo, rating, certificación, inventario o tiempo de entrega que MANEXT no haya confirmado;
- presenta una razón concreta para solicitar una cotización independiente;
- incluye limitaciones y condiciones de selección específicas.

No se aceptarán páginas creadas sólo por colonia, alcaldía, sinónimos, plural/singular, cambio cosmético del título o reescritura automática del mismo contenido.

## 5. Ejes de derivación por grupo

### 5.1 Extintores portátiles

Los cinco productos se elegirán entre:

- capacidad de alta intención comercial;
- perfil compacto, estándar o de mayor carga;
- construcción especial documentada;
- agente o formulación diferenciada;
- aplicación técnica que cambie realmente la selección.

Ejemplo conceptual para CO₂:

1. extintor CO₂ de 5 lb para protección localizada;
2. extintor CO₂ de 10 lb para cuartos y tableros eléctricos;
3. extintor CO₂ de 15 lb para aplicaciones técnicas de mayor exposición;
4. extintor CO₂ de 20 lb para instalaciones industriales;
5. configuración especial documentada —por ejemplo, no magnética— sólo si se valida su oferta y alcance.

### 5.2 Móviles e industriales

La diferenciación priorizará capacidad, caudal, sistema de presurización, agente, longitud/configuración de manguera y ambiente industrial. Las páginas no afirmarán cobertura ni desempeño sin el rating del modelo.

### 5.3 Automáticos y aplicación local

Los derivados se separarán por mecanismo de activación, volumen o zona protegida, agente, tipo de equipo y ambiente. Cada ficha declarará que la selección final requiere ingeniería, listado y documentación del sistema.

### 5.4 Accesorios y protección

Los derivados se distinguirán por material, montaje, capacidad compatible, ambiente interior/exterior, nivel de protección y tipo de instalación. No se anunciarán accesorios como universales cuando dependan del cilindro o fabricante.

### 5.5 Refacciones y consumibles

Los derivados se organizarán por función y compatibilidad verificable: tipo de válvula, rango/manómetro, conjunto de descarga, material de sello, configuración móvil o formulación del agente. Todas las fichas incluirán la advertencia de confirmar marca, modelo, rosca, presión y dimensiones aplicables.

## 6. Arquitectura de información

### 6.1 Jerarquía

```text
/catalogo
  └── familia matriz existente
        ├── producto derivado 1
        ├── producto derivado 2
        ├── producto derivado 3
        ├── producto derivado 4
        └── producto derivado 5
```

Las rutas conservarán el sistema vigente `/catalogo/[slug]`. No se crearán archivos Astro individuales ni se reactivará la ruta legacy `/productos/[...slug]`.

### 6.2 URLs

- minúsculas, ASCII y guiones;
- sin trailing slash en enlaces internos y canonical;
- describen el producto, no una frase promocional;
- no incluyen fechas, disponibilidad ni ubicación salvo que la ubicación cambie realmente el producto;
- cada URL se registra antes de redactar para evitar colisiones.

Ejemplo: `/catalogo/extintor-co2-10-lb-tableros-electricos`.

### 6.3 Relaciones

Cada producto nuevo tendrá `parentProductId` y `productPageUrl`. La matriz mantendrá cinco `childProductIds`. El catálogo podrá mostrar la familia, sus derivados o ambos, pero los filtros y la paginación tratarán cada card como un resultado independiente.

## 7. Contrato de la matriz maestra

La investigación se gestionará en un libro de trabajo con una fila por producto derivado y las siguientes columnas obligatorias:

| Bloque | Campos |
|---|---|
| Control | ID, familia matriz, grupo, número 1–5, estado, prioridad, responsable |
| Identidad | nombre comercial, nombre corto, slug, relación padre-hijo |
| Producto | agente/material, clases de fuego, capacidad o variante, construcción, aplicaciones, sectores |
| Diferenciación | necesidad del comprador, diferencia real, propuesta de valor, limitación principal |
| SEO | keyword primaria, intención, H1, title, meta description, anchor de card, URL canonical |
| Conversión | CTA, producto preseleccionado, variante sugerida, datos técnicos solicitados |
| Evidencia | fuente primaria 1, fuente primaria 2, fuente normativa, fecha de revisión, notas |
| Calidad | riesgo de canibalización, similitud con matriz, validación técnica, validación editorial, publicable |

La matriz incluirá resúmenes por grupo, controles de duplicidad y estados editables. No será la fuente de ejecución del sitio: después de aprobarse, sus filas se transformarán explícitamente al contrato de datos de Astro.

## 8. Contrato editorial de cada ficha

Cada ficha derivada debe contener contenido propio en estos bloques:

1. eyebrow con categoría y agente/material;
2. H1 específico;
3. lead orientado a la necesidad real;
4. descripción comercial humanizada;
5. capacidades o variantes aplicables;
6. cuatro beneficios demostrables;
7. ficha técnica sin números no sustentados;
8. guía de selección específica;
9. cuatro aplicaciones recomendadas;
10. al menos cuatro limitaciones o verificaciones;
11. proceso de cotización contextual;
12. cumplimiento normativo con alcance correcto;
13. mínimo ocho preguntas frecuentes con respuestas visibles;
14. SEO único;
15. fuentes técnicas visibles.

La extensión no se medirá por una cuota artificial de palabras. La ficha debe responder qué es, para qué sirve, cuándo conviene, cuándo no conviene, qué se debe confirmar y cómo se cotiza.

## 9. SEO y prevención de canibalización

### 9.1 Intención

La página matriz atenderá búsquedas generales de familia. El derivado atenderá una búsqueda de producto más específica. La keyword del derivado debe cambiar la decisión de compra, no sólo añadir una palabra.

### 9.2 Originalidad

Antes de publicar se compararán, como mínimo:

- H1, title, description y primer párrafo;
- beneficios y aplicaciones;
- especificaciones y limitaciones;
- preguntas frecuentes;
- texto de los enlaces internos.

Una ficha que sólo sustituya capacidad o sector dentro de la misma prosa se marcará como no publicable.

### 9.3 Metadatos

- title recomendado: 50–60 caracteres cuando sea natural;
- meta description: 145–160 caracteres, sin repetir plantillas rígidas;
- un H1;
- canonical autorreferente;
- BreadcrumbList desde el layout;
- Product JSON-LD sin `Offer`, precio, stock, rating, GTIN o marca no confirmados;
- FAQPage sólo cuando preguntas y respuestas sean visibles y coincidan con el JSON-LD;
- enlaces HTML rastreables entre matriz, derivados, categoría y servicios.

El catálogo no dependerá de obtener un resultado enriquecido. Los datos estructurados describen la página; no sustituyen contenido útil ni garantizan una apariencia en resultados.

### 9.4 Controles contra páginas de entrada

No se publicarán grupos de páginas casi iguales creadas para capturar variaciones de una consulta. Google considera problemáticas las páginas de entrada creadas principalmente para buscadores. Por ello, cada derivado debe demostrar una oferta, selección y contenido propios antes de indexarse.

## 10. Fuentes y veracidad técnica

### 10.1 Jerarquía de fuentes

1. Diario Oficial de la Federación, STPS y otras autoridades mexicanas;
2. manuales, fichas, SDS y catálogos oficiales de fabricante;
3. estándares u organismos técnicos reconocidos;
4. distribuidores autorizados para confirmar oferta regional;
5. competidores y marketplaces sólo como señal de surtido o lenguaje de mercado, nunca como única evidencia de seguridad.

### 10.2 Reglas

- cada fila tendrá una URL primaria específica, no sólo la portada del fabricante;
- capacidad nominal no se presentará como rating o cobertura;
- clase D se definirá por metal compatible;
- ion-litio no se presentará automáticamente como clase D;
- formulaciones AFFF, AR-AFFF y F3 no se intercambiarán;
- agentes limpios descontinuados o sujetos a regulación se marcarán para confirmación;
- los accesorios y repuestos se validarán por compatibilidad;
- NOM-154-SCFI-2005 se describirá como norma del servicio de mantenimiento y recarga, no como certificación automática de todo equipo vendido;
- NOM-002-STPS-2010 se utilizará para selección, ubicación, revisión y condiciones de prevención, respetando su campo de aplicación.

### 10.3 Fuentes iniciales de referencia

- NOM-002-STPS-2010: https://dof.gob.mx/normasOficiales/4228/stps/stps.htm
- NOM-154-SCFI-2005: https://www.dof.gob.mx/normasOficiales/791/NOM-154-SCFI-2005/NOM-154-SCFI-2005.htm
- Catálogo oficial Amerex: https://www.amerex-fire.com/upl/downloads/content-blocks/product-catalog-5.pdf
- Manual oficial Amerex para portátiles: https://www.amerex-fire.com/upl/downloads/manuals/english/hand-portable-extinguishers-c621105e.pdf
- Badger, equipos móviles: https://www.badgerfire.com/products/wheeled-stored-pressure
- Google, datos estructurados Product: https://developers.google.com/search/docs/appearance/structured-data/product
- Google, canonicalización: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google, enlaces rastreables: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Google, páginas de entrada: https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages

## 11. Arquitectura técnica propuesta

La implementación conservará la route factory y el template compartido. Para evitar que los datasets actuales crezcan hasta ser inmanejables, la expansión se dividirá por grupo:

```text
src/data/catalog-expansion/
  portables.mjs
  industrial.mjs
  automatic.mjs
  accessories.mjs
  parts.mjs
  index.mjs
```

`index.mjs` exportará cards y detalles derivados con el mismo contrato que consumen `catalog-products.mjs` y `catalog-product-details.mjs`. Las validaciones de integridad comprobarán:

- exactamente cinco hijos por familia;
- 230 IDs y slugs únicos;
- correspondencia entre card y detalle;
- padre existente;
- canonical derivada del slug;
- ocho o más FAQ;
- fuentes presentes;
- ausencia de propiedades comerciales inventadas.

El template visual seguirá siendo `ProductDetailTemplate.astro`. Las diferencias vivirán en datos, no en condicionales por producto.

## 12. Diseño, conversión y rendimiento

- se conserva el layout aprobado de las fichas actuales;
- FAQ y cotización permanecen en un único módulo de dos columnas y se apilan en móvil;
- el formulario precarga producto y variante;
- el CTA principal será una frase específica del producto cuando ayude a la comprensión, sin convertirla en una cadena forzada de keywords;
- no habrá animaciones ni transiciones fuera de botones y CTA;
- las cards conservarán tres columnas en escritorio y paginación;
- todas las imágenes tendrán dimensiones reservadas;
- se reutilizará una imagen de familia sólo cuando represente honestamente el producto; se indicará que es ilustrativa cuando marca o configuración se confirmen en la propuesta;
- no se descargarán ni usarán imágenes de fabricante sin permiso o licencia aplicable;
- el crecimiento del HTML y del sitemap se verificará en cada lote.

## 13. Estrategia de publicación

La generación se hará en cinco lotes revisables:

1. 75 portátiles;
2. 40 móviles e industriales;
3. 25 automáticos y aplicación local;
4. 50 accesorios;
5. 40 refacciones y consumibles.

Cada lote seguirá este flujo:

1. investigación y propuesta en matriz;
2. revisión de nombres, slugs e intención;
3. validación técnica y de fuentes;
4. redacción completa;
5. integración de cards y fichas;
6. pruebas automáticas;
7. revisión visual desktop y móvil;
8. publicación sólo después de aprobación.

No se publicarán 230 páginas en un solo cambio sin revisiones intermedias.

## 14. Pruebas y controles de calidad

### Datos

- conteo: 46 padres, 230 hijos y 276 fichas totales;
- cinco hijos exactos por padre;
- IDs, slugs, URLs y titles únicos;
- ningún hijo sin card, detalle, fuente o padre;
- mínimo ocho FAQ por ficha;
- metadatos dentro de límites razonables y sin truncamientos evidentes.

### Build y HTML

- `npm run build` sin errores;
- `npm test` con cero fallos;
- cada ruta genera `dist/catalogo/<slug>/index.html`;
- canonical, H1, Product, FAQPage y formulario corresponden al producto;
- no existen Offer, price, aggregateRating, stock o certificaciones inventadas.

### Experiencia

- catálogo funcional con JavaScript desactivado para contenido y enlaces;
- cards, filtros y paginación revisados;
- ficha desktop y 390 × 844 px;
- navegación por teclado y foco visible;
- formulario y mensaje de WhatsApp verificados;
- ninguna animación fuera de botones.

### Editorial

- revisión de lenguaje humano y no repetitivo;
- afirmaciones técnicas rastreables a fuentes;
- beneficios y limitaciones específicos;
- intención SEO distinta de su matriz y hermanos;
- enlaces internos descriptivos y naturales.

## 15. Documentación permanente

Al aprobar la matriz y comenzar la implementación se actualizarán:

- `MEMORY.md`;
- `docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md`;
- estudio de mercado en `docs/research/`;
- matriz maestra `.xlsx`;
- plan ejecutable en `docs/superpowers/plans/`;
- espejo de Graphify en `graphify-out/`;
- notas de Obsidian e índice en `docs/obsidian/` y el vault local del proyecto.

La matriz será el registro editorial; los módulos `.mjs` serán la fuente de verdad publicada.

## 16. Fuera de alcance de esta fase

- publicar las 230 fichas antes de aprobar la matriz;
- mostrar precios o comprar en línea;
- prometer disponibilidad o entrega inmediata;
- crear páginas geográficas;
- migrar las rutas legacy;
- rediseñar la plantilla visual aprobada;
- crear un catálogo independiente de hidrantes, bombas, rociadores, detección o equipo de brigadista.

## 17. Definition of Done de la expansión completa

- [ ] Existen 230 propuestas validadas y cinco por cada familia.
- [ ] Todas tienen fuente primaria, diferenciación e intención propia.
- [ ] Las 230 cards enlazan a 230 fichas mediante `/catalogo/[slug]`.
- [ ] Las 46 matrices enlazan a sus cinco derivados.
- [ ] No hay contenido duplicado, páginas de entrada ni claims inventados.
- [ ] Cada ficha mantiene SEO, marketing, FAQ, cotización y limitaciones específicas.
- [ ] La política de movimiento y el diseño MANEXT se conservan.
- [ ] Build, pruebas, revisión visual y verificación del sitio publicado pasan por lote.
- [ ] Memoria, Graphify y Obsidian reflejan la arquitectura final.

## 18. Autorización de publicación completa

El 15 de julio de 2026 el usuario autorizó publicar las 230 propuestas en el catálogo y desplegarlas en producción. Esta autorización sustituye la aprobación separada por lote, pero no elimina los controles técnicos: los cinco grupos se integrarán mediante el mismo adaptador de datos, pasarán pruebas de contrato y se liberarán juntos únicamente cuando el build, la suite completa, el QA visual y la verificación live resulten correctos.

La publicación no convierte las propuestas en inventario confirmado. Todas las fichas conservarán “Cotización personalizada”, disponibilidad sujeta a validación, imagen ilustrativa cuando se reutilice la fotografía de la familia y ausencia de precios, ofertas, ratings, stock o certificaciones no comprobadas.
