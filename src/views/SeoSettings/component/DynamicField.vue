<script lang="ts">
import Vue, { VNode } from 'vue';

import {
  FormField,
  FormFieldFileInput,
  FormFieldRichTextInput,
} from '@tager/admin-ui';
import { Nullable } from '@tager/admin-services';

import { SettingsItemType } from '../../../typings/model';

type Props = Readonly<{
  field: SettingsItemType;
  error: Nullable<string>;
}>;

export default Vue.extend<Props>({
  name: 'DynamicField',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true,
    },
    error: {
      type: String,
      default: null,
    },
  },
  render(h, context) {
    function renderField(
      field: SettingsItemType,
      error: Nullable<string>
    ): VNode {
      const commonProps = {
        label: field.label,
        name: field.name,
        value: field.value,
        error,
      };

      function handleChange(event: SettingsItemType['value']) {
        field.value = event;
      }

      switch (field.type) {
        case 'STRING':
          return h(FormField, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'TEXT':
          return h(FormField, {
            props: {
              ...commonProps,
              type: 'textarea',
              rows: 4,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'HTML':
          return h(FormFieldRichTextInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              input: handleChange,
            },
          });
        case 'IMAGE':
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            attrs: {
              fileType: 'image',
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case 'GALLERY':
          return h(FormFieldFileInput, {
            props: {
              label: field.label,
              name: field.name,
              value: field.value,
            },
            attrs: {
              fileType: 'image',
              multiple: true,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });
        case 'FILE':
          return h(FormFieldFileInput, {
            props: {
              ...commonProps,
            },
            on: {
              ...context.listeners,
              change: handleChange,
            },
          });

        default:
          return h('p', `Unknown field with type: ${field.type}`);
      }
    }

    return renderField(context.props.field, context.props.error);
  },
});
</script>

<style scoped></style>
