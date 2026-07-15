# Matriz de expansión de 230 productos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Investigar, definir y validar cinco productos derivados reales para cada una de las 46 familias actuales, entregando una matriz auditable de 230 propuestas sin publicarlas todavía en el catálogo.

**Architecture:** Las propuestas se escribirán en cinco módulos de datos separados por grupo y se agregarán mediante un índice que no será importado por el sitio en esta fase. Una prueba de contrato verificará conteos, relaciones padre-hijo, originalidad SEO, fuentes y estados. Un libro `.xlsx`, un informe de mercado y los espejos de memoria convertirán esos datos en un entregable revisable antes de crear cards o fichas públicas.

**Tech Stack:** Node.js ESM, `node:test`, Astro 6 sólo para la verificación de regresión, `@oai/artifact-tool` para el libro `.xlsx`, Markdown, Git.

## Global Constraints

- La ruta pública vigente es `/catalogo/[slug]`; `/productos/[...slug]` permanece legacy.
- Las 46 familias actuales permanecen como páginas matriz.
- Deben existir exactamente cinco propuestas por familia: 230 en total.
- Ninguna propuesta se integra en `catalogProducts` ni `catalogProductDetails` durante esta fase.
- El modelo comercial es “Cotización personalizada”; no se inventan precios, ofertas, ratings, stock, marcas ni certificaciones.
- Toda afirmación técnica requiere fuente primaria; competidores y marketplaces sólo sirven como señal de mercado.
- La NOM-154-SCFI-2005 se describe como norma del servicio de mantenimiento y recarga, no como certificación automática del producto.
- FAQ y cotización seguirán formando un módulo de dos columnas cuando las fichas se publiquen.
- No se permiten animaciones ni transiciones fuera de botones y CTA.
- El trabajo debe partir de `origin/main` en un worktree aislado creado con `using-git-worktrees`.
- El diseño rector es `docs/superpowers/specs/2026-07-15-expansion-230-productos-design.md`.

---

## File Map

| Archivo | Responsabilidad |
|---|---|
| `src/data/catalog-expansion/schema.mjs` | Validación del contrato de una propuesta antes de publicarla. |
| `src/data/catalog-expansion/portables.mjs` | 75 propuestas para 15 familias portátiles. |
| `src/data/catalog-expansion/industrial.mjs` | 40 propuestas para 8 familias móviles e industriales. |
| `src/data/catalog-expansion/automatic.mjs` | 25 propuestas para 5 familias automáticas. |
| `src/data/catalog-expansion/accessories.mjs` | 50 propuestas para 10 familias de accesorios. |
| `src/data/catalog-expansion/parts.mjs` | 40 propuestas para 8 familias de refacciones y consumibles. |
| `src/data/catalog-expansion/index.mjs` | Agregación de las 230 propuestas; no se conecta al runtime. |
| `tests/catalog-expansion-proposals.test.mjs` | Contratos de conteo, relación, SEO, fuentes y originalidad. |
| `scripts/build-catalog-expansion-workbook.mjs` | Generación del libro de trabajo con `@oai/artifact-tool`. |
| `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx` | Matriz final revisable. |
| `docs/research/2026-07-15-estudio-mercado-expansion-230-productos.md` | Metodología, hallazgos, fuentes y recomendaciones. |
| `docs/catalogo/EXPANSION-230-PRODUCTOS.md` | Guía operativa para convertir propuestas aprobadas en fichas. |
| `graphify-out/CATALOG-EXPANSION-230.md` | Espejo Graphify. |
| `docs/obsidian/Productos — Expansión 230.md` | Nota Obsidian del proyecto. |
| `MEMORY.md` | Regla permanente y estado de la expansión. |

---

### Task 1: Crear el contrato de propuestas y sus pruebas

**Files:**
- Create: `src/data/catalog-expansion/schema.mjs`
- Create: `src/data/catalog-expansion/index.mjs`
- Create: `tests/catalog-expansion-proposals.test.mjs`

**Interfaces:**
- Consumes: `catalogProducts` desde `src/data/catalog-products.mjs`.
- Produces: `validateExpansionProposal(proposal)`, `catalogExpansionProposals`, `catalogExpansionByParent`.

- [ ] **Step 1: Escribir la prueba fallida del contrato base**

La prueba debe importar `catalogExpansionProposals`, comprobar 230 registros y verificar estos campos en cada propuesta:

