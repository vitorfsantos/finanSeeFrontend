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
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
      >
        <form @submit.prevent="handleSubmit">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3
                  class="text-lg leading-6 font-medium text-gray-900 mb-4"
                  id="modal-title"
                >
                  {{ editingCompany ? "Editar Empresa" : "Nova Empresa" }}
                </h3>

                <div class="space-y-4">
                  <!-- Nome da Empresa -->
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nome da Empresa *
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
                      placeholder="Nome da empresa"
                    />
                    <div v-if="getFieldErrors('name').length > 0" class="mt-1">
                      <p
                        v-for="error in getFieldErrors('name')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <!-- CNPJ -->
                  <div>
                    <label
                      for="cnpj"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CNPJ *
                    </label>
                    <input
                      id="cnpj"
                      v-model="form.cnpj"
                      type="text"
                      required
                      maxlength="18"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('cnpj').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="00.000.000/0000-00"
                      @input="formatCNPJInput"
                    />
                    <div v-if="getFieldErrors('cnpj').length > 0" class="mt-1">
                      <p
                        v-for="error in getFieldErrors('cnpj')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      maxlength="255"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('email').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="email@empresa.com"
                    />
                    <div v-if="getFieldErrors('email').length > 0" class="mt-1">
                      <p
                        v-for="error in getFieldErrors('email')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <!-- Telefone -->
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
                      maxlength="15"
                      :class="[
                        'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500',
                        getFieldErrors('phone').length > 0
                          ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                          : 'border-gray-300',
                      ]"
                      placeholder="(11) 99999-9999"
                      @input="formatPhoneInput"
                    />
                    <div v-if="getFieldErrors('phone').length > 0" class="mt-1">
                      <p
                        v-for="error in getFieldErrors('phone')"
                        :key="error"
                        class="text-xs text-red-600"
                      >
                        {{ error }}
                      </p>
                    </div>
                  </div>

                  <!-- Endereço -->
                  <div class="border-t pt-4">
                    <h4 class="text-md font-medium text-gray-900 mb-3">
                      Endereço
                    </h4>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <!-- CEP -->
                      <div>
                        <label
                          for="zipcode"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          CEP *
                        </label>
                        <div class="relative">
                          <input
                            id="zipcode"
                            v-model="form.address!.zipcode"
                            type="text"
                            maxlength="10"
                            class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="00000-000"
                            @input="formatZipcodeInput"
                          />
                          <div
                            class="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            <svg
                              v-if="searchingZipcode"
                              class="animate-spin h-4 w-4 text-blue-500"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                class="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                stroke-width="4"
                              ></circle>
                              <path
                                class="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <svg
                              v-else
                              class="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                              />
                            </svg>
                          </div>
                        </div>
                        <p class="mt-1 text-xs text-gray-500">
                          Digite o CEP para preenchimento automático
                        </p>
                      </div>

                      <!-- País -->
                      <div>
                        <label
                          for="country"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          País
                        </label>
                        <input
                          id="country"
                          v-model="form.address!.country"
                          type="text"
                          maxlength="100"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Brasil"
                        />
                      </div>

                      <!-- Rua -->
                      <div class="md:col-span-2">
                        <label
                          for="street"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Rua
                        </label>
                        <input
                          id="street"
                          v-model="form.address!.street"
                          type="text"
                          maxlength="255"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Nome da rua"
                        />
                      </div>

                      <!-- Número e Complemento -->
                      <div>
                        <label
                          for="number"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Número
                        </label>
                        <input
                          id="number"
                          v-model="form.address!.number"
                          type="text"
                          maxlength="20"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="123"
                        />
                      </div>

                      <div>
                        <label
                          for="complement"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Complemento
                        </label>
                        <input
                          id="complement"
                          v-model="form.address!.complement"
                          type="text"
                          maxlength="100"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Apto 45"
                        />
                      </div>

                      <!-- Bairro -->
                      <div>
                        <label
                          for="neighborhood"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Bairro
                        </label>
                        <input
                          id="neighborhood"
                          v-model="form.address!.neighborhood"
                          type="text"
                          maxlength="100"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Centro"
                        />
                      </div>

                      <!-- Cidade -->
                      <div>
                        <label
                          for="city"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Cidade
                        </label>
                        <input
                          id="city"
                          v-model="form.address!.city"
                          type="text"
                          maxlength="100"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="São Paulo"
                        />
                      </div>

                      <!-- Estado -->
                      <div>
                        <label
                          for="state"
                          class="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Estado
                        </label>
                        <input
                          id="state"
                          v-model="form.address!.state"
                          type="text"
                          maxlength="2"
                          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="SP"
                        />
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
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                v-if="saving"
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{
                saving ? "Salvando..." : editingCompany ? "Atualizar" : "Criar"
              }}
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
import { ref, watch, reactive } from "vue";
import type { Company } from "@/types";
import type { CreateCompanyRequest } from "@/services/companyService";

