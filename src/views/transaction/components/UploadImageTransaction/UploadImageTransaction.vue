<template lang="">
  <label for="" class="block mb-2">
    Ảnh mô tả
    <span class="text-sm text-gray-400 mb-1 italic">
      ( Chọn ảnh hoặc gắn link )
    </span>
  </label>

  <!-- tab image -->
  <div class="flex items-center gap-4 mb-2">
    <button
      type="button"
      :class="[
        'py-1 px-2 rounded text-white text-sm ',
        isUploadImage ? 'bg-primary hover:bg-primaryHover' : 'bg-gray-400',
      ]"
      @click="() => handleToggleTabImage(0)"
      :disabled="isUploadImage"
    >
      Chọn ảnh
    </button>
    <button
      type="button"
      :class="[
        'py-1 px-2 rounded text-white text-sm ',
        !isUploadImage ? 'bg-primary hover:bg-primaryHover' : 'bg-gray-400',
      ]"
      @click="() => handleToggleTabImage(1)"
      :disabled="!isUploadImage"
    >
      Link ảnh
    </button>
  </div>

  <!-- label image -->
  <div class="relative">
    <label
      for="file"
      :class="[
        'border rounded p-4 flex flex-col items-center h-[146px] justify-center dark:bg-dark3',
        isShowErrorLinkImage && 'border-red-500',
      ]"
      @click="isUploadImage ? null : (openModalImage = true)"
    >
      <img
        :src="previewImage"
        alt=""
        v-if="previewImage"
        class="h-full object-contain"
      />
      <template v-else>
        <img
          :src="require('@/assets/images/add-image.png')"
          alt=""
          class="w-[50px]"
        />
        <p class="text-sm mt-3 text-gray-400" v-if="isUploadImage">
          Loại ảnh png,jpg,jpeg
        </p>
        <p class="text-sm mt-3 text-gray-400" v-else>Thêm đường dẫn ảnh</p>
      </template>
      <input
        type="file"
        id="file"
        hidden
        @change="handleImage"
        v-if="isUploadImage"
        accept="image/png, image/jpeg"
      />
    </label>
    <button
      class="absolute top-1 right-1 px-1 w-[29px] h-[29px] hover:bg-primary hover:text-white rounded"
      type="button"
      @click="handleRemovePreviewImage"
      v-if="previewImage"
    >
      <i class="ri-delete-bin-2-line text-lg" />
    </button>
  </div>

  <!-- Modal add link image -->
  <Modal
    title="Đường dẫn ảnh"
    :open="openModalImage"
    @onClose="openModalImage = false"
    alignBtn="end"
    border
    hideFooter
  >
    <Form
      @submit="handleSaveLinkImage"
      :initial-values="initLinkImage"
      :validation-schema="schemaLinkImage"
    >
      <text-field
        name="description_photo"
        placeholder="Đường dẫn ảnh"
        autocomplete="off"
        useDarkMode
      />
      <div
        class="flex items-center justify-end mt-4 space-x-2 rounded-b dark:border-gray-600 pt-6,"
      >
        <button
          data-modal-hide="staticModal"
          type="submit"
          class="text-white bg-primary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primaryHover"
        >
          Đồng ý
        </button>
        <button
          data-modal-hide="staticModal"
          type="button"
          class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          @click="openModalImage = false"
        >
          Huỷ
        </button>
      </div>
    </Form>
  </Modal>
</template>
<script>
import { ref, computed, onUnmounted } from "vue";
import { Form } from "vee-validate";

import Modal from "@/components/Modal/Modal.vue";
import TextField from "@/components/Form/TextField/TextField.vue";
import {
  initLinkImage,
  schemaLinkImage,
} from "../../helpers/transaction.helpers";

export default {
  components: {
    Modal,
    TextField,
    Form,
  },
  props: {
    values: Object,
    setFieldValue: Function,
    isShowErrorLinkImage: Boolean,
  },
  setup(props) {
    const previewImage = ref(null);
    const tabImage = ref(0);
    const openModalImage = ref(false);

    const handleToggleTabImage = (tab) => {
      tabImage.value = tab;
      saveDataImage("", true);
    };

    const handleImage = (e) => {
      try {
        if (e.target.files[0]) {
          saveDataImage(e.target.files[0]);
          previewImage.value = URL.createObjectURL(e.target.files[0]);
        }
      } catch (error) {
        previewImage.value = null;
      }
    };

    const removeCacheImage = () => {
      previewImage.value && URL.revokeObjectURL(previewImage.value);
    };

    const saveDataImage = (valueImage, savePreview = false) => {
      props.setFieldValue("description_photo", valueImage);
      if (savePreview) {
        previewImage.value = valueImage;
      }
    };

    // clean cache image
    onUnmounted(() => {
      removeCacheImage();
    });

    const handleSaveLinkImage = (values) => {
      saveDataImage(values.description_photo, true);
      openModalImage.value = false;
    };

    const handleRemovePreviewImage = () => {
      removeCacheImage();
      saveDataImage("", true);
    };

    return {
      previewImage,
      handleImage,
      tabImage,
      handleToggleTabImage,
      openModalImage,
      isUploadImage: computed(() => tabImage.value === 0),
      initLinkImage,
      schemaLinkImage,
      handleSaveLinkImage,
      handleRemovePreviewImage,
    };
  },
};
</script>
<style lang=""></style>
