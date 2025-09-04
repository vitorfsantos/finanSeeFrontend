import { HttpClient } from "@/services/httpClient";
import { ApiInterceptor } from "@/services/apiInterceptor";
import { API_CONFIG } from "@/config/api";
import type { User } from "@/types";

// Tipos para a API
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// Classe de serviço de autenticação
export class AuthService {
  // Método de login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Para login, não usar interceptor (não tem token ainda)
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP error! status: ${response.status}`,
      }));
      throw new Error(errorData.message);
    }

    return response.json();
  }

  // Método de logout
  static async logout(): Promise<void> {
    return HttpClient.post<void>("/api/auth/logout");
  }

  // Método para renovar token
  static async refreshToken(): Promise<LoginResponse> {
    return HttpClient.post<LoginResponse>("/api/auth/refresh");
  }

  // Método para obter perfil do usuário
  static async getUserProfile(): Promise<LoginResponse["user"]> {
    return HttpClient.get<LoginResponse["user"]>("/api/user/profile");
  }
}