interface Props {
  show: boolean;
  editingCompany: Company | null;
  saving: boolean;
  validationErrors: Record<string, string[]>;
}

interface Emits {
  close: [];
  save: [form: CreateCompanyRequest];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Loading state for CEP search
const searchingZipcode = ref(false);

// Form data
const form = reactive<CreateCompanyRequest>({
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

const resetForm = () => {
  form.name = "";
  form.cnpj = "";
  form.email = "";
  form.phone = "";
  form.address = {
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
  };
};

// Watch for editing company changes
watch(
  () => props.editingCompany,
  (company) => {
    if (company) {
      form.name = company.name;
      form.cnpj = company.cnpj;
      form.email = company.email || "";
      form.phone = company.phone || "";
      form.address = {
        street: company.address?.street || "",
        number: company.address?.number || "",
        complement: company.address?.complement || "",
        neighborhood: company.address?.neighborhood || "",
        city: company.address?.city || "",
        state: company.address?.state || "",
        zipcode: company.address?.zipcode || "",
        country: company.address?.country || "",
      };
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Watch for modal close
watch(
  () => props.show,
  (show) => {
    if (!show) {
      resetForm();
    }
  }
);

const getFieldErrors = (field: string): string[] => {
  return props.validationErrors[field] || [];
};

const formatCNPJInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, "");

  if (value.length <= 14) {
    value = value.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
    form.cnpj = value;
  }
};

const formatPhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, "");

  if (value.length <= 11) {
    if (value.length <= 10) {
      value = value.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    } else {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    form.phone = value;
  }
};

const formatZipcodeInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  let value = target.value.replace(/\D/g, "");

  if (value.length <= 8) {
    value = value.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    form.address!.zipcode = value;

    // Buscar CEP quando tiver 8 dígitos
    if (value.replace(/\D/g, "").length === 8) {
      searchZipcode(value.replace(/\D/g, ""));
    }
  }
};

const searchZipcode = async (zipcode: string) => {
  if (zipcode.length !== 8) return;

  searchingZipcode.value = true;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${zipcode}/json/`);
    const data = await response.json();

    if (!data.erro) {
      form.address!.street = data.logradouro || "";
      form.address!.neighborhood = data.bairro || "";
      form.address!.city = data.localidade || "";
      form.address!.state = data.uf || "";
      form.address!.country = "Brasil";
    }
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
  } finally {
    searchingZipcode.value = false;
  }
};

const handleSubmit = () => {
  // Remove empty address fields
  const address = { ...form.address };
  Object.keys(address).forEach((key) => {
    if (!address[key as keyof typeof address]) {
      delete address[key as keyof typeof address];
    }
  });

  const submitData = {
    ...form,
    address: Object.keys(address).length > 0 ? address : undefined,
  };

  emit("save", submitData);
};
</script>
