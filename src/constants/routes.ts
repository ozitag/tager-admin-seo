import { CustomRouteConfig } from '@tager/admin-layout';

import SeoPageList from '../views/SeoPageList.vue';
import SeoPageForm from '../views/SeoPageForm.vue';

import { SEO_ROUTE_PATHS } from './paths';

const HOME_BREADCRUMB = { path: '/', label: 'Home' };

export const SEO_PAGE_LIST_ROUTE: CustomRouteConfig = {
  path: SEO_ROUTE_PATHS.PAGE_LIST,
  component: SeoPageList,
  name: 'SEO Page Settings',
  meta: {
    getBreadcrumbs: () => [
      HOME_BREADCRUMB,
      { path: SEO_ROUTE_PATHS.PAGE_LIST, label: 'SEO Page Settings' },
    ],
  },
};

export const SEO_PAGE_FORM_ROUTE: CustomRouteConfig = {
  path: SEO_ROUTE_PATHS.PAGE_FORM,
  component: SeoPageForm,
  name: 'SEO Page Form',
  meta: {
    getBreadcrumbs: () => [
      HOME_BREADCRUMB,
      { path: SEO_ROUTE_PATHS.PAGE_FORM, label: 'SEO Page Form' },
    ],
  },
};