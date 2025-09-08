import { HttpClient } from "@/services/httpClient";

// Interface para endereço da empresa
export interface CompanyAddress {
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}

// Interface para empresa
export interface Company {
  id: string;
  name: string;
  cnpj: string;
  email?: string;
  phone?: string;
  address?: CompanyAddress;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Interface para criação de empresa
export interface CreateCompanyRequest {
  name: string;
  cnpj: string;
  email?: string;
  phone?: string;
  address?: CompanyAddress;
}

// Serviço de empresa
export class CompanyService {
  // Listar todas as empresas
  static async getCompanies(): Promise<Company[]> {
    const response = await HttpClient.get<{ data: Company[] }>(
      "/api/companies"
    );
    return response.data;
  }

  // Criar nova empresa
  static async createCompany(data: CreateCompanyRequest): Promise<Company> {
    return HttpClient.post<Company>("/api/companies", data);
  }

  // Obter empresa por ID
  static async getCompanyById(companyId: string): Promise<Company> {
    return HttpClient.get<Company>(`/api/companies/${companyId}`);
  }

  // Atualizar empresa
  static async updateCompany(
    companyId: string,
    data: Partial<CreateCompanyRequest>
  ): Promise<Company> {
    return HttpClient.put<Company>(`/api/companies/${companyId}`, data);
  }

  // Deletar empresa
  static async deleteCompany(companyId: string): Promise<void> {
    return HttpClient.delete<void>(`/api/companies/${companyId}`);
  }
}
