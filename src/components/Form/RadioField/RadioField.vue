<template lang="">
  <label v-if="label" for="" class="block mb-1">{{ label }}</label>
  <div :class="[row && 'flex items-center']">
    <div
      :class="
        ([isTouched && Boolean(errorMessage) && 'error'],
        'flex items-center mr-4')
      "
      v-for="(option, index) in options"
      :key="index"
    >
      <Field
        type="radio"
        :name="name"
        class="mr-3 text-md"
        :value="option.value"
        :id="index"
      />
      <label :for="index" class="">{{ option.label }}</label>
    </div>
  </div>
  <ErrorMessage
    v-if="isTouched && Boolean(errorMessage)"
    :name="name"
    as="div"
    class="text-red-500 text-sm mt-1"
  />
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
    value: [String, Number],
    options: [Object], // format Object {label: String, value: String | number}
    row: Boolean,
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
