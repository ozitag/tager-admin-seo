<template>
  <page
    title="SEO Settings"
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
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api';

import { convertRequestErrorToMap, useResource } from '@tager/admin-services';
import { DynamicField } from '@tager/admin-dynamic-field';

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
  setup(props, context) {
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
            title: 'Success',
            body: `SEO settings have been successfully updated`,
          });
        })
        .catch((error) => {
          console.error(error);
          errors.value = convertRequestErrorToMap(error);
          context.root.$toast({
            variant: 'danger',
            title: 'Error',
            body: `SEO settings update has been failed`,
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
