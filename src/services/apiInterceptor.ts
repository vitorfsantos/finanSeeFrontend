import { HttpClient } from "./httpClient";

// Interceptor global para adicionar Bearer token em todas as requisições
export class ApiInterceptor {
  // private static baseURL = "http://localhost:8000";
  private static baseURL =
    "https://finanseebackend-master-zeretp.laravel.cloud";

  // Interceptar todas as requisições fetch
  static interceptFetch(): void {
    const originalFetch = window.fetch;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      // Se for uma requisição para nossa API
      if (this.isApiRequest(input)) {
        const token = localStorage.getItem("auth_token");

        if (token) {
          // Adicionar Bearer token
          const headers = new Headers(init?.headers);
          headers.set("Authorization", `Bearer ${token}`);

          // Se não tiver Content-Type, adicionar JSON
          if (!headers.has("Content-Type") && init?.body) {
            headers.set("Content-Type", "application/json");
          }

          init = {
            ...init,
            headers,
          };
        }
      }

      return originalFetch(input, init);
    };
  }

  // Verificar se é uma requisição para nossa API
  private static isApiRequest(input: RequestInfo | URL): boolean {
    const url = typeof input === "string" ? input : input.toString();
    return url.startsWith(this.baseURL);
  }

  // Interceptar erros de resposta
  static interceptResponse(response: Response): Response {
    // Se for erro 401 (não autorizado), limpar dados de autenticação
    if (response.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");

      // Redirecionar para login se não estiver na página de login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return response;
  }

  // Verificar se o token está expirado
  static isTokenExpired(): boolean {
    const token = localStorage.getItem("auth_token");
    if (!token) return true;

    try {
      // Decodificar JWT token (parte payload)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);

      // Verificar se expirou (exp é timestamp em segundos)
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  // Renovar token automaticamente
  static async refreshTokenIfNeeded(): Promise<boolean> {
    if (this.isTokenExpired()) {
      try {
        const data = await HttpClient.post<{ token: string }>(
          "/api/auth/refresh"
        );
        localStorage.setItem("auth_token", data.token);
        return true;
      } catch (error) {
        console.error("Erro ao renovar token:", error);
      }

      // Se não conseguir renovar, limpar dados
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
      return false;
    }

    return true;
  }
}
