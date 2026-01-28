# Workflow MEDEDUL - Articulos Profesionales v6

## Descripcion General

El workflow **v6** genera automaticamente articulos de blog profesionales para Mededul, completamente homologados con el diseno y estilo del sitio. Cada articulo incluye:

- HTML completo con estructura semantica
- 9 modulos de sidebar profesionales
- Imagenes en formato AVIF
- Schema.org (BlogPosting + FAQPage)
- SEO optimizado (meta tags, Open Graph, Twitter Cards)
- Card automatica para blog/index.html

---

## Configuracion Inicial

### 1. Importar en N8N

1. Abre tu instancia de N8N
2. Ve a **Settings > Import Workflow**
3. Selecciona el archivo `workflow-MEDEDUL-mesas-dulces-v6-profesional.json`

### 2. Configurar API Keys

Reemplaza los siguientes placeholders en los nodos correspondientes:

| Placeholder | Descripcion | Nodo |
|-------------|-------------|------|
| `{{TU_API_KEY_OPENAI}}` | API Key de OpenAI | ChatGPT API |
| `{{TU_GITHUB_TOKEN}}` | Token de GitHub con permisos de escritura | GitHub Upload Article, GitHub Update Index |
| `{{TU_BOT_TOKEN}}` | Token del bot de Telegram | Telegram Notification |
| `{{TU_CHAT_ID}}` | ID del chat de Telegram | Telegram Notification |

### 3. Verificar Configuracion GitHub

En los nodos de GitHub, verifica:
- **Owner**: `Origenlab`
- **Repo**: `MEDEDUL`
- **Branch**: `main`

---

## Estructura del Workflow

```
[Scheduler/Manual]
    |
    v
[Selector Inteligente] --> Selecciona producto, tipo de articulo, imagenes
    |
    v
[Constructor Prompt PRO] --> Genera prompt optimizado para ChatGPT
    |
    v
[Preparar ChatGPT] --> Formatea request para API
    |
    v
[ChatGPT API] --> Genera contenido del articulo
    |
    v
[Validar y Procesar] --> Parsea JSON, valida estructura
    |
    v
[HTML Builder PRO] --> Construye HTML completo homologado
    |
    v
[Card Builder] --> Genera entrada para blog/index.html
    |
    +---> [GitHub Upload Article] --> Sube articulo al repo
    |
    +---> [GitHub Update Index] --> Actualiza blog/index.html
    |
    v
[Telegram Notification] --> Notifica exito
```

---

## Categorias de Articulos

El workflow rota automaticamente entre 6 categorias sin repetir:

| Categoria | Descripcion |
|-----------|-------------|
| `mesa-dulces-bodas` | Mesas para bodas en venues exclusivos |
| `mesa-dulces-xv-anos` | Experiencias para XV Anos |
| `mesa-dulces-baby-shower` | Baby showers elegantes |
| `mesa-dulces-corporativos` | Eventos empresariales |
| `mesa-dulces-infantil` | Fiestas infantiles premium |
| `estaciones-interactivas` | Fuentes y experiencias gourmet |

---

## Tipos de Articulo

Cada articulo tiene un enfoque distinto:

| Tipo | Badge | Tono |
|------|-------|------|
| Guia Completa | "Guia Completa" | Educativo y detallado |
| Tendencias | "Tendencias 2025" | Vanguardista y actual |
| Consejos Insider | "Consejos Insider" | Experto y confidencial |
| Inspiracion | "Inspiracion" | Aspiracional y visual |
| Planificacion | "Planificacion" | Practico y organizado |

---

## Imagenes AVIF

El workflow selecciona automaticamente imagenes AVIF de las carpetas:

```
img/
├── eventos/
│   ├── bodas/
│   ├── xv-anos/
│   ├── baby-shower/
│   ├── corporativos/
│   └── cumpleanos/infantiles/
├── estaciones-interactivas/
├── galeria/
└── blog/
```

