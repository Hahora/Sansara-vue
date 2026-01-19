<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Мой профиль</h1>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
      {{ error }}
    </div>

    <!-- Информация о пользователе -->
    <div v-else-if="user" class="card">
      <div class="flex items-center mb-4">
        <div class="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16" />
        <div class="ml-4">
          <h2 class="text-lg font-semibold text-black">{{ user.first_name }} {{ user.last_name }}</h2>
          <p class="text-black">@{{ user.username }}</p>
        </div>
      </div>

      <div class="space-y-3">
        <div class="profile-field">
          <span class="profile-label">Имя</span>
          <span class="profile-value">{{ user.first_name || 'Не указано' }}</span>
        </div>

        <div class="profile-field">
          <span class="profile-label">Фамилия</span>
          <span class="profile-value">{{ user.last_name || 'Не указана' }}</span>
        </div>

        <div class="profile-field">
          <span class="profile-label">Телефон</span>
          <span class="profile-value">{{ user.phone || 'Не указан' }}</span>
        </div>


        <div class="profile-field">
          <span class="profile-label">Дата рождения</span>
          <span class="profile-value">{{ formatDate(user.date_of_birth) || 'Не указана' }}</span>
        </div>

        <div class="profile-field">
          <span class="profile-label">Статус</span>
          <span class="profile-value bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{{ formatUserStatus(user.status) }}</span>
        </div>
      </div>
    </div>

    <!-- Кнопки действий -->
    <div class="mt-6 space-y-3">
      <button @click="showEditModal = true" class="btn-wood text-left">
        ✏️ Редактировать профиль
      </button>
      <button @click="clearStorageAndReload" class="btn-secondary text-left">
        🔄 Очистить кэш и перезагрузить
      </button>
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
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';
import EditProfileModal from '@/components/EditProfileModal.vue';

export default {
  name: 'ProfilePage',
  components: {
    EditProfileModal
  },
  data() {
    return {
      showEditModal: false
    };
  },
  computed: {
    ...mapState(useAppStore, ['user', 'isLoading', 'error']),
    userBookings() {
      // Возвращаем бронирования пользователя из хранилища
      const store = useAppStore();
      return store.getUserBookings;
    }
  },
  methods: {
    ...mapActions(useAppStore, ['loadUserBookings', 'setUser']),
    formatDate(dateString) {
      if (!dateString) return null;
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    },
    formatUserStatus(status) {
      if (!status) return 'Новый';

      // Приводим статус к lowercase для сопоставления с картой (поскольку стор преобразует enum-значения в нижний регистр)
      const lowerStatus = status.toLowerCase();

      const statusMap = {
        'new': 'Новый',
        'active': 'Активный',
        'vip': 'VIP',
        'blocked': 'Заблокирован',
        'pending': 'Ожидает регистрации'
      };

      return statusMap[lowerStatus] || status;
    },
    onProfileSaved(updatedUser) {
      // Обновляем данные пользователя в хранилище
      this.setUser(updatedUser);
      // Закрываем модальное окно
      this.showEditModal = false;
    },

    async clearStorageAndReload() {
      // Очищаем локальное хранилище
      localStorage.clear();

      // Очищаем хранилище Pinia
      const store = useAppStore();
      store.$reset();

      // Ждем короткую паузу для завершения сброса состояния
      await new Promise(resolve => setTimeout(resolve, 100));

      // Перезагружаем страницу
      window.location.reload();
    }
  },
  async mounted() {
    // Загружаем бронирования пользователя при монтировании компонента
    await this.loadUserBookings();
  }
}
</script>