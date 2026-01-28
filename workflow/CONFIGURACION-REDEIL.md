# Configuracion Workflow REDEIL

## Variables del Sitio

```javascript
const CONFIG = {
    // Datos del sitio
    sitio: {
        nombre: "REDEIL",
        dominio: "redeil.com",
        descripcion: "Renta de Equipo de Iluminacion y Audio para Eventos",
        slogan: "Produccion Audiovisual para Eventos"
    },

    // Contacto
    contacto: {
        telefono: "+52-55-4937-5172",
        telefonoDisplay: "55 4937 5172",
        whatsapp: "525549375172",
        email: "redeil.mx@gmail.com",
        horario: "Lun - Dom / 8:00 - 23:00"
    },

    // Redes sociales
    redes: {
        facebook: "https://www.facebook.com/profile.php?id=61583385634990",
        instagram: "https://www.instagram.com/redeil.mx/",
        linkedin: "https://www.linkedin.com/in/redeilmx/",
        pinterest: "https://mx.pinterest.com/redeilmx/"
    },

    // GitHub
    github: {
        owner: "Origenlab",
        repo: "REDEIL",
        branch: "main",
        templatePath: "blog/TEMPLATE-ARTICULO.html",
        articlesPath: "blog/articulos/",
        jsonPath: "blog/articulos.json"
    },

    // Colores de marca
    colores: {
        principal: "#1d1d1f",
        secundario: "#6e6e73",
        acento: "#0071e3"
    },

    // Analytics
    analytics: {
        rybbitSiteId: "9340b2303c86",
        googleVerification: "google60c17291f46d5049"
    }
};
```

---

## Categorias de Articulos

```javascript
const CATEGORIAS = [
    {
        nombre: "Guias",
        slug: "guias",
        descripcion: "Guias completas sobre iluminacion y audio para eventos"
    },
    {
        nombre: "Tendencias",
        slug: "tendencias",
        descripcion: "Ultimas tendencias en iluminacion y audio profesional"
    },
    {
        nombre: "Tips",
        slug: "tips",
        descripcion: "Consejos practicos para tu evento"
    },
    {
        nombre: "Bodas",
        slug: "bodas",
        descripcion: "Todo sobre iluminacion y audio para bodas"
    },
    {
        nombre: "XV Anos",
        slug: "xv-anos",
        descripcion: "Ideas y consejos para fiestas de XV anos"
    },
    {
        nombre: "Corporativos",
        slug: "corporativos",
        descripcion: "Soluciones para eventos empresariales"
    },
    {
        nombre: "Inspiracion",
        slug: "inspiracion",
        descripcion: "Galerias e ideas para inspirarte"
    }
];
```

---

## Productos/Servicios para Articulos

