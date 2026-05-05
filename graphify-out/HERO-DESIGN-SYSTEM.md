---
proyecto: MANEXT
sitio: https://mantenimientodeextintores.mx/
componente: Hero.astro
version: 2.0
fecha: 2026-05-05
estado: production-ready
referencia_visual: https://proyectored.com.mx/
ubicacion_codigo:
  componente: src/components/Hero.astro
  estilos: public/css/section-redesign.css
---

# MANEXT — Hero Design System v2.0

> Sistema de hero compartido para todo el sitio MANEXT.
> Inspirado en proyectored.com.mx pero con identidad MANEXT (rojo #d32f2f, fondo oscuro #0a0a0a).
> **Espejo de** `Obsidian Vault/MANEXT/HERO-DESIGN-SYSTEM.md` — mantener ambos en sync.

## 📍 Ubicación de archivos

| Archivo | Ruta | Rol |
|---|---|---|
| Componente | `src/components/Hero.astro` | Markup + props |
| Estilos | `public/css/section-redesign.css` (bloque `HERO REDESIGN — DARK`) | Look & feel global |
| Bust cache | `extraCss={['/css/section-redesign.css?v=N']}` en cada page que lo usa | Forzar recarga al editar CSS |

## 🎨 Tokens de diseño

```
Background base:    #0a0a0a
Texto principal:    #ffffff (sólido, sin gradiente)
Texto secundario:   #cfcfcf / #bdbdbd
Accent rojo:        #d32f2f → #ef4444 (gradiente CTAs)
Eyebrow rojo:       #ff7878 / #ffe0e0 (text), #ef4444 (dot)
Subtítulo rojo:     #ff7878
Border sutil:       rgba(255,255,255,0.06)
```

Tipografía:
- H1: `clamp(2rem, 3.8vw, 3rem)`, weight 800, line-height 1.12, letter-spacing -0.02em
- Eyebrow: 0.78rem, weight 600
- Description: clamp(0.98rem, 1.2vw, 1.05rem), line-height 1.7

## 🧱 Estructura del componente

```
<section class="hero hero-redesigned hero-dark hero-variant-{home|page}">
  <hero-bg-decor>          ← blobs rojos blur + grid pattern
  <hero-content>
    <hero-grid>            ← 2 cols (home) o 1 col (page)
      <hero-left>
        eyebrow chip
        h1 título
        subtitle (opcional)
        description (opcional)
      </hero-left>
      <hero-right>         ← solo en variant="home" si paragraphs[]
        prosa institucional
      </hero-right>
    </hero-grid>
  </hero-content>

  <hero-services>          ← 4 cards, opcional
    Servicios | Capacitación | Señalización | Cotización ★
  </hero-services>
</section>
```

## 🔌 API del componente

```ts
interface Props {
  title: string;                       // H1, requerido
  subtitle?: string;                   // línea roja
  description?: string;                // párrafo gris
  eyebrow?: string;                    // chip superior (default: "Cobertura nacional · Entrega 48h en CDMX")
  paragraphs?: string[];               // prosa derecha (solo "home")
  variant?: 'home' | 'page';           // default 'home'
  showServices?: boolean;              // override del strip; default = (variant==='home')
}
```

## 📐 Variantes

### `variant="home"` (por defecto)
- Grid 2 columnas (1.05fr / 1fr)
- Columna derecha con `paragraphs[]` institucional
- Service strip de 4 cards con la cuarta destacada en rojo
- Padding generoso `clamp(3.5rem, 7vw, 6rem)`

### `variant="page"`
- Grid 1 columna, max-width 900px
- Sin columna derecha
- Sin service strip por defecto (`showServices={true}` para forzarlo)
- Título más compacto `clamp(1.75rem, 3.2vw, 2.5rem)`
- Padding reducido `clamp(2.5rem, 5vw, 4rem)`

## 📋 Recetas de uso

### Home (página completa)
```astro
---
import Hero from '../components/Hero.astro';
---
<Hero
  title="Venta de Extintores Certificados en CDMX"
  subtitle="+80 años ofreciendo los mejores productos en seguridad contra incendios"
  description="Venta y mantenimiento de extintores con certificación NOM. Productos de alta calidad, stock disponible y entrega en 48 horas en CDMX."
  paragraphs={[
    '<strong>MANEXT</strong> es la empresa líder en venta y mantenimiento...',
    'MANEXT ofrece equipos de fabricación certificada...'
  ]}
/>
```

### Página de servicio (ej. `recarga-de-extintores.astro`)
```astro
<Hero
  variant="page"
  title="Recarga de Extintores Certificada NOM-154"
  subtitle="Servicio a domicilio en CDMX y Estado de México"
  description="Recargamos PQS, CO2, agua, espuma AFFF y agente limpio con certificación oficial NOM-154-SCFI. Préstamo de equipo, collares de garantía y carta de corresponsabilidad."
  eyebrow="Servicio · Recarga certificada"
/>
```

### Página de catálogo / categoría
```astro
<Hero
  variant="page"
  title="Extintores de Polvo Químico Seco (PQS)"
  description="Clase A, B y C. Capacidades de 1kg a 68kg rodante. Certificación NOM-100-STPS y NOM-104-STPS."
  eyebrow="Catálogo · Polvo químico seco"
  showServices={false}
/>
```

### Producto individual
```astro
<Hero
  variant="page"
  title={producto.title}
  description={producto.shortDescription}
  eyebrow={`Producto · ${producto.category}`}
/>
```

## 🚀 Plan de aplicación al resto del sitio

Páginas actualmente con hero antiguo o sin hero unificado (auditar):

- [ ] `src/pages/servicios.astro`
- [ ] `src/pages/venta-de-extintores.astro`
- [ ] `src/pages/recarga-de-extintores.astro`
- [ ] `src/pages/mantenimiento-preventivo.astro`
- [ ] `src/pages/prueba-hidrostatica.astro`
- [ ] `src/pages/capacitacion-brigadas.astro`
- [ ] `src/pages/senalizacion.astro`
- [ ] `src/pages/extintores.astro`
- [ ] `src/pages/catalogo.astro`
- [ ] `src/pages/co2.astro`, `polvo-quimico-seco.astro`, `agua-presion.astro`, `tipo-k.astro`, `espuma-afff.astro`, `agentes-limpios.astro`
- [ ] `src/pages/nosotros.astro`
- [ ] `src/pages/contacto.astro`
- [ ] `src/pages/blog/[...slug].astro` (header del artículo)
- [ ] `src/pages/productos/[...slug].astro` (header del producto)

Por cada página:
1. `import Hero from '../components/Hero.astro'`
2. Quitar el header/hero existente
3. Insertar `<Hero variant="page" title="..." description="..." eyebrow="..." />` justo después de `<Layout>`
4. Bump `?v=N` en `extraCss` si se cambió CSS
5. Verificar visualmente en local

## 🎭 Decisiones de diseño

| Decisión | Razón |
|---|---|
| Fondo oscuro #0a0a0a | Diferenciación vs. competencia (la mayoría usa rojo plano), match con proyectored.com.mx |
| Título blanco sólido (sin gradiente) | Petición explícita del cliente — más limpio y legible |
| Sin botones tel/WhatsApp en hero | Petición explícita — el WhatsApp flotante y el header ya cubren ese rol |
| Service strip al final | Atajo a las 3 secciones clave + CTA cotización, sin saturar el hero |
| Eyebrow con punto rojo | Refuerza identidad de marca y da contexto de cobertura/entrega |

## 🔁 Bust de caché

Cada vez que se edite `public/css/section-redesign.css`, incrementar el query `?v=N` en cada `extraCss={...}` que lo importe. Páginas afectadas (al 2026-05-05):

```bash
grep -rln "section-redesign.css" src/pages
```

## 📸 Referencias visuales

- Inspiración: https://proyectored.com.mx/
- Sitio en producción: https://mantenimientodeextintores.mx/

## 📚 Histórico de cambios

| Fecha | Versión | Cambio |
|---|---|---|
| 2026-05-05 | 2.0 | Rewrite completo: dark theme, eyebrow chip, service strip, variantes home/page |
| (anterior) | 1.x | Versión clara con stats card y trust chips |