```js
const requiredStrings = [
  'id', 'parentId', 'group', 'name', 'shortName', 'slug',
  'differentiationType', 'need', 'valueProposition', 'primaryKeyword',
  'searchIntent', 'h1', 'seoTitle', 'metaDescription', 'cardAnchor',
  'quoteProduct', 'status', 'priority', 'sourceReviewedAt',
];

assert.equal(catalogExpansionProposals.length, 230);
for (const proposal of catalogExpansionProposals) {
  for (const field of requiredStrings) {
    assert.equal(typeof proposal[field], 'string', `${field} missing in ${proposal.id}`);
    assert.ok(proposal[field].trim().length > 0, `${field} empty in ${proposal.id}`);
  }
  assert.ok(proposal.primarySources.length >= 1, `primary source missing in ${proposal.id}`);
  assert.ok(proposal.limitations.length >= 1, `limitation missing in ${proposal.id}`);
}
```

- [ ] **Step 2: Ejecutar la prueba para confirmar el fallo**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: FAIL con `ERR_MODULE_NOT_FOUND` para `src/data/catalog-expansion/index.mjs`.

- [ ] **Step 3: Implementar el validador y el agregador vacío**

`schema.mjs` debe rechazar IDs/slugs fuera de `^[a-z0-9]+(?:-[a-z0-9]+)*$`, URLs no HTTP(S), titles mayores de 60 caracteres, meta descriptions fuera de 120–160 caracteres, estados fuera de `research|validated|approved|rejected` y prioridades fuera de `alta|media|especialidad`.

`index.mjs` debe importar los cinco módulos por grupo, concatenarlos y exportar un `Map` por `parentId`.

- [ ] **Step 4: Añadir invariantes globales a la prueba**

Comprobar:

```js
assert.equal(new Set(ids).size, 230, 'proposal ids must be unique');
assert.equal(new Set(slugs).size, 230, 'proposal slugs must be unique');
assert.equal(new Set(keywords).size, 230, 'primary keywords must be unique');
assert.equal(new Set(seoTitles).size, 230, 'SEO titles must be unique');

for (const parent of catalogProducts) {
  assert.equal(catalogExpansionByParent.get(parent.id)?.length, 5, `expected five children for ${parent.id}`);
}
```

- [ ] **Step 5: Confirmar que la prueba falla sólo por falta de datos**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: FAIL con conteo `0 !== 230`, demostrando que el contrato y el import funcionan.

- [ ] **Step 6: Commit**

```bash
git add src/data/catalog-expansion tests/catalog-expansion-proposals.test.mjs
git commit -m "test: define contrato para expansion del catalogo"
```

---

### Task 2: Investigar y definir 75 productos portátiles

**Files:**
- Create: `src/data/catalog-expansion/portables.mjs`
- Modify: `tests/catalog-expansion-proposals.test.mjs`

**Interfaces:**
- Consumes: contrato de `schema.mjs` y padres del grupo `portatiles`.
- Produces: `portableExpansionProposals` con exactamente 75 objetos.

- [ ] **Step 1: Añadir la prueba de cobertura portátil**

Debe exigir cinco hijos para cada ID:

```js
const portableParents = [
  'pqs-abc-portatil', 'pqs-bc-portatil', 'purple-k-portatil', 'co2-portatil',
  'agua-presion-portatil', 'agua-nebulizada', 'espuma-afff-portatil', 'espuma-ar-afff',
  'espuma-f3', 'tipo-k-portatil', 'hfc-236fa-portatil', 'halotron-portatil',
  'clase-d-cloruro-sodio', 'clase-d-grafito-cobre', 'ion-litio-avd',
];
assert.equal(portableExpansionProposals.length, 75);
```

