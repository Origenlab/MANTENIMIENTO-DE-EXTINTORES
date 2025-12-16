# REPORTE SEO COMPLETO - MANTENIMIENTO DE EXTINTORES
**Fecha:** 16 de Diciembre 2025
**Dominio:** mantenimientodeextintores.mx
**Analizado por:** Claude Code

---

## RESUMEN EJECUTIVO

| Categoria | Estado | Puntuacion |
|-----------|--------|------------|
| Meta Tags | Bueno | 8/10 |
| Schema Markup | Regular | 6/10 |
| Velocidad | Muy Bueno | 9/10 |
| Imagenes | Excelente | 10/10 |
| URLs y Canonical | Critico | 4/10 |
| Open Graph | Bueno | 8/10 |
| Twitter Cards | Regular | 5/10 |
| Accesibilidad | Bueno | 7/10 |
| Mobile | Muy Bueno | 9/10 |
| Sitemap/Robots | Bueno | 7/10 |

**PUNTUACION GLOBAL: 7.3/10**

---

## 1. ESTRUCTURA HTML Y META TAGS

### Lo que esta BIEN:

- `lang="es"` presente en todas las 23 paginas principales
- `<meta charset="utf-8">` correcto
- `<meta name="viewport">` responsive configurado
- Titles bien estructurados con keyword + brand
- Meta descriptions con longitud adecuada (150-160 caracteres)
- Meta keywords presentes en paginas de servicios

### Lo que FALTA:

- **Meta `robots`**: No se especifica `index, follow` explicitamente
- **Meta `author`**: No presente en paginas principales
- **Meta `geo.region` y `geo.placename`**: Solo en articulos del blog, falta en paginas principales

### ACCIONES REQUERIDAS:

```html
<!-- Agregar a todas las paginas principales -->
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<meta name="author" content="MANEXT - Mantenimiento de Extintores">
<meta name="geo.region" content="MX-CMX">
<meta name="geo.placename" content="Ciudad de Mexico">
```

---

## 2. CANONICAL TAGS - CRITICO

### PROBLEMA GRAVE:

Solo **9 de 23 paginas** (39%) tienen canonical tag.

### Paginas SIN canonical (17 paginas):

1. 404.html
2. agentes-limpios.html
3. agua-presion.html
4. blog.html
5. catalogo.html
6. co2.html
7. espuma-afff.html
8. extintores.html
9. nosotros.html
10. polvo-quimico-seco.html
11. privacidad.html
12. sitemap.html
13. terminos.html
14. tipo-k.html
15. footer.html (no aplica)
16. menu.html (no aplica)
17. catalogo_backup.html (eliminar)

### IMPACTO SEO:

- Google puede indexar URLs duplicadas
- Dilucion de autoridad de pagina
- Problemas de contenido duplicado

### ACCION INMEDIATA:

Agregar a cada pagina:
```html
<link rel="canonical" href="https://mantenimientodeextintores.mx/[pagina].html">
```

---

## 3. SITEMAP.XML

### Estado actual:

- Archivo presente y bien formateado
- 412 lineas con URLs organizadas por categoria
- Prioridades correctamente asignadas (1.0 para index, 0.8 para principales, 0.7 servicios, 0.5 productos)
- lastmod: 2025-11-26 (desactualizado)

### PROBLEMAS:

1. **Referencia a pagina inexistente**: `servicios.html` en sitemap no existe
2. **Falta sitemap en robots.txt**
3. **No hay sitemap de imagenes**
4. **Articulos del blog no incluidos** en sitemap

### ACCIONES:

```txt
# Agregar a robots.txt:
Sitemap: https://mantenimientodeextintores.mx/sitemap.xml
```

Crear sitemap adicional para blog e imagenes.

---

## 4. ROBOTS.TXT

### Estado actual:
```
User-agent: *
Disallow:
```

### PROBLEMAS:

- Demasiado permisivo
- No bloquea carpetas innecesarias
- No incluye referencia al sitemap

### CONFIGURACION RECOMENDADA:

```txt
# https://www.robotstxt.org/
User-agent: *
Allow: /

# Bloquear archivos de desarrollo
Disallow: /MANTENIMIENTO-TOOLS/
Disallow: /.audit/
Disallow: /js/webpack.*
Disallow: /*_backup*

# Sitemap
Sitemap: https://mantenimientodeextintores.mx/sitemap.xml
```

