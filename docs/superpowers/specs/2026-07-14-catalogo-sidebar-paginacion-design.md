# Diseño: catálogo MANEXT con sidebar y paginación

Fecha: 14 de julio de 2026

## Objetivo

Mejorar la exploración del catálogo de MANEXT para que una colección amplia de extintores y equipos relacionados sea fácil de recorrer, filtrar y cotizar sin presentar todas las tarjetas en una sola vista.

La solución conservará el lenguaje visual, los datos, el SEO y el flujo de cotización existentes. El cambio se concentra en la sección `#catalog-products`.

## Decisiones aprobadas

- Mostrar 12 productos por página.
- Usar cuatro tarjetas por fila en escritorio, tres filas visibles por página.
- Incorporar un sidebar de filtros a la izquierda.
- Usar paginación numerada con controles Anterior y Siguiente.
- Mantener el objetivo comercial principal: solicitar cotización, no comprar en línea.
- Adaptar la cuadrícula a dos columnas en tablet y una columna en móvil.
- Convertir el sidebar en un panel desplegable en móvil.

## Arquitectura de la sección

La sección de catálogo tendrá tres niveles:

1. Barra superior de contexto con título, total de coincidencias, orden y botón de filtros para móvil.
2. Área principal de dos columnas: sidebar de filtros y contenido de resultados.
3. Paginación colocada después de la cuadrícula y antes de abandonar la sección.

En escritorio, el sidebar tendrá un ancho estable aproximado de 260 a 280 píxeles. El contenido restante alojará una cuadrícula de cuatro columnas. El contenedor general podrá ampliar su ancho máximo dentro de la escala existente del sitio para evitar tarjetas demasiado estrechas.

## Sidebar

El sidebar agrupará los controles por intención y evitará una apariencia de formulario genérico.

Orden de controles:

1. Búsqueda por nombre, agente, aplicación o capacidad.
2. Categoría de producto.
3. Agente extintor.
4. Clase de fuego.
5. Disponibilidad.
6. Acción para limpiar filtros.

Cada grupo tendrá una etiqueta clara y estados activos visibles. El sidebar será fijo dentro de la sección en escritorio mediante posicionamiento `sticky`, sin cubrir el encabezado del sitio. En móvil se mostrará como panel desplegable controlado por un botón que también indicará la cantidad de filtros activos.

## Cuadrícula de productos

La cuadrícula usará cuatro columnas a partir de escritorio amplio, dos columnas en tablet y una columna en móvil. Las tarjetas conservarán su información esencial y su llamada a cotización.

Para mejorar la consistencia visual:

- Todas las tarjetas de una fila mantendrán una altura coherente.
- La descripción y las aplicaciones tendrán límites visuales para evitar saltos excesivos.
- La llamada “Solicitar cotización” permanecerá visible y tendrá un estado táctil claro.
- Los distintivos de categoría, clase y disponibilidad mantendrán jerarquía secundaria.
- No se añadirán librerías externas; la solución seguirá usando Astro, CSS y JavaScript nativo.

## Paginación y comportamiento

La paginación se calculará sobre el conjunto filtrado, no sobre el catálogo completo.

Reglas:

- Doce productos por página.
- Botones Anterior y Siguiente desactivados en los límites.
- Números de página con estado actual accesible mediante `aria-current="page"`.
- Cuando existan muchas páginas, se mostrará un rango compacto con puntos suspensivos.
- Al modificar búsqueda, categoría, agente, clase o disponibilidad, la vista regresará a la página 1.
- Al cambiar de página, la sección de resultados volverá a una posición visible sin desplazar al usuario hasta el inicio de todo el sitio.
- El contador mostrará el rango visible y el total filtrado, por ejemplo: “Mostrando 13–24 de 46 productos”.
- Si no hay resultados, se ocultarán la cuadrícula y la paginación y se mostrará el estado vacío existente.

## Estado en URL

La búsqueda, los filtros y la página actual se sincronizarán con parámetros de consulta. Esto permitirá compartir una selección concreta y conservar el estado al recargar.

Parámetros previstos:

- `q`: búsqueda.
- `tipo`: categoría.
- `agente`: agente extintor.
- `clase`: clase de fuego.
- `disponibilidad`: disponibilidad.
- `pagina`: página actual.

Los valores se validarán contra las opciones reales del catálogo antes de aplicarse. No se insertará contenido de parámetros como HTML.

## Accesibilidad y experiencia

- El sidebar tendrá una etiqueta accesible de filtros del catálogo.
- El control móvil anunciará su estado expandido con `aria-expanded`.
- La paginación usará un elemento `nav` con etiqueta descriptiva.
- Todos los botones serán operables con teclado y mostrarán foco visible.
- Los cambios de resultados actualizarán una región `aria-live` sin interrumpir la navegación.
- Se respetará `prefers-reduced-motion` para movimientos y transiciones.

## SEO y marketing

La paginación será una mejora de interacción sobre una página indexable que conserva el contenido de productos en el HTML inicial. Los filtros no crearán páginas canónicas independientes ni duplicarán metadatos.

El diseño priorizará:

- Descubrimiento rápido del equipo adecuado.
- Evidencia visible de amplitud del catálogo.
- Acceso constante a la solicitud de cotización.
- Mensajes consultivos cuando el usuario no conozca la selección técnica.
- Conservación del schema de catálogo y del contenido descriptivo existente.

## Componentes y responsabilidades

- `CatalogFilters.astro`: estructura semántica del sidebar y controles.
- `CatalogCard.astro`: presentación consistente de cada producto.
- `catalogo.astro`: composición del layout del catálogo y contenedores de resultados/paginación.
- `catalog-system.js`: estado, filtrado, ordenamiento, paginación, URL y accesibilidad dinámica.
- `catalog-system.css`: grid de cuatro columnas, sidebar, paginación, estados responsivos y foco.
- `catalog.test.mjs`: reglas de paginación, presencia de la estructura, cantidad por página y regresiones del catálogo.

## Manejo de errores y casos límite

- Parámetros inválidos en URL se ignorarán y se normalizará la vista a valores seguros.
- Una página solicitada mayor al total disponible se ajustará a la última página válida.
- Cero resultados mostrará el estado vacío y permitirá limpiar filtros.
- JavaScript deshabilitado mantendrá todos los productos disponibles en el HTML, con una presentación legible.
- Los controles móviles no bloquearán el scroll ni dejarán contenido inaccesible.

## Verificación

Antes de considerar la mejora terminada se comprobará:

1. Pruebas automatizadas en estado rojo antes de la implementación y verdes después.
2. Compilación completa de Astro sin errores.
3. Doce tarjetas visibles en la primera página cuando existan al menos doce resultados.
4. Cuatro columnas en escritorio, dos en tablet y una en móvil.
5. Filtros combinados, limpieza, estado vacío y retorno a página 1.
6. Navegación entre páginas y sincronización con la URL.
7. Operación por teclado y atributos accesibles principales.
8. Revisión visual en el navegador integrado en escritorio y móvil.

## Fuera de alcance

- Precios, carrito o pago en línea.
- Carga de productos desde una base de datos externa.
- Nuevas familias de productos o cambios en el estudio de mercado.
- Rediseño de las secciones posteriores de paquetes, clases de fuego, cotización o preguntas frecuentes.
