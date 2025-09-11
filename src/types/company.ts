// Tipos relacionados à empresa

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
