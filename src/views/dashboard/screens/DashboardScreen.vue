<template lang="">
  <div class="mt-7">
    <div class="flex items-center">
      <img
        :src="require('../../../assets/images/hello.png')"
        alt=""
        class="w-[40px]"
      />
      <p class="text-2xl ml-3 font-semibold dark:text-textDark">Hey Son !</p>
    </div>
    <p class="mt-2 text-gray-500">Cập nhập chi tiêu tháng này của bạn nhé.</p>

    <div class="bg-white rounded p-4 mt-10 dark:bg-dark2 dark:text-textDark">
      <div class="flex items-center mb-5">
        <img
          :src="require('../../../assets/images/event.png')"
          alt=""
          class="w-[30px] mr-3"
        />
        Hôm nay:
        <span class="ml-3 font-semibold">{{ currency(totalMoneyToday) }}</span>
      </div>
      <div class="flex items-center">
        <img
          :src="require('../../../assets/images/yesterday.png')"
          alt=""
          class="w-[30px] mr-3"
        />
        Hôm qua:
        <span class="ml-3 font-semibold">{{
          currency(totalMoneyYesterday)
        }}</span>
      </div>
    </div>

    <!-- table -->
    <div class="bg-white rounded p-5 mt-5 dark:bg-dark2 dark:text-textDark">
      <div
        class="flex items-center border-b pb-4 text-lg font-semibold justify-between dark:border-slate-700"
      >
        <h2 class="">
          Giao dịch tháng {{ new Date().getMonth() + 1 }} -
          {{ new Date().getFullYear() }}
        </h2>
        <div class="flex items-center">
          <span class="text-sm font-medium mr-2">Tổng chi:</span>
          <div class="flex items-center">
            <span>{{ currency(totalOfMonthMoney) }}</span>
            <span class="mx-1">/</span>
            <span class="text-pink-400">{{ currency(totalMoneyLimit) }}</span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="h-[500px] flex justify-center items-center">
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
        v-else-if="transactionList?.length <= 0"
        class="h-[500px] flex justify-center items-center"
      >
        <div class="relative max-w-xs mx-auto text-center">
          <p class="font-semibold">Tháng này bạn chưa có giao dịch nào!</p>
          <p class="font-semibold">Thật tuyệt vời</p>

          <img
            :src="require('../../../assets/images/firework.png')"
            alt=""
            class="w-[30px] absolute -mt-[115px] -ml-[15px]"
          />
          <img
            :src="require('../../../assets/images/firework.png')"
            alt=""
            class="w-[25px] absolute -mt-[75px] -ml-[10px]"
          />
          <img
            :src="require('../../../assets/images/firework.png')"
            alt=""
            class="w-[40px] absolute -mt-[90px] -z-0 -ml-[60px]"
          />
        </div>
      </div>
      <table class="w-full" v-else>
        <thead class="border-b dark:border-slate-700">
          <tr>
            <th class="p-3 text-left">ID</th>
            <th class="p-3 text-left">Tên</th>
            <th class="p-3 text-left">Ảnh mô tả</th>
            <th class="p-3 text-left">Danh mục</th>
            <th class="p-3 text-left">Thời gian</th>
            <th class="p-3 text-left">Tổng</th>
            <th class="p-3 text-left">Ghi chú</th>
            <th class="p-3 text-left">Thao tác</th>
          </tr>
        </thead>

        <tbody class="text-gray-500">
          <tr
            class="border-b dark:border-slate-700"
            v-for="transaction in transactionList"
            :key="transaction.id"
          >
            <td class="p-3">{{ transaction.id.slice(0, 5) }}...</td>
            <td class="p-3 font-semibold">{{ transaction.name }}</td>
            <td class="p-3">
              <img
                :src="transaction.description_photo"
                alt=""
                class="w-[200px] h-[150px] object-contain"
              />
            </td>
            <td class="p-3">
              <button
                class="bg-red-300 px-2 py-1 text-sm text-white rounded-3xl whitespace-nowrap"
              >
                {{ transaction.category }}
              </button>
            </td>
            <td class="p-3">{{ transaction.date }} {{ transaction.time }}</td>
            <td class="p-3 font-semibold text-primary">
              {{ currency(transaction.total_bill || 0) }}
            </td>
            <td class="p-3">{{ transaction.note }}</td>
            <td class="p-3">
              <button
                class="cursor-pointer px-2 py-1 bg-primary rounded"
                @click="handleOpenModalConfirm(transaction.id)"
              >
                <i class="ri-delete-bin-2-line text-xl text-white" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- pagination -->
      <div class="mt-5 flex items-center justify-end" v-if="totalAllData > 1">
        <button
          :class="[
            ' text-white rounded w-[35px] h-[35px] ml-3 border',
            currentPage === 1 && 'bg-gray-100 dark:bg-gray-300 ',
          ]"
          @click="paginationData((currentPage -= 1))"
          :disabled="currentPage === 1"
        >
          <i class="ri-arrow-left-s-line text-gray-500 dark:text-gray-500" />
        </button>
        <button
          :class="[
            'bg-gray-500 text-white rounded w-[35px] h-[35px] ml-3',
            currentPage === page && 'bg-primary',
          ]"
          @click="handleNextPage(page)"
          v-for="page in totalAllData"
          :key="page"
          :disabled="currentPage === page"
        >
          {{ page }}
        </button>
        <button
          :class="[
            ' text-white rounded w-[35px] h-[35px] ml-3 border',
            currentPage === totalAllData && 'bg-gray-100',
          ]"
          @click="paginationData((currentPage += 1))"
          :disabled="currentPage === totalAllData"
        >
          <i class="ri-arrow-right-s-line text-lg text-gray-500" />
        </button>
      </div>
    </div>

    <!-- Modal confirm delete transaction -->
    <modal
      :open="isShowModal"
      @onClose="handleCloseModal"
      :error="true"
      alignBtn="center"
      @onSubmit="handleRemoveTransaction"
    >
      <div class="text-center">
        <svg
          aria-hidden="true"
          class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Bạn có chắc chắn muốn xóa giao dịch này?
        </h3>
      </div>
    </modal>
  </div>
