// Exemplos de uso do sistema de interceptors e cliente HTTP

import { HttpClient } from "@/services/httpClient";
import { UserService } from "@/services/userService";

// ============================================================================
// EXEMPLO 1: Usando HttpClient diretamente
// ============================================================================

// GET - O interceptor adiciona automaticamente o Bearer token
export const fetchUserData = async () => {
  try {
    // O token será adicionado automaticamente pelo interceptor
    const userData = await HttpClient.get("/api/user/profile");
    console.log("Dados do usuário:", userData);
    return userData;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

// POST - O interceptor adiciona automaticamente o Bearer token
export const createTransaction = async (transactionData: any) => {
  try {
    // O token será adicionado automaticamente pelo interceptor
    const result = await HttpClient.post("/api/transactions", transactionData);
    console.log("Transação criada:", result);
    return result;
  } catch (error) {
    console.error("Erro ao criar transação:", error);
    throw error;
  }
};

// PUT - O interceptor adiciona automaticamente o Bearer token
export const updateTransaction = async (id: string, transactionData: any) => {
  try {
    // O token será adicionado automaticamente pelo interceptor
    const result = await HttpClient.put(
      `/api/transactions/${id}`,
      transactionData
    );
    console.log("Transação atualizada:", result);
    return result;
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
    throw error;
  }
};

// DELETE - O interceptor adiciona automaticamente o Bearer token
export const deleteTransaction = async (id: string) => {
  try {
    // O token será adicionado automaticamente pelo interceptor
    await HttpClient.delete(`/api/transactions/${id}`);
    console.log("Transação deletada com sucesso");
  } catch (error) {
    console.error("Erro ao deletar transação:", error);
    throw error;
  }
};

// ============================================================================
// EXEMPLO 2: Usando serviços específicos
// ============================================================================

// Usando UserService (que internamente usa HttpClient)
export const updateUserProfile = async (userData: any) => {
  try {
    const updatedUser = await UserService.updateProfile(userData);
    console.log("Perfil atualizado:", updatedUser);
    return updatedUser;
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    throw error;
  }
};

// ============================================================================
// EXEMPLO 3: Requisições customizadas
// ============================================================================

// Requisição customizada com headers específicos
export const uploadFile = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // O interceptor adiciona o Bearer token, mas mantém os headers customizados
    const result = await HttpClient.post("/api/upload", formData, {
      headers: {
        // Não definir Content-Type para FormData
        "X-Custom-Header": "custom-value",
      },
    });

    console.log("Arquivo enviado:", result);
    return result;
  } catch (error) {
    console.error("Erro ao enviar arquivo:", error);
    throw error;
  }
};

// ============================================================================
// EXEMPLO 4: Tratamento de erros
// ============================================================================

// O interceptor trata automaticamente erros 401
export const fetchProtectedData = async () => {
  try {
    // Se o token expirar, o interceptor:
    // 1. Limpa os dados de autenticação
    // 2. Redireciona para /login
    const data = await HttpClient.get("/api/protected-endpoint");
    return data;
  } catch (error) {
    // Erros 401 são tratados automaticamente pelo interceptor
    // Outros erros podem ser tratados aqui
    if (error instanceof Error && !error.message.includes("Sessão expirada")) {
      console.error("Erro na requisição:", error);
    }
    throw error;
  }
};

// ============================================================================
// EXEMPLO 5: Requisições sem autenticação
// ============================================================================

// Para endpoints públicos, usar skipAuth: true
export const fetchPublicData = async () => {
  try {
    // Esta requisição NÃO terá o Bearer token
    const data = await HttpClient.get("/api/public-endpoint", {
      skipAuth: true,
    });
    return data;
  } catch (error) {
    console.error("Erro ao buscar dados públicos:", error);
    throw error;
  }
};

// ============================================================================
// BENEFÍCIOS DO SISTEMA
// ============================================================================

/*
✅ VANTAGENS:

1. **Automatização**: Não precisa adicionar manualmente o Bearer token
2. **Consistência**: Todas as requisições seguem o mesmo padrão
3. **Segurança**: Tratamento automático de tokens expirados
4. **Manutenibilidade**: Código mais limpo e organizado
5. **Reutilização**: Serviços podem ser facilmente compartilhados
6. **Tratamento de Erros**: Gerenciamento centralizado de erros HTTP

📝 COMO FUNCIONA:

1. O interceptor é inicializado em main.ts
2. Todas as requisições fetch são interceptadas
3. Se for para nossa API, adiciona automaticamente o Bearer token
4. Se receber erro 401, limpa dados e redireciona para login
5. O HttpClient usa o interceptor para requisições estruturadas

🚀 USO RECOMENDADO:

- Use HttpClient para requisições simples
- Use serviços específicos para lógica de negócio
- Use skipAuth: true para endpoints públicos
- Deixe o interceptor gerenciar tokens automaticamente
*/
