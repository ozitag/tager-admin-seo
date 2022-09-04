import { createId } from "@tager/admin-services";

import {
  TemplatesFormValues,
  TemplateType,
  TemplatesUpdatePayload,
} from "../../typings/model";

export function getTemplatesFormValues(
  templates: Array<TemplateType>
): TemplatesFormValues {
  return {
    templates: templates.map((template) => ({
      ...template,
      value: {
        pageTitle: template.value.pageTitle ?? "",
        pageDescription: template.value.pageDescription ?? "",
        pageKeywords: template.value.pageKeywords ?? "",
        pageH1: template.value.h1 ?? "",
        openGraphImage: template.value.openGraphImage
          ? {
              id: createId(),
              file: template.value.openGraphImage,
            }
          : null,
      },
    })),
  };
}

export function convertTemplatesFormValuesToUpdatePayload(
  values: TemplatesFormValues
): TemplatesUpdatePayload {
  return {
    templates: values.templates.map((template) => ({
      template: template.template,
      pageTitle: template.value.pageTitle,
      pageDescription: template.value.pageDescription,
      pageKeywords: template.value.pageKeywords,
      h1: template.value.pageH1,
      openGraphImage: template.value.openGraphImage?.file.id ?? null,
    })),
  };
}
