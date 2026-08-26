import { module, test } from 'qunit';
import { setupTest } from 'ui/tests/helpers';

module('Unit | Route | spell-area-calc', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    const route = this.owner.lookup('route:spell-area-calc');
    assert.ok(route);
  });
});
