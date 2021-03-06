import { Nullable } from '@tager/admin-services';
import {
  FieldConfigUnion,
  FieldShortType,
  IncomingValueUnion,
  OutgoingValueUnion,
} from '@tager/admin-dynamic-field';
import { SingleFileInputValueType } from '@tager/admin-ui';

export type SettingItemType = {
  field: FieldConfigUnion;
  value: IncomingValueUnion;
};

export type SettingsUpdatePayload = {
  values: Array<FieldShortType<OutgoingValueUnion>>;
};

export interface VariableType {
  name: string;
  label: string;
}

export interface TemplateType {
  template: string;
  name: string;
  hasOpenGraphImage: boolean;
  variables: Array<VariableType>;
  value: {
    pageTitle: string;
    pageDescription: string;
    openGraphImage: Nullable<SingleFileInputValueType>;
  };
}

export interface TemplatesFormValues {
  templates: Array<TemplateType>;
}

export interface TemplateUpdate {
  template: string;
  pageTitle: string;
  pageDescription: string;
  openGraphImage: Nullable<string>;
}

export interface TemplatesUpdatePayload {
  templates: Array<TemplateUpdate>;
}
