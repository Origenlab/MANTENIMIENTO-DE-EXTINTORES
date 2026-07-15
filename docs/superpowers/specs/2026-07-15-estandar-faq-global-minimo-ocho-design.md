# Estándar global de preguntas frecuentes: mínimo ocho por sección

**Fecha:** 2026-07-15  
**Estado:** aprobado para planificación  
**Sitio:** MANEXT — mantenimientodeextintores.mx

## Contexto

El sitio tiene varias implementaciones de preguntas frecuentes. El catálogo principal presenta cinco preguntas; las 46 fichas dinámicas del catálogo reciben cinco preguntas desde su perfil editorial; y las páginas comerciales, de servicios y sectores contienen entre cuatro y nueve preguntas escritas con estructuras distintas. En varias páginas el contenido visible y el `FAQPage` de Schema.org también se mantienen por separado, lo que aumenta el riesgo de inconsistencias.

La solicitud aprobada establece un estándar global: toda sección de preguntas frecuentes existente debe contener como mínimo ocho preguntas con respuestas útiles, específicas y verificables. No se trata de repetir un bloque corporativo en todas las URLs, sino de mejorar cada sección según la intención de búsqueda y el riesgo o servicio tratado.

## Objetivos

1. Garantizar un mínimo de ocho preguntas visibles en cada sección FAQ existente.
2. Mantener preguntas y respuestas específicas para cada producto, servicio, agente o sector.
3. Usar el mismo origen de datos para el contenido visible y el schema `FAQPage`.
4. Mejorar claridad, utilidad comercial, naturalidad y cobertura semántica sin rellenar palabras clave.
5. Eliminar o reescribir afirmaciones no demostradas sobre precios, stock, certificaciones, garantías, plazos o resultados regulatorios.
6. Conservar la política global de movimiento: sin animaciones ni transiciones fuera de botones y CTA.
7. Mantener el formulario de cotización junto al FAQ en las páginas donde ambos ya forman un módulo combinado.

## Alcance

### Incluido

- El catálogo principal `/catalogo`.
- Las 46 fichas dinámicas `/catalogo/[slug]`.
- Las 21 páginas Astro que actualmente declaran `FAQPage`, incluyendo:
  - inicio, contacto y nosotros;
  - venta de extintores, extintores y servicios;
  - agentes o familias: PQS, CO₂, agua, espuma AFFF, tipo K y agentes limpios;
  - mantenimiento, recarga, prueba hidrostática, señalización y capacitación;
  - sectores: restaurantes, hospitales y centros de datos.
- La estructura visual y semántica de los acordeones existentes.
- Las pruebas de contenido, schema, accesibilidad básica y política de movimiento.

### Excluido

- Añadir un bloque FAQ a páginas que actualmente no tienen uno.
- Añadir ocho preguntas automáticamente a cada artículo del blog.
- Publicar precios, descuentos, stock, tiempos garantizados o certificaciones sin evidencia del producto o servicio cotizado.
- Cambiar el diseño completo de las páginas fuera del módulo FAQ/cotización.
- Cambiar el funcionamiento del formulario de WhatsApp salvo lo necesario para reutilizar el módulo actual.

## Enfoques considerados

### 1. Revisión contextual global — seleccionado

Cada ruta conserva preguntas propias. Se centraliza el contenido por familia de página y se reutiliza la estructura de renderizado. Es el enfoque con mayor calidad SEO, utilidad y mantenibilidad.

### 2. FAQ corporativo compartido en todo el sitio

Reduce el trabajo inicial, pero crea contenido duplicado, preguntas irrelevantes y una experiencia débil. Se descarta.

### 3. Añadir FAQ a todas las URLs, incluido el blog

Aumenta el volumen, pero no responde a una necesidad real en todas las páginas y puede diluir la intención del contenido. Se descarta.

## Arquitectura de contenido

### Contrato común

Toda colección FAQ tendrá esta forma:

```js
[
  {
    question: 'Pregunta completa y natural',
    answer: 'Respuesta visible, específica y verificable.'
  }
]
```

