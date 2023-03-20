<template lang="">
  <aside
    class="w-[270px] py-2 px-3 shadow-md h-screen fixed top-0 left-0 bottom-0 flex flex-col"
  >
    <div class="mt-2 flex items-center">
      <img
        :src="require('../../assets/images/cash.png')"
        alt=""
        class="w-[50px] mr-4"
      />
      <h3 class="text-xl">Money</h3>
    </div>
    <div class="w-full h-[1px] bg-blue-100 my-5"></div>
    <nav class="w-full h-full flex flex-col">
      <div class="flex-1">
        <router-link
          class="flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 rounded-lg text-primary"
          v-for="(menu, index) in MenuSidebar"
          :key="index"
          :to="{ name: menu.navigator }"
        >
          <i
            :class="[
              menu.icon,
              'text-2xl mr-4 bg-white shadow-xl rounded w-[36px] h-[36px] text-center leading-9',
            ]"
          />
          <span class="text-lg text-gray-700 font-medium">
            {{ menu.title }}
          </span>
        </router-link>
      </div>
      <div class="w-full h-[1px] bg-blue-100 my-5"></div>
      <div class="pb-3">
        <router-link
          to=""
          class="flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 text-primary rounded-lg"
        >
          <i
            class="ri-settings-5-line text-2xl mr-4 bg-white shadow-xl rounded w-[36px] h-[36px] text-center leading-9"
          />
          <span class="text-lg text-gray-700 font-medium">Cài đặt</span>
        </router-link>
        <button
          type="button"
          class="flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 text-primary rounded-lg"
        >
          <i
            class="ri-logout-circle-r-line text-2xl mr-4 bg-white shadow-xl rounded w-[36px] h-[36px] text-center leading-9"
          />
          <span class="text-lg text-gray-700 font-medium">Cài đặt</span>
        </button>
      </div>
    </nav>
  </aside>
</template>
<script>
import { MenuSidebar } from "@/constants/menu.constants";
export default {
  setup() {
    return { MenuSidebar };
  },
};
</script>
<style lang=""></style>
