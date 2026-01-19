<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
    <!-- Шапка -->
    <div
      class="bg-gradient-to-br from-[#4e5d51] via-[#5a6d5e] to-[#4e5d51] text-white px-5 py-6"
    >
      <div class="flex items-center mb-4">
        <router-link
          to="/"
          class="flex items-center text-white hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium">Назад</span>
        </router-link>
      </div>

      <!-- Информация о пользователе в шапке -->
      <div v-if="user" class="flex items-center">
        <div
          class="w-20 h-20 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl border-2 border-white border-opacity-30"
        >
          {{ getUserInitials }}
        </div>
        <div class="ml-4 flex-1">
          <h1 class="text-2xl font-bold">{{ user.first_name || "Гость" }}</h1>
          <p class="text-white text-opacity-90 text-sm mt-1">
            @{{ user.username || user.telegram_id }}
          </p>
          <div class="mt-2">
            <span
              :class="getStatusBadgeClass"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            >
              {{ formatUserStatus(user.status) }}
            </span>
          </div>
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
          class="h-5 w-5 text-red-500 mt-0.5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>
    </div>

    <!-- Основной контент -->
    <div v-else-if="user" class="px-4 py-5 space-y-4">
      <!-- Личная информация -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div class="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <h2 class="font-semibold text-gray-900 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              />
            </svg>
            Личная информация
          </h2>
        </div>
        <div class="divide-y divide-gray-100">
          <div class="px-4 py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600">Имя</span>
            <span class="text-sm font-medium text-gray-900">{{
              user.first_name || "Не указано"
            }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600">Фамилия</span>
            <span class="text-sm font-medium text-gray-900">{{
              user.last_name || "Не указана"
            }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600">Телефон</span>
            <span class="text-sm font-medium text-gray-900">{{
              user.phone || "Не указан"
            }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600">Email</span>
            <span class="text-sm font-medium text-gray-900">{{
              user.email || "Не указан"
            }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600">Дата рождения</span>
            <span class="text-sm font-medium text-gray-900">{{
              formatDate(user.date_of_birth) || "Не указана"
            }}</span>
          </div>
          <div class="px-4 py-3 flex justify-between items-center">
            <span class="text-sm text-gray-600">Пол</span>
            <span class="text-sm font-medium text-gray-900">{{
              formatGender(user.gender)
            }}</span>
          </div>
        </div>
      </div>

      <!-- Статистика -->
      <div class="grid grid-cols-2 gap-3">
        <div
          class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200"
        >
          <div class="text-2xl font-bold text-blue-900">
            {{ userBookings.length }}
          </div>
          <div class="text-xs text-blue-700 mt-1">Бронирований</div>
        </div>
        <div
          class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200"
        >
          <div class="text-2xl font-bold text-green-900">0</div>
          <div class="text-xs text-green-700 mt-1">Посещений</div>
        </div>
      </div>

      <!-- Кнопки действий -->
      <div class="space-y-3">
        <button
          @click="showEditModal = true"
          class="w-full bg-[#4e5d51] hover:bg-[#3d4a40] text-white font-semibold py-4 px-4 rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm active:scale-98"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
          Редактировать профиль
        </button>

        <button
          @click="clearStorageAndReload"
          class="w-full bg-white hover:bg-gray-50 text-gray-700 font-medium py-4 px-4 rounded-xl border border-gray-200 transition-all duration-200 flex items-center justify-center active:scale-98"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
          Очистить кэш и перезагрузить
        </button>
      </div>

      <!-- Дополнительная информация -->
      <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
        <div class="flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"
            />
          </svg>
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-blue-900">
              Ваши данные в безопасности
            </h3>
            <p class="text-xs text-blue-700 mt-1">
              Мы используем ваши данные только для бронирования и улучшения
              сервиса.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно редактирования профиля -->
    <EditProfileModal
      :is-open="showEditModal"
      :user-data="user"
      @close="showEditModal = false"
      @saved="onProfileSaved"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/appStore";
import EditProfileModal from "@/components/EditProfileModal.vue";

export default {
  name: "ProfilePage",
  components: {
    EditProfileModal,
  },
  data() {
    return {
      showEditModal: false,
    };
  },
  computed: {
    ...mapState(useAppStore, ["user", "isLoading", "error"]),
    userBookings() {
      const store = useAppStore();
      return store.getUserBookings;
    },
    getUserInitials() {
      if (!this.user) return "?";
      const firstName = this.user.first_name || "";
      const lastName = this.user.last_name || "";
      return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase() || "👤";
    },
    getStatusBadgeClass() {
      const status = this.user?.status?.toLowerCase();
      const classes = {
        new: "bg-blue-100 text-blue-800",
        active: "bg-green-100 text-green-800",
        vip: "bg-purple-100 text-purple-800",
        blocked: "bg-red-100 text-red-800",
        pending: "bg-yellow-100 text-yellow-800",
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    },
  },
  methods: {
    ...mapActions(useAppStore, ["loadUserBookings", "setUser"]),
    formatDate(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU");
    },
    formatUserStatus(status) {
      if (!status) return "Новый";
      const lowerStatus = status.toLowerCase();
      const statusMap = {
        new: "Новый",
        active: "Активный",
        vip: "VIP",
        blocked: "Заблокирован",
        pending: "Ожидает",
      };
      return statusMap[lowerStatus] || status;
    },
    formatGender(gender) {
      if (!gender) return "Не указан";
      const lowerGender = gender.toLowerCase();
      const genderMap = {
        male: "Мужской",
        female: "Женский",
        other: "Другой",
      };
      return genderMap[lowerGender] || gender;
    },
    onProfileSaved(updatedUser) {
      this.setUser(updatedUser);
      this.showEditModal = false;
    },
    async clearStorageAndReload() {
      if (confirm("Вы уверены? Все локальные данные будут удалены.")) {
        localStorage.clear();
        const store = useAppStore();
        store.$reset();
        await new Promise((resolve) => setTimeout(resolve, 100));
        window.location.reload();
      }
    },
  },
  async mounted() {
    await this.loadUserBookings();
  },
};
</script>

<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}
</style>
