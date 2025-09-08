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
  from: number;
  to: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Transação
export interface Transaction {
  id: string;
  user_id: string;
  company_id: string | null;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: string; // API retorna como string
  date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
  company: any | null;
}

// Filtros para transações
export interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}

// Empresa
export interface Company {
  id: string;
  name: string;
  cnpj: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
  };
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}
