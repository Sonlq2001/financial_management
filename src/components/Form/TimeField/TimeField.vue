<template lang="">
  <div>
    <label v-if="label" for="" class="block mb-1">{{ label }}</label>
    <div
      :class="[
        isTouched && Boolean(errorMessage) ? 'error' : 'border',
        'inline-block rounded',
      ]"
    >
      <Field
        type="time"
        :name="name"
        class="text-lg dark:bg-dark3 p-2 rounded"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
      />
    </div>
    <ErrorMessage :name="name" as="div" class="text-red-500 text-sm mt-1" />
  </div>
</template>
<script>
import {
  Field,
  ErrorMessage,
  useFieldError,
  useIsFieldTouched,
} from "vee-validate";
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    placeholder: String,
    label: String,
    autocomplete: String,
  },
  components: { Field, ErrorMessage },
  setup(props) {
    const errorMessage = useFieldError(props.name);
    const isTouched = useIsFieldTouched(props.name);

    return {
      isTouched,
      errorMessage,
    };
  },
};
</script>
<style lang=""></style>
