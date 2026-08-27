import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { type Store } from '@warp-drive/core';
import { buildBaseURL } from '@warp-drive/utilities';

export default class SpellAreaCalcRoute extends Route {
  @service declare store: Store;

  async model() {
    return this.store.request({
      url: buildBaseURL({ resourcePath: 'fire-bolt.json' }),
      method: 'GET',
    });
  }
}
