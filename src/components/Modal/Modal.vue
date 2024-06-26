<template>
  <transition name="modal">
    <div
      class="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full bg-overlay modal-wrap"
      v-if="open"
      @click="handleClose"
    >
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-md md:h-auto mx-auto"
        @click.stop
      >
        <div
          class="relative bg-white rounded-lg shadow dark:bg-gray-700 modal-container"
        >
          <!-- Modal header -->
          <div
            :class="[
              'flex items-center justify-between p-4 pb-0',
              border && 'border-b border-gray-200 dark:border-gray-600 pb-2',
            ]"
          >
            <h2 v-if="title" class="text-gray-400 text-lg">{{ title }}</h2>
            <button
              type="button"
              class="flex ml-auto text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 items-center dark:hover:bg-gray-800 dark:hover:text-white"
              @click="handleClose"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Modal content -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Modal footer -->
          <div
            :class="[
              `flex items-center justify-${alignBtn} p-6 pt-0 space-x-2`,
              border &&
                'border-t border-gray-200 rounded-b dark:border-gray-600 pt-6',
            ]"
            v-if="!hideFooter"
          >
            <button
              data-modal-hide="staticModal"
              type="button"
              :class="[
                'text-white bg-primary focus:ring-2 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center',
                error
                  ? 'bg-red-600 hover:bg-red-800 focus:ring-red-300 dark:focus:ring-red-800'
                  : 'hover:bg-primaryHover',
              ]"
              @click="handleSubmit"
            >
              Đồng ý
            </button>
            <button
              data-modal-hide="staticModal"
              type="button"
              class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              @click="handleClose"
            >
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    open: Boolean,
    title: String,
    border: Boolean,
    error: Boolean,
    alignBtn: String,
    hideFooter: Boolean,
  },
  setup(_, { emit }) {
    const handleClose = () => emit("onClose");

    const handleSubmit = () => emit("onSubmit");

    return {
      handleClose,
      handleSubmit,
    };
  },
};
</script>
<style lang="css" scoped>
.modal-wrap {
  transition: opacity 0.3s ease;
}
.modal-container {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
