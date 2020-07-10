import { request, Nullable, ResponseBody } from '@tager/admin-services';

import { SeoPageType } from '../typings/model';

export function getSeoPageList(): Promise<ResponseBody<Array<SeoPageType>>> {
  return request.get({
    path: '/seo/pages',
  });
}

export function getSeoPage(
  seoPageId: number | string
): Promise<ResponseBody<SeoPageType>> {
  return request.get({
    path: `/seo/pages/${seoPageId}`,
  });
}

export type SeoPageUpdatePayload = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: Nullable<number>;
};

export function updateSeoPage(
  seoPageId: number | string,
  payload: SeoPageUpdatePayload
): Promise<ResponseBody<SeoPageType>> {
  return request.put({
    path: `/seo/pages/${seoPageId}`,
    body: payload,
  });
}
