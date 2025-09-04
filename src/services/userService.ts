import { HttpClient } from "@/services/httpClient";
import type { User } from "@/types";

// Interface para atualização de usuário
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
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
}
