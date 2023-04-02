import {
  collection,
  getDocs,
  where,
  query,
  addDoc,
  orderBy,
  getCountFromServer,
  limit,
  startAt,
} from "firebase/firestore";

import { db } from "../configs/firebase";
import { limitForTheDay } from "@/utils/date";
import { DEFAULT_PER_PAGE } from "@/constants/app.constants";

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
      listTransactions: {
        list: null,
        total: 0,
      },
      syntheticTransactions: {
        totalYear: 0,
        list: null,
      },
      syntheticTransactionsChart: null,
      totalBill: {
        totalMoneyOfMonth: 0,
        totalMoneyToday: 0,
        totalMoneyYesterday: 0,
      },
    };
  },
  getters: {},
  mutations: {
    setTransactions(state, payload) {
      state.listTransactions = payload;
    },
    setTotalBill(state, payload) {
      state.totalBill = payload;
    },
    setSyntheticTransactions(state, payload) {
      state.syntheticTransactions = payload;
    },
    setSyntheticTransactionsChart(state, payload) {
      state.syntheticTransactionsChart = payload;
    },
  },
  actions: {
    async getTotalBill(context, { month, year = new Date().getFullYear() }) {
      let listTransaction = [];
      let totalMoneyOfMonth = 0;
      const colRef = collection(db, "transactions");
      const q = query(
        colRef,
        where("month", "==", String(month)),
        where("year", "==", String(year))
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        totalMoneyOfMonth += Number(doc.data().total_bill);
        listTransaction.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      // total amount today
      const totalMoneyToday = getTotalMoneyDay(
        listTransaction,
        start.getTime(),
        end.getTime()
      );

      // total amount yesterday
      const totalMoneyYesterday = getTotalMoneyDay(
        listTransaction,
        startedYesterday.getTime(),
        endYesterday.getTime()
      );

      context.commit("setTotalBill", {
        totalMoneyOfMonth,
        totalMoneyToday,
        totalMoneyYesterday,
      });
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

      querySnapshot.forEach((doc) => {
        listTransaction.push({
          ...doc.data(),
          id: doc.id,
        });
      });

      const collapseData = listTransaction.map((item) => ({
        month: item.month,
        total: Number(item.total_bill) || 0,
      }));

      // sum of duplicate months
      const res = Array.from(
        collapseData.reduce(
          (m, { month, total }) => m.set(month, (m.get(month) || 0) + total),
          new Map()
        ),
        ([month, total]) => ({ month, total })
      ).sort((a, b) => a.month - b.month);

      // get months lack
      const numberNum = res.map((item) => Number(item.month));
      let monthsLack = [];
      for (let i = 1; i < Math.max(...numberNum); i++) {
        if (!numberNum.includes(i)) {
          monthsLack.push(i);
        }
      }

      // total amount by month (1 - 12 month)
      const dataChart = [
        ...res,
        ...monthsLack.map((item) => ({ month: item, total: 0 })),
      ]
        .sort((a, b) => a.month - b.month)
        .map((item) => item.total);

      // total amount full year
      const totalYear = res.reduce(
        (totalCount, bill) => (totalCount += Number(bill.total)),
        0
      );

      context.commit("setSyntheticTransactions", { list: res, totalYear });
      context.commit("setSyntheticTransactionsChart", dataChart);
    },

    async getTransactions(
      context,
      { month, year = new Date().getFullYear(), page = 1 }
    ) {
      let listTransactions = [];
      const colRef = collection(db, "transactions");
      const q = query(
        colRef,
        where("month", "==", String(month)),
        where("year", "==", String(year)),
        orderBy("createdAt", "desc")
      );
      const [querySnapshot, snapshot, categories] = await Promise.all([
        getDocs(q),
        getCountFromServer(q),
        context.dispatch("getCategories"),
      ]);

      const firstVisible =
        querySnapshot.docs[DEFAULT_PER_PAGE * (page - 1)] || null;

      const queryNextData = query(
        colRef,
        where("month", "==", String(month)),
        where("year", "==", String(year)),
        orderBy("createdAt", "desc"),
        limit(DEFAULT_PER_PAGE),
        startAt(firstVisible)
      );

      const dataPaginate = await getDocs(queryNextData);

      dataPaginate.forEach((doc) => {
        listTransactions.push({
          ...doc.data(),
          id: doc.id,
          category: categories.find((cate) => cate.id == doc.data().category)
            ?.name,
        });
      });

      context.commit("setTransactions", {
        list: listTransactions,
        total: snapshot.data().count,
      });
    },
  },
};

export default transactionStore;
