import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../configs/firebase";

const categoryStore = {
  namespaced: true,
  state() {
    return {
      categories: null,
    };
  },
  mutations: {
    setCategories(state, payload) {
      state.categories = payload;
    },
  },
  actions: {
    async createCategory(context, data) {
      const res = await addDoc(collection(db, "categories"), data);
      console.log(res);
      context.commit("setCategory", []);
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
  },
};

export default categoryStore;
