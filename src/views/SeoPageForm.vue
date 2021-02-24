<template>
  <page
    :title="$t('seo:SEOPageForm')"
    :is-content-loading="isInitialLoading"
    :footer="{
      backHref: seoPageListRoutePath,
      backLabel: $t('seo:backToSEOPageSettings'),
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <form-field
        v-model="values.title"
        name="title"
        :label="$t('seo:title')"
        :error="errors.title"
      />

      <form-field
        v-model="values.description"
        name="description"
        :label="$t('seo:description')"
        :error="errors.description"
        type="textarea"
      />

      <form-field
        v-model="values.openGraphTitle"
        name="openGraphTitle"
        :label="$t('seo:openGraphTitle')"
        :error="errors.openGraphTitle"
      />

      <form-field
        v-model="values.openGraphDescription"
        name="openGraphDescription"
        :label="$t('seo:openGraphDescription')"
        :error="errors.openGraphDescription"
        type="textarea"
      />

      <form-field-file-input
        v-model="values.openGraphImage"
        name="openGraphImage"
        :label="$t('seo:openGraphImage')"
        :error="errors.openGraphImage"
        file-type="image"
      />
    </form>
  </page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

import {
  convertRequestErrorToMap,
  createId,
  Nullable,
} from '@tager/admin-services';
import { SingleFileInputValueType } from '@tager/admin-ui';

import {
  getSeoPage,
  SeoPageUpdatePayload,
  updateSeoPage,
} from '../services/requests';
import { SeoPageType } from '../typings/model';
import { getSeoPageListUrl } from '../utils/paths';

type FormValues = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: Nullable<SingleFileInputValueType>;
};

export default defineComponent({
  name: 'SeoPageForm',
  data(): {
    values: FormValues;
    errors: Record<string, string>;
    isSubmitting: boolean;
    isInitialLoading: boolean;
    seoPageListRoutePath: string;
  } {
    return {
      values: {
        title: '',
        description: '',
        openGraphTitle: '',
        openGraphDescription: '',
        openGraphImage: null,
      },
      errors: {},
      isSubmitting: false,
      isInitialLoading: false,
      seoPageListRoutePath: getSeoPageListUrl(),
    };
  },
  computed: {
    seoPageId(): string {
      return this.$route.params.seoPageId;
    },
  },
  mounted(): void {
    this.isInitialLoading = true;

    getSeoPage(this.seoPageId)
      .then((response) => {
        this.values = this.convertSeoPageToFormValues(response.data);
      })
      .catch(console.error)
      .finally(() => {
        this.isInitialLoading = false;
      });
  },
  methods: {
    convertSeoPageToFormValues(seoPage: SeoPageType): FormValues {
      return {
        title: seoPage.title,
        description: seoPage.description,
        openGraphTitle: seoPage.openGraphTitle ?? '',
        openGraphDescription: seoPage.openGraphDescription ?? '',
        openGraphImage: seoPage.openGraphImage
          ? { id: createId(), file: seoPage.openGraphImage }
          : null,
      };
    },
    submitForm() {
      this.isSubmitting = true;

      const body: SeoPageUpdatePayload = {
        ...this.values,
        openGraphImage: this.values.openGraphImage?.file.id ?? null,
      };

      updateSeoPage(this.seoPageId, body)
        .then(() => {
          this.errors = {};
          this.$router.push(getSeoPageListUrl());

          this.$toast({
            variant: 'success',
            title: 'Success',
            body: 'SEO page has been successfully updated',
          });
        })
        .catch((error) => {
          console.error(error);
          this.errors = convertRequestErrorToMap(error);
          this.$toast({
            variant: 'danger',
            title: 'Error',
            body: 'SEO page update has been failed',
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
});
</script>

<style scoped lang="scss"></style>
