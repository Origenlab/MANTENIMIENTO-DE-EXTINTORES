# Estándar FAQ Global Mínimo Ocho Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevar a un mínimo de ocho preguntas contextuales todas las secciones FAQ existentes de MANEXT, sincronizando contenido visible y schema sin introducir afirmaciones comerciales o normativas no verificadas.

**Architecture:** Un registro central `site-faqs.mjs` contendrá las FAQs de las 21 páginas Astro estáticas con `FAQPage`; un componente `FaqList.astro` renderizará los acordeones sin movimiento; y las 46 fichas dinámicas ampliarán su generador editorial de cinco a ocho preguntas. `buildFaqSchema()` será la única función para transformar datos FAQ en JSON-LD, de modo que HTML y schema consuman el mismo arreglo.

**Tech Stack:** Astro 6, JavaScript ESM, Node.js test runner, CSS estático, Schema.org `FAQPage`, Cloudflare Pages.

## Global Constraints

- Toda sección FAQ existente debe tener entre 8 y 10 preguntas visibles; el mínimo automatizado es 8.
- Las preguntas deben ser contextuales para cada producto, servicio, agente, sector o página institucional.
- No añadir FAQ a artículos o páginas que actualmente no tengan una sección FAQ.
- No publicar precios, descuentos, stock, tiempos garantizados, certificaciones o resultados regulatorios sin evidencia.
- El mismo arreglo debe alimentar el HTML visible y el schema `FAQPage`.
- No usar `set:html`, `innerHTML`, `eval` ni scripts para renderizar contenido FAQ visible; el JSON-LD conserva la serialización existente de `Layout.astro` con datos validados.
- No introducir animaciones ni transiciones fuera de botones y CTA.
- FAQ y cotización permanecen en un mismo módulo donde esa composición ya existe.
- Mantener `/catalogo/[slug]` como plantilla vigente; no crear páginas Astro individuales para las 46 fichas.
- Ejecutar `npm run build`, `npm test`, `npx astro check` y `git diff --check` antes de declarar el trabajo terminado.

## Verified primary sources

- STPS, guía informativa de NOM-002-STPS-2010: `https://www.stps.gob.mx/bp/secciones/dgsst/publicaciones/guias/Guia_002.pdf`.
- DOF, NOM-002-STPS-2010: `https://dof.gob.mx/normasOficiales/4228/stps/stps.htm`.
- Secretaría de Economía, ficha vigente de NOM-154-SCFI-2005: `https://platiica.economia.gob.mx/normalizacion/nom-154-scfi-2005/`.
- DOF, NOM-154-SCFI-2005 y modificación: `https://www.dof.gob.mx/normasOficiales/791/NOM-154-SCFI-2005/NOM-154-SCFI-2005.htm` y `https://www.dof.gob.mx/normasOficiales/4099/seeco/seeco.htm`.
- El PROY-NOM-154-SCFI-2017 no debe citarse como norma vigente; la ficha oficial de Economía continúa marcando NOM-154-SCFI-2005 como vigente.

---

### Task 1: FAQ data contract and global failing tests

**Files:**
- Create: `tests/faq-global.test.mjs`
- Create: `src/lib/faq-utils.mjs`
- Create: `docs/research/2026-07-15-faq-global-fuentes-primarias.md`

**Interfaces:**
- Consumes: arrays `{ question: string, answer: string }[]`.
- Produces: `normalizeFaqQuestion(value)`, `assertFaqCollection(route, faqs, minimum = 8)`, and `buildFaqSchema(faqs)`.

- [ ] **Step 1: Record the normative boundaries**

Create `docs/research/2026-07-15-faq-global-fuentes-primarias.md` with these exact findings:

```markdown
# Fuentes primarias para el estándar FAQ global

## NOM-002-STPS-2010

- Su objetivo es establecer requerimientos para prevención y protección contra incendios en centros de trabajo.
- La selección debe responder al riesgo y a la clase de fuego; no existe una cantidad o capacidad universal aplicable a cualquier inmueble.
- Distingue fuegos A, B, C, D y K y contempla ubicación, señalización, capacitación, simulacros y condiciones de operación.

## NOM-154-SCFI-2005

- La Secretaría de Economía la registra como vigente.
- Su campo de aplicación corresponde a personas físicas y morales que prestan mantenimiento y recarga de extintores portátiles y móviles sobre ruedas.
- No debe presentarse como certificación automática de cualquier producto vendido.
- El PROY-NOM-154-SCFI-2017 no se describirá como norma vigente.

## Regla editorial

Las FAQs deben separar capacidad nominal, rating, clase de fuego, compatibilidad, disponibilidad y alcance del servicio. Marca, modelo, documentación y configuración se confirman en la propuesta.
```

- [ ] **Step 2: Write the failing contract tests**

Create `tests/faq-global.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';
import { buildFaqSchema, normalizeFaqQuestion, assertFaqCollection } from '../src/lib/faq-utils.mjs';

const validFaqs = Array.from({ length: 8 }, (_, index) => ({
  question: `¿Pregunta contextual número ${index + 1}?`,
  answer: `Respuesta verificable número ${index + 1} con información suficiente para orientar una cotización responsable.`,
}));

test('normalizeFaqQuestion removes accents, case and duplicate whitespace', () => {
  assert.equal(normalizeFaqQuestion('  ¿QUÉ   capacidad necesito?  '), '¿que capacidad necesito?');
});

test('assertFaqCollection accepts eight complete unique questions', () => {
  assert.doesNotThrow(() => assertFaqCollection('/prueba', validFaqs));
});

test('assertFaqCollection rejects fewer than eight questions', () => {
  assert.throws(() => assertFaqCollection('/prueba', validFaqs.slice(0, 7)), /at least 8/i);
});

test('assertFaqCollection rejects normalized duplicates', () => {
  const duplicated = [...validFaqs.slice(0, 7), { question: '¿PREGUNTA CONTEXTUAL NÚMERO 1?', answer: 'Respuesta distinta pero duplicada por pregunta.' }];
  assert.throws(() => assertFaqCollection('/prueba', duplicated), /duplicate/i);
});

test('buildFaqSchema maps the visible collection without adding commercial data', () => {
  const schema = buildFaqSchema(validFaqs);
  assert.equal(schema['@context'], 'https://schema.org');
  assert.equal(schema['@type'], 'FAQPage');
  assert.equal(schema.mainEntity.length, 8);
  assert.deepEqual(schema.mainEntity[0], {
    '@type': 'Question',
    name: validFaqs[0].question,
    acceptedAnswer: { '@type': 'Answer', text: validFaqs[0].answer },
  });
  assert.doesNotMatch(JSON.stringify(schema), /offers|price|aggregateRating|stock/i);
});
```

- [ ] **Step 3: Run the tests and verify RED**

Run: `node --test tests/faq-global.test.mjs`

Expected: FAIL because `src/lib/faq-utils.mjs` does not exist.

- [ ] **Step 4: Implement the minimal utilities**

Create `src/lib/faq-utils.mjs`:

```js
export function normalizeFaqQuestion(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('es-MX');
}

export function assertFaqCollection(route, faqs, minimum = 8) {
  if (!Array.isArray(faqs) || faqs.length < minimum) {
    throw new Error(`${route} must contain at least ${minimum} FAQ entries`);
  }

  const normalized = new Set();
  for (const [index, faq] of faqs.entries()) {
    if (!faq || typeof faq.question !== 'string' || typeof faq.answer !== 'string') {
      throw new Error(`${route} FAQ ${index + 1} must contain string question and answer fields`);
    }
    if (!faq.question.trim() || !faq.answer.trim()) {
      throw new Error(`${route} FAQ ${index + 1} cannot be empty`);
    }
    const key = normalizeFaqQuestion(faq.question);
    if (normalized.has(key)) {
      throw new Error(`${route} contains duplicate FAQ question: ${faq.question}`);
    }
    normalized.add(key);
  }
  return faqs;
}

export function buildFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
```

- [ ] **Step 5: Verify GREEN**

Run: `node --test tests/faq-global.test.mjs`

Expected: 5 tests pass, 0 fail.

- [ ] **Step 6: Commit**

```bash
git add tests/faq-global.test.mjs src/lib/faq-utils.mjs docs/research/2026-07-15-faq-global-fuentes-primarias.md
git commit -m "test: define global FAQ contract"
```

---

### Task 2: Shared accessible FAQ renderer without motion

**Files:**
- Create: `src/components/FaqList.astro`
- Create: `public/css/faq-system.css`
- Modify: `src/layouts/Layout.astro`
- Modify: `tests/faq-global.test.mjs`
- Modify: `tests/motion-policy.test.mjs`

**Interfaces:**
- Consumes: `faqs`, `firstOpen`, and optional `className` props.
- Produces: `.site-faq-list` with semantic `details` and `summary` elements.

- [ ] **Step 1: Add failing source-contract tests**

Append to `tests/faq-global.test.mjs`:

