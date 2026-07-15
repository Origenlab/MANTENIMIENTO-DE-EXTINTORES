import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const projectRoot = process.env.MANEXT_ROOT || process.cwd();
const outputDir = path.join(projectRoot, 'outputs/catalogo-expansion-230');
const previewDir = path.join(outputDir, 'previews');
const { catalogExpansionProposals } = await import(
  pathToFileURL(path.join(projectRoot, 'src/data/catalog-expansion/index.mjs')).href
);
const { catalogProducts } = await import(
  pathToFileURL(path.join(projectRoot, 'src/data/catalog-products.mjs')).href
);

await fs.mkdir(previewDir, { recursive: true });

const workbook = Workbook.create();
const summary = workbook.worksheets.add('Resumen');
const matrix = workbook.worksheets.add('Matriz 230');
const sources = workbook.worksheets.add('Fuentes');
const criteria = workbook.worksheets.add('Criterios');

const colors = {
  red: '#B91C2C',
  redDark: '#7F1D1D',
  charcoal: '#172033',
  ink: '#263244',
  gray: '#667085',
  line: '#D9DEE7',
  soft: '#F4F6F8',
  paleRed: '#FCEBED',
  paleGreen: '#EAF7EF',
  white: '#FFFFFF',
};

const matrixHeaders = [
  'ID de propuesta', 'ID familia actual', 'Grupo', 'Nombre comercial', 'Nombre corto', 'Slug propuesto',
  'URL canónica', 'Tipo de diferenciación', 'Agente o material', 'Clases de fuego', 'Variantes',
  'Aplicaciones', 'Sectores', 'Necesidad del comprador', 'Propuesta de valor', 'Criterio de selección',
  'Limitaciones', 'Palabra clave primaria', 'Palabras clave secundarias', 'Intención de búsqueda', 'H1',
  'SEO title', 'Meta description', 'Texto de enlace en card', 'Producto para cotización',
  'Variante para cotización', 'Fuentes primarias', 'Fuentes normativas', 'Revisión de fuentes',
  'Estado', 'Prioridad', 'Validación técnica', 'Validación editorial', 'Notas',
];

const matrixRows = catalogExpansionProposals.map((proposal) => [
  proposal.id,
  proposal.parentId,
  proposal.group,
  proposal.name,
  proposal.shortName,
  proposal.slug,
  proposal.canonical,
  proposal.differentiationType,
  proposal.agentOrMaterial,
  proposal.fireClasses.join(' · '),
  proposal.variants.join(' · '),
  proposal.applications.join(' · '),
  proposal.sectors.join(' · '),
  proposal.need,
  proposal.valueProposition,
  proposal.selection,
  proposal.limitations.join(' · '),
  proposal.primaryKeyword,
  proposal.secondaryKeywords.join(' · '),
  proposal.searchIntent,
  proposal.h1,
  proposal.seoTitle,
  proposal.metaDescription,
  proposal.cardAnchor,
  proposal.quoteProduct,
  proposal.quoteVariant,
  proposal.primarySources.join('\n'),
  proposal.normativeSources.join('\n'),
  new Date(`${proposal.sourceReviewedAt}T12:00:00`),
  proposal.status,
  proposal.priority,
  proposal.technicalValidation ? 'Sí' : 'No',
  proposal.editorialValidation ? 'Sí' : 'No',
  proposal.notes,
]);

matrix.getRangeByIndexes(0, 0, matrixRows.length + 1, matrixHeaders.length).values = [matrixHeaders, ...matrixRows];
matrix.showGridLines = false;
matrix.freezePanes.freezeRows(1);
matrix.freezePanes.freezeColumns(3);
const matrixTable = matrix.tables.add(`A1:AH${matrixRows.length + 1}`, true, 'MatrizExpansion230');
matrixTable.style = 'TableStyleMedium2';
matrixTable.showFilterButton = true;
matrix.getRange('A1:AH1').format = {
  fill: colors.charcoal,
  font: { bold: true, color: colors.white, size: 10 },
  verticalAlignment: 'center',
  wrapText: true,
  borders: { preset: 'outside', style: 'thin', color: colors.charcoal },
};
matrix.getRange(`A2:AH${matrixRows.length + 1}`).format = {
  font: { color: colors.ink, size: 9 },
  verticalAlignment: 'top',
  wrapText: true,
};
matrix.getRange(`A2:AH${matrixRows.length + 1}`).format.rowHeight = 42;
matrix.getRange(`AC2:AC${matrixRows.length + 1}`).format.numberFormat = 'yyyy-mm-dd';
matrix.getRange('A1:AH1').format.rowHeight = 34;
matrix.getRange('A:A').format.columnWidth = 28;
matrix.getRange('B:C').format.columnWidth = 19;
matrix.getRange('D:E').format.columnWidth = 28;
matrix.getRange('F:F').format.columnWidth = 30;
matrix.getRange('G:G').format.columnWidth = 46;
matrix.getRange('H:M').format.columnWidth = 24;
matrix.getRange('N:Q').format.columnWidth = 42;
matrix.getRange('R:R').format.columnWidth = 34;
matrix.getRange('S:W').format.columnWidth = 46;
matrix.getRange('X:Z').format.columnWidth = 30;
matrix.getRange('AA:AB').format.columnWidth = 48;
matrix.getRange('AC:AG').format.columnWidth = 18;
matrix.getRange('AH:AH').format.columnWidth = 48;
matrix.getRange(`AE2:AE${matrixRows.length + 1}`).dataValidation = {
  rule: { type: 'list', values: ['alta', 'media', 'especialidad'] },
};
matrix.getRange(`AD2:AD${matrixRows.length + 1}`).dataValidation = {
  rule: { type: 'list', values: ['research', 'validated', 'approved', 'rejected'] },
};
matrix.getRange(`AE2:AE${matrixRows.length + 1}`).conditionalFormats.add('containsText', {
  text: 'alta',
  format: { fill: colors.paleRed, font: { bold: true, color: colors.redDark } },
});
matrix.getRange(`AD2:AD${matrixRows.length + 1}`).conditionalFormats.add('containsText', {
  text: 'validated',
  format: { fill: colors.paleGreen, font: { color: '#166534' } },
});

