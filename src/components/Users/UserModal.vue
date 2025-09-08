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

                  <!-- Seção de Empresa - apenas para adm e user de empresa -->
                  <div v-if="showCompanySection">
                    <div class="border-t pt-4">
                      <h4 class="text-md font-medium text-gray-900 mb-3">
                        Empresa
                      </h4>

                      <!-- Opção: Selecionar empresa existente ou criar nova -->
                      <div class="mb-4">
                        <div class="flex space-x-4">
                          <label class="flex items-center">
                            <input
                              type="radio"
                              v-model="companyOption"
                              value="existing"
                              class="mr-2"
                            />
                            <span class="text-sm text-gray-700"
                              >Empresa existente</span
                            >
                          </label>
                          <label class="flex items-center">
                            <input
                              type="radio"
                              v-model="companyOption"
                              value="new"
                              class="mr-2"
                            />
                            <span class="text-sm text-gray-700"
                              >Nova empresa</span
                            >
                          </label>
                        </div>
                      </div>

                      <!-- Seleção de empresa existente -->
                      <div v-if="companyOption === 'existing'">
                        <label
                          for="company_id"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Empresa *
                        </label>
                        <select
                          id="company_id"
                          v-model="form.company_id"
                          required
                          :class="[
                            'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                            getFieldErrors('company_id').length > 0
                              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                              : 'border-gray-300',
                          ]"
                        >
                          <option value="">Selecione uma empresa</option>
                          <option
                            v-for="company in companies"
                            :key="company.id"
                            :value="company.id"
                          >
                            {{ company.name }}
                          </option>
                        </select>
                        <div
                          v-if="getFieldErrors('company_id').length > 0"
                          class="mt-1"
                        >
                          <p
                            v-for="error in getFieldErrors('company_id')"
                            :key="error"
                            class="text-xs text-red-600"
                          >
                            {{ error }}
                          </p>
                        </div>
                      </div>

                      <!-- Formulário para nova empresa -->
                      <div v-if="companyOption === 'new'" class="space-y-4">
                        <div>
                          <label
                            for="company_name"
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Nome da Empresa *
                          </label>
                          <input
                            id="company_name"
                            v-model="newCompany.name"
                            type="text"
                            required
                            maxlength="255"
                            :class="[
                              'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                              getFieldErrors('company_name').length > 0
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300',
                            ]"
                            placeholder="Nome da empresa"
                          />
                          <div
                            v-if="getFieldErrors('company_name').length > 0"
                            class="mt-1"
                          >
                            <p
                              v-for="error in getFieldErrors('company_name')"
                              :key="error"
                              class="text-xs text-red-600"
                            >
                              {{ error }}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label
                            for="company_cnpj"
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            CNPJ *
                          </label>
                          <input
                            id="company_cnpj"
                            v-model="newCompany.cnpj"
                            type="text"
                            required
                            @input="formatCNPJ"
                            :class="[
                              'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                              getFieldErrors('company_cnpj').length > 0
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300',
                            ]"
                            placeholder="00.000.000/0000-00"
                          />
                          <div
                            v-if="getFieldErrors('company_cnpj').length > 0"
                            class="mt-1"
                          >
                            <p
                              v-for="error in getFieldErrors('company_cnpj')"
                              :key="error"
                              class="text-xs text-red-600"
                            >
                              {{ error }}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label
                            for="company_email"
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email da Empresa
                          </label>
                          <input
                            id="company_email"
                            v-model="newCompany.email"
                            type="email"
                            maxlength="255"
                            :class="[
                              'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                              getFieldErrors('company_email').length > 0
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300',
                            ]"
                            placeholder="contato@empresa.com"
                          />
                          <p class="mt-1 text-xs text-gray-500">
                            Campo opcional
                          </p>
                        </div>

                        <div>
                          <label
                            for="company_phone"
                            class="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Telefone da Empresa
                          </label>
                          <input
                            id="company_phone"
                            v-model="newCompany.phone"
                            type="tel"
                            @input="formatCompanyPhone"
                            :class="[
                              'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                              getFieldErrors('company_phone').length > 0
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-300',
                            ]"
                            placeholder="(11) 3333-4444"
                          />
                          <p class="mt-1 text-xs text-gray-500">
                            Campo opcional
                          </p>
                        </div>

                        <!-- Endereço da empresa -->
                        <div class="border-t pt-4">
                          <h5 class="text-sm font-medium text-gray-700 mb-3">
                            Endereço (opcional)
                          </h5>
                          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="md:col-span-2">
                              <label
                                for="company_street"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Rua
                              </label>
                              <input
                                id="company_street"
                                v-model="newCompany.address.street"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Rua das Flores"
                              />
                            </div>
                            <div>
                              <label
                                for="company_number"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Número
                              </label>
                              <input
                                id="company_number"
                                v-model="newCompany.address.number"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="123"
                              />
                            </div>
                            <div>
                              <label
                                for="company_complement"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Complemento
                              </label>
                              <input
                                id="company_complement"
                                v-model="newCompany.address.complement"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Sala 45"
                              />
                            </div>
                            <div>
                              <label
                                for="company_neighborhood"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Bairro
                              </label>
                              <input
                                id="company_neighborhood"
                                v-model="newCompany.address.neighborhood"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Centro"
                              />
                            </div>
                            <div>
                              <label
                                for="company_city"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Cidade
                              </label>
                              <input
                                id="company_city"
                                v-model="newCompany.address.city"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="São Paulo"
                              />
                            </div>
                            <div>
                              <label
                                for="company_state"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Estado
                              </label>
                              <input
                                id="company_state"
                                v-model="newCompany.address.state"
                                type="text"
                                maxlength="2"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="SP"
                              />
                            </div>
                            <div>
                              <label
                                for="company_zipcode"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                CEP
                              </label>
                              <input
                                id="company_zipcode"
                                v-model="newCompany.address.zipcode"
                                type="text"
                                @input="formatZipcode"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="01234-567"
                              />
                            </div>
                            <div>
                              <label
                                for="company_country"
                                class="block text-sm font-medium text-gray-700 mb-1"
                              >
                                País
                              </label>
                              <input
                                id="company_country"
                                v-model="newCompany.address.country"
                                type="text"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Brasil"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
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
  company_id: "",
});

