<template>
  <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label
          for="search"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Buscar
        </label>
        <input
          id="search"
          :value="filters.search"
          @input="updateSearch"
          type="text"
          placeholder="Nome, CNPJ ou email..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div class="flex items-end">
        <button
          @click="$emit('clear-filters')"
          class="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Limpar Filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  filters: {
    search: string;
  };
}

interface Emits {
  "update:filters": [filters: Props["filters"]];
  "clear-filters": [];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// Debounced search
let searchTimeout: number;

const updateSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const newFilters = { ...props.filters, search: target.value };

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    emit("update:filters", newFilters);
  }, 500);
};
</script>