summary.showGridLines = false;
summary.mergeCells('A1:H2');
summary.getRange('A1').values = [['Expansión estratégica del catálogo MANEXT']];
summary.getRange('A1:H2').format = {
  fill: colors.charcoal,
  font: { bold: true, color: colors.white, size: 22 },
  verticalAlignment: 'center',
};
summary.mergeCells('A3:H3');
summary.getRange('A3').values = [[
  'Blueprint editorial y comercial · 230 propuestas derivadas de 46 familias · No publicado en el sitio',
]];
summary.getRange('A3:H3').format = {
  fill: colors.soft,
  font: { color: colors.gray, italic: true, size: 10 },
  verticalAlignment: 'center',
};

const cards = [
  { range: 'A5:B7', label: 'Familias actuales', formula: `=COUNTA('Resumen'!$A$30:$A$75)`, fill: colors.soft },
  { range: 'C5:D7', label: 'Propuestas nuevas', formula: `=COUNTA('Matriz 230'!$A$2:$A$231)`, fill: colors.paleRed },
  { range: 'E5:F7', label: 'Propuestas por familia', formula: `='Resumen'!$C$6/'Resumen'!$A$6`, fill: colors.soft },
  { range: 'G5:H7', label: 'Estado de publicación', value: 'Planeación', fill: colors.paleGreen },
];

for (const card of cards) {
  const [start] = card.range.split(':');
  const col = start[0];
  const row = Number(start.slice(1));
  const endCol = String.fromCharCode(col.charCodeAt(0) + 1);
  const labelRange = `${col}${row}:${endCol}${row}`;
  summary.mergeCells(labelRange);
  summary.getRange(`${col}${row}`).values = [[card.label]];
  const valueRange = `${col}${row + 1}:${endCol}${row + 2}`;
  summary.mergeCells(valueRange);
  if (card.formula) summary.getRange(`${col}${row + 1}`).formulas = [[card.formula]];
  else summary.getRange(`${col}${row + 1}`).values = [[card.value]];
  summary.getRange(labelRange).format = {
    fill: card.fill,
    font: { bold: true, color: colors.charcoal, size: 10 },
    verticalAlignment: 'top',
    borders: { preset: 'outside', style: 'thin', color: colors.line },
  };
  summary.getRange(valueRange).format = {
    fill: card.fill,
    font: { bold: true, color: colors.redDark, size: 20 },
    verticalAlignment: 'center',
    borders: { preset: 'outside', style: 'thin', color: colors.line },
  };
}

