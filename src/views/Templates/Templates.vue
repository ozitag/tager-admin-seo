<template>
  <page :title="$t('seo:SEOTemplates')" :is-content-loading="isContentLoading">
    <div class="templates">
      <div
        v-for="(template, templateIndex) of values.templates"
        :key="templateIndex"
      >
        <Collapse :label="template.name" :unique-key="template.template">
          <form-field-recommended-length-input
            v-model="template.value.pageTitle"
            :label="$t('seo:pageTitle')"
            :min="50"
            :max="60"
            :name="kebabcase(`pageTitle-${template.template}`)"
          />

          <form-field-recommended-length-input
            v-model="template.value.pageDescription"
            :label="$t('seo:pageDescription')"
            :min="115"
            :max="165"
            type="textarea"
            :name="kebabcase(`pageDescription-${template.template}`)"
          />

          <form-field-file-input
            v-if="template.hasOpenGraphImage"
            v-model="template.value.openGraphImage"
            :label="$t('seo:openGraphImage')"
            file-type="image"
            :name="kebabcase(`openGraphImage-${template.template}`)"
          />

          <div class="variables">
            <Variable
              v-for="(variable, variableIndex) of template.variables"
              :key="variableIndex"
              :label="variable.label"
              :name="variable.name"
            />
          </div>
        </Collapse>
      </div>
    </div>

    <template v-slot:footer>
      <form-footer
        back-href="/"
        :on-submit="submitForm"
        :is-submitting="isSubmitting"
      />
    </template>
  </page>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import kebabcase from 'lodash.kebabcase';

import { convertRequestErrorToMap, useResource } from '@tager/admin-services';
import { TagerFormSubmitEvent, useTranslation } from '@tager/admin-ui';

import { getSeoTemplates, updateSeoTemplates } from '../../services/requests';
import {
  TemplatesFormValues,
  TemplateType,
  TemplatesUpdatePayload,
} from '../../typings/model';

import Collapse from './components/Collapse';
import Variable from './components/Variable';
import {
  convertTemplatesFormValuesToUpdatePayload,
  getTemplatesFormValues,
} from './Templates.helpers';

export default defineComponent({
  name: 'SeoTemplates',
  components: { Collapse, Variable },
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const [
      fetchTemplates,
      { data: templates, loading: isTemplatesLoading },
    ] = useResource<Array<TemplateType>>({
      fetchResource: () => getSeoTemplates(),
      context,
      resourceName: 'SEO Templates',
      initialValue: [],
    });

    onMounted(() => {
      fetchTemplates();
    });

    const isSubmitting = ref<boolean>(false);
    const values = ref<TemplatesFormValues>(
      getTemplatesFormValues(templates.value)
    );
    const errors = ref<Record<string, string>>({});

    watch(templates, () => {
      values.value = getTemplatesFormValues(templates.value);
    });

    function submitForm(event: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      const body: TemplatesUpdatePayload = convertTemplatesFormValuesToUpdatePayload(
        values.value
      );

      updateSeoTemplates(body)
        .then(() => {
          errors.value = {};

          if (event.type === 'save_exit') {
            if (context.root.$previousRoute) {
              context.root.$router.back();
            } else {
              context.root.$router.push('/');
            }
          }

          context.root.$toast({
            variant: 'success',
            title: t('seo:success'),
            body: t('seo:SEOTemplatesHaveBeenSuccessfullyUpdated'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
            variant: 'danger',
            title: t('seo:error'),
            body: t('seo:SEOTemplatesUpdateHasBeenFailed'),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    return {
      submitForm,
      isSubmitting,
      values,
      isContentLoading: isTemplatesLoading,
      kebabcase,
    };
  },
});
</script>

<style scoped lang="scss">
.variables {
  display: flex;
  flex-wrap: wrap;
  margin-top: -0.5rem;
}
</style>
