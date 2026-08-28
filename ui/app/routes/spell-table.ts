import type { Spell } from '#data/types.d.ts';
import Route from '@ember/routing/route';
import { type Store } from '@warp-drive/core';
import { withReactiveResponse } from '@warp-drive/core/request';
import { service } from '@ember/service';
import { buildBaseURL } from '@warp-drive/utilities';

export default class SpellTableRoute extends Route {
  @service declare store: Store;

  model() {
    return {
      request: this.store.request(
        withReactiveResponse<Spell[]>({
          url: buildBaseURL({ resourcePath: 'cantrips.json' }),
          method: 'GET',
        }),
      ),
    };
  }
}
