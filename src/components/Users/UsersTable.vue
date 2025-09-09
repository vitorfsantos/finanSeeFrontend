<template>
  <div class="bg-white shadow-sm rounded-lg border border-gray-200">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Usuário
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nível
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Empresas
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Criado em
            </th>
            <th
              class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading" class="animate-pulse">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Carregando usuários...
            </td>
          </tr>
          <tr v-else-if="users.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Nenhum usuário encontrado
            </td>
          </tr>
          <tr
            v-else
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-medium text-sm">
                    {{ getUserInitials(user.name) }}
                  </span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ user.name }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ user.phone || "Sem telefone" }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
              <div v-if="user.email_verified_at" class="text-sm text-green-600">
                ✓ Verificado
              </div>
              <div v-else class="text-sm text-yellow-600">⚠ Não verificado</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  user.user_level_id === 1
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800',
                ]"
              >
                {{ getUserLevelName(user.user_level_id) }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                <CompaniesDisplay :companies="user.companies || []" />
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  user.deleted_at
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800',
                ]"
              >
                {{ user.deleted_at ? "Inativo" : "Ativo" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDateTime(user.created_at) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <div class="flex items-center justify-end space-x-2">
                <button
                  @click="$emit('edit-user', user)"
                  class="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                  title="Editar usuário"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  v-if="!user.deleted_at"
                  @click="$emit('delete-user', user)"
                  class="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                  title="Desativar usuário"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
                <button
                  v-else
                  @click="$emit('restore-user', user)"
                  class="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50"
                  title="Reativar usuário"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/types";
import type { UserLevel } from "@/services/userService";
import { formatDateTime } from "@/utils";
import CompaniesDisplay from "./CompaniesDisplay.vue";

interface Props {
  users: User[];
  userLevels: UserLevel[];
  loading: boolean;
}

interface Emits {
  "edit-user": [user: User];
  "delete-user": [user: User];
  "restore-user": [user: User];
}

const props = defineProps<Props>();
defineEmits<Emits>();

const getUserInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getUserLevelName = (levelId: number) => {
  const level = props.userLevels.find((l) => l.id === levelId);
  return level ? level.name : "Desconhecido";
};
</script>
