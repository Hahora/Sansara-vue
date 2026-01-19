<template>
  <div class="min-h-screen bg-gray-50">
    <div class="p-6">
      <div class="max-w-6xl mx-auto">
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-900">Админ-панель</h1>
          <p class="text-gray-600">Управление системой САНСАРЫ</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Карточка Бронирования -->
          <router-link to="/admin/bookings" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Бронирования</h3>
              <p class="text-sm text-wood-600">Управление и подтверждение бронирований</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Пользователи -->
          <router-link to="/admin/users" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Пользователи</h3>
              <p class="text-sm text-wood-600">Управление пользователями системы</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Промокоды -->
          <router-link to="/admin/promocodes" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Промокоды</h3>
              <p class="text-sm text-wood-600">Создание и управление промокодами</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Лотерея -->
          <router-link to="/admin/lottery" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Лотерея</h3>
              <p class="text-sm text-wood-600">Управление лотереей и призами</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Настройки -->
          <router-link to="/admin/settings" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Настройки</h3>
              <p class="text-sm text-wood-600">Общие настройки системы</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Контент -->
          <router-link to="/admin/content" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Контент</h3>
              <p class="text-sm text-wood-600">Редактирование контента сайта</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Календарь -->
          <router-link to="/admin/calendar" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Календарь</h3>
              <p class="text-sm text-wood-600">Управление событиями и расписанием</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>

          <!-- Карточка Рассылка -->
          <router-link to="/admin/mailing" class="card flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
            <div>
              <h3 class="font-semibold text-wood-900 mb-2">Рассылка</h3>
              <p class="text-sm text-wood-600">Создание и отправка рассылок</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage'
}
</script>