- [ ] **Step 2: Ejecutar la prueba y confirmar el fallo `0 !== 75`**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`

- [ ] **Step 3: Investigar las cinco diferencias comerciales de cada familia**

Para cada padre, contrastar normativa mexicana y al menos un catálogo/manual oficial de fabricante. Registrar capacidad/configuración, aplicación, limitación y URL específica. No usar una capacidad como página separada si no existe demanda o diferencia suficiente; sustituirla por construcción, montaje, formulación o aplicación documentada.

- [ ] **Step 4: Redactar los 75 objetos completos**

Cada objeto debe incluir arrays `fireClasses`, `variants`, `applications`, `sectors`, `limitations`, `primarySources` y `normativeSources`. El contenido de `need`, `valueProposition`, `searchIntent`, `h1`, `seoTitle`, `metaDescription` y `cardAnchor` debe ser original.

- [ ] **Step 5: Ejecutar pruebas de contrato y originalidad**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: la cobertura portátil pasa; el conteo global continúa fallando con `75 !== 230`.

- [ ] **Step 6: Commit**

```bash
git add src/data/catalog-expansion/portables.mjs tests/catalog-expansion-proposals.test.mjs
git commit -m "data: investiga 75 productos portatiles"
```

---

### Task 3: Investigar y definir 40 productos móviles e industriales

**Files:**
- Create: `src/data/catalog-expansion/industrial.mjs`
- Modify: `tests/catalog-expansion-proposals.test.mjs`

**Interfaces:**
- Produces: `industrialExpansionProposals` con 40 objetos.

- [ ] **Step 1: Probar cinco hijos para los ocho padres**

```js
const industrialParents = [
  'pqs-abc-rodante', 'pqs-bc-rodante', 'purple-k-rodante', 'co2-rodante',
  'espuma-rodante', 'clase-d-rodante', 'pqs-alto-flujo', 'operado-cartucho',
];
assert.equal(industrialExpansionProposals.length, 40);
```

- [ ] **Step 2: Confirmar el fallo**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: FAIL `0 !== 40`.

- [ ] **Step 3: Investigar por capacidad, caudal, presurización, agente y ambiente**

Usar fichas oficiales de unidades móviles, manuales de operación y NOM-002-STPS-2010. No inferir alcance, descarga o rating a partir del peso nominal.

- [ ] **Step 4: Redactar y validar los 40 objetos**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: portátiles e industriales pasan; global falla con `115 !== 230`.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-expansion/industrial.mjs tests/catalog-expansion-proposals.test.mjs
git commit -m "data: investiga 40 productos industriales"
```

---

### Task 4: Investigar y definir 25 productos automáticos

**Files:**
- Create: `src/data/catalog-expansion/automatic.mjs`
- Modify: `tests/catalog-expansion-proposals.test.mjs`

**Interfaces:**
- Produces: `automaticExpansionProposals` con 25 objetos.

- [ ] **Step 1: Probar cinco hijos para los cinco padres**

```js
const automaticParents = [
  'automatico-techo-pqs', 'automatico-agente-limpio', 'detextintor',
  'compartimiento-motor', 'sistema-campana-cocina',
];
assert.equal(automaticExpansionProposals.length, 25);
```

- [ ] **Step 2: Confirmar el fallo `0 !== 25`**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`

- [ ] **Step 3: Investigar mecanismo, agente, zona protegida y documentación**

Cada propuesta debe explicar que cobertura, activación, detección, boquillas, volumen y compatibilidad se confirman mediante diseño/listado. No presentar una unidad local como sustituto universal de un sistema fijo.

- [ ] **Step 4: Redactar y validar los 25 objetos**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: los tres grupos pasan; global falla con `140 !== 230`.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-expansion/automatic.mjs tests/catalog-expansion-proposals.test.mjs
git commit -m "data: investiga 25 productos automaticos"
```

---

### Task 5: Investigar y definir 50 accesorios

**Files:**
- Create: `src/data/catalog-expansion/accessories.mjs`
- Modify: `tests/catalog-expansion-proposals.test.mjs`

**Interfaces:**
- Produces: `accessoryExpansionProposals` con 50 objetos.

- [ ] **Step 1: Probar cinco hijos para los diez padres**

```js
const accessoryParents = [
  'gabinete-metalico', 'gabinete-fibra-inoxidable', 'soporte-pared', 'soporte-vehicular',
  'portaextintor-piso', 'funda-extintor', 'carro-portaextintor', 'senalizacion-extintor',
  'manta-contra-incendio', 'alarma-gabinete',
];
assert.equal(accessoryExpansionProposals.length, 50);
```

- [ ] **Step 2: Confirmar el fallo `0 !== 50`**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`

- [ ] **Step 3: Investigar material, montaje, ambiente y compatibilidad**

Documentar dimensiones/compatibilidad como datos a confirmar, salvo que una ficha oficial sustente un modelo específico. Separar señal normativa, direccional, bandera, fotoluminiscente y piso sólo cuando sean productos distintos.

- [ ] **Step 4: Redactar y validar los 50 objetos**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: cuatro grupos pasan; global falla con `190 !== 230`.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-expansion/accessories.mjs tests/catalog-expansion-proposals.test.mjs
git commit -m "data: investiga 50 accesorios del catalogo"
```

---

### Task 6: Investigar y definir 40 refacciones y consumibles

**Files:**
- Create: `src/data/catalog-expansion/parts.mjs`
- Modify: `tests/catalog-expansion-proposals.test.mjs`

**Interfaces:**
- Produces: `partsExpansionProposals` con 40 objetos y completa el total de 230.

- [ ] **Step 1: Probar cinco hijos para los ocho padres**

