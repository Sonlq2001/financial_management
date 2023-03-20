import { createApp } from "vue";

import App from "./App.vue";
import "./assets/styles/index.css";
import router from "./routes/app.routes";
import { registerGlobalComponents } from "./utils/registerLayout.js";
import store from "./store/appStore";

const app = createApp(App);

app.use(router);

app.mount("#app");

registerGlobalComponents(app);

app.use(store);
