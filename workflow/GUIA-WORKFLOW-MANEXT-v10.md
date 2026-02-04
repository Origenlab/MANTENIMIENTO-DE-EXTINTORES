# GUIA WORKFLOW MANEXT v10.0 - NeuronWriter Integration

## Generador Automatico de Articulos SEO para Extintores

---

## RESUMEN

Workflow de n8n que genera articulos SEO optimizados para **mantenimientodeextintores.mx** de forma automatica cada 3 dias. Basado en el workflow MEDEDUL v10.0 probado y funcional.

### Stack Tecnologico
- **n8n**: Orquestador de workflow
- **NeuronWriter**: Analisis SEO/NLP de SERP real
- **Claude API** (claude-sonnet-4-20250514): Generacion de contenido
- **GitHub API**: Publicacion automatica
- **Telegram Bot**: Notificaciones

---

## CREDENCIALES NECESARIAS

| Servicio | Variable | Donde obtener |
|----------|----------|---------------|
| Anthropic | `TU_ANTHROPIC_API_KEY_AQUI` | https://console.anthropic.com |
| NeuronWriter | `TU_NEURONWRITER_API_KEY_AQUI` | https://app.neuronwriter.com/account/api |
| NeuronWriter | `TU_PROJECT_ID_AQUI` | Panel de NeuronWriter > Proyecto |
| GitHub | `TU_GITHUB_TOKEN_AQUI` | https://github.com/settings/tokens |
| Telegram | `TU_TELEGRAM_BOT_TOKEN_AQUI` | @BotFather en Telegram |
| Telegram | `TU_CHAT_ID_AQUI` | @userinfobot en Telegram |

### Permisos GitHub Token
- `repo` (Full control of private repositories)
- El token debe tener acceso al repo: `Origenlab/MANTENIMIENTO-DE-EXTINTORES`

---

## CONFIGURACION DEL SITIO

```
Dominio: mantenimientodeextintores.mx
Repo GitHub: Origenlab/MANTENIMIENTO-DE-EXTINTORES
Branch: main
Telefono: 55 3968 9272
WhatsApp: 5215539689272
Email: contacto@mantenimientodeextintores.mx
Color principal: #d32f2f (rojo)
```

### Rutas criticas
```
Template:      blog/TEMPLATE-ARTICULO.html
Articles JSON: data/articles.json
Sitemap:       sitemap.xml
Blog articles: blog/{slug}.html
Imagenes:      img/img-index/*.avif
```

---

## FLUJO DEL WORKFLOW (25 NODOS)

```
Trigger Programado (cada 3 dias a las 10am)
        |
Trigger Manual (ejecucion manual)
        |
        v
1. Selector Inteligente
   - Elige producto (12 productos de extintores)
   - Elige tipo de articulo (5 tipos)
   - Elige imagen hero sin repetir
   - Elige zonas CDMX aleatorias
   - Elige tipos de negocio aleatorios
        |
2. NeuronWriter: Crear Query
   - Envia keyword a NeuronWriter API
        |
3. Wait: 65 segundos
   - Espera a que NeuronWriter procese
        |
4. NeuronWriter: Obtener Resultados
   - Recupera datos SEO del SERP
        |
5. Procesar Datos NeuronWriter
   - Extrae terminos NLP, PAA, competidores
        |
6. Constructor Prompt
   - Construye el prompt SEO completo
   - Incluye datos NeuronWriter
   - Keywords primarias y long-tail
   - Estructura HTML con clases CSS MANEXT
        |
7. Preparar Request Claude
   - System prompt de experto en extintores
   - Configura claude-sonnet-4-20250514
        |
8. Claude API
   - Genera contenido (16000 max_tokens)
        |
9. Validar Respuesta
   - Parsea JSON de Claude
   - Genera slug SEO-friendly
   - Valida campos requeridos
   - Construye FAQ Schema
        |
10. NeuronWriter: Evaluar Contenido
    - Evalua score NLP del articulo
        |
11. Procesar Score NLP
    - Extrae scores de evaluacion
        |
12. GitHub: Obtener Template
    - Descarga TEMPLATE-ARTICULO.html
        |
13. Construir HTML
    - Reemplaza {{PLACEHOLDERS}} con contenido
    - Genera {{FECHA_ISO}} automaticamente
        |
14. Construir Card
    - Genera entry para articles.json
        |
15. GitHub: Subir Articulo
    - Sube blog/{slug}.html al repo
        |
16. GitHub: Obtener JSON
    - Descarga data/articles.json actual
        |
17. Actualizar JSON
    - Agrega nuevo articulo al inicio
        |
18. GitHub: Guardar JSON
    - Sube data/articles.json actualizado
        |
19. GitHub: Obtener Sitemap
    - Descarga sitemap.xml actual
        |
20. Actualizar Sitemap
    - Agrega nueva URL al sitemap
        |
21. GitHub: Guardar Sitemap
    - Sube sitemap.xml actualizado
        |
22. Telegram Notificacion
    - Envia resumen con NLP score y URL
        |
23. Fin
```

