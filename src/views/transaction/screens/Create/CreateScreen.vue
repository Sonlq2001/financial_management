<template lang="">
  <div
    class="mt-5 bg-white rounded p-4 flex w-fit dark:bg-dark2 dark:text-textDark"
  >
    <img
      :src="require('../../../../assets/images/pig.png')"
      alt=""
      class="w-[50px] mr-4"
    />
    <div>
      <p class="text-sm">Quy định/tháng</p>
      <p class="text-lg font-semibold text-pink-400">
        {{ currency(totalMoneyLimit) }}
      </p>
    </div>
  </div>
  <div
    class="mt-10 max-w-3xl mx-auto bg-white rounded py-5 px-10 dark:bg-dark2 dark:text-textDark"
  >
    <h2 class="text-lg font-semibold">Tạo giao dịch</h2>
    <Form
      class="mt-4"
      @submit="handleSubmitForm"
      :initial-values="initValues"
      :validation-schema="schema"
      v-slot="{ values, setFieldValue, submitForm }"
    >
      <div class="mb-5">
        <text-field
          name="name"
          placeholder="Vd: Mua đồ ăn sáng"
          label="Tên giao dịch"
          useDarkMode
          autocomplete="off"
        />
      </div>

      <div class="mb-5">
        <radio-field
          label="Danh mục"
          :options="categories"
          name="category"
          row
        />
      </div>

      <div class="mb-5">
        <label for="" class="block mb-2">Thời gian</label>
        <div class="flex">
          <date-field name="date" class="mr-5" />
          <time-field name="time" />
        </div>
      </div>

      <div class="mb-5">
        <label for="" class="block mb-2 error">Tổng</label>
        <vue-number-format
          :options="{
            precision: '',
            prefix: '',
            suffix: ' đ',
            decimal: '',
            thousand: ',',
            acceptNegative: false,
            isInteger: false,
          }"
          :class="[
            'border px-4 py-3 rounded w-full dark:bg-dark3',
            isShowError && 'border border-red-500 focus:outline-none',
          ]"
          :value="values.total_bill"
          @blur="handleBlur($event)"
          @change="
            (e) => {
              const fixTotalBill = e.target.value
                .slice(0, e.target.value.length - 2)
                .trim()
                .replaceAll(',', '');
              if (fixTotalBill) {
                setFieldValue('total_bill', Number(fixTotalBill));
              }
            }
          "
        />
        <ErrorMessage
          name="total_bill"
          class="text-red-500 text-sm mt-1"
          as="div"
          v-if="isShowError"
        />
      </div>

      <div class="flex">
        <div class="w-1/2">
          <upload-image-transaction
            :values="values"
            :setFieldValue="setFieldValue"
            :isShowErrorLinkImage="isShowErrorLinkImage"
          />
          <ErrorMessage
            name="description_photo"
            as="p"
            class="text-red-500 text-sm mt-1"
            v-if="isShowErrorLinkImage"
          />
        </div>

        <div class="w-1/2 ml-5">
          <label for="" class="block mb-5">
            Ghi chú
            <span class="text-sm text-gray-400 mb-1 italic">
              ( Mô tả vắn tắt về giao dịch )
            </span>
          </label>
          <p class="text-sm text-gray-400 mb-1">{{ values.note.length }}/100</p>
          <textarea-field name="note" />
        </div>
      </div>

      <button
        :class="[
          'flex ml-auto rounded mt-5 px-4 py-2 bg-primary text-white items-center',
          loading ? 'bg-gray-400' : 'hover:bg-primaryHover',
        ]"
        type="submit"
        :disabled="loading"
        @click="handleClickSubmit(values, submitForm)"
      >
        Tạo
        <img
          :src="require('@/assets/images/deduction.png')"
          alt=""
          class="w-[30px] ml-2"
        />
      </button>
    </Form>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Form, ErrorMessage } from "vee-validate";

import { useStorage } from "@/hooks/useUploadFile";
import { currency } from "@/utils/convert";
import { DEFAULT_MESSAGES } from "@/constants/app.constants";
import { initValues, schema } from "../../helpers/transaction.helpers";
import TextField from "@/components/Form/TextField/TextField.vue";
import DateField from "@/components/Form/DateField/DateField.vue";
import TimeField from "@/components/Form/TimeField/TimeField.vue";
import TextareaField from "@/components/Form/TextareaField/TextareaField.vue";
import RadioField from "@/components/Form/RadioField/RadioField.vue";
import UploadImageTransaction from "../../components/UploadImageTransaction/UploadImageTransaction.vue";

export default {
  components: {
    Form,
    TextField,
    DateField,
    TimeField,
    TextareaField,
    RadioField,
    ErrorMessage,
    UploadImageTransaction,
  },
  setup() {
    const store = useStore();

    const previewImage = ref(null);
    const loading = ref(false);
    const isShowError = ref(false);
    const isShowErrorLinkImage = ref(false);
    const router = useRouter();
    const { uploadFile, url } = useStorage("transactions");

    onMounted(async () => {
      await store.dispatch("category/getCategories");
    });

    const handleBlur = (e) => {
      const fixTotalBill = e.target.value
        .slice(0, e.target.value.length - 2)
        .trim()
        .replaceAll(",", "");
      isShowError.value = Boolean(!Number(fixTotalBill));
    };

    const handleClickSubmit = (values, submitForm) => {
      isShowError.value = Boolean(!values.total_bill);
      isShowErrorLinkImage.value = Boolean(!values.description_photo);
      submitForm();
    };

    const handleSubmitForm = async (values) => {
      console.log(values);
      try {
        if (values.description_photo instanceof File) {
          await uploadFile(values.description_photo);
        }
        const data = {
          ...values,
          year: String(new Date(values.date).getFullYear()),
          month: String(new Date(values.date).getMonth() + 1),
          description_photo: url.value || values.description_photo,
        };
        await store.dispatch("transaction/createTransaction", data);
        loading.value = false;
        router.push({ name: "Dashboard" });
        store.dispatch("snackbar/displaySnackbar", {
          message: DEFAULT_MESSAGES.create_success,
        });
      } catch (error) {
        // toto handle error
      }
    };

    return {
      handleSubmitForm,
      previewImage,
      currency,
      categories: computed(() =>
        store.state.category?.categories?.map((item) => ({
          label: item.name,
          value: item.id,
        }))
      ),
      totalMoneyLimit: computed(
        () => store.state.settings.listSettings?.regulated_money
      ),
      loading,
      initValues,
      schema,
      isShowError,
      handleBlur,
      handleClickSubmit,
      isShowErrorLinkImage,
    };
  },
};
</script>
<style lang=""></style>
