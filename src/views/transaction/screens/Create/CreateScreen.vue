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
              `bg-green-100`,
              `text-green-500`,
              cate.id === initTransaction.category && `border-2 border-primary`,
            ]"
            type="button"
            v-for="(cate, index) in categories"
            :key="index"
            @click="handleSetCategory(cate.id)"
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
          v-model="initTransaction.total_bill"
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
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { useStorage } from "@/hooks/useUploadFile";

export default {
  setup() {
    const store = useStore();
    const initTransaction = ref({
      name: "",
      category: "",
      date: "",
      year: "",
      month: "",
      time: "",
      total_bill: "",
      description_photo: "",
      note: "",
    });
    const previewImage = ref(null);
    const router = useRouter();
    const { uploadFile, url } = useStorage("transactions");

    onMounted(async () => {
      await store.dispatch("transaction/getCategories");
    });

    const handleSetCategory = (value) => {
      initTransaction.value = { ...initTransaction.value, category: value };
    };

    const handleImage = (e) => {
      try {
        initTransaction.value = {
          ...initTransaction.value,
          description_photo: e.target.files[0],
        };
        previewImage.value = URL.createObjectURL(e.target.files[0]);
      } catch (error) {
        previewImage.value = null;
      }
    };

    const handleSubmitForm = async () => {
      try {
        await uploadFile(initTransaction.value.description_photo);
        const data = {
          ...initTransaction.value,
          year: String(new Date(initTransaction.value.date).getFullYear()),
          month: String(new Date(initTransaction.value.date).getMonth() + 1),
          description_photo: url.value,
        };
        await store.dispatch("transaction/createTransaction", data);
        router.push({ name: "Dashboard" });
      } catch (error) {
        //
      }
    };

    return {
      initTransaction,
      handleSubmitForm,
      handleSetCategory,
      handleImage,
      previewImage,
      categories: computed(() => store.state.transaction?.categories),
    };
  },
};
</script>
<style lang=""></style>
