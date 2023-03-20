import { auth } from "@/configs/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

const authStore = {
  namespaced: true,
  state() {
    return {
      token: null,
    };
  },
  getters: {},
  mutations: {
    setAuthToken(state, payload) {
      state.token = payload;
    },
    resetAuthToken(state) {
      state.token = null;
    },
  },
  actions: {
    async login(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      context.commit("setAuthToken", res.user.accessToken);
    },
    async logout(context) {
      await signOut(auth);
      context.commit("resetAuthToken");
    },
  },
};

export default authStore;
