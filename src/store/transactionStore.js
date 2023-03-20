import { collection, getDocs } from "firebase/firestore";

import { db } from "../configs/firebase";

const transactionStore = {
  namespaced: true,
  state() {
    return {
      transactions: null,
    };
  },
  getters: {},
  mutations: {
    setTransactions(state, payload) {
      state.transactions = payload;
    },
  },
  actions: {
    async getTransactions(context) {
      const querySnapshot = await getDocs(collection(db, "transactions"));
      context.commit("setTransactions", querySnapshot);
    },
  },
};

export default transactionStore;
