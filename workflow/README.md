# Workflow N8N - Blog REDEIL

Sistema profesional de automatizacion para la creacion de articulos del blog de REDEIL.

## Arquitectura del Sistema

```
+------------------+     +------------------+     +------------------+
|   N8N Workflow   |---->|   AI (ChatGPT)   |---->|  Generador HTML  |
+------------------+     +------------------+     +------------------+
         |                                               |
         v                                               v
+------------------+                             +------------------+
| articulos.json   |<----------------------------|  blog/articulos  |
+------------------+                             +------------------+
```

## Estructura de Archivos

```
REDEIL/
├── blog/
│   ├── index.html                  # Pagina principal del blog
│   ├── TEMPLATE-ARTICULO.html      # Template para N8N (IMPORTANTE)
│   ├── articulos.json              # Base de datos de articulos
│   └── articulos/
│       └── [slug].html             # Articulos generados
├── css/
│   ├── style.css                   # Estilos globales
│   ├── blog-v3.css                 # Estilos del listado del blog
│   └── blog-article.css            # Estilos de articulos individuales
├── js/
│   └── blog-v3.js                  # JavaScript del blog
├── img/
│   ├── img-index/                  # Imagenes de servicios
│   └── blog/img/                   # Imagenes de articulos
└── workflow/
    ├── README.md                   # Esta documentacion
    ├── CONFIGURACION-REDEIL.md     # Variables del sitio
    └── workflow-REDEIL.json        # Workflow exportado (crear)
```

## Flujo del Workflow

```
1. Trigger (Manual/Programado)
        |
        v
2. Selector Inteligente
   - Selecciona producto/servicio
   - Selecciona categoria
   - Selecciona imagen
        |
        v
3. Constructor de Prompt
   - Genera prompt para IA
   - Incluye contexto REDEIL
        |
        v
4. ChatGPT/Claude API
   - Genera contenido del articulo
   - Retorna JSON estructurado
        |
        v
5. Validar Respuesta
   - Parsea JSON
   - Genera slug SEO
   - Crea FAQ Schema
        |
        v
6. Obtener Template
   - GET blog/TEMPLATE-ARTICULO.html
        |
        v
7. Reemplazar Variables
   - {{TITULO}} -> titulo generado
   - {{CONTENIDO}} -> HTML del articulo
   - etc.
        |
        v
8. Subir a GitHub
   - PUT blog/articulos/[slug].html
   - UPDATE blog/articulos.json
        |
        v
9. Notificacion (opcional)
```

## Variables del Template

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `{{TITULO}}` | Titulo H1 (max 60 chars) | "Guia de Iluminacion para Bodas" |
| `{{SLUG}}` | URL amigable | "guia-iluminacion-bodas-cdmx" |
| `{{META_DESCRIPTION}}` | SEO (150-160 chars) | "Descubre las mejores..." |
| `{{META_KEYWORDS}}` | Keywords | "iluminacion bodas, guirnaldas" |
| `{{CATEGORIA}}` | Nombre categoria | "Guias" |
| `{{CATEGORIA_SLUG}}` | Slug categoria | "guias" |
| `{{IMAGEN_PRINCIPAL}}` | Ruta imagen | "/blog/img/bodas/imagen.avif" |
| `{{IMAGEN_ALT}}` | Alt de imagen | "Iluminacion profesional boda" |
| `{{BREADCRUMB_TEXT}}` | Texto corto (15-25 chars) | "Guia Bodas" |
| `{{TIEMPO_LECTURA}}` | Tiempo lectura | "10 min lectura" |
| `{{CONTENIDO}}` | HTML del articulo | "<div class='article-intro'>..." |
| `{{FAQ_SCHEMA}}` | JSON-LD FAQs | "{"@context":..." |

## Estructura del JSON (articulos.json)

### Articulo Completo

```json
{
    "id": "mi-articulo-seo",
    "slug": "mi-articulo-seo",
    "titulo": "Titulo del Articulo (max 60 chars)",
    "descripcion": "Meta description 150-160 caracteres",
    "imagen": "/blog/img/categoria/imagen.avif",
    "imagenAlt": "Alt text descriptivo",
    "categoria": "Guias",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "autor": "REDEIL Team",
    "fechaPublicacion": "2026-01-27",
    "url": "articulos/mi-articulo-seo.html",
    "lecturaMinutos": 12,
    "destacado": false,
    "status": "published"
}
```

## Categorias Validas

- Guias
- Tendencias
- Tips
- Bodas
- XV Anos
- Corporativos
- Inspiracion

## Servicios REDEIL (para keywords)

