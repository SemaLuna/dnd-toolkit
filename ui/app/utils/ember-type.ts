import type Route from '@ember/routing/route';

export type ModelFrom<R extends Route> = Awaited<ReturnType<R['model']>>;
export type RequestFromModel<R extends Route> = ReturnType<R['model']>;
