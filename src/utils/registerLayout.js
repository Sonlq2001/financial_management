import { defineAsyncComponent } from "vue";

export function registerGlobalComponents(app) {
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("@/layouts/DefaultLayout.vue"))
  );
  app.component(
    "blank-layout",
    defineAsyncComponent(() => import("@/layouts/BlankLayout.vue"))
  );
}
