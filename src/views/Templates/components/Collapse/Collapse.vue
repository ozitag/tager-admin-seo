<template>
  <div class="collapse">
    <button
      type="button"
      :class="['toggle', isOpen ? 'collapse' : 'expand']"
      :title="isOpen ? 'Collapse' : 'Expand'"
      @click="handleToggleClick"
    >
      <span
        role="img"
        :class="['icon-chevron-right', { 'icon-expand-more': isOpen }]"
      >
        <ChevronRightIcon />
      </span>

      <span class="title">
        {{ label }}
      </span>
    </button>

    <div v-show="isOpen" class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import { ChevronRightIcon } from "@tager/admin-ui";

export default defineComponent({
  name: "Collapse",
  components: { ChevronRightIcon },
  props: {
    label: {
      type: String,
      default: "",
    },
    uniqueKey: {
      type: String,
      default: "",
    },
  },
  setup() {
    const isOpen = ref<boolean>(false);

    function handleToggleClick() {
      isOpen.value = !isOpen.value;
    }

    return {
      isOpen,
      handleToggleClick,
    };
  },
});
</script>

<style scoped lang="scss">
.collapse {
  margin-bottom: 1rem;

  .toggle {
    display: inline-flex;
    align-items: center;
    color: inherit;
    margin-left: -0.375rem;
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &:hover {
      cursor: pointer;
    }

    &.collapse {
      color: var(--primary);

      .icon-expand-more {
        color: var(--primary);
      }
    }
  }

  .icon-chevron-right {
    margin-right: 0.375rem;
    color: var(--secondary);
    transition: color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    svg {
      display: block;
      fill: currentColor;
      will-change: transform;
      transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 0.24s;
    }

    &.icon-expand-more {
      svg {
        transform: rotate(90deg);
      }
    }
  }

  .content {
    margin: 1rem 0 2rem 0;
    padding: 0 1.5rem;
  }
}
</style>
