<template>
  <Snackbar />
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Snackbar from "@/components/Snackbar/Snackbar.vue";

export default {
  components: { Snackbar },
  setup() {
    const route = useRoute();

    return {
      layout: computed(() => (route.meta?.layout || "default") + "-layout"),
    };
  },
};
</script>
