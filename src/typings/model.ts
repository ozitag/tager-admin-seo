import { FileType, Nullable } from '@tager/admin-services';

export type SeoPageType = {
  id: number;
  alias: string;
  name: string;
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: Nullable<FileType>;
};
