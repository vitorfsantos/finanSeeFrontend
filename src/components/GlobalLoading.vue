<template>
  <div
    v-if="globalLoading.isLoading.value"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4">
      <!-- Loading Spinner -->
      <div class="flex justify-center mb-6">
        <div
          :class="[
            'animate-spin rounded-full h-12 w-12 border-4 border-gray-200',
            globalLoading.loadingType.value === 'backend-hibernating'
              ? 'border-orange-500 border-t-orange-500'
              : 'border-blue-500 border-t-blue-500',
          ]"
        ></div>
      </div>

      <!-- Loading Message -->
      <div class="text-center">
        <h3
          :class="[
            'text-lg font-semibold mb-2',
            globalLoading.loadingType.value === 'backend-hibernating'
              ? 'text-orange-600'
              : 'text-gray-900',
          ]"
        >
          {{ globalLoading.loadingMessage.value }}
        </h3>

        <!-- Backend Hibernating Specific Message -->
        <div
          v-if="globalLoading.loadingType.value === 'backend-hibernating'"
          class="text-sm text-gray-600 space-y-2"
        >
          <p>
            O servidor pode estar hibernando e precisa de alguns segundos para
            reativar.
          </p>
          <div
            class="flex items-center justify-center space-x-2 text-orange-600"
          >
            <svg
              class="w-4 h-4 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="text-xs">Aguarde um momento...</span>
          </div>
        </div>

        <!-- Normal Loading Message -->
        <div v-else class="text-sm text-gray-600">
          <p>Por favor, aguarde...</p>
        </div>
      </div>

      <!-- Progress Dots Animation -->
      <div class="flex justify-center mt-6">
        <div class="flex space-x-1">
          <div
            v-for="i in 3"
            :key="i"
            :class="[
              'w-2 h-2 rounded-full animate-pulse',
              globalLoading.loadingType.value === 'backend-hibernating'
                ? 'bg-orange-400'
                : 'bg-blue-400',
            ]"
            :style="{ animationDelay: `${i * 0.2}s` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { globalLoading } from "@/composables/useLoading";
</script>
