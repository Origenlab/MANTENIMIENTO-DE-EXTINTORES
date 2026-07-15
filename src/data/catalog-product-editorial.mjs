import { portableEditorialProfiles } from './catalog-editorial/portables.mjs';
import { industrialAutomaticEditorialProfiles } from './catalog-editorial/industrial-automatic.mjs';
import { accessoryPartEditorialProfiles } from './catalog-editorial/accessories-parts.mjs';

export const catalogProductEditorial = Object.freeze({
  ...portableEditorialProfiles,
  ...industrialAutomaticEditorialProfiles,
  ...accessoryPartEditorialProfiles,
});

export function getCatalogProductEditorial(id) {
  return catalogProductEditorial[id];
}
