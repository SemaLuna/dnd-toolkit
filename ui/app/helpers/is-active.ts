import Helper from '@ember/component/helper';
import { service } from '@ember/service';
import type RouterService from '@ember/routing/router-service';

interface IsActiveSignature {
  Args: {
    Positional: [string];
  };
  Return: boolean;
}

export default class IsActive extends Helper<IsActiveSignature> {
  @service declare router: RouterService;

  compute(positional: [string]): boolean {
    const [routeName] = positional;
    return this.router.isActive(routeName);
  }
}
