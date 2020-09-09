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
          v-for="settingField of settingList"
          :key="settingField.name"
          :field="settingField"
          :error="errors[settingField.name]"
        />
      </form>
    </template>
  </page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';

import { convertRequestErrorToMap, useResource } from '@tager/admin-services';

import { SettingsItemType } from '../../typings/model';
import {
  getSeoSettingList,
  updateSeoSettingList,
} from '../../services/requests';

import DynamicField from './component/DynamicField.vue';
import { convertSettingListToRequestPayload } from './SeoSettings.helpers';

export default defineComponent({
  name: 'SeoSettings',
  components: { DynamicField },
  setup(props, context) {
    const [fetchSettingList, { data: settingList, loading }] = useResource<
      Array<SettingsItemType>
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

    const errors = ref<Record<string, string>>({});

    function submitForm() {
      isSubmitting.value = true;

      const body = convertSettingListToRequestPayload(settingList.value);

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
      settingList,
      errors,
    };
  },
});
</script>

<style scoped lang="scss"></style>
