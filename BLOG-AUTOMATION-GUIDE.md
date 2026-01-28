# Sistema de Automatización del Blog MANEXT

## Resumen del Sistema

Este sistema permite automatizar la generación y publicación de artículos del blog para **MANEXT - Mantenimiento de Extintores**.

## Estructura de Archivos

```
MANTENIMIENTO-DE-EXTINTORES/
├── data/
│   └── articles.json          # 📦 Base de datos central (32 artículos)
├── js/
│   └── blog-system.js         # ⚙️ Motor de renderizado dinámico
├── css/
│   └── blog-system.css        # 🎨 Estilos del sistema de blog
├── templates/
│   └── article-template.html  # 📄 Template para nuevos artículos
├── scripts/
│   └── generate-categories.py # 🔧 Generador de páginas de categoría
├── blog.html                  # 🏠 Página principal del blog
└── blog/
    ├── [categoria].html       # 📂 Páginas de categoría (10 auto-generadas)
    └── [categoria]/
        └── [articulo].html    # 📝 Artículos individuales
```

---

## Workflow para Agregar un Nuevo Artículo

### Paso 1: Agregar al JSON

Edita `data/articles.json` y agrega un nuevo objeto al final del array `articles`:

```json
{
  "id": "mi-nuevo-articulo-slug",
  "title": "Título SEO del Artículo - Palabra Clave Principal",
  "slug": "mi-nuevo-articulo-slug",
  "category": "mantenimiento-y-recarga",
  "date": "2025-12-16",
  "image": "img/img-index/imagen-articulo.webp",
  "excerpt": "Descripción corta optimizada para SEO (máx 160 caracteres). Incluye palabra clave y llamada a la acción.",
  "readTime": "8 min",
  "featured": false,
  "tags": ["tag1", "tag2", "tag3", "tag4"]
}
```

### Paso 2: Crear la Imagen

1. Crea/obtén una imagen relevante (1200x630px recomendado)
2. Convierte a formato WebP para optimizar carga
3. Guárdala en `img/img-index/nombre-imagen.webp`

### Paso 3: Crear el Archivo HTML del Artículo

1. Copia `templates/article-template.html`
2. Crea el archivo en `blog/[categoria]/[slug].html`
3. Reemplaza todos los placeholders

### Paso 4: Verificar

- El artículo aparecerá automáticamente en `blog.html`
- El artículo aparecerá en la página de su categoría

---

## Categorías Disponibles (10)

| ID | Nombre | Color | Artículos |
|----|--------|-------|-----------|
| `seguridad-contra-incendios` | Seguridad Contra Incendios | #d32f2f | 3 |
| `tipos-de-extintores` | Tipos de Extintores | #f57c00 | 6 |
| `mantenimiento-y-recarga` | Mantenimiento y Recarga | #1976d2 | 6 |
| `equipos-contra-incendio` | Equipos Contra Incendio | #7b1fa2 | 2 |
| `normativas-y-certificaciones` | Normativas y Certificaciones | #00796b | 4 |
| `prevencion-empresarial` | Prevención Empresarial | #c62828 | 2 |
| `emergencias-y-protocolos` | Emergencias y Protocolos | #e53935 | 2 |
| `guias-y-comparativas` | Guías y Comparativas | #5e35b1 | 4 |
| `industria-y-comercio` | Industria y Comercio | #0288d1 | 3 |
| `hogar-y-familia` | Hogar y Familia | #43a047 | 2 |

---

## Artículos Actuales (32 Total)

### Por Servicio Principal:
- Mantenimiento de Extintores CDMX
- Recarga de Extintores CDMX
- Venta de Extintores CDMX
- Prueba Hidrostática

### Por Tipo de Extintor:
- Polvo Químico Seco (PQS)
- CO2 (Dióxido de Carbono)
- Tipo K (Cocinas)
- Agua a Presión
- Espuma AFFF
- Agente Limpio

### Por Sector:
- Restaurantes y Cocinas
- Oficinas
- Bodegas y Almacenes
- Condominios
- Hogar

### Por Normativa:
- NOM-154-SCFI
- NOM-002-STPS
- Protección Civil
- Multas y Sanciones

