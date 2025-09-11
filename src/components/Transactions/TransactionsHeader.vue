<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">Transações</h1>
      <p class="text-gray-600">Gerencie suas transações financeiras</p>
    </div>
    <button
      @click="$emit('create-transaction')"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Nova Transação
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  "create-transaction": [];
}>();
</script>
