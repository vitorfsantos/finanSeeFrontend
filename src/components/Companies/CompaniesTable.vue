<template>
  <div class="bg-white shadow-sm rounded-lg border border-gray-200">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Empresa
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CNPJ
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Contato
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Endereço
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
              Carregando empresas...
            </td>
          </tr>
          <tr v-else-if="companies.length === 0">
            <td colspan="7" class="px-6 py-4 text-center text-gray-500">
              Nenhuma empresa encontrada
            </td>
          </tr>
          <tr
            v-else
            v-for="company in companies"
            :key="company.id"
            class="hover:bg-gray-50"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center"
                >
                  <span class="text-white font-medium text-sm">
                    {{ getCompanyInitials(company.name) }}
                  </span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ company.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ formatCNPJ(company.cnpj) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                {{ company.email || "Sem email" }}
              </div>
              <div class="text-sm text-gray-500">
                {{ company.phone || "Sem telefone" }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                <div v-if="company.address">
                  {{ company.address.city }}, {{ company.address.state }}
                </div>
                <div v-else class="text-gray-500">Sem endereço</div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  company.deleted_at
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800',
                ]"
              >
                {{ company.deleted_at ? "Inativa" : "Ativa" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDateTime(company.created_at) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <div class="flex items-center justify-end space-x-2">
                <button
                  @click="$emit('edit-company', company)"
                  class="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                  title="Editar empresa"
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
                  v-if="!company.deleted_at"
                  @click="$emit('delete-company', company)"
                  class="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                  title="Desativar empresa"
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
                  @click="$emit('restore-company', company)"
                  class="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50"
                  title="Reativar empresa"
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
import type { Company } from "@/types";
import { formatDateTime } from "@/utils";

interface Props {
  companies: Company[];
  loading: boolean;
}

interface Emits {
  "edit-company": [company: Company];
  "delete-company": [company: Company];
  "restore-company": [company: Company];
}

const props = defineProps<Props>();
defineEmits<Emits>();

const getCompanyInitials = (name: string) => {
  if (!name) return "E";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatCNPJ = (cnpj: string) => {
  if (!cnpj) return "";
  // Remove caracteres não numéricos
  const numbers = cnpj.replace(/\D/g, "");
  // Aplica a máscara XX.XXX.XXX/XXXX-XX
  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};
</script>
