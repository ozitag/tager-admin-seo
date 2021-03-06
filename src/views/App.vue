<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { MenuItemType } from '@tager/admin-layout';
import { useTranslation } from '@tager/admin-ui';

import { getSeoSettingsUrl, getSeoTemplatesUrl } from '../utils/paths';

export default defineComponent({
  name: 'App',
  setup(props, context: SetupContext) {
    const { t } = useTranslation(context);

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: 'settings',
        text: t('seo:settings'),
        url: getSeoSettingsUrl(),
        icon: 'settings',
      },
      {
        id: 'templates',
        text: t('seo:templates'),
        url: getSeoTemplatesUrl(),
        icon: 'settings',
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
