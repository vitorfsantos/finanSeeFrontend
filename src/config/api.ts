// Configuração da API
export const API_CONFIG = {
  // BASE_URL: "http://localhost:8000",
  BASE_URL: "https://finanseebackend-master-zeretp.laravel.cloud",
  ENDPOINTS: {
    AUTH: {
      BASE: "/api/auth",
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
      REFRESH: "/api/auth/refresh",
    },
    USER: {
      BASE: "/api/user",
      PROFILE: "/api/user/profile",
      UPDATE: "/api/user/update",
    },
    // Outros endpoints podem ser adicionados aqui
  },
} as const;

// Função helper para construir URLs completas
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Função helper para obter URL de endpoint específico
export const getApiUrl = (
  category: keyof typeof API_CONFIG.ENDPOINTS,
  action: string
): string => {
  const categoryEndpoints = API_CONFIG.ENDPOINTS[category];
  if (categoryEndpoints && action in categoryEndpoints) {
    return buildApiUrl(
      categoryEndpoints[action as keyof typeof categoryEndpoints]
    );
  }
  throw new Error(`Endpoint não encontrado: ${category}.${action}`);
};
