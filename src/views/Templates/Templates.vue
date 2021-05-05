<template>
  <page :title="$t('seo:SEOTemplates')" :is-content-loading="isContentLoading">
    <div class="templates">
      <div
        v-for="(template, templateIndex) of values.templates"
        :key="templateIndex"
      >
        <Collapse :label="template.name" :unique-key="template.template">
          <seo-field-group
            :title="template.value.pageTitle"
            :title-name="kebabcase(`pageTitle-${template.template}`)"
            :description="template.value.pageDescription"
            :description-name="
              kebabcase(`pageDescription-${template.template}`)
            "
            :should-display-keywords="info.keywordsEnabled"
            :keywords="template.value.keywords"
            :keywords-name="kebabcase(`keywords-${template.template}`)"
            :should-display-image="template.hasOpenGraphImage"
            :image="template.value.openGraphImage"
            :image-name="kebabcase(`openGraphImage-${template.template}`)"
            :image-scenario="info.openGraphImageScenario"
            @change:title="template.value.pageTitle = $event"
            @change:description="template.value.pageDescription = $event"
            @change:keywords="template.value.keywords = $event"
            @change:image="template.value.openGraphImage = $event"
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
  computed,
  defineComponent,
  onMounted,
  ref,
  SetupContext,
  watch,
} from '@vue/composition-api';
import kebabcase from 'lodash.kebabcase';

import {
  convertRequestErrorToMap,
  Nullable,
  useResource,
} from '@tager/admin-services';
import { TagerFormSubmitEvent, useTranslation } from '@tager/admin-ui';

import {
  getSeoInfo,
  getSeoTemplates,
  updateSeoTemplates,
} from '../../services/requests';
import {
  TemplatesFormValues,
  TemplateType,
  TemplatesUpdatePayload,
  InfoModel,
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

    const [fetchInfo, { data: info, loading: isInfoLoading }] = useResource<
      Nullable<InfoModel>
    >({
      fetchResource: () => getSeoInfo(),
      context,
      resourceName: 'SEO Info',
      initialValue: null,
    });

    onMounted(() => {
      fetchTemplates();
      fetchInfo();
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

    const isContentLoading = computed<boolean>(
      () => isTemplatesLoading.value || isInfoLoading.value
    );

    return {
      submitForm,
      isSubmitting,
      isContentLoading,
      kebabcase,
      info,
      values,
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
