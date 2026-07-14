# Diseño aprobado para el nuevo catálogo de extintores MANEXT

**Fecha:** 14 de julio de 2026
**Estado:** diseño funcional propuesto para aprobación final
**Base aprobada:** arquitectura híbrida por producto, clase de fuego, aplicación y sector
**Conversión principal:** Solicitar cotización, sin precios públicos

## 1. Objetivo del diseño

Construir una sección de catálogo que parezca parte natural del sitio MANEXT, cubra el mercado profesional de extintores y convierta visitas en cotizaciones calificadas. Debe funcionar para dos públicos:

1. compradores que conocen el agente o la capacidad que necesitan;
2. responsables de seguridad, compras o administración que sólo conocen el riesgo de su instalación.

El catálogo no funcionará como tienda de autoservicio. Su papel es facilitar la selección y conducir a una cotización técnica con suministro, instalación, documentación y servicio posterior.

## 2. Principios

- **Precisión antes que volumen:** publicar familias y variantes verificables, no inventario ficticio.
- **Una ficha canónica por familia:** las capacidades se manejan como variantes cuando la intención es la misma.
- **HTML primero:** contenido, enlaces y tarjetas quedan renderizados por Astro; JavaScript mejora filtros y búsqueda, pero no es requisito para ver los productos.
- **Cotización contextual:** el producto, capacidad y aplicación elegidos llegan preseleccionados al formulario o mensaje.
- **Diseño MANEXT:** negro técnico, blanco, grises cálidos y rojo de marca; tipografía y componentes compatibles con el sitio.
- **Accesibilidad:** navegación por teclado, estados de foco visibles, controles nativos y contraste AA.
- **SEO útil:** categorías, familias, aplicaciones y sectores se conectan mediante enlaces rastreables.

## 3. Arquitectura de información

### Portada `/catalogo/`

- resumen y propuesta de valor;
- accesos por tipo de producto;
- accesos por sector o aplicación;
- buscador y filtros;
- catálogo completo de familias;
- paquetes recomendados;
- guía de clases de fuego;
- formulario de cotización;
- preguntas frecuentes.

### Grupos principales

1. Extintores portátiles
2. Extintores móviles e industriales
3. Extintores automáticos y aplicación local
4. Accesorios y protección física
5. Refacciones y consumibles
6. Paquetes por sector

### Familias portátiles

- PQS ABC
- PQS BC
- Purple-K
- CO₂
- agua a presión
- agua nebulizada
- espuma AFFF
- espuma AR-AFFF
- espuma sin flúor, bajo validación
- químico húmedo tipo K
- HFC-236fa
- Halotron y alternativas vigentes
- clase D por tipo de metal
- aplicaciones ensayadas para baterías de ion-litio

### Rutas futuras y canónicas

- `/catalogo/` — portada y explorador general
- `/catalogo/extintores-portatiles/`
- `/catalogo/extintores-industriales/`
- `/catalogo/extintores-automaticos/`
- `/catalogo/accesorios/`
- `/catalogo/refacciones/`
- `/catalogo/paquetes/`
- `/productos/[slug]/` — ficha canónica de la familia o variante cuando exista contenido suficiente

La primera entrega puede publicar la portada completa y conservar las fichas existentes. La migración de fichas se hará sin romper URLs indexadas.

## 4. Estructura visual de la portada

```text
┌──────────────────────────────────────────────────────────────┐
│ HERO OSCURO                                                  │
│ Catálogo profesional de extintores                           │
│ Selección técnica + suministro + instalación                 │
│ [Explorar catálogo] [Solicitar cotización]                   │
│ 80+ años · CDMX/Edomex · Atención empresarial                │
├──────────────────────────────────────────────────────────────┤
│ ¿CÓMO QUIERES BUSCAR?                                        │
│ [Por extintor] [Por clase] [Por sector] [Accesorios]         │
├──────────────────────────────────────────────────────────────┤
│ BUSCADOR + FILTROS STICKY                                    │
│ Buscar... | Tipo | Agente | Clase | Aplicación | Estado      │
├──────────────────────────────────────────────────────────────┤
│ 32 familias encontradas                         [Limpiar]     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐                        │
│ │ Producto │ │ Producto │ │ Producto │                        │
│ │ clases   │ │ clases   │ │ clases   │                        │
│ │ variantes│ │ variantes│ │ variantes│                        │
│ │ [Cotizar]│ │ [Cotizar]│ │ [Cotizar]│                        │
│ └──────────┘ └──────────┘ └──────────┘                        │
├──────────────────────────────────────────────────────────────┤
│ PAQUETES POR SECTOR                                          │
│ Oficina · Restaurante · Data center · Bodega · Flotilla      │
├──────────────────────────────────────────────────────────────┤
│ GUÍA DE SELECCIÓN / CLASES A B C D K                         │
├──────────────────────────────────────────────────────────────┤
│ COTIZACIÓN CONTEXTUAL                                        │
│ Producto · cantidad · sector · ubicación · contacto          │
├──────────────────────────────────────────────────────────────┤
│ FAQ + enlaces a mantenimiento, recarga y señalización        │
└──────────────────────────────────────────────────────────────┘
```

