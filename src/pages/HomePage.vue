<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <!-- Приветственный баннер с улучшенным дизайном -->
    <div
      class="relative overflow-hidden bg-gradient-to-br from-[#4e5d51] via-[#5a6d5e] to-[#4e5d51] text-white"
    >
      <!-- Декоративные элементы фона -->
      <div
        class="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"
      ></div>

      <div class="relative px-5 py-8">
        <div class="flex items-center mb-3">
          <span class="text-4xl mr-3">🌿</span>
          <h1 class="text-2xl font-bold leading-tight">
            Добро пожаловать<br />в САНСАРУ
          </h1>
        </div>

        <div class="space-y-2.5 text-sm leading-relaxed">
          <p class="opacity-95">
            Первый городской ретрит-центр, где банные традиции встречаются с
            заботой о себе.
          </p>
          <p class="opacity-90 italic">
            Здесь безопасно, бережно и без алкоголя. Всё включено — возьмите
            только купальник по желанию.
          </p>
          <p
            v-if="user"
            class="opacity-100 font-medium mt-4 pt-3 border-t border-white border-opacity-20"
          >
            👋 Здравствуйте, {{ user.first_name || user.username || "гость" }}!
          </p>
        </div>
      </div>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="relative">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"
        ></div>
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-[#4e5d51] border-t-transparent absolute top-0 left-0"
        ></div>
      </div>
    </div>

    <!-- Ошибка -->
    <div
      v-else-if="error"
      class="mx-4 mt-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-sm"
    >
      <div class="flex items-start">
        <svg
          class="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <div class="flex-1">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>
        <button
          @click="clearError"
          class="text-red-500 hover:text-red-700 ml-3 flex-shrink-0"
        >
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Карточки меню с улучшенным дизайном -->
    <div v-else class="px-4 py-5 space-y-3">
      <!-- Профиль -->
      <router-link
        to="/profile"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">👤</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">Мой профиль</h3>
            <p class="text-sm text-gray-500 mt-0.5 truncate">
              Личная информация и настройки
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Мальчишники и девичники -->
      <router-link
        to="/bachelor"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🎉</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Мальчишники и девичники
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">
              Отпразднуйте важное событие в особенной атмосфере!
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Клубные мероприятия -->
      <router-link
        to="/club-events"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🏛</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Клубные мероприятия
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">
              Регулярные встречи единомышленников в банном формате
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Коллективные программы -->
      <router-link
        to="/collective-programs"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">👥</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Коллективные программы
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">
              Тепло, живой пар, общее действие и единение
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Авторские программы -->
      <router-link
        to="/author-programs"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">✨</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Авторские программы
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">
              Уникальные техники, глубокие состояния, работа с телом и энергией
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Система лояльности -->
      <router-link
        to="/loyalty"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🎁</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Система лояльности
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 truncate">
              Актуальные скидки и специальные предложения
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Я первый раз -->
      <router-link
        to="/first-time"
        class="block bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl shadow-sm border-2 border-yellow-200 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🌟</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">Я первый раз</h3>
            <p class="text-sm text-gray-600 mt-0.5 truncate">
              Особое предложение для новых гостей
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Корпоративные программы -->
      <router-link
        to="/corporate"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🏢</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Корпоративные программы
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 truncate">
              «Отдых, после которого не нужен отдых»
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- Подарочные сертификаты -->
      <router-link
        to="/certificates"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-rose-50 to-rose-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🎁</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Подарочные сертификаты
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">
              Подарите заботу, счастье и ресурсное состояние
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/appStore";

export default {
  name: "HomePage",
  computed: {
    ...mapState(useAppStore, [
      "isLoading",
      "error",
      "user",
      "programsLoaded",
      "eventsLoaded",
    ]),
  },
  methods: {
    ...mapActions(useAppStore, [
      "authenticate",
      "loadPrograms",
      "loadEvents",
      "loadCertificates",
      "loadPromos",
      "loadLotteryData",
      "clearError",
    ]),
  },
  async created() {
    console.log("HomePage created, checking authentication...");

    if (!this.programsLoaded || !this.eventsLoaded) {
      console.log("Authenticating user...");
      await this.authenticate();

      console.log("After authentication:", {
        user: this.user,
        isAuthenticated: this.isAuthenticated,
      });

      if (this.isAuthenticated) {
        console.log("Loading programs and events...");
        await Promise.allSettled([this.loadPrograms(), this.loadEvents()]);

        setTimeout(async () => {
          await Promise.allSettled([
            this.loadCertificates(),
            this.loadPromos(),
            this.loadLotteryData(),
          ]);
        }, 100);
      }
    } else {
      if (!this.user) {
        console.log("User not found, authenticating...");
        await this.authenticate();
      }
    }
  },
};
</script>

<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
