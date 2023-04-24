<template lang="">
  <label v-if="label" for="" class="block mb-2">{{ label }}</label>
  <div :class="[isTouched && Boolean(errorMessage) && 'error']">
    <Field
      :name="name"
      id=""
      class="w-full border rounded resize-none p-3 dark:bg-dark3"
      placeholder="Vd: Mua đồ ăn sáng"
      as="textarea"
      cols="10"
      rows="5"
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
