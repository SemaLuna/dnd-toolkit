import type { TOC } from '@ember/component/template-only';
import type { Spell } from '#data/types.d.ts';
import { HdsTable } from '@hashicorp/design-system-components/components';
import { array, hash } from '@ember/helper';

interface SpellsTableSignature {
  Args: {
    spells: Spell[];
  };
}

<template>
  <HdsTable
    @model={{@spells}}
    @columns={{array
      (hash key="name" label="Name")
      (hash key="range" label="Range")
      (hash key="desc" label="Description")
    }}
    @sortBy="name"
  >
    <:body as |B|>
      <B.Tr>
        <B.Td>{{B.data.name}}</B.Td>
        <B.Td>{{B.data.range}}</B.Td>
        <B.Td>
          {{#each B.data.desc as |desc|}}
            <p>{{desc}}</p>
          {{/each}}
        </B.Td>
      </B.Tr>
    </:body>
  </HdsTable>
</template> satisfies TOC<SpellsTableSignature>;
