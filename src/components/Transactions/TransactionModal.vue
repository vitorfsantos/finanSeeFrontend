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
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingTransaction ? "Editar Transação" : "Nova Transação" }}
          </h3>
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

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Erro geral -->
          <div
            v-if="validationErrors.general"
            class="bg-red-50 border border-red-200 rounded-lg p-3"
          >
            <p class="text-red-600 text-sm">{{ validationErrors.general }}</p>
          </div>

          <!-- Tipo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tipo <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.type"
              required
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': validationErrors.type }"
            >
              <option value="">Selecione o tipo</option>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
            <p v-if="validationErrors.type" class="text-red-500 text-xs mt-1">
              {{ validationErrors.type }}
            </p>
          </div>

          <!-- Categoria -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Categoria
            </label>
            <input
              v-model="form.category"
              type="text"
              maxlength="255"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': validationErrors.category }"
              placeholder="Ex: Alimentação, Transporte..."
            />
            <p
              v-if="validationErrors.category"
              class="text-red-500 text-xs mt-1"
            >
              {{ validationErrors.category }}
            </p>
          </div>

          <!-- Descrição -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              v-model="form.description"
              maxlength="1000"
              rows="3"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': validationErrors.description }"
              placeholder="Descrição da transação..."
            ></textarea>
            <p
              v-if="validationErrors.description"
              class="text-red-500 text-xs mt-1"
            >
              {{ validationErrors.description }}
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
                :class="{ 'border-red-500': validationErrors.amount }"
                placeholder="0,00"
              />
            </div>
            <p v-if="validationErrors.amount" class="text-red-500 text-xs mt-1">
              {{ validationErrors.amount }}
            </p>
          </div>

          <!-- Usuário (apenas para Admin Global e Admin de Empresa) -->
          <div v-if="canSelectUser">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Usuário
            </label>
            <select
              v-model="form.user_id"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': validationErrors.user_id }"
            >
              <option value="">Selecione um usuário</option>
              <option
                v-for="user in availableUsers"
                :key="user.id"
                :value="user.id"
              >
                {{ user.name }}
              </option>
            </select>
            <p
              v-if="validationErrors.user_id"
              class="text-red-500 text-xs mt-1"
            >
              {{ validationErrors.user_id }}
            </p>
          </div>

          <!-- Empresa (apenas para Admin Global, Admin de Empresa e Usuário de Empresa) -->
          <div v-if="canSelectCompany">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Empresa
            </label>
            <select
              v-model="form.company_id"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': validationErrors.company_id }"
            >
              <option value="">Selecione uma empresa</option>
              <option
                v-for="company in availableCompanies"
                :key="company.id"
                :value="company.id"
              >
                {{ company.name }}
              </option>
            </select>
            <p
              v-if="validationErrors.company_id"
              class="text-red-500 text-xs mt-1"
            >
              {{ validationErrors.company_id }}
            </p>
          </div>

          <!-- Data e Hora -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Data e Hora
            </label>
            <input
              v-model="form.date"
              type="datetime-local"
              class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :class="{ 'border-red-500': validationErrors.date }"
            />
            <p v-if="validationErrors.date" class="text-red-500 text-xs mt-1">
              {{ validationErrors.date }}
            </p>
          </div>

          <!-- Botões -->
          <div class="flex space-x-3 pt-4">
            <button
              type="button"
              @click="$emit('close')"
              class="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="saving">Salvando...</span>
              <span v-else
                >{{ editingTransaction ? "Salvar" : "Criar" }} Transação</span
              >
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed, onMounted } from "vue";
import type { Transaction, User, Company } from "@/types";
import { UserService } from "@/services/userService";
import { CompanyService } from "@/services/companyService";

interface Props {
  show: boolean;
  editingTransaction: Transaction | null;
  saving: boolean;
  validationErrors: Record<string, string>;
  currentUser: User | null;
}

interface Emits {
  (e: "close"): void;
  (e: "save", form: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Estados para usuários e empresas
const availableUsers = ref<User[]>([]);
const availableCompanies = ref<Company[]>([]);
const loadingUsers = ref(false);
const loadingCompanies = ref(false);

// Computed para verificar permissões
const canSelectUser = computed(() => {
  // Admin Global (1) e Admin de Empresa (2) podem selecionar usuário
  return (
    props.currentUser?.user_level_id === 1 ||
    props.currentUser?.user_level_id === 2
  );
});

const canSelectCompany = computed(() => {
  // Admin Global (1), Admin de Empresa (2) e Usuário de Empresa (3) podem selecionar empresa
  return (
    props.currentUser?.user_level_id === 1 ||
    props.currentUser?.user_level_id === 2 ||
    props.currentUser?.user_level_id === 3
  );
});

// Formulário
const form = reactive({
  type: "" as "income" | "expense" | "",
  category: "",
  description: "",
  amount: "",
  date: "",
  user_id: "",
  company_id: "",
});

// Formatação monetária
const formattedAmount = ref("");

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
  form.amount = parseCurrencyInput(formatted);
};

const formatAmount = () => {
  if (form.amount) {
    const amount = parseFloat(form.amount);
    if (!isNaN(amount)) {
      formattedAmount.value = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    }
  }
};

const handleSubmit = () => {
  emit("save", { ...form });
};

// Métodos para carregar dados
const loadUsers = async () => {
  if (!canSelectUser.value) return;

  loadingUsers.value = true;
  try {
    const response = await UserService.getUsers({ per_page: 100 });
    availableUsers.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
  } finally {
    loadingUsers.value = false;
  }
};

const loadCompanies = async () => {
  if (!canSelectCompany.value) return;

  loadingCompanies.value = true;
  try {
    const response = await CompanyService.getCompanies({ per_page: 100 });
    availableCompanies.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar empresas:", error);
  } finally {
    loadingCompanies.value = false;
  }
};

// Resetar formulário quando modal abrir/fechar
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      // Carregar dados necessários
      loadUsers();
      loadCompanies();

      if (props.editingTransaction) {
        // Preencher formulário com dados da transação
        form.type = props.editingTransaction.type;
        form.category = props.editingTransaction.category || "";
        form.description = props.editingTransaction.description || "";
        form.amount = props.editingTransaction.amount.toString();
        form.date = props.editingTransaction.date
          ? new Date(props.editingTransaction.date).toISOString().slice(0, 16)
          : "";
        form.user_id = props.editingTransaction.user_id || "";
        form.company_id = props.editingTransaction.company_id || "";

        // Formatar valor
        if (form.amount) {
          const amount = parseFloat(form.amount);
          if (!isNaN(amount)) {
            formattedAmount.value = new Intl.NumberFormat("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(amount);
          }
        }
      } else {
        // Resetar formulário para nova transação
        form.type = "";
        form.category = "";
        form.description = "";
        form.amount = "";
        form.date = "";
        form.user_id = "";
        form.company_id = "";
        formattedAmount.value = "";

        // Definir valores padrão baseado no usuário atual
        if (props.currentUser) {
          // Se não pode selecionar usuário, usar o usuário atual
          if (!canSelectUser.value) {
            form.user_id = props.currentUser.id;
          }

          // Se não pode selecionar empresa, usar a primeira empresa do usuário
          if (!canSelectCompany.value && props.currentUser.companies?.length) {
            form.company_id = props.currentUser.companies[0].id;
          }
        }
      }
    }
  }
);

// Carregar dados quando o componente for montado
onMounted(() => {
  if (props.show) {
    loadUsers();
    loadCompanies();
  }
});
</script>
