// Tipos globais da aplicação
// Este arquivo serve como ponto central para exportar todos os tipos organizados

// Exportar tipos de autenticação
export type { AuthState } from "./auth";

// Exportar tipos de usuário
export type { User } from "./user";

// Exportar tipos de empresa
export type { Company } from "./company";

// Exportar tipos de transação
export type {
  Transaction,
  TransactionFilters,
  MonthlyReportData,
  MonthlyReportResponse,
  MonthlyReportPeriod,
  MonthlyReportSummary,
  MonthlyReportTransaction,
  MonthlyReportCompanyBreakdown,
} from "./transaction";

// Exportar tipos de API
export type { ApiResponse, PaginationMeta, PaginatedResponse } from "./api";
