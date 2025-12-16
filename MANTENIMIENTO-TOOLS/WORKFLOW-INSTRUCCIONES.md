# MANEXT - Workflow n8n v2.0

## Instrucciones de Configuracion

### 1. Importar Workflow
1. Abre n8n
2. Ve a Workflows > Import from File
3. Selecciona `n8n-workflow-manext-catalogo-COMPLETO.json`

> **Nota:** El archivo contiene el workflow completo con 39 nodos, incluyendo generación de imágenes con FAL.ai y subida a GitHub.

### 2. Configurar Credenciales

#### OpenAI API
- Crea credencial tipo "HTTP Request"
- O usa el nodo "OpenAI" nativo de n8n
- API Key: tu key de OpenAI

#### FAL.ai API
- Crea credencial tipo "HTTP Request"
- Header: `Authorization: Key TU_API_KEY`

#### GitHub API
- Crea credencial tipo "HTTP Request"
- Header: `Authorization: token TU_GITHUB_TOKEN`
- Token necesita permisos: `repo` (full control)

#### Telegram (opcional)
- Bot Token del BotFather
- Chat ID donde enviar notificaciones

### 3. Nodos del Workflow

```
[Trigger] --> [Selector Producto] --> [Constructor Prompt] --> [ChatGPT API]
     |
     v
[Validar GPT] --> [FAL Prompts] --> [FAL Img 1] --> [FAL Img 2] --> [FAL Img 3] --> [FAL Img 4]
     |
     v
[Descargar Imgs] --> [Subir Imgs GitHub] --> [Generar HTML v2] --> [Subir HTML GitHub]
     |
     v
[Actualizar products.json] --> [Telegram Notificacion]
```

### 4. Estructura de Carpetas

El workflow sube archivos a:
```
/productos/
  ├── polvo-quimico-seco/
  │   ├── producto-extintor-pqs-12kg.html
  │   ├── producto-extintor-pqs-12kg-principal-TIMESTAMP.jpg
  │   ├── producto-extintor-pqs-12kg-lateral-TIMESTAMP.jpg
  │   └── ...
  ├── co2/
  ├── agua-presion/
  ├── tipo-k/
  ├── espuma-afff/
  └── agentes-limpios/
```

### 5. Colores por Categoria

| Categoria | Color | Uso |
|-----------|-------|-----|
| PQS | #c62828 | Hero, badges, links |
| CO2 | #1565c0 | Hero, badges, links |
| Agua | #0288d1 | Hero, badges, links |
| Tipo K | #f9a825 | Hero, badges, links |
| Espuma AFFF | #e65100 | Hero, badges, links |
| Agentes Limpios | #7b1fa2 | Hero, badges, links |

### 6. Productos Disponibles

El workflow incluye estos productos pendientes de generar:

**PQS:**
- Extintor PQS 12 kg Industrial
- Extintor PQS 50 kg Rodante
- Extintor PQS 68 kg Rodante Premium

**CO2:**
- Extintor CO2 9 kg Premium
- Extintor CO2 23 kg Rodante Industrial

**Agua:**
- Extintor de Agua 2.5 Galones

**Tipo K:**
- Extintor Tipo K 1.6 Galones Premium

**Espuma:**
- Extintor Espuma AFFF 9 Litros

**Agentes Limpios:**
- Extintor Halotron 6 kg Premium
- Extintor FE-36 4 kg Electronicos

### 7. Nuevo Diseno HTML v2.0 (Compacto)

El HTML generado incluye:
- **Hero oscuro compacto** (#1a1a1a) con gradiente
- **Grid de 2 columnas**: imagen sticky (450px) + info
- **Badges dinámicos**: certificación, stock, categoría
- **Colores por categoría** aplicados automáticamente:
  - Bordes, títulos, badges, hover states
- **Grid de clases + specs** lado a lado
- **Features en 2 columnas** (máximo 6)
- **CTA con botón WhatsApp verde** (#25D366)
- **Sidebar con widgets**:
  - Nuestros Servicios (con iconos)
  - Artículos Relacionados del Blog
  - Sobre MANEXT
  - Contacto Rápido
  - Ubicación
  - CTA con gradiente de color
- **Schema.org Product** integrado
- **Menu/Footer dinámicos** via fetch
- **CSS responsive** (1100px, 968px, 600px)

### 8. Actualizacion de products.json

El workflow actualiza automaticamente `/data/products.json` agregando:
```json
{
  "id": "pqs-12kg",
  "title": "Extintor PQS 12 kg Industrial",
  "slug": "producto-extintor-pqs-12kg",
  "category": "polvo-quimico-seco",
  "capacity": "12 kg",
  "capacityValue": 12,
  "range": "6-8 metros",
  "fireClasses": ["A", "B", "C"],
  "badge": "Industrial",
  "badgeType": "premium",
  "image": "productos/polvo-quimico-seco/producto-extintor-pqs-12kg-principal-TIMESTAMP.jpg",
  "images": [
    "producto-extintor-pqs-12kg-principal-TIMESTAMP.jpg",
    "producto-extintor-pqs-12kg-lateral-TIMESTAMP.jpg",
    "producto-extintor-pqs-12kg-detalle-TIMESTAMP.jpg",
    "producto-extintor-pqs-12kg-uso-TIMESTAMP.jpg"
  ],
  "excerpt": "Meta description del producto...",
  "related": [],
  "dateAdded": "2025-12-16"
}
```

### 9. Verificar Funcionamiento

1. Ejecutar workflow manualmente
2. Verificar que se generen las 4 imagenes
3. Verificar que el HTML se suba a GitHub
4. Verificar que products.json se actualice
5. Esperar ~2 min para que GitHub Pages publique
6. Visitar la URL del producto

### 10. Troubleshooting

**Error FAL.ai:**
- Verificar que el API key tenga creditos
- Verificar formato del prompt

**Error GitHub:**
- Verificar token con permisos `repo`
- Verificar que la rama `main` existe

**Error ChatGPT:**
- Verificar API key valida
- Verificar que el modelo `gpt-4o` este disponible

**HTML no se ve:**
- Verificar rutas relativas (../../)
- Verificar que menu.html y footer.html existan
