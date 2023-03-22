<template>
  <div class="mt-5">
    <div class="rounded bg-white mb-10 flex w-fit p-4">
      <img
        :src="require('../../../assets/images/classification.png')"
        alt=""
        class="w-[50px] mr-4"
      />
      <div>
        <p class="text-sm">Danh mục giao dịch</p>
        <p class="text-lg font-semibold text-pink-400">Tạo danh mục</p>
      </div>
    </div>

    <div class="mt-10 max-w-3xl mx-auto rounded bg-white px-10 py-5">
      <form action="" @submit.prevent="handleSubmitForm">
        <label for="" class="mb-1 block">Tên danh mục</label>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Vd: Khách quan"
            class="border rounded w-full py-2 px-3"
            v-model="initCategory.name"
          />
          <button
            class="rounded px-4 py-3 bg-primary h-[42px] flex items-center"
          >
            <i class="ri-add-circle-line text-2xl text-white"></i>
          </button>
        </div>

        <div class="mt-7 border-t">
          <div class="flex items-center justify-between py-3">
            <p>Gia đình</p>
            <i class="ri-delete-bin-2-line text-xl cursor-pointer"></i>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const initCategory = ref({ name: "" });

    const handleSubmitForm = async () => {
      await store.dispatch("category/createCategory", initCategory.value);
      initCategory.value.name = "";
    };
    return { initCategory, handleSubmitForm };
  },
};
</script>

<style lang="scss" scoped></style>
