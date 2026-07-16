# Auditoría integral del catálogo MANEXT: 276 productos

Fecha: 15 de julio de 2026

Alcance: catálogo, fichas, rutas, datos, SEO técnico, contenido, schema, enlaces internos, seguridad, despliegue y rendimiento estático.
Estado auditado: `main` en `ad24873062159b3973344211b361887c3635077e`.

## Resumen ejecutivo

El catálogo está íntegro y funcional: existen 276 cards, 276 detalles, 276 slugs, URLs y canonicals únicos; todas las fichas están incluidas en el sitemap, tienen contenido suficiente, ocho preguntas frecuentes, schema `Product` y `FAQPage`, y no se detectaron enlaces internos ni imágenes rotas.

La base técnica es reutilizable y evita mantener 276 páginas Astro independientes. Sin embargo, antes de escalar la autoridad SEO conviene corregir cinco áreas:

1. El schema `ItemList` del catálogo no enlaza a las fichas reales: 269 entradas terminan en anclas y siete usan páginas de servicio.
2. El grafo de productos está dividido en 46 componentes aislados de seis páginas; no hay enlaces contextuales entre familias, grupos, artículos, sectores y fichas.
3. `npm audit` reporta diez vulnerabilidades conocidas, cinco altas, principalmente por Astro 6.0.4 y dependencias transitivas. El sitio estático reduce parte de la exposición, pero no elimina el riesgo de compilación ni los avisos XSS.
4. El catálogo entrega las 276 cards en un solo HTML de 1.25 MB y las pagina únicamente en el navegador. Es rastreable, pero no es paginación real ni una arquitectura eficiente de DOM.
5. Las 276 fichas comparten solamente nueve imágenes. Los textos alternativos son únicos, pero el repertorio visual no representa la especificidad de cada variante.

Conclusión: el catálogo puede permanecer publicado, pero debe entrar en una fase de consolidación técnica e interlinking antes de seguir multiplicando variantes.

## Metodología y evidencia

Se verificaron directamente:

- datasets `catalog-products.mjs` y `catalog-product-details.mjs`;
- generación dinámica `/catalogo/[slug]` y template compartido;
- salida compilada de las 276 fichas y del catálogo;
- sitemap, robots, canonicals, titles, descriptions, H1, JSON-LD e imágenes;
- grafo completo de enlaces locales de las fichas y páginas del sitio;
- scripts del catálogo, formulario de WhatsApp y puntos de inyección HTML;
- workflow de despliegue, encabezados de producción y caché de assets;
- `npm audit`, paquetes desactualizados, build, pruebas y chequeo Astro.

No se asignan métricas LCP, INP o CLS: no estuvo disponible un trazado de Chrome DevTools durante esta auditoría. Los datos de rendimiento indicados son medidas estáticas reales de HTML y assets, no estimaciones de Core Web Vitals.

### Verificación del repositorio

- `npm run build`: correcto; 462 páginas generadas.
- `npm test`: correcto; 71 de 71 pruebas aprobadas.
- `npx astro check`: cero errores y cero warnings; 28 hints no bloqueantes preexistentes.
- `git diff --check`: correcto.

## Inventario e integridad

| Control | Resultado |
|---|---:|
| Productos matriz | 46 |
| Variantes derivadas | 230 |
| Fichas totales | 276 |
| IDs, slugs, URLs y canonicals únicos | 276 / 276 |
| Cards sin detalle | 0 |
| Detalles sin card | 0 |
| Enlaces locales rotos desde fichas | 0 |
| Imágenes rotas | 0 |
| Fichas en sitemap | 276 / 276 |
| Fichas con `noindex` | 0 |

Distribución:

| Grupo | Fichas |
|---|---:|
| Extintores portátiles | 90 |
| Equipos industriales | 48 |
| Sistemas automáticos | 30 |
| Accesorios | 60 |
| Refacciones | 48 |

La relación card → `productPageUrl` → detalle es completa. La ruta vigente `/catalogo/[slug]` está correctamente centralizada y `/productos/[...slug]` permanece como capa legacy.

## SEO on-page y contenido

### Controles aprobados

- 276 titles, metas, H1 y palabras clave primarias únicas.
- Titles entre 30 y 59 caracteres; promedio 42.6.
- Metadescripciones entre 129 y 160 caracteres; promedio 152.3.
- Una sola etiqueta H1 por ficha.
- Contenido específico entre 734 y 1,222 palabras; promedio 863.
- Ocho FAQs por ficha y 2,208 preguntas únicas en el conjunto.
- Entre dos y cinco fuentes técnicas por ficha; todas usan HTTPS.
- No se publican precios, inventario, reseñas, ratings ni certificaciones inventadas.
- 276 `Product` y 276 `FAQPage`; ningún `Offer` artificial.

La similitud editorial máxima detectada fue Jaccard 0.683 entre `clase-d-grafito-cobre-grafito-metales` y `clase-d-rodante-grafito`. Está debajo del umbral interno 0.72, pero conviene revisar manualmente ese par en la próxima ronda editorial.

### Límites de resultados enriquecidos

