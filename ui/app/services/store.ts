import { default as OpfsHandler } from '#data/origin-private-file-system-handler.ts';
import {
  SpellSchema,
  DamageTypeSchema,
  MagicSchoolSchema,
  ClassesSchema,
  SubClassesSchema,
} from '#data/schemas.ts';
import { CacheHandler, Fetch, RequestManager, Store } from '@warp-drive/core';
import {
  instantiateRecord,
  registerDerivations,
  SchemaService,
  teardownRecord,
} from '@warp-drive/core/reactive';
import { DefaultCachePolicy } from '@warp-drive/core/store';
import type {
  CacheCapabilitiesManager,
  ResourceKey,
} from '@warp-drive/core/types';
import { JSONAPICache } from '@warp-drive/json-api';
import { concat } from '@warp-drive/utilities/derivations';

export default class AppStore extends Store {
  requestManager = new RequestManager()
    .use([new OpfsHandler(), Fetch])
    .useCache(CacheHandler);

  lifetimes = new DefaultCachePolicy({
    apiCacheHardExpires: 15 * 60 * 1000, // 15 minutes
    apiCacheSoftExpires: 1 * 30 * 1000, // 30 seconds
    constraints: {
      headers: {
        'X-WarpDrive-Expires': true,
        'Cache-Control': true,
        Expires: true,
      },
    },
  });

  createSchemaService() {
    const schema = new SchemaService();
    registerDerivations(schema);
    schema.registerDerivation(concat);
    schema.registerResources([
      DamageTypeSchema,
      MagicSchoolSchema,
      ClassesSchema,
      SubClassesSchema,
      SpellSchema,
    ]);
    return schema;
  }

  createCache(capabilities: CacheCapabilitiesManager) {
    return new JSONAPICache(capabilities);
  }

  instantiateRecord(key: ResourceKey, createArgs?: Record<string, unknown>) {
    return instantiateRecord(this, key, createArgs);
  }

  teardownRecord(record: unknown): void {
    return teardownRecord(record);
  }
}