### Iluminacion
- Guirnaldas de Luces
- Luz Neon LED
- City Color LED
- Cabezas Moviles
- Luz Negra UV
- Sky Tracker
- Proyector de Gobos
- Cascadas LED
- Iluminacion Laser
- Luces Arquitectonicas

### Audio
- Bocinas para Bodas
- Bocinas para XV Anos
- Bocinas para Fiestas
- Audio para Conferencias

### Efectos Especiales
- Maquina de Humo
- Humo Bajo
- Maquina de Confeti
- Maquina de Burbujas

## API JavaScript del Blog

El blog expone una API publica para integraciones:

```javascript
// Obtener todos los articulos
REDEIL_Blog.getArticles();

// Filtrar por categoria
REDEIL_Blog.filterByCategory('Guias');

// Buscar articulos
REDEIL_Blog.searchArticles('bodas');

// Limpiar busqueda
REDEIL_Blog.clearSearch();

// Ir a pagina
REDEIL_Blog.goToPage(2);

// Recargar articulos
REDEIL_Blog.refresh();
```

## Configuracion N8N

### Paso 1: Crear Credenciales

1. **OpenRouter/OpenAI**
   - Nombre: `OpenAI API`
   - API Key: tu-api-key

2. **GitHub**
   - Nombre: `GitHub API`
   - Token: ghp_xxxx (con scope `repo`)

### Paso 2: Configurar Variables

En el nodo "Set Variables" del workflow:

```json
{
    "dominio": "redeil.com",
    "nombreSitio": "REDEIL",
    "telefono": "55 4937 5172",
    "whatsapp": "525549375172",
    "email": "redeil.mx@gmail.com",
    "githubOwner": "Origenlab",
    "githubRepo": "REDEIL",
    "githubBranch": "main"
}
```

### Paso 3: Rutas GitHub

- Template: `blog/TEMPLATE-ARTICULO.html`
- Articulos: `blog/articulos/[slug].html`
- JSON: `blog/articulos.json`

## Checklist Pre-Publicacion

Antes de publicar, verificar:

- [ ] Slug unico (no duplicado)
- [ ] Titulo < 60 caracteres
- [ ] Description 150-160 caracteres
- [ ] Imagen existe y es AVIF < 200KB
- [ ] Categoria valida
- [ ] Minimo 5 tags relevantes
- [ ] Contenido > 1500 palabras
- [ ] Seccion FAQ incluida
- [ ] CTA a WhatsApp incluido

## Estructura HTML del Contenido

El contenido generado debe usar estas clases CSS:

```html
<!-- Introduccion -->
<div class="article-intro">
    <p>Parrafo introductorio...</p>
</div>

<!-- Secciones -->
<h2 id="seccion-1">Titulo de Seccion</h2>
<p>Contenido de la seccion...</p>

<!-- Caja destacada -->
<div class="highlight-box">
    <h4>Tip Importante</h4>
    <p>Contenido destacado...</p>
</div>

<!-- Caja de advertencia -->
<div class="warning-box">
    <h4>Ten en Cuenta</h4>
    <p>Advertencia o nota importante...</p>
</div>

<!-- Grid de imagenes -->
<div class="image-grid">
    <img src="/img/1.avif" alt="Descripcion 1">
    <img src="/img/2.avif" alt="Descripcion 2">
</div>

<!-- FAQ Section -->
<div class="faq-section">
    <h2>Preguntas Frecuentes</h2>
    <div class="faq-item">
        <div class="faq-question">Pregunta aqui?</div>
        <div class="faq-answer">Respuesta aqui...</div>
    </div>
</div>
```

## Solucion de Problemas

### Error: "Template no encontrado"
- Verificar que existe `blog/TEMPLATE-ARTICULO.html`
- Verificar permisos del token GitHub

### Error: "JSON invalido"
- ChatGPT genero respuesta mal formateada
- El workflow reintenta automaticamente

### Articulo no aparece en el blog
- Verificar que se actualizo `articulos.json`
- Verificar que `status: "published"`
- Ejecutar `REDEIL_Blog.refresh()` en consola

### Estilos no se aplican
- Verificar que el articulo carga `blog-article.css`
- Verificar que las clases CSS son correctas

## Archivos de Referencia

- **Template**: `/blog/TEMPLATE-ARTICULO.html`
- **CSS Blog**: `/css/blog-v3.css`
- **CSS Articulo**: `/css/blog-article.css`
- **JavaScript**: `/js/blog-v3.js`
- **Configuracion**: `/workflow/CONFIGURACION-REDEIL.md`

## Soporte

**REDEIL - Renta de Equipo para Eventos**
- WhatsApp: 55 4937 5172
- Email: redeil.mx@gmail.com
- Web: https://redeil.com
