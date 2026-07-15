# Catalogo Fichas SEO Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reescribir las 46 fichas MANEXT con intención, voz, argumentos, limitaciones, FAQs y metadatos individuales, conservando layout y URLs.

**Architecture:** Crear `catalog-product-editorial.mjs` como fuente editorial indexada por `id` y combinarla con los datos comerciales en `catalog-product-details.mjs`. El template seguirá siendo único, pero consumirá contenido y enlaces propios de cada producto.

**Tech Stack:** Astro 6, JavaScript ESM, Node Test Runner, JSON-LD y CSS sin animaciones fuera de botones.

## Global Constraints

- Mantener exactamente 46 URLs actuales bajo `/catalogo/`.
- No publicar precio, `Offer`, rating, inventario, certificación o entrega no verificados.
- Un keyword, title, meta description, escenario y conjunto de FAQs únicos por ficha.
- Title de hasta 60 caracteres y meta description completa de 120 a 160 caracteres.
- FAQ schema idéntico a las preguntas visibles.
- Astro debe escapar los datos editoriales; no usar `set:html` con ellos.
- No añadir animaciones o transiciones salvo en botones.

---

### Task 1: Contrato editorial y prueba RED

**Files:**
- Create: `src/data/catalog-product-editorial.mjs`
- Modify: `tests/catalog-product-detail.test.mjs`

**Interfaces:**
- Exporta `catalogProductEditorial`, objeto congelado indexado por los 46 `product.id`.
- Exporta `getCatalogProductEditorial(id)`.
- Cada perfil contiene `primaryKeyword`, `secondaryKeywords`, `searchIntent`, `buyerScenario`, `valuePromise`, `selectionFocus`, `differentiator`, `notFor`, `humanLead`, `humanDescription`, `benefitAngles`, `faqs` e `internalLinks`.

- [ ] Escribir una prueba que compare exactamente los ids editoriales contra `catalogProducts`.
- [ ] Exigir keyword único, tres keywords secundarios, escenario de 90 caracteres, lead de 140, descripción de 180, cuatro beneficios, cinco FAQs y tres enlaces.
- [ ] Prohibir las tres preguntas repetidas detectadas: “¿Requiere validación técnica?”, “¿La cotización puede incluir instalación y señalización?” y “¿MANEXT ofrece mantenimiento y atención posterior?”.
- [ ] Ejecutar `node --test tests/catalog-product-detail.test.mjs` y confirmar FAIL porque el módulo no existe.
- [ ] Crear el módulo con `export const catalogProductEditorial = Object.freeze({});` y `getCatalogProductEditorial`.
- [ ] Repetir la prueba y confirmar FAIL por los 46 ids ausentes.

### Task 2: Quince perfiles portátiles

**Files:**
- Modify: `src/data/catalog-product-editorial.mjs`
- Test: `tests/catalog-product-detail.test.mjs`

**Exact ids:** `pqs-abc-portatil`, `pqs-bc-portatil`, `purple-k-portatil`, `co2-portatil`, `agua-presion-portatil`, `agua-nebulizada`, `espuma-afff-portatil`, `espuma-ar-afff`, `espuma-f3`, `tipo-k-portatil`, `hfc-236fa-portatil`, `halotron-portatil`, `clase-d-cloruro-sodio`, `clase-d-grafito-cobre`, `ion-litio-avd`.

- [ ] Escribir prueba de cobertura para los 15 ids y confirmar FAIL en `pqs-abc-portatil`.
- [ ] Redactar el perfil completo de cada id con el contrato de Task 1.
- [ ] Diferenciar residuos, mecanismo, combustibles, rating, capacidad, maniobrabilidad y daño colateral.
- [ ] Formular cinco dudas reales por producto; ninguna pregunta puede ser compartida literalmente entre fichas.
- [ ] Añadir tres enlaces internos coherentes por producto hacia agente, servicio, señalización, sector o guía.
- [ ] Ejecutar la prueba: el segmento portátil debe pasar y el contrato global debe seguir fallando.

### Task 3: Trece perfiles industriales y automáticos

**Files:**
- Modify: `src/data/catalog-product-editorial.mjs`
- Test: `tests/catalog-product-detail.test.mjs`

**Industriales:** `pqs-abc-rodante`, `pqs-bc-rodante`, `purple-k-rodante`, `co2-rodante`, `espuma-rodante`, `clase-d-rodante`, `pqs-alto-flujo`, `operado-cartucho`.

