<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click="$emit('close')"
  >
    <div
      class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
      @click.stop
    >
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Confirmar Exclusão</h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="mb-6">
          <div class="flex items-center mb-4">
            <div class="flex-shrink-0">
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-gray-900">
                Tem certeza que deseja excluir esta transação?
              </h3>
            </div>
          </div>

          <div v-if="transactionToDelete" class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  transactionToDelete.type === 'income'
                    ? 'bg-green-100'
                    : 'bg-red-100',
                ]"
              >
                <svg
                  :class="[
                    'w-4 h-4',
                    transactionToDelete.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600',
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    v-if="transactionToDelete.type === 'income'"
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
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">
                  {{ transactionToDelete.description }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ transactionToDelete.category }} •
                  {{ formatDate(transactionToDelete.date) }}
                </p>
              </div>
              <div class="ml-auto text-right">
                <p
                  :class="[
                    'text-sm font-medium',
                    transactionToDelete.type === 'income'
                      ? 'text-green-600'
                      : 'text-red-600',
                  ]"
                >
                  {{ transactionToDelete.type === "income" ? "+" : "-" }}R$
                  {{ formatCurrency(transactionToDelete.amount) }}
                </p>
              </div>
            </div>
          </div>

          <p class="text-sm text-gray-600 mt-4">
            Esta ação não pode ser desfeita. A transação será permanentemente
            removida.
          </p>
        </div>

        <!-- Botões -->
        <div class="flex space-x-3">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="$emit('confirm')"
            :disabled="deleting"
            class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="deleting">Excluindo...</span>
            <span v-else>Excluir Transação</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Transaction } from "@/types";

interface Props {
  show: boolean;
  transactionToDelete: Transaction | null;
  deleting: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "confirm"): void;
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
