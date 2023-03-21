<template lang="">
  <div class="w-full h-screen flex">
    <div class="bg-primary w-1/2 h-full">
      <!-- todo -->
    </div>
    <div class="flex justify-center items-center w-1/2 relative">
      <div class="w-[370px] mx-auto">
        <form action="" class="w-full" @submit.prevent="handleSubmitForm">
          <h1 class="text-3xl mb-3">Chào mừng trở lại!</h1>
          <h4 class="mb-6 text-gray-400">
            Bắt đầu quản lý tài chính của mình.
          </h4>
          <div class="mb-4">
            <label for="" class="block mb-1">Email</label>
            <input
              type="text"
              placeholder="Email"
              class="border border-gray-400 rounded p-3 w-full"
              v-model="initFormAuth.email"
            />
          </div>
          <div class="mb-10">
            <label for="" class="block mb-1">Mật khẩu</label>
            <div class="relative">
              <input
                :type="typePassword ? 'password' : 'text'"
                placeholder="Mật khẩu"
                class="border border-gray-400 rounded py-3 pl-3 pr-11 w-full"
                v-model="initFormAuth.password"
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
          </div>
          <button class="w-full bg-primary p-3 rounded text-white">
            Đăng nhập
          </button>
        </form>

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
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { MESSAGES_CONSTANT } from "../../constants/auth.constants";

export default {
  setup() {
    const initFormAuth = ref({ email: "", password: "" });
    const typePassword = ref(true);
    const store = useStore();
    const router = useRouter();

    const toggleShowPassword = () => {
      typePassword.value = !typePassword.value;
    };

    const handleSubmitForm = async () => {
      try {
        await store.dispatch("auth/login", {
          email: initFormAuth.value.email,
          password: initFormAuth.value.password,
        });
        router.push("/");
      } catch (error) {
        alert(MESSAGES_CONSTANT[error.code]);
        // too handle errors
      }
    };
    return {
      initFormAuth,
      handleSubmitForm,
      typePassword,
      toggleShowPassword,
    };
  },
};
</script>
<style lang=""></style>