Google exige que un snippet de producto incluya al menos `offers`, `review` o `aggregateRating`. MANEXT no debe inventarlos, por lo que el schema actual es correcto como descripción semántica, pero no habilita por sí solo un rich result de producto. Fuente: [Product snippets de Google](https://developers.google.com/search/docs/appearance/structured-data/product-snippet?hl=es).

El marcado FAQ tampoco debe presentarse como una garantía de visibilidad: Google limita los FAQ rich results principalmente a sitios gubernamentales y de salud con autoridad. Las FAQs siguen siendo valiosas para usuarios, intención de búsqueda y consistencia semántica. Fuente: [Cambios de visibilidad de FAQ y HowTo](https://developers.google.com/search/blog/2023/08/howto-faq-changes).

### Hallazgo: schema del listado incorrecto

`buildCatalogSchema()` consulta `product.detailUrl`, aunque la ruta canónica de producto se encuentra en `product.productPageUrl`. En la salida compilada:

- 269 productos apuntan a `/catalogo/#id`;
- siete productos apuntan a páginas generales de servicio;
- ninguno de esos enlaces del `ItemList` representa de forma consistente la ficha canónica.

La corrección esperada es utilizar `product.productPageUrl` y añadir una prueba que compare cada URL del `ItemList` con la ficha correspondiente. Los canonicals individuales y el sitemap no presentan este error.

## Auditoría de interlinking

### Situación actual

| Métrica | Resultado |
|---|---:|
| Enlaces locales en las fichas | 2,153 |
| Enlaces producto → producto | 1,380 |
| Salidas por ficha | 6–8; promedio 7.8 |
| Entradas desde otras fichas | 5 por producto |
| Huérfanos dentro del grafo de detalle | 0 |
| Componentes fuertemente conectados | 46 |
| Tamaño de cada componente | 6 |
| Enlaces entre familias | 0 |
| Enlaces entre grupos | 0 |
| Fichas enlazadas desde contenido no catálogo | 0 |

La estructura actual enlaza correctamente cada producto matriz con sus cinco variantes. Esto evita huérfanos, pero crea 46 islas SEO. La autoridad no fluye entre agentes, aplicaciones, sectores, accesorios, servicios y guías relacionados.

Los anchors más repetidos —por ejemplo, “Catálogo profesional de extintores” y “Programa de mantenimiento y recarga”— son válidos como navegación general, pero no sustituyen enlaces contextuales específicos.

### Arquitectura profesional recomendada

```text
Inicio / navegación
  └── Catálogo
      ├── 5 hubs de grupo
      │   └── 46 hubs de familia
      │       ├── producto matriz
      │       └── 5 variantes
      ├── sectores y tipos de riesgo
      ├── guías técnicas y normativas
      ├── servicios de instalación/mantenimiento
      └── accesorios y refacciones compatibles
```

Cada ficha debería conservar su familia y añadir enlaces editoriales verificados:

- dos productos de familias relacionadas;
- uno o dos accesorios/refacciones realmente compatibles;
- un sector o aplicación relevante;
- una guía educativa o normativa;
- un servicio relacionado, cuando exista relación comercial real.

La relación no debe inferirse por coincidencia de palabras. Se recomienda añadir campos explícitos al modelo de datos:

```js
relatedProductIds: []
compatibleAccessoryIds: []
sectorLinks: []
guideLinks: []
serviceLinks: []
```

Ejemplos de puentes útiles:

- CO₂ portátil → CO₂ rodante, agente limpio, cuartos eléctricos, mantenimiento.
- PQS ABC portátil → PQS ABC rodante, soporte vehicular, señalización, oficinas y almacenes.
- Clase K → sistema de campana, solución química húmeda, manta ignífuga, restaurantes.
- AVD → guía de baterías de ion-litio, solución para taller, manta de contención, capacitación.
- Clase D → agente específico para el metal, versión rodante, aplicadores compatibles y seguridad industrial.
- Gabinetes → soportes, señalización, alarma y capacidades compatibles.

### Criterios de aceptación del nuevo grafo

- cero destinos rotos y cero fichas huérfanas;
- al menos dos enlaces salientes a otra familia por ficha cuando la relación sea técnicamente válida;
- al menos un enlace entrante desde una guía, sector o servicio para los productos prioritarios;
- hubs de grupo y familia accesibles mediante enlaces `<a href>` rastreables;
- anchors descriptivos, variados y naturales;
- pruebas automatizadas para IDs inexistentes, autorreferencias y relaciones incompatibles;
- reducción de 46 componentes aislados a una red temática conectada o, como mínimo, cinco clústeres de grupo con puentes controlados.

Google recomienda enlaces HTML rastreables y anchors descriptivos en contexto. Fuente: [Prácticas recomendadas para enlaces](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

## Catálogo y paginación

El HTML del catálogo pesa 1,247,993 bytes y contiene las 276 cards. El navegador muestra 12 por página mediante JavaScript, pero los botones no crean páginas HTML independientes. Con JavaScript desactivado se muestran todas las cards y `?pagina=3` no representa un documento paginado diferente en el servidor.

Ventaja: Google puede descubrir todos los enlaces desde el HTML inicial y el sitemap. Desventaja: DOM y transferencia inicial excesivos, estado de paginación dependiente del cliente y ausencia de navegación secuencial mediante `<a href>`.

La solución recomendada es renderizar páginas reales —por ejemplo, `/catalogo/pagina/2/`— o hubs de categoría paginados, con enlaces secuenciales rastreables y canonical propio cuando corresponda. Fuente: [Paginación y carga incremental para ecommerce](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading).

## Medios y experiencia de producto

Las 276 fichas usan nueve imágenes únicas; una sola imagen aparece hasta en 72 productos. Los `alt` son únicos y 264 imágenes usan carga diferida, pero la repetición visual dificulta distinguir agentes, capacidades, montaje y aplicaciones.

Prioridad recomendada:

1. fotografía o render original para las 46 familias matriz;
2. vistas específicas para capacidades y montajes que cambian físicamente;
3. WebP/AVIF con dimensiones declaradas;
4. nombre de archivo descriptivo y `alt` factual;
5. evitar recreaciones que muestren sellos, certificaciones o componentes no verificables.

## Código y mantenibilidad

### Fortalezas

- Un solo template de detalle para 276 rutas.
- Separación clara entre listado y contenido técnico.
- Rutas y claves únicas verificables.
- Uso de `textContent` y `encodeURIComponent` en el formulario de WhatsApp.
- No se detectaron `eval`, `new Function`, credenciales incrustadas ni interpolación de entrada del usuario en `innerHTML` dentro del catálogo.
- Astro escapa el contenido visible por defecto.

### Puntos de endurecimiento

- `SectionHeader.astro` usa `set:html` con contenido editorial interno. Debe mantenerse como dato confiable o sanitizarse si alguna vez proviene de CMS/usuarios.
- Los JSON-LD usan `set:html` con `JSON.stringify` de datos internos. La confianza debe permanecer restringida al repositorio.
- Incorporar una prueba específica para URLs del schema de catálogo.
- Incorporar pruebas de grafo para relaciones cruzadas y anchors.

## Dependencias, CI/CD y seguridad

`npm audit --omit=dev` reportó diez vulnerabilidades: cinco altas, cuatro moderadas y una baja; no hay críticas. Astro 6.0.4 concentra avisos XSS, SSRF y replay de server islands, además de dependencias transitivas como `defu`, `devalue` y Vite.

La salida es estática, por lo que los avisos exclusivos de servidor tienen menor exposición en producción. No obstante, los problemas XSS y de cadena de suministro justifican actualizar Astro dentro de la misma versión mayor.

Acción recomendada:

1. subir Astro de 6.0.4 a 6.4.8 y `@astrojs/sitemap` de 3.7.1 a 3.7.3;
2. ejecutar build, tests, `astro check`, inspección de rutas y QA visual;
3. revisar nuevamente `npm audit`;
4. evaluar Astro 7 después, como migración separada.

En `.github/workflows/deploy.yml`:

- cambiar `npm ci || npm install` por `npm ci` para no ocultar inconsistencias del lockfile;
- fijar `cloudflare/wrangler-action` a un SHA inmutable;
- fijar una versión exacta de Wrangler en vez de `wrangler@3`.

En producción están presentes HSTS, `nosniff` y una política de referrer adecuada. Faltan CSP, `Permissions-Policy` y protección explícita contra framing mediante `frame-ancestors` o `X-Frame-Options`. Deben definirse y probarse sin romper assets, WhatsApp o analytics.

## Plan priorizado

### P0 — Corrección inmediata

1. Corregir las URLs del `ItemList` y añadir prueba de regresión.
2. Actualizar Astro 6.4.8 y sitemap 3.7.3; repetir auditoría de dependencias.

### P1 — Autoridad y arquitectura

3. Crear campos de relaciones tipadas y tests del grafo.
4. Construir hubs de grupo/familia y puentes entre familias.
5. Enlazar fichas prioritarias desde artículos, sectores y servicios relevantes.
6. Sustituir la paginación solo-cliente por navegación paginada o hubs renderizados.

### P1 — Profesionalización visual y seguridad

7. Producir medios originales para las 46 familias matriz.
8. Endurecer workflow y encabezados de seguridad.

### P2 — Mejora editorial continua

9. Revisar el par editorial con mayor similitud.
10. Ampliar fuentes primarias por familia cuando aporten una especificación verificable.
11. Medir LCP, INP y CLS en móvil y escritorio con Chrome DevTools tras implementar paginación y medios.

## Definition of Done para la siguiente fase

- build, pruebas y `astro check` sin errores;
- auditoría de dependencias sin vulnerabilidades altas corregibles;
- 276 URLs correctas en schema, canonicals y sitemap;
- cero roturas en las relaciones tipadas;
- hubs rastreables y grafo sin islas comerciales injustificadas;
- catálogo inicial considerablemente menor a 1.25 MB o documentado con presupuesto aprobado;
- al menos 46 imágenes familiares originales y optimizadas;
- trazado de Core Web Vitals archivado con URL, dispositivo y fecha;
- documentación sincronizada en repo, Graphify y Obsidian.