Reglas del contrato:

- mínimo ocho elementos;
- preguntas únicas dentro de la ruta;
- pregunta y respuesta no vacías;
- respuesta suficiente para resolver la duda sin convertir el acordeón en un artículo;
- mismo arreglo para HTML y `FAQPage`;
- sin HTML no confiable ni `set:html` para las respuestas;
- Astro debe escapar el contenido por defecto.

### Catálogo principal

El arreglo `faqs` de `src/pages/catalogo.astro` crecerá de cinco a ocho o diez preguntas. Las nuevas preguntas cubrirán, como mínimo:

- diferencia entre capacidad nominal y cobertura o rating;
- datos necesarios para preparar una cotización útil;
- servicios posteriores, mantenimiento y recarga;
- confirmación de disponibilidad, modelo y documentación.

El componente `FaqQuoteModule.astro` seguirá recibiendo el mismo arreglo que utiliza el schema de la página.

### Fichas del catálogo

Las 46 fichas consumen el perfil editorial generado en `src/data/catalog-editorial/profile.mjs`. El perfil pasará de cinco a un mínimo de ocho preguntas específicas a partir de los datos de cada semilla editorial.

Las preguntas adicionales cubrirán:

- compatibilidad o limitación principal;
- variante, capacidad o presentación;
- instalación, señalización y servicio posterior;
- documentación o datos que deben confirmarse en la propuesta.

No se restaurarán automáticamente las FAQs de los objetos base porque `applyEditorialProfile()` sustituye ese arreglo. La fuente editorial será el contrato efectivo y se probará sobre los 46 resultados finales de `catalogProductDetails`.

### Páginas comerciales, de servicio y sectores

Las preguntas actualmente escritas directamente en las páginas se migrarán a colecciones de datos por ruta. Un componente compartido renderizará la lista accesible, mientras cada página conservará su encabezado, formulario y contexto visual.

La migración debe evitar dos fuentes paralelas. El schema se construirá desde la misma colección que se entrega al componente.

Las páginas que ya tienen nueve preguntas también se revisarán: cumplir la cantidad no exime corregir respuestas repetitivas, excesivas o con promesas no sustentadas.

## Estrategia editorial

Cada sección tendrá entre ocho y diez preguntas organizadas alrededor de la intención principal de la página.

### Cobertura mínima por página

1. Qué es o para qué sirve el producto o servicio.
2. Cuándo conviene y cuándo no conviene.
3. Cómo se selecciona capacidad, variante, cantidad o alcance.
4. Qué limitación o riesgo debe considerar el comprador.
5. Qué datos necesita MANEXT para cotizar.
6. Qué servicios complementarios pueden incluirse.
7. Cómo se gestiona mantenimiento, recarga o seguimiento cuando corresponde.
8. Qué disponibilidad o documentación se confirma en la propuesta.

Las páginas de sector adaptarán estas categorías al inmueble y la operación. Las páginas institucionales usarán preguntas sobre proceso, cobertura, atención, documentación y contacto, sin forzar detalles de producto irrelevantes.

### Tono

- Profesional, directo y humano.
- Respuestas breves, normalmente de 45 a 110 palabras.
- Sin absolutos como “garantizado”, “obligatorio” o “certificado” salvo respaldo y alcance exactos.
- Sin presentar recomendaciones generales como dimensionamiento definitivo.
- Sin repetir el nombre comercial artificialmente en cada oración.

## Precisión técnica, normativa y comercial

- La NOM-002-STPS-2010 se describirá como norma de prevención y protección contra incendios en centros de trabajo; no se usará para inventar una configuración universal.
- La NOM-154-SCFI-2005 se describirá dentro de su alcance para servicios de mantenimiento y recarga; no se presentará como certificación automática del producto vendido.
- La clase de fuego, el rating, la capacidad y la compatibilidad se diferenciarán claramente.
- La disponibilidad, marca, modelo, documentación y configuración se confirmarán en la cotización.
- Las afirmaciones técnicas nuevas usarán fuentes primarias: STPS, DOF y documentación oficial del fabricante o del agente cuando corresponda.

