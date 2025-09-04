// Mensagens da aplicação
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Login realizado com sucesso!",
  LOGIN_ERROR: "Erro ao fazer login. Verifique suas credenciais.",
  LOGOUT_SUCCESS: "Logout realizado com sucesso!",
  SESSION_EXPIRED: "Sua sessão expirou. Faça login novamente.",
  UNAUTHORIZED: "Você não tem permissão para acessar este recurso.",
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "Este campo é obrigatório.",
  INVALID_EMAIL: "Digite um email válido.",
  PASSWORD_MIN_LENGTH: "A senha deve ter pelo menos 6 caracteres.",
  PASSWORDS_DONT_MATCH: "As senhas não coincidem.",
} as const;

export const API_MESSAGES = {
  NETWORK_ERROR: "Erro de conexão. Verifique sua internet.",
  SERVER_ERROR: "Erro no servidor. Tente novamente mais tarde.",
  TIMEOUT_ERROR: "Tempo limite excedido. Tente novamente.",
  UNKNOWN_ERROR: "Erro desconhecido. Tente novamente.",
} as const;
