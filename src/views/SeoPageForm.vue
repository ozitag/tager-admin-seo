<template>
  <page
    title="SEO Page Form"
    :is-content-loading="isInitialLoading"
    :footer="{
      backHref: seoPageListRoutePath,
      backLabel: 'Back to SEO Page Settings',
      onSubmit: submitForm,
      isSubmitting: isSubmitting,
    }"
  >
    <form novalidate @submit.prevent>
      <form-field
        v-model="values.title"
        name="title"
        label="Title"
        :error="errors.title"
      />

      <form-field
        v-model="values.description"
        name="description"
        label="Description"
        :error="errors.description"
        type="textarea"
      />

      <form-field
        v-model="values.openGraphTitle"
        name="openGraphTitle"
        label="Open Graph Title"
        :error="errors.openGraphTitle"
      />

      <form-field
        v-model="values.openGraphDescription"
        name="openGraphDescription"
        label="Open Graph Description"
        :error="errors.openGraphDescription"
        type="textarea"
      />

      <form-field-file-input
        v-model="values.openGraphImage"
        name="openGraphImage"
        label="Open Graph Image"
        :error="errors.openGraphImage"
        file-type="image"
      />
    </form>
  </page>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  convertRequestErrorToMap,
  FileType,
  Nullable,
} from '@tager/admin-services';

import {
  getSeoPage,
  SeoPageUpdatePayload,
  updateSeoPage,
} from '../services/requests';
import { SeoPageType } from '../typings/model';
import { getSeoListUrl } from '../utils/paths';

type FormValues = {
  title: string;
  description: string;
  openGraphTitle: string;
  openGraphDescription: string;
  openGraphImage: Nullable<FileType>;
};

export default Vue.extend({
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
      seoPageListRoutePath: getSeoListUrl(),
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
        openGraphImage: seoPage.openGraphImage,
      };
    },
    submitForm() {
      this.isSubmitting = true;

      const body: SeoPageUpdatePayload = {
        ...this.values,
        openGraphImage: this.values.openGraphImage?.id ?? null,
      };

      updateSeoPage(this.seoPageId, body)
        .then(() => {
          this.errors = {};
          this.$router.push(getSeoListUrl());

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
