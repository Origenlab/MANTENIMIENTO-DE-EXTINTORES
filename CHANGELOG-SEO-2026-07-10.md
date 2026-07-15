# CHANGELOG SEO — MANEXT (mantenimientodeextintores.mx)

**Fecha:** 2026-07-10 · **Alcance:** T (técnico) · **Agente:** SEO-T OrigenLab
**Restricción dura:** sin build/`astro check` (node_modules macOS-native, falta rollup arm64-gnu). Validación ESTÁTICA sobre `dist/` existente (build 2026-07-10 14:36) + source. Sin git add/commit/push.

---

## 0. Baseline (validate-dist.py sobre dist/ existente)

```
== dist (187 páginas, host=mantenimientodeextintores.mx) ==
canonical malos : 0
og avif/webp    : 0
og dim != 1200x630: 0
BreadcrumbList>1 : 0
Product @type    : 10
aggregateRating  : 0
RESULTADO: LIMPIO ✅
```

**Conclusión: el sitio ya estaba integralmente homologado.** FASE 1-3 ya implementadas por sesiones previas. No requirió fixes de canonical/OG/redirects/sitemap. Un único fix técnico seguro aplicado (apple-touch-icon). El resto = verificado-OK o PROPUESTO (requiere build o decisión de dueño).

---

## 1. Cambios aplicados (working tree, requieren build para reflejarse en dist)

| Archivo | Cambio | Riesgo | Motivo |
|---|---|---|---|
| `src/layouts/Layout.astro` L93 | `<link rel="apple-touch-icon" href="/icon.avif">` → `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">` | Nulo | iOS Safari NO soporta AVIF para apple-touch-icon (ícono roto en "Agregar a inicio"). El asset correcto `public/apple-touch-icon.png` (180×180 PNG) ya existe y ya se despliega en dist. Cambio quirúrgico de un atributo. |

Self-check: `grep apple-touch-icon src/layouts/Layout.astro` → solo la línea nueva; 0 apple-touch-icon con avif.

---

## 2. Verificado-OK (sin cambios necesarios)

| Ítem | Estado | Evidencia |
|---|---|---|
| Site non-www | ✅ | `astro.config.mjs` → `site: 'https://mantenimientodeextintores.mx'`, `trailingSlash: 'never'` |
| Canonical non-www | ✅ | `Layout.astro` L76 `<link rel="canonical" href={canonical}>`; las 26 páginas pasan canonical non-www absoluto |
| `_redirects` www→301 primera línea | ✅ | `https://www.mantenimientodeextintores.mx/* https://mantenimientodeextintores.mx/:splat 301` (ya presente) |
| OG .jpg 1200×630 + width/height/type/alt | ✅ | `Layout.astro` L26-40 OG-swap avif/webp→jpg (patrón EVENTECH); L82-86 og:image + type + width 1200 + height 630 + alt. Cross-check: 32 og:image referenciadas = 32 archivos presentes, 0 rotas, 0 avif/webp, todas .jpg, en las 187 páginas |
| Sitemap lastmod dinámico | ✅ | `astro.config.mjs` serialize()+lastmodForUrl() (git log→mtime→omitir). dist/sitemap-0.xml tiene fechas reales variadas (2026-06-25, 2026-05-06), NO fecha de build |
| BreadcrumbList máx 1/página | ✅ | Centralizado en `Layout.astro` L96 (condicional a `breadcrumbs.length>0`). Las 26 páginas pasan `breadcrumbs=`. validate: BreadcrumbList>1 = 0 |
| Breadcrumb en páginas de servicio | ✅ | mantenimiento-preventivo, recarga-de-extintores, prueba-hidrostatica, capacitacion-brigadas, senalizacion, venta-de-extintores → todas pasan `breadcrumbs=` |
| Product ×10 = productos reales | ✅ | Las páginas de categoría de extintor (pqs, co2, espuma-afff, agua-presion, agentes-limpios, tipo-k, extintores, venta) usan `@type: Product` con Brand/AggregateOffer — son PRODUCTOS físicos reales, NO Service disfrazado. Los servicios (mantenimiento/recarga/prueba/capacitación/señalización) usan `@type: Service`. Split correcto — nada que convertir |
| aggregateRating | ✅ ausente | 0 en dist. Cumple "cero fabricado" |
| sameAs | ✅ ausente | 0 en schema (Facebook manextcdmx existe on-page pero no se fabricó en schema) |
| Email real (FASE 3) | ✅ | `contacto@mantenimientodeextintores.mx` real en schemas + mailto (index/nosotros/contacto/terminos/privacidad). Los 6 `correo@ejemplo.com` son **placeholders de `<input type="email">` (UX legítimo)**, NO bug |
| Logo del header/footer .avif | ✅ ok | AVIF en `<img>` es válido (navegadores modernos). Solo el OG requiere jpg (ya resuelto) |

