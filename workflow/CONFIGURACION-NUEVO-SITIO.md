# Configuracion para Nuevo Sitio - Sistema de Workflow Blog

## Paso 1: Variables del Sitio

Antes de comenzar, define estas variables para tu nuevo sitio:

```
NOMBRE_SITIO        = "Tu Empresa"
DOMINIO             = "tu-dominio.com"
TELEFONO            = "+52-55-XXXX-XXXX"
TELEFONO_DISPLAY    = "55 XXXX XXXX"
WHATSAPP            = "525512345678"
EMAIL               = "info@tu-dominio.com"
COLOR_PRINCIPAL     = "#E91E8C"  (o tu color de marca)
FACEBOOK            = "https://facebook.com/tu-pagina"
INSTAGRAM           = "https://instagram.com/tu-cuenta"
TIKTOK              = "https://tiktok.com/@tu-cuenta"
DIRECCION           = "Tu direccion completa"
CIUDAD              = "Ciudad de Mexico"
CODIGO_POSTAL       = "00000"
LATITUD             = "19.XXXX"
LONGITUD            = "-99.XXXX"
```

---

## Paso 2: Estructura de Carpetas Requerida

Crea esta estructura en tu proyecto:

```
tu-sitio/
├── blog/
│   ├── index.html           (listado de articulos)
│   └── TEMPLATE-ARTICULO.html
├── css/
│   ├── styles.css           (estilos globales)
│   ├── header-footer.css    (header y footer)
│   └── blog-article.css     (estilos de articulos)
├── img/
│   ├── branding/
│   │   ├── logo.avif
│   │   ├── favicon-32x32.png
│   │   └── favicon-16x16.png
│   └── galeria/
│       └── (imagenes para articulos)
├── js/
│   └── components.js        (opcional)
└── workflow/
    └── (archivos de este sistema)
```

---

## Paso 3: Configurar GitHub

### 3.1 Crear Token de GitHub

1. Ve a GitHub > Settings > Developer settings > Personal access tokens
2. Genera un token con permisos:
   - `repo` (acceso completo)
   - `workflow` (opcional)
3. Guarda el token de forma segura

### 3.2 Configurar Repositorio

```
GITHUB_OWNER        = "tu-usuario-o-org"
GITHUB_REPO         = "tu-repositorio"
GITHUB_BRANCH       = "main"
GITHUB_TOKEN        = "ghp_xxxxxxxxxxxx"
```

---

## Paso 4: Configurar N8N

### 4.1 Importar Workflow

1. Abre N8N
2. Ve a Workflows > Import
3. Importa el archivo `workflow-UNIVERSAL-blog.json`

### 4.2 Configurar Credenciales

Crea estas credenciales en N8N:

**OpenRouter API:**
- Nombre: `OpenRouter API`
- API Key: tu-api-key-openrouter

**GitHub API:**
- Nombre: `GitHub API`
- Token: tu-token-github

### 4.3 Actualizar Variables del Workflow

En el nodo "Set Variables", actualiza:

```json
{
  "dominio": "tu-dominio.com",
  "nombreSitio": "Tu Empresa",
  "telefono": "+52-55-XXXX-XXXX",
  "whatsapp": "525512345678",
  "email": "info@tu-dominio.com",
  "githubOwner": "tu-usuario",
  "githubRepo": "tu-repo",
  "githubBranch": "main"
}
```

---

## Paso 5: Personalizar Template

### 5.1 Copiar Template Base

Copia `TEMPLATE-ARTICULO-UNIVERSAL.html` a tu carpeta `blog/`

### 5.2 Buscar y Reemplazar

Usa buscar/reemplazar en el template:

| Buscar | Reemplazar con |
|--------|----------------|
| `{{SITE_DOMAIN}}` | tu-dominio.com |
| `{{SITE_NAME}}` | Tu Empresa |
| `{{SITE_PHONE}}` | +52-55-XXXX-XXXX |
| `{{SITE_PHONE_DISPLAY}}` | 55 XXXX XXXX |
| `{{SITE_WHATSAPP}}` | 525512345678 |
| `{{SITE_EMAIL}}` | info@tu-dominio.com |
| `{{SITE_COLOR}}` | #TU-COLOR |
| `{{SITE_FACEBOOK}}` | URL Facebook |
| `{{SITE_INSTAGRAM}}` | URL Instagram |
| `{{SITE_TIKTOK}}` | URL TikTok |

### 5.3 Personalizar Menu de Navegacion

Edita la seccion `<!-- HEADER -->` con tus paginas

### 5.4 Personalizar Footer

Edita la seccion `<!-- FOOTER -->` con tu informacion

### 5.5 Personalizar Sidebar

Edita la seccion `<!-- SIDEBAR -->` con tus servicios

---

## Paso 6: Configurar CSS

### 6.1 Variables CSS

En `styles.css`, define tus variables:

```css
:root {
    --rosa-principal: #TU-COLOR;
    --rosa-claro: #TU-COLOR-CLARO;
    --rosa-hover: #TU-COLOR-HOVER;
    --texto-oscuro: #1a1a1a;
    --texto-gris: #555;
    --texto-light: #6c757d;
    --fondo-gris: #f8f9fa;
    --borde-light: #eee;
}
```

### 6.2 Header Fijo

Asegurate de tener estos estilos en `blog-article.css`:

```css
.header-spacer {
    height: 180px;
    width: 100%;
    display: block;
}

@media (max-width: 768px) {
    .header-spacer {
        height: 130px;
    }
}

.breadcrumb-section {
    margin-top: -10px;
    padding: 10px 0 5px;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
}

.article-hero {
    padding: 150px 0 100px;
    min-height: 500px;
}
```

---

## Paso 7: Probar el Sistema

### 7.1 Test Manual

1. Abre el workflow en N8N
2. Ejecuta manualmente con datos de prueba:
   ```json
   {
     "keyword": "tu-keyword-de-prueba",
     "categoria": "general"
   }
   ```
3. Verifica que el articulo se sube a GitHub

### 7.2 Verificar en Sitio

1. Espera unos minutos para deploy
2. Visita `tu-dominio.com/blog/slug-articulo.html`
3. Verifica:
   - [ ] Header se muestra correctamente
   - [ ] Breadcrumb visible debajo del header
   - [ ] Hero con imagen y titulo
   - [ ] Contenido del articulo
   - [ ] Sidebar con widgets
   - [ ] Footer completo
   - [ ] Responsive en movil

---

## Paso 8: Configurar Automatizacion

### 8.1 Trigger por Webhook

Configura el trigger HTTP en N8N para recibir:

```json
POST /webhook/nuevo-articulo
{
  "keyword": "palabra-clave-seo",
  "categoria": "categoria-del-articulo"
}
```

### 8.2 Trigger Programado (Opcional)

Para publicacion automatica diaria/semanal:

1. Agrega nodo "Schedule Trigger"
2. Configura horario
3. Conecta a nodo que selecciona keyword aleatoria

---

## Checklist Final

- [ ] Token de GitHub configurado
- [ ] API de OpenRouter configurada
- [ ] Template personalizado con datos del sitio
- [ ] CSS con colores de marca
- [ ] Menu de navegacion actualizado
- [ ] Footer con informacion correcta
- [ ] Sidebar con servicios del sitio
- [ ] Workflow importado y configurado
- [ ] Test exitoso de generacion de articulo
- [ ] Verificacion visual en sitio

---

## Soporte

Si tienes problemas:

1. Revisa logs de N8N
2. Verifica credenciales
3. Confirma estructura de carpetas
4. Revisa que las variables esten bien reemplazadas
