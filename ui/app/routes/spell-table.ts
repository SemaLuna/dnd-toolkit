import type { Spell } from '#data/types.d.ts';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { type Store } from '@warp-drive/core';
import { withReactiveResponse } from '@warp-drive/core/request';

export default class SpellTableRoute extends Route {
  @service declare store: Store;

  model() {
    return {
      request: this.store.request(
        withReactiveResponse<Spell[]>({
          url: '/srd/spells/cantrips.json',
          method: 'GET',
        }),
      ),
    };
  }
}