---

## PRODUCTOS CONFIGURADOS (12)

### Venta de Extintores (6 productos)
| ID | Nombre | Categoria | NeuronWriter Keyword |
|----|--------|-----------|---------------------|
| venta-extintor-pqs | Polvo Quimico Seco | tipos-de-extintores | extintor polvo quimico seco |
| venta-extintor-co2 | CO2 | tipos-de-extintores | extintor co2 dioxido de carbono |
| venta-extintor-agua | Agua a Presion | tipos-de-extintores | extintor de agua a presion |
| venta-extintor-tipo-k | Tipo K Cocinas | industria-y-comercio | extintor tipo k cocina |
| venta-extintor-espuma | Espuma AFFF | tipos-de-extintores | extintor espuma afff |
| venta-extintor-agente-limpio | Agente Limpio | equipos-contra-incendio | extintor agente limpio |

### Servicios (4 productos)
| ID | Nombre | Categoria | NeuronWriter Keyword |
|----|--------|-----------|---------------------|
| mantenimiento-preventivo | Mantenimiento Preventivo | mantenimiento-y-recarga | mantenimiento de extintores |
| recarga-extintores | Recarga Certificada | mantenimiento-y-recarga | recarga de extintores |
| prueba-hidrostatica | Prueba Hidrostatica | mantenimiento-y-recarga | prueba hidrostatica extintores |
| senalizacion-seguridad | Senalizacion | equipos-contra-incendio | senalizacion contra incendios |

### Contenido Informativo (2 productos)
| ID | Nombre | Categoria | NeuronWriter Keyword |
|----|--------|-----------|---------------------|
| capacitacion-brigadas | Capacitacion Brigadas | prevencion-empresarial | capacitacion uso de extintores |
| normativa-nom-154 | Guia NOM-154-SCFI | normativas-y-certificaciones | nom 154 scfi extintores |

---

## CATEGORIAS (10)

| Slug | Nombre | Color |
|------|--------|-------|
| seguridad-contra-incendios | Seguridad Contra Incendios | #d32f2f |
| tipos-de-extintores | Tipos de Extintores | #f57c00 |
| mantenimiento-y-recarga | Mantenimiento y Recarga | #1976d2 |
| equipos-contra-incendio | Equipos Contra Incendio | #7b1fa2 |
| normativas-y-certificaciones | Normativas y Certificaciones | #00796b |
| prevencion-empresarial | Prevencion Empresarial | #c62828 |
| emergencias-y-protocolos | Emergencias y Protocolos | #e53935 |
| guias-y-comparativas | Guias y Comparativas | #5e35b1 |
| industria-y-comercio | Industria y Comercio | #0288d1 |
| hogar-y-familia | Hogar y Familia | #43a047 |

---

## TIPOS DE ARTICULO (5)

| ID | Nombre | Tono |
|----|--------|------|
| guia-completa | Guia Completa | educativo y detallado |
| comparativa | Comparativa Tecnica | analitico y objetivo |
| consejos | Consejos Profesionales | experto y practico |
| normativa | Normativa y Legal | tecnico y autoritativo |
| caso-practico | Caso Practico | descriptivo y didactico |

---

## IMAGENES POR CATEGORIA

Todas las imagenes estan en `img/img-index/` en formato `.avif`:

- **tipos-de-extintores**: polvo-quimico-seco-pqs, co2, agua-presion, espuma-afff, agente-limpio, tipo-k, dioxido-de-carbono-co2, polvo-quimico-seco
- **mantenimiento-y-recarga**: mantenimiento-preventivo, recarga-de-extintores, prueba-hidrostatica, venta-y-mantenimiento-de-extintores
- **seguridad-contra-incendios**: prevencion-de-incendios, venta-de-extintores, capacitacion-y-brigadas
- **equipos-contra-incendio**: sistemas-proteccion-integral, senalizacion, agentes-limpios
- **normativas-y-certificaciones**: nom-154-scfi, prevencion-de-incendios
- **prevencion-empresarial**: capacitacion-y-brigadas, prevencion-de-incendios, tecnologia-monitoreo
- **guias-y-comparativas**: como-elegir-extintor-correcto, extintor, venta-de-extintores
- **industria-y-comercio**: tipo-k, sistemas-proteccion-integral, tecnologia-monitoreo
- **hogar-y-familia**: extintor, prevencion-de-incendios, como-elegir-extintor-correcto

