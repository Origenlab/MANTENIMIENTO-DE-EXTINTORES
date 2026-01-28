# Sistema de Blog MANEXT - Réplica Exacta de REDEIL.com

## Análisis Técnico del Sistema de Blog de REDEIL.com

### 1. Arquitectura del Contenido

REDEIL.com utiliza un sistema de blog dinámico basado en JSON con las siguientes características:

```
Estructura de Directorios:
/blog/
├── index.html (o blog.html)     → Página principal del blog
├── articulos.json               → Base de datos de artículos
├── [categoria]/                 → Páginas de categoría
│   └── index.html
└── articulos/                   → Artículos individuales
    └── [slug].html
```

**Flujo de Datos:**
1. `articulos.json` contiene todos los artículos con metadatos
2. JavaScript carga el JSON y renderiza dinámicamente
3. Paginación de 9 artículos por página
4. Filtrado por categoría automático

### 2. Estructura del JSON de Artículos (REDEIL)

```json
{
  "id": "identificador-unico",
  "slug": "url-friendly-slug",
  "titulo": "Título del Artículo",
  "descripcion": "Descripción/Excerpt con keywords",
  "imagen": "ruta/a/imagen.avif",
  "categoria": "nombre-categoria",
  "autor": "REDEIL Team",
  "fechaPublicacion": "2025-12-25",
  "url": "nombre-archivo.html",
  "lecturaMinutos": "8-12"
}
```

### 3. Categorías de REDEIL (6 categorías)

