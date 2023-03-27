import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

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
      const currentCate = [...context.state.categories];
      currentCate.unshift({ ...data, id: res.id });
      context.commit("setCategories", currentCate);
    },

    async getCategories(context) {
      let listCate = [];
      const colRef = collection(db, "categories");
      const q = query(colRef, orderBy("createdAt", "desc"));
      const res = await getDocs(q);
      res.forEach((doc) => {
        listCate.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      context.commit("setCategories", listCate);
    },

    async removeCategory(context, id) {
      await deleteDoc(doc(db, "categories", id));
      context.commit(
        "setCategories",
        context.state.categories.filter((cate) => cate.id !== id)
      );
    },

    async updateCategory(context, data) {
      const colRef = doc(db, "categories", data.id);
      await updateDoc(colRef, data);

      context.commit(
        "setCategories",
        [...context.state.categories].map((cate) =>
          cate.id === data.id ? { ...cate, ...data } : cate
        )
      );
    },
  },
};

export default categoryStore;
