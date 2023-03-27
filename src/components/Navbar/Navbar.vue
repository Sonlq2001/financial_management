<template lang="">
  <div
    class="mt-3 bg-white dark:bg-dark2 dark:text-textDark py-4 px-5 rounded flex items-center justify-between"
  >
    <h2 class="text-xl font-semibold">Dashboard</h2>
    <div class="flex items-center">
      <span class="flex items-center text-lg mr-8">
        Admin
        <i class="ri-user-5-line ml-1 text-xl"></i>
      </span>
      <button class="text-sm" @click="handleLogout">Đăng xuất</button>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const handleLogout = async () => {
      await store.dispatch("auth/logout");
      window.location.reload();
    };
    return { handleLogout };
  },
};
</script>
<style lang=""></style>