```javascript
const PRODUCTOS = [
    // ILUMINACION
    {
        id: "guirnaldas",
        nombre: "Guirnaldas de Luces",
        categoria: "Iluminacion",
        categoriaArticulo: "Guias",
        keywords: ["guirnaldas", "focos edison", "luces vintage", "iluminacion romantica"],
        url: "/renta-de-iluminacion/guirnaldas.html"
    },
    {
        id: "luz-neon",
        nombre: "Luz Neon LED",
        categoria: "Iluminacion",
        categoriaArticulo: "Tendencias",
        keywords: ["luz neon", "neon LED", "iluminacion moderna", "efectos neon"],
        url: "/renta-de-iluminacion/luz-neon.html"
    },
    {
        id: "city-color",
        nombre: "City Color LED",
        categoria: "Iluminacion",
        categoriaArticulo: "Guias",
        keywords: ["city color", "uplighting", "iluminacion arquitectonica", "wash LED"],
        url: "/renta-de-iluminacion/city-color.html"
    },
    {
        id: "cabezas-moviles",
        nombre: "Cabezas Moviles",
        categoria: "Iluminacion",
        categoriaArticulo: "Guias",
        keywords: ["cabezas moviles", "luces roboticas", "beam", "spot movil"],
        url: "/renta-de-iluminacion/cabezas-moviles.html"
    },
    {
        id: "luz-negra",
        nombre: "Luz Negra UV",
        categoria: "Iluminacion",
        categoriaArticulo: "Guias",
        keywords: ["luz negra", "UV", "neon party", "fiesta fluorescente"],
        url: "/renta-de-iluminacion/luz-negra.html"
    },
    {
        id: "sky-tracker",
        nombre: "Sky Tracker",
        categoria: "Iluminacion",
        categoriaArticulo: "Tendencias",
        keywords: ["sky tracker", "laser cielo", "iluminacion exterior", "reflector potente"],
        url: "/renta-de-iluminacion/sky-tracker.html"
    },
    {
        id: "proyector-gobos",
        nombre: "Proyector de Gobos",
        categoria: "Iluminacion",
        categoriaArticulo: "Bodas",
        keywords: ["proyector gobos", "monograma boda", "logo proyectado", "gobo personalizado"],
        url: "/renta-de-iluminacion/proyector-de-gobos.html"
    },
    {
        id: "cascadas-led",
        nombre: "Cascadas LED",
        categoria: "Iluminacion",
        categoriaArticulo: "Inspiracion",
        keywords: ["cascadas LED", "cortina luces", "efecto lluvia", "decoracion luminosa"],
        url: "/renta-de-iluminacion/cascadas-led.html"
    },
    {
        id: "iluminacion-laser",
        nombre: "Iluminacion Laser",
        categoria: "Iluminacion",
        categoriaArticulo: "Tendencias",
        keywords: ["laser eventos", "show laser", "efectos laser", "iluminacion disco"],
        url: "/renta-de-iluminacion/iluminacion-laser.html"
    },
    {
        id: "luces-arquitectonicas",
        nombre: "Luces Arquitectonicas",
        categoria: "Iluminacion",
        categoriaArticulo: "Corporativos",
        keywords: ["iluminacion fachada", "wash building", "iluminacion exterior", "uplighting arquitectonico"],
        url: "/renta-de-iluminacion/luces-arquitectonicas.html"
    },

    // AUDIO
    {
        id: "bocinas-bodas",
        nombre: "Bocinas para Bodas",
        categoria: "Audio",
        categoriaArticulo: "Bodas",
        keywords: ["bocinas bodas", "sonido boda", "audio ceremonia", "sonido recepcion"],
        url: "/renta-de-bocinas/bocinas-para-bodas.html"
    },
    {
        id: "bocinas-xv",
        nombre: "Bocinas para XV Anos",
        categoria: "Audio",
        categoriaArticulo: "XV Anos",
        keywords: ["bocinas XV anos", "sonido quinceanos", "audio fiesta", "sistema sonido"],
        url: "/renta-de-bocinas/bocinas-para-xv-anos.html"
    },
    {
        id: "bocinas-fiestas",
        nombre: "Bocinas para Fiestas",
        categoria: "Audio",
        categoriaArticulo: "Tips",
        keywords: ["bocinas fiestas", "sonido fiesta", "audio cumpleanos", "sistema portatil"],
        url: "/renta-de-bocinas/bocinas-para-fiestas.html"
    },
    {
        id: "audio-conferencias",
        nombre: "Audio para Conferencias",
        categoria: "Audio",
        categoriaArticulo: "Corporativos",
        keywords: ["audio conferencias", "sonido corporativo", "microfonos", "sistema PA"],
        url: "/renta-de-bocinas/audio-para-conferencias.html"
    },

    // EFECTOS ESPECIALES
    {
        id: "maquina-humo",
        nombre: "Maquina de Humo",
        categoria: "Efectos",
        categoriaArticulo: "Tips",
        keywords: ["maquina humo", "efecto niebla", "humo eventos", "fog machine"],
        url: "/equipos-para-eventos/maquina-de-humo.html"
    },
    {
        id: "humo-bajo",
        nombre: "Humo Bajo",
        categoria: "Efectos",
        categoriaArticulo: "Bodas",
        keywords: ["humo bajo", "baile nubes", "primer baile", "efecto pista"],
        url: "/equipos-para-eventos/humo-bajo.html"
    },
    {
        id: "maquina-confeti",
        nombre: "Maquina de Confeti",
        categoria: "Efectos",
        categoriaArticulo: "Inspiracion",
        keywords: ["maquina confeti", "canones confeti", "lluvia papel", "celebracion"],
        url: "/equipos-para-eventos/maquina-de-confeti.html"
    },
    {
        id: "maquina-burbujas",
        nombre: "Maquina de Burbujas",
        categoria: "Efectos",
        categoriaArticulo: "Tips",
        keywords: ["maquina burbujas", "burbujas eventos", "efecto infantil", "fiesta ninos"],
        url: "/equipos-para-eventos/maquina-de-burbujas.html"
    }
];
```