---

## 5. SCHEMA MARKUP (DATOS ESTRUCTURADOS)

### Estado actual:

- **16 de 23 paginas** tienen Schema markup
- Index: LocalBusiness + OfferCatalog
- Servicios: Service
- Productos: Product
- Blog: Article + FAQPage + BreadcrumbList

### Lo que esta BIEN:

- LocalBusiness completo con geo, rating, openingHours
- Products con offers y availability
- Articles con author, publisher, datePublished

### Lo que FALTA:

1. **FAQPage en index.html**: Hay FAQ visible pero no tiene Schema
2. **BreadcrumbList** en paginas principales
3. **Organization** schema independiente
4. **WebSite** schema con SearchAction

### SCHEMAS A AGREGAR EN INDEX.HTML:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "MANEXT - Mantenimiento de Extintores",
  "url": "https://mantenimientodeextintores.mx",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://mantenimientodeextintores.mx/blog.html?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Pregunta del FAQ",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Respuesta"
      }
    }
  ]
}
```

---

## 6. OPEN GRAPH

### Estado actual: 23/23 paginas tienen og:title

### Lo que esta BIEN:

- og:title presente en todas las paginas
- og:type correcto (website/product)
- og:url correctas
- og:image definidas

### PROBLEMAS:

1. **og:image con rutas relativas** en algunas paginas (`img/og-image.jpg` en lugar de URL completa)
2. **Falta og:locale** en la mayoria
3. **Falta og:site_name** en paginas de servicios

### CORRECCION NECESARIA:

```html
<meta property="og:image" content="https://mantenimientodeextintores.mx/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="es_MX">
<meta property="og:site_name" content="MANEXT - Mantenimiento de Extintores">
```

---

## 7. TWITTER CARDS

### Estado actual: Solo 6/23 paginas tienen twitter:card

### PROBLEMA GRAVE:

La mayoria de paginas no tienen Twitter Cards configuradas.

### SOLUCION - Agregar a TODAS las paginas:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="[Titulo de la pagina]">
<meta name="twitter:description" content="[Meta description]">
<meta name="twitter:image" content="https://mantenimientodeextintores.mx/img/og-image.jpg">
```

---

## 8. OPTIMIZACION DE IMAGENES

### Estado actual: EXCELENTE

- Todas las imagenes en formato WebP
- Tamanos muy optimizados (1-26KB)
- Alt texts descriptivos y con keywords
- Lazy loading implementado

### EJEMPLOS DE ALT TEXTS BIEN HECHOS:

- "Extintor de Polvo Quimico Seco PQS certificado NOM-154-SCFI - clase ABC para oficinas, negocios y hogares en CDMX"
- "Servicio de mantenimiento preventivo anual de extintores con polizas certificadas NOM"

### MEJORA SUGERIDA:

Agregar `width` y `height` explicitos para evitar CLS:
```html
<img src="imagen.webp" alt="..." width="400" height="300" loading="lazy">
```

---

## 9. VELOCIDAD Y RENDIMIENTO

### Lo que esta MUY BIEN:

1. **CSS Critico inline** en el `<head>` (Above-the-fold)
2. **Preload de recursos criticos** (menu.html, footer.html, hero image)
3. **Preconnect** para dominios externos (wa.me)
4. **CSS principal con carga diferida** via preload + onload
5. **Noscript fallback** para CSS

### CODIGO EJEMPLO (ya implementado):

```html
<link rel="preload" href="css/style.css?v=14" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="css/style.css?v=14"></noscript>
```

### MEJORAS ADICIONALES:

1. Agregar `fetchpriority="high"` a imagen hero
2. Considerar `dns-prefetch` para api.telegram.org y api.openai.com si se usan en frontend

---

## 10. ACCESIBILIDAD

### Lo que esta BIEN:

- `aria-label` en navegacion de breadcrumbs
- `aria-expanded` en FAQ accordions
- Alt texts en todas las imagenes
- Estructura semantica con header, main, footer, nav

### Lo que FALTA:

1. **Skip link** para navegacion por teclado
2. **Focus visible** en elementos interactivos
3. **Roles ARIA** en elementos custom
4. **`lang` attribute** deberia ser `es-MX` no solo `es`

