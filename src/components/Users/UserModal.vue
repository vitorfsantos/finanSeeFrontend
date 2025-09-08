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
        <form @submit.prevent="$emit('save', form)">
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
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
          >
            <button
              type="submit"
              :disabled="saving"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
            >
              {{
                saving ? "Salvando..." : editingUser ? "Atualizar" : "Criar"
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
import { ref, watch } from 'vue';
import type { User } from '@/types';
import type { UserLevel } from '@/services/userService';

interface Props {
  show: boolean;
  editingUser: User | null;
  userLevels: UserLevel[];
  saving: boolean;
  validationErrors: Record<string, string[]>;
}

interface Emits {
  'close': [];
  'save': [form: any];
}

const props = defineProps<Props>();
defineEmits<Emits>();

const form = ref({
  name: "",
  email: "",
  phone: "",
  password: "",
  user_level_id: 2,
});

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
      };
    } else {
      form.value = {
        name: "",
        email: "",
        phone: "",
        password: "",
        user_level_id: props.userLevels.length > 0 ? props.userLevels[0].id : 2,
      };
    }
  },
  { immediate: true }
);

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
</script>
