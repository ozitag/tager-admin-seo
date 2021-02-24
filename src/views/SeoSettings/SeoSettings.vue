<template>
  <page
    :title="t('seo:SEOServices')"
    :is-content-loading="isContentLoading"
    :footer="{
      backHref: '/',
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <template v-slot:content>
      <form novalidate @submit.prevent="submitForm">
        <DynamicField
          v-for="field of values"
          :key="field.name"
          :field="field"
        />
      </form>
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
import { useTranslation } from '@tager/admin-ui';

import {
  getSeoSettingList,
  updateSeoSettingList,
} from '../../services/requests';
import { SettingItemType } from '../../typings/model';

import {
  convertSettingsToFormValues,
  convertSettingValuesToRequestPayload,
  SettingsFormValues,
} from './SeoSettings.helpers';

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
      resourceName: 'Settings',
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

    function submitForm() {
      isSubmitting.value = true;

      const body = convertSettingValuesToRequestPayload(values.value);

      updateSeoSettingList(body)
        .then(() => {
          errors.value = {};
          context.root.$router.push('/');

          context.root.$toast({
            variant: 'success',
            title: t('seo:success'),
            body: t('seo:SEOSettingsNaveBeenSuccessfullyUpdated'),
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
      t,
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
