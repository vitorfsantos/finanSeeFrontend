// Tipos relacionados às transações

import type { User } from "./user";
import type { Company } from "./company";

// Transação
export interface Transaction {
  id: string;
  user_id: string;
  company_id: string | null;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: string; // API retorna como string
  date: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  user: User;
  company: Company | null;
}

// Filtros para transações
export interface TransactionFilters {
  type?: "income" | "expense";
  category?: string;
  start_date?: string;
  end_date?: string;
  page?: number;
  per_page?: number;
}

// Tipos para relatório mensal
export interface MonthlyReportPeriod {
  year: number;
  month: number;
  start_date: string;
  end_date: string;
  month_name: string;
}

export interface MonthlyReportSummary {
  total_income: number;
  total_expenses: number;
  balance: number;
  transaction_count: number;
}

export interface MonthlyReportTransaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: string;
  date: string;
  user: {
    id: string;
    name: string;
  };
  company: {
    id: string;
    name: string;
  } | null;
}

export interface MonthlyReportCompanyBreakdown {
  company: {
    id: string;
    name: string;
  } | null;
  total_income: number;
  total_expenses: number;
  balance: number;
  transaction_count: number;
}

export interface MonthlyReportData {
  period: MonthlyReportPeriod;
  summary: MonthlyReportSummary;
  latest_transactions: MonthlyReportTransaction[];
  company_breakdown: MonthlyReportCompanyBreakdown[];
}

export interface MonthlyReportResponse {
  success: boolean;
  data: MonthlyReportData;
}
