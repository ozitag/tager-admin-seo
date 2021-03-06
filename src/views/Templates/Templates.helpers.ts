import {
  TemplatesFormValues,
  TemplateType,
  TemplatesUpdatePayload,
} from '../../typings/model';

export function getTemplatesFormValues(
  templates: Array<TemplateType>
): TemplatesFormValues {
  return {
    templates: templates.map((template) => ({
      ...template,
      value: {
        pageTitle: template.value.pageTitle ?? '',
        pageDescription: template.value.pageDescription ?? '',
        openGraphImage: template.value.openGraphImage,
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
      openGraphImage: template.value.openGraphImage?.file.id ?? null,
    })),
  };
}
