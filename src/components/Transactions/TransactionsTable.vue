<template>
  <div class="bg-white rounded-lg shadow">
    <div
      class="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
    >
      <h3 class="text-lg font-medium text-gray-900">Transações</h3>
      <span v-if="transactions.length > 0" class="text-sm text-gray-500">
        {{ totalTransactions }} transação(ões) encontrada(s)
      </span>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="p-8 text-center">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="mt-4 text-gray-600">Carregando transações...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="transactions.length === 0" class="p-8 text-center">
      <svg
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        Nenhuma transação encontrada
      </h3>
      <p class="text-gray-600">
        Não há transações que correspondam aos filtros selecionados.
      </p>
    </div>

    <!-- Transactions List -->
    <div v-else class="divide-y divide-gray-200">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="px-6 py-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div class="flex items-center">
          <div
            :class="[
              'w-10 h-10 rounded-full flex items-center justify-center',
              transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100',
            ]"
          >
            <svg
              :class="[
                'w-5 h-5',
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600',
              ]"
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
                d="M20 12H4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-900">
              {{ transaction.description }}
            </p>
            <p class="text-sm text-gray-500">
              {{ transaction.category }} •
              {{ formatDate(transaction.date) }}
              <span v-if="transaction.user">
                • {{ transaction.user.name }}
              </span>
              <span v-if="transaction.company">
                • {{ transaction.company.name }}
              </span>
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <div class="text-right">
            <p
              :class="[
                'text-sm font-medium',
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600',
              ]"
            >
              {{ transaction.type === "income" ? "+" : "-" }}R$
              {{ formatCurrency(transaction.amount) }}
            </p>
          </div>
          <div class="flex space-x-1">
            <button
              @click="$emit('edit-transaction', transaction)"
              class="p-1 text-gray-400 hover:text-blue-600"
              title="Editar transação"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              @click="$emit('delete-transaction', transaction)"
              class="p-1 text-gray-400 hover:text-red-600"
              title="Excluir transação"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from "@/types";

interface Props {
  transactions: Transaction[];
  loading: boolean;
  totalTransactions?: number;
  currentUserId?: string;
}

interface Emits {
  (e: "edit-transaction", transaction: Transaction): void;
  (e: "delete-transaction", transaction: Transaction): void;
}

defineProps<Props>();
defineEmits<Emits>();

// Formatar moeda
const formatCurrency = (amount: string | number): string => {
  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

// Formatar data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};
</script>
