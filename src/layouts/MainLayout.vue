<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      ]"
    >
      <!-- Logo -->
      <div
        class="flex items-center justify-between h-16 px-6 border-b border-gray-200"
      >
        <div class="flex items-center">
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <span class="text-white font-bold text-lg">F</span>
          </div>
          <h1 class="ml-3 text-xl font-bold text-gray-900">FinanSee</h1>
        </div>
        <button
          @click="toggleSidebar"
          class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          title="Fechar menu"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-6 px-3">
        <div class="space-y-1">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            :class="[
              'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
              $route.path === item.href
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm',
            ]"
          >
            <component
              :is="item.icon"
              :class="[
                'mr-3 h-5 w-5 flex-shrink-0',
                $route.path === item.href
                  ? 'text-blue-700'
                  : 'text-gray-400 group-hover:text-gray-500',
              ]"
            />
            {{ item.name }}
          </router-link>
        </div>
      </nav>

      <!-- User Info -->
      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gray-50"
      >
        <div class="flex items-center">
          <div
            class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-sm"
          >
            <span class="text-white font-medium text-sm">
              {{ userInitials }}
            </span>
          </div>
          <div class="ml-3 flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 truncate">
              {{ user?.name }}
            </p>
            <p class="text-xs text-gray-500 truncate">{{ user?.email }}</p>
          </div>
          <button
            @click="handleLogout"
            class="ml-2 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-white transition-colors"
            title="Sair"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div :class="['lg:pl-64', { 'pl-0': !isSidebarOpen }]">
      <!-- Header -->
      <header
        class="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30"
      >
        <div
          class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8"
        >
          <!-- Mobile menu button -->
          <button
            @click="toggleSidebar"
            class="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            title="Abrir menu"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <!-- Page title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-lg font-semibold text-gray-900">
              {{ currentPageTitle }}
            </h1>
          </div>

          <!-- Right side actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors relative"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-5 5v-5z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M9 11h.01M9 8h.01M9 5h.01M9 2h.01"
                />
              </svg>
              <!-- Notification badge -->
              <span
                class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              ></span>
            </button>

            <!-- Profile dropdown -->
            <div class="relative">
              <button
                @click="toggleProfileDropdown"
                class="flex items-center text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-gray-50 p-1 transition-colors"
              >
                <div
                  class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-sm"
                >
                  <span class="text-white font-medium text-sm">{{
                    userInitials
                  }}</span>
                </div>
              </button>

              <!-- Profile dropdown menu -->
              <div
                v-if="isProfileDropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-200"
              >
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Seu perfil
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Configurações
                </a>
                <div class="border-t border-gray-100 my-1"></div>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="py-6 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </main>
    </div>

    <!-- Overlay for mobile -->
    <div
      v-if="showMobileOverlay"
      @click="closeSidebar"
      class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { AuthService } from "@/services/authService";
import type { User } from "@/types";
import {
  HomeIcon,
  CurrencyDollarIcon,
  TagIcon,
  ChartBarIcon,
  CogIcon,
  UsersIcon,
} from "@/components/icons";

// Props
interface Props {
  user?: User | null;
}

const props = withDefaults(defineProps<Props>(), {
  user: null,
});

// Composables
const router = useRouter();
const route = useRoute();

// Reactive state
const isSidebarOpen = ref(window.innerWidth >= 1024); // Abrir por padrão em desktop
const isProfileDropdownOpen = ref(false);

// Navigation items
const navigationItems = computed(() => {
  const items = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
    {
      name: "Transações",
      href: "/transactions",
      icon: TagIcon,
    },
  ];

  // Adicionar menu de Usuários para administradores (user_level_id = 1) e gerentes (user_level_id = 2)
  if (props.user?.user_level_id === 1 || props.user?.user_level_id === 2) {
    items.push({
      name: "Usuários",
      href: "/users",
      icon: UsersIcon,
    });
  }

  return items;
});

// Computed
const userInitials = computed(() => {
  if (!props.user?.name) return "U";
  return props.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
});

const currentPageTitle = computed(() => {
  const currentItem = navigationItems.value.find(
    (item) => item.href === route.path
  );
  return currentItem?.name || "FinanSee";
});

const showMobileOverlay = computed(() => {
  return isSidebarOpen.value && window.innerWidth < 1024;
});

// Methods
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const handleLogout = async () => {
  try {
    await AuthService.logout();
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  } catch (error) {
    console.error("Erro no logout:", error);
    // Forçar logout mesmo com erro
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    router.push("/login");
  }
};

// Event listeners
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isSidebarOpen.value = true; // Manter aberto em desktop
  } else {
    isSidebarOpen.value = false; // Fechar em mobile
  }
};

// Lifecycle
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Close dropdown when clicking outside
const closeProfileDropdown = (event: Event) => {
  if (!(event.target as Element).closest(".relative")) {
    isProfileDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", closeProfileDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeProfileDropdown);
});
</script>
