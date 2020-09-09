import Vue, { CreateElement } from 'vue';
import VueCompositionApi, { createApp } from '@vue/composition-api';

import { configStore, i18n } from '@tager/admin-services';
import { AdminUiPlugin } from '@tager/admin-ui';
import { AdminLayoutPlugin, createRouter } from '@tager/admin-layout';

import '@tager/admin-ui/dist/admin-ui.css';

import config from './config/config.json';
import App from './views/App.vue';
import {
  SEO_PAGE_FORM_ROUTE,
  SEO_PAGE_LIST_ROUTE,
  SEO_SETTINGS_ROUTE,
} from './constants/routes';

configStore.setConfig(config);

const router = createRouter(
  {
    routes: [SEO_PAGE_LIST_ROUTE, SEO_PAGE_FORM_ROUTE, SEO_SETTINGS_ROUTE],
  },
  { useTitleSync: false }
);

i18n.init({ debug: false }).then(() => {
  Vue.use(VueCompositionApi);

  const app = createApp({
    router,
    render: (h: CreateElement) => h(App),
  });

  app.use(i18n.getPlugin());
  app.use(AdminUiPlugin);
  app.use(AdminLayoutPlugin);

  app.mount('#app');
});
