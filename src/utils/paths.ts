import { compile } from 'path-to-regexp';

import { SEO_ROUTE_PATHS } from '../constants/paths';

export function getSeoPageListUrl(): string {
  return SEO_ROUTE_PATHS.PAGE_LIST;
}

export function getSeoPageFormUrl(params: { seoPageId: number }): string {
  return compile(SEO_ROUTE_PATHS.PAGE_FORM)(params);
}

export function getSeoSettingsUrl(): string {
  return SEO_ROUTE_PATHS.SETTINGS;
}