summary.mergeCells('A9:H9');
summary.getRange('A9').values = [['Distribución de la expansión']];
summary.getRange('A9:H9').format = {
  fill: colors.red,
  font: { bold: true, color: colors.white, size: 12 },
  verticalAlignment: 'center',
};
summary.getRange('A10:E10').values = [[
  'Grupo', 'Familias actuales', 'Propuestas', 'Prioridad alta', '% del total',
]];
summary.getRange('A10:E10').format = {
  fill: colors.charcoal,
  font: { bold: true, color: colors.white },
};
const groupRows = [
  ['portatiles', 15],
  ['industriales', 8],
  ['automaticos', 5],
  ['accesorios', 10],
  ['refacciones', 8],
];
summary.getRange('A11:B15').values = groupRows;
for (let row = 11; row <= 15; row += 1) {
  summary.getRange(`C${row}`).formulas = [[`=COUNTIF('Matriz 230'!$C$2:$C$231,A${row})`]];
  summary.getRange(`D${row}`).formulas = [[`=COUNTIFS('Matriz 230'!$C$2:$C$231,A${row},'Matriz 230'!$AE$2:$AE$231,"alta")`]];
  summary.getRange(`E${row}`).formulas = [[`=C${row}/$C$6`]];
}
summary.getRange('A16:B16').values = [['Total', 46]];
summary.getRange('C16').formulas = [["=SUM('Resumen'!$C$11:$C$15)"]];
summary.getRange('D16').formulas = [["=SUM('Resumen'!$D$11:$D$15)"]];
summary.getRange('E16').formulas = [["=SUM('Resumen'!$E$11:$E$15)"]];
summary.getRange('A11:E16').format = {
  font: { color: colors.ink, size: 10 },
  borders: { insideHorizontal: { style: 'thin', color: colors.line } },
};
summary.getRange('A16:E16').format = {
  fill: colors.soft,
  font: { bold: true, color: colors.charcoal },
  borders: { top: { style: 'medium', color: colors.red } },
};
summary.getRange('E11:E16').format.numberFormat = '0.0%';
summary.mergeCells('A18:H18');
summary.getRange('A18').values = [['Controles editoriales antes de publicar']];
summary.getRange('A18:H18').format = {
  fill: colors.charcoal,
  font: { bold: true, color: colors.white, size: 12 },
};
summary.getRange('A19:H23').values = [
  ['1', 'Validar marca, modelo, capacidad y disponibilidad real con Compras.', '', '', '', '', '', ''],
  ['2', 'Confirmar agente, compatibilidad, aplicación y limitaciones con un responsable técnico.', '', '', '', '', '', ''],
  ['3', 'Redactar cada ficha desde su intención específica; no duplicar el texto de la familia padre.', '', '', '', '', '', ''],
  ['4', 'Aprobar imágenes, ficha técnica, fuentes y CTA de cotización antes de activar la URL.', '', '', '', '', '', ''],
  ['5', 'Publicar en lotes de cinco familias y revisar indexación, enlaces internos y conversiones.', '', '', '', '', '', ''],
];
for (let row = 19; row <= 23; row += 1) summary.mergeCells(`B${row}:H${row}`);
summary.getRange('A19:H23').format = {
  fill: colors.soft,
  font: { color: colors.ink, size: 10 },
  verticalAlignment: 'center',
  borders: { insideHorizontal: { style: 'thin', color: colors.line } },
};
summary.getRange('A19:A23').format = {
  fill: colors.paleRed,
  font: { bold: true, color: colors.redDark, size: 12 },
  horizontalAlignment: 'center',
  verticalAlignment: 'center',
};
summary.getRange('A:A').format.columnWidth = 18;
summary.getRange('B:H').format.columnWidth = 16;
summary.getRange('A1:H23').format.wrapText = true;
summary.freezePanes.freezeRows(3);

const sourceMap = new Map();
for (const proposal of catalogExpansionProposals) {
  for (const url of proposal.primarySources) {
    const entry = sourceMap.get(url) || { type: 'Primaria técnica/comercial', products: new Set(), reviewed: proposal.sourceReviewedAt };
    entry.products.add(proposal.id);
    sourceMap.set(url, entry);
  }
  for (const url of proposal.normativeSources) {
    const entry = sourceMap.get(url) || { type: 'Normativa primaria', products: new Set(), reviewed: proposal.sourceReviewedAt };
    entry.products.add(proposal.id);
    sourceMap.set(url, entry);
  }
}
const sourceRows = [...sourceMap.entries()].map(([url, entry]) => [
  entry.type,
  url,
  entry.products.size,
  new Date(`${entry.reviewed}T12:00:00`),
  [...entry.products].slice(0, 8).join(' · ') + (entry.products.size > 8 ? ' · …' : ''),
]);
sources.getRangeByIndexes(0, 0, sourceRows.length + 1, 5).values = [[
  'Tipo', 'URL', 'Propuestas respaldadas', 'Fecha de revisión', 'Muestra de propuestas',
], ...sourceRows];
sources.showGridLines = false;
sources.freezePanes.freezeRows(1);
const sourcesTable = sources.tables.add(`A1:E${sourceRows.length + 1}`, true, 'FuentesCatalogo');
sourcesTable.style = 'TableStyleMedium2';
sources.getRange('A1:E1').format = {
  fill: colors.charcoal,
  font: { bold: true, color: colors.white },
  wrapText: true,
};
sources.getRange(`A2:E${sourceRows.length + 1}`).format = {
  font: { color: colors.ink, size: 9 },
  verticalAlignment: 'top',
  wrapText: true,
};
sources.getRange(`A2:E${sourceRows.length + 1}`).format.rowHeight = 58;
sources.getRange(`D2:D${sourceRows.length + 1}`).format.numberFormat = 'yyyy-mm-dd';
sources.getRange('A:A').format.columnWidth = 27;
sources.getRange('B:B').format.columnWidth = 72;
sources.getRange('C:D').format.columnWidth = 20;
sources.getRange('E:E').format.columnWidth = 70;

