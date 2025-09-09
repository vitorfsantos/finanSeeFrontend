<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        @click="$emit('close')"
      ></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-title"
                >
                  {{ editingUser ? "Editar Usuário" : "Novo Usuário" }}
                </h3>

                <div class="space-y-4">
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome *
                    </label>
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      required
                      maxlength="255"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('name').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="Nome completo"
                    />
                    <p
                      v-if="getFieldErrors('name').length === 0"
                      class="mt-1 text-xs text-gray-500"
                    >
                      Máximo 255 caracteres
                    </p>
                    <div v-else class="mt-1">
                      <p
                        v-for="error in getFieldErrors('name')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      required
                      maxlength="255"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('email').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="email@exemplo.com"
                    />
                    <p
                      v-if="getFieldErrors('email').length === 0"
                      class="mt-1 text-xs text-gray-500"
                    >
                      Email único, máximo 255 caracteres
                    </p>
                    <div v-else class="mt-1">
                      <p
                        v-for="error in getFieldErrors('email')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      for="phone"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Telefone
                    </label>
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      @input="formatPhone"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('phone').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="(11) 99999-9999"
                    />
                    <p
                      v-if="getFieldErrors('phone').length === 0"
                      class="mt-1 text-xs text-gray-500"
                    >
                      Campo opcional
                    </p>
                    <div v-else class="mt-1">
                      <p
                        v-for="error in getFieldErrors('phone')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <div v-if="!editingUser">
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Senha *
                    </label>
                    <input
                      id="password"
                      v-model="form.password"
                      type="password"
                      :required="!editingUser"
                      minlength="6"
                      maxlength="255"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('password').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="Mínimo 6 caracteres"
                    />
                    <p
                      v-if="getFieldErrors('password').length === 0"
                      class="mt-1 text-xs text-gray-500"
                    >
                      Mínimo 6 caracteres, máximo 255 caracteres
                    </p>
                    <div v-else class="mt-1">
                      <p
                        v-for="error in getFieldErrors('password')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label
                      for="user_level_id"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nível de Usuário *
                    </label>
                    <select
                      id="user_level_id"
                      v-model="form.user_level_id"
                      required
                      @change="onUserLevelChange"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('user_level_id').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                    >
                      <option
                        v-for="level in userLevels"
                        :key="level.id"
                        :value="level.id"
                      >
                        {{ level.name }}
                      </option>
                    </select>
                    <div
                      v-if="getFieldErrors('user_level_id').length > 0"
                      class="mt-1"
                    >
                      <p
                        v-for="error in getFieldErrors('user_level_id')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <!-- Seção de Empresas - apenas para adm e user de empresa -->
                  <div v-if="showCompanySection">
                    <div class="border-t pt-4">
                      <h4 class="text-md font-medium text-gray-900 mb-3">
                        Empresas
                      </h4>
                      <p class="text-sm text-gray-600 mb-4">
                        Vincule o usuário a uma ou mais empresas
                      </p>

                      <!-- Lista de empresas vinculadas -->
                      <div class="space-y-3">
                        <div
                          v-for="(company, index) in form.companies"
                          :key="index"
                          class="border border-gray-200 rounded-lg p-4 bg-gray-50"
                        >
                          <div class="flex justify-between items-start mb-3">
                            <h5 class="text-sm font-medium text-gray-700">
                              Empresa {{ index + 1 }}
                            </h5>
                            <button
                              type="button"
                              @click="removeCompany(index)"
                              class="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remover
                            </button>
                          </div>

                          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <!-- Seleção da empresa -->
                            <div>
                              <label
                                :for="`company_id_${index}`"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Empresa *
                              </label>
                              <select
                                :id="`company_id_${index}`"
                                v-model="company.company_id"
                                required
                                :class="[
                                  'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                                  getFieldErrors(
                                    `companies.${index}.company_id`
                                  ).length > 0
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300',
                                ]"
                              >
                                <option value="">Selecione uma empresa</option>
                                <option
                                  v-for="comp in companies"
                                  :key="comp.id"
                                  :value="comp.id"
                                >
                                  {{ comp.name }}
                                </option>
                              </select>
                              <div
                                v-if="
                                  getFieldErrors(
                                    `companies.${index}.company_id`
                                  ).length > 0
                                "
                                class="mt-1"
                              >
                                <p
                                  v-for="error in getFieldErrors(
                                    `companies.${index}.company_id`
                                  )"
                                  :key="error"
                                  class="text-xs text-red-600"
                                >
                                  {{ error }}
                                </p>
                              </div>
                            </div>

                            <!-- Role -->
                            <div>
                              <label
                                :for="`role_${index}`"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Função *
                              </label>
                              <select
                                :id="`role_${index}`"
                                v-model="company.role"
                                required
                                :class="[
                                  'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                                  getFieldErrors(`companies.${index}.role`)
                                    .length > 0
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300',
                                ]"
                              >
                                <option value="">Selecione uma função</option>
                                <option value="owner">Proprietário</option>
                                <option value="manager">Gerente</option>
                                <option value="employee">Funcionário</option>
                              </select>
                              <div
                                v-if="
                                  getFieldErrors(`companies.${index}.role`)
                                    .length > 0
                                "
                                class="mt-1"
                              >
                                <p
                                  v-for="error in getFieldErrors(
                                    `companies.${index}.role`
                                  )"
                                  :key="error"
                                  class="text-xs text-red-600"
                                >
                                  {{ error }}
                                </p>
                              </div>
                            </div>

                            <!-- Position -->
                            <div>
                              <label
                                :for="`position_${index}`"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Cargo
                              </label>
                              <input
                                :id="`position_${index}`"
                                v-model="company.position"
                                type="text"
                                maxlength="255"
                                :class="[
                                  'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                                  getFieldErrors(`companies.${index}.position`)
                                    .length > 0
                                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    : 'border-gray-300',
                                ]"
                                placeholder="Ex: Desenvolvedor, Analista, etc."
                              />
                              <p class="mt-1 text-xs text-gray-500">
                                Campo opcional, máximo 255 caracteres
                              </p>
                              <div
                                v-if="
                                  getFieldErrors(`companies.${index}.position`)
                                    .length > 0
                                "
                                class="mt-1"
                              >
                                <p
                                  v-for="error in getFieldErrors(
                                    `companies.${index}.position`
                                  )"
                                  :key="error"
                                  class="text-xs text-red-600"
                                >
                                  {{ error }}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <!-- Botão para adicionar nova empresa -->
                      <button
                        type="button"
                        @click="addCompany"
                        class="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <svg
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                        Adicionar Empresa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              :disabled="saving"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{ saving ? "Salvando..." : editingUser ? "Atualizar" : "Criar" }}
            </button>
            <button
              type="button"
              @click="$emit('close')"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from "vue";
