<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import Vue from 'vue';

import { MenuItemType } from '@tager/admin-layout';
import { SEO_ROUTE_PATHS } from '..';

export const SEO_MENU_ITEM: MenuItemType = {
  id: 'seo',
  name: 'SEO Page Settings',
  path: SEO_ROUTE_PATHS.PAGE_LIST,
  icon: 'settings',
};

export default Vue.extend({
  name: 'App',
  data() {
    return {
      sidebarMenuList: [SEO_MENU_ITEM],
    };
  },
});
</script>

<style scoped lang="scss"></style>
