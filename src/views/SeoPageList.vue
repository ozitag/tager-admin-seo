<template>
  <page :title="t('seo:SEOPageSettings')">
    <base-table
      :column-defs="columnDefs"
      :row-data="rowData"
      :loading="isRowDataLoading"
      enumerable
    >
      <template v-slot:cell(actions)="{ row }">
        <base-button
          variant="icon"
          :title="t('seo:edit')"
          :href="getSeoPageHref(row.id)"
        >
          <svg-icon name="edit"></svg-icon>
        </base-button>
      </template>
    </base-table>
  </page>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { ColumnDefinition, useTranslation } from '@tager/admin-ui';

import { SeoPageType } from '../typings/model';
import { getSeoPageList } from '../services/requests';
import { getSeoPageFormUrl } from '../utils/paths';

export default defineComponent({
  name: 'SeoPageList',
  data(): {
    rowData: Array<SeoPageType>;
    isRowDataLoading: boolean;
  } {
    return {
      rowData: [],
      isRowDataLoading: false,
    };
  },
  mounted(): void {
    this.refreshSeoPageList();
  },
  methods: {
    refreshSeoPageList(): Promise<void> {
      this.isRowDataLoading = true;

      return getSeoPageList()
        .then((response) => {
          this.rowData = response.data;
        })
        .catch(console.error)
        .finally(() => {
          this.isRowDataLoading = false;
        });
    },
    getSeoPageHref(seoPageId: number): string {
      return getSeoPageFormUrl({ seoPageId });
    },
  },
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const columnDefs: Array<ColumnDefinition<SeoPageType>> = [
      { id: 2, name: t('seo:alias'), field: 'alias' },
      { id: 3, name: t('seo:name'), field: 'name' },
      { id: 4, name: t('seo:title'), field: 'title' },
      { id: 5, name: t('seo:description'), field: 'description' },
      {
        id: 8,
        name: t('seo:openGraphImage'),
        field: 'openGraphImage.url',
        type: 'image',
      },
      {
        id: 9,
        name: t('seo:actions'),
        field: 'actions',
        style: { width: '80px', textAlign: 'center' },
      },
    ];

    return {
      t,
      columnDefs,
    };
  },
});
</script>

<style scoped lang="scss"></style>
