<template lang="">
  <div class="mt-5">
    <div class="max-w-3xl mx-auto bg-white rounded">
      <div class="" v-for="(item, index) in year" :key="index">
        <div
          class="flex items-center p-3 justify-between cursor-pointer border-b"
          @click="toggleAccordion(item)"
        >
          <span>{{ item.year }}</span>
          <i class="ri-arrow-down-s-line text-xl"></i>
        </div>
        <div :class="['h-0 overflow-hidden', item.open && 'active']">
          <div class="px-5 py-4">
            <div class="flex items-center justify-between mb-4">
              <p>Tháng 1</p>
              <p>Tổng: 1.000.000 đ</p>
            </div>
            <div class="flex items-center justify-between">
              <p>Tháng 2</p>
              <p>Tổng: 1.200.000 đ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const year = ref([
      { year: 2023, open: false },
      { year: 2024, open: false },
    ]);
    const toggleAccordion = (item) => {
      if (!item.open) {
        year.value.forEach((i) => {
          i.open = false;
        });
      }
      item.open = !item.open;
    };
    return {
      toggleAccordion,
      year,
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
