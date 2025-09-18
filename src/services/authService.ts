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

export interface GenerateFakeDataRequest {
  type: "user" | "companyAdmin";
}

export interface GenerateFakeDataResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    password: string;
    user_type: "user" | "companyAdmin";
    generated_data: {
      company_id: string;
      company_name: string;
      admin_user_id: string;
      company_users_count: number;
      transactions_count: number;
    };
  };
}

// Classe de serviço de autenticação
export class AuthService {
  // Método de login
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Para login, usar HttpClient com skipAuth para não adicionar token
    return HttpClient.post<LoginResponse>("/api/auth/login", credentials, {
      skipAuth: true,
    });
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

  // Método para gerar dados fake
  static async generateFakeData(
    request: GenerateFakeDataRequest
  ): Promise<GenerateFakeDataResponse> {
    return HttpClient.post<GenerateFakeDataResponse>(
      "/api/generate-fake-data",
      request,
      {
        skipAuth: true,
      }
    );
  }
}
