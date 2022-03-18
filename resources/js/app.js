import { createApp } from "vue";
import router from "@Scripts/routes";

import App from "./App.vue";
import "../sass/app.scss";

// prettier-ignore
createApp(App)
  .use(router)
  .mount("#app");
