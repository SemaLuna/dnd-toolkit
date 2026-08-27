import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';
import type { RequestFromModel, ModelFrom } from '#utils/ember-type.ts';
import SpellTableRoute from '#routes/spell-table.ts';
import { Request } from '@warp-drive/ember';

interface SpellTableSignature {
  Args: {
    model: RequestFromModel<SpellTableRoute>;
    controller: unknown;
  };
}

<template>
  {{pageTitle "Spell Table"}}
  <Request @request={{@model}}>
    <:content as |result|>
      Hello
      {{result.data.name}}!
    </:content>
  </Request>
</template> satisfies TOC<SpellTableSignature>;
