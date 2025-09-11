// Tipos relacionados ao usuário

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
  level?: {
    id: number;
    slug: string;
    name: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at: string | null;
  };
  companies?: Array<{
    id: string;
    name: string;
    cnpj: string;
    email: string | null;
    phone: string | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    pivot: {
      user_id: string;
      company_id: string;
      role: string;
      position: string | null;
      created_at: string;
      updated_at: string;
    };
  }>;
}