```js
const partsParents = [
  'valvulas-accionamiento', 'manometros-extintor', 'mangueras-boquillas', 'trompeta-co2',
  'sellos-empaques', 'ruedas-ejes', 'agentes-pqs-especiales', 'concentrados-soluciones',
];
assert.equal(partsExpansionProposals.length, 40);
```

- [ ] **Step 2: Confirmar el fallo `0 !== 40`**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`

- [ ] **Step 3: Investigar compatibilidad y función**

Cada ficha debe pedir marca/modelo, rosca, presión, dimensión, material o formulación pertinente. No usar “universal” salvo documentación específica. Los agentes de recarga se describirán como insumos para servicio profesional.

- [ ] **Step 4: Redactar y validar los 40 objetos**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: PASS; 230 propuestas, 46 padres y cinco hijos por padre.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-expansion/parts.mjs tests/catalog-expansion-proposals.test.mjs
git commit -m "data: completa matriz de 230 productos"
```

---

### Task 7: Auditar SEO, similitud y fuentes

**Files:**
- Modify: `tests/catalog-expansion-proposals.test.mjs`
- Modify: `src/data/catalog-expansion/*.mjs`

**Interfaces:**
- Consumes: 230 propuestas completas.
- Produces: conjunto aprobado sin colisiones con las 46 fichas actuales.

- [ ] **Step 1: Añadir pruebas de colisión con catálogo actual**

Comparar IDs, slugs, keywords, H1, titles y canonicals propuestos contra las 46 fichas actuales. Exigir `sourceReviewedAt === '2026-07-15'` o una fecha posterior y al menos una fuente primaria HTTP(S).

- [ ] **Step 2: Añadir una prueba de similitud editorial**

Normalizar minúsculas, acentos y stopwords; calcular Jaccard sobre tokens para `need + valueProposition + searchIntent`. Fallar cuando dos propuestas superen `0.72`, imprimiendo ambos IDs para revisión manual.

- [ ] **Step 3: Ejecutar y corregir colisiones una por una**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: PASS con 230 IDs, slugs, keywords y titles únicos; ninguna pareja sobre el umbral.

- [ ] **Step 4: Revisar manualmente las familias de mayor riesgo**

Revisar CO₂ por capacidades, PQS ABC/BC, AFFF/AR-AFFF/F3, clase D, ion-litio, HFC/Halotron, gabinetes, soportes, sellos y agentes de recarga. Documentar sustituciones en `notes`.

- [ ] **Step 5: Commit**

```bash
git add src/data/catalog-expansion tests/catalog-expansion-proposals.test.mjs
git commit -m "test: valida originalidad y fuentes de 230 propuestas"
```

---

### Task 8: Generar y verificar el libro profesional

**Files:**
- Create: `scripts/build-catalog-expansion-workbook.mjs`
- Create: `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx`

**Interfaces:**
- Consumes: `catalogExpansionProposals`.
- Produces: un libro con hojas `Resumen`, `Matriz 230`, `Fuentes` y `Criterios`.

- [ ] **Step 1: Cargar las dependencias oficiales del workspace**

Usar `codex_app__load_workspace_dependencies`, crear un symlink `node_modules` en un directorio temporal de trabajo y confirmar que `@oai/artifact-tool` está disponible. No instalar dependencias ni usar otra librería de Excel.

- [ ] **Step 2: Construir el workbook**

`Resumen` debe mostrar mediante fórmulas: total 230, 46 padres, 5 grupos, conteo por grupo y conteo por estado. `Matriz 230` contendrá una fila por propuesta con filtros, encabezado congelado y URLs visibles. `Fuentes` deduplicará las URLs con su tipo. `Criterios` explicará campos, estados y reglas.

- [ ] **Step 3: Aplicar formato MANEXT**

Usar carbón `#111111`, rojo `#D32F2F`, fondo `#F6F5F2`, encabezados blancos, gridlines ocultas, filtros, anchos limitados y texto envuelto sólo en columnas descriptivas. Añadir validación de datos para `status` y `priority`.

- [ ] **Step 4: Inspeccionar datos y errores**

Con `workbook.inspect`, revisar `Resumen!A1:H20` y las primeras/últimas filas de `Matriz 230`. Buscar `#REF!|#DIV/0!|#VALUE!|#NAME?|#N/A`; el resultado esperado es cero coincidencias.

- [ ] **Step 5: Renderizar las cuatro hojas**

Crear previews PNG temporales de cada hoja, inspeccionarlos visualmente y corregir cualquier encabezado, cifra o texto recortado. No conservar previews como entregables.

- [ ] **Step 6: Exportar el `.xlsx` final**

