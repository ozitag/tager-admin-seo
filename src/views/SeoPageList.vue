<template>
  <page title="SEO Page Settings">
    <base-table
      :column-defs="columnDefs"
      :row-data="rowData"
      :loading="isRowDataLoading"
      enumerable
    >
      <template v-slot:cell(actions)="{ row }">
        <base-button variant="icon" title="Edit" :href="getSeoPageHref(row.id)">
          <svg-icon name="edit"></svg-icon>
        </base-button>
      </template>
    </base-table>
  </page>
</template>

<script lang="ts">
import Vue from 'vue';

import { ColumnDefinition } from '@tager/admin-ui';

import { SeoPageType } from '../typings/model';
import { getSeoPageList } from '../services/requests';
import { getSeoPageFormUrl } from '../utils/paths';

const COLUMN_DEFS: Array<ColumnDefinition<SeoPageType>> = [
  { id: 2, name: 'Alias', field: 'alias' },
  { id: 3, name: 'Name', field: 'name' },
  { id: 4, name: 'Title', field: 'title' },
  { id: 5, name: 'Description', field: 'description' },
  {
    id: 8,
    name: 'Open Graph Image',
    field: 'openGraphImage.url',
    type: 'image',
  },
  {
    id: 9,
    name: 'Actions',
    field: 'actions',
    style: { width: '80px', textAlign: 'center' },
  },
];

export default Vue.extend({
  name: 'SeoPageList',
  data(): {
    columnDefs: Array<ColumnDefinition<SeoPageType>>;
    rowData: Array<SeoPageType>;
    isRowDataLoading: boolean;
  } {
    return {
      columnDefs: COLUMN_DEFS,
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
});
</script>

<style scoped lang="scss"></style>
