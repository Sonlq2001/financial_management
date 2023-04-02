<template lang="">
  <div
    :class="[
      'fixed z-10 left-1/2 -translate-x-1/2 rounded snackbar dark:bg-white',
      show && 'active',
      type,
    ]"
    v-if="show"
  >
    <div
      class="flex items-center text-white dark:text-gray-500 text-sm px-4 py-3"
      role="alert"
    >
      <p>{{ message }}</p>
    </div>
  </div>
</template>
<script>
import { computed, onUpdated } from "vue";
import { useStore } from "vuex";

import { STATUS } from "@/constants/app.constants";
const DEFAULT_DURATION = 1700; // milliseconds

export default {
  setup() {
    const store = useStore();

    const show = computed(() => store.state.snackbar.open);
    const duration = computed(() => store.state.snackbar.duration);
    const message = computed(() => store.state.snackbar.message);
    const type = computed(() => {
      return STATUS[store.state.snackbar.type];
    });

    onUpdated(() => {
      if (show.value) {
        setTimeout(() => {
          store.dispatch("snackbar/hiddenSnackbar");
        }, duration.value || DEFAULT_DURATION);
      }
    });

    return {
      show,
      message,
      type,
    };
  },
};
</script>
<style lang="css" scoped>
.snackbar {
  background: #323232;
  box-shadow: rgb(0 0 0 / 20%) 0px 3px 5px -1px,
    rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px;
  transform: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  min-width: 288px;
}

.active {
  animation: showSnackbar 0.3s ease-in-out,
    hiddenSnackbar 0.3s 1.3s ease-in-out forwards;
  bottom: 40px;
}

@keyframes showSnackbar {
  from {
    bottom: -30px;
    opacity: 0;
  }
  to {
    bottom: 40px;
    opacity: 1;
  }
}

@keyframes hiddenSnackbar {
  to {
    bottom: -30px;
    opacity: 0;
  }
}

.error {
  background-color: #d32f2f;
}
.info {
  background-color: #0288d1;
}
.warning {
  background-color: #ed6c02;
}
.success {
  background-color: #2e7d32;
}
</style>
