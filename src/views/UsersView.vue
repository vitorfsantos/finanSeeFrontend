<template>
  <MainLayout :user="user">
    <div class="space-y-6">
      <!-- Header -->
      <UsersHeader @create-user="openCreateModal" />

      <!-- Filters -->
      <UsersFilters
        :filters="filters"
        :user-levels="userLevels"
        @update:filters="updateFilters"
        @clear-filters="clearFilters"
      />

      <!-- Users Table -->
      <UsersTable
        :users="users"
        :user-levels="userLevels"
        :loading="loading"
        @edit-user="editUser"
        @delete-user="confirmDeleteUser"
        @restore-user="restoreUser"
      />

      <!-- Pagination -->
      <UsersPagination :pagination="pagination" @change-page="loadUsers" />

      <!-- Create/Edit User Modal -->
      <UserModal
        :show="showModal"
        :editing-user="editingUser"
        :user-levels="userLevels"
        :saving="saving"
        :validation-errors="validationErrors"
        @close="closeModal"
        @save="saveUser"
      />

      <!-- Delete Confirmation Modal -->
      <UserDeleteModal
        :show="showDeleteModal"
        :user-to-delete="userToDelete"
        :deleting="deleting"
        @close="closeDeleteModal"
        @confirm="deleteUser"
      />
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import type { User } from "@/types";
import { UserService, type UserLevel } from "@/services/userService";
import MainLayout from "@/layouts/MainLayout.vue";
import UsersHeader from "@/components/Users/UsersHeader.vue";
import UsersFilters from "@/components/Users/UsersFilters.vue";
import UsersTable from "@/components/Users/UsersTable.vue";
import UsersPagination from "@/components/Users/UsersPagination.vue";
import UserModal from "@/components/Users/UserModal.vue";
import UserDeleteModal from "@/components/Users/UserDeleteModal.vue";

// Reactive state
const router = useRouter();
const user = ref<User | null>(null);
const users = ref<User[]>([]);
const userLevels = ref<UserLevel[]>([]);
const loading = ref(false);
const saving = ref(false);
const deleting = ref(false);
const pagination = ref<any>(null);
const showModal = ref(false);
const showDeleteModal = ref(false);
const editingUser = ref<User | null>(null);
const userToDelete = ref<User | null>(null);
const validationErrors = ref<Record<string, string[]>>({});

// Filters
const filters = ref({
  search: "",
  user_level_id: "",
  company_id: "",
});

// Methods
const loadUserLevels = async () => {
  try {
    const levels = await UserService.getUserLevels();
    userLevels.value = levels;
  } catch (error) {
    console.error("Erro ao carregar níveis de usuário:", error);
    // Aqui você pode adicionar uma notificação de erro
  }
};

const loadUsers = async (page = 1) => {
  loading.value = true;
  try {
    const params = {
      page,
      per_page: 10,
      ...(filters.value.search && { search: filters.value.search }),
      ...(filters.value.user_level_id && {
        user_level_id: filters.value.user_level_id,
      }),
      ...(filters.value.company_id && {
        company_id: filters.value.company_id,
      }),
    };

    const response = await UserService.getUsers(params);
    users.value = response.data;

    // A API retorna os dados de paginação dentro de 'meta'
    const meta = (response as any).meta || response;
    pagination.value = {
      current_page: meta.current_page,
      last_page: meta.last_page,
      per_page: meta.per_page,
      total: meta.total,
      from: meta.from,
      to: meta.to,
    };
  } catch (error) {
    console.error("Erro ao carregar usuários:", error);
    // Aqui você pode adicionar uma notificação de erro
  } finally {
    loading.value = false;
  }
};

const updateFilters = (newFilters: typeof filters.value) => {
  filters.value = newFilters;
  loadUsers();
};

const openCreateModal = () => {
  editingUser.value = null;
  clearValidationErrors();
  showModal.value = true;
};

const editUser = (user: User) => {
  editingUser.value = user;
  clearValidationErrors();
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingUser.value = null;
  clearValidationErrors();
};

const saveUser = async (form: any) => {
  // Limpar erros de validação anteriores
  clearValidationErrors();

  // Validação dos campos obrigatórios
  if (!form.name?.trim()) {
    alert("Nome é obrigatório");
    return;
  }

  if (!form.email?.trim()) {
    alert("Email é obrigatório");
    return;
  }

  if (!editingUser.value && !form.password?.trim()) {
    alert("Senha é obrigatória");
    return;
  }

  if (!editingUser.value && form.password && form.password.length < 6) {
    alert("Senha deve ter pelo menos 6 caracteres");
    return;
  }

  if (!form.user_level_id) {
    alert("Nível de usuário é obrigatório");
    return;
  }

  saving.value = true;
  try {
    if (editingUser.value) {
      // Para edição, remover senha se não foi alterada
      const userData = { ...form };
      if (!userData.password) {
        const { password, ...userDataWithoutPassword } = userData;
        await UserService.updateUser(
          editingUser.value.id,
          userDataWithoutPassword
        );
      } else {
        await UserService.updateUser(editingUser.value.id, userData);
      }
    } else {
      // Para criação, senha é obrigatória
      await UserService.createUser(form);
    }

    await loadUsers(pagination.value?.current_page || 1);
    closeModal();
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error: any) {
    // Verificar se é erro de validação (422)
    if (error.response?.status === 422 && error.response?.data?.errors) {
      validationErrors.value = error.response.data.errors;
    } else {
      // Para outros erros, mostrar mensagem genérica
      alert(error.response?.data?.message || "Erro ao salvar usuário");
    }
  } finally {
    saving.value = false;
  }
};

const confirmDeleteUser = (user: User) => {
  userToDelete.value = user;
  showDeleteModal.value = true;
};

const closeDeleteModal = () => {
  showDeleteModal.value = false;
  userToDelete.value = null;
};

const deleteUser = async () => {
  if (!userToDelete.value) return;

  deleting.value = true;
  try {
    await UserService.deleteUser(userToDelete.value.id);
    await loadUsers(pagination.value?.current_page || 1);
    closeDeleteModal();
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error) {
    console.error("Erro ao desativar usuário:", error);
    // Aqui você pode adicionar uma notificação de erro
  } finally {
    deleting.value = false;
  }
};

const restoreUser = async (user: User) => {
  try {
    await UserService.restoreUser(user.id);
    await loadUsers(pagination.value?.current_page || 1);
    // Aqui você pode adicionar uma notificação de sucesso
  } catch (error) {
    console.error("Erro ao reativar usuário:", error);
    // Aqui você pode adicionar uma notificação de erro
  }
};

const clearFilters = () => {
  filters.value = {
    search: "",
    user_level_id: "",
    company_id: "",
  };
  loadUsers();
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
  }

  loadUserLevels();
  loadUsers();
});

// Watch for filter changes
watch(
  () => filters.value.user_level_id,
  () => {
    loadUsers();
  }
);

watch(
  () => filters.value.company_id,
  () => {
    loadUsers();
  }
);
</script>