## 5. Sistema visual

### Paleta

- carbón principal: `#111111`;
- negro de superficie: `#181818`;
- rojo MANEXT: `#D32F2F`;
- rojo de interacción: `#E23A3A`;
- fondo cálido: `#F6F5F2`;
- superficie blanca: `#FFFFFF`;
- texto principal: `#202020`;
- texto secundario: `#676767`;
- borde: `#DDDBD6`;
- WhatsApp sólo como canal secundario: `#25D366`.

### Tipografía

Se conserva la pila tipográfica actual de Segoe UI para mantener homologación y rendimiento. La jerarquía se mejora con:

- títulos compactos y pesados;
- etiquetas en mayúsculas pequeñas;
- números y capacidades con alineación consistente;
- cuerpos de 16–18 px con líneas cortas.

### Estilo

- hero oscuro asimétrico;
- superficies planas con bordes precisos;
- tarjetas con sombra mínima y elevación sólo al interactuar;
- esquinas de 10–14 px, no excesivamente redondeadas;
- iconografía SVG lineal, sin emojis;
- rojo reservado para acciones, estados y navegación activa;
- fotografías de producto sobre fondos neutros, sin deformación.

## 6. Componentes

### Hero del catálogo

**H1:** Catálogo profesional de extintores y equipos relacionados
**Subtítulo:** Equipos portátiles, industriales y especializados para cada clase de riesgo
**Descripción:** Selección técnica, suministro, instalación y documentación para empresas en CDMX y área metropolitana.
**CTA principal:** Explorar catálogo
**CTA secundario:** Solicitar cotización

No se afirmará que todos los productos están certificados por NOM-154 ni que todo está en inventario.

### Navegador de intención

Cuatro tarjetas compactas:

- Sé qué extintor necesito
- Quiero buscar por clase de fuego
- Necesito una solución para mi sector
- Busco accesorios o refacciones

### Barra de búsqueda y filtros

Controles:

- búsqueda por nombre, agente, capacidad, aplicación o sector;
- grupo de producto;
- agente;
- clase A/B/C/D/K;
- aplicación;
- estado comercial;
- limpiar filtros.

En escritorio será sticky debajo del encabezado. En móvil se compactará y abrirá un panel accesible. Los filtros actualizarán el conteo y la URL mediante parámetros opcionales, sin generar páginas indexables duplicadas.

### Tarjeta de familia

Orden de información:

1. imagen;
2. estado comercial;
3. familia/agente;
4. nombre;
5. clases de fuego;
6. capacidades disponibles;
7. dos aplicaciones principales;
8. enlace de información;
9. botón Solicitar cotización.

No incluirá precio. El CTA transportará `product`, `variant` y `source=catalog` al formulario.

### Estados comerciales

- Entrega rápida
- Bajo pedido
- Proyecto especial
- Validación técnica requerida

Los estados no usarán únicamente color; también tendrán texto e icono.

### Paquete por sector

Tarjeta horizontal con:

- sector;
- riesgo principal;
- combinación sugerida;
- servicios incluidos;
- CTA Cotizar solución.

El texto aclarará que la selección final depende del levantamiento y la normativa aplicable.

### Formulario de cotización

Campos visibles:

- producto/familia;
- capacidad o variante;
- cantidad;
- sector o tipo de inmueble;
- alcaldía/municipio y código postal;
- necesidad de instalación, señalización, mantenimiento o capacitación;
- nombre;
- empresa;
- teléfono/WhatsApp;
- correo;
- detalle del riesgo;
- aviso de privacidad.

Acción inicial: construir mensaje estructurado y abrir WhatsApp, manteniendo un enlace telefónico alternativo. El diseño dejará preparada la integración futura con CRM o endpoint de correo.

Para clase D, ion-litio, industrial o automático se mostrarán preguntas técnicas adicionales.

## 7. Ficha de producto

La ficha canónica tendrá:

