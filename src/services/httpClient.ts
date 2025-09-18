import { API_CONFIG } from "@/config/api";
import { globalLoading } from "@/composables/useLoading";

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
      return {
        "Content-Type": "application/json",
      };
    }

    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  private static getHeaders(skipAuth: boolean = false): HeadersInit {
    if (skipAuth) {
      return {
        "Content-Type": "application/json",
      };
    }
    return this.getAuthHeaders();
  }

  private static async makeRequestWithTimeout<T>(
    url: string,
    options: RequestInit,
    timeoutMs: number = 2000
  ): Promise<T> {
    // Incrementar contador de requisições ativas
    globalLoading.incrementActiveRequests();

    // Timeout para mostrar loading de hibernação (sem cancelar a requisição)
    const hibernationTimeoutId = setTimeout(() => {
      globalLoading.showBackendHibernating();
    }, timeoutMs);

    try {
      const response = await fetch(url, options);

      // Limpar timeout de hibernação
      clearTimeout(hibernationTimeoutId);

      return await this.handleResponse<T>(response);
    } catch (error) {
      // Limpar timeout de hibernação
      clearTimeout(hibernationTimeoutId);

      throw error;
    } finally {
      // Decrementar contador de requisições ativas
      globalLoading.decrementActiveRequests();
    }
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

      // Tentar extrair dados de erro da resposta
      let errorData: any = {
        message: `HTTP error! status: ${response.status}`,
      };

      try {
        errorData = await response.json();
      } catch {
        // Se não conseguir ler JSON, usar mensagem padrão
      }

      // Criar erro personalizado que preserva os dados da resposta
      const error = new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      ) as any;
      error.response = {
        status: response.status,
        data: errorData,
      };

      throw error;
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

    return this.makeRequestWithTimeout<T>(url, {
      method: "GET",
      headers: {
        ...this.getHeaders(options.skipAuth),
        ...options.headers,
      },
      ...options,
    });
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

    return this.makeRequestWithTimeout<T>(url, {
      method: "POST",
      headers: {
        ...this.getHeaders(options.skipAuth),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
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

    return this.makeRequestWithTimeout<T>(url, {
      method: "PUT",
      headers: {
        ...this.getHeaders(options.skipAuth),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
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

    return this.makeRequestWithTimeout<T>(url, {
      method: "PATCH",
      headers: {
        ...this.getHeaders(options.skipAuth),
        ...options.headers,
      },
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  }

  // Método DELETE
  static async delete<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const url = options.skipAuth
      ? `${API_CONFIG.BASE_URL}${endpoint}`
      : `${API_CONFIG.BASE_URL}${endpoint}`;

    return this.makeRequestWithTimeout<T>(url, {
      method: "DELETE",
      headers: {
        ...this.getHeaders(options.skipAuth),
        ...options.headers,
      },
      ...options,
    });
  }

  // Método para requisições customizadas
  static async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    return this.makeRequestWithTimeout<T>(url, {
      headers: {
        ...this.getHeaders(options.skipAuth),
        ...options.headers,
      },
      ...options,
    });
  }
}
