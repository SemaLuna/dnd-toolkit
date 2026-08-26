import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { type Store } from '@warp-drive/core';

export default class SpellAreaCalcRoute extends Route {
  @service declare store: Store;

  async model() {
    return this.store.request({
      url: '/srd/spells/fire-bolt.json',
      method: 'GET',
    });
  }
}
