<template>
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-gray-900">
        Gerenciamento de Usuários
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        Gerencie usuários do sistema e suas permissões
      </p>
    </div>
    <button
      @click="$emit('create-user')"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <svg
        class="w-4 h-4 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      Novo Usuário
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  "create-user": [];
}>();
</script>
