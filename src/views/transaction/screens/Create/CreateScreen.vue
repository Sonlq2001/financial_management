<template lang="">
  <div class="mt-5 bg-white rounded p-4 flex w-fit">
    <img
      :src="require('../../../../assets/images/pig.png')"
      alt=""
      class="w-[50px] mr-4"
    />
    <div>
      <p class="text-sm">Quy định/tháng</p>
      <p class="text-lg font-semibold text-pink-400">4.000.000 đ</p>
    </div>
  </div>
  <div class="mt-10 max-w-3xl mx-auto bg-white rounded py-5 px-10">
    <h2 class="text-lg font-semibold">Tạo giao dịch</h2>
    <form action="" class="mt-4" @submit.prevent="handleSubmitForm">
      <div class="mb-5">
        <label for="" class="block mb-2">Tên giao dịch</label>
        <input
          type="text"
          placeholder="Vd: Mua đồ ăn sáng"
          class="border px-4 py-3 rounded w-full"
          v-model="initTransaction.name"
        />
      </div>

      <div class="mb-5">
        <label for="" class="block mb-2">Danh mục</label>
        <div class="flex">
          <button
            :class="[
              ' px-2 py-1 text-sm rounded-3xl mr-3',
              `bg-${cate.color}-200`,
              `text-${cate.color}-500`,
              cate.value === initTransaction.category &&
                `border-2 border-${cate.color}-500`,
            ]"
            type="button"
            v-for="(cate, index) in CATEGORY_TRANSACTION"
            :key="index"
            @click="handleSetCategory(cate.value)"
          >
            {{ cate.name }}
          </button>
        </div>
      </div>

      <div class="mb-5">
        <label for="" class="block mb-2">Thời gian</label>
        <div class="border rounded inline-block p-2 mr-5">
          <input type="date" class="text-lg" v-model="initTransaction.date" />
        </div>
        <div class="border rounded inline-block p-2">
          <input type="time" class="text-lg" v-model="initTransaction.time" />
        </div>
      </div>

      <div class="mb-5">
        <label for="" class="block mb-2">Tổng</label>
        <input
          type="number"
          placeholder="0 đ"
          class="border px-4 py-3 rounded w-full"
          v-model="initTransaction.totalBill"
        />
      </div>

      <div class="flex">
        <div class="w-1/2">
          <label for="" class="block mb-2">Ảnh mô tả (nếu có)</label>
          <label
            for="file"
            class="border rounded p-4 flex flex-col items-center h-[146px] justify-center"
          >
            <img
              :src="previewImage"
              alt=""
              v-if="previewImage"
              class="h-full object-contain"
            />
            <template v-else>
              <img
                :src="require('../../../../assets/images/add-image.png')"
                alt=""
                class="w-[50px]"
              />
              <p class="text-sm mt-3 text-gray-400">Loại ảnh png,jpg,jpeg</p>
            </template>
            <input type="file" id="file" hidden @change="handleImage" />
          </label>
        </div>

        <div class="w-1/2 ml-5">
          <label for="" class="block mb-2">Ghi chú</label>
          <textarea
            name=""
            id=""
            cols="10"
            rows="5"
            class="w-full border rounded resize-none p-3"
            placeholder="Vd: Mua đồ ăn sáng"
            v-model="initTransaction.note"
          />
        </div>
      </div>

      <button
        class="flex ml-auto rounded mt-5 px-4 py-2 bg-primary text-white items-center"
        type="submit"
      >
        Tạo
        <img
          :src="require('../../../../assets/images/deduction.png')"
          alt=""
          class="w-[30px] ml-2"
        />
      </button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";

import { CATEGORY_TRANSACTION } from "../../constants/transaction.constants";

export default {
  setup() {
    const initTransaction = ref({
      name: "",
      category: 1,
      date: "",
      time: "",
      totalBill: "",
      descriptionPhoto: "",
      note: "",
    });
    const previewImage = ref(null);

    const handleSetCategory = (value) => {
      initTransaction.value = { ...initTransaction.value, category: value };
    };

    const handleImage = (e) => {
      try {
        initTransaction.value = {
          ...initTransaction.value,
          descriptionPhoto: e.target.files[0],
        };
        previewImage.value = URL.createObjectURL(e.target.files[0]);
      } catch (error) {
        previewImage.value = null;
      }
    };

    const handleSubmitForm = () => {
      // submit create transaction
      console.log(initTransaction.value);
    };

    return {
      initTransaction,
      handleSubmitForm,
      CATEGORY_TRANSACTION,
      handleSetCategory,
      handleImage,
      previewImage,
    };
  },
};
</script>
<style lang=""></style>
