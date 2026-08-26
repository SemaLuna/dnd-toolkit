import type { PolarisResourceSchema } from '@warp-drive/core/types/schema/fields';

export default {
  type: 'damage-types',
  identity: { kind: '@id', name: 'id' },
  fields: [
    { name: 'name', kind: 'field' },
    { name: 'desc', kind: 'field' },
    {
      kind: 'collection',
      type: 'spells',
      name: 'spells',
      options: { async: true, inverse: 'damageType' },
    },
  ],
} as PolarisResourceSchema;
