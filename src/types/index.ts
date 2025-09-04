// Tipos globais da aplicação

// Usuário
export interface User {
  id: string;
  name: string;
  email: string;
  email_verified_at: string;
  phone: string | null;
  user_level_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// Autenticação
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Resposta padrão da API
export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

// Paginação
export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
