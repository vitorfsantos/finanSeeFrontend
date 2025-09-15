import { HttpClient } from "@/services/httpClient";
import type { PaginatedResponse } from "@/types";

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

// Interface para listagem de empresas
export interface GetCompaniesParams {
  page?: number;
  per_page?: number;
  search?: string;
}

// Serviço de empresa
export class CompanyService {
  // Listar empresas com paginação e filtros
  static async getCompanies(
    params: GetCompaniesParams = {}
  ): Promise<PaginatedResponse<Company>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.search) queryParams.append("search", params.search);

    const queryString = queryParams.toString();
    const url = queryString
      ? `/api/companies?${queryString}`
      : "/api/companies";

    return HttpClient.get<PaginatedResponse<Company>>(url);
  }

  // Listar todas as empresas (sem paginação - para selects)
  static async getAllCompanies(): Promise<Company[]> {
    try {
      const response = await HttpClient.get<{ data: Company[] }>(
        "/api/companies/all"
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar todas as empresas:", error);
      // Se o endpoint /all não existir, tentar o endpoint normal
      const response = await HttpClient.get<PaginatedResponse<Company>>(
        "/api/companies"
      );
      return response.data;
    }
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

  // Deletar empresa (soft delete)
  static async deleteCompany(companyId: string): Promise<void> {
    return HttpClient.delete<void>(`/api/companies/${companyId}`);
  }

  // Reativar empresa
  static async restoreCompany(companyId: string): Promise<Company> {
    return HttpClient.patch<Company>(`/api/companies/${companyId}/restore`);
  }
}
