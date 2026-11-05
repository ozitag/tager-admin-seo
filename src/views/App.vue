<template>
  <page-layout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </page-layout>
</template>

<script lang="ts">
import { defineComponent, type SetupContext } from "vue";

import { type MenuItemType } from "@tager/admin-layout";
import { SettingsIcon } from "@tager/admin-ui";
import { useI18n } from "@tager/admin-services";

import { getSeoSettingsUrl, getSeoTemplatesUrl } from "../utils/paths";

export default defineComponent({
  name: "App",
  setup() {
    const { t } = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: "settings",
        text: t("seo:settings"),
        url: getSeoSettingsUrl(),
        icon: SettingsIcon,
      },
      {
        id: "templates",
        text: t("seo:templates"),
        url: getSeoTemplatesUrl(),
        icon: SettingsIcon,
      },
    ];

    return {
      sidebarMenuList,
    };
  },
});
</script>

<style scoped lang="scss"></style>
