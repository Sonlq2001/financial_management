<template lang="">
  <aside
    class="w-[270px] py-2 px-3 shadow-md dark:shadow-slate-600 h-screen fixed top-0 left-0 bottom-0 flex flex-col dark:bg-dark1"
  >
    <div class="mt-2 flex items-center">
      <img
        :src="require('../../assets/images/cash.png')"
        alt=""
        class="w-[50px] mr-4"
      />
      <h3 class="text-xl dark:text-white">Money</h3>
    </div>
    <div class="w-full h-[1px] bg-blue-100 dark:bg-gray-700 my-5"></div>
    <nav class="w-full h-full flex flex-col">
      <div class="flex-1">
        <router-link
          class="flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-dark2 rounded-lg text-primary"
          v-for="(menu, index) in MenuSidebar"
          :key="index"
          :to="{ name: menu.navigator }"
        >
          <i
            :class="[
              menu.icon,
              'text-2xl mr-4 bg-white dark:bg-dark2 shadow-xl  rounded w-[36px] h-[36px] text-center leading-9',
            ]"
          />
          <span class="text-lg text-gray-700 font-medium dark:text-textDark">
            {{ menu.title }}
          </span>
        </router-link>
      </div>
      <div class="w-full h-[1px] bg-blue-100 dark:bg-gray-700 my-5"></div>
      <div class="pb-3">
        <router-link
          :to="{ name: menu.navigator }"
          class="flex items-center w-full cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-dark2 text-primary rounded-lg"
          v-for="(menu, index) in MenuSidebarFooter"
          :key="index"
          @click="
            index === MenuSidebarFooter.length - 1 ? handleLogout($event) : null
          "
        >
          <i
            :class="[
              `${menu.icon}`,
              'text-2xl mr-4 bg-white dark:bg-dark2 shadow-xl rounded w-[36px] h-[36px] text-center leading-9',
            ]"
          />
          <span class="text-lg text-gray-700 font-medium dark:text-textDark">
            {{ menu.title }}
          </span>
        </router-link>
      </div>
    </nav>
  </aside>
</template>
<script>
import { useStore } from "vuex";

import { MenuSidebar, MenuSidebarFooter } from "@/constants/menu.constants";

export default {
  setup() {
    const store = useStore();

    const handleLogout = async (e) => {
      e.preventDefault();
      await store.dispatch("auth/logout");
      window.location.reload();
    };

    return { MenuSidebar, MenuSidebarFooter, handleLogout };
  },
};
</script>
<style lang=""></style>
