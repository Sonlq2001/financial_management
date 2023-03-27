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
        <div v-if="loading">loading...</div>
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
            Lưu
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

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

    const handleSubmitSettings = () => {
      store.dispatch("settings/updateSettings", listSettings.value);
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