// Estados para empresa
const companies = ref<Company[]>([]);
const companyOption = ref<"existing" | "new">("existing");
const newCompany = ref({
  name: "",
  cnpj: "",
  email: "",
  phone: "",
  address: {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  },
});

// Computed para mostrar seção de empresa
const showCompanySection = computed(() => {
  // Mostrar campos de empresa apenas para user de empresa (não para adm master)
  // Assumindo que adm master = 1 e user de empresa = 2 (ajuste conforme necessário)
  return form.value.user_level_id === 2;
});

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

// Função para resetar formulário de nova empresa
const resetNewCompanyForm = () => {
  newCompany.value = {
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    address: {
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
  };
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
      form.value = {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone || "",
        password: "",
        user_level_id: newUser.user_level_id,
        company_id: "",
      };
    } else {
      form.value = {
        name: "",
        email: "",
        phone: "",
        password: "",
        user_level_id: props.userLevels.length > 0 ? props.userLevels[0].id : 1,
        company_id: "",
      };
    }

    // Reset company form
    companyOption.value = "existing";
    resetNewCompanyForm();
  },
  { immediate: true }
);

// Função chamada quando o nível de usuário muda
const onUserLevelChange = () => {
  // Reset company selection when user level changes
  form.value.company_id = "";
  companyOption.value = "existing";
  resetNewCompanyForm();
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

// Função para formatar telefone da empresa
const formatCompanyPhone = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, "");

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

  newCompany.value.phone = value;
};

// Função para formatar CNPJ
const formatCNPJ = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, "");

  if (value.length <= 14) {
    if (value.length <= 2) {
      value = value;
    } else if (value.length <= 5) {
      value = `${value.slice(0, 2)}.${value.slice(2)}`;
    } else if (value.length <= 8) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5)}`;
    } else if (value.length <= 12) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(
        5,
        8
      )}/${value.slice(8)}`;
    } else {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(
        5,
        8
      )}/${value.slice(8, 12)}-${value.slice(12)}`;
    }
  }

  newCompany.value.cnpj = value;
};

// Função para formatar CEP
const formatZipcode = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, "");

  if (value.length <= 8) {
    if (value.length <= 5) {
      value = value;
    } else {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
  }

  newCompany.value.address.zipcode = value;
};

const getFieldErrors = (fieldName: string) => {
  return props.validationErrors[fieldName] || [];
};

// Função para lidar com o submit do formulário
const handleSubmit = async () => {
  let submitData = { ...form.value };

  // Se for uma nova empresa, criar primeiro
  if (showCompanySection.value && companyOption.value === "new") {
    try {
      const createdCompany = await CompanyService.createCompany({
        name: newCompany.value.name,
        cnpj: newCompany.value.cnpj,
        email: newCompany.value.email || undefined,
        phone: newCompany.value.phone || undefined,
        address: Object.keys(newCompany.value.address).some(
          (key) =>
            newCompany.value.address[
              key as keyof typeof newCompany.value.address
            ]
        )
          ? newCompany.value.address
          : undefined,
      });

      submitData.company_id = createdCompany.id;
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
      // Aqui você pode adicionar tratamento de erro específico
      return;
    }
  }

  emit("save", submitData);
};
</script>