**Requisitos de imagenes:**
- Formato: AVIF (preferido) o WebP
- Resolucion minima: 1306x716 px
- Optimizadas para web (<200KB)

---

## Ejecucion

### Automatica
El workflow se ejecuta automaticamente cada **3 dias** a las **10:00 AM**.

### Manual
1. Abre el workflow en N8N
2. Click en el nodo **"Ejecutar Manual"**
3. Click en **"Execute Workflow"**

---

## Estructura del Articulo Generado

Cada articulo incluye:

### Contenido Principal
- Hero image con metadata
- Texto introductorio
- 6 secciones de contenido (300-400 palabras c/u)
- 2 grids de imagenes (4 imagenes total)
- Info box y Warning box
- 5 preguntas FAQ

### Sidebar (9 Modulos)
1. **CTA Principal** - Cotizacion por WhatsApp
2. **Tabla de Contenidos** - Navegacion interna
3. **Servicios** - Mesas, estaciones, personalizacion
4. **Paginas** - Blog, galeria, nosotros
5. **Tipos de Mesas** - Tematicas, premium, infantiles
6. **Estaciones** - Chocolate, chamoy, gomitas
7. **Caracteristicas** - Ingredientes, cobertura, soporte
8. **Articulos Relacionados** - 4 articulos sugeridos
9. **Zonas de Cobertura** - CDMX, Norte, Sur, Poniente

---

## SEO Incluido

- Title tag optimizado (max 60 chars)
- Meta description (150-160 chars)
- Keywords primarias y secundarias
- Open Graph completo
- Twitter Cards
- Schema.org BlogPosting
- Schema.org FAQPage
- Canonical URL
- Breadcrumbs estructurados

---

## Notificacion Telegram

Al completarse, recibiras un mensaje con:

```
NUEVO ARTICULO MEDEDUL

Titulo: [titulo del articulo]
Categoria: [categoria]
Tipo: [tipo de articulo]

Ver articulo:
https://mesas-de-dulces.com/blog/[slug].html

Generado automaticamente v6.0
```

---

## Solucion de Problemas

### Error: "Error parseando JSON"
- ChatGPT genero respuesta invalida
- El workflow reintenta automaticamente 3 veces

### Error: "Respuesta incompleta"
- Faltan campos requeridos (title, sections)
- Verificar que el prompt no exceda limites

### Error de GitHub
- Verificar token tiene permisos de escritura
- Verificar rama `main` existe

### Imagenes no encontradas
- Verificar que existen en `img/eventos/[categoria]/`
- Agregar nuevas imagenes AVIF a la carpeta correspondiente

---

## Mantenimiento

### Agregar nuevas imagenes
1. Agrega archivos AVIF a `img/eventos/[categoria]/`
2. Actualiza el array `images` en el nodo "Selector Inteligente"

### Agregar nueva categoria
1. Agrega objeto en array `products` del nodo "Selector Inteligente"
2. Crea carpeta de imagenes correspondiente
3. Agrega entradas en array `images`

### Modificar estructura HTML
1. Edita el nodo "HTML Builder PRO"
2. Asegurate de mantener las clases CSS del template

---

## Archivos de Referencia

- **Template HTML**: `blog/articulos/celebraciones-infantiles-ensueno-cdmx.html`
- **Documento guia**: `DOCUMENTO-ARTICULOS.md`
- **CSS principal**: `css/styles.css`
- **CSS header/footer**: `css/header-footer.css`

---

## Versionado

| Version | Fecha | Cambios |
|---------|-------|---------|
| v5 | - | Version inicial con estructura basica |
| v6 | 2025 | HTML homologado, 9 modulos sidebar, AVIF, Schema.org, cards automaticas |

---

## Contacto

Para soporte tecnico del workflow, contactar al equipo de desarrollo.

**Mededul - Mesas de Dulces de Alta Gama**
- Web: https://mesas-de-dulces.com
- Tel: 55 2522 6442