## Diseño e interacción

- Mantener el patrón aprobado de FAQ a la izquierda y cotización a la derecha donde ya existe un módulo combinado.
- Usar acordeones semánticos con `details` y `summary` cuando la migración no rompa contratos existentes.
- Mantener la primera pregunta abierta sólo en los módulos que ya siguen ese patrón.
- En móvil, conservar el apilado en una columna.
- No añadir animaciones, desplazamientos, escalado, fades ni transiciones a acordeones, iconos o contenedores.
- Sólo los botones y CTA conservarán transiciones permitidas.

## SEO y datos estructurados

- El schema `FAQPage` contendrá exactamente las preguntas y respuestas visibles.
- No se generará schema para preguntas ocultas o inexistentes.
- Cada ruta tendrá contenido contextual; no se repetirá el mismo conjunto global.
- La mejora busca utilidad y consistencia semántica. No se prometerán resultados enriquecidos en Google.
- Las respuestas evitarán keyword stuffing y claims comerciales imposibles de verificar.

## Seguridad

- Las preguntas y respuestas serán datos internos versionados, no contenido proporcionado por usuarios.
- El renderizado usará interpolación de Astro y escape automático.
- No se utilizará `set:html`, `innerHTML`, `eval` ni construcción dinámica de scripts con el contenido FAQ.
- Los enlaces externos dentro del contexto FAQ, si fueran necesarios, usarán `rel="noopener noreferrer"`.
- El formulario conservará sus validaciones y el usuario revisará el mensaje antes de abrir WhatsApp.

## Pruebas y validación

Las pruebas se escribirán antes de modificar el contenido productivo.

### Contratos de datos

- Cada FAQ registrado contiene al menos ocho elementos.
- No existen preguntas duplicadas después de normalizar mayúsculas, acentos y espacios.
- Ninguna pregunta o respuesta está vacía.
- Las 46 fichas finales de `catalogProductDetails` cumplen el mínimo.

### Contratos de renderizado

- Cada ruta objetivo genera al menos ocho preguntas visibles.
- El número y texto del schema coincide con el contenido visible.
- El catálogo conserva un solo módulo FAQ/cotización.
- Las fichas conservan el formulario contextual y la selección de producto.

### Contratos de movimiento y accesibilidad

- Los acordeones no tienen animación ni transición.
- `summary` o el control equivalente es operable por teclado.
- Los encabezados y regiones conservan asociaciones accesibles.

### Gate final

```bash
npm run build
npm test
npx astro check
git diff --check
```

Además se revisará visualmente:

- `/catalogo` en escritorio y 390 × 844 px;
- una ficha portátil y una ficha de accesorios;
- una página de servicio;
- una página de sector;
- una página institucional.

## Secuencia de implementación

1. Crear pruebas globales que fallen con el estado actual.
2. Ampliar el catálogo principal.
3. Ampliar el generador editorial de las 46 fichas.
4. Crear el contrato compartido para páginas estáticas.
5. Migrar y revisar páginas por grupos: productos, servicios, sectores e institucionales.
6. Sincronizar schema y contenido visible.
7. Ejecutar gate técnico y revisión visual.
8. Documentar la nueva regla en memoria y plantilla operativa.
9. Integrar a `main`, desplegar Cloudflare Pages y verificar el dominio cuando el usuario solicite “commit y push”.

## Criterios de aceptación

- Todas las secciones FAQ existentes contienen al menos ocho preguntas visibles.
- Las preguntas son relevantes para la intención de cada página.
- Las respuestas no inventan precios, stock, certificaciones, garantías ni plazos.
- HTML y `FAQPage` provienen de la misma colección.
- Las 46 fichas dinámicas cumplen el contrato sin editar páginas Astro individuales.
- El módulo combinado mantiene sus dos columnas y se apila correctamente en móvil.
- No existen animaciones fuera de botones y CTA.
- Build, tests, Astro check y diff check terminan correctamente.
- La versión pública se comprueba después del despliegue.

