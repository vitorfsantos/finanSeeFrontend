import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

// Rotas que não precisam de autenticação
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("auth_token");
  const userData = localStorage.getItem("user_data");
  return !!(token && userData);
};

// Guarda de rota para autenticação
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const requiresAuth = !publicRoutes.includes(to.path);
  const authenticated = isAuthenticated();

  if (requiresAuth && !authenticated) {
    // Redirecionar para login se não estiver autenticado
    next("/login");
  } else if (to.path === "/login" && authenticated) {
    // Redirecionar para dashboard se já estiver autenticado
    next("/dashboard");
  } else {
    // Continuar para a rota solicitada
    next();
  }
};

// Função para fazer logout e limpar dados
export const clearAuthData = (): void => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
};
