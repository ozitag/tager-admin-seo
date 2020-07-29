import { compile } from 'path-to-regexp';

import { SEO_ROUTE_PATHS } from '../constants/paths';

export function getSeoListUrl(): string {
  return SEO_ROUTE_PATHS.PAGE_LIST;
}

export function getSeoFormUrl(params: { seoPageId: number }): string {
  return compile(SEO_ROUTE_PATHS.PAGE_FORM)(params);
}
