import { API_CONFIG } from "@/config/api";

// Tipos para o cliente HTTP
export interface RequestOptions extends RequestInit {
  skipAuth?: boolean; // Para rotas que não precisam de autenticação
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  success: boolean;
  errors?: Record<string, string[]>;
}

// Classe cliente HTTP centralizada
export class HttpClient {
  private static getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      // Se for erro 401, limpar dados de autenticação
      if (response.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user_data");
        window.location.href = "/login";
        throw new Error("Sessão expirada. Faça login novamente.");
      }

      // Tentar extrair mensagem de erro da resposta
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // Se não conseguir ler JSON, usar mensagem padrão
      }

      throw new Error(errorMessage);
    }

    // Se a resposta for vazia (como em DELETE), retornar void
    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return {} as T;
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error("Erro ao processar resposta da API");
    }
  }

  // Método GET
  static async get<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = options.skipAuth
      ? `${API_CONFIG.BASE_URL}${endpoint}`
      : `${API_CONFIG.BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Método POST
  static async post<T>(
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = options.skipAuth
      ? `${API_CONFIG.BASE_URL}${endpoint}`
      : `${API_CONFIG.BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Método PUT
  static async put<T>(
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = options.skipAuth
      ? `${API_CONFIG.BASE_URL}${endpoint}`
      : `${API_CONFIG.BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Método PATCH
  static async patch<T>(
    endpoint: string,
    data?: any,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = options.skipAuth
      ? `${API_CONFIG.BASE_URL}${endpoint}`
      : `${API_CONFIG.BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Método DELETE
  static async delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = options.skipAuth
      ? `${API_CONFIG.BASE_URL}${endpoint}`
      : `${API_CONFIG.BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(response);
  }

  // Método para requisições customizadas
  static async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const response = await fetch(url, {
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
      ...options,
    });

    return this.handleResponse<T>(response);
  }
}
