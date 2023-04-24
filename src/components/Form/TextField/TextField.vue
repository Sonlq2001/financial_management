<template lang="">
  <div :class="[isTouched && Boolean(errorMessage) && 'error']">
    <label v-if="label" for="" class="block mb-1">{{ label }}</label>
    <Field
      type="text"
      :name="name"
      :class="[
        'border rounded py-3 pl-3 pr-11 w-full',
        useDarkMode && 'dark:bg-dark3',
      ]"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
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
    useDarkMode: Boolean,
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
