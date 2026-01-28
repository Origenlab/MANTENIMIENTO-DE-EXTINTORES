# Workflow N8N - Plantilla Sin Secretos

## IMPORTANTE

El archivo `workflow-MEDEDUL-mesas-dulces-v7-profesional.json` contiene API keys y tokens que **NO deben subirse a GitHub**.

Para usar el workflow en otro sitio:

1. **Solicita el archivo JSON** directamente (no desde GitHub)
2. O **crea tu propio workflow** siguiendo la estructura abajo

---

## Estructura del Workflow

```
[Trigger Manual] ─────┐
                      ├──> [Selector Inteligente] ──> [Constructor Prompt]
[Trigger Programado] ─┘                                       │
                                                              ▼
                                                    [Preparar Request]
                                                              │
                                                              ▼
                                                    [ChatGPT/OpenRouter API]
                                                              │
                                                              ▼
                                                    [Validar Respuesta]
                                                              │
                                                              ▼
                                                    [Obtener Template GitHub]
                                                              │
                                                              ▼
                                                    [Reemplazar Variables]
                                                              │
                                                              ▼
                                                    [Subir a GitHub]
                                                              │
                                                              ▼
                                                    [Responder con URL]
```

---

## Nodos Principales

### 1. Selector Inteligente (Code Node)

Selecciona producto, categoria e imagen de forma aleatoria sin repetir.

**Variables a configurar:**
- `CONFIG.baseUrl` - URL de tu sitio
- `CONFIG.github.owner` - Tu usuario/org de GitHub
- `CONFIG.github.repo` - Nombre del repositorio
- `CONFIG.empresa` - Datos de tu empresa
- `CONFIG.products` - Lista de productos/servicios
- `CONFIG.images` - Imagenes por categoria

### 2. Constructor Prompt (Code Node)

Construye el prompt para la IA basado en el producto seleccionado.

### 3. ChatGPT/OpenRouter API (HTTP Request)

**URL:** `https://api.openai.com/v1/chat/completions`
o `https://openrouter.ai/api/v1/chat/completions`

**Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer TU-API-KEY`

**Body:**
```json
{
  "model": "gpt-4o",
  "messages": [...],
  "temperature": 0.85,
  "max_tokens": 16000,
  "response_format": {"type": "json_object"}
}
```

### 4. Obtener Template GitHub (HTTP Request)

**URL:** `https://api.github.com/repos/OWNER/REPO/contents/blog/TEMPLATE-ARTICULO.html`

**Headers:**
- `Authorization: Bearer TU-GITHUB-TOKEN`
- `Accept: application/vnd.github.v3+json`

### 5. Reemplazar Variables (Code Node)

Reemplaza las variables en el template:
- `{{TITULO}}`
- `{{SLUG}}`
- `{{META_DESCRIPTION}}`
- `{{CATEGORIA}}`
- `{{CONTENIDO}}`
- etc.

### 6. Subir a GitHub (HTTP Request)

**Method:** PUT
**URL:** `https://api.github.com/repos/OWNER/REPO/contents/blog/{{SLUG}}.html`

**Headers:**
- `Authorization: Bearer TU-GITHUB-TOKEN`
- `Accept: application/vnd.github.v3+json`

**Body:**
```json
{
  "message": "Add article: {{TITULO}}",
  "content": "{{BASE64_CONTENT}}",
  "branch": "main"
}
```

---

## Credenciales Necesarias

### OpenAI/OpenRouter
- API Key de OpenAI o OpenRouter
- Modelo recomendado: `gpt-4o` o `anthropic/claude-3.5-sonnet`

### GitHub
- Personal Access Token con permisos:
  - `repo` (full access)
  - `workflow` (opcional)

---

## Configuracion Paso a Paso

1. **Crear workflow vacio** en N8N

2. **Agregar nodos** siguiendo la estructura

3. **Configurar Selector Inteligente:**
   - Cambiar `CONFIG` con datos de tu sitio
   - Agregar tus productos/servicios
   - Agregar rutas de tus imagenes

4. **Configurar API de IA:**
   - Agregar tu API key en el header Authorization
   - Ajustar el prompt segun tu negocio

5. **Configurar GitHub:**
   - Agregar tu token en los headers
   - Cambiar owner/repo/branch

6. **Probar con ejecucion manual**

7. **Activar trigger programado** cuando funcione

---

## Variables del Template

El workflow espera estas variables en el template:

| Variable | Descripcion |
|----------|-------------|
| `{{TITULO}}` | Titulo del articulo |
| `{{SLUG}}` | URL amigable |
| `{{META_DESCRIPTION}}` | Descripcion SEO |
| `{{META_KEYWORDS}}` | Keywords |
| `{{CATEGORIA}}` | Nombre categoria |
| `{{CATEGORIA_SLUG}}` | Slug categoria |
| `{{IMAGEN_PRINCIPAL}}` | Ruta imagen |
| `{{IMAGEN_ALT}}` | Alt de imagen |
| `{{BREADCRUMB_TEXT}}` | Texto breadcrumb |
| `{{TIEMPO_LECTURA}}` | Tiempo lectura |
| `{{CONTENIDO}}` | HTML del articulo |
| `{{FAQ_SCHEMA}}` | JSON-LD FAQs |

---

## Soporte

Para obtener el workflow JSON completo (con tus propias credenciales), contacta al desarrollador.
