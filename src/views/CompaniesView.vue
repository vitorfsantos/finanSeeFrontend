<template>
  <MainLayout :user="user">
    <div class="space-y-6">
      <!-- Header -->
      <CompaniesHeader @create-company="openCreateModal" />

      <!-- Filters -->
      <CompaniesFilters
        :filters="filters"
        @update:filters="updateFilters"
        @clear-filters="clearFilters"
      />

      <!-- Companies Table -->
      <CompaniesTable
        :companies="companies"
        :loading="loading"
        @edit-company="editCompany"
        @delete-company="confirmDeleteCompany"
        @restore-company="restoreCompany"
      />

      <!-- Pagination -->
      <CompaniesPagination
        :pagination="pagination"
        @change-page="loadCompanies"
      />

      <!-- Create/Edit Company Modal -->
      <CompanyModal
        :show="showModal"
        :editing-company="editingCompany"
        :saving="saving"
        :validation-errors="validationErrors"
        @close="closeModal"
        @save="saveCompany"
      />

      <!-- Delete Confirmation Modal -->
      <CompanyDeleteModal
        :show="showDeleteModal"
        :company-to-delete="companyToDelete"
        :deleting="deleting"
        @close="closeDeleteModal"
        @confirm="deleteCompany"
      />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { User, Company } from "@/types";
import {
  CompanyService,
  type CreateCompanyRequest,
} from "@/services/companyService";
import MainLayout from "@/layouts/MainLayout.vue";
import CompaniesHeader from "@/components/Companies/CompaniesHeader.vue";
import CompaniesFilters from "@/components/Companies/CompaniesFilters.vue";
import CompaniesTable from "@/components/Companies/CompaniesTable.vue";
import CompaniesPagination from "@/components/Companies/CompaniesPagination.vue";
import CompanyModal from "@/components/Companies/CompanyModal.vue";
import CompanyDeleteModal from "@/components/Companies/CompanyDeleteModal.vue";

// Reactive state
const router = useRouter();
const user = ref<User | null>(null);
const companies = ref<Company[]>([]);
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);
const pagination = ref<any>(null);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingCompany = ref<Company | null>(null);
const companyToDelete = ref<Company | null>(null);
const validationErrors = ref<Record<string, string[]>>({});

// Filters
const filters = ref({
  search: "",
});

// Methods
const loadCompanies = async (page = 1) => {
  loading.value = true;
  try {
    const params = {
      page,
      per_page: 15,
      ...(filters.value.search && { search: filters.value.search }),
    };

    const response = await CompanyService.getCompanies(params);
    companies.value = response.data;
    pagination.value = {
      current_page: response.current_page,
      last_page: response.last_page,
      per_page: response.per_page,
      total: response.total,
      from: response.from,
      to: response.to,
    };
  } catch (error) {
    console.error("Erro ao carregar empresas:", error);
    // Aqui você pode adicionar uma notificação de erro
  } finally {
    loading.value = false;
  }
};

const updateFilters = (newFilters: typeof filters.value) => {
  filters.value = newFilters;
  loadCompanies();
};

const openCreateModal = () => {
  editingCompany.value = null;
  clearValidationErrors();
  showModal.value = true;
};

const editCompany = (company: Company) => {
  editingCompany.value = company;
  clearValidationErrors();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingCompany.value = null;
  clearValidationErrors();
};

const saveCompany = async (form: CreateCompanyRequest) => {
  // Limpar erros de validação anteriores
  clearValidationErrors();

  // Validação dos campos obrigatórios
  if (!form.name?.trim()) {
    alert("Nome da empresa é obrigatório");
    return;
  }

  if (!form.cnpj?.trim()) {
    alert("CNPJ é obrigatório");
    return;
  }

  // Validação básica de CNPJ (14 dígitos)
  const cnpjNumbers = form.cnpj.replace(/\D/g, "");

  saving.value = true;
  try {
    if (editingCompany.value) {
      await CompanyService.updateCompany(editingCompany.value.id, form);
    } else {
      await CompanyService.createCompany(form);
    }

    await loadCompanies(pagination.value?.current_page || 1);
    closeModal();
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error: any) {
    // Verificar se é erro de validação (422)
    if (error.response?.status === 422 && error.response?.data?.errors) {
      validationErrors.value = error.response.data.errors;
    } else {
      // Para outros erros, mostrar mensagem genérica
      alert(error.response?.data?.message || "Erro ao salvar empresa");
    }
  } finally {
    saving.value = false;
  }
};

const confirmDeleteCompany = (company: Company) => {
  companyToDelete.value = company;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  companyToDelete.value = null;
};

const deleteCompany = async () => {
  if (!companyToDelete.value) return;

  deleting.value = true;
  try {
    await CompanyService.deleteCompany(companyToDelete.value.id);
    await loadCompanies(pagination.value?.current_page || 1);
    closeDeleteModal();
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error) {
    console.error("Erro ao desativar empresa:", error);
    // Aqui você pode adicionar uma notificação de erro
  } finally {
    deleting.value = false;
  }
};

const restoreCompany = async (company: Company) => {
  try {
    await CompanyService.restoreCompany(company.id);
    await loadCompanies(pagination.value?.current_page || 1);
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error) {
    console.error("Erro ao reativar empresa:", error);
    // Aqui você pode adicionar uma notificação de erro
  }
};

const clearFilters = () => {
  filters.value = {
    search: "",
  };
  loadCompanies();
};

const clearValidationErrors = () => {
  validationErrors.value = {};
};

// Lifecycle
onMounted(() => {
  // Recuperar dados do usuário do localStorage
  const userData = localStorage.getItem("user_data");
  if (userData) {
    user.value = JSON.parse(userData);

    // Verificar se o usuário tem permissão para acessar esta página
    if (user.value.user_level_id > 2) {
      router.push("/dashboard");
      return;
    }
  }

  loadCompanies();
});

// Watch for filter changes
watch(
  () => filters.value.search,
  () => {
    loadCompanies();
  }
);
</script>