```js
import { readFile } from 'node:fs/promises';

test('FaqList uses semantic details and escaped Astro interpolation', async () => {
  const source = await readFile(new URL('../src/components/FaqList.astro', import.meta.url), 'utf8');
  assert.match(source, /<details/);
  assert.match(source, /<summary/);
  assert.match(source, /\{faq\.question\}/);
  assert.match(source, /\{faq\.answer\}/);
  assert.doesNotMatch(source, /set:html|innerHTML|transition|animation/);
});

test('shared layout loads the FAQ stylesheet once', async () => {
  const source = await readFile(new URL('../src/layouts/Layout.astro', import.meta.url), 'utf8');
  assert.equal((source.match(/\/css\/faq-system\.css\?v=1/g) || []).length, 1);
});
```

Append these selectors to the existing static-selector list in `tests/motion-policy.test.mjs`:

```js
'.site-faq-list',
'.site-faq-list__item',
'.site-faq-list__question',
'.site-faq-list__answer',
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/faq-global.test.mjs tests/motion-policy.test.mjs`

Expected: FAIL because the component and stylesheet reference do not exist.

- [ ] **Step 3: Create the component**

Create `src/components/FaqList.astro`:

```astro
---
interface FAQ {
  question: string;
  answer: string;
}

interface Props {
  faqs: FAQ[];
  firstOpen?: boolean;
  className?: string;
}

const { faqs, firstOpen = false, className = '' } = Astro.props;
---

<div class:list={['site-faq-list', className]}>
  {faqs.map((faq, index) => (
    <details class="site-faq-list__item" open={firstOpen && index === 0}>
      <summary class="site-faq-list__question">
        <span>{faq.question}</span>
        <span class="site-faq-list__icon" aria-hidden="true">+</span>
      </summary>
      <div class="site-faq-list__answer">
        <p>{faq.answer}</p>
      </div>
    </details>
  ))}
</div>
```

- [ ] **Step 4: Create motion-free shared CSS**

Create `public/css/faq-system.css`:

```css
.site-faq-list {
  display: grid;
  gap: 0;
  border-top: 1px solid #d9dde3;
}

.site-faq-list__item {
  border-bottom: 1px solid #d9dde3;
  background: transparent;
}

.site-faq-list__question {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  color: #161a1d;
  cursor: pointer;
  font-weight: 700;
  line-height: 1.4;
  list-style: none;
}

.site-faq-list__question::-webkit-details-marker {
  display: none;
}

.site-faq-list__question::marker {
  content: '';
}

.site-faq-list__question:focus-visible {
  outline: 3px solid rgba(197, 26, 35, 0.28);
  outline-offset: 4px;
}

.site-faq-list__icon {
  display: grid;
  width: 1.75rem;
  height: 1.75rem;
  place-items: center;
  border: 1px solid #c51a23;
  border-radius: 50%;
  color: #c51a23;
  font-size: 1.1rem;
  line-height: 1;
}

.site-faq-list__item[open] .site-faq-list__icon {
  color: transparent;
  position: relative;
}

.site-faq-list__item[open] .site-faq-list__icon::before {
  content: '−';
  position: absolute;
  color: #c51a23;
}

.site-faq-list__answer {
  padding: 0 2.75rem 1.15rem 0;
}

.site-faq-list__answer p {
  margin: 0;
  color: #4f5964;
  line-height: 1.72;
}

@media (max-width: 620px) {
  .site-faq-list__question {
    padding: 0.9rem 0;
  }

  .site-faq-list__answer {
    padding-right: 0;
  }
}
```

Do not add `transition`, `animation`, `transform` or smooth scrolling declarations.

- [ ] **Step 5: Load the stylesheet globally**

In `src/layouts/Layout.astro`, add exactly one link beside the other global stylesheets:

```astro
<link rel="stylesheet" href="/css/faq-system.css?v=1" />
```

- [ ] **Step 6: Verify GREEN**

Run: `node --test tests/faq-global.test.mjs tests/motion-policy.test.mjs`

Expected: all targeted tests pass.

- [ ] **Step 7: Commit**

```bash
git add src/components/FaqList.astro public/css/faq-system.css src/layouts/Layout.astro tests/faq-global.test.mjs tests/motion-policy.test.mjs
git commit -m "feat: add shared accessible FAQ renderer"
```

---

### Task 3: Central registry for all 21 static FAQ pages

**Files:**
- Create: `src/data/site-faqs.mjs`
- Modify: `tests/faq-global.test.mjs`

**Interfaces:**
- Consumes: route keys.
- Produces: `siteFaqs`, `siteFaqRoutes`, and `getSiteFaqs(route)`.

- [ ] **Step 1: Add the failing registry test**

Append to `tests/faq-global.test.mjs`:

```js
import { siteFaqRoutes, siteFaqs, getSiteFaqs } from '../src/data/site-faqs.mjs';

const expectedSiteFaqRoutes = [
  '/', '/agentes-limpios', '/agua-presion', '/capacitacion-brigadas', '/catalogo', '/co2', '/contacto',
  '/espuma-afff', '/extintores', '/mantenimiento-preventivo', '/nosotros', '/polvo-quimico-seco',
  '/prueba-hidrostatica', '/recarga-de-extintores', '/sectores/data-centers', '/sectores/hospitales',
  '/sectores/restaurantes', '/senalizacion', '/servicios', '/tipo-k', '/venta-de-extintores',
];

test('site FAQ registry covers every existing static FAQ route', () => {
  assert.deepEqual([...siteFaqRoutes].sort(), expectedSiteFaqRoutes.sort());
});

test('every static FAQ route has at least eight complete unique questions', () => {
  for (const route of siteFaqRoutes) {
    assert.equal(getSiteFaqs(route), siteFaqs[route]);
    assert.doesNotThrow(() => assertFaqCollection(route, siteFaqs[route]));
  }
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/faq-global.test.mjs`

Expected: FAIL because `src/data/site-faqs.mjs` does not exist.

- [ ] **Step 3: Implement the deterministic eight-question builder**

Create `src/data/site-faqs.mjs` with this builder:

```js
import { assertFaqCollection } from '../lib/faq-utils.mjs';

function buildSiteFaqSet(seed) {
  const subject = seed.subject;
  return [
    { question: `¿Qué resuelve ${subject}?`, answer: seed.purpose },
    { question: `¿Cuándo conviene solicitar ${subject}?`, answer: seed.context },
    { question: `¿Cómo se selecciona correctamente ${subject}?`, answer: seed.selection },
    { question: `¿Qué limitación debo considerar sobre ${subject}?`, answer: seed.limit },
    { question: `¿Qué datos necesitan para cotizar ${subject}?`, answer: seed.quoteData },
    { question: `¿Qué servicios pueden incluirse con ${subject}?`, answer: seed.services },
    { question: `¿Cómo se da seguimiento a ${subject}?`, answer: seed.followUp },
    { question: `¿Qué documentación se confirma para ${subject}?`, answer: seed.documentation },
  ];
}
```

Then add the complete route registry below. The builder turns every seed into eight natural, route-specific questions; each answer stays within the commercial and technical boundary approved in the design spec.

