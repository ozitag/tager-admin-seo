import { request, Nullable, ResponseBody } from '@tager/admin-services';
import { FieldShortType, OutgoingValueUnion } from '@tager/admin-dynamic-field';

import { SeoPageType, SettingItemType } from '../typings/model';

export function getSeoPageList(): Promise<ResponseBody<Array<SeoPageType>>> {
  return request.get({
    path: '/admin/seo/pages',
  });
}

export function getSeoPage(
  seoPageId: number | string
): Promise<ResponseBody<SeoPageType>> {
  return request.get({
    path: `/admin/seo/pages/${seoPageId}`,
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
    path: `/admin/seo/pages/${seoPageId}`,
    body: payload,
  });
}

export function getSeoSettingList(): Promise<
  ResponseBody<Array<SettingItemType>>
> {
  return request.get({
    path: `/admin/seo/settings`,
  });
}

export type SettingsUpdatePayload = {
  values: Array<FieldShortType<OutgoingValueUnion>>;
};
export function updateSeoSettingList(
  payload: SettingsUpdatePayload
): Promise<ResponseBody<Array<SettingItemType>>> {
  return request.post({
    path: `/admin/seo/settings`,
    body: payload,
  });
}
