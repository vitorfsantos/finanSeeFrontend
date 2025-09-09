import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import type { User } from "@/types";

// Rotas que não precisam de autenticação
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Rotas que precisam de permissão de administrador ou gerente
const adminRoutes = ["/users"];

// Verificar se o usuário está autenticado
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("auth_token");
  const userData = localStorage.getItem("user_data");
  return !!(token && userData);
};

// Obter dados do usuário atual
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem("user_data");
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch {
    return null;
  }
};

// Verificar se o usuário é administrador
export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  return user?.user_level_id === 1;
};

// Verificar se o usuário é administrador ou gerente (pode gerenciar usuários)
export const canManageUsers = (): boolean => {
  const user = getCurrentUser();
  return user?.user_level_id === 1 || user?.user_level_id === 2;
};

// Guarda de rota para autenticação
export const authGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  const requiresAuth = !publicRoutes.includes(to.path);
  const requiresAdmin = adminRoutes.includes(to.path);
  const authenticated = isAuthenticated();
  const isAdminUser = isAdmin();
  const canManageUsersAccess = canManageUsers();

  if (requiresAuth && !authenticated) {
    // Redirecionar para login se não estiver autenticado
    next("/login");
  } else if (to.path === "/login" && authenticated) {
    // Redirecionar para dashboard se já estiver autenticado
    next("/dashboard");
  } else if (requiresAdmin && !canManageUsersAccess) {
    // Redirecionar para dashboard se não tiver permissão para gerenciar usuários
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
