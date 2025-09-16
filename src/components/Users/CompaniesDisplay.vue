<template>
  <div class="relative inline-block">
    <div
      v-if="!companies || companies.length === 0"
      class="text-gray-400 text-sm"
    >
      Nenhuma empresa
    </div>
    <div v-else class="relative group cursor-pointer">
      <span class="text-sm text-gray-900 hover:text-blue-600 transition-colors">
        {{
          companies && companies.length === 1
            ? companies[0].name
            : companies && companies.length > 1
            ? `${companies[0].name} +${companies.length - 1}`
            : ""
        }}
      </span>

      <!-- Tooltip -->
      <div
        class="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50"
        style="min-width: 200px"
      >
        <div
          class="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 shadow-lg"
        >
          <div class="font-medium mb-2 text-center">
            {{
              companies && companies.length === 1
                ? "Empresa vinculada"
                : "Empresas vinculadas"
            }}
          </div>
          <div class="space-y-2">
            <div
              v-for="company in companies"
              :key="company.id"
              class="flex items-center justify-between border-b border-gray-700 pb-1 last:border-b-0 last:pb-0"
            >
              <span class="truncate mr-2">{{ company.name }}</span>
              <span class="text-gray-300 text-xs whitespace-nowrap">
                {{ getRoleLabel(company.pivot.role) }}
                <span v-if="company.pivot.position" class="ml-1">
                  - {{ company.pivot.position }}
                </span>
              </span>
            </div>
          </div>
          <!-- Seta do tooltip -->
          <div
            class="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "@/types";

interface Props {
  companies: User["companies"];
}

const props = defineProps<Props>();

const getRoleLabel = (role: string) => {
  const roleLabels: Record<string, string> = {
    owner: "Proprietário",
    manager: "Gerente",
    employee: "Funcionário",
  };
  return roleLabels[role] || role;
};
</script>
