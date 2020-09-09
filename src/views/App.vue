<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import Vue from 'vue';

import { MenuItemType } from '@tager/admin-layout';

import { getSeoPageListUrl, getSeoSettingsUrl } from '../utils/paths';

export const SEO_MENU_ITEM: MenuItemType = {
  id: 'seo',
  text: 'SEO Page Settings',
  url: getSeoPageListUrl(),
  icon: 'settings',
  children: [
    { url: getSeoPageListUrl(), text: 'Seo Page List' },
    { url: getSeoSettingsUrl(), text: 'Settings' },
  ],
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