const criteriaRows = [
  ['Objetivo', 'Crear cinco propuestas comerciales distintas por cada una de las 46 familias actuales.', 'La fase produce un blueprint; no activa URLs públicas.'],
  ['Modelo comercial', 'Cotización personalizada.', 'No inventar precios, descuentos, stock, ratings ni certificaciones.'],
  ['Diferenciación', 'Cada propuesta resuelve una variante, capacidad, instalación, sector o necesidad verificable.', 'Evitar páginas puerta y variaciones nominales sin utilidad propia.'],
  ['SEO', 'Slug, keyword primaria, H1, SEO title, meta description y canonical únicos.', 'La intención debe justificar una ficha independiente.'],
  ['Originalidad', 'Similitud Jaccard menor a 0.72 en necesidad, valor e intención entre todas las propuestas.', 'La prueba automatizada compara las 26,335 parejas posibles.'],
  ['Fuentes', 'Mínimo una fuente primaria técnica/comercial y fuentes normativas cuando aplican.', 'Revisión registrada el 2026-07-15.'],
  ['Validación técnica', 'Confirmar compatibilidad, rating/listado, capacidad, cobertura y limitaciones antes de publicar.', 'La matriz no reemplaza la ingeniería ni la ficha del fabricante.'],
  ['Normativa', 'NOM-002-STPS y NOM-154-SCFI se usan como marco de selección, servicio y documentación.', 'No afirmar certificaciones de producto sin evidencia del modelo específico.'],
  ['Contenido', 'Texto humano, orientado al riesgo y al comprador empresarial.', 'Mantener el módulo FAQ + cotización de dos columnas del template aprobado.'],
  ['Movimiento', 'No usar animaciones ni transiciones fuera de botones y CTA.', 'Regla permanente del diseño MANEXT.'],
  ['Publicación', 'Publicar en cinco lotes independientes, empezando por portátiles.', 'Cada lote requiere build, pruebas, QA visual y aprobación.'],
];
criteria.getRangeByIndexes(0, 0, criteriaRows.length + 1, 3).values = [[
  'Criterio', 'Regla aprobada', 'Control de calidad',
], ...criteriaRows];
criteria.showGridLines = false;
criteria.freezePanes.freezeRows(1);
criteria.getRange('A1:C1').format = {
  fill: colors.charcoal,
  font: { bold: true, color: colors.white, size: 11 },
};
criteria.getRange(`A2:C${criteriaRows.length + 1}`).format = {
  font: { color: colors.ink, size: 10 },
  verticalAlignment: 'top',
  wrapText: true,
  borders: { insideHorizontal: { style: 'thin', color: colors.line } },
};
criteria.getRange(`A2:A${criteriaRows.length + 1}`).format = {
  fill: colors.paleRed,
  font: { bold: true, color: colors.redDark },
};
criteria.getRange('A:A').format.columnWidth = 24;
criteria.getRange('B:B').format.columnWidth = 70;
criteria.getRange('C:C').format.columnWidth = 62;
criteria.getRange(`A2:C${criteriaRows.length + 1}`).format.rowHeight = 44;

const familyRows = catalogProducts.map((product) => [product.id, product.group, product.name]);
summary.getRange('A30:C75').values = familyRows;
summary.getRange('A30:C75').format.font = { color: colors.white };

const keyInspection = await workbook.inspect({
  kind: 'table',
  range: 'Resumen!A1:H23',
  include: 'values,formulas',
  tableMaxRows: 25,
  tableMaxCols: 8,
});
console.log(keyInspection.ndjson);

const errorScan = await workbook.inspect({
  kind: 'match',
  searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A',
  options: { useRegex: true, maxResults: 300 },
  summary: 'final formula error scan',
});
console.log(errorScan.ndjson);

for (const [sheetName, range] of [
  ['Resumen', 'A1:H23'],
  ['Matriz 230', 'A1:H18'],
  ['Fuentes', `A1:E${Math.min(sourceRows.length + 1, 24)}`],
  ['Criterios', `A1:C${criteriaRows.length + 1}`],
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: 'png' });
  const safeName = sheetName.toLocaleLowerCase('es-MX').replace(/\s+/g, '-');
  await fs.writeFile(path.join(previewDir, `${safeName}.png`), new Uint8Array(await preview.arrayBuffer()));
}

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(path.join(outputDir, 'matriz-expansion-230-productos-manext.xlsx'));
console.log(`Workbook created with ${catalogExpansionProposals.length} proposals and ${sourceRows.length} unique sources.`);
