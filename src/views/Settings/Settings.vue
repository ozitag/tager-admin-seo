<template>
  <page :title="$t('seo:SEOServices')" :is-content-loading="isContentLoading">
    <template v-slot:content>
      <form novalidate @submit.prevent="submitForm">
        <DynamicField
          v-for="field of values"
          :key="field.name"
          :field="field"
        />
      </form>
    </template>

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

import { convertRequestErrorToMap, useResource } from '@tager/admin-services';
import { DynamicField } from '@tager/admin-dynamic-field';
import { TagerFormSubmitEvent, useTranslation } from '@tager/admin-ui';

import {
  getSeoSettingList,
  updateSeoSettingList,
} from '../../services/requests';
import { SettingItemType } from '../../typings/model';

import {
  convertSettingsToFormValues,
  convertSettingValuesToRequestPayload,
  SettingsFormValues,
} from './Settings.helpers';

export default defineComponent({
  name: 'SeoSettings',
  components: { DynamicField },
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const [fetchSettingList, { data: settingList, loading }] = useResource<
      Array<SettingItemType>
    >({
      fetchResource: getSeoSettingList,
      initialValue: [],
      context,
      resourceName: 'SEO Settings',
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
            body: t('seo:SEOSettingsHaveBeenSuccessfullyUpdated'),
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
            variant: 'danger',
            title: t('seo:error'),
            body: t('seo:SEOSettingsUpdateHasBeenFailed'),
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
