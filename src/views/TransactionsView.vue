<template>
  <MainLayout :user="user">
    <div class="space-y-6">
      <!-- Header -->
      <TransactionsHeader @create-transaction="openCreateModal" />

      <!-- Filters -->
      <TransactionsFilters
        :filters="filters"
        @update:filters="updateFilters"
        @clear-filters="clearFilters"
      />

      <!-- Error State -->
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6">
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
          @click="() => loadTransactions()"
          class="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>

      <!-- Transactions Table -->
      <TransactionsTable
        :transactions="transactions"
        :loading="loading"
        :total-transactions="pagination?.total || 0"
        :current-user-id="user?.id"
        @edit-transaction="editTransaction"
        @delete-transaction="confirmDeleteTransaction"
      />

      <!-- Pagination -->
      <TransactionsPagination
        :pagination="pagination"
        @change-page="changePage"
      />

      <!-- Create/Edit Transaction Modal -->
      <TransactionModal
        :show="showModal"
        :editing-transaction="editingTransaction"
        :saving="saving"
        :validation-errors="validationErrors"
        :current-user="user"
        @close="closeModal"
        @save="saveTransaction"
      />

      <!-- Delete Confirmation Modal -->
      <TransactionDeleteModal
        :show="showDeleteModal"
        :transaction-to-delete="transactionToDelete"
        :deleting="deleting"
        @close="closeDeleteModal"
        @confirm="deleteTransaction"
      />
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
import TransactionsHeader from "@/components/Transactions/TransactionsHeader.vue";
import TransactionsFilters from "@/components/Transactions/TransactionsFilters.vue";
import TransactionsTable from "@/components/Transactions/TransactionsTable.vue";
import TransactionsPagination from "@/components/Transactions/TransactionsPagination.vue";
import TransactionModal from "@/components/Transactions/TransactionModal.vue";
import TransactionDeleteModal from "@/components/Transactions/TransactionDeleteModal.vue";

// Reactive state
const user = ref<User | null>(null);
const transactions = ref<Transaction[]>([]);
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);
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

// Modal states
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingTransaction = ref<Transaction | null>(null);
const transactionToDelete = ref<Transaction | null>(null);
const validationErrors = ref<Record<string, string>>({});

// Filters
const filters = reactive<TransactionFilters>({
  type: undefined,
  category: "",
  start_date: "",
  end_date: "",
  page: 1,
  per_page: 10,
});

// Methods
const loadTransactions = async (page = 1) => {
  loading.value = true;
  error.value = null;

  try {
    const params = {
      page,
      per_page: 10,
      ...(filters.type && { type: filters.type }),
      ...(filters.category && { category: filters.category }),
      ...(filters.start_date && { start_date: filters.start_date }),
      ...(filters.end_date && { end_date: filters.end_date }),
    };

    const response = await TransactionService.getTransactions(params);
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

const updateFilters = (newFilters: TransactionFilters) => {
  Object.assign(filters, newFilters);
  loadTransactions();
};

const clearFilters = () => {
  Object.assign(filters, {
    type: undefined,
    category: "",
    start_date: "",
    end_date: "",
    page: 1,
    per_page: 10,
  });
  loadTransactions();
};

const changePage = (page: number) => {
  loadTransactions(page);
};

// Modal methods
const openCreateModal = () => {
  editingTransaction.value = null;
  clearValidationErrors();
  showModal.value = true;
};

const editTransaction = (transaction: Transaction) => {
  editingTransaction.value = transaction;
  clearValidationErrors();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingTransaction.value = null;
  clearValidationErrors();
};

const saveTransaction = async (form: any) => {
  // Limpar erros de validação anteriores
  clearValidationErrors();

  // Validação dos campos obrigatórios
  if (!form.type?.trim()) {
    alert("Tipo é obrigatório");
    return;
  }

  if (!form.amount?.trim()) {
    alert("Valor é obrigatório");
    return;
  }

  saving.value = true;
  try {
    const transactionData = {
      type: form.type as "income" | "expense",
      category: form.category || "",
      description: form.description || "",
      amount: form.amount,
      date: form.date || new Date().toISOString().slice(0, 16),
      user_id: form.user_id || user.value?.id || "",
      company_id: form.company_id || null,
      deleted_at: null,
      user: user.value!,
      company: null,
    };

    if (editingTransaction.value) {
      await TransactionService.updateTransaction(
        editingTransaction.value.id,
        transactionData
      );
    } else {
      await TransactionService.createTransaction(transactionData);
    }

    await loadTransactions(pagination.value?.current_page || 1);
    closeModal();
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error: any) {
    // Verificar se é erro de validação (422)
    if (error.response?.status === 422 && error.response?.data?.errors) {
      const apiErrors = error.response.data.errors;
      Object.keys(apiErrors).forEach((key) => {
        validationErrors.value[key] = Array.isArray(apiErrors[key])
          ? apiErrors[key][0]
          : apiErrors[key];
      });
    } else {
      // Para outros erros, mostrar mensagem genérica
      alert(error.response?.data?.message || "Erro ao salvar transação");
    }
  } finally {
    saving.value = false;
  }
};

const confirmDeleteTransaction = (transaction: Transaction) => {
  transactionToDelete.value = transaction;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  transactionToDelete.value = null;
};

const deleteTransaction = async () => {
  if (!transactionToDelete.value) return;

  deleting.value = true;
  try {
    await TransactionService.deleteTransaction(transactionToDelete.value.id);
    await loadTransactions(pagination.value?.current_page || 1);
    closeDeleteModal();
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error) {
    console.error("Erro ao excluir transação:", error);
    // Aqui você pode adicionar uma notificação de erro
  } finally {
    deleting.value = false;
  }
};

const clearValidationErrors = () => {
  validationErrors.value = {};
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
