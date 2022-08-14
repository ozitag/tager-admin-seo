<template>
  <Page
    :title="$i18n.t('seo:SEOServices')"
    :is-content-loading="isContentLoading"
  >
    <template #content>
      <form novalidate @submit.prevent="submitForm">
        <DynamicField
          v-for="field of values"
          :key="field.name"
          :field="field"
        />
      </form>
    </template>

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
import { defineComponent, onMounted, ref, SetupContext, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  convertRequestErrorToMap,
  navigateBack,
  useI18n,
  useResource,
  useToast,
} from "@tager/admin-services";
import { DynamicField } from "@tager/admin-dynamic-field";
import { FormFooter, TagerFormSubmitEvent } from "@tager/admin-ui";
import { Page } from "@tager/admin-layout";

import {
  getSeoSettingList,
  updateSeoSettingList,
} from "../../services/requests";
import { SettingItemType } from "../../typings/model";
import { getSeoTemplatesUrl } from "../../utils/paths";

import {
  convertSettingsToFormValues,
  convertSettingValuesToRequestPayload,
  SettingsFormValues,
} from "./Settings.helpers";

export default defineComponent({
  name: "SeoSettings",
  components: { FormFooter, Page, DynamicField },
  setup() {
    const { t } = useI18n();

    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    const [fetchSettingList, { data: settingList, loading }] = useResource<
      Array<SettingItemType>
    >({
      fetchResource: getSeoSettingList,
      initialValue: [],
      resourceName: "SEO Settings",
    });

    onMounted(() => {
      fetchSettingList();
    });

    const isSubmitting = ref<boolean>(false);
    const values = ref<SettingsFormValues>(
      convertSettingsToFormValues(settingList.value)
    );

    watch(settingList, () => {
      values.value = convertSettingsToFormValues(settingList.value);
    });

    const errors = ref<Record<string, string>>({});

    function submitForm(event: TagerFormSubmitEvent) {
      isSubmitting.value = true;

      const body = convertSettingValuesToRequestPayload(values.value);

      updateSeoSettingList(body)
        .then(() => {
          errors.value = {};

          if (event.type === "save_exit") {
            navigateBack(router, "/");
          }

          toast.show({
            variant: "success",
            title: t("seo:success"),
            body: t("seo:SEOSettingsHaveBeenSuccessfullyUpdated"),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          toast.show({
            variant: "danger",
            title: t("seo:error"),
            body: t("seo:SEOSettingsUpdateHasBeenFailed"),
          });
        })
        .finally(() => {
          isSubmitting.value = false;
        });
    }

    return {
      isContentLoading: loading,
      submitForm,
      isSubmitting,
      values,
      errors,
    };
  },
});
</script>

<style scoped lang="scss"></style>
