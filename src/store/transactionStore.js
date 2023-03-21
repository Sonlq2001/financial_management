import { collection, getDocs, where, query, addDoc } from "firebase/firestore";
import { db } from "../configs/firebase";

const transactionStore = {
  namespaced: true,
  state() {
    return {
      transactions: {
        list: null,
        totalMoney: 0,
      },
      categories: null,
    };
  },
  getters: {},
  mutations: {
    setTransactions(state, payload) {
      state.transactions.list = payload.listTransaction;
      state.transactions.totalMoney = payload.total;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    async getTransactions(context, month, year = new Date().getFullYear()) {
      let listTransaction = [];
      let total = 0;
      const colRef = collection(db, "transactions");
      const q = query(
        colRef,
        where("month", "==", String(month)),
        where("year", "==", String(year))
      );

      const querySnapshot = await getDocs(q);

      const categories = await context.dispatch("getCategories");
      querySnapshot.forEach((doc) => {
        total += Number(doc.data().total_bill);
        listTransaction.push({
          ...doc.data(),
          id: doc.id,
          category: categories.find((cate) => cate.id == doc.data().category)
            .name,
        });
      });
      console.log(total);
      context.commit("setTransactions", { listTransaction, total });
    },

    async getCategories(context) {
      let listCate = [];
      const res = await getDocs(collection(db, "categories"));
      res.forEach((doc) => {
        listCate.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      context.commit("setCategories", listCate);
      return listCate;
    },

    async createTransaction(_, data) {
      console.log(data);
      await addDoc(collection(db, "transactions"), data);
    },
  },
};

export default transactionStore;
