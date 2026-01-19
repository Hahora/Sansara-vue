<template>
  <div>
    <!-- Приветственный баннер -->
    <div class="bg-[#4e5d51] text-white p-6">
      <h1 class="text-2xl font-extrabold mb-2">🌿 <b>Добро пожаловать в САНСАРУ</b></h1>
      <p class="opacity-100 font-semibold">Первый городской ретрит-центр, где банные традиции встречаются с заботой о себе.</p>
      <p class="opacity-100 italic font-semibold">Здесь безопасно, бережно и без алкоголя. Всё включено — возьмите только купальник по желанию.</p>
      <p v-if="user" class="opacity-100 mt-1 font-semibold">Здравствуйте, {{ user.first_name || user.username || 'гость' }}!</p>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-wood-600"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mx-4 mt-4 flex justify-between items-start">
      <span>{{ error }}</span>
      <button @click="clearError" class="text-red-700 hover:text-red-900 ml-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <!-- Карточки меню -->
    <div v-else class="p-4 space-y-4">
      <!-- Профиль -->
      <router-link to="/profile" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">👤</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Мой профиль</h3>
            <p class="text-sm text-wood-900">Личная информация и настройки</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Мальчишники и девичники -->
      <router-link to="/bachelor" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">🎉</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Мальчишники и девичники</h3>
            <p class="text-sm text-wood-900">Отпразднуйте важное событие в особенной атмосфере!</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Клубные мероприятия -->
      <router-link to="/club-events" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">🏛</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Клубные мероприятия</h3>
            <p class="text-sm text-wood-900">Регулярные встречи единомышленников в банном формате</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Коллективные программы -->
      <router-link to="/collective-programs" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">👥</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Коллективные программы</h3>
            <p class="text-sm text-wood-900">Тепло, живой пар, общее действие и единение</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Авторские программы -->
      <router-link to="/author-programs" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">✨</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Авторские программы</h3>
            <p class="text-sm text-wood-900">Уникальные техники, глубокие состояния, работа с телом и энергией</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Система лояльности -->
      <router-link to="/loyalty" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">🎁</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Система лояльности</h3>
            <p class="text-sm text-wood-900">Актуальные скидки и специальные предложения</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Я первый раз -->
      <router-link to="/first-time" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">🌟</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Я первый раз</h3>
            <p class="text-sm text-wood-900">Особое предложение для новых гостей</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Корпоративные программы -->
      <router-link to="/corporate" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">🏢</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Корпоративные программы</h3>
            <p class="text-sm text-wood-900">«Отдых, после которого не нужен отдых»</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <!-- Подарочные сертификаты -->
      <router-link to="/certificates" class="card flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-3xl mr-2">🎁</span>
          <div class="ml-4">
            <h3 class="font-semibold text-wood-900">Подарочные сертификаты</h3>
            <p class="text-sm text-wood-900">Подарите заботу, счастье и ресурсное состояние</p>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'HomePage',
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'user', 'programsLoaded', 'eventsLoaded'])
  },
  methods: {
    ...mapActions(useAppStore, ['authenticate', 'loadPrograms', 'loadEvents', 'loadCertificates', 'loadPromos', 'loadLotteryData', 'clearError'])
  },
  async created() {
    console.log('HomePage created, checking authentication...');
    
    // Проверяем, загружены ли уже основные данные
    if (!this.programsLoaded || !this.eventsLoaded) {
      console.log('Authenticating user...');
      await this.authenticate();

      // Добавляем отладку
      console.log('After authentication:', {
        user: this.user,
        isAuthenticated: this.isAuthenticated
      });

      // Загружаем только самые важные данные при первом открытии страницы
      // Остальные данные можно загружать по мере необходимости
      if (this.isAuthenticated) {
        console.log('Loading programs and events...');
        await Promise.allSettled([
          this.loadPrograms(),  // Программы - важны для главной страницы
          this.loadEvents()     // Мероприятия - важны для главной страницы
        ]);

        // Загружаем остальные данные в фоне, чтобы не задерживать отображение
        setTimeout(async () => {
          await Promise.allSettled([
            this.loadCertificates(),
            this.loadPromos(),
            this.loadLotteryData()
          ]);
        }, 100); // Небольшая задержка, чтобы не блокировать основной поток
      }
    } else {
      // Если данные уже загружены, просто проверяем аутентификацию
      if (!this.user) {
        console.log('User not found, authenticating...');
        await this.authenticate();
      }
    }
  }
}
</script>
