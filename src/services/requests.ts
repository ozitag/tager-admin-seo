import { request, ResponseBody } from '@tager/admin-services';

import {
  SettingItemType,
  TemplateType,
  TemplatesUpdatePayload,
  SettingsUpdatePayload,
} from '../typings/model';

export function getSeoSettingList(): Promise<
  ResponseBody<Array<SettingItemType>>
> {
  return request.get({
    path: `/admin/seo/settings`,
  });
}

export function updateSeoSettingList(
  payload: SettingsUpdatePayload
): Promise<ResponseBody<Array<SettingItemType>>> {
  return request.post({
    path: `/admin/seo/settings`,
    body: payload,
  });
}

export function getSeoTemplates(): Promise<ResponseBody<Array<TemplateType>>> {
  return request.get({ path: '/admin/seo/templates' });
}

export function updateSeoTemplates(
  payload: TemplatesUpdatePayload
): Promise<ResponseBody<Array<TemplateType>>> {
  return request.post({
    path: '/admin/seo/templates',
    body: payload,
  });
}
