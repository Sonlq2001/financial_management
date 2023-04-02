<template lang="">
  <div class="mt-5">
    <div class="rounded bg-white mb-10 flex w-fit p-4 dark:bg-dark2">
      <img
        :src="require('../../../assets/images/settings.png')"
        alt=""
        class="w-[50px] mr-4"
      />
      <div class="dark:text-textDark">
        <p class="text-sm">Cấu hình cài đặt</p>
        <p class="text-lg font-semibold text-pink-400">Cài đặt</p>
      </div>
    </div>

    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded p-5 dark:bg-dark2 dark:text-textDark">
        <h2
          class="text-lg font-semibold mb-4 border-b pb-3 dark:border-slate-700"
        >
          Cấu hình chi tiết
        </h2>
        <div v-if="loading" class="flex justify-center items-center">
          <svg
            aria-hidden="true"
            class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-300 fill-primary"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <form @submit.prevent="handleSubmitSettings" v-else>
          <div class="mb-7">
            <label for="" class="block mb-3">Chế độ:</label>
            <div class="flex items-center">
              <label
                class="relative inline-flex items-center cursor-pointer mr-10"
              >
                <input
                  type="checkbox"
                  value=""
                  class="sr-only peer"
                  :checked="listSettings.mode"
                  v-model="listSettings.mode"
                />
                <div
                  class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                />
              </label>
              <div class="ml-3 flex items-center" v-if="listSettings.mode">
                <span class="text-lg">Tối</span>
                <img
                  :src="require('../../../assets/images/moon.png')"
                  class="w-[30px] ml-3"
                  alt=""
                />
              </div>
              <div class="ml-3 flex items-center" v-else>
                <span class="text-lg">Sáng</span>
                <img
                  :src="require('../../../assets/images/sun.png')"
                  class="w-[30px] ml-3"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div class="mb-7">
            <label for="" class="block mb-3"
              >Số tiền quy định hàng tháng:</label
            >
            <vue-number-format
              v-model:value="listSettings.regulated_money"
              :options="{
                precision: '',
                prefix: '',
                suffix: ' đ',
                decimal: '',
                thousand: ',',
                acceptNegative: false,
                isInteger: false,
              }"
              class="w-full rounded border p-3 dark:bg-dark3 focus:outline-none"
            />
          </div>

          <button class="bg-primary rounded flex ml-auto text-white px-3 py-2">
            Lưu {{ show }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

import { useMode } from "@/hooks/useMode";
import { DEFAULT_MESSAGES } from "@/constants/app.constants";

export default {
  setup() {
    const store = useStore();
    const listSettings = computed(() => store.state?.settings?.listSettings);
    const loading = ref(true);

    onMounted(async () => {
      await store
        .dispatch("settings/getSettings")
        .finally(() => (loading.value = false));
    });

    const handleSubmitSettings = async () => {
      try {
        await store.dispatch("settings/updateSettings", listSettings.value);
        useMode();
        store.dispatch("snackbar/displaySnackbar", {
          message: DEFAULT_MESSAGES.update_success,
        });
      } catch (error) {
        store.dispatch("snackbar/displaySnackbar", {
          type: "error",
        });
      }
    };

    return {
      handleSubmitSettings,
      loading,
      listSettings,
    };
  },
};
</script>
<style lang=""></style>
