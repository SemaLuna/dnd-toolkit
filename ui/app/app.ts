import '@warp-drive/ember/install';
import Application from '@ember/application';
import compatModules from '@embroider/virtual/compat-modules';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from 'ui/config/environment';
import { importSync, isDevelopingApp, macroCondition } from '@embroider/macros';
import setupInspector from '@embroider/legacy-inspector-support/ember-source-4.12';
import { setBuildURLConfig } from '@warp-drive/utilities';

if (macroCondition(isDevelopingApp())) {
  importSync('./deprecation-workflow');
}

setBuildURLConfig({
  host: null,
  namespace: import.meta.env.BASE_URL.substring(1) + 'srd/spells',
});

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver.withModules(compatModules);
  inspector = setupInspector(this);
  LOG_RESOLVER = true;
}

loadInitializers(App, config.modulePrefix, compatModules);