- breadcrumb;
- imagen y galería;
- agente, clases, estado y presentación;
- selector de capacidad;
- CTA de cotización persistente;
- aplicaciones y sectores;
- tabla técnica verificable;
- ventajas y limitaciones;
- documentación/listados disponibles;
- complementos compatibles;
- mantenimiento y recarga;
- productos relacionados;
- preguntas frecuentes específicas.

Los datos desconocidos no se rellenarán con texto genérico. Se mostrarán únicamente cuando estén respaldados por ficha de proveedor.

## 8. Modelo de datos

Cada familia requerirá:

```ts
{
  id,
  slug,
  name,
  shortName,
  group,
  agent,
  fireClasses,
  variants,
  applications,
  sectors,
  image,
  imageAlt,
  availability,
  priority,
  description,
  benefits,
  limitations,
  relatedServices,
  technicalValidation,
  seoTitle,
  seoDescription
}
```

El inventario de datos sustituirá la divergencia actual entre `products.json` y las fichas Markdown. No se mantendrán dos fuentes manuales incompatibles.

## 9. SEO

- H1 único e intención transaccional;
- catálogo completo visible en HTML;
- enlaces rastreables a categorías y fichas;
- `ItemList` y `OfferCatalog` en la portada;
- `Product` en fichas, sin precio ni disponibilidad inventada;
- breadcrumbs;
- FAQ sólo para contenido visible;
- títulos y descripciones sin afirmaciones normativas no demostradas;
- URLs canónicas;
- filtros con `noindex` cuando creen estados de URL no útiles;
- imágenes con dimensiones, `alt`, lazy loading y formato eficiente;
- enlaces internos a venta, mantenimiento, recarga, señalización y sectores.

## 10. Correcciones de contenido incluidas

- eliminar la afirmación “todos certificados NOM-154-SCFI” aplicada a productos nuevos;
- corregir el cálculo de riesgo alto de 150 m² a 200 m² donde se cite la NOM-002;
- incluir clase D en la guía;
- separar PQS ABC de PQS BC;
- tratar tipo K como selección por riesgo, no como obligación universal sin contexto;
- retirar promesas no verificadas de financiamiento, descuentos, inventario, instalación incluida o certificado oficial;
- no promocionar Novec 1230 como suministro garantizado;
- separar litio metálico clase D de baterías de ion-litio.

## 11. Comportamiento sin JavaScript y errores

- todos los productos aparecen en HTML sin JavaScript;
- los enlaces de cotización funcionan como anclas hacia el formulario;
- con JavaScript se habilitan búsqueda, filtros, conteos y preselección;
- si falla una imagen, se utiliza una imagen de categoría con `alt` adecuado;
- si un producto especializado no tiene datos suficientes, se mantiene como familia bajo validación y no publica especificaciones inventadas;
- el formulario valida campos y codifica el mensaje antes de abrir WhatsApp.

## 12. Rendimiento y accesibilidad

- sin librerías nuevas para filtros;
- JavaScript pequeño y diferido;
- imágenes `width`/`height`, `loading=lazy` fuera del primer viewport;
- foco visible y objetivos táctiles de al menos 44 px;
- filtros con etiquetas y estado anunciado;
- regiones de resultados con `aria-live` moderado;
- respeto a `prefers-reduced-motion`;
- sin desplazamiento horizontal involuntario;
- diseño comprobado en 360, 768, 1024 y 1440 px.

## 13. Criterios de aceptación

1. `/catalogo/` compila sin errores.
2. Los productos se ven sin depender de una petición a `data/products.json`.
3. El catálogo cubre portátiles, industriales, automáticos, accesorios, refacciones y paquetes.
4. Ningún producto muestra precio.
5. Toda tarjeta incluye Solicitar cotización.
6. Búsqueda y filtros combinados funcionan por teclado y móvil.
7. El formulario recibe el producto seleccionado.
8. Los enlaces de producto no conducen a rutas inexistentes.
9. El schema se valida sintácticamente y no contiene `ProductCatalog` ni ofertas falsas.
10. Las afirmaciones NOM y de disponibilidad siguen los controles del estudio.
11. Se preservan los cambios existentes ajenos al catálogo.
12. `npm run build` termina correctamente.

## 14. Decisión de implementación

Se recomienda implementar este diseño en dos entregas técnicas dentro del mismo trabajo:

1. **Portada funcional y datos maestros:** catálogo completo, filtros, paquetes, guía y cotización.
2. **Fichas y rutas SEO:** unificación de fichas canónicas y migración progresiva de URLs existentes.

La primera entrega elimina el fallo actual y crea la experiencia completa. La segunda aumenta profundidad SEO sin bloquear el lanzamiento del catálogo.