import type { User, Company } from "@/types";
import type { UserLevel } from "@/services/userService";
import { CompanyService } from "@/services/companyService";

interface Props {
  show: boolean;
  editingUser: User | null;
  userLevels: UserLevel[];
  saving: boolean;
  validationErrors: Record<string, string[]>;
}

interface Emits {
  close: [];
  save: [form: any];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  user_level_id: 1, // Adm master por padrão
  companies: [] as Array<{
    company_id: string;
    role: string;
    position: string;
  }>,
});

// Estados para empresa
const companies = ref<Company[]>([]);

// Computed para mostrar seção de empresa
const showCompanySection = computed(() => {
  // Mostrar campos de empresa para adm de empresa e user de empresa (não para adm master)
  // Assumindo que: adm master = 1, adm de empresa = 2, user de empresa = 3
  return form.value.user_level_id === 2 || form.value.user_level_id === 3;
});

// Watch para adicionar uma empresa automaticamente quando a seção for mostrada
watch(
  showCompanySection,
  (shouldShow) => {
    if (shouldShow && form.value.companies.length === 0) {
      addCompany();
    }
  },
  { immediate: true }
);

// Carregar empresas quando o modal abrir
onMounted(async () => {
  if (props.show) {
    await loadCompanies();
  }
});

// Função para carregar empresas
const loadCompanies = async () => {
  try {
    companies.value = await CompanyService.getCompanies();
  } catch (error) {
    console.error("Erro ao carregar empresas:", error);
    companies.value = [];
  }
};

// Função para adicionar uma nova empresa ao array
const addCompany = () => {
  form.value.companies.push({
    company_id: "",
    role: "",
    position: "",
  });
};

// Função para remover uma empresa do array
const removeCompany = (index: number) => {
  form.value.companies.splice(index, 1);
};

// Watch para carregar empresas quando modal abrir
watch(
  () => props.show,
  async (newShow) => {
    if (newShow) {
      await loadCompanies();
    }
  }
);

// Watch for editingUser changes to populate form
watch(
  () => props.editingUser,
  (newUser) => {
    if (newUser) {
      // Transformar companies do formato da API para o formato do formulário
      const companiesFormatted =
        (newUser as any).companies?.map((company: any) => ({
          company_id: company.id,
          role: company.pivot.role,
          position: company.pivot.position || "",
        })) || [];

      form.value = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || "",
        password: "",
        user_level_id: newUser.user_level_id,
        companies: companiesFormatted,
      };
    } else {
      form.value = {
        name: "",
        email: "",
        phone: "",
        password: "",
        user_level_id: props.userLevels.length > 0 ? props.userLevels[0].id : 1,
        companies: [],
      };
    }
  },
  { immediate: true }
);

// Função chamada quando o nível de usuário muda
const onUserLevelChange = () => {
  // Reset companies array when user level changes
  form.value.companies = [];
};

// Função para formatar telefone
const formatPhone = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos

  if (value.length <= 11) {
    if (value.length <= 2) {
      value = value;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length <= 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    }
  }

  form.value.phone = value;
};

const getFieldErrors = (fieldName: string) => {
  return props.validationErrors[fieldName] || [];
};

// Função para lidar com o submit do formulário
const handleSubmit = async () => {
  let submitData: any = { ...form.value };

  // Se não há seção de empresa ou não há empresas selecionadas, remover o array companies
  if (!showCompanySection.value || submitData.companies.length === 0) {
    const { companies, ...rest } = submitData;
    submitData = rest;
  }

  emit("save", submitData);
};
</script>
