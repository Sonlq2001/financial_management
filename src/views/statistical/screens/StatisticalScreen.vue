<template lang="">
  <div class="mt-5">
    <div
      class="rounded bg-white mb-10 flex w-fit p-4 dark:bg-dark2 dark:text-textDark"
    >
      <img
        :src="require('../../../assets/images/data-analysis.png')"
        alt=""
        class="w-[50px] mr-4"
      />
      <div>
        <p class="text-sm">Tổng hợp thống kê chi tiêu</p>
        <p class="text-lg font-semibold text-pink-400">Năm tháng</p>
      </div>
    </div>

    <!-- chart -->
    <chart />

    <div
      class="max-w-3xl mx-auto bg-white rounded dark:bg-dark2 dark:text-textDark"
    >
      <div v-for="(item, index) in year" :key="index">
        <div
          class="flex items-center p-3 justify-between cursor-pointer border-b border-t dark:border-slate-700"
          @click="toggleAccordion(item)"
        >
          <span>{{ item.year }}</span>
          <i
            :class="[
              item.open ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line',
              ' text-xl',
            ]"
          ></i>
        </div>
        <div :class="['h-0 overflow-hidden', item.open && 'active']">
          <div v-if="loading" class="p-4 flex items-center justify-center">
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
          <div
            class="px-5 py-4"
            v-else-if="syntheticBill && syntheticBill.length > 0"
          >
            <div
              class="flex items-center justify-between mb-4"
              v-for="(bill, index) in syntheticBill"
              :key="index"
            >
              <p>Tháng: {{ bill.month }}</p>
              <div class="flex items-center">
                <p class="w-[50px]">Tổng:</p>
                <span class="font-semibold underline">{{
                  currency(bill.total)
                }}</span>
              </div>
            </div>
            <div
              class="flex items-center justify-end border-t py-3 dark:border-slate-700"
            >
              <span class="mr-3">Cả năm:</span>
              <span class="font-semibold text-pink-400 text-lg">
                {{ currency(totalYear) }}
              </span>
            </div>
          </div>
          <div class="px-5 py-4 flex items-center justify-center" v-else>
            <p class="text-gray-500">
              Bạn không có giao dịch nào trong năm này !
            </p>
            <img
              :src="require('../../../assets/images/wow.png')"
              alt=""
              class="w-[30px] ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";

import { currency } from "@/utils/convert";
import Chart from "../components/Chart/Chart.vue";

export default {
  components: { Chart },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const year = ref([
      { year: 2023, open: false },
      { year: 2024, open: false },
    ]);

    onMounted(() => {
      store.dispatch(
        "transaction/getSyntheticTransactions",
        new Date().getFullYear()
      );
    });

    const toggleAccordion = (item) => {
      if (!item.open) {
        year.value.forEach((i) => {
          i.open = false;
        });
      }
      item.open = !item.open;

      // handle logic
      store
        .dispatch("transaction/getSyntheticTransactions", item.year)
        .finally(() => {
          loading.value = false;
        });
    };

    return {
      toggleAccordion,
      year,
      syntheticBill: computed(
        () => store.state.transaction.syntheticTransactions.list
      ),
      totalYear: computed(
        () => store.state.transaction.syntheticTransactions.totalYear
      ),
      currency,
      loading,
    };
  },
};
</script>
<style lang="css" scoped>
.active {
  transition: ease-in 0.3s;
  height: auto;
}
</style>
