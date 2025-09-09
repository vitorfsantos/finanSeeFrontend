import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import { authGuard } from "./guards";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: DashboardView,
    },
    {
      path: "/transactions",
      name: "transactions",
      component: () => import("@/views/TransactionsView.vue"),
    },
    {
      path: "/users",
      name: "users",
      component: () => import("@/views/UsersView.vue"),
    },
    {
      path: "/companies",
      name: "companies",
      component: () => import("@/views/CompaniesView.vue"),
    },
    // Outras rotas serão adicionadas aqui
  ],
});

// Aplicar guarda de rota global
router.beforeEach(authGuard);

export default router;