### Guías Prácticas:
- Clases de Fuego A, B, C, D, K
- Cómo Elegir el Extintor Correcto
- Técnica PASS
- Precios y Comparativas

---

## Comandos Útiles

### Regenerar todas las páginas de categoría:
```bash
cd /Users/carsolio/Desktop/PAGINAS-HTML/MANTENIMIENTO-DE-EXTINTORES
python3 scripts/generate-categories.py
```

### Validar JSON:
```bash
python3 -m json.tool data/articles.json > /dev/null && echo "JSON válido"
```

---

## Placeholders del Template de Artículo

| Placeholder | Descripción | Ejemplo |
|-------------|-------------|---------|
| `{{TITLE}}` | Título completo | "Mantenimiento de Extintores en CDMX" |
| `{{EXCERPT}}` | Descripción SEO | "Servicio profesional de mantenimiento..." |
| `{{SLUG}}` | URL amigable | "mantenimiento-extintores-cdmx" |
| `{{CATEGORY_SLUG}}` | Categoría URL | "mantenimiento-y-recarga" |
| `{{CATEGORY_NAME}}` | Nombre categoría | "Mantenimiento y Recarga" |
| `{{CATEGORY_COLOR}}` | Color HEX | "#1976d2" |
| `{{DATE}}` | Fecha ISO | "2025-12-15" |
| `{{DATE_FORMATTED}}` | Fecha legible | "15 de diciembre de 2025" |
| `{{READ_TIME}}` | Tiempo lectura | "10 min" |
| `{{IMAGE}}` | Ruta imagen | "img/img-index/imagen.webp" |
| `{{CONTENT}}` | HTML del artículo | `<h2>Sección...</h2><p>Texto...</p>` |
| `{{TAGS_HTML}}` | Tags formateados | `<span class="tag">tag1</span>...` |
| `{{SHORT_TITLE}}` | Título corto | "Mantenimiento CDMX" |

---

## SEO: Keywords Principales

### Servicios:
- mantenimiento de extintores cdmx
- recarga de extintores cdmx
- venta de extintores cdmx
- prueba hidrostática extintores

### Tipos:
- extintor pqs polvo químico seco
- extintor co2
- extintor tipo k cocinas
- extintor agua
- extintor espuma afff
- extintor agente limpio

### Normativas:
- nom-154-scfi extintores
- nom-002-stps
- protección civil extintores

### Long-tail:
- cuántos extintores necesito en mi negocio
- cada cuánto se recargan los extintores
- precio recarga extintor cdmx
- extintores para restaurantes normativa

---

## Datos de la Empresa

Estos datos están en `data/articles.json` bajo la clave `site`:

```json
{
  "name": "MANEXT",
  "fullName": "MANEXT - Mantenimiento de Extintores",
  "domain": "mantenimientodeextintores.mx",
  "phone": "5539689272",
  "whatsapp": "5215539689272",
  "email": "contacto@mantenimientodeextintores.mx",
  "location": "Ciudad de México y Área Metropolitana"
}
```

---

## Buenas Prácticas

1. **Imágenes**: Formato WebP, máximo 1200px ancho, <100KB
2. **Slugs**: kebab-case, sin acentos, máx 50 caracteres
3. **Títulos**: Incluir palabra clave + ubicación (CDMX)
4. **Excerpts**: 150-160 caracteres, incluir CTA
5. **Fechas**: Formato ISO (YYYY-MM-DD)
6. **Tags**: 3-5 por artículo, relevantes para búsqueda
7. **Featured**: Máximo 4-5 artículos destacados

---

## Próximos Artículos Sugeridos

1. Extintores para gasolineras
2. Extintores para hospitales y clínicas
3. Extintores para escuelas
4. Extintores para hoteles
5. Mantenimiento preventivo vs correctivo
6. Cómo leer la etiqueta del extintor
7. Diferencias entre mantenimiento y recarga
8. Extintores sobre ruedas

---

**Sistema creado para MANEXT - Mantenimiento de Extintores**
**Última actualización: Diciembre 2025**
