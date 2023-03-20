<template lang="">
  <div class="mt-7">
    <div class="flex items-center">
      <img
        :src="require('../../../assets/images/hello.png')"
        alt=""
        class="w-[40px]"
      />
      <p class="text-2xl ml-3 font-semibold">Hey Son !</p>
    </div>
    <p class="mt-2 text-gray-500">Cập nhập chi tiêu tháng này của bạn nhé.</p>

    <!-- table -->
    <div class="bg-white rounded p-5 mt-10">
      <h2 class="border-b pb-4 text-lg font-semibold">Giao dịch tháng 3</h2>
      <table class="w-full">
        <thead class="border-b">
          <tr>
            <th class="p-3 text-left">STT</th>
            <th class="p-3 text-left">Tên</th>
            <th class="p-3 text-left">Danh mục</th>
            <th class="p-3 text-left">Thời gian</th>
            <th class="p-3 text-left">Tổng</th>
            <th class="p-3 text-left">Ghi chú</th>
          </tr>
        </thead>

        <tbody class="text-gray-500">
          <tr class="border-b">
            <td class="p-3">1</td>
            <td class="p-3">Đồ ăn sáng</td>
            <td class="p-3">
              <button
                class="bg-red-300 px-2 py-1 text-sm text-white rounded-3xl"
              >
                Gia đình
              </button>
            </td>
            <td class="p-3">17/03/2023</td>
            <td class="p-3">17.000 đ</td>
            <td class="p-3">Mua đồ ăn sáng</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("transaction/getTransactions");
    });

    return {};
  },
};
</script>
<style lang=""></style>
