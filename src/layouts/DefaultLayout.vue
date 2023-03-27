<template lang="">
  <div class="flex">
    <sidebar />
    <div class="ml-[270px] bg-gray-100 w-full min-h-screen dark:bg-dark1">
      <div class="mx-6 mb-5">
        <navbar />
        <slot />
      </div>
    </div>

    <router-link
      :to="{ name: 'Transaction create' }"
      class="fixed bottom-5 right-5 bg-white dark:bg-dark2 shadow-md w-[50px] h-[50px] flex justify-center items-center rounded-full"
    >
      <i class="ri-add-line text-3xl text-primary"></i>
    </router-link>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Navbar from "../components/Navbar/Navbar.vue";
export default {
  components: { Sidebar, Navbar },
};
</script>