### AGREGAR AL INICIO DEL BODY:

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```

Con CSS:
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #d32f2f;
  color: white;
  padding: 8px;
  z-index: 100;
}
.skip-link:focus {
  top: 0;
}
```

---

## 11. ESTRUCTURA DE URLs

### Lo que esta BIEN:

- URLs descriptivas con keywords
- Estructura jerarquica clara (/productos/tipo/producto.html)
- Sin parametros innecesarios
- Sin mayusculas

### PROBLEMA:

- Uso de `.html` extension (mejor sin extension para URLs limpias)
- No hay redirecciones configuradas (necesita .htaccess o reglas en hosting)

### ESTRUCTURA ACTUAL:

```
/
├── index.html
├── servicios/
│   ├── mantenimiento-preventivo.html
│   ├── recarga-de-extintores.html
│   └── ...
├── productos/
│   ├── polvo-quimico-seco/
│   │   └── producto-extintor-pqs-6kg.html
│   └── ...
└── blog/
    ├── categoria/
    │   └── articulo.html
```

---

## 12. CONTENIDO Y KEYWORDS

### Keywords principales detectadas:

1. mantenimiento de extintores (primary)
2. extintores CDMX
3. venta de extintores
4. recarga de extintores
5. prueba hidrostatica
6. NOM-154-SCFI
7. extintor PQS / CO2 / Tipo K

### RECOMENDACIONES:

1. **Aumentar contenido** en paginas de categoria (polvo-quimico-seco.html, co2.html)
2. **Agregar FAQ schema** a todas las paginas con preguntas
3. **Internal linking** mas agresivo entre articulos del blog
4. **Pagina de glosario** para terminos tecnicos

---

## 13. HREFLANG

### Estado: NO IMPLEMENTADO

El sitio es solo en espanol-Mexico, pero deberia tener:

```html
<link rel="alternate" hreflang="es-MX" href="https://mantenimientodeextintores.mx/">
<link rel="alternate" hreflang="x-default" href="https://mantenimientodeextintores.mx/">
```

---

## 14. WEB MANIFEST (PWA)

### Estado actual: INCOMPLETO

```json
{
  "short_name": "",  // VACIO
  "name": "",        // VACIO
  "icons": [...]
}
```

### CORRECCION NECESARIA:

```json
{
  "short_name": "MANEXT",
  "name": "MANEXT - Mantenimiento de Extintores",
  "description": "Venta, mantenimiento y recarga de extintores en CDMX",
  "icons": [
    {
      "src": "icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "icon-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/?utm_source=pwa",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#d32f2f",
  "lang": "es-MX"
}
```

---

## PLAN DE ACCION PRIORITARIO

### URGENTE (Semana 1):

1. [ ] Agregar canonical tags a las 14 paginas faltantes
2. [ ] Actualizar robots.txt con sitemap y disallow
3. [ ] Corregir site.webmanifest
4. [ ] Cambiar `lang="es"` a `lang="es-MX"`

### IMPORTANTE (Semana 2):

5. [ ] Agregar Twitter Cards a todas las paginas
6. [ ] Agregar FAQPage schema al index.html
7. [ ] Agregar BreadcrumbList schema a paginas principales
8. [ ] Corregir og:image con URLs absolutas

### MEJORAS (Semana 3-4):

9. [ ] Agregar skip link para accesibilidad
10. [ ] Actualizar sitemap con articulos del blog
11. [ ] Agregar hreflang tags
12. [ ] Agregar WebSite schema con SearchAction

---

## ARCHIVOS A MODIFICAR

| Archivo | Cambios |
|---------|---------|
| robots.txt | Agregar sitemap, disallow folders |
| site.webmanifest | Completar name, short_name, description |
| index.html | FAQPage schema, BreadcrumbList, meta robots |
| Todas las paginas | Canonical, Twitter Cards, lang="es-MX" |
| sitemap.xml | Agregar articulos blog, actualizar lastmod |

---

## HERRAMIENTAS DE VALIDACION

Usar estas herramientas para verificar cambios:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema Validator**: https://validator.schema.org/
3. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
4. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
5. **Google PageSpeed Insights**: https://pagespeed.web.dev/
6. **Lighthouse** (DevTools)

---

*Reporte generado automaticamente - MANEXT SEO Audit 2025*
