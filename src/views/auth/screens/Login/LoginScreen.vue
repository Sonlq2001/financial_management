<template lang="">
  <div class="w-full h-screen flex">
    <div class="bg-primary w-1/2 h-full">
      <!-- todo -->
    </div>
    <div class="flex justify-center items-center w-1/2 relative">
      <div class="w-[370px] mx-auto">
        <Form
          class="w-full"
          @submit="handleSubmitForm"
          :validation-schema="schema"
          :initial-values="initValues"
        >
          <h1 class="text-3xl mb-3">Chào mừng trở lại!</h1>
          <h4 class="mb-6 text-gray-400">
            Bắt đầu quản lý tài chính của mình.
          </h4>
          <div class="mb-4">
            <text-field
              name="email"
              label="Email"
              placeholder="Email của bạn"
              autocomplete="username"
            />
          </div>
          <div class="mb-10">
            <text-field-password
              name="password"
              label="Mật khẩu"
              placeholder="Mật khẩu"
            />
          </div>
          <button class="w-full bg-primary p-3 rounded text-white">
            Đăng nhập
          </button>
        </Form>

        <p class="text-gray-400 mt-12 text-center">
          Bạn chưa có tài khoản?
          <span class="text-primary cursor-pointer font-semibold">Đăng ký</span>
        </p>

        <p
          class="tran text-center text-gray-400 absolute bottom-8 left-1/2 -translate-x-1/2 uppercase"
        >
          &#169; 2023 your self
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Form } from "vee-validate";

import { MESSAGES_CONSTANT } from "../../constants/auth.constants";
import TextField from "@/components/Form/TextField/TextField.vue";
import TextFieldPassword from "@/components/Form/TextFieldPassword/TextFieldPassword.vue";
import { schema } from "../../helpers/auth.helpers";

export default {
  components: { Form, TextField, TextFieldPassword },
  setup() {
    const store = useStore();
    const router = useRouter();

    const initValues = {
      email: "",
      password: "",
    };

    const handleSubmitForm = async (values) => {
      try {
        await store.dispatch("auth/login", values);
        router.push("/");
      } catch (error) {
        alert(MESSAGES_CONSTANT[error.code]);
        // too handle errors
      }
    };
    return {
      initValues,
      handleSubmitForm,
      schema,
    };
  },
};
</script>
<style lang=""></style>
