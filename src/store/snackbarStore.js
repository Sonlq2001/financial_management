import { STATUS, DEFAULT_MESSAGES } from "@/constants/app.constants";

const snackbarStore = {
  namespaced: true,
  state() {
    return {
      open: false,
      duration: 0,
      message: "",
      type: "",
    };
  },
  mutations: {
    setSnackbar(state, payload) {
      state.open = true;
      state.message = payload?.message || DEFAULT_MESSAGES.error_server;
      state.duration = payload?.duration;
      state.type = payload?.type || STATUS.default;
    },
    setHideSnackbar(state) {
      state.open = false;
    },
  },
  actions: {
    displaySnackbar(context, data) {
      context.commit("setSnackbar", data);
    },
    hiddenSnackbar(context) {
      context.commit("setHideSnackbar");
    },
  },
};

export default snackbarStore;
