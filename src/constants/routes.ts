import { CustomRouteConfig } from '@tager/admin-layout';

import SeoSettings from '../views/Settings';
import SeoTemplates from '../views/Templates';

import { SEO_ROUTE_PATHS } from './paths';

export const SEO_SETTINGS_ROUTE: CustomRouteConfig = {
  path: SEO_ROUTE_PATHS.SETTINGS,
  component: SeoSettings,
  name: 'SEO Settings',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('seo:home') },
      { url: SEO_ROUTE_PATHS.SETTINGS, text: t('seo:SEOSettings') },
    ],
  },
};

export const SEO_TEMPLATES_ROUTE: CustomRouteConfig = {
  path: SEO_ROUTE_PATHS.TEMPLATES,
  component: SeoTemplates,
  name: 'SEO Templates',
  meta: {
    getBreadcrumbs: (route, t) => [
      { url: '/', text: t('seo:home') },
      { url: SEO_ROUTE_PATHS.TEMPLATES, text: t('seo:SEOTemplates') },
    ],
  },
};