</template>
<script>
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";

import { useMode } from "@/hooks/useMode";
import { currency } from "@/utils/convert";
import { DEFAULT_PER_PAGE } from "@/constants/app.constants";
import Modal from "@/components/Modal/Modal.vue";
import { DEFAULT_MESSAGES } from "@/constants/app.constants";

export default {
  components: { Modal },
  setup() {
    const store = useStore();
    const loading = ref(true);
    const currentPage = ref(1);
    const isShowModal = ref(false);
    const idTransaction = ref(null);

    const currentMonth = new Date().getMonth() + 1;
    onMounted(async () => {
      Promise.all([
        store.dispatch("transaction/getTransactions", {
          month: currentMonth,
        }),
        store.dispatch("transaction/getTotalBill", {
          month: currentMonth,
        }),
      ]).finally(() => (loading.value = false));
    });

    onMounted(async () => {
      await store.dispatch("settings/getSettings");
      useMode();
    });

    const paginationData = async (page) => {
      await store.dispatch("transaction/getTransactions", {
        month: currentMonth,
        page,
      });
    };

    const handleNextPage = async (page) => {
      currentPage.value = page;
      paginationData(page);
    };

    const handleOpenModalConfirm = (id) => {
      isShowModal.value = true;
      idTransaction.value = id;
    };

    const handleCloseModal = () => {
      isShowModal.value = false;
    };

    const handleRemoveTransaction = async () => {
      try {
        await store.dispatch(
          "transaction/removeTransaction",
          idTransaction.value
        );
        await store.dispatch("transaction/getTotalBill", {
          month: currentMonth,
        });
        handleCloseModal();
        store.dispatch("snackbar/displaySnackbar", {
          message: DEFAULT_MESSAGES.remove_success,
        });
      } catch (error) {
        // todo handle error
      }
    };

    return {
      transactionList: computed(
        () => store.state.transaction.listTransactions.list
      ),
      totalAllData: computed(() => {
        const total = store.state.transaction.listTransactions.total;
        const totalPage = Math.ceil(total / DEFAULT_PER_PAGE);
        return totalPage;
      }),
      totalOfMonthMoney: computed(
        () => store.state.transaction.totalBill.totalMoneyOfMonth
      ),
      totalMoneyToday: computed(
        () => store.state.transaction.totalBill.totalMoneyToday
      ),
      totalMoneyYesterday: computed(
        () => store.state.transaction.totalBill.totalMoneyYesterday
      ),
      loading,
      currency,
      handleNextPage,
      currentPage,
      paginationData,
      totalMoneyLimit: computed(
        () => store.state.settings.listSettings?.regulated_money
      ),
      isShowModal,
      handleOpenModalConfirm,
      handleCloseModal,
      handleRemoveTransaction,
    };
  },
};
</script>
<style lang=""></style>