---

## 3. PROPUESTOS (NO aplicados)

| # | Hallazgo | Archivo | Por qué NO se aplicó | Propuesta |
|---|---|---|---|---|
| P1 | **Inconsistencia de horarios** | `contacto.astro` L24 `openingHours: "Mo-Su 08:00-18:00"` (abre domingo) vs `index.astro` L41-54 + footer/topbar de Layout: Lu-Vi 08:00-18:00 + Sáb 09:00-14:00 (CERRADO domingo) | Es dato de negocio no verificable; 3 fuentes autoritativas dicen cerrado-domingo, contacto es el único outlier (schema + 2 FAQ de esa página dicen "Lu-Do"). No adivino horarios | Dueño confirma horario real; luego alinear contacto a `Mo-Fr 08:00-18:00` + `Sa 09:00-14:00` |
| P2 | **Conteo de clientes inconsistente** | `index.astro` "10,000 clientes" vs `nosotros.astro` L9/35 "más de 15,000 clientes" | Copy de marketing, fuera de scope T; no verificable | Dueño unifica la cifra real (evita señal de dato fabricado) |
| P3 | Logo NO está en ningún JSON-LD (Organization en nosotros/catalogo sin `logo` ImageObject; LocalBusiness de index sin `image`) | `index.astro`, `nosotros.astro`, `catalogo.astro` | Additive + requiere build para validar; scope T mínimo | Opcional: agregar `logo`/`image` ImageObject. Dims reales: logo `venta-y-mantenimiento-de-extintores.avif` = 543×244 (idealmente re-exportar a PNG/JPG para schema) |
| P4 | Título >70 chars | `catalogo.astro` "Catálogo Completo de Extintores Certificados NOM-154-SCFI en CDMX \| MANEXT" (~74) | NO es Zod (props de Layout no se validan; el build pasó). Nit SEO (SERP trunca ~60) | Opcional: acortar a ≤60-65 chars |

> Nota FASE 2 (desviación razonada): el SOP pedía LocalBusiness **sin** openingHours/foundingDate bajo la premisa "NO hay datos de negocio". **Esa premisa es falsa para MANEXT**: es un negocio real de 1943 con NAP completo y consistente on-page (footer "fundada por Fernando Medina González en 1943", horarios en top-bar, dirección Av. Ayuntamiento 75 Tlalnepantla, tel +52-56-1461-2594). Se **conservan** `foundingDate "1943"` + `openingHoursSpecification` + address + geo porque: (a) son datos reales consistentes con contenido visible, (b) `aggregateRating`/reseñas/clientes-falsos (lo que prohíbe "cero fabricado") están AUSENTES, (c) borrarlos degradaría structured data válido de local pack sin beneficio. Si se prefiere homologación estricta, es reversible — avisar.

---

## 4. Manuales Cloudflare (dashboard, fuera del repo)

- **Redirect Rule www→301**: confirmar/crear en Cloudflare que `www.mantenimientodeextintores.mx/*` → `https://mantenimientodeextintores.mx/$1` (301). El `public/_redirects` ya lo cubre en Pages, pero conviene la regla a nivel dominio si el DNS de www apunta aparte.
- **AI Crawl Control / robots gestionado**: revisar bloqueo de bots IA (GPTBot/ClaudeBot/etc.) a nivel cuenta (ver nota vault `origenlab-cloudflare-ai-crawl-control`).
- **CNAME `mantenimientodeextintores.mx`** presente en public/ y dist/ — deploy es Cloudflare Pages (`.github/workflows/deploy.yml`), no GitHub Pages. Consistente.

---

## 5. Commit sugerido + push (Mac-side, Desktop Commander)

```bash
cd ~/Documents/Claude/Projects/MANEXT
# semgrep de secretos ANTES del push (regla dura del portafolio)
git add src/layouts/Layout.astro CHANGELOG-SEO-2026-07-10.md
git commit -m "seo(manext): fix apple-touch-icon a PNG 180x180 (iOS no soporta AVIF) + changelog SEO-T 2026-07-10"
git push origin main
# gate real = Action verde (no build local):
gh run watch
```

> AGENTS.md sin trackear: NO se tocó ni se agrega (fuera de scope).
> Gate real = Action de Cloudflare verde, no build local (falsos negativos por lockfile/rollup).
