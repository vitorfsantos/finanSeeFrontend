<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Tipo</label>
        <select
          :value="filters.type"
          @change="
            updateFilter('type', ($event.target as HTMLSelectElement).value)
          "
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todos</option>
          <option value="income">Receita</option>
          <option value="expense">Despesa</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Categoria</label
        >
        <select
          :value="filters.category"
          @change="
            updateFilter('category', ($event.target as HTMLSelectElement).value)
          "
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Todas</option>
          <option value="food">Alimentação</option>
          <option value="transport">Transporte</option>
          <option value="entertainment">Entretenimento</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Data Início</label
        >
        <input
          :value="filters.start_date"
          @change="
            updateFilter(
              'start_date',
              ($event.target as HTMLInputElement).value
            )
          "
          type="date"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Data Fim</label
        >
        <input
          :value="filters.end_date"
          @change="
            updateFilter('end_date', ($event.target as HTMLInputElement).value)
          "
          type="date"
          class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
    <div class="mt-4 flex justify-end">
      <button
        @click="clearFilters"
        class="text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Limpar filtros
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TransactionFilters } from "@/types";

interface Props {
  filters: TransactionFilters;
}

interface Emits {
  (e: "update:filters", filters: TransactionFilters): void;
  (e: "clear-filters"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const updateFilter = (key: keyof TransactionFilters, value: string) => {
  const newFilters = { ...props.filters, [key]: value };
  emit("update:filters", newFilters);
};

const clearFilters = () => {
  emit("clear-filters");
};
</script>
