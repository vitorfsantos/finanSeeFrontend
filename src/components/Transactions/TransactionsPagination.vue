<template>
  <div
    v-if="pagination?.last_page && pagination.last_page > 1"
    class="px-6 py-4 border-t border-gray-200 flex items-center justify-between"
  >
    <div class="flex items-center">
      <span class="text-sm text-gray-700">
        Página {{ pagination?.current_page || 1 }} de
        {{ pagination?.last_page || 1 }}
      </span>
    </div>
    <div class="flex space-x-2">
      <button
        @click="changePage((pagination?.current_page || 1) - 1)"
        :disabled="(pagination?.current_page || 1) <= 1"
        class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Anterior
      </button>
      <button
        @click="changePage((pagination?.current_page || 1) + 1)"
        :disabled="
          (pagination?.current_page || 1) >= (pagination?.last_page || 1)
        "
        class="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaginationMeta } from "@/types";

interface Props {
  pagination: PaginationMeta | null;
}

interface Emits {
  (e: "change-page", page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const changePage = (page: number) => {
  if (page >= 1 && page <= (props.pagination?.last_page || 1)) {
    emit("change-page", page);
  }
};
</script>
