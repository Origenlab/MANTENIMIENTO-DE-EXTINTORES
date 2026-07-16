---
proyecto: MANEXT
sitio: https://mantenimientodeextintores.mx/
repo: Origenlab/MANTENIMIENTO-DE-EXTINTORES
stack: Astro v6 + GitHub Pages
fecha_actualizacion: 2026-07-15
---

# 📁 MANEXT — Índice del proyecto

Empresa de venta y mantenimiento de extintores en CDMX y Estado de México. **+80 años desde 1943**, +10,000 clientes en México. Cumplimiento NOM-154-SCFI / NOM-002-STPS / Protección Civil CDMX.

---

## 🧭 Navegación de notas

### Negocio y contexto
- [[Empresa — Descripción y Servicios MANEXT]] — qué hace MANEXT, propuesta de valor, sectores, normas
- [[Identidad — Tokens de Marca]] — colores, tipografía, logo, voz

### Arquitectura del sitio
- [[Arquitectura del Sitio — Páginas y Estructura]] — mapa de URLs L1/L2/L3, sitemap, navegación
- [[Stack y Tecnologías]] — Astro 6, Content Collections, CSS, JS dinámico
- [[Layout.astro — Props y Estructura]] — el layout único del sitio, props y schemas

### Sistema de diseño
- [[HERO-DESIGN-SYSTEM]] — Hero v3.0 (dark, dos variantes, service strip configurable)
- [[SectionHeader y pf-strip — Reglas L2]] — anatomía L2 canónica, FAQ-cotización, checklist 8 pasos
- [[Reglas del Sistema MANEXT]] — qué nunca hacer, qué siempre hacer

### Contenido
- [[Productos — Catálogo y Plantilla]] — arquitectura dinámica `/catalogo/[slug]`, contrato de datos, SEO, conversión y checklist de publicación
- [[Productos — Expansión 230]] — 230 variantes públicas, fuentes, relaciones familiares y controles
- [[Blog — Sistema de Contenido]] — 41 archivos, layout, frontmatter, duplicados, stubs

### Operaciones
- [[Rutas y Comandos Locales]] — paths macOS, npm scripts, estructura de carpetas
- [[GitHub — Repos y Workflow]] — remote único `origin`, cuenta `Origenlab`, deploy GH Pages
- [[Workflow — Subir Cambios a GitHub]] — commit, integración en `main`, Cloudflare Pages y verificación del SHA live

### Estado del proyecto
- [[Estado del Sitio — Hallazgos y Sprints]] — hallazgos, score actual y plan de trabajo
- [[Auditoría — Catálogo 276 e Interlinking]] — integridad, SEO, grafo, seguridad y prioridades del catálogo expandido

---

## 📞 Contacto comercial vivo

> Verificar contra `src/layouts/Layout.astro` antes de citar — cambia.

- **Tel:** 56 1461 2594 → `tel:5614612594`
- **WhatsApp:** `wa.me/5215614612594`
- **Horario:** L-V 8:00–18:00 · Sáb 9:00–14:00
- **Cobertura:** CDMX y Edo. Méx. — entrega 48h
- **Facebook:** facebook.com/manextcdmx

---

## 🚧 Trabajo activo (al 2026-07-15)

- La ficha canónica aprobada es `/catalogo/extintor-co2-portatil`.
- Los siguientes productos deben añadirse mediante datos, conservando `ProductDetailTemplate.astro` como plantilla compartida.
- Antes de crear una ficha, consultar `MEMORY.md` y [[Productos — Catálogo y Plantilla]].
- Mantener FAQ + cotización en un solo módulo de dos columnas y no añadir animaciones fuera de botones.
- El catálogo integra 46 familias matriz y 230 variantes: 276 fichas públicas generadas con el template compartido.

---

## 🗂 Espejos código ↔ vault

| Código (repo) | Vault (Obsidian) |
|---|---|
| `docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md` | [[Productos — Catálogo y Plantilla]] |
| `graphify-out/PRODUCT-CATALOG-TEMPLATE.md` | [[Productos — Catálogo y Plantilla]] |
| `graphify-out/CATALOG-EXPANSION-230.md` | [[Productos — Expansión 230]] |
| `docs/audits/2026-07-15-auditoria-integral-catalogo-276.md` | [[Auditoría — Catálogo 276 e Interlinking]] |
| `graphify-out/CATALOG-AUDIT-276-2026-07-15.md` | [[Auditoría — Catálogo 276 e Interlinking]] |
| `graphify-out/HERO-DESIGN-SYSTEM.md` | [[HERO-DESIGN-SYSTEM]] |
| `graphify-out/GRAPH_REPORT.md` (design system L2) | [[SectionHeader y pf-strip — Reglas L2]] |
| `AUDITORIA-MANEXT-2026-04-06.md` | [[Estado del Sitio — Hallazgos y Sprints]] |
| `ANALISIS-MANEXT-2026-05-05.md` | [[Estado del Sitio — Hallazgos y Sprints]] |

#proyecto/MANEXT
