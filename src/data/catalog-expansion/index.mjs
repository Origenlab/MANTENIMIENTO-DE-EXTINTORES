import { accessoryExpansionProposals } from './accessories.mjs';
import { automaticExpansionProposals } from './automatic.mjs';
import { industrialExpansionProposals } from './industrial.mjs';
import { partsExpansionProposals } from './parts.mjs';
import { portableExpansionProposals } from './portables.mjs';
import { validateExpansionProposal } from './schema.mjs';

export const catalogExpansionProposals = [
  ...portableExpansionProposals,
  ...industrialExpansionProposals,
  ...automaticExpansionProposals,
  ...accessoryExpansionProposals,
  ...partsExpansionProposals,
].map(validateExpansionProposal);

export const catalogExpansionByParent = new Map();

for (const proposal of catalogExpansionProposals) {
  const siblings = catalogExpansionByParent.get(proposal.parentId) || [];
  siblings.push(proposal);
  catalogExpansionByParent.set(proposal.parentId, siblings);
}