**Automáticos:** `automatico-techo-pqs`, `automatico-agente-limpio`, `detextintor`, `compartimiento-motor`, `sistema-campana-cocina`.

- [ ] Escribir prueba de cobertura para los 13 ids y confirmar FAIL en `pqs-abc-rodante`.
- [ ] Redactar ocho perfiles industriales centrados en caudal, alcance, movilidad, superficie y preparación del operador.
- [ ] Redactar cinco perfiles automáticos centrados en geometría, activación, ventilación, cobertura y mantenimiento.
- [ ] Evitar presentar un equipo rodante como sustituto automático o un dispositivo automático como sistema diseñado sin levantamiento.
- [ ] Ejecutar la prueba: el segmento debe pasar y el contrato global debe seguir fallando.

### Task 4: Dieciocho perfiles de accesorios y refacciones

**Files:**
- Modify: `src/data/catalog-product-editorial.mjs`
- Test: `tests/catalog-product-detail.test.mjs`

**Accesorios:** `gabinete-metalico`, `gabinete-fibra-inoxidable`, `soporte-pared`, `soporte-vehicular`, `portaextintor-piso`, `funda-extintor`, `carro-portaextintor`, `senalizacion-extintor`, `manta-contra-incendio`, `alarma-gabinete`.

**Refacciones:** `valvulas-accionamiento`, `manometros-extintor`, `mangueras-boquillas`, `trompeta-co2`, `sellos-empaques`, `ruedas-ejes`, `agentes-pqs-especiales`, `concentrados-soluciones`.

- [ ] Escribir prueba de cobertura para los 18 ids y confirmar FAIL en `gabinete-metalico`.
- [ ] Redactar accesorios desde instalación, visibilidad, resguardo, movilidad o control; no atribuirles capacidad de extinción.
- [ ] Redactar refacciones desde marca, modelo, válvula, agente, dimensiones, trazabilidad y servicio profesional.
- [ ] Ejecutar el contrato global y confirmar 46 perfiles completos y únicos.

### Task 5: Integración en datos y template

**Files:**
- Modify: `src/data/catalog-product-details.mjs`
- Modify: `src/components/catalog/ProductDetailTemplate.astro`
- Modify: `public/css/catalog-product-detail.css`
- Test: `tests/catalog-product-detail.test.mjs`

**Interfaces:**
- Consume `getCatalogProductEditorial(product.id)`.
- Cada detalle expone `primaryKeyword`, `secondaryKeywords`, `searchIntent`, `selectionFocus`, `differentiator`, `notFor` e `internalLinks`.

- [ ] Escribir assertions RED: `detail.lead === editorial.humanLead`, `detail.description === editorial.humanDescription`, FAQs y enlaces iguales.
- [ ] Ejecutar la prueba y confirmar que falla porque las fichas aún usan texto generado.
- [ ] Crear `applyEditorialProfile(detail, editorial)` y aplicarlo también a CO₂ y HFC-236fa.
- [ ] Sustituir beneficios, FAQs, lead, descripción, titles y metas por datos editoriales sin eliminar especificaciones verificables existentes.
- [ ] Renderizar un bloque `product-detail__related-links` antes de referencias con los tres enlaces internos.
- [ ] Estilizar el bloque sin `transform`, keyframes o transiciones en contenedores.
- [ ] Ejecutar la prueba focal y confirmar PASS.

### Task 6: Construcción y auditoría SEO final

**Files:**
- Modify: `tests/catalog-product-detail.test.mjs`

- [ ] Extender pruebas de HTML construido para exigir lead individual, enlaces internos, FAQ visible y schema equivalente.
- [ ] Ejecutar antes de construir y confirmar FAIL por salida `dist` desactualizada.
- [ ] Ejecutar `npm run build`; confirmar 46 rutas de ficha y código 0.
- [ ] Ejecutar `npm test`; esperar 0 fallos.
- [ ] Ejecutar `npx astro check`; esperar 0 errores.
- [ ] Ejecutar `git diff --check`; esperar salida limpia.
- [ ] Confirmar HTTP 200 para `/catalogo`, `/catalogo/pqs-abc-portatil`, `/catalogo/sistema-campana-cocina`, `/catalogo/gabinete-metalico` y `/catalogo/concentrados-soluciones` en el puerto 4310.

