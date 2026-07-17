/**
 * Datos de contacto de MANEXT. Fuente única de verdad.
 *
 * El teléfono estaba escrito a mano en ~295 sitios de 71 archivos y en tres
 * formatos distintos (`5215614612594` para wa.me, `5614612594` para tel:,
 * `56 1461 2594` para mostrar), más `+525614612594` y `+52-56-1461-2594` en
 * JSON-LD. Un cambio de número obligaba a tocarlos todos y a acertar el formato
 * en cada uno (auditoría 2026-07-16).
 *
 * Las constantes se derivan de un solo número para que no puedan divergir.
 */

/** Nacional, sólo dígitos: 10 dígitos sin lada de país. */
const NATIONAL_DIGITS = '5614612594';

/** Lada de país de México. */
const COUNTRY_CODE = '52';

/** `tel:` — el marcador nacional que espera un móvil en México. */
export const PHONE_TEL = NATIONAL_DIGITS;

/** Formato de lectura humana: 56 1461 2594 */
export const PHONE_DISPLAY = `${NATIONAL_DIGITS.slice(0, 2)} ${NATIONAL_DIGITS.slice(2, 6)} ${NATIONAL_DIGITS.slice(6)}`;

/** E.164 para JSON-LD (`telephone`): +525614612594 */
export const PHONE_E164 = `+${COUNTRY_CODE}${NATIONAL_DIGITS}`;

/**
 * wa.me exige dígitos sin '+'. El `1` tras el 52 es el prefijo histórico de
 * móvil mexicano que WhatsApp sigue requiriendo para estos números.
 */
export const WHATSAPP_NUMBER_INTL = `${COUNTRY_CODE}1${NATIONAL_DIGITS}`;

/** Enlace a WhatsApp con mensaje opcional ya codificado. */
export function whatsappUrl(message = '') {
  const base = `https://wa.me/${WHATSAPP_NUMBER_INTL}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const SITE_URL = 'https://mantenimientodeextintores.mx';
