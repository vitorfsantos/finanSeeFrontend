<template>
  <div class="min-h-screen bg-green-100 flex items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div class="flex">
          <!-- Left Side - Animated Background -->
          <div class="w-1/2 relative overflow-hidden">
            <!-- Animated Background with Tailwind gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-br bg-green-700"
            ></div>

            <!-- Floating Money Icons -->
            <div class="absolute inset-0 pointer-events-none">
              <!-- Dollar Signs -->
              <div class="absolute top-[15%] left-[10%] animate-bounce">
                <svg
                  class="w-8 h-8 text-green-200 opacity-60 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                  />
                </svg>
              </div>

              <!-- Coins -->
              <div
                class="absolute top-[25%] right-[15%] animate-bounce delay-1000"
              >
                <svg
                  class="w-6 h-6 text-yellow-300 opacity-70 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <text
                    x="12"
                    y="16"
                    text-anchor="middle"
                    class="text-xs font-bold"
                  >
                    $
                  </text>
                </svg>
              </div>

              <!-- Banknote -->
              <div
                class="absolute top-[60%] left-[20%] animate-bounce delay-2000"
              >
                <svg
                  class="w-10 h-10 text-green-300 opacity-50 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="6"
                    width="20"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="4"
                    y="8"
                    width="16"
                    height="8"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <text
                    x="12"
                    y="14"
                    text-anchor="middle"
                    class="text-sm font-bold"
                  >
                    100
                  </text>
                </svg>
              </div>

              <!-- Credit Card -->
              <div
                class="absolute top-[70%] right-[25%] animate-bounce delay-3000"
              >
                <svg
                  class="w-8 h-8 text-blue-300 opacity-60 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="2"
                    y="10"
                    width="20"
                    height="2"
                    fill="currentColor"
                  />
                  <rect x="4" y="15" width="4" height="2" fill="currentColor" />
                </svg>
              </div>

              <!-- Piggy Bank -->
              <div
                class="absolute top-[40%] left-[5%] animate-bounce delay-4000"
              >
                <svg
                  class="w-7 h-7 text-pink-300 opacity-70 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10z"
                  />
                </svg>
              </div>

              <!-- Trending Up -->
              <div
                class="absolute top-[10%] right-[30%] animate-bounce delay-5000"
              >
                <svg
                  class="w-6 h-6 text-emerald-300 opacity-60 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <polyline
                    points="23,6 13.5,15.5 8.5,10.5 1,18"
                    stroke-width="2"
                  />
                  <polyline points="17,6 23,6 23,12" stroke-width="2" />
                </svg>
              </div>

              <!-- Calculator -->
              <div
                class="absolute top-[80%] left-[15%] animate-bounce delay-6000"
              >
                <svg
                  class="w-5 h-5 text-gray-300 opacity-70 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="4"
                    y="2"
                    width="16"
                    height="20"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <rect
                    x="6"
                    y="4"
                    width="12"
                    height="3"
                    fill="currentColor"
                    opacity="0.3"
                  />
                  <circle cx="8" cy="10" r="1" fill="currentColor" />
                  <circle cx="12" cy="10" r="1" fill="currentColor" />
                  <circle cx="16" cy="10" r="1" fill="currentColor" />
                  <circle cx="8" cy="14" r="1" fill="currentColor" />
                  <circle cx="12" cy="14" r="1" fill="currentColor" />
                  <circle cx="16" cy="14" r="1" fill="currentColor" />
                </svg>
              </div>

              <!-- Wallet -->
              <div
                class="absolute top-[50%] right-[10%] animate-bounce delay-7000"
              >
                <svg
                  class="w-6 h-6 text-amber-300 opacity-60 drop-shadow-lg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 7H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2H3zm18 12H3V9h18v10z"
                  />
                  <circle cx="16" cy="14" r="2" fill="currentColor" />
                </svg>
              </div>
            </div>

            <!-- Content Overlay -->
            <div
              class="relative z-10 h-full flex items-center justify-center p-8"
            >
              <div class="text-center text-white">
                <div class="mb-6">
                  <h1 class="text-4xl font-bold mb-2">FinanSee</h1>
                  <p class="text-green-100 text-lg">
                    Gerencie suas finanças de forma inteligente
                  </p>
                </div>

                <!-- Additional info or features -->
                <div class="space-y-3 text-left">
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 text-green-200 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span class="text-green-100"
                      >Controle total dos seus gastos</span
                    >
                  </div>
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 text-green-200 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span class="text-green-100">Relatórios detalhados</span>
                  </div>
                  <div class="flex items-center">
                    <svg
                      class="w-5 h-5 text-green-200 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <span class="text-green-100">Metas financeiras</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Login Form -->
          <div class="w-1/2 p-8 flex items-center">
            <div class="w-full max-w-sm mx-auto">
              <!-- Form Header -->
              <div class="text-center mb-8">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">
                  Bem-vindo de volta
                </h2>
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
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
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
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="••••••••"
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember-me"
                      v-model="form.rememberMe"
                      type="checkbox"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label
                      for="remember-me"
                      class="ml-2 block text-sm text-gray-700"
                    >
                      Lembrar de mim
                    </label>
                  </div>
                  <a
                    href="#"
                    class="text-sm text-green-600 hover:text-green-500 transition-colors"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                <button
                  type="submit"
                  :disabled="isLoading"
                  class="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
                >
                  <span v-if="isLoading">Entrando...</span>
                  <span v-else>Entrar</span>
                </button>
              </form>

              <!-- Sign Up Link -->
              <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                  Não tem uma conta?
                  <a
                    href="#"
                    class="font-medium text-green-600 hover:text-green-500 transition-colors"
                  >
                    Cadastre-se
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { AuthService, type LoginRequest } from "@/services/authService";
import { AUTH_MESSAGES, API_MESSAGES } from "@/constants/messages";

const router = useRouter();
const isLoading = ref(false);
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
</script>