```js
const siteFaqSeeds = {
  '/': {
    subject: 'la asesoría integral de MANEXT',
    purpose: 'MANEXT integra venta de extintores, mantenimiento, recarga, prueba hidrostática, señalización y capacitación. La propuesta se define a partir del riesgo y del alcance solicitado, sin convertir la información del sitio en una recomendación universal.',
    context: 'Conviene solicitarla al abrir o remodelar un inmueble, preparar una auditoría, cambiar procesos o combustibles, detectar vencimientos o necesitar un programa de servicio. Una revisión temprana permite ordenar prioridades y evitar compras aisladas.',
    selection: 'Se revisan los combustibles presentes, las clases de fuego posibles, la superficie, los recorridos, la ocupación y la continuidad operativa. Con esos datos se comparan equipos y servicios compatibles con cada zona.',
    limit: 'La orientación web ayuda a preparar la conversación, pero no sustituye la revisión del riesgo real ni las decisiones de la autoridad competente. El alcance final debe quedar identificado en una propuesta técnica.',
    quoteData: 'Comparte giro, ubicación, áreas a proteger, inventario disponible, cantidades aproximadas, riesgos especiales y fecha requerida. Fotografías, planos o reportes previos pueden ayudar cuando están disponibles.',
    services: 'La propuesta puede reunir suministro, instalación, señalización, mantenimiento, recarga, prueba hidrostática y capacitación cuando resulten aplicables. Sólo se consideran incluidos los conceptos descritos expresamente.',
    followUp: 'El seguimiento se organiza conforme al alcance contratado, el inventario y las condiciones observadas. Fechas, responsables, visitas y registros se confirman en la propuesta o programa de servicio.',
    documentation: 'Se confirman los entregables relacionados con los productos y servicios contratados, como fichas, etiquetas o reportes aplicables. No se prometen dictámenes, certificaciones o trámites ajenos al alcance aceptado.',
  },
  '/agentes-limpios': {
    subject: 'un extintor de agente limpio',
    purpose: 'Utiliza un agente que no deja residuo sólido después de la descarga, por lo que puede ser pertinente cerca de electrónica, telecomunicaciones y activos sensibles. La compatibilidad depende del agente, el modelo y el riesgo.',
    context: 'Se evalúa cuando la limpieza posterior, la continuidad operativa o el daño colateral son factores críticos. También deben revisarse la ocupación, la ventilación y el protocolo de respuesta del recinto.',
    selection: 'Se comparan agente, clasificación y rating declarados, capacidad, distancia de operación, ocupación, ventilación y recomendaciones del fabricante. El nombre comercial por sí solo no define la aplicación correcta.',
    limit: 'La compatibilidad con cada fuego y las condiciones de exposición varían entre agentes y modelos. No debe suponerse que cualquier agente limpio resuelve todos los riesgos eléctricos, líquidos o sólidos.',
    quoteData: 'Indica los equipos que deseas proteger, dimensiones y ventilación del recinto, combustibles presentes, ocupación, continuidad requerida, cantidad estimada y ubicación del inmueble.',
    services: 'Puede incluir suministro, instalación, señalización y mantenimiento aplicable. La recarga, recuperación del agente o refacciones se confirman de acuerdo con el modelo y las instrucciones disponibles.',
    followUp: 'Se revisan condición física, componentes, carga y requisitos del fabricante dentro del programa acordado. Después de una descarga se evalúa el procedimiento aplicable antes de devolver el equipo a servicio.',
    documentation: 'La cotización confirma agente, marca, modelo, capacidad, rating declarado, ficha disponible, etiquetado y fecha estimada. No se presume disponibilidad o certificación sin identificar la variante ofrecida.',
  },
  '/agua-presion': {
    subject: 'un extintor de agua a presión',
    purpose: 'Está destinado a fuegos clase A compatibles, asociados con sólidos ordinarios como papel, cartón, madera o textiles. Su efecto principal es el enfriamiento del material involucrado.',
    context: 'Puede considerarse en áreas con combustibles clase A y sin riesgo de contacto con equipo eléctrico energizado, líquidos inflamables, grasas de cocina o metales combustibles.',
    selection: 'Se revisan el rating del modelo, capacidad, distancia de recorrido, cantidad y distribución de combustibles, condiciones ambientales y ubicación prevista. La carga nominal no sustituye esa evaluación.',
    limit: 'No debe utilizarse en riesgos eléctricos energizados ni asumirse compatible con líquidos inflamables, grasas o metales. También deben considerarse temperaturas y ambientes que puedan afectar el equipo.',
    quoteData: 'Comparte materiales presentes, áreas, superficie aproximada, recorridos, temperatura del sitio, inventario actual, cantidad estimada y ubicación del inmueble.',
    services: 'La propuesta puede incluir suministro, soporte de montaje, señalización, instalación y mantenimiento aplicable. Cada concepto se identifica por separado en el alcance.',
    followUp: 'El equipo se incorpora a un programa de inspección y servicio compatible con su modelo, condición y fabricante. Cualquier descarga, daño o anomalía requiere revisión antes de volver a colocarlo.',
    documentation: 'Se confirman marca, modelo, capacidad, rating declarado, ficha disponible, etiquetado y entregables del servicio. La disponibilidad se valida al preparar la propuesta.',
  },
  '/capacitacion-brigadas': {
    subject: 'la capacitación de brigadas contra incendio',
    purpose: 'Desarrolla conocimientos y prácticas acordes con los riesgos, responsabilidades y plan de emergencia del centro de trabajo. El temario, los ejercicios y las evidencias se definen por alcance.',
    context: 'Conviene para formación inicial, actualización periódica, incorporación de personal, cambios de proceso o revisión del plan de respuesta. La necesidad concreta depende de la organización y sus riesgos.',
    selection: 'Se consideran objetivos, número y perfil de participantes, riesgos, equipos disponibles, instalaciones, horarios y plan de emergencia. Así se evita impartir un curso genérico desconectado de la operación.',
    limit: 'Una constancia o sesión aislada no reemplaza la organización interna, los procedimientos, simulacros ni la práctica continua. La empresa conserva la responsabilidad de integrar la capacitación a su programa.',
    quoteData: 'Indica sede, cantidad de participantes, turnos, horarios, riesgos, equipo disponible, objetivos, fecha requerida y evidencias esperadas. También señala restricciones operativas del inmueble.',
    services: 'Puede incluir sesión teórica, ejercicios prácticos, materiales y documentación acordada. El uso de fuego real, instalaciones especiales o equipo adicional se confirma expresamente.',
    followUp: 'La actualización se programa conforme a los cambios del centro, evaluación de resultados y programa interno. Frecuencia, responsables y actividades posteriores se acuerdan con el cliente.',
    documentation: 'La propuesta detalla temario, duración, participantes, evidencias y constancias incluidas. No se atribuyen vigencias o alcances universales a documentos que dependen del programa contratado.',
  },
  '/catalogo': {
    subject: 'un producto del catálogo de protección contra incendios',
    purpose: 'El catálogo permite comparar extintores portátiles, equipos especializados y accesorios por aplicación, agente, clase de fuego y uso recomendado. La selección final se confirma mediante cotización técnica.',
    context: 'Conviene consultarlo al equipar un inmueble, sustituir equipos, ampliar una instalación o comparar alternativas para un riesgo específico. No funciona como una lista universal de compras.',
    selection: 'Se identifican combustibles, clase y magnitud del fuego posible, rating requerido, recorridos, ambiente, ocupación y operación. La capacidad nominal es un dato, pero no define por sí sola la cobertura.',
    limit: 'Las clases de fuego y tecnologías especiales no son intercambiables. Por ejemplo, un agente para ciertos metales clase D no debe asumirse adecuado para baterías de ion-litio sin evaluación específica.',
    quoteData: 'Indica sector, ubicación, producto o familia, capacidad o variante, cantidad estimada, riesgo y servicios deseados. Con ello se confirman alternativas, disponibilidad y fecha estimada.',
    services: 'La cotización puede integrar instalación, señalización, mantenimiento, recarga y capacitación cuando correspondan al producto. Los conceptos incluidos quedan descritos en la propuesta.',
    followUp: 'Después del suministro puede definirse un programa de inspección y servicio según familia, fabricante y condiciones del sitio. La periodicidad y los entregables se acuerdan por alcance.',
    documentation: 'Antes de aceptar se confirman marca, modelo, agente, capacidad, rating declarado, ficha disponible y documentación aplicable. No se presume stock o certificación a partir de la categoría.',
  },
  '/co2': {
    subject: 'un extintor de dióxido de carbono CO₂',
    purpose: 'El CO₂ es un agente sin residuo usado en fuegos clase B y C compatibles, especialmente donde existen líquidos inflamables o equipo eléctrico energizado. Su idoneidad depende del riesgo y del rating.',
    context: 'Puede considerarse para tableros, equipos eléctricos, servidores y ciertos líquidos compatibles cuando la limpieza posterior es relevante. Deben evaluarse ventilación, ocupación y posibilidad de reignición.',
    selection: 'Se comparan rating, capacidad, distancia de operación, tamaño del riesgo, ventilación, ocupación y estrategia de respaldo. El peso del agente no determina por sí solo la protección adecuada.',
    limit: 'El CO₂ puede desplazar oxígeno y exige precauciones en espacios confinados o poco ventilados. Su enfriamiento puede ser limitado en materiales clase A, por lo que existe riesgo de reignición.',
    quoteData: 'Comparte dimensiones y ventilación del recinto, equipos o combustibles, ocupación, cantidad estimada, capacidad deseada, sistemas existentes y ubicación.',
    services: 'Puede incluir suministro, instalación, señalización y mantenimiento aplicable. Refacciones, pruebas o recarga se confirman según el modelo y la condición del equipo.',
    followUp: 'El servicio considera condición, componentes y verificación de carga por el método aplicable al modelo. Después de una descarga o daño debe revisarse antes de regresar a operación.',
    documentation: 'Se confirman marca, modelo, capacidad, rating declarado, conjunto de descarga, ficha disponible, etiquetado y fecha estimada. La propuesta identifica exactamente la variante ofrecida.',
  },
  '/contacto': {
    subject: 'la atención técnica de MANEXT',
    purpose: 'Permite canalizar solicitudes de venta, mantenimiento, recarga, prueba hidrostática, señalización o capacitación por formulario, teléfono o WhatsApp. El equipo confirma alcance y siguientes pasos.',
    context: 'Conviene contactar cuando existe una necesidad concreta, un inventario por revisar, una fecha de auditoría, un cambio de riesgo o dudas para elegir producto o servicio.',
    selection: 'La solicitud se asigna según tipo de servicio, ubicación, volumen, urgencia y nivel de información disponible. Si el riesgo no puede definirse a distancia, se evalúa una visita.',
    limit: 'La cobertura, agenda y atención urgente deben confirmarse antes de asumir horarios o tiempos de respuesta. Una conversación inicial no sustituye la aceptación formal del alcance.',
    quoteData: 'Comparte nombre, medio de contacto, empresa, giro, ubicación, equipo o servicio, cantidades aproximadas, condición observada y fecha requerida. Evita enviar datos sensibles innecesarios.',
    services: 'El contacto puede derivar en suministro, visita, instalación, mantenimiento, recarga, prueba, señalización o capacitación. Sólo se ejecutan los conceptos aceptados en la propuesta.',
    followUp: 'Se confirma el canal de comunicación, responsable, información pendiente y próximos pasos. Las fechas se coordinan conforme a disponibilidad y alcance.',
    documentation: 'Los datos se tratan conforme al aviso de privacidad vigente y los entregables se detallan en la propuesta. La comunicación inicial no crea certificaciones ni garantías no documentadas.',
  },
  '/espuma-afff': {
    subject: 'un extintor de espuma AFFF',
    purpose: 'Emplea una solución acuosa diseñada para fuegos clase A y B compatibles, según el producto. En líquidos puede ayudar a formar una capa que limite vapores y contribuya al control.',
    context: 'Puede evaluarse donde existen sólidos ordinarios y determinados líquidos inflamables. La sustancia, su polaridad, el proceso y la contención son datos indispensables.',
    selection: 'Se revisan combustible, miscibilidad o polaridad, concentración o formulación, rating, capacidad, forma de aplicación y condiciones del área. No toda espuma es adecuada para todo líquido.',
    limit: 'No debe asumirse compatible con equipo eléctrico energizado, todos los solventes o cualquier agente existente. El producto específico y su ficha determinan restricciones de aplicación.',
    quoteData: 'Indica sustancias presentes, fichas de seguridad disponibles, superficie, proceso, contención, equipos existentes, cantidad estimada y ubicación.',
    services: 'Puede incluir suministro, instalación, señalización y mantenimiento aplicable. El manejo o disposición del agente se define conforme al producto y al servicio contratado.',
    followUp: 'Se revisan condición, carga, componentes y compatibilidad del agente con el modelo. Tras una descarga se sigue el procedimiento aplicable y se evalúa la limpieza del área.',
    documentation: 'La cotización confirma tipo de espuma, formulación o concentración declarada, marca, modelo, rating, ficha disponible y fecha estimada. No se generalizan propiedades entre productos.',
  },
  '/extintores': {
    subject: 'la selección de extintores',
    purpose: 'Permite comparar equipos de polvo químico seco, CO₂, agua, espuma, químico húmedo, agentes limpios y soluciones especiales. Cada familia responde a clases de fuego y condiciones distintas.',
    context: 'Debe revisarse al equipar áreas nuevas, cambiar procesos, sustituir equipos o detectar que el inventario no corresponde a los riesgos actuales.',
    selection: 'Se estudian combustibles, clase de fuego, rating, capacidad, recorrido, ambiente, ocupación y operación. La cantidad resulta de la evaluación del centro y de riesgos específicos.',
    limit: 'Un extintor ABC no reemplaza automáticamente tecnologías para cocinas, metales, electrónica sensible u otros riesgos especiales. Tampoco basta elegir por peso o color del cilindro.',
    quoteData: 'Comparte giro, superficie, áreas, combustibles, equipos energizados, inventario, cantidad estimada, ubicación y servicios requeridos.',
    services: 'La propuesta puede incluir suministro, instalación, señalización, mantenimiento, recarga y capacitación. El alcance se ajusta a cada familia de equipo.',
    followUp: 'Los equipos se integran a un programa de inspección y servicio según tipo, fabricante, uso y condición. Una descarga o daño requiere atención antes de volver a instalarlos.',
    documentation: 'Se confirman marca, modelo, agente, capacidad, rating declarado, ficha disponible, etiquetado y entregables. Precio y disponibilidad dependen de la configuración cotizada.',
  },
  '/mantenimiento-preventivo': {
    subject: 'el mantenimiento preventivo de extintores',
    purpose: 'Comprende la revisión externa e interna y las operaciones aplicables para conservar el equipo en condiciones de funcionamiento, de acuerdo con su tipo, estado y procedimiento de servicio.',
    context: 'Se solicita dentro del programa del centro de trabajo y también después de uso, daño, corrosión, pérdida de carga o anomalías. La fecha exacta depende del equipo y de la regulación aplicable.',
    selection: 'Se identifica familia, agente, capacidad, fabricante, condición, historial y componentes. Con ese diagnóstico se determina si procede mantenimiento, recarga, prueba, reparación o sustitución.',
    limit: 'Equipos obsoletos, desechables, severamente dañados o incompatibles con el servicio disponible pueden requerir sustitución. No todo cilindro puede devolverse a operación.',
    quoteData: 'Comparte inventario, tipos, capacidades, cantidades, ubicación, fechas, condición visible y antecedentes disponibles. Fotografías de etiquetas ayudan a identificar variantes.',
    services: 'Puede combinar revisión, recarga aplicable, refacciones, recolección, entrega y préstamo cuando este último figure en la propuesta. No se presume ningún concepto adicional.',
    followUp: 'El inventario y los servicios realizados se documentan según alcance. Próximas revisiones, responsables y atención de hallazgos se coordinan con el cliente.',
    documentation: 'Etiquetas, registros, reportes y piezas sustituidas dependen del trabajo efectivamente realizado. La propuesta identifica los entregables antes de comenzar.',
  },
  '/nosotros': {
    subject: 'el acompañamiento de MANEXT',
    purpose: 'MANEXT ofrece soluciones de protección contra incendios que reúnen equipos, mantenimiento, recarga, pruebas, señalización y capacitación según la necesidad del cliente.',
    context: 'Conviene al buscar un proveedor para centralizar inventario, resolver hallazgos, preparar proyectos o establecer continuidad de servicio en uno o varios inmuebles.',
    selection: 'El acompañamiento se define por riesgo, objetivo, ubicación, inventario, operación y documentación esperada. Primero se revisa la información y después se propone un alcance.',
    limit: 'La trayectoria y experiencia documentada respaldan el proceso, pero no sustituyen la evaluación técnica ni constituyen una garantía automática de resultados ajenos al servicio.',
    quoteData: 'Comparte tipo de inmueble, ubicaciones, inventario, servicios requeridos, riesgos, fechas y responsables. La información disponible determina si hace falta una visita.',
    services: 'Puede integrar venta, instalación, señalización, mantenimiento, recarga, prueba hidrostática y capacitación. Cada servicio se cotiza conforme a su alcance.',
    followUp: 'La propuesta identifica responsables, canales, agenda y próximos pasos. En programas recurrentes se acuerdan inventario, visitas y registros.',
    documentation: 'Los entregables dependen de los productos y servicios aceptados. MANEXT confirma qué fichas, etiquetas, reportes o constancias forman parte de la propuesta.',
  },
  '/polvo-quimico-seco': {
    subject: 'un extintor de polvo químico seco',
    purpose: 'Emplea un agente en polvo cuya aplicación depende de la formulación y del rating declarado. Existen variantes para clases ABC o BC y no deben confundirse entre sí.',
    context: 'Puede ser una alternativa de protección general donde los combustibles y la operación sean compatibles con su formulación y donde el residuo posterior sea aceptable.',
    selection: 'Se comparan formulación ABC o BC, rating, capacidad, magnitud del riesgo, ambiente, distancia de operación y sensibilidad de los activos cercanos.',
    limit: 'El agente deja residuo y puede complicar la limpieza o afectar equipos sensibles. Su presencia no reemplaza soluciones específicas para cocinas, metales u otros riesgos especiales.',
    quoteData: 'Indica combustibles, electrónica cercana, superficie, procesos, inventario, capacidad o rating buscado, cantidad estimada y ubicación.',
    services: 'Puede incluir suministro, instalación, señalización, mantenimiento y recarga aplicable. Refacciones y pruebas se confirman según el equipo.',
    followUp: 'Se revisan condición, presión o carga por el método aplicable, agente y componentes. Después de uso o daño se atiende antes de regresar a su ubicación.',
    documentation: 'La propuesta confirma formulación, marca, modelo, capacidad, rating declarado, ficha disponible y etiquetado. No se presume equivalencia entre polvos o modelos.',
  },
  '/prueba-hidrostatica': {
    subject: 'la prueba hidrostática de cilindros',
    purpose: 'Evalúa la integridad del recipiente mediante el procedimiento aplicable para determinar si puede continuar en servicio. No equivale a una simple inspección visual o recarga.',
    context: 'Se considera por intervalo aplicable, indicación del fabricante, condición, golpes, corrosión, reparación o hallazgos del mantenimiento. La fecha no debe inferirse sin identificar el cilindro.',
    selection: 'Primero se identifica tipo de recipiente, material, capacidad, marcado, condición e historial. Con esa información se confirma el procedimiento y si existen medios para atenderlo.',
    limit: 'Un cilindro que no cumple los criterios aplicables debe retirarse de servicio conforme al resultado. No se prometen reparaciones, descuentos o reutilización antes de evaluarlo.',
    quoteData: 'Comparte tipo de extintor, capacidad, cantidad, fotografías del marcado, fechas conocidas, daños visibles, ubicación y plazo requerido.',
    services: 'Puede combinar evaluación, desarmado, prueba, recarga y armado cuando correspondan y estén cotizados. Recolección o préstamo se confirman por separado.',
    followUp: 'Después del resultado se define si procede recarga y armado o retiro de servicio. Las acciones y fechas se comunican conforme al alcance aceptado.',
    documentation: 'El resultado, marcado y reporte se entregan según el procedimiento y servicio efectivamente realizados. La propuesta identifica los documentos incluidos.',
  },
  '/recarga-de-extintores': {
    subject: 'la recarga de extintores',
    purpose: 'Consiste en reemplazar totalmente el agente extinguidor y restablecer la carga conforme al procedimiento aplicable al equipo. Debe utilizarse el agente correcto para la familia y el modelo.',
    context: 'Se requiere después de una descarga y cuando el servicio o diagnóstico aplicable determina pérdida o sustitución del agente. No debe decidirse sólo por apariencia exterior.',
    selection: 'Se identifican tipo, agente, capacidad, fabricante, condición, componentes e historial. La recarga se coordina con las revisiones necesarias para devolver el equipo a servicio.',
    limit: 'Equipos no recargables, obsoletos, dañados o incompatibles con el procedimiento disponible pueden requerir sustitución. Agregar agente sin diagnóstico no constituye una recarga correcta.',
    quoteData: 'Comparte tipo, agente, capacidad, cantidad, ubicación, condición, fecha de uso o servicio y fotografías de etiquetas cuando sea posible.',
    services: 'Puede incluir recolección, mantenimiento relacionado, recarga, refacciones, entrega y préstamo si aparece expresamente en la propuesta.',
    followUp: 'El servicio realizado se registra y el equipo vuelve a su ubicación sólo después de completar las operaciones aplicables. Próximas revisiones se coordinan con el programa del cliente.',
    documentation: 'Se documentan el agente, la identificación del equipo, el servicio realizado y los entregables aplicables. El detalle se confirma antes de aceptar la cotización.',
  },
  '/sectores/data-centers': {
    subject: 'la protección contra incendios para data centers',
    purpose: 'Busca proteger personas, energía, cableado, racks y continuidad operativa mediante equipos y servicios compatibles con los riesgos reales de cada sala.',
    context: 'Debe revisarse al diseñar o ampliar salas, modificar carga eléctrica, cambiar sistemas, incorporar baterías o detectar que los equipos portátiles no corresponden al riesgo.',
    selection: 'Se estudian combustibles, equipos energizados, ocupación, ventilación, criticidad, recuperación y sistemas existentes. La solución puede variar entre áreas del mismo centro.',
    limit: 'El polvo puede dejar residuo y aumentar el daño operativo; CO₂ y agentes limpios exigen validar rating, ventilación y exposición. Ninguna familia se elige sólo por ser “para electrónica”.',
    quoteData: 'Comparte salas, racks, superficies, sistemas existentes, baterías, ventilación, ocupación, criticidad, inventario y ubicación. Planos y protocolos ayudan a precisar el alcance.',
    services: 'Puede incluir equipos portátiles, señalización, instalación, mantenimiento y evaluación de soluciones complementarias. La ingeniería de sistemas fijos se define como alcance específico.',
    followUp: 'Se coordina un programa compatible con ventanas de mantenimiento, continuidad y control de acceso. Los hallazgos se priorizan con responsables del sitio.',
    documentation: 'Se confirman modelos, ratings, compatibilidad, fichas y entregables de servicio. La propuesta evita asumir cobertura sólo por metros cuadrados.',
  },
  '/sectores/hospitales': {
    subject: 'la protección contra incendios para hospitales',
    purpose: 'Integra soluciones por área considerando ocupación, continuidad clínica, electricidad, gases, cocinas, almacenes y movilidad de pacientes. Un solo agente no cubre todos esos escenarios.',
    context: 'Conviene revisarla al abrir o remodelar áreas, cambiar equipos, actualizar protocolos, detectar hallazgos o coordinar programas de mantenimiento sin interrumpir la operación.',
    selection: 'Se evalúa cada zona por combustibles, ocupación, ventilación, equipos energizados, rutas y continuidad. Agentes limpios, CO₂ o químico húmedo sólo se asignan donde resulten compatibles.',
    limit: 'La protección portátil no sustituye sistemas, procedimientos y organización interna. CO₂ o agentes especiales requieren valorar exposición; el tipo K se limita a riesgos compatibles de cocina.',
    quoteData: 'Comparte áreas críticas, inventario, protocolos, horarios, gases, cocinas, sistemas existentes, restricciones de acceso, ubicación y fechas.',
    services: 'Puede incluir suministro, señalización, instalación, mantenimiento, recarga y capacitación. La ejecución se coordina con los responsables del inmueble.',
    followUp: 'Las visitas y hallazgos se integran al programa acordado sin asumir ventanas operativas. Cambios de área o proceso deben comunicarse para revisar la cobertura.',
    documentation: 'Se confirman modelos y entregables, coordinándolos con requisitos internos y de la autoridad competente. No se prometen aprobaciones externas automáticas.',
  },
  '/sectores/restaurantes': {
    subject: 'la protección contra incendios para restaurantes',
    purpose: 'Atiende riesgos de aceites, grasas, gas, electricidad, almacenes y áreas con público. Cocina, comedor, tableros y cuartos de servicio pueden requerir equipos diferentes.',
    context: 'Debe revisarse al abrir, remodelar, cambiar equipos de cocción, modificar combustible, ampliar aforo o detectar que el inventario no corresponde a las áreas actuales.',
    selection: 'Se analizan equipos de cocción, aceites, gas, electricidad, sólidos, distribución, recorridos y sistemas existentes. El químico húmedo tipo K se reserva para riesgos compatibles de cocina.',
    limit: 'Un paquete universal no representa todos los restaurantes. PQS y CO₂ pueden complementar otras áreas, pero no sustituyen automáticamente la protección específica de aceites y grasas.',
    quoteData: 'Comparte equipos de cocción, campana o sistema existente, combustibles, áreas, superficie, aforo, inventario, cantidad estimada y ubicación.',
    services: 'Puede incluir suministro, instalación, señalización, mantenimiento, recarga y capacitación del personal. Los conceptos se adaptan a horarios y operación.',
    followUp: 'El programa considera condición del equipo, cambios de cocina y coordinación de visitas. Una descarga o modificación del riesgo requiere revisión.',
    documentation: 'Se confirman marca, modelo, agente, rating declarado y alcance de instalación o servicio. La propuesta identifica las variantes por área.',
  },
  '/senalizacion': {
    subject: 'la señalización de protección civil',
    purpose: 'Ayuda a identificar equipos, rutas, salidas, prohibiciones y condiciones de seguridad mediante mensajes visibles y ubicaciones definidas. Complementa, pero no reemplaza, las medidas físicas y operativas.',
    context: 'Conviene revisarla en inmuebles nuevos, remodelaciones, cambios de distribución, sustitución de equipos, auditorías o cuando las señales dejaron de ser legibles.',
    selection: 'Se consideran mensaje, ubicación, distancia de observación, iluminación, visibilidad, superficie, ambiente y referencia normativa aplicable. El material se elige según las condiciones reales.',
    limit: 'Una señal no corrige un extintor mal seleccionado, una ruta bloqueada o una instalación deficiente. La fotoluminiscencia depende del producto y de condiciones adecuadas de carga e iluminación.',
    quoteData: 'Comparte planos o recorrido, mensajes, cantidades, medidas, superficies de instalación, iluminación, ambiente, fotografías y ubicación del inmueble.',
    services: 'Puede incluir suministro, levantamiento e instalación. Diseño especial, retiro de señales o trabajos en altura se confirman dentro del alcance.',
    followUp: 'Se revisan legibilidad, fijación, ubicación y cambios del inmueble. Las señales dañadas, obstruidas o desactualizadas deben identificarse dentro del programa del sitio.',
    documentation: 'La propuesta confirma material, medidas, acabado, sistema de fijación y norma de referencia declarada. No se presume aprobación externa por la compra del producto.',
  },
  '/servicios': {
    subject: 'un servicio de protección contra incendios',
    purpose: 'MANEXT ofrece venta, mantenimiento, recarga, prueba hidrostática, señalización y capacitación. Cada servicio responde a una necesidad distinta y puede combinarse en una propuesta integral.',
    context: 'Conviene solicitarlo ante vencimientos, descargas, daños, cambios de inmueble o proceso, nuevas instalaciones, auditorías o necesidad de actualizar al personal.',
    selection: 'Se parte del objetivo, inventario, riesgo, condición, ubicación y documentación esperada. El mantenimiento revisa el conjunto; la recarga reemplaza el agente y no son sinónimos.',
    limit: 'La información disponible puede no bastar para diagnosticar equipos o instalaciones. En esos casos se solicita evidencia adicional o se define una visita antes de cerrar el alcance.',
    quoteData: 'Comparte inventario, tipos, capacidades, cantidades, ubicación, estado, fechas, documentos disponibles y servicio buscado. Fotografías o reportes previos ayudan a estimar.',
    services: 'La propuesta puede integrar varios servicios, recolección, entrega o préstamo cuando se indiquen expresamente. Nada se considera incluido fuera del alcance aceptado.',
    followUp: 'Se acuerdan responsables, agenda, programa, hallazgos y próximos servicios. La recurrencia depende del equipo, la operación y las obligaciones aplicables.',
    documentation: 'Cada servicio detalla sus entregables, como etiquetas, registros, reportes o constancias aplicables. No se generaliza la misma documentación para todos los trabajos.',
  },
  '/tipo-k': {
    subject: 'un extintor de químico húmedo tipo K',
    purpose: 'Está diseñado para fuegos clase K compatibles asociados con aceites y grasas de cocción. El agente ayuda a controlar el riesgo mediante enfriamiento y reacción con el combustible.',
    context: 'Se evalúa en cocinas comerciales o industriales con freidoras, planchas y equipos que utilizan aceites o grasas. Debe coordinarse con la protección general y sistemas existentes.',
    selection: 'Se revisan equipos de cocción, volumen y tipo de aceite, rating, capacidad, ubicación, distancia de operación y sistema de campana. La configuración depende de la cocina real.',
    limit: 'No reemplaza los extintores requeridos en tableros, almacenes, comedor u otras áreas. Tampoco sustituye sistemas fijos o procedimientos de corte de energía y combustible.',
    quoteData: 'Comparte equipos de cocción, aceites, campana o sistema existente, distribución, cantidad estimada, capacidad buscada, horarios y ubicación.',
    services: 'Puede incluir suministro, instalación, señalización y mantenimiento aplicable. Integración con sistemas fijos o capacitación se cotiza según alcance.',
    followUp: 'Se revisan condición, carga, componentes y compatibilidad del modelo. Una descarga, daño o cambio de cocina exige evaluar nuevamente el equipo.',
    documentation: 'La cotización confirma marca, modelo, capacidad, rating declarado, agente, ficha disponible y compatibilidad indicada. Disponibilidad y fecha se validan por variante.',
  },
  '/venta-de-extintores': {
    subject: 'la compra de extintores',
    purpose: 'Incluye el equipo descrito en la cotización y únicamente los servicios o accesorios expresamente señalados. La compra debe partir del riesgo, no sólo de capacidad o precio.',
    context: 'Conviene cotizar al equipar un inmueble, sustituir unidades, ampliar áreas, cambiar procesos o corregir una selección que ya no corresponde a los combustibles presentes.',
    selection: 'Se comparan clase de fuego, rating, agente, capacidad, ambiente, ocupación, recorrido y operación. Marca y modelo se confirman según la variante disponible y aceptada.',
    limit: 'No existe una configuración universal. El precio, entrega y servicios cambian por agente, capacidad, cantidad, disponibilidad, ubicación y alcance; por eso no se publican promesas genéricas.',
    quoteData: 'Comparte giro, riesgos, áreas, inventario, cantidad, capacidad o rating deseado, ubicación, fecha y servicios adicionales. Si no conoces la variante, describe qué necesitas proteger.',
    services: 'Puede incluir instalación, soportes, señalización, mantenimiento, recarga futura y capacitación. La propuesta separa o agrupa conceptos según lo solicitado.',
    followUp: 'Después de la entrega se confirma recepción y, cuando se contrata, instalación o programa de servicio. Fechas posteriores dependen del equipo y del alcance.',
    documentation: 'Se confirman marca, modelo, agente, capacidad, rating declarado, ficha, etiqueta y entregables del producto aceptado. No se presume certificación o stock antes de identificarlo.',
  },
};
```

