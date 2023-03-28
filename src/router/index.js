import { createRouter, createWebHistory } from "vue-router";
import AboutView from "@/views/AboutView.vue";
import SearchView from "@/views/SearchView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "About us",
      component: AboutView,
    },
    {
      path: "/search",
      name: "Search News",
      component: SearchView,
    },
  ],
});

export default router;
