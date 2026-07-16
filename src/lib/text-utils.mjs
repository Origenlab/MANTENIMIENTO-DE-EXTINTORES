/**
 * Utilidades de composición tipográfica para los motores editoriales del catálogo.
 *
 * Los datos de origen (`need`, `valueProposition`, `selection`, `limitation`) se
 * redactan como fragmentos en minúscula y sin puntuación final, para poder
 * insertarlos tanto al inicio de una oración como después de dos puntos. Las
 * plantillas los concatenaban sin normalizar, lo que producía dos defectos:
 *
 *   1. Run-on: `${need} ${valueProposition}` → "...para un vehículo ofrece una
 *      presentación transportable..." (sin punto ni mayúscula).
 *   2. Pérdida de acrónimos: `.toLocaleLowerCase('es-MX')` sobre la cadena
 *      completa convertía "MANEXT" en "manext" y "SDS" en "sds".
 *
 * Estas funciones normalizan el fragmento en el punto de composición, sin tocar
 * los datos. Son puras y seguras ante `undefined`.
 */

/** Puntuación que cierra una oración, admitiendo comillas o paréntesis de cierre. */
const SENTENCE_END = /[.!?…][”"»)\]]?$/;

/** Dos o más mayúsculas iniciales indican acrónimo o nombre propio (MANEXT, SDS, CO₂). */
const LEADING_ACRONYM = /^[A-ZÁÉÍÓÚÑ][A-ZÁÉÍÓÚÑ0-9]/;

function clean(value) {
  return String(value ?? '').trim();
}

/** Pone en mayúscula la primera letra, conservando el resto intacto. */
export function capitalize(value) {
  const text = clean(value);
  if (!text) return '';
  return text.charAt(0).toLocaleUpperCase('es-MX') + text.slice(1);
}

/**
 * Pone en minúscula únicamente la primera letra. A diferencia de
 * `toLocaleLowerCase()`, preserva acrónimos y nombres propios en el resto de la
 * cadena, y no toca el texto si ya arranca con un acrónimo.
 */
export function uncapitalize(value) {
  const text = clean(value);
  if (!text) return '';
  if (LEADING_ACRONYM.test(text)) return text;
  return text.charAt(0).toLocaleLowerCase('es-MX') + text.slice(1);
}

/** Garantiza puntuación final. No duplica si el fragmento ya cierra. */
export function endSentence(value) {
  const text = clean(value);
  if (!text) return '';
  return SENTENCE_END.test(text) ? text : `${text}.`;
}

/** Fragmento como oración autónoma: mayúscula inicial y punto final. */
export function sentence(value) {
  return endSentence(capitalize(value));
}

/**
 * Fragmento que continúa una oración ya iniciada (después de dos puntos o de
 * una coma): minúscula inicial y punto final.
 */
export function continuation(value) {
  return endSentence(uncapitalize(value));
}

/** Fragmento insertado a media oración: minúscula inicial, sin puntuación añadida. */
export function inline(value) {
  return uncapitalize(value);
}

/** Une fragmentos como oraciones independientes, descartando los vacíos. */
export function joinSentences(...parts) {
  return parts.map(sentence).filter(Boolean).join(' ');
}