| Categoría | Color | Enfoque |
|-----------|-------|---------|
| Bodas | Rosa (#e91e63) | Iluminación para bodas |
| XV Años | Púrpura (#9c27b0) | Eventos de quinceañeras |
| Corporativos | Negro (#1d1d1f) | Eventos empresariales |
| Guías | Azul (#0071e3) | Tutoriales y guías |
| Tips | Amarillo (#f39c12) | Consejos prácticos |
| Tendencias | Naranja (#ff6b35) | Novedades del sector |

### 4. Sistema de CTAs Dinámicos

REDEIL genera CTAs basados en keywords del título:
- "humo bajo" → "Crear Magia"
- "laser" → "Iluminar tu Evento"
- "boda" → "Cotizar para tu Boda"
- Default → "Explorar Ahora"

---

## RÉPLICA EXACTA PARA MANTENIMIENTO DE EXTINTORES

### 1. Arquitectura Adaptada

```
Estructura de Directorios MANEXT:
/
├── blog.html                    → Página principal del blog
├── data/
│   └── articles.json            → Base de datos de artículos
├── blog/
│   ├── [categoria].html         → Páginas de categoría (10)
│   └── [categoria]/             → Artículos por categoría
│       └── [slug].html
├── css/
│   └── blog-system.css          → Estilos del sistema
├── js/
│   └── blog-system.js           → Lógica del sistema
└── templates/
    └── article-template.html    → Template base
```

### 2. Categorías Adaptadas (10 categorías - Réplica Exacta)

| ID | Categoría | Color | Gradient | Enfoque SEO |
|----|-----------|-------|----------|-------------|
| seguridad-contra-incendios | Seguridad Contra Incendios | #d32f2f | #d32f2f → #b71c1c | Guías de prevención, protocolos, selección de equipos |
| tipos-de-extintores | Tipos de Extintores | #f57c00 | #f57c00 → #e65100 | PQS, CO2, Agua, Tipo K, Espuma, Agentes Limpios |
| mantenimiento-y-recarga | Mantenimiento y Recarga | #1976d2 | #1976d2 → #0d47a1 | Servicio profesional, frecuencias, procesos NOM |
| equipos-contra-incendio | Equipos Contra Incendio | #7b1fa2 | #7b1fa2 → #4a148c | Detectores, rociadores, señalización, gabinetes |
| normativas-y-certificaciones | Normativas y Certificaciones | #00796b | #00796b → #004d40 | NOM-154, NOM-002, NFPA, requisitos legales |
| prevencion-empresarial | Prevención Empresarial | #c62828 | #c62828 → #8e0000 | Auditorías, capacitación, brigadas, protocolos |
| emergencias-y-protocolos | Emergencias y Protocolos | #e53935 | #e53935 → #c62828 | Evacuación, respuesta rápida, simulacros |
| guias-y-comparativas | Guías y Comparativas | #5e35b1 | #5e35b1 → #311b92 | Análisis, precios, comparativas de equipos |
| industria-y-comercio | Industria y Comercio | #0288d1 | #0288d1 → #01579b | Restaurantes, fábricas, oficinas, bodegas |
| hogar-y-familia | Hogar y Familia | #43a047 | #43a047 → #1b5e20 | Protección residencial, condominios, seguridad doméstica |

### 3. Sistema de CTAs Dinámicos Adaptados

```javascript
const CTA_KEYWORDS = {
  'mantenimiento': 'Solicitar Mantenimiento',
  'recarga': 'Cotizar Recarga',
  'extintor': 'Ver Extintores',
  'nom': 'Consultar Cumplimiento',
  'multa': 'Evitar Sanciones',
  'tipo k': 'Proteger tu Cocina',
  'pqs': 'Cotizar PQS',
  'co2': 'Ver CO2',
  'capacitacion': 'Agendar Capacitación',
  'brigada': 'Formar Brigada',
  'default': 'Cotizar Ahora'
};
```

---

## ESTRATEGIA EDITORIAL COMPLETA (Réplica REDEIL)

### Patrón de Títulos SEO (Estilo REDEIL)

REDEIL usa un formato consistente:
- **Keyword principal + Contexto específico + Año/Ubicación**
- Ejemplos REDEIL:
  - "Guía de Iluminación para Eventos en CDMX 2025"
  - "10 Ideas de Iluminación para Bodas al Aire Libre"
  - "Tendencias en Iluminación LED para Eventos Corporativos"

**Adaptación MANEXT:**

| Patrón | Ejemplo MANEXT |
|--------|----------------|
| Guía + Keyword + Ubicación + Año | "Guía de Mantenimiento de Extintores CDMX 2025" |
| Número + Keyword + Beneficio | "7 Señales de que tu Extintor Necesita Recarga Urgente" |
| Pregunta + Keyword | "¿Cuándo Recargar tu Extintor? Frecuencias Obligatorias" |
| Keyword + vs + Comparación | "Extintor PQS vs CO2: Cuál Elegir para tu Negocio" |
| Keyword + Requisitos + Ubicación | "Extintores para Restaurantes: Requisitos CDMX 2025" |
| Multas/Sanciones + Keyword | "Multas por No Tener Extintores: Montos y Cómo Evitarlas" |

### Estructura de Artículo (Réplica Exacta)

```html
<!-- ENCABEZADO -->
<header>
  <span class="category-badge">CATEGORÍA</span>
  <h1>Título Principal H1 (55-60 caracteres)</h1>
  <div class="meta">
    <span>Por MANEXT</span>
    <span>X min lectura</span>
  </div>
</header>

<!-- IMAGEN DESTACADA -->
<figure class="featured-image">
  <img src="..." alt="..." loading="eager">
</figure>

<!-- CONTENIDO -->
<article>
  <!-- Lead/Intro (1-2 párrafos con keyword principal) -->
  <p class="lead"><strong>Hook impactante con estadística o dato.</strong> Contexto...</p>

  <!-- Tabla de Contenidos -->
  <nav class="toc">
    <h2>Contenido del Artículo</h2>
    <ol>...</ol>
  </nav>

  <!-- Secciones H2 (5-8 por artículo) -->
  <section id="seccion-1">
    <h2>Título Sección 1</h2>
    <p>Contenido...</p>

    <!-- Subsecciones H3 (2-4 por H2) -->
    <h3>Subtítulo</h3>
    <p>Contenido...</p>
  </section>

  <!-- Info Boxes -->
  <div class="info-box">
    <h4>Título Destacado</h4>
    <p>Información importante...</p>
  </div>

  <!-- FAQs (6-8 preguntas) -->
  <section id="faq">
    <h2>Preguntas Frecuentes</h2>
    <div class="faq-list">...</div>
  </section>

  <!-- CTA Final -->
  <div class="recommendation-box">
    <h4>CTA Principal</h4>
    <p>Descripción...</p>
    <div class="buttons">
      <a href="tel:...">Llamar</a>
      <a href="wa.me/...">WhatsApp</a>
    </div>
  </div>

  <!-- Tags -->
  <div class="tags">...</div>

  <!-- Artículos Relacionados -->
  <section class="related-articles">
    <h3>Artículos Relacionados</h3>
    <div class="grid">...</div>
  </section>
</article>

<!-- SIDEBAR -->
<aside>
  <div class="toc-widget">...</div>
  <div class="cta-widget">...</div>
  <div class="services-widget">...</div>
  <div class="contact-widget">...</div>
</aside>
```

### Profundidad de Contenido por Tipo

| Tipo de Artículo | Palabras | Secciones H2 | FAQs | Ejemplos |
|------------------|----------|--------------|------|----------|
| Guía Completa | 2,500-4,000 | 6-8 | 6-8 | Clases de Fuego, NOM-154 |
| Comparativa | 1,500-2,500 | 4-6 | 4-6 | PQS vs CO2, Precios |
| Tutorial/Cómo | 1,200-2,000 | 4-5 | 4-5 | Cómo Elegir Extintor |
| Normativa/Legal | 2,000-3,000 | 5-7 | 5-6 | NOM-002-STPS, Multas |
| Por Industria | 1,500-2,500 | 4-6 | 4-5 | Restaurantes, Bodegas |

---

## TÍTULOS SEO OPTIMIZADOS (50+ Ideas)

### Categoría: Seguridad Contra Incendios
1. "Cómo Elegir el Extintor Correcto para tu Negocio [Guía 2025]" ✓
2. "Clases de Fuego A, B, C, D y K: Guía Definitiva México 2025" ✓
3. "Venta de Extintores en CDMX: Precios y Guía de Compra 2025" ✓
4. "Los 5 Errores Fatales al Usar un Extintor (Y Cómo Evitarlos)"
5. "Técnica PASS: Cómo Usar un Extintor Correctamente Paso a Paso"
6. "Señalización de Extintores: Requisitos NOM y Ubicación Correcta"
7. "Distancia Máxima de Recorrido a un Extintor: Normativa CDMX"

### Categoría: Tipos de Extintores
8. "Extintor PQS (Polvo Químico Seco): El Más Versátil del Mercado" ✓
9. "Extintor CO2: Guía Completa de Usos, Ventajas y Limitaciones"
10. "Extintor Tipo K: Obligatorio para Cocinas Comerciales en México"
11. "Extintor de Agua: Cuándo Usarlo y Cuándo es Peligroso"
12. "Extintores de Espuma AFFF: Para Qué Sirven y Dónde Usarlos"
13. "Agentes Limpios: Extintores para Data Centers y Equipos Sensibles"
14. "Comparativa de Extintores 2025: PQS vs CO2 vs Agua vs Tipo K"
15. "Extintores Rodantes: Cuándo Necesitas Uno en tu Empresa"

### Categoría: Mantenimiento y Recarga
16. "Mantenimiento de Extintores CDMX: Servicio Certificado NOM-154" ✓
17. "¿Cuándo Recargar tu Extintor? 5 Señales de Alerta + Frecuencias" ✓
18. "Vida Útil del Extintor: Cuándo Reemplazarlo (No es lo que Crees)" ✓
19. "Prueba Hidrostática de Extintores: Qué Es y Cada Cuánto Hacerla"
20. "Mantenimiento Mensual de Extintores: Checklist Obligatorio"
21. "Recarga de Extintores: Proceso, Costos y Proveedores en CDMX"
22. "Inspección Visual de Extintores: Los 10 Puntos que Debes Revisar"
23. "Etiqueta de Mantenimiento del Extintor: Cómo Leerla Correctamente"

### Categoría: Normativas y Certificaciones
24. "NOM-154-SCFI: Todo lo que tu Negocio Debe Cumplir en 2025" ✓
25. "NOM-002-STPS: Seguridad Contra Incendios en el Trabajo" ✓
26. "Protección Civil CDMX: Requisitos de Extintores para tu Licencia" ✓
27. "Multas por No Tener Extintores: Montos 2025 y Cómo Evitarlas" ✓
28. "Certificación NFPA: Qué Significa y Por Qué Importa en México"
29. "Auditoría de Protección Civil: Qué Revisan y Cómo Prepararte"
30. "Programa Interno de Protección Civil: Guía de Implementación"
31. "Dictamen de Protección Civil: Requisitos y Proceso en CDMX"

### Categoría: Equipos Contra Incendio
32. "Sistemas de Protección Integral: Más Allá del Extintor" ✓
33. "Detectores de Humo: Tipos, Instalación y Mantenimiento"
34. "Rociadores Automáticos (Sprinklers): Guía Completa para Empresas"
35. "Gabinetes Contra Incendio: Normativa, Tipos y Ubicación"
36. "Mangueras Contra Incendio: Especificaciones y Mantenimiento"
37. "Alarmas Contra Incendio: Sistema Completo para tu Negocio"
38. "Señalización Fotoluminiscente: Requisitos y Beneficios"

### Categoría: Prevención Empresarial
39. "Prevención de Incendios Empresarial: Protocolo Completo CDMX" ✓
40. "Capacitación de Brigadas Contra Incendio: Contenido y Requisitos"
41. "Plan de Emergencia Empresarial: Cómo Crearlo Paso a Paso"
42. "Evaluación de Riesgos de Incendio: Metodología Profesional"
43. "Simulacros de Evacuación: Frecuencia, Tipos y Mejores Prácticas"
44. "Póliza de Mantenimiento de Extintores: Ahorra y Cumple la NOM"
45. "Seguro Contra Incendios: Requisitos de Extintores para Cobertura"

### Categoría: Emergencias y Protocolos
46. "Qué Hacer en Caso de Incendio: Protocolo de 5 Pasos"
47. "Rutas de Evacuación: Diseño, Señalización y Normativa"
48. "Primeros Auxilios por Quemaduras: Guía de Respuesta"
49. "Conato de Incendio: Cómo Actuar en los Primeros 30 Segundos"
50. "Números de Emergencia CDMX: Bomberos, Protección Civil y Más"

### Categoría: Industria y Comercio
51. "Extintores para Restaurantes: Requisitos y Normativa CDMX 2025" ✓
52. "Extintores para Bodegas: Cantidad, Tipo y Ubicación Obligatoria"
53. "Extintores para Oficinas: Cuántos Necesitas Según los m²"
54. "Extintores para Talleres Mecánicos: Requisitos de Seguridad"
55. "Extintores para Gasolineras: Normativa NOM Específica"
56. "Extintores para Hoteles: Requisitos por Habitación y Área Común"
57. "Extintores para Escuelas: Obligaciones y Recomendaciones"
58. "Extintores para Hospitales: Requisitos Especiales de Seguridad"

### Categoría: Guías y Comparativas
59. "Precios de Extintores CDMX 2025: Comparativa Actualizada" ✓
60. "Mejores Marcas de Extintores en México: Comparativa 2025"
61. "Extintor Nuevo vs Recargado: ¿Cuál Conviene Más?"
62. "Costo Total de un Extintor: Compra + Mantenimiento 5 Años"
63. "Dónde Comprar Extintores Certificados en CDMX: Guía de Proveedores"
64. "Extintor para Auto: Cuál Comprar y Dónde Colocarlo"

### Categoría: Hogar y Familia
65. "Extintor para Casa: Guía de Compra y Ubicación Ideal"
66. "Seguridad Contra Incendios en el Hogar: 10 Consejos Prácticos"
67. "Detector de Humo para Casa: Tipos, Instalación y Mantenimiento"
68. "Extintores para Condominios: Obligaciones del Administrador"
69. "Plan de Evacuación Familiar: Cómo Crear el Tuyo"
70. "Prevención de Incendios en Navidad: Evita Tragedias"

---

## ESTRATEGIA SEO (Réplica Exacta REDEIL)

### Elementos On-Page por Artículo

1. **Title Tag:** Keyword principal + Contexto + Año (55-60 caracteres)
2. **Meta Description:** Hook + Keyword + CTA (150-160 caracteres)
3. **URL:** /blog/categoria/keyword-principal-slug
4. **H1:** Único, incluye keyword principal
5. **H2s:** 5-8 por artículo, incluyen keywords secundarias
6. **H3s:** 2-4 por H2, incluyen long-tails
7. **Imagen Alt:** Keyword + contexto descriptivo
8. **Internal Links:** 3-5 a artículos relacionados, 2-3 a páginas de servicio
9. **External Links:** 1-2 a fuentes oficiales (NOM, STPS, Protección Civil)

### Schema Markup (Obligatorio)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {...},
  "headline": "...",
  "description": "...",
  "image": {...},
  "author": {"@type": "Organization", "name": "MANEXT"},
  "publisher": {...},
  "datePublished": "...",
  "dateModified": "..."
}

{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [...]
}

{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [...]
}
```

### Interlinking Strategy

```
Artículo Principal (Hub)
├── Link a Categoría
├── Link a 2-3 Artículos Relacionados (mismo tema)
├── Link a 1-2 Artículos Complementarios (otro tema)
├── Link a Página de Servicio (venta, mantenimiento, recarga)
└── Link a Contacto/Cotización
```

---

## IMPLEMENTACIÓN PASO A PASO

### Paso 1: Verificar Estructura Existente (Ya Completado)
- [x] Sistema de blog funcional
- [x] JSON de artículos configurado
- [x] CSS de blog implementado
- [x] JS de carga dinámica funcionando
- [x] 10 categorías definidas
- [x] 15 artículos publicados
- [x] Templates de artículos

### Paso 2: Optimizaciones Pendientes

1. **Agregar CTAs Dinámicos al JS:**
```javascript
// Agregar a blog-system.js
function getCTA(title) {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('mantenimiento')) return 'Solicitar Mantenimiento';
  if (lowerTitle.includes('recarga')) return 'Cotizar Recarga';
  if (lowerTitle.includes('nom') || lowerTitle.includes('multa')) return 'Verificar Cumplimiento';
  if (lowerTitle.includes('tipo k') || lowerTitle.includes('restaurante')) return 'Proteger tu Cocina';
  return 'Cotizar Ahora';
}
```

2. **Implementar Artículos Relacionados por Tags:**
- Agregar campo "related" en JSON
- Mejorar algoritmo de selección

3. **Agregar Contador de Artículos por Categoría:**
- Mostrar "(X artículos)" junto a cada categoría

### Paso 3: Calendario Editorial

| Semana | Categoría | Artículo Nuevo |
|--------|-----------|----------------|
| 1 | tipos-de-extintores | Extintor CO2: Guía Completa |
| 1 | mantenimiento-y-recarga | Prueba Hidrostática de Extintores |
| 2 | normativas-y-certificaciones | Auditoría de Protección Civil |
| 2 | industria-y-comercio | Extintores para Bodegas |
| 3 | equipos-contra-incendio | Detectores de Humo: Tipos |
| 3 | prevencion-empresarial | Capacitación de Brigadas |
| 4 | emergencias-y-protocolos | Qué Hacer en Caso de Incendio |
| 4 | hogar-y-familia | Extintor para Casa |

### Paso 4: Métricas de Éxito

- **Meta:** 50 artículos en 6 meses
- **Distribución:** 5 artículos por categoría
- **Frecuencia:** 2 artículos por semana
- **Longitud promedio:** 2,000 palabras
- **FAQs por artículo:** 6 mínimo
- **Internal links:** 5+ por artículo

---

## CONCLUSIÓN

El sistema actual de MANEXT ya replica el 90% de la estructura de REDEIL.com. Las mejoras pendientes son:

1. **CTAs dinámicos** basados en keywords del título
2. **Más artículos** para llenar todas las categorías
3. **Mejores "related articles"** con algoritmo por tags
4. **Contador de artículos** visible por categoría

El sistema técnico (JSON + JS + CSS) está completamente funcional y listo para escalar a 50-100 artículos sin modificaciones estructurales.