---

## CLASES CSS DEL TEMPLATE

El articulo generado SOLO debe usar estas clases CSS existentes:

### Estructura de contenido
- `article-intro` - Parrafo de introduccion
- `toc` - Tabla de contenidos con navegacion
- `check-list` - Lista con checks/viñetas
- `steps-list` - Lista de pasos numerados

### Cajas destacadas
- `highlight-box` - Caja resaltada (consejos, advertencias)
- `tips-box` - Caja de tips/recomendaciones

### Tablas
- `table-responsive` - Contenedor responsive para tablas
- `comparison-table` - Tabla comparativa con estilos

### FAQ
- `faq-section` - Contenedor de preguntas frecuentes
- `faq-item` - Cada pregunta individual
- `faq-question` - Texto de la pregunta (clickeable)
- `faq-answer` - Respuesta (expandible)
- `faq-icon` - Icono +/- del accordion

### CTA (Call to Action)
- `article-cta` - Seccion de CTA principal
- `btn-cta` - Boton principal de accion
- `cta-box` - Caja CTA alternativa
- `cta-section` - Seccion CTA completa
- `btn-whatsapp` - Boton WhatsApp

---

## PLACEHOLDERS DEL TEMPLATE

Variables que el workflow reemplaza en `TEMPLATE-ARTICULO.html`:

| Placeholder | Descripcion | Ejemplo |
|-------------|-------------|---------|
| `{{TITULO}}` | Titulo del articulo (H1) | Extintores CO2: Guia Completa de Uso |
| `{{SLUG}}` | URL slug sin .html | extintores-co2-guia-completa-uso |
| `{{META_DESCRIPTION}}` | Meta description 150-160 chars | Descubre todo sobre extintores CO2... |
| `{{META_KEYWORDS}}` | Keywords separadas por coma | extintor co2, dioxido carbono... |
| `{{CATEGORIA}}` | Nombre de categoria | Tipos de Extintores |
| `{{CATEGORIA_SLUG}}` | Slug de categoria | tipos-de-extintores |
| `{{FECHA_ISO}}` | Fecha de publicacion | 2025-01-15 |
| `{{IMAGEN_PRINCIPAL}}` | Ruta imagen hero | img/img-index/co2.avif |
| `{{IMAGEN_ALT}}` | Alt text de imagen | Extintores CO2 - MANEXT CDMX |
| `{{BREADCRUMB_TEXT}}` | Texto corto breadcrumb | Extintores CO2 |
| `{{TIEMPO_LECTURA}}` | Tiempo de lectura | 10 min lectura |
| `{{CONTENIDO}}` | HTML completo del articulo | (todo el body) |
| `{{FAQ_SCHEMA}}` | JSON-LD FAQPage schema | {"@context":"https://schema.org"...} |

**Nota**: A diferencia de MEDEDUL, el template MANEXT NO usa variables `{{SITE_*}}`. Los datos del sitio (dominio, telefono, WhatsApp, redes sociales) estan hardcoded en el template.

---

## FORMATO articles.json ENTRY

Cada articulo se agrega al array `articles` en `data/articles.json`:

```json
{
  "id": "extintores-co2-guia-completa-uso",
  "title": "Extintores CO2: Guia Completa de Uso y Mantenimiento",
  "slug": "extintores-co2-guia-completa-uso",
  "category": "tipos-de-extintores",
  "image": "img/img-index/co2.avif",
  "excerpt": "Descubre todo sobre extintores de CO2...",
  "date": "2025-01-15",
  "readTime": "10 min lectura",
  "cta": "Ver Extintores",
  "nlpScore": 85,
  "metaDescription": "...",
  "metaKeywords": "...",
  "breadcrumbText": "Extintores CO2"
}
```

---

## COMO INSTALAR

### 1. Importar workflow
1. Abrir n8n
2. Ir a **Workflows > Import**
3. Seleccionar `workflow-MANEXT-extintores-v10-neuronwriter.json`

### 2. Configurar credenciales
Reemplazar en el workflow los siguientes placeholders:

