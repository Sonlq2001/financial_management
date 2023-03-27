import { createRouter, createWebHistory } from "vue-router";
import storeAuth from "@/store/appStore";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import("@/views/dashboard/screens/DashboardScreen.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/auth/screens/Login/LoginScreen.vue"),
    meta: {
      layout: "blank",
      isAuth: true,
    },
  },
  {
    path: "/transaction-create",
    name: "Transaction create",
    component: () =>
      import("@/views/transaction/screens/Create/CreateScreen.vue"),
  },
  {
    path: "/history",
    name: "Transaction history",
    component: () => import("@/views/history/screens/HistoryScreen.vue"),
  },
  {
    path: "/statistical",
    name: "Statistical",
    component: () =>
      import("@/views/statistical/screens/StatisticalScreen.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: {
      layout: "blank",
    },
    component: () => import("@/views/NotFound/NotFound"),
  },
  {
    path: "/category",
    name: "Category",
    component: () => import("@/views/category/screens/CategoryScreen.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("@/views/settings/screens/SettingScreen.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// primary router
router.beforeEach((to, from, next) => {
  const authToken = storeAuth.state.auth?.token;
  if (to.meta?.isAuth) {
    if (authToken && to.path === "/login") {
      return next("/");
    }
    return next();
  } else {
    if (authToken) {
      return next();
    }
    return next("/login");
  }
});

export default router;
