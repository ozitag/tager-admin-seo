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
