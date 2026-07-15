# MANEXT — Módulo unificado de FAQ y cotización del catálogo

**Fecha:** 2026-07-15  
**Estado:** Diseño aprobado  
**Primera implementación:** `/catalogo`  
**Referencia visual:** módulo combinado de `/catalogo/extintor-co2-portatil`

## Objetivo

Unificar las secciones actuales de preguntas frecuentes y cotización de la página principal del catálogo en una sola superficie profesional de dos columnas. El módulo debe reducir el salto entre resolver dudas y solicitar una propuesta, mantener la identidad visual de MANEXT y quedar preparado para reutilizarse posteriormente en otras páginas.

La primera entrega se conectará únicamente en `/catalogo`. Las fichas de producto y el resto del sitio no cambiarán hasta que el usuario revise y apruebe visualmente esta implementación.

## Alcance

### Incluido

- Sustituir las dos secciones separadas de `/catalogo` por un solo módulo.
- Colocar las preguntas frecuentes en la primera columna.
- Colocar la introducción comercial y el formulario de WhatsApp en la segunda columna.
- Conservar las cinco preguntas actuales y sus respuestas, también usadas por el schema `FAQPage`.
- Conservar todos los campos, validaciones y generación del mensaje de WhatsApp.
- Mantener el teléfono `56 1461 2594`, el aviso de privacidad y la microcopia previa al envío.
- Preparar una estructura reutilizable sin modificar todavía otras páginas.
- Revisar escritorio y móvil, incluyendo 390 × 844 px.

### Excluido

- Cambios en las fichas `/catalogo/[slug]`.
- Cambios en las páginas legacy `/productos/[...slug]`.
- Nuevos campos, automatizaciones, CRM o envío directo de formularios.
- Precios, ofertas, disponibilidad, ratings, stock o certificaciones no verificadas.
- Cambios en las preguntas y respuestas del catálogo salvo ajustes menores de puntuación o accesibilidad.

## Enfoques considerados

1. **Superficie compartida homologada con las fichas — aprobado.** FAQ blanca a la izquierda; cotización a la derecha con encabezado carbón y formulario blanco. Es el patrón más consistente con el template de producto ya validado.
2. **Panel rojo más formulario blanco.** Tiene mayor impacto comercial, pero domina visualmente la sección y compite con los CTA existentes.
3. **Módulo completamente blanco.** Es limpio, aunque separa peor la orientación técnica de la acción comercial.

## Arquitectura de componentes

Se creará un componente reusable para la composición, con una interfaz explícita:

- Datos de encabezado de FAQ: eyebrow, título e introducción.
- Lista de preguntas y respuestas.
- Productos y sectores consumidos por `QuoteForm.astro`.
- Producto preseleccionado opcional para una futura reutilización.
- Identificadores y etiquetas accesibles configurables.

El componente sólo compone contenido existente. `QuoteForm.astro` seguirá siendo la única fuente del formulario y `public/js/catalog-system.js` seguirá gestionando validación y mensaje de WhatsApp. No se duplicará lógica de formulario.

En `/catalogo`, el componente reemplazará los dos bloques actuales:

- `.quote-section`
- `.catalog-faq`

El array `faqs` permanecerá en la página durante esta primera implementación porque también alimenta el schema `FAQPage`.

## Diseño visual

### Contenedor

- Sección sobre fondo gris técnico claro, separada mediante borde superior.
- Ancho máximo definido por el contenedor global del catálogo.
- Superficie única blanca con borde gris, radio de 22 px y sombra difusa contenida.
- Sin tarjetas internas innecesarias; la separación se resuelve con color, borde y espacio.

### Columna izquierda: preguntas frecuentes

- Proporción de escritorio: `.92fr`.
- Padding fluido entre 2 y 3.2 rem.
- Eyebrow rojo: `Antes de cotizar`.
- H2: `Preguntas frecuentes del catálogo`.
- Introducción: `Respuestas claras sobre selección, disponibilidad y servicios.`
- Acordeones construidos con `details` y `summary` nativos.
- Primera pregunta abierta para ofrecer contexto inmediato.
- Indicador `+` estático; el cambio de estado no dependerá de animación.
- Divisores horizontales en lugar de tarjetas individuales.

