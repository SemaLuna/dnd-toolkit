import type { PolarisResourceSchema } from '@warp-drive/core/types/schema/fields';

export default {
  type: 'classes',
  identity: { kind: '@id', name: 'id' },
  fields: [
    { name: 'name', kind: 'field' },
    // Plenty more fields to add here
    {
      kind: 'collection',
      type: 'spells',
      name: 'spells',
      options: { async: true, inverse: 'classes' },
    },
  ],
} as PolarisResourceSchema;
