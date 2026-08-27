import type { TOC } from '@ember/component/template-only';
import { pageTitle } from 'ember-page-title';

interface SpellTableSignature {
  Args: {
    model: unknown;
    controller: unknown;
  };
}

<template>
  {{pageTitle "SpellTable"}}
  {{outlet}}
</template> satisfies TOC<SpellTableSignature>;
