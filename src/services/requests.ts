import { request, Nullable, ResponseBody } from '@tager/admin-services';

import { SeoPageType, SettingsItemType } from '../typings/model';

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
  ResponseBody<Array<SettingsItemType>>
> {
  return request.get({
    path: `/admin/seo/settings`,
  });
}

export type SettingsFieldType<Value> = {
  name: string;
  value: Value;
};

export type SettingsUpdatePayload = {
  values: Array<
    | SettingsFieldType<string>
    | SettingsFieldType<null>
    | SettingsFieldType<number>
    | SettingsFieldType<Array<number>>
  >;
};
export function updateSeoSettingList(
  payload: SettingsUpdatePayload
): Promise<ResponseBody<Array<SettingsItemType>>> {
  return request.post({
    path: `/admin/seo/settings`,
    body: payload,
  });
}
