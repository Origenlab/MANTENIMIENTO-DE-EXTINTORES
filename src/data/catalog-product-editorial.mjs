import { portableEditorialProfiles } from './catalog-editorial/portables.mjs';
import { industrialAutomaticEditorialProfiles } from './catalog-editorial/industrial-automatic.mjs';
import { accessoryPartEditorialProfiles } from './catalog-editorial/accessories-parts.mjs';
import { expansionEditorialProfiles } from './catalog-expansion/publication.mjs';

export const catalogProductEditorial = Object.freeze({
  ...portableEditorialProfiles,
  ...industrialAutomaticEditorialProfiles,
  ...accessoryPartEditorialProfiles,
  ...expansionEditorialProfiles,
});

export function getCatalogProductEditorial(id) {
  return catalogProductEditorial[id];
}
