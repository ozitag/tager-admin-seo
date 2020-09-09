import { FileType, Nullable } from '@tager/admin-services';

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

interface SettingsItem {
  readonly name: string;
  readonly label: string;
  readonly type: string;
  readonly value: any;
}

export interface SettingsItemFile extends SettingsItem {
  type: 'IMAGE' | 'FILE';
  value: Nullable<FileType>;
}

export interface SettingsItemFileList extends SettingsItem {
  type: 'GALLERY';
  value: Array<FileType>;
}

export interface SettingsItemString extends SettingsItem {
  type: 'NUMBER' | 'STRING' | 'TEXT' | 'HTML';
  value: Nullable<string>;
}

export type SettingsItemType =
  | SettingsItemFile
  | SettingsItemFileList
  | SettingsItemString;
