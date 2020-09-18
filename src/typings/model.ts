import { FileType, Nullable } from '@tager/admin-services';
import {
  FieldConfigUnion,
  IncomingValueUnion,
} from '@tager/admin-dynamic-field';

export type SeoPageType = {
  id: number;
  alias: string;
  name: string;
  title: string;
  description: string;
  openGraphTitle: Nullable<string>;
  openGraphDescription: Nullable<string>;
  openGraphImage: Nullable<FileType>;
};

export type SettingItemType = {
  field: FieldConfigUnion;
  value: IncomingValueUnion;
};
