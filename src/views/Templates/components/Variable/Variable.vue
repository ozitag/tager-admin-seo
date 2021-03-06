<template>
  <div
    :class="['variable', { 'is-copied': isCopied }]"
    :title="t('seo:copy')"
    @click="copyVarTemplate(getNameTemplate(name))"
  >
    <span class="label">
      <span>{{ label }}</span> -
      <span>{{ getNameTemplate(name) }}</span>
    </span>
    <span class="copied">{{ t('seo:copied') }}!</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';

import { useCopyToClipboard, useTranslation } from '@tager/admin-ui';

interface Props {
  label: string;
  name: string;
}

export default defineComponent<Props>({
  name: 'Variable',
  props: {
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
  },
  setup(props: Props, context: SetupContext) {
    const { t } = useTranslation(context);
    const [isCopied, copyVarTemplate] = useCopyToClipboard(500);

    function getNameTemplate(name: string): string {
      return `{{${name}}}`;
    }

    return {
      t,
      isCopied,
      getNameTemplate,
      copyVarTemplate,
    };
  },
});
</script>

<style scoped lang="scss">
.variable {
  --gap: 0.5rem;

  position: relative;
  margin-top: var(--gap);
  margin-right: var(--gap);
  padding: 0.375rem 0.75rem;
  max-width: 100%;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-color);
  background: #eee;
  border-radius: 0.12rem;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background: #ddd;
  }

  .label {
    opacity: 1;
  }

  .copied {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  &.is-copied {
    .label {
      opacity: 0;
    }

    .copied {
      opacity: 1;
    }
  }
}
</style>
