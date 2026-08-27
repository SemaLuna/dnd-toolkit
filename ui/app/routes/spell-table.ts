import type { Spell } from '#data/types.d.ts';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { type Store } from '@warp-drive/core';

export default class SpellTableRoute extends Route {
  @service declare store: Store;

  async model() {
    return this.store.request<Spell>({
      url: '/srd/spells/fire-bolt.json',
      method: 'GET',
    });
  }
}
