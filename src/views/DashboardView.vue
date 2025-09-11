<template>
  <MainLayout :user="user">
    <div class="space-y-6">
      <!-- Welcome Section -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          Bem-vindo, {{ user?.name }}!
        </h2>
        <p class="text-gray-600">
          Aqui está um resumo das suas finanças para
          <span v-if="monthlyReport"
            >{{ translateMonthName(monthlyReport.period.month_name) }} de
            {{ monthlyReport.period.year }}</span
          >
          <span v-else>este mês</span>.
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Saldo do Mês</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{
                  loading
                    ? "Carregando..."
                    : monthlyReport
                    ? formatCurrency(monthlyReport.summary.balance)
                    : "R$ 0,00"
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Receitas do Mês</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{
                  loading
                    ? "Carregando..."
                    : monthlyReport
                    ? formatCurrency(monthlyReport.summary.total_income)
                    : "R$ 0,00"
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Despesas do Mês</p>
              <p class="text-2xl font-semibold text-gray-900">
                {{
                  loading
                    ? "Carregando..."
                    : monthlyReport
                    ? formatCurrency(monthlyReport.summary.total_expenses)
                    : "R$ 0,00"
                }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div
                class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">
                Total de Transações
              </p>
              <p class="text-2xl font-semibold text-gray-900">
                {{
                  loading
                    ? "Carregando..."
                    : monthlyReport
                    ? monthlyReport.summary.transaction_count
                    : "0"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Transações Recentes</h3>
        </div>
        <div v-if="loading" class="px-6 py-8 text-center">
          <p class="text-gray-500">Carregando transações...</p>
        </div>
        <div v-else-if="error" class="px-6 py-8 text-center">
          <p class="text-red-500">{{ error }}</p>
        </div>
        <div
          v-else-if="
            monthlyReport && monthlyReport.latest_transactions.length === 0
          "
          class="px-6 py-8 text-center"
        >
          <p class="text-gray-500">
            Nenhuma transação encontrada para este mês.
          </p>
        </div>
        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="transaction in monthlyReport?.latest_transactions"
            :key="transaction.id"
            class="px-6 py-4 flex items-center justify-between"
          >
            <div class="flex items-center">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center"
                :class="
                  transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                "
              >
                <svg
                  class="w-5 h-5"
                  :class="
                    transaction.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600'
                  "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="transaction.type === 'income'"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                  <path
                    v-else
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-900">
                  {{ transaction.description }}
                </p>
                <p class="text-sm text-gray-500">{{ transaction.category }}</p>
                <p v-if="transaction.company" class="text-xs text-gray-400">
                  {{ transaction.company.name }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <p
                class="text-sm font-medium"
                :class="
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                "
              >
                {{ transaction.type === "income" ? "+" : "-"
                }}{{ formatCurrency(parseFloat(transaction.amount)) }}
              </p>
              <p class="text-sm text-gray-500">
                {{ formatDate(transaction.date) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { TransactionService } from "@/services/transactionService";
import type { User, MonthlyReportData } from "@/types";

const user = ref<User | null>(null);
const monthlyReport = ref<MonthlyReportData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

// Função para formatar valores monetários
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Função para traduzir nomes dos meses
const translateMonthName = (monthName: string): string => {
  const monthTranslations: { [key: string]: string } = {
    January: "Janeiro",
    February: "Fevereiro",
    March: "Março",
    April: "Abril",
    May: "Maio",
    June: "Junho",
    July: "Julho",
    August: "Agosto",
    September: "Setembro",
    October: "Outubro",
    November: "Novembro",
    December: "Dezembro",
  };

  return monthTranslations[monthName] || monthName;
};

// Função para formatar datas
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Hoje";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Ontem";
  } else {
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} dias atrás`;
  }
};

// Função para buscar dados do relatório mensal
const fetchMonthlyReport = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await TransactionService.getMonthlyReport();
    monthlyReport.value = response.data;
  } catch (err) {
    console.error("Erro ao buscar relatório mensal:", err);
    error.value = "Erro ao carregar dados do dashboard";
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  // Recuperar dados do usuário do localStorage
  const userData = localStorage.getItem("user_data");
  if (userData) {
    user.value = JSON.parse(userData);
  }

  // Buscar relatório mensal
  await fetchMonthlyReport();
});
</script>
