// Tipos relacionados à autenticação

import type { User } from "./user";

// Estado de autenticação
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