- [ ] **Step 4: Export and validate the registry**

Finish `src/data/site-faqs.mjs` with:

```js
export const siteFaqs = Object.freeze(Object.fromEntries(
  Object.entries(siteFaqSeeds).map(([route, seed]) => {
    const faqs = buildSiteFaqSet(seed);
    assertFaqCollection(route, faqs);
    return [route, Object.freeze(faqs)];
  }),
));

export const siteFaqRoutes = Object.freeze(Object.keys(siteFaqs));

export function getSiteFaqs(route) {
  const faqs = siteFaqs[route];
  if (!faqs) throw new Error(`Missing FAQ collection for ${route}`);
  return faqs;
}
```

- [ ] **Step 5: Verify GREEN**

Run: `node --test tests/faq-global.test.mjs`

Expected: all FAQ utility and registry tests pass for 21 routes.

- [ ] **Step 6: Commit**

```bash
git add src/data/site-faqs.mjs tests/faq-global.test.mjs
git commit -m "feat: centralize contextual site FAQs"
```

---

### Task 4: Catalog main page with eight FAQs and synchronized schema

**Files:**
- Modify: `src/pages/catalogo.astro`
- Modify: `src/components/catalog/FaqQuoteModule.astro`
- Modify: `tests/catalog.test.mjs`
- Modify: `tests/faq-global.test.mjs`