---

## Imagenes Disponibles

```javascript
const IMAGENES = {
    // Imagenes generales
    general: [
        "/img/img-index/guirnaldas.avif",
        "/img/img-index/luz-neon.avif",
        "/img/img-index/city-color.avif",
        "/img/img-index/cabezas-moviles.avif",
        "/img/img-index/luz-negra.avif",
        "/img/img-index/sky-tracker.avif",
        "/img/img-index/proyector-de-gobos.avif",
        "/img/img-index/cascadas-led.avif",
        "/img/img-index/iluminacion-laser.avif",
        "/img/img-index/iluminacion-arquitectonica.avif",
        "/img/img-index/bocinas-para-bodas.avif",
        "/img/img-index/bocinas-para-xv-anos.avif",
        "/img/img-index/bocinas-para-fiestas.avif",
        "/img/img-index/conferencias.avif",
        "/img/img-index/seguidor-de-luz.avif",
        "/img/img-index/city-light.avif"
    ],

    // Imagenes de guirnaldas
    guirnaldas: [
        "/renta-de-iluminacion/img-guirnaldas/focos-edison-guirnalda-jardin.avif",
        "/renta-de-iluminacion/img-guirnaldas/guirnaldas-focos-antiguos-fiesta.avif",
        "/renta-de-iluminacion/img-guirnaldas/guirnaldas-estilo-clasico-jardin.avif",
        "/renta-de-iluminacion/img-guirnaldas/guirnaldas-iluminacion-vintage-noche.avif",
        "/renta-de-iluminacion/img-guirnaldas/serie-focos-edison-ambiente.avif",
        "/renta-de-iluminacion/img-guirnaldas/serie-luces-vintage-romantico.avif",
        "/renta-de-iluminacion/img-guirnaldas/focos-vintage-serie-decorativa-evento.avif",
        "/renta-de-iluminacion/img-guirnaldas/focos-retro-serie-luminosa-fiesta.avif"
    ],

    // Imagenes del blog
    blog: [
        "/blog/img/bodas-guirnaldas/guirnaldas-focos-edison-iluminacion.avif",
        "/blog/img/bodas-guirnaldas/renta-guirnaldas-interiores-elegantes.avif",
        "/blog/img/bodas-guirnaldas/renta-guirnaldas-arbol-iluminado-evento.avif",
        "/blog/img/bodas-guirnaldas/renta-guirnaldas-iluminacion-fiestas.avif",
        "/blog/img/bodas-guirnaldas/renta-guirnaldas-iluminacion-decorativa.webp"
    ]
};
```

---

## Zonas de Cobertura

