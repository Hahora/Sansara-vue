<script setup>
import { ref, onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

// Импортируем компоненты
import Header from "@/components/Header.vue";
import Navigation from "@/components/Navigation.vue";

// Импортируем утилиты Telegram
import {
  initTelegramWebApp,
  getTelegramUserInfo,
  hasValidTelegramData,
} from "@/utils/telegram.js";

// Состояние для отображения навигации
const showNavigation = ref(true);
const route = useRoute();

// Отладочная информация (только для dev режима)
const isDevMode = import.meta.env.MODE === "development";
const debugInfo = ref({
  hasInitData: false,
  hasInitDataUnsafe: false,
  hasUser: false,
  initDataLength: 0,
  userId: "N/A",
  userName: "N/A",
  mode: import.meta.env.MODE,
});

// Функция для скрытия навигации на определенных страницах
const hideNavigationOnPages = ["booking"];

// Функция для обновления видимости навигации
const updateNavigationVisibility = () => {
  showNavigation.value = !hideNavigationOnPages.includes(route.name);
};

// Наблюдаем за изменениями маршрута
watch(() => route.name, updateNavigationVisibility);

onMounted(() => {
  // Очищаем старые тестовые данные при старте
  localStorage.removeItem("telegram_user");
  delete window.testInitData;

  // Инициализация Telegram WebApp
  const isTelegramAvailable = initTelegramWebApp();

  // Добавляем отладочную информацию
  if (window.Telegram?.WebApp) {
    const tgApp = window.Telegram.WebApp;

    // Обновляем отладочную информацию
    debugInfo.value = {
      hasInitData: !!tgApp.initData,
      hasInitDataUnsafe: !!tgApp.initDataUnsafe,
      hasUser: !!tgApp.initDataUnsafe?.user,
      initDataLength: tgApp.initData ? tgApp.initData.length : 0,
      userId: tgApp.initDataUnsafe?.user?.id || "N/A",
      userName: tgApp.initDataUnsafe?.user?.first_name || "N/A",
      mode: import.meta.env.MODE,
    };

    // Логируем в консоль для отладки
    console.log("Telegram WebApp Debug Info:", debugInfo.value);

    if (hasValidTelegramData()) {
      const userInfo = getTelegramUserInfo();
      console.log("Telegram user authenticated:", userInfo);

      // Сохраняем данные пользователя
      localStorage.setItem("telegram_user", JSON.stringify(userInfo));
    } else {
      console.warn(
        "No valid Telegram data available - application must be run through Telegram"
      );

      // В production показываем предупреждение
      if (!isDevMode) {
        window.Telegram.WebApp.showAlert(
          "Ошибка: нет данных Telegram. Пожалуйста, откройте приложение через Telegram Bot."
        );
      }
    }
  } else {
    // Telegram WebApp недоступен
    debugInfo.value.mode = import.meta.env.MODE;

    if (isDevMode) {
      console.warn("Running in development mode without Telegram WebApp");
      debugInfo.value.hasInitData = false;
      debugInfo.value.hasUser = false;
    } else {
      console.error("Telegram WebApp not available in production mode!");
    }
  }

  // Обновляем видимость навигации при монтировании
  updateNavigationVisibility();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Отладочная панель (только в dev режиме) -->
    <div
      v-if="isDevMode"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-xs"
    >
      <div class="font-bold">DEBUG INFO:</div>
      <div>Mode: {{ debugInfo.mode }}</div>
      <div>InitData: {{ debugInfo.hasInitData ? "YES" : "NO" }}</div>
      <div>User: {{ debugInfo.hasUser ? "YES" : "NO" }}</div>
      <div>User ID: {{ debugInfo.userId }}</div>
      <div>User Name: {{ debugInfo.userName }}</div>
      <div>Data Length: {{ debugInfo.initDataLength }}</div>
    </div>

    <!-- Шапка приложения -->
    <Header />

    <!-- Основной контент -->
    <main class="flex-grow">
      <!-- Исправленный синтаксис RouterView с keep-alive -->
      <RouterView v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </RouterView>
    </main>

    <!-- Навигация (если не скрыта) -->
    <Navigation v-if="showNavigation" />
  </div>
</template>
