<template>
  <div class="mt-5">
    <div
      class="rounded bg-white mb-10 flex w-fit p-4 dark:bg-dark2 dark:text-textDark"
    >
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

    <div
      class="mt-10 max-w-3xl mx-auto rounded bg-white px-10 py-5 dark:bg-dark2 dark:text-textDark"
    >
      <form action="" @submit.prevent="handleSubmitForm">
        <label for="" class="mb-1 block">Tên danh mục</label>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Vd: Khách quan"
            class="border rounded w-full py-2 px-3 dark:bg-dark3 focus:outline-none"
            v-model="initCategory.name"
          />
          <button
            class="rounded px-4 py-3 bg-primary h-[42px] flex items-center"
          >
            <i class="ri-add-circle-line text-2xl text-white"></i>
          </button>
        </div>
      </form>
      <p class="mt-7 text-sm text-gray-500 mb-2">
        Tổng: {{ listCategories?.length }} / 5
      </p>
      <div class="border-t dark:border-slate-700">
        <div
          class="flex items-center justify-between py-3"
          v-for="cate in listCategories"
          :key="cate.id"
        >
          <input
            v-if="cate.id === currentIdCate"
            type="text"
            v-model="categoryEdit.name"
            class="w-full py-1 px-2 border rounded mr-5 dark:bg-dark3"
          />
          <p v-else>{{ cate.name }}</p>

          <!-- btn save or cancel -->
          <div class="flex items-center" v-if="cate.id === currentIdCate">
            <button
              class="rounded px-2 py-1 text-sm text-white mr-2 bg-primary"
              @click="handleUpdateCategory(cate.id)"
            >
              Lưu
            </button>
            <button
              class="rounded px-2 py-1 text-sm text-white bg-red-500"
              @click="handleCancelEditCategory"
            >
              Huỷ
            </button>
          </div>

          <!-- btn edit or remove -->
          <div class="flex items-center" v-else>
            <i
              class="ri-pencil-fill text-xl cursor-pointer mr-3"
              @click="handleEditCategory(cate)"
            />
            <i
              class="ri-delete-bin-2-line text-xl cursor-pointer"
              @click="handleRemoveCategory(cate.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";

import { DEFAULT_MESSAGES } from "@/constants/app.constants";

export default {
  setup() {
    const store = useStore();
    const initCategory = ref({ name: "", createdAt: new Date().getTime() });
    const categoryEdit = ref({ name: "" });
    const currentIdCate = ref(null);

    onMounted(async () => {
      await store.dispatch("category/getCategories");
    });

    const handleSubmitForm = async () => {
      try {
        await store.dispatch("category/createCategory", initCategory.value);
        initCategory.value.name = "";
        store.dispatch("snackbar/displaySnackbar", {
          message: DEFAULT_MESSAGES.create_success,
        });
      } catch (error) {
        // todo handle error
      }
    };

    const handleRemoveCategory = async (id) => {
      try {
        await store.dispatch("category/removeCategory", id);
        store.dispatch("snackbar/displaySnackbar", {
          message: DEFAULT_MESSAGES.remove_success,
        });
      } catch (error) {
        // todo handle error
      }
    };

    const handleEditCategory = (currentCate) => {
      categoryEdit.value = {
        ...categoryEdit.value,
        name: currentCate.name,
      };
      currentIdCate.value = currentCate.id;
    };

    const handleCancelEditCategory = () => {
      categoryEdit.value.name = "";
      currentIdCate.value = null;
    };

    const handleUpdateCategory = async (id) => {
      try {
        await store.dispatch("category/updateCategory", {
          name: categoryEdit.value.name,
          id,
        });
        store.dispatch("snackbar/displaySnackbar", {
          message: DEFAULT_MESSAGES.update_success,
        });
        handleCancelEditCategory();
      } catch (error) {
        // todo handle error
      }
    };

    return {
      initCategory,
      handleSubmitForm,
      listCategories: computed(() => store.state.category.categories),
      handleRemoveCategory,
      handleEditCategory,
      currentIdCate,
      handleCancelEditCategory,
      handleUpdateCategory,
      categoryEdit,
    };
  },
};
</script>

<style lang="scss" scoped></style>
