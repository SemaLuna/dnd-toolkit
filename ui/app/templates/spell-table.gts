import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import type { ModelFrom } from '#utils/ember-type.ts';
import SpellTableRoute from '#routes/spell-table.ts';
import { Request } from '@warp-drive/ember';
import SpellsTable from '#components/spell-table.gts';

interface SpellTableSignature {
  Args: {
    model: ModelFrom<SpellTableRoute>;
    controller: unknown;
  };
}

<template>
  {{pageTitle "Spell Table"}}
  <Request @request={{@model.request}}>
    <:content as |spells|>
      <SpellsTable @spells={{spells.data}} />
    </:content>
  </Request>
</template> satisfies TOC<SpellTableSignature>;
