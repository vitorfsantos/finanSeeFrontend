<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Logo and Header -->
        <div class="text-center mb-8">
          <div class="flex items-center justify-center mb-4">
            <div
              class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center"
            >
              <span class="text-white font-bold text-xl">F</span>
            </div>
          </div>
          <h1 class="text-2xl font-bold text-gray-900 mb-2">FinanSee</h1>
          <p class="text-gray-600">Faça login para acessar sua conta</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div class="flex">
              <div class="flex-shrink-0">
                <svg
                  class="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm text-red-800">{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
          >
            <span v-if="isLoading">Entrando...</span>
            <span v-else>Entrar</span>
          </button>
        </form>

        <!-- Test Account Creation -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <div class="text-center mb-4">
            <p class="text-sm text-gray-600 mb-3">Quer conhecer o sistema?</p>
            <p class="text-xs text-gray-500 mb-4">
              Crie uma conta teste com dados fictícios
            </p>
          </div>

          <div class="space-y-3">
            <button
              @click="createTestAccount('user')"
              :disabled="isGeneratingTestAccount"
              class="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-sm"
            >
              <span v-if="isGeneratingTestAccount">Criando conta...</span>
              <span v-else>Conta de Usuário</span>
            </button>

            <button
              @click="createTestAccount('companyAdmin')"
              :disabled="isGeneratingTestAccount"
              class="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors text-sm"
            >
              <span v-if="isGeneratingTestAccount">Criando conta...</span>
              <span v-else>Conta de Administrador de empresa</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  AuthService,
  type LoginRequest,
  type GenerateFakeDataRequest,
} from "@/services/authService";
import { AUTH_MESSAGES, API_MESSAGES } from "@/constants/messages";

const router = useRouter();
const isLoading = ref(false);
const isGeneratingTestAccount = ref(false);
const errorMessage = ref("");

const form = reactive<LoginRequest>({
  email: "",
  password: "",
  rememberMe: false,
});

const handleLogin = async () => {
  isLoading.value = true;
  errorMessage.value = "";

  try {
    const response = await AuthService.login(form);

    console.log("Login successful:", response);

    // Salvar dados de autenticação
    localStorage.setItem("auth_token", response.token);
    localStorage.setItem("user_data", JSON.stringify(response.user));

    // Redirecionar para o dashboard
    router.push("/dashboard");
  } catch (error) {
    console.error("Erro no login:", error);
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Erro desconhecido durante o login";
    }
  } finally {
    isLoading.value = false;
  }
};

const createTestAccount = async (type: "user" | "companyAdmin") => {
  isGeneratingTestAccount.value = true;
  errorMessage.value = "";

  try {
    // Gerar dados fake
    const fakeDataResponse = await AuthService.generateFakeData({ type });

    console.log("Dados fake gerados:", fakeDataResponse);

    // Fazer login automaticamente com os dados gerados
    const loginCredentials: LoginRequest = {
      email: fakeDataResponse.data.email,
      password: fakeDataResponse.data.password,
      rememberMe: false,
    };

    const loginResponse = await AuthService.login(loginCredentials);

    console.log("Login automático realizado:", loginResponse);

    // Salvar dados de autenticação
    localStorage.setItem("auth_token", loginResponse.token);
    localStorage.setItem("user_data", JSON.stringify(loginResponse.user));

    // Redirecionar para o dashboard
    router.push("/dashboard");
  } catch (error) {
    console.error("Erro ao criar conta teste:", error);
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = "Erro desconhecido ao criar conta teste";
    }
  } finally {
    isGeneratingTestAccount.value = false;
  }
};
</script>