**Interfaces:**
- Consumes: `getSiteFaqs('/catalogo')` and `buildFaqSchema(faqs)`.
- Produces: one FAQ/quote module with eight visible questions and matching JSON-LD.

- [ ] **Step 1: Write failing page tests**

Add to `tests/faq-global.test.mjs`:

```js
test('catalog page consumes the central FAQ collection and schema helper', async () => {
  const source = await readFile(new URL('../src/pages/catalogo.astro', import.meta.url), 'utf8');
  assert.match(source, /getSiteFaqs\(['"]\/catalogo['"]\)/);
  assert.match(source, /buildFaqSchema\(faqs\)/);
  assert.doesNotMatch(source, /const faqs\s*=\s*\[/);
});
```

In `tests/catalog.test.mjs`, extend the existing module test:

```js
assert.match(page, /const faqs = getSiteFaqs\(['"]\/catalogo['"]\)/);
assert.match(page, /const faqSchema = JSON\.stringify\(buildFaqSchema\(faqs\)\)/);
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/faq-global.test.mjs tests/catalog.test.mjs`

Expected: FAIL because `/catalogo` still owns an inline five-item array.

- [ ] **Step 3: Replace inline data and schema**

In `src/pages/catalogo.astro`, add:

```js
import { getSiteFaqs } from '../data/site-faqs.mjs';
import { buildFaqSchema } from '../lib/faq-utils.mjs';
```

