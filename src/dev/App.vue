<template>
  <PageLayout :sidebar-menu-list="sidebarMenuList">
    <router-view />
  </PageLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { type MenuItemType, PageLayout } from "@tager/admin-layout";
import { useI18n } from "@tager/admin-services";
import { SettingsIcon } from "@tager/admin-ui";

import { getSeoSettingsUrl, getSeoTemplatesUrl } from "../utils/paths";

export default defineComponent({
  name: "App",
  components: { PageLayout },
  setup() {
    const i18n = useI18n();

    const sidebarMenuList: Array<MenuItemType> = [
      {
        id: "settings",
        text: i18n.t("seo:settings"),
        url: getSeoSettingsUrl(),
        icon: SettingsIcon,
      },
      {
        id: "templates",
        text: i18n.t("seo:templates"),
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
