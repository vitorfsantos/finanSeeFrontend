<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label
          for="search"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Buscar
        </label>
        <input
          id="search"
          :value="filters.search"
          @input="updateSearch"
          type="text"
          placeholder="Nome ou email..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div>
        <label
          for="userLevel"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Nível de Usuário
        </label>
        <select
          id="userLevel"
          :value="filters.user_level_id"
          @change="updateUserLevel"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos os níveis</option>
          <option v-for="level in userLevels" :key="level.id" :value="level.id">
            {{ level.name }}
          </option>
        </select>
      </div>
      <div>
        <label
          for="company"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Empresa
        </label>
        <select
          id="company"
          :value="filters.company_id"
          @change="updateCompany"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas as empresas</option>
          <option
            v-for="company in companies"
            :key="company.id"
            :value="company.id"
          >
            {{ company.name }}
          </option>
        </select>
      </div>
      <div class="flex items-end">
        <button
          @click="$emit('clear-filters')"
          class="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { UserLevel } from "@/services/userService";
import type { Company } from "@/types";
import { CompanyService } from "@/services/companyService";

interface Props {
  filters: {
    search: string;
    user_level_id: string;
    company_id: string;
  };
  userLevels: UserLevel[];
}

interface Emits {
  "update:filters": [filters: Props["filters"]];
  "clear-filters": [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Estado para empresas
const companies = ref<Company[]>([]);

// Carregar empresas
onMounted(async () => {
  try {
    const response = await CompanyService.getCompanies();
    companies.value = response.data;
  } catch (error) {
    console.error("Erro ao carregar empresas:", error);
    companies.value = [];
  }
});

// Debounced search
let searchTimeout: number;

const updateSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newFilters = { ...props.filters, search: target.value };

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    emit("update:filters", newFilters);
  }, 500);
};

const updateUserLevel = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newFilters = { ...props.filters, user_level_id: target.value };
  emit("update:filters", newFilters);
};

const updateCompany = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const newFilters = { ...props.filters, company_id: target.value };
  emit("update:filters", newFilters);
};
</script>
