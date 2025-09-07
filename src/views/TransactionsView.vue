<template>
  <MainLayout :user="user">
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Transações</h1>
          <p class="text-gray-600">Gerencie suas transações financeiras</p>
        </div>
        <button
          @click="openCreateModal"
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nova Transação
        </button>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tipo</label
            >
            <select
              v-model="filters.type"
              @change="loadTransactions"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todos</option>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Categoria</label
            >
            <select
              v-model="filters.category"
              @change="loadTransactions"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Todas</option>
              <option value="food">Alimentação</option>
              <option value="transport">Transporte</option>
              <option value="entertainment">Entretenimento</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Data Início</label
            >
            <input
              v-model="filters.start_date"
              @change="loadTransactions"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Data Fim</label
            >
            <input
              v-model="filters.end_date"
              @change="loadTransactions"
              type="date"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="bg-white rounded-lg shadow p-8 text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Carregando transações...</p>
      </div>

      <!-- Error State -->
      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6"
      >
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-red-400 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 class="text-sm font-medium text-red-800">
            Erro ao carregar transações
          </h3>
        </div>
        <p class="mt-2 text-sm text-red-700">{{ error }}</p>
        <button
          @click="loadTransactions"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>

      <!-- Transactions List -->
      <div v-else class="bg-white rounded-lg shadow">
        <div
          class="px-6 py-4 border-b border-gray-200 flex items-center justify-between"
        >
          <h3 class="text-lg font-medium text-gray-900">Transações</h3>
          <span v-if="transactions.length > 0" class="text-sm text-gray-500">
            {{ pagination?.total || 0 }} transação(ões) encontrada(s)
          </span>
        </div>

        <!-- Empty State -->
        <div v-if="transactions.length === 0" class="p-8 text-center">
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

        <!-- Transactions -->
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
                </p>
              </div>
            </div>
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
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination?.last_page > 1"
          class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
        >
          <div class="flex items-center">
            <span class="text-sm text-gray-700">
              Página {{ pagination?.current_page || 1 }} de
              {{ pagination?.last_page || 1 }}
            </span>
          </div>
          <div class="flex space-x-2">
            <button
              @click="changePage((pagination?.current_page || 1) - 1)"
              :disabled="(pagination?.current_page || 1) <= 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            <button
              @click="changePage((pagination?.current_page || 1) + 1)"
              :disabled="
                (pagination?.current_page || 1) >= (pagination?.last_page || 1)
              "
              class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Criação de Transação -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="closeCreateModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        @click.stop
      >
        <div class="mt-3">
          <!-- Header -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Nova Transação</h3>
            <button
              @click="closeCreateModal"
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

          <!-- Form -->
          <form @submit.prevent="createTransaction" class="space-y-4">
            <!-- Erro geral -->
            <div
              v-if="errors.general"
              class="bg-red-50 border border-red-200 rounded-lg p-3"
            >
              <p class="text-red-600 text-sm">{{ errors.general }}</p>
            </div>
            <!-- Tipo -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Tipo <span class="text-red-500">*</span>
              </label>
              <select
                v-model="newTransaction.type"
                required
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.type }"
              >
                <option value="">Selecione o tipo</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
              <p v-if="errors.type" class="text-red-500 text-xs mt-1">
                {{ errors.type }}
              </p>
            </div>

            <!-- Categoria -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Categoria
              </label>
              <input
                v-model="newTransaction.category"
                type="text"
                maxlength="255"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.category }"
                placeholder="Ex: Alimentação, Transporte..."
              />
              <p v-if="errors.category" class="text-red-500 text-xs mt-1">
                {{ errors.category }}
              </p>
            </div>

            <!-- Descrição -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                v-model="newTransaction.description"
                maxlength="1000"
                rows="3"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.description }"
                placeholder="Descrição da transação..."
              ></textarea>
              <p v-if="errors.description" class="text-red-500 text-xs mt-1">
                {{ errors.description }}
              </p>
            </div>

            <!-- Valor -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Valor <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3 top-2 text-gray-500">R$</span>
                <input
                  v-model="formattedAmount"
                  @input="handleAmountInput"
                  @blur="formatAmount"
                  type="text"
                  required
                  class="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  :class="{ 'border-red-500': errors.amount }"
                  placeholder="0,00"
                />
              </div>
              <p v-if="errors.amount" class="text-red-500 text-xs mt-1">
                {{ errors.amount }}
              </p>
            </div>

            <!-- Data e Hora -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Data e Hora
              </label>
              <input
                v-model="newTransaction.date"
                type="datetime-local"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                :class="{ 'border-red-500': errors.date }"
              />
              <p v-if="errors.date" class="text-red-500 text-xs mt-1">
                {{ errors.date }}
              </p>
            </div>

            <!-- Botões -->
            <div class="flex space-x-3 pt-4">
              <button
                type="button"
                @click="closeCreateModal"
                class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="creating"
                class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="creating">Criando...</span>
                <span v-else>Criar Transação</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";
import { TransactionService } from "@/services/transactionService";
import type {
  User,
  Transaction,
  TransactionFilters,
  PaginationMeta,
} from "@/types";

const user = ref<User | null>(null);
const transactions = ref<Transaction[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const pagination = ref<PaginationMeta>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  from: 0,
  to: 0,
  first_page_url: "",
  last_page_url: "",
  next_page_url: null,
  prev_page_url: null,
  path: "",
  links: [],
});

// Modal de criação
const showCreateModal = ref(false);
const creating = ref(false);
const errors = ref<Record<string, string>>({});