### Columna derecha: cotización

- Proporción de escritorio: `1.08fr`.
- El `QuoteForm` se mostrará en modo columna única dentro de esta zona.
- Encabezado carbón con kicker, H2, explicación, tres beneficios y teléfono.
- Formulario sobre fondo blanco con etiquetas arriba de cada control.
- Campos organizados en dos columnas cuando el ancho lo permita.
- Botón rojo de ancho completo, como única pieza con transición visual.
- Mensaje de error inline con `role="alert"` y campos inválidos marcados con `aria-invalid`.

## Responsive

- Escritorio: dos columnas `.92fr / 1.08fr`.
- A 900 px o menos: una sola columna.
- Orden móvil: FAQ primero y cotización después, conforme a la solicitud.
- La división vertical cambia a borde inferior en la columna FAQ.
- A 680 px o menos: los campos pasan a una columna.
- A 420 px o menos: los servicios seleccionables pasan a una columna.
- El módulo no producirá scroll horizontal y conservará áreas táctiles de al menos 44 px.

## Accesibilidad y semántica

- Una única sección con `aria-labelledby` apuntando al H2 de FAQ.
- `details/summary` conserva interacción por teclado sin JavaScript adicional.
- `fieldset` y `legend` agrupan los servicios opcionales.
- Labels visibles permanecen asociados a sus controles mediante la estructura actual.
- Estados de foco visibles para FAQ, controles y CTA.
- El schema `FAQPage` debe coincidir exactamente con las preguntas y respuestas visibles.
- No se introducirá un segundo H1.

## Movimiento y rendimiento

- No habrá animaciones, fades, desplazamientos, escalas ni transiciones en el módulo, acordeones o superficies.
- Sólo el botón de envío podrá conservar una transición breve de color.
- No se añadirán librerías ni dependencias.
- La implementación será Astro y CSS compartido; no necesita JavaScript adicional.
- Se incrementará la versión de `catalog-system.css` en `catalogo.astro` para evitar CSS obsoleto en caché.

## Seguridad y privacidad

- Los valores capturados se usarán únicamente para construir el texto que el usuario revisa en WhatsApp.
- No se introducirá `innerHTML`, `eval`, plantillas ejecutables ni almacenamiento persistente.
- Se mantendrá la validación de campos requeridos y tipos nativos de HTML.
- El enlace al aviso de privacidad seguirá siendo obligatorio antes de abrir WhatsApp.
- El formulario no enviará datos silenciosamente ni añadirá endpoints nuevos.

## Pruebas

Se añadirán primero contratos que fallen con la estructura actual y confirmen:

- Existe un solo módulo de conversión que contiene FAQ y `QuoteForm`.
- Las FAQ aparecen antes del formulario en el HTML.
- Desaparecen las dos secciones separadas actuales.
- El componente conserva las cinco preguntas y el formulario reutilizable.
- El CSS usa dos columnas en escritorio y una columna en móvil.
- El módulo no introduce animaciones ni transiciones fuera del botón.
- El build conserva `FAQPage`, formulario, privacidad y CTA de WhatsApp.

Verificación final obligatoria:

```bash
npm test
npm run build
npx astro check
```

Además se revisará visualmente `/catalogo` en escritorio y en 390 × 844 px.

## Criterios de aceptación

- FAQ y formulario forman una sola superficie de dos columnas en escritorio.
- La primera columna contiene encabezado y cinco FAQ.
- La segunda columna contiene introducción de cotización, beneficios, teléfono y formulario completo.
- En móvil, FAQ se muestra antes del formulario.
- No hay contenido duplicado ni secciones antiguas separadas.
- El formulario abre WhatsApp con la información capturada sólo después de validación.
- El schema FAQ coincide con el contenido visible.
- No existen animaciones o transiciones fuera del botón.
- La página compila y todas las pruebas pasan.

## Estrategia de despliegue

1. Implementar y mostrar el cambio únicamente en `/catalogo`.
2. Obtener aprobación visual del usuario.
3. En una solicitud posterior, reutilizar o adaptar el componente en las demás páginas definidas por el usuario.

