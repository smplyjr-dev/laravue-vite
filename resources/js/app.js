import { createApp } from "vue";
import App from "./App.vue";
import Portal from "vue3-portal";
import Router from "./router";
import "./plugins";
import "./../sass/app.scss";

// prettier-ignore
const app = createApp(App)
app.use(Portal);
app.use(Router);
// router.app = app;
app.mount("#app");
