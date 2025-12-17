# Guia de Implementacion - Workflow n8n MANEXT Blog v1.0

## Resumen

Este workflow automatiza la generacion de articulos SEO para el blog de **MANEXT - Mantenimiento de Extintores** en https://mantenimientodeextintores.mx/

### Flujo del Workflow

```
Trigger (Cada 3 dias o Manual)
    ↓
Selector de Tema (32 temas de extintores)
    ↓
Constructor de Prompt (Para ChatGPT)
    ↓
ChatGPT API (Genera contenido JSON)
    ↓
Validar Respuesta
    ↓
Constructor FAL Prompts
    ↓
FAL.ai Generar Imagen
    ↓
Procesar y Descargar Imagen
    ↓
GitHub Subir Imagen
    ↓
Generar HTML Articulo
    ↓
GitHub Subir Articulo
    ↓
Actualizar articles.json
    ↓
Telegram Notificacion
```

---

## Archivos del Workflow

### 1. `n8n-workflow-manext-blog-v1.0.json`
Contiene la PARTE 1:
- Triggers (Programado y Manual)
- Selector de 32 temas
- Constructor de prompts
- Llamada a ChatGPT API
- Validacion de respuesta
- Generacion de imagen con FAL.ai
- Descarga de imagen

### 2. `n8n-workflow-manext-blog-PARTE2.json`
Contiene la PARTE 2:
- Subida de imagen a GitHub
- Generador de HTML del articulo
- Subida de articulo a GitHub
- Actualizacion de articles.json
- Notificacion por Telegram

---

## Instrucciones de Implementacion

### Paso 1: Importar Workflow Base

1. En n8n, ir a **Workflows** → **Import from File**
2. Seleccionar `n8n-workflow-manext-blog-v1.0.json`
3. El workflow se importara con los nodos de la PARTE 1

### Paso 2: Agregar Nodos de PARTE 2

1. Abrir `n8n-workflow-manext-blog-PARTE2.json` en un editor de texto
2. Copiar cada nodo del array `nodes_adicionales`
3. En n8n, agregar manualmente cada nodo o editar el JSON del workflow
4. Conectar los nodos segun `connections_adicionales`

### Paso 3: Configurar API Keys

Reemplazar los siguientes placeholders:

| Placeholder | Donde Obtenerlo |
|-------------|-----------------|
| `{{TU_API_KEY_OPENAI}}` | https://platform.openai.com/api-keys |
| `{{TU_API_KEY_FAL}}` | https://fal.ai/dashboard/keys |
| `{{TU_GITHUB_TOKEN}}` | https://github.com/settings/tokens |
| `{{TU_TELEGRAM_CHAT_ID}}` | Enviar mensaje a @userinfobot |

### Paso 4: Configurar GitHub

1. Cambiar `user/MANTENIMIENTO-DE-EXTINTORES` por tu repositorio real
2. El token necesita permisos: `repo` (full control)

### Paso 5: Crear Carpetas en GitHub

Crear las siguientes carpetas en tu repositorio:

```
img/
  img-blog/           ← Imagenes de articulos
blog/
  seguridad-contra-incendios/
  tipos-de-extintores/
  mantenimiento-y-recarga/
  equipos-contra-incendio/
  normativas-y-certificaciones/
  prevencion-empresarial/
  emergencias-y-protocolos/
  guias-y-comparativas/
  industria-y-comercio/
  hogar-y-familia/
data/
  articles.json       ← Ya existe
```

### Paso 6: Configurar Telegram (Opcional)

1. Crear bot con @BotFather en Telegram
2. Obtener el Token del bot
3. En n8n, crear credencial "Telegram API"
4. Reemplazar `{{TU_TELEGRAM_CHAT_ID}}` con tu Chat ID

---

## Los 32 Temas Incluidos

### Seguridad Contra Incendios (4)
1. Como Elegir el Extintor Correcto
2. Clases de Fuego A, B, C, D, K
3. Tecnica PASS
4. Plan de Emergencia contra Incendios

### Tipos de Extintores (6)
5. Extintor PQS (Polvo Quimico Seco)
6. Extintor CO2
7. Extintor Tipo K (Cocinas)
8. Extintor de Agua
9. Extintor Espuma AFFF
10. Extintor Agente Limpio

