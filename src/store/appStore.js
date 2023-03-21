import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

import authStore from "./authStore";
import transactionStore from "./transactionStore";

const vuexLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  modules: ["auth"],
});

const storeAuth = createStore({
  modules: {
    auth: authStore,
    transaction: transactionStore,
  },
  plugins: [vuexLocalStorage.plugin],
});

export default storeAuth;
