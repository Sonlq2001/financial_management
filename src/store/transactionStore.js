import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../configs/firebase";
import { limitForTheDay } from "@/utils/date";

const { start, end } = limitForTheDay();
const { start: startedYesterday, end: endYesterday } = limitForTheDay();

// get start and end of yesterday
startedYesterday.setDate(startedYesterday.getDate() - 1);
endYesterday.setDate(endYesterday.getDate() - 1);

// startDate and endDate taken from getTime() of new Date()
const getTotalMoneyDay = (data, startDate, endDate) => {
  const totalMoneyDay = data
    .filter((item) => {
      const dateTransaction = new Date(`${item.date} ${item.time}`).getTime();
      return dateTransaction >= startDate && dateTransaction <= endDate;
    })
    .reduce((total, bill) => (total += bill.total_bill), 0);
  return totalMoneyDay;
};

const transactionStore = {
  namespaced: true,
  state() {
    return {
      transactions: {
        list: null,
        totalMoney: 0,
      },
      syntheticTransactions: {
        totalYear: 0,
        list: null,
      },
      totalMoneyToday: 0,
      totalMoneyYesterday: 0,
    };
  },
  getters: {},
  mutations: {
    setTransactions(state, payload) {
      state.transactions.list = payload.listTransaction;
      state.transactions.totalMoney = payload.total;
    },
    setSyntheticTransactions(state, payload) {
      state.syntheticTransactions = payload;
    },
    setTotalMoneyToday(state, payload) {
      state.totalMoneyToday = payload;
    },
    setTotalMoneyYesterday(state, payload) {
      state.totalMoneyYesterday = payload;
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
        where("year", "==", String(year)),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);

      const categories = await context.dispatch("getCategories");
      querySnapshot.forEach((doc) => {
        total += Number(doc.data().total_bill);
        listTransaction.push({
          ...doc.data(),
          id: doc.id,
          category: categories.find((cate) => cate.id == doc.data().category)
            ?.name,
        });
      });

      const totalMoneyToday = getTotalMoneyDay(
        listTransaction,
        start.getTime(),
        end.getTime()
      );
      const totalMoneyYesterday = getTotalMoneyDay(
        listTransaction,
        startedYesterday.getTime(),
        endYesterday.getTime()
      );

      context.commit("setTransactions", { listTransaction, total });
      context.commit("setTotalMoneyToday", totalMoneyToday);
      context.commit("setTotalMoneyYesterday", totalMoneyYesterday);
    },

    async getCategories() {
      let listCate = [];
      const res = await getDocs(collection(db, "categories"));
      res.forEach((doc) => {
        listCate.push({
          ...doc.data(),
          id: doc.id,
        });
      });

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
