import { type FileType, type Nullable } from "@tager/admin-services";
import {
  type FieldConfigUnion,
  type FieldShortType,
  type IncomingValueUnion,
  type OutgoingValueUnion,
} from "@tager/admin-dynamic-field";
import { type SingleFileInputValueType } from "@tager/admin-ui";

export interface SettingItemType {
  field: FieldConfigUnion;
  value: IncomingValueUnion;
}

export interface SettingsUpdatePayload {
  values: Array<FieldShortType<OutgoingValueUnion>>;
}

export interface VariableType {
  name: string;
  label: string;
}

export interface TemplateType {
  template: string;
  name: string;
  hasOpenGraphImage: boolean;
  h1Enabled: boolean;
  variables: Array<VariableType>;
  value: {
    pageTitle: string;
    pageDescription: string;
    pageKeywords: string;
    h1: string;
    openGraphImage: Nullable<FileType>;
  };
}

export interface TemplatesFormValues {
  templates: Array<{
    template: string;
    name: string;
    hasOpenGraphImage: boolean;
    h1Enabled: boolean;
    variables: Array<VariableType>;
    value: {
      pageTitle: string;
      pageDescription: string;
      pageKeywords: string;
      pageH1: string;
      openGraphImage: Nullable<SingleFileInputValueType>;
    };
  }>;
}

export interface TemplateUpdate {
  template: string;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  h1: string;
  openGraphImage: Nullable<string>;
}

export interface TemplatesUpdatePayload {
  templates: Array<TemplateUpdate>;
}

export interface InfoModel {
  keywordsEnabled: boolean;
  openGraphImageScenario: string;
}
