import { createRouter, createWebHistory } from "vue-router";

import Home from "@Pages/Home.vue";
import About from "@Pages/About.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About }
  ]
});
