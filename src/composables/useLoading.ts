import { ref, reactive, readonly } from "vue";

// Estado global do loading
const isLoading = ref(false);
const loadingMessage = ref("");
const loadingType = ref<"normal" | "backend-hibernating">("normal");

// Contador de requisições ativas
let activeRequests = 0;

export function useLoading() {
  const showLoading = (
    message: string = "Carregando...",
    type: "normal" | "backend-hibernating" = "normal"
  ) => {
    isLoading.value = true;
    loadingMessage.value = message;
    loadingType.value = type;
  };

  const hideLoading = () => {
    isLoading.value = false;
    loadingMessage.value = "";
    loadingType.value = "normal";
  };

  const showBackendHibernating = () => {
    showLoading(
      "O servidor está reativando... Isso pode levar alguns segundos.",
      "backend-hibernating"
    );
  };

  const incrementActiveRequests = () => {
    activeRequests++;
    // Não mostrar loading imediatamente, apenas quando passar de 2s
  };

  const decrementActiveRequests = () => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) {
      hideLoading();
    }
  };

  const getActiveRequestsCount = () => activeRequests;

  return {
    // Estado reativo
    isLoading: readonly(isLoading),
    loadingMessage: readonly(loadingMessage),
    loadingType: readonly(loadingType),

    // Métodos
    showLoading,
    hideLoading,
    showBackendHibernating,
    incrementActiveRequests,
    decrementActiveRequests,
    getActiveRequestsCount,
  };
}

// Exportar instância global para uso em outros lugares
export const globalLoading = {
  isLoading,
  loadingMessage,
  loadingType,
  showLoading: (
    message: string = "Carregando...",
    type: "normal" | "backend-hibernating" = "normal"
  ) => {
    isLoading.value = true;
    loadingMessage.value = message;
    loadingType.value = type;
  },
  hideLoading: () => {
    isLoading.value = false;
    loadingMessage.value = "";
    loadingType.value = "normal";
  },
  showBackendHibernating: () => {
    isLoading.value = true;
    loadingMessage.value =
      "O servidor está reativando... Isso pode levar alguns segundos.";
    loadingType.value = "backend-hibernating";
  },
  incrementActiveRequests: () => {
    activeRequests++;
    // Não mostrar loading imediatamente, apenas quando passar de 2s
  },
  decrementActiveRequests: () => {
    activeRequests = Math.max(0, activeRequests - 1);
    if (activeRequests === 0) {
      isLoading.value = false;
      loadingMessage.value = "";
      loadingType.value = "normal";
    }
  },
  getActiveRequestsCount: () => activeRequests,
};
