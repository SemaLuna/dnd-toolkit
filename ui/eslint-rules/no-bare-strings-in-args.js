'use strict';

module.exports = {
  meta: {
    type: 'problem',
    docs: { description: 'disallow bare strings in named component arguments' },
    schema: [
      {
        type: 'object',
        properties: { argNames: { type: 'array', items: { type: 'string' } } },
      },
    ],
  },
  create(context) {
    const argsToCheck = context.options[0]?.argNames ?? ['text'];

    return {
      GlimmerElementNode(node) {
        for (const attr of node.attributes) {
          if (
            attr.type === 'GlimmerAttrNode' &&
            attr.name.startsWith('@') &&
            argsToCheck.includes(attr.name.substring(1)) &&
            attr.value.type === 'GlimmerTextNode' &&
            attr.value.chars.trim().length > 0
          ) {
            context.report({
              node: attr,
              message: `Bare string passed to ${attr.name} — use a translation helper instead`,
            });
          }
        }
      },
    };
  },
};