```javascript
const ZONAS = {
    cdmx: [
        "Polanco", "Condesa", "Roma", "Santa Fe", "Coyoacan",
        "Del Valle", "Napoles", "San Angel", "Pedregal", "Interlomas"
    ],
    edomex: [
        "Naucalpan", "Tlalnepantla", "Huixquilucan", "Metepec",
        "Toluca", "Atizapan", "Cuautitlan", "Tecamac"
    ],
    venues: [
        "Hacienda de Cortes", "Jardin Etnobotanico", "Club de Banqueros",
        "Hacienda Panoaya", "La Casona de Tezozomoc", "Club de Golf Chapultepec"
    ]
};
```

---

## Estructura del Articulo JSON

Cuando el workflow genera un articulo, debe crear esta entrada en `articulos.json`:

```json
{
    "id": "slug-del-articulo",
    "slug": "slug-del-articulo",
    "titulo": "Titulo del Articulo (max 60 chars)",
    "descripcion": "Meta description 150-160 caracteres con keywords",
    "imagen": "/blog/img/categoria/imagen.avif",
    "imagenAlt": "Alt text descriptivo con keyword principal",
    "categoria": "Guias",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "autor": "REDEIL Team",
    "fechaPublicacion": "2026-01-27",
    "url": "articulos/slug-del-articulo.html",
    "lecturaMinutos": 12,
    "destacado": false,
    "status": "published"
}
```

---

## Prompt para Generacion de Articulos

> **IMPORTANTE:** El prompt completo y profesional se encuentra en:
>
> **`workflow/PROMPT-ARTICULOS-V2.md`**
>
> Este prompt incluye:
> - Estructura HTML detallada y exacta
> - Reglas anti-contenido generico de IA
> - Enlaces internos obligatorios
> - Formato de respuesta JSON completo
> - Checklist de calidad

### Resumen del Prompt v2.0

**Rol:** Redactor Senior especializado en SEO y eventos

**Requisitos principales:**
- 1500-2200 palabras narrativas
- 6+ secciones H2 con IDs unicos
- 5 preguntas FAQ obligatorias
- 3+ enlaces internos a servicios REDEIL
- 1 info-box + 1 warning-box minimo
- Tono profesional pero cercano
- Sin frases genericas de IA

**Formato de respuesta JSON:**
```json
{
    "titulo": "Titulo SEO (max 60 chars)",
    "slug": "url-amigable",
    "metaDescription": "150-160 caracteres",
    "metaKeywords": "keywords separadas por coma",
    "breadcrumbText": "Texto corto",
    "categoria": "Guias|Tendencias|Tips|Bodas|XV Anos|Corporativos|Inspiracion",
    "tiempoLectura": "X min de lectura",
    "contenidoHTML": "[HTML del articulo]",
    "faqSchema": [{pregunta, respuesta}, ...],
    "tags": ["tag1", "tag2", ...]
}
```

---

## Checklist Pre-Publicacion

Antes de que el workflow suba un articulo, verificar:

- [ ] Slug unico (no existe en articulos.json)
- [ ] Titulo < 60 caracteres
- [ ] Meta description 150-160 caracteres
- [ ] Imagen existe y es AVIF < 200KB
- [ ] Categoria valida (de la lista)
- [ ] Minimo 5 tags relevantes
- [ ] Contenido > 1500 palabras
- [ ] Incluye seccion FAQ (5 preguntas)
- [ ] Enlaces internos a servicios REDEIL
- [ ] CTA a WhatsApp incluido

---

## Credenciales Necesarias

Para configurar el workflow en N8N necesitas:

| Credencial | Descripcion |
|------------|-------------|
| OpenRouter/OpenAI API Key | Para generar contenido con IA |
| GitHub Token | Token con permisos `repo` para subir archivos |

### Crear Token de GitHub

1. Ve a GitHub > Settings > Developer settings > Personal access tokens
2. Click "Generate new token (classic)"
3. Selecciona scope: `repo` (full control)
4. Copia y guarda el token

---

## Soporte

**REDEIL - Renta de Equipo para Eventos**
- WhatsApp: 55 4937 5172
- Email: redeil.mx@gmail.com
- Web: https://redeil.com
