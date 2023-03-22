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
      syntheticTransactions: {
        totalYear: 0,
        list: null,
      },
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
    setSyntheticTransactions(state, payload) {
      state.syntheticTransactions = payload;
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
      await addDoc(collection(db, "transactions"), data);
    },

    async getSyntheticTransactions(context, year) {
      let listTransaction = [];
      const colRef = collection(db, "transactions");
      const q = query(colRef, where("year", "==", String(year)));

      const querySnapshot = await getDocs(q);

      let months = [];
      for (let i = 1; i <= 12; i++) {
        months.push(i);
      }

      querySnapshot.forEach((doc) => {
        listTransaction.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      const collapseData = listTransaction.map((item) => ({
        month: months[Number(item.month) - 1],
        total: Number(item.total_bill) || 0,
      }));

      const res = Array.from(
        collapseData.reduce(
          (m, { month, total }) => m.set(month, (m.get(month) || 0) + total),
          new Map()
        ),
        ([month, total]) => ({ month, total })
      );

      const totalYear = res.reduce(
        (totalCount, bill) => (totalCount += Number(bill.total)),
        0
      );

      context.commit("setSyntheticTransactions", { list: res, totalYear });
    },
  },
};

export default transactionStore;