1. **Anthropic API Key**: Buscar `TU_ANTHROPIC_API_KEY_AQUI` y reemplazar con tu API key
2. **NeuronWriter API Key**: Buscar `TU_NEURONWRITER_API_KEY_AQUI` y reemplazar
3. **NeuronWriter Project ID**: Buscar `TU_PROJECT_ID_AQUI` y reemplazar
4. **GitHub Token**: Buscar `TU_GITHUB_TOKEN_AQUI` y reemplazar (5 nodos)
5. **Telegram Bot Token**: Buscar `TU_TELEGRAM_BOT_TOKEN_AQUI` y reemplazar
6. **Telegram Chat ID**: Buscar `TU_CHAT_ID_AQUI` y reemplazar

### 3. Verificar repositorio
- Asegurar que `blog/TEMPLATE-ARTICULO.html` existe en el repo
- Asegurar que `data/articles.json` existe en el repo
- Asegurar que `sitemap.xml` existe en el repo

### 4. Ejecutar prueba
1. Click en **Execute Workflow** (trigger manual)
2. Verificar que cada nodo se ejecuta sin errores
3. Verificar el articulo publicado en el blog

---

## SOLUCION DE PROBLEMAS

### Error: "articles.json no encontrado"
- Verificar ruta: debe ser `data/articles.json` (no `blog/articles.json`)
- Verificar que el GitHub token tiene permisos de lectura

### Error: "Error parseando JSON de Claude"
- Claude no genero JSON valido
- Verificar que el prompt no exceda los limites
- Ejecutar de nuevo (el retry automatico deberia resolverlo)

### Error: "Slug invalido"
- El titulo generado fue demasiado corto
- El sistema usara slugs de respaldo automaticamente

### NLP Score bajo
- Normal en las primeras ejecuciones
- NeuronWriter necesita datos de proyecto configurados
- Ajustar keywords en el Constructor Prompt segun resultados

### Telegram no envia notificacion
- `continueOnFail: true` - el workflow continua aunque Telegram falle
- Verificar bot token y chat_id

---

## DIFERENCIAS CON MEDEDUL

| Aspecto | MEDEDUL | MANEXT |
|---------|---------|--------|
| Dominio | mesas-de-dulces.com | mantenimientodeextintores.mx |
| Repo | Origenlab/MEDEDUL | Origenlab/MANTENIMIENTO-DE-EXTINTORES |
| articles.json | blog/articles.json | data/articles.json |
| Color | #E91E8C (rosa) | #d32f2f (rojo) |
| Productos | 6 (mesas de dulces) | 12 (extintores/servicios) |
| Categorias | 6 | 10 |
| Template vars | Usa {{SITE_*}} variables | Hardcoded en template |
| {{FECHA_ISO}} | No existe | Si, requerido |
| Rol Claude | Experto en mesas de dulces | Experto en seguridad contra incendios |
| Normativas | N/A | NOM-154-SCFI, NOM-002-STPS, NFPA |
| Venues | Salones eventos CDMX | Zonas industriales/comerciales |
| Conversion | Solo WhatsApp | WhatsApp + telefono |
| CSS classes | article-intro, benefits-list | article-intro, check-list, tips-box |
| ID article | timestamp numerico | slug (string) |

---

## KEYWORDS PRINCIPALES

### Primarias (usar 3-5 veces)
- extintores
- venta de extintores
- mantenimiento de extintores
- recarga de extintores
- extintores CDMX
- extintor polvo quimico seco
- extintor CO2
- extintor tipo K

### Long-tail (usar 1-2 veces)
- donde comprar extintores en CDMX
- servicio de recarga de extintores a domicilio
- mantenimiento preventivo de extintores norma
- tipos de extintores y sus usos
- cada cuanto se recarga un extintor
- prueba hidrostatica de extintores
- como elegir el extintor correcto
- clases de fuego A B C D K

---

## NOTAS IMPORTANTES

1. **Contenido evergreen**: Los articulos NO deben incluir fechas, precios ni informacion temporal
2. **Normativas**: Siempre mencionar NOM-154-SCFI y/o NOM-002-STPS segun aplique
3. **Sin CSS custom**: Solo usar las clases CSS predefinidas del sitio
4. **Imagenes**: Todas en formato .avif en img/img-index/
5. **FAQ**: Siempre 6 preguntas para Schema.org FAQPage
6. **CTA doble**: WhatsApp (5215539689272) + telefono (5539689272)
7. **Slug max**: 70 caracteres, sin truncar palabras
8. **Estado persistente**: El workflow recuerda productos/imagenes usadas para no repetir
