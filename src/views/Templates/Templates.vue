<template>
  <Page
    :title="$i18n.t('seo:SEOTemplates')"
    :is-content-loading="isContentLoading"
  >
    <div class="templates">
      <div
        v-for="(template, templateIndex) of values.templates"
        :key="templateIndex"
      >
        <Collapse :label="template.name" :unique-key="template.template">
          <SeoFieldGroup
            :title="template.value.pageTitle"
            :title-name="kebabcase(`pageTitle-${template.template}`)"
            :description="template.value.pageDescription"
            :description-name="
              kebabcase(`pageDescription-${template.template}`)
            "
            :should-display-h1="template.h1Enabled"
            :h1="template.value.pageH1"
            :h1-name="kebabcase(`h1-${template.template}`)"
            :should-display-keywords="info.keywordsEnabled"
            :keywords="template.value.pageKeywords"
            :keywords-name="kebabcase(`keywords-${template.template}`)"
            :should-display-image="template.hasOpenGraphImage"
            :image="template.value.openGraphImage"
            :image-name="kebabcase(`openGraphImage-${template.template}`)"
            :image-scenario="info.openGraphImageScenario"
            @change:title="template.value.pageTitle = $event"
            @change:description="template.value.pageDescription = $event"
            @change:keywords="template.value.pageKeywords = $event"
            @change:h1="template.value.pageH1 = $event"
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

    <template #footer>
      <FormFooter
        back-href="/"
        :is-submitting="isSubmitting"
        @submit="submitForm"
      />
    </template>
  </Page>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import kebabcase from "lodash.kebabcase";
import { useRoute, useRouter } from "vue-router";

import {
  convertRequestErrorToMap,
  navigateBack,
  Nullable,
  useI18n,
  useResource,
  useToast,
} from "@tager/admin-services";
import {
  FormFooter,
  SeoFieldGroup,
  TagerFormSubmitEvent,
} from "@tager/admin-ui";
import { Page } from "@tager/admin-layout";

import {
  getSeoInfo,
  getSeoTemplates,
  updateSeoTemplates,
} from "../../services/requests";
import {
  TemplatesFormValues,
  TemplateType,
  TemplatesUpdatePayload,
  InfoModel,
} from "../../typings/model";

import Collapse from "./components/Collapse";
import Variable from "./components/Variable";
import {
  convertTemplatesFormValuesToUpdatePayload,
  getTemplatesFormValues,
} from "./Templates.helpers";

export default defineComponent({
  name: "SeoTemplates",
  components: { FormFooter, SeoFieldGroup, Page, Collapse, Variable },
  setup() {
    const { t } = useI18n();

    const toast = useToast();
    const router = useRouter();

    const [fetchTemplates, { data: templates, loading: isTemplatesLoading }] =
      useResource<Array<TemplateType>>({
        fetchResource: () => getSeoTemplates(),
        resourceName: "SEO Templates",
        initialValue: [],
      });

    const [fetchInfo, { data: info, loading: isInfoLoading }] = useResource<
      Nullable<InfoModel>
    >({
      fetchResource: () => getSeoInfo(),
      resourceName: "SEO Info",
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

      const body: TemplatesUpdatePayload =
        convertTemplatesFormValuesToUpdatePayload(values.value);

      updateSeoTemplates(body)
        .then(() => {
          errors.value = {};

          if (event.type === "save_exit") {
            navigateBack(router, "/");
          }

          toast.show({
            variant: "success",
            title: t("seo:success"),
            body: t("seo:SEOTemplatesHaveBeenSuccessfullyUpdated"),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
            variant: "danger",
            title: t("seo:error"),
            body: t("seo:SEOTemplatesUpdateHasBeenFailed"),
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
