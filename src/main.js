import { createApp } from "vue";
import VueNumberFormat from "vue-number-format";

import App from "./App.vue";
import "./assets/styles/index.css";
import "./assets/styles/global.css";
import router from "./routes/app.routes";
import { registerGlobalComponents } from "./utils/registerLayout.js";
import store from "./store/appStore";

const app = createApp(App);

app.use(router);

app.use(VueNumberFormat, { prefix: "US$ ", decimal: ",", thousand: "." });

app.use(store);

app.mount("#app");

registerGlobalComponents(app);
