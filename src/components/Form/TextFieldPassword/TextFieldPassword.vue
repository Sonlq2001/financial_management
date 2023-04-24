<template lang="">
  <div :class="[isTouched && Boolean(errorMessage) && 'error']">
    <label v-if="label" for="" class="block mb-1">{{ label }}</label>
    <div class="relative">
      <Field
        :type="typePassword ? 'password' : 'text'"
        :name="name"
        class="border rounded py-3 pl-3 pr-11 w-full"
        autocomplete="current-password"
        :placeholder="placeholder"
      />
      <span @click="toggleShowPassword">
        <i
          class="ri-eye-line absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
          v-if="typePassword"
        />
        <i
          class="ri-eye-off-line absolute right-3 cursor-pointer top-1/2 -translate-y-1/2"
          v-else
        />
      </span>
    </div>
    <ErrorMessage :name="name" as="div" class="text-red-500 text-sm mt-1" />
  </div>
</template>
<script>
import { ref } from "vue";
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
  },
  components: { Field, ErrorMessage },
  setup(props) {
    const typePassword = ref(true);
    const errorMessage = useFieldError(props.name);
    const isTouched = useIsFieldTouched(props.name);

    const toggleShowPassword = () => {
      typePassword.value = !typePassword.value;
    };

    return {
      isTouched,
      errorMessage,
      toggleShowPassword,
      typePassword,
    };
  },
};
</script>
<style lang=""></style>