// Formulário de nova transação
const newTransaction = reactive({
  type: "" as "income" | "expense" | "",
  category: "",
  description: "",
  amount: "",
  date: "",
});

// Formatação monetária
const formattedAmount = ref("");

const filters = reactive<TransactionFilters>({
  type: undefined,
  category: "",
  start_date: "",
  end_date: "",
  page: 1,
  per_page: 10,
});

// Carregar transações da API
const loadTransactions = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await TransactionService.getTransactions(filters);
    transactions.value = response.data || [];
    // A API retorna os dados de paginação diretamente na raiz da resposta
    pagination.value = {
      current_page: response.current_page || 1,
      last_page: response.last_page || 1,
      per_page: response.per_page || 10,
      total: response.total || 0,
      from: response.from || 0,
      to: response.to || 0,
      first_page_url: response.first_page_url || "",
      last_page_url: response.last_page_url || "",
      next_page_url: response.next_page_url || null,
      prev_page_url: response.prev_page_url || null,
      path: response.path || "",
      links: response.links || [],
    };
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "Erro desconhecido ao carregar transações";
    transactions.value = [];
  } finally {
    loading.value = false;
  }
};

// Mudar página
const changePage = (page: number) => {
  if (page >= 1 && page <= (pagination.value?.last_page || 1)) {
    filters.page = page;
    loadTransactions();
  }
};

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

// Modal de criação
const openCreateModal = () => {
  showCreateModal.value = true;
  resetForm();
};

const closeCreateModal = () => {
  showCreateModal.value = false;
  resetForm();
};

const resetForm = () => {
  newTransaction.type = "";
  newTransaction.category = "";
  newTransaction.description = "";
  newTransaction.amount = "";
  newTransaction.date = "";
  formattedAmount.value = "";
  errors.value = {};
};

// Formatação monetária
const formatCurrencyInput = (value: string): string => {
  // Remove tudo que não é dígito
  const numbers = value.replace(/\D/g, "");

  if (!numbers) return "";

  // Converte para número e divide por 100 para ter centavos
  const amount = parseInt(numbers) / 100;

  // Formata como moeda brasileira
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const parseCurrencyInput = (formattedValue: string): string => {
  // Remove formatação e converte para formato numérico simples
  const numbers = formattedValue.replace(/\D/g, "");
  if (!numbers) return "";

  const amount = parseInt(numbers) / 100;
  return amount.toString();
};

const handleAmountInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const formatted = formatCurrencyInput(target.value);
  formattedAmount.value = formatted;
  newTransaction.amount = parseCurrencyInput(formatted);
};

const formatAmount = () => {
  if (newTransaction.amount) {
    const amount = parseFloat(newTransaction.amount);
    if (!isNaN(amount)) {
      formattedAmount.value = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
  }
};

// Validação do formulário
const validateForm = (): boolean => {
  errors.value = {};

  if (!newTransaction.type) {
    errors.value.type = "Tipo é obrigatório";
  } else if (!["income", "expense"].includes(newTransaction.type)) {
    errors.value.type = "Tipo deve ser 'income' ou 'expense'";
  }

  if (newTransaction.category && newTransaction.category.length > 255) {
    errors.value.category = "Categoria deve ter no máximo 255 caracteres";
  }

  if (newTransaction.description && newTransaction.description.length > 1000) {
    errors.value.description = "Descrição deve ter no máximo 1000 caracteres";
  }

  if (!newTransaction.amount) {
    errors.value.amount = "Valor é obrigatório";
  } else {
    const amount = parseFloat(newTransaction.amount);
    if (isNaN(amount) || amount < 0.01 || amount > 999999.99) {
      errors.value.amount = "Valor deve estar entre R$ 0,01 e R$ 999.999,99";
    }
  }

  if (newTransaction.date) {
    const date = new Date(newTransaction.date);
    if (isNaN(date.getTime())) {
      errors.value.date = "Data e hora inválidas";
    }
  }

  return Object.keys(errors.value).length === 0;
};

// Criar transação
const createTransaction = async () => {
  if (!validateForm()) {
    return;
  }

  creating.value = true;
  errors.value = {};

  try {
    const transactionData = {
      type: newTransaction.type as "income" | "expense",
      category: newTransaction.category || "",
      description: newTransaction.description || "",
      amount: newTransaction.amount,
      date: newTransaction.date || new Date().toISOString().slice(0, 16),
      user_id: user.value?.id || "",
      company_id: null,
      deleted_at: null,
      user: user.value!,
      company: null,
    };

    await TransactionService.createTransaction(transactionData);

    // Fechar modal e recarregar lista
    closeCreateModal();
    await loadTransactions();

    // Mostrar mensagem de sucesso (opcional)
    console.log("Transação criada com sucesso!");
  } catch (err: any) {
    console.error("Erro ao criar transação:", err);

    // Tratar erros de validação da API
    if (err.response?.data?.errors) {
      const apiErrors = err.response.data.errors;
      Object.keys(apiErrors).forEach((key) => {
        errors.value[key] = Array.isArray(apiErrors[key])
          ? apiErrors[key][0]
          : apiErrors[key];
      });
    } else {
      errors.value.general = err.message || "Erro ao criar transação";
    }
  } finally {
    creating.value = false;
  }
};

onMounted(() => {
  // Recuperar dados do usuário do localStorage
  const userData = localStorage.getItem("user_data");
  if (userData) {
    user.value = JSON.parse(userData);
  }

  // Carregar transações
  loadTransactions();
});
</script>