### Mantenimiento y Recarga (6)
11. Mantenimiento de Extintores CDMX
12. Recarga de Extintores CDMX
13. Prueba Hidrostatica
14. Cuando Recargar tu Extintor
15. Vida Util de un Extintor
16. Certificacion de Extintores

### Normativas y Certificaciones (4)
17. NOM-154-SCFI
18. NOM-002-STPS
19. Proteccion Civil CDMX
20. Multas por No Tener Extintores

### Industria y Comercio (4)
21. Extintores para Restaurantes
22. Extintores para Oficinas
23. Extintores para Bodegas
24. Extintores para Condominios

### Hogar y Familia (3)
25. Extintor para Casa
26. Extintor para Cocina del Hogar
27. Seguridad contra Incendios en el Hogar

### Guias y Comparativas (3)
28. Comparativa de Extintores
29. Precios de Extintores CDMX
30. Venta de Extintores CDMX

### Equipos Contra Incendio (2)
31. Sistemas de Proteccion Integral
32. Detectores de Humo

---

## Costos Estimados por Articulo

| Servicio | Costo Aproximado |
|----------|------------------|
| ChatGPT API (GPT-4o) | ~$0.15 - $0.25 USD |
| FAL.ai (1 imagen) | ~$0.02 - $0.05 USD |
| GitHub API | Gratis |
| Telegram | Gratis |
| **Total por articulo** | **~$0.20 - $0.30 USD** |

Con 32 temas y ejecucion cada 3 dias:
- ~10 articulos/mes = ~$2-3 USD/mes
- Ciclo completo (32 articulos) = ~3 meses

---

## Estructura del Articulo Generado

Cada articulo incluye:

- **SEO Optimizado**
  - Titulo (55-65 caracteres)
  - Meta description (150-160 caracteres)
  - Keywords relevantes
  - Schema.org (Article, FAQ, BreadcrumbList)

- **Contenido**
  - H1 atractivo
  - Tagline enganchador
  - 5+ secciones H2
  - Subsecciones H3
  - Info boxes con tips
  - 6 preguntas FAQ

- **Imagen**
  - Hero image generada con AI
  - 1200x630px optimizado para OG
  - Alt text SEO

- **CTAs**
  - Boton llamar
  - Boton WhatsApp
  - Links a servicios

---

## Verificacion Post-Implementacion

1. **Ejecutar manualmente** el workflow
2. Verificar que:
   - [ ] ChatGPT genere contenido JSON valido
   - [ ] FAL.ai genere imagen
   - [ ] Imagen se suba a GitHub
   - [ ] HTML se cree correctamente
   - [ ] articles.json se actualice
   - [ ] Telegram envie notificacion

3. **Revisar el articulo** en:
   - `https://mantenimientodeextintores.mx/blog/[categoria]/[slug].html`

---

## Troubleshooting

### Error: "No se obtuvo imagen de FAL.ai"
- Verificar API key de FAL.ai
- Revisar creditos disponibles

### Error: "Error parseando respuesta de ChatGPT"
- El modelo puede no haber generado JSON valido
- Reintentar la ejecucion

### Error: GitHub 404
- Verificar que el repositorio exista
- Verificar permisos del token
- Verificar que las carpetas existan

### Articulo no aparece en el blog
- Verificar que articles.json se actualizo
- Limpiar cache del navegador
- Verificar que blog-system.js carga el JSON

---

## Datos de Empresa Configurados

```javascript
empresa: {
  nombre: 'MANEXT',
  nombreCompleto: 'MANEXT - Mantenimiento de Extintores',
  experiencia: 'mas de 15 anos de experiencia',
  serviciosRealizados: '10,000+',
  cobertura: 'CDMX y Area Metropolitana',
  telefono: '55 3968 9272',
  whatsapp: '5215539689272',
  email: 'contacto@mantenimientodeextintores.mx'
}
```

---

## Soporte

Para preguntas sobre el workflow, revisar:
- Documentacion n8n: https://docs.n8n.io/
- OpenAI API: https://platform.openai.com/docs
- FAL.ai: https://fal.ai/docs
- GitHub API: https://docs.github.com/en/rest

---

**Workflow creado para MANEXT - Mantenimiento de Extintores**
**Version: 1.0**
**Fecha: Diciembre 2025**
