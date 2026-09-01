import type { PolarisResourceSchema } from '@warp-drive/core/types/schema/fields';

export default {
  type: 'spells',
  identity: { kind: '@id', name: 'id' },
  fields: [
    { name: 'name', kind: 'field' },
    { name: 'level', kind: 'field' },
    { name: 'description', kind: 'field' },
    { name: 'higherLevel', kind: 'field' },
    { name: 'range', kind: 'field' },
    { name: 'components', kind: 'field' },
    { name: 'ritual', kind: 'field' },
    { name: 'duration', kind: 'field' },
    { name: 'concentration', kind: 'field' },
    { name: 'castingTime', kind: 'field' },
    { name: 'attackType', kind: 'field' },
    { name: 'baseDamage', kind: 'field' },
    { name: 'damageAtCharacterLevel', kind: 'field' },
    {
      kind: 'resource',
      type: 'damage-types',
      name: 'damageType',
      options: { async: true, inverse: 'spells' },
    },
    {
      kind: 'resource',
      type: 'magic-schools',
      name: 'school',
      options: { async: true, inverse: 'spells' },
    },
    {
      kind: 'collection',
      type: 'classes',
      name: 'classes',
      options: { async: true, inverse: 'spells' },
    },
    {
      kind: 'collection',
      type: 'subclasses',
      name: 'subclasses',
      options: { async: true, inverse: 'spells' },
    },
  ],
} as PolarisResourceSchema;
