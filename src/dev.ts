import Vue, { CreateElement } from 'vue';
import VueCompositionApi, { createApp } from '@vue/composition-api';

import { configStore, i18n } from '@tager/admin-services';
import { AdminUiPlugin } from '@tager/admin-ui';
import { AdminLayoutPlugin, createRouter } from '@tager/admin-layout';

import '@tager/admin-ui/dist/admin-ui.css';

import config from './config/config.json';
import App from './views/App.vue';
import { SEO_SETTINGS_ROUTE, SEO_TEMPLATES_ROUTE } from './constants/routes';
import EN from './locales/en';
import RU from './locales/ru';

configStore.setConfig(config);

const router = createRouter(
  {
    routes: [SEO_SETTINGS_ROUTE, SEO_TEMPLATES_ROUTE],
  },
  { useTitleSync: false }
);

i18n.addTranslations('en', 'seo', EN);
i18n.addTranslations('ru', 'seo', RU);

i18n.init({ debug: false, lng: 'ru' }).then(() => {
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