Replace the inline `faqs` and schema object with:

```js
const faqs = getSiteFaqs('/catalogo');
const faqSchema = JSON.stringify(buildFaqSchema(faqs));
```

Keep:

```astro
<FaqQuoteModule faqs={faqs} products={products} sectors={sectorOptions} />
```

In `FaqQuoteModule.astro`, replace its internal FAQ markup with:

```astro
<FaqList faqs={faqs} firstOpen={true} className="faq-quote__list" />
```

and import:

```astro
import FaqList from '../FaqList.astro';
```

- [ ] **Step 4: Build and verify GREEN**

Run: `npm run build && node --test tests/faq-global.test.mjs tests/catalog.test.mjs tests/motion-policy.test.mjs`

Expected: targeted tests pass and `dist/catalogo/index.html` contains eight `.site-faq-list__item` elements.

- [ ] **Step 5: Commit**

```bash
git add src/pages/catalogo.astro src/components/catalog/FaqQuoteModule.astro tests/catalog.test.mjs tests/faq-global.test.mjs
git commit -m "feat: expand catalog FAQ to eight questions"
```

---

### Task 5: Eight contextual FAQs for all 46 product detail pages

**Files:**
- Modify: `src/data/catalog-editorial/profile.mjs`
- Modify: `src/components/catalog/ProductDetailTemplate.astro`
- Modify: `tests/catalog-product-detail.test.mjs`
- Modify: `tests/faq-global.test.mjs`

**Interfaces:**
- Consumes: each catalog editorial seed and `editorial.faqs`.
- Produces: eight unique FAQs for every final `catalogProductDetails` record.

- [ ] **Step 1: Add failing data tests**

Append to `tests/faq-global.test.mjs`:

```js
import { catalogProductDetails } from '../src/data/catalog-product-details.mjs';

test('all 46 catalog product details expose at least eight unique FAQs', () => {
  assert.equal(catalogProductDetails.length, 46);
  for (const product of catalogProductDetails) {
    assert.doesNotThrow(() => assertFaqCollection(`/catalogo/${product.slug}`, product.faqs));
  }
});
```