Guardar exactamente `outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx` y confirmar que el archivo existe y tiene tamaño mayor que cero.

- [ ] **Step 7: Commit**

```bash
git add scripts/build-catalog-expansion-workbook.mjs outputs/catalogo-expansion-230/matriz-expansion-230-productos-manext.xlsx
git commit -m "docs: genera matriz profesional de 230 productos"
```

---

### Task 9: Documentar investigación, operación, Graphify y Obsidian

**Files:**
- Create: `docs/research/2026-07-15-estudio-mercado-expansion-230-productos.md`
- Create: `docs/catalogo/EXPANSION-230-PRODUCTOS.md`
- Create: `graphify-out/CATALOG-EXPANSION-230.md`
- Create: `docs/obsidian/Productos — Expansión 230.md`
- Modify: `docs/obsidian/INDEX.md`
- Modify: `MEMORY.md`

**Interfaces:**
- Consumes: especificación, matriz, fuentes y resultados de pruebas.
- Produces: documentación humana y memoria permanente.

- [ ] **Step 1: Escribir el estudio de mercado**

Incluir metodología, panorama de las cinco categorías, señales observables, fuentes primarias, riesgos regulatorios, oportunidades SEO, criterios de priorización y un resumen de las 230 propuestas por grupo. Separar hechos, inferencias y recomendaciones.

- [ ] **Step 2: Escribir la guía de operación**

Documentar cómo aprobar/rechazar una fila, cómo convertir una propuesta en card/detalle, qué campos deben investigarse nuevamente al publicar, cómo evitar duplicidad y cuál será el orden de los cinco planes de implementación.

- [ ] **Step 3: Crear los espejos**

`graphify-out/CATALOG-EXPANSION-230.md` y `docs/obsidian/Productos — Expansión 230.md` deben resumir la misma arquitectura, enlazar la matriz, la especificación y la guía, y declarar que las 230 propuestas aún no están publicadas.

- [ ] **Step 4: Actualizar memoria e índice**

Añadir a `MEMORY.md` la existencia del blueprint, su ubicación, el total 230 y la prohibición de importar propuestas no aprobadas al catálogo. Añadir la nota nueva a `docs/obsidian/INDEX.md`.

- [ ] **Step 5: Verificar documentación**

Run: `rg -n "T[B]D|T[O]DO|por def[inir]|pendiente de redac[tar]" docs/research/2026-07-15-estudio-mercado-expansion-230-productos.md docs/catalogo/EXPANSION-230-PRODUCTOS.md graphify-out/CATALOG-EXPANSION-230.md 'docs/obsidian/Productos — Expansión 230.md' MEMORY.md`
Expected: sin resultados usados como placeholders.

- [ ] **Step 6: Commit**

```bash
git add MEMORY.md docs/catalogo docs/research docs/obsidian graphify-out/CATALOG-EXPANSION-230.md
git commit -m "docs: registra expansion de 230 productos"
```

---

### Task 10: Verificación final y entrega para aprobación

**Files:**
- Verify only.

**Interfaces:**
- Produces: evidencia de que la documentación no altera el catálogo público.

- [ ] **Step 1: Ejecutar la prueba específica**

Run: `node --test tests/catalog-expansion-proposals.test.mjs`
Expected: 0 fallos y 230 propuestas válidas.

- [ ] **Step 2: Ejecutar toda la suite**

Run: `npm test`
Expected: 0 fallos.

- [ ] **Step 3: Construir el sitio**

Run: `npm run build`
Expected: exit code 0 y exactamente las 46 fichas actuales; ninguna propuesta aparece todavía como ruta pública.

- [ ] **Step 4: Verificar el alcance Git**

Run: `git diff --check origin/main...HEAD`
Expected: sin errores de whitespace.

Run: `git status --short`
Expected: working tree limpio.

- [ ] **Step 5: Entregar para revisión**

Presentar la matriz `.xlsx`, la especificación, el estudio y la guía. No integrar `src/data/catalog-expansion/index.mjs` en `catalog-products.mjs` hasta que el usuario apruebe la matriz y autorice el primer lote de publicación.

---

## Planes posteriores, deliberadamente separados

Después de aprobar la matriz se crearán cinco planes de implementación independientes:

1. publicación de 75 portátiles;
2. publicación de 40 móviles e industriales;
3. publicación de 25 automáticos;
4. publicación de 50 accesorios;
5. publicación de 40 refacciones y consumibles.

Cada plan añadirá contenido completo, cards, relaciones, pruebas, revisión visual y despliegue por lote. Esta separación permite rechazar o corregir un grupo sin bloquear los demás y evita publicar 230 fichas sin control editorial.
