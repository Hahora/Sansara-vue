<template>
  <nav class="bg-[#4e5d51] border-b border-gray-300 px-4 py-3 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="flex items-center space-x-4">
        <h1 class="text-white font-bold text-lg">Админ-панель</h1>
      </div>
      
      <div class="flex items-center space-x-2 md:space-x-4">
        <router-link 
          to="/admin/bookings" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Бронирования
        </router-link>
        <router-link 
          to="/admin/users" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Пользователи
        </router-link>
        <router-link 
          to="/admin/promocodes" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Промокоды
        </router-link>
        <router-link 
          to="/admin/lottery" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Лотерея
        </router-link>
        <router-link 
          to="/admin/settings" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Настройки
        </router-link>
        <router-link 
          to="/admin/content" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Контент
        </router-link>
        <router-link 
          to="/admin/calendar" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Календарь
        </router-link>
        <router-link 
          to="/admin/mailing" 
          class="text-gray-200 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Рассылка
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AdminNavigation'
}
</script>