In `tests/catalog-product-detail.test.mjs`, change the editorial profile expectation from five questions to:

```js
assert.ok(detail.faqs.length >= 8, `${detail.slug} must expose at least eight FAQs`);
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/faq-global.test.mjs tests/catalog-product-detail.test.mjs`

Expected: FAIL because final editorial profiles currently expose five questions.

- [ ] **Step 3: Extend the editorial profile to eight questions**

In `src/data/catalog-editorial/profile.mjs`, keep the existing five entries and append these three entries inside `faqs`:

```js
{
  question: `¿Qué limitación debo considerar antes de elegir ${keyword}?`,
  answer: `${seed.avoid} MANEXT compara ese límite con el combustible, el entorno y la forma de respuesta prevista antes de recomendar una configuración.`,
},
{
  question: `¿La propuesta de ${keyword} puede incluir instalación y servicio posterior?`,
  answer: `La propuesta puede integrar suministro y, cuando corresponda, instalación, señalización, mantenimiento, recarga, refacciones o capacitación. El alcance se define según el tipo de producto y las condiciones reales del sitio.`,
},
{
  question: `¿Cómo se confirman disponibilidad y documentación de ${keyword}?`,
  answer: `La cotización identifica la variante disponible y confirma marca, modelo, materiales, compatibilidad, documentación y fecha estimada antes de aceptar el suministro. No se presume stock ni certificación a partir del nombre comercial.`,
},
```

The resulting order must be: use case, selection factor, purchase error, differentiator, quotation data, limitation, services, availability/documentation.

- [ ] **Step 4: Reuse `FaqList` in the product template**

In `src/components/catalog/ProductDetailTemplate.astro`, import `FaqList`, remove the existing `product.faqs.map()` block and its outer `.product-detail__faqs` element, then insert:

```astro
<FaqList faqs={product.faqs} firstOpen={true} className="product-detail__faqs" />
```

Keep the two-column conversion wrapper and `QuoteForm` unchanged.

- [ ] **Step 5: Build and verify GREEN**

Run: `npm run build && node --test tests/faq-global.test.mjs tests/catalog-product-detail.test.mjs tests/motion-policy.test.mjs`

Expected: all 46 detail records and built pages pass the eight-question contract.

- [ ] **Step 6: Commit**

```bash
git add src/data/catalog-editorial/profile.mjs src/components/catalog/ProductDetailTemplate.astro tests/catalog-product-detail.test.mjs tests/faq-global.test.mjs
git commit -m "feat: expand all catalog product FAQs"
```

---

### Task 6: Migrate 14 commercial, product and service pages

**Files:**
- Modify: `src/pages/agentes-limpios.astro`
- Modify: `src/pages/agua-presion.astro`
- Modify: `src/pages/capacitacion-brigadas.astro`
- Modify: `src/pages/co2.astro`
- Modify: `src/pages/espuma-afff.astro`
- Modify: `src/pages/extintores.astro`
- Modify: `src/pages/mantenimiento-preventivo.astro`
- Modify: `src/pages/polvo-quimico-seco.astro`
- Modify: `src/pages/prueba-hidrostatica.astro`
- Modify: `src/pages/recarga-de-extintores.astro`
- Modify: `src/pages/senalizacion.astro`
- Modify: `src/pages/servicios.astro`
- Modify: `src/pages/tipo-k.astro`
- Modify: `src/pages/venta-de-extintores.astro`
- Modify: `tests/faq-global.test.mjs`

**Interfaces:**
- Consumes: `getSiteFaqs(route)`, `buildFaqSchema(faqs)`, and `FaqList`.
- Produces: 14 pages with one visible eight-question collection and matching schema.

- [ ] **Step 1: Add failing migration tests**

Append to `tests/faq-global.test.mjs`:

```js
const commercialFaqPages = {
  'agentes-limpios.astro': '/agentes-limpios',
  'agua-presion.astro': '/agua-presion',
  'capacitacion-brigadas.astro': '/capacitacion-brigadas',
  'co2.astro': '/co2',
  'espuma-afff.astro': '/espuma-afff',
  'extintores.astro': '/extintores',
  'mantenimiento-preventivo.astro': '/mantenimiento-preventivo',
  'polvo-quimico-seco.astro': '/polvo-quimico-seco',
  'prueba-hidrostatica.astro': '/prueba-hidrostatica',
  'recarga-de-extintores.astro': '/recarga-de-extintores',
  'senalizacion.astro': '/senalizacion',
  'servicios.astro': '/servicios',
  'tipo-k.astro': '/tipo-k',
  'venta-de-extintores.astro': '/venta-de-extintores',
};

test('commercial and service pages consume central FAQ data and component', async () => {
  for (const [file, route] of Object.entries(commercialFaqPages)) {
    const source = await readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`getSiteFaqs\\(['"]${route.replaceAll('/', '\\/')}['"]\\)`));
    assert.match(source, /buildFaqSchema\(faqs\)/);
    assert.match(source, /<FaqList\s+faqs=\{faqs\}/);
    assert.doesNotMatch(source, /document\.querySelectorAll\(['"]\.faq-question/);
  }
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/faq-global.test.mjs`

Expected: FAIL for every page that still owns inline FAQ HTML and scripts.

- [ ] **Step 3: Apply the exact import and data contract to each page**

For each file in `commercialFaqPages`, add:

```astro
import FaqList from '../components/FaqList.astro';
import { getSiteFaqs } from '../data/site-faqs.mjs';
import { buildFaqSchema } from '../lib/faq-utils.mjs';
```

For the three sector-depth differences there are none in this task; every listed file is directly under `src/pages` and uses the import paths above.

Define the route-specific data with the following exact declaration in each file:

```js
// src/pages/agentes-limpios.astro
const faqs = getSiteFaqs('/agentes-limpios');
// src/pages/agua-presion.astro
const faqs = getSiteFaqs('/agua-presion');
// src/pages/capacitacion-brigadas.astro
const faqs = getSiteFaqs('/capacitacion-brigadas');
// src/pages/co2.astro
const faqs = getSiteFaqs('/co2');
// src/pages/espuma-afff.astro
const faqs = getSiteFaqs('/espuma-afff');
// src/pages/extintores.astro
const faqs = getSiteFaqs('/extintores');
// src/pages/mantenimiento-preventivo.astro
const faqs = getSiteFaqs('/mantenimiento-preventivo');
// src/pages/polvo-quimico-seco.astro
const faqs = getSiteFaqs('/polvo-quimico-seco');
// src/pages/prueba-hidrostatica.astro
const faqs = getSiteFaqs('/prueba-hidrostatica');
// src/pages/recarga-de-extintores.astro
const faqs = getSiteFaqs('/recarga-de-extintores');
// src/pages/senalizacion.astro
const faqs = getSiteFaqs('/senalizacion');
// src/pages/servicios.astro
const faqs = getSiteFaqs('/servicios');
// src/pages/tipo-k.astro
const faqs = getSiteFaqs('/tipo-k');
// src/pages/venta-de-extintores.astro
const faqs = getSiteFaqs('/venta-de-extintores');

// Add this immediately after the route-specific declaration in every file.
const faqSchema = JSON.stringify(buildFaqSchema(faqs));
```

Preserve the page's other schemas and pass `faqSchema` through `Layout.schemas` exactly once.

- [ ] **Step 4: Replace each hardcoded FAQ list**

Inside the existing FAQ or FAQ/cotización wrapper of every listed page, replace the complete old `.faq-grid` with:

```astro
<FaqList faqs={faqs} firstOpen={true} />
```

Do not remove the neighboring quotation form, header, phone, CTA or two-column wrapper.

- [ ] **Step 5: Remove obsolete accordion scripts**

From every listed page, remove the inline block whose only responsibility is selecting `.faq-question`, toggling `.active`, changing `.faq-icon`, or setting `.faq-answer.style.maxHeight`. Preserve form submission scripts and other page behavior.

- [ ] **Step 6: Build and verify GREEN**

Run: `npm run build && node --test tests/faq-global.test.mjs tests/motion-policy.test.mjs`

Expected: the 14 source-contract assertions pass and each built route contains at least eight `.site-faq-list__item` elements.

- [ ] **Step 7: Commit**

```bash
git add src/pages/agentes-limpios.astro src/pages/agua-presion.astro src/pages/capacitacion-brigadas.astro src/pages/co2.astro src/pages/espuma-afff.astro src/pages/extintores.astro src/pages/mantenimiento-preventivo.astro src/pages/polvo-quimico-seco.astro src/pages/prueba-hidrostatica.astro src/pages/recarga-de-extintores.astro src/pages/senalizacion.astro src/pages/servicios.astro src/pages/tipo-k.astro src/pages/venta-de-extintores.astro tests/faq-global.test.mjs
git commit -m "feat: standardize commercial and service FAQs"
```

---

### Task 7: Migrate institutional and sector FAQ pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/contacto.astro`
- Modify: `src/pages/nosotros.astro`
- Modify: `src/pages/sectores/data-centers.astro`
- Modify: `src/pages/sectores/hospitales.astro`
- Modify: `src/pages/sectores/restaurantes.astro`
- Modify: `tests/faq-global.test.mjs`

**Interfaces:**
- Consumes: the same registry, schema helper and renderer as Task 6.
- Produces: the remaining six static FAQ pages under the global contract.

- [ ] **Step 1: Add failing source-contract tests**

Append to `tests/faq-global.test.mjs`:

```js
const institutionalFaqPages = {
  'index.astro': '/',
  'contacto.astro': '/contacto',
  'nosotros.astro': '/nosotros',
  'sectores/data-centers.astro': '/sectores/data-centers',
  'sectores/hospitales.astro': '/sectores/hospitales',
  'sectores/restaurantes.astro': '/sectores/restaurantes',
};

test('institutional and sector pages consume central FAQ data and component', async () => {
  for (const [file, route] of Object.entries(institutionalFaqPages)) {
    const source = await readFile(new URL(`../src/pages/${file}`, import.meta.url), 'utf8');
    assert.match(source, new RegExp(`getSiteFaqs\\(['"]${route.replaceAll('/', '\\/')}['"]\\)`));
    assert.match(source, /buildFaqSchema\(faqs\)/);
    assert.match(source, /<FaqList\s+faqs=\{faqs\}/);
  }
});
```

- [ ] **Step 2: Verify RED**

Run: `node --test tests/faq-global.test.mjs`

Expected: FAIL while the six pages still use their current data and markup.

- [ ] **Step 3: Migrate root institutional pages**

In `index.astro`, `contacto.astro`, and `nosotros.astro`, use:

```astro
import FaqList from '../components/FaqList.astro';
import { getSiteFaqs } from '../data/site-faqs.mjs';
import { buildFaqSchema } from '../lib/faq-utils.mjs';
```

Use the following exact route declaration in each root file, then build the schema from the same array:

```js
// src/pages/index.astro
const faqs = getSiteFaqs('/');
// src/pages/contacto.astro
const faqs = getSiteFaqs('/contacto');
// src/pages/nosotros.astro
const faqs = getSiteFaqs('/nosotros');

// Add this immediately after the route-specific declaration in every file.
const faqSchema = JSON.stringify(buildFaqSchema(faqs));
```

In each file, replace the complete hardcoded FAQ list with:

```astro
<FaqList faqs={faqs} firstOpen={true} />
```

Remove only the inline script block that selects or toggles the old FAQ controls; preserve all form, navigation and conversion behavior.

- [ ] **Step 4: Migrate sector pages with depth-correct imports**

In the three files under `src/pages/sectores`, use:

```astro
import FaqList from '../../components/FaqList.astro';
import { getSiteFaqs } from '../../data/site-faqs.mjs';
import { buildFaqSchema } from '../../lib/faq-utils.mjs';
```

Use the following exact route declaration in each sector file and build its schema from the same array:

```js
// src/pages/sectores/data-centers.astro
const faqs = getSiteFaqs('/sectores/data-centers');
// src/pages/sectores/hospitales.astro
const faqs = getSiteFaqs('/sectores/hospitales');
// src/pages/sectores/restaurantes.astro
const faqs = getSiteFaqs('/sectores/restaurantes');

// Add this immediately after the route-specific declaration in every file.
const faqSchema = JSON.stringify(buildFaqSchema(faqs));
```

Replace each complete visible FAQ list with:

```astro
<FaqList faqs={faqs} firstOpen={true} />
```

- [ ] **Step 5: Build and verify GREEN**

Run: `npm run build && node --test tests/faq-global.test.mjs tests/motion-policy.test.mjs`

Expected: all 21 static FAQ routes now pass the source contract and render at least eight questions.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro src/pages/contacto.astro src/pages/nosotros.astro src/pages/sectores/data-centers.astro src/pages/sectores/hospitales.astro src/pages/sectores/restaurantes.astro tests/faq-global.test.mjs
git commit -m "feat: standardize institutional and sector FAQs"
```

---

### Task 8: Built HTML/schema parity across all 67 FAQ routes

**Files:**
- Modify: `tests/faq-global.test.mjs`

**Interfaces:**
- Consumes: `dist` HTML generated by Astro.
- Produces: a regression gate for 21 static pages and 46 catalog details.

- [ ] **Step 1: Add the built-output test before changing implementation further**

Append to `tests/faq-global.test.mjs`:

```js
function htmlPathForRoute(route) {
  return route === '/'
    ? new URL('../dist/index.html', import.meta.url)
    : new URL(`../dist${route}/index.html`, import.meta.url);
}

function faqSchemasFromHtml(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .filter((schema) => schema['@type'] === 'FAQPage');
}

test('all 21 static FAQ pages render eight visible items and one matching schema', async () => {
  for (const route of siteFaqRoutes) {
    const html = await readFile(htmlPathForRoute(route), 'utf8');
    const visibleCount = (html.match(/class="site-faq-list__item"/g) || []).length;
    const schemas = faqSchemasFromHtml(html);
    assert.ok(visibleCount >= 8, `${route} renders ${visibleCount} visible FAQs`);
    assert.equal(schemas.length, 1, `${route} must render one FAQPage schema`);
    assert.equal(schemas[0].mainEntity.length, visibleCount, `${route} schema and visible FAQ counts differ`);
  }
});

test('all 46 catalog detail pages render eight visible items and matching schema', async () => {
  for (const product of catalogProductDetails) {
    const route = `/catalogo/${product.slug}`;
    const html = await readFile(htmlPathForRoute(route), 'utf8');
    const visibleCount = (html.match(/class="site-faq-list__item"/g) || []).length;
    const schemas = faqSchemasFromHtml(html);
    assert.ok(visibleCount >= 8, `${route} renders ${visibleCount} visible FAQs`);
    assert.equal(schemas.length, 1, `${route} must render one FAQPage schema`);
    assert.equal(schemas[0].mainEntity.length, visibleCount, `${route} schema and visible FAQ counts differ`);
  }
});
```

- [ ] **Step 2: Build and run the global test**

Run: `npm run build && node --test tests/faq-global.test.mjs`

Expected: 67 routes pass the visible-count and schema-parity contract.

- [ ] **Step 3: Commit**

```bash
git add tests/faq-global.test.mjs
git commit -m "test: verify global FAQ schema parity"
```

---

### Task 9: Documentation, full verification and visual QA

**Files:**
- Modify: `MEMORY.md`
- Modify: `docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md`
- Modify: `graphify-out/PRODUCT-CATALOG-TEMPLATE.md`
- Modify: `MANEXT/Productos — Catálogo y Plantilla.md`

**Interfaces:**
- Consumes: the completed global FAQ contract.
- Produces: persistent operational guidance and verified release-ready code.

- [ ] **Step 1: Update operational memory**

Add this rule to all four documentation targets:

```markdown
- Toda sección FAQ existente debe publicar al menos 8 preguntas visibles, únicas y contextuales.
- El contenido visible y `FAQPage` deben provenir del mismo arreglo.
- Las 46 fichas del catálogo obtienen sus FAQs desde el perfil editorial compartido; no se editan páginas Astro individuales.
- No se inventan precios, stock, certificaciones, garantías, plazos ni resultados regulatorios.
```

- [ ] **Step 2: Run the complete technical gate**

Run:

```bash
npm run build
npm test
npx astro check
git diff --check
```

Expected:

- 232 pages built;
- all tests pass;
- Astro reports 0 errors and 0 warnings, allowing only the 25 pre-existing hints;
- `git diff --check` exits 0.

- [ ] **Step 3: Run visual QA on representative routes**

Start the local server on `127.0.0.1:4310` from this worktree and inspect:

```text
/catalogo
/catalogo/extintor-co2-portatil
/catalogo/gabinete-metalico
/mantenimiento-preventivo
/sectores/restaurantes
/contacto
```

At desktop width and 390 × 844 px confirm:

- at least eight questions are visible in the DOM;
- FAQ remains left and quotation remains right where applicable;
- modules stack into one column on mobile;
- summary focus is visible;
- opening and closing has no animation;
- no horizontal overflow;
- WhatsApp form remains usable.

- [ ] **Step 4: Commit documentation and any verification-only adjustments**

```bash
git add MEMORY.md docs/catalogo/PLANTILLA-FICHAS-PRODUCTO.md graphify-out/PRODUCT-CATALOG-TEMPLATE.md "MANEXT/Productos — Catálogo y Plantilla.md"
git commit -m "docs: record global FAQ standard"
```

- [ ] **Step 5: Leave the branch ready for the user's publication command**

Run:

```bash
git status -sb
git log --oneline origin/main..HEAD
```

Expected: clean working tree on `codex/faq-global-minimo-ocho` with all implementation commits ahead of `origin/main`. Do not push or deploy until the user explicitly requests “commit y push”; that command means push, integrate into `main`, deploy Cloudflare Pages, and verify the public URL.
