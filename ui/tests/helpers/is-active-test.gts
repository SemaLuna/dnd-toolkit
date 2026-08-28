import { module, test } from 'qunit';
import { setupRenderingTest } from 'ui/tests/helpers';
import { type TestContext, render } from '@ember/test-helpers';
import isActive from '#helpers/is-active.ts';
import Service from '@ember/service';

const activeRouteName = 'active-route';
class RouterStub extends Service {
  isActive(routeName: string) {
    return routeName === activeRouteName;
  }
}

module('Integration | Helper | is-active', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', RouterStub);
  });

  test('it identifies the active route', async function (this: TestContext, assert) {
    const CSS_SELECTOR = 'input';
    await render<TestContext>(
      <template>
        {{! eslint-disable ember/template-require-input-label }}
        <input type="checkbox" checked={{isActive activeRouteName}} />
      </template>,
    );
    assert
      .dom(CSS_SELECTOR)
      .isChecked('helper correctly evaluated active route (true)');

    await render<TestContext>(
      <template>
        {{! eslint-disable ember/template-require-input-label }}
        <input type="checkbox" checked={{isActive "inactive-route"}} />
      </template>,
    );
    assert
      .dom(CSS_SELECTOR)
      .isNotChecked('helper correctly evaluated active route (false)');
  });
});
