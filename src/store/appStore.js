import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

import authStore from "./authStore";
import transactionStore from "./transactionStore";
import categoryStore from "./categoryStore";
import settingStore from "./settingStore";
import snackbarStore from "./snackbarStore";

const vuexLocalStorage = new VuexPersist({
  key: "auth",
  storage: window.localStorage,
  modules: ["auth"],
});

const vuexLocalStorageTheme = new VuexPersist({
  key: "theme",
  storage: window.localStorage,
  modules: ["settings"],
});

const storeAuth = createStore({
  modules: {
    auth: authStore,
    transaction: transactionStore,
    category: categoryStore,
    settings: settingStore,
    snackbar: snackbarStore,
  },
  plugins: [vuexLocalStorage.plugin, vuexLocalStorageTheme.plugin],
});

export default storeAuth;
