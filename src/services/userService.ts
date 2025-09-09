import { HttpClient } from "@/services/httpClient";
import type { User, PaginatedResponse } from "@/types";

// Interface para níveis de usuário
export interface UserLevel {
  id: number;
  name: string;
  description?: string;
}

// Interface para atualização de usuário
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
}

// Interface para criação de usuário
export interface CreateUserRequest {
  name: string;
  email: string;
  phone?: string;
  password: string;
  user_level_id: number;
  company_id?: string;
}

// Interface para listagem de usuários
export interface GetUsersParams {
  page?: number;
  per_page?: number;
  search?: string;
  user_level_id?: string;
  company_id?: string;
}

// Serviço de usuário
export class UserService {
  // Obter perfil do usuário
  static async getProfile(): Promise<User> {
    return HttpClient.get<User>("/api/user/profile");
  }

  // Atualizar perfil do usuário
  static async updateProfile(data: UpdateUserRequest): Promise<User> {
    return HttpClient.put<User>("/api/user/profile", data);
  }

  // Alterar senha
  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    return HttpClient.post<void>("/api/user/change-password", {
      current_password: currentPassword,
      new_password: newPassword,
    });
  }

  // Upload de avatar
  static async uploadAvatar(file: File): Promise<{ avatar_url: string }> {
    const formData = new FormData();
    formData.append("avatar", file);

    return HttpClient.post<{ avatar_url: string }>(
      "/api/user/avatar",
      formData,
      {
        headers: {
          // Não definir Content-Type para FormData
        },
      }
    );
  }

  // Obter estatísticas do usuário
  static async getStats(): Promise<{
    total_transactions: number;
    total_balance: number;
    monthly_expenses: number;
    monthly_income: number;
  }> {
    return HttpClient.get("/api/user/stats");
  }

  // ===== MÉTODOS DE ADMINISTRAÇÃO DE USUÁRIOS =====

  // Listar usuários
  static async getUsers(
    params: GetUsersParams = {}
  ): Promise<PaginatedResponse<User>> {
    const queryParams = new URLSearchParams();

    if (params.page) queryParams.append("page", params.page.toString());
    if (params.per_page)
      queryParams.append("per_page", params.per_page.toString());
    if (params.search) queryParams.append("search", params.search);
    if (params.user_level_id)
      queryParams.append("user_level_id", params.user_level_id);
    if (params.company_id) queryParams.append("company_id", params.company_id);

    const queryString = queryParams.toString();
    const url = queryString ? `/api/users?${queryString}` : "/api/users";

    return HttpClient.get<PaginatedResponse<User>>(url);
  }

  // Criar novo usuário (apenas para administradores)
  static async createUser(data: CreateUserRequest): Promise<User> {
    return HttpClient.post<User>("/api/users", data);
  }

  // Atualizar usuário (apenas para administradores)
  static async updateUser(
    userId: string,
    data: Partial<CreateUserRequest>
  ): Promise<User> {
    return HttpClient.put<User>(`/api/users/${userId}`, data);
  }

  // Desativar usuário (soft delete - apenas para administradores)
  static async deleteUser(userId: string): Promise<void> {
    return HttpClient.delete<void>(`/api/users/${userId}`);
  }

  // Reativar usuário (apenas para administradores)
  static async restoreUser(userId: string): Promise<User> {
    return HttpClient.patch<User>(`/api/users/${userId}/restore`);
  }

  // Obter detalhes de um usuário específico (apenas para administradores)
  static async getUserById(userId: string): Promise<User> {
    return HttpClient.get<User>(`/api/admin/users/${userId}`);
  }

  // Obter níveis de usuário disponíveis
  static async getUserLevels(): Promise<UserLevel[]> {
    const response = await HttpClient.get<{ data: UserLevel[] }>(
      "/api/users/levels"
    );
    return response.data;
  }
}
