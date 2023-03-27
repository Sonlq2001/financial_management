import { doc, updateDoc, collection, query, getDocs } from "firebase/firestore";

import { db } from "../configs/firebase";

const transactionStore = {
  namespaced: true,
  state() {
    return {
      listSettings: null,
    };
  },
  getters: {},
  mutations: {
    setSettings(state, payload) {
      state.listSettings = payload;
    },
  },
  actions: {
    async getSettings(context) {
      let listSettings = [];
      const colRef = collection(db, "settings");
      const q = query(colRef);
      const res = await getDocs(q);
      res.forEach((doc) => {
        listSettings.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      context.commit("setSettings", listSettings[0]);
    },

    async updateSettings(context, settings) {
      const colRef = doc(db, "settings", settings.id);
      await updateDoc(colRef, settings);

      context.commit("setSettings", settings);
    },
  },
};

export default transactionStore;
