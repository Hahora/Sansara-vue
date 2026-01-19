<script setup>
import { ref, onMounted, watch } from "vue";
import { RouterView, useRoute } from "vue-router";

// Импортируем компоненты
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
  initTelegramWebApp();

  if (hasValidTelegramData()) {
    const userInfo = getTelegramUserInfo();
    console.log("Telegram user authenticated:", userInfo);

    // Сохраняем данные пользователя
    localStorage.setItem("telegram_user", JSON.stringify(userInfo));
  } else {
    console.warn(
      "No valid Telegram data available - application must be run through Telegram"
    );
  }

  // Обновляем видимость навигации при монтировании
  updateNavigationVisibility();
});
</script>

<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Основной контент -->
    <main class="flex-grow">
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
