import { HttpClient } from "./httpClient";
import type {
  Transaction,
  TransactionFilters,
  PaginatedResponse,
} from "@/types";

export class TransactionService {
  /**
   * Busca todas as transações com filtros opcionais
   */
  static async getTransactions(
    filters?: TransactionFilters
  ): Promise<PaginatedResponse<Transaction>> {
    const queryParams = new URLSearchParams();

    if (filters) {
      if (filters.type) queryParams.append("type", filters.type);
      if (filters.category) queryParams.append("category", filters.category);
      if (filters.start_date)
        queryParams.append("start_date", filters.start_date);
      if (filters.end_date) queryParams.append("end_date", filters.end_date);
      if (filters.page) queryParams.append("page", filters.page.toString());
      if (filters.per_page)
        queryParams.append("per_page", filters.per_page.toString());
    }

    const endpoint = `/api/transactions${
      queryParams.toString() ? `?${queryParams.toString()}` : ""
    }`;

    return HttpClient.get<PaginatedResponse<Transaction>>(endpoint);
  }

  /**
   * Busca uma transação específica por ID
   */
  static async getTransactionById(id: string): Promise<Transaction> {
    const response = await HttpClient.get<{ data: Transaction }>(
      `/api/transactions/${id}`
    );
    return response.data!;
  }

  /**
   * Cria uma nova transação
   */
  static async createTransaction(
    transaction: Omit<Transaction, "id" | "created_at" | "updated_at">
  ): Promise<Transaction> {
    const response = await HttpClient.post<{ data: Transaction }>(
      "/api/transactions",
      transaction
    );
    return response.data!;
  }

  /**
   * Atualiza uma transação existente
   */
  static async updateTransaction(
    id: string,
    transaction: Partial<Transaction>
  ): Promise<Transaction> {
    const response = await HttpClient.put<{ data: Transaction }>(
      `/api/transactions/${id}`,
      transaction
    );
    return response.data!;
  }

  /**
   * Remove uma transação
   */
  static async deleteTransaction(id: string): Promise<void> {
    await HttpClient.delete(`/api/transactions/${id}`);
  }
}
