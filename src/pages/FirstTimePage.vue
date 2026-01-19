<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Я первый раз</h1>
    </div>
    
    <div class="space-y-4">
      <!-- Приветствие -->
      <div class="card">
        <h2 class="section-title">🌟 <b>Добро пожаловать в САНСАРУ!</b></h2>
        <p class="text-black text-sm mb-3">Мы рады, что вы с нами впервые!</p>

        <div class="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-lg p-4 mb-3">
          <p class="text-black">САНСАРА — первый городской ретрит-центр</p>
          <div class="mt-2 space-y-1">
            <div class="flex items-center">
              <span class="text-green-700 text-2xl mr-2">✓</span>
              <span class="text-black">Безопасно и бережно</span>
            </div>
            <div class="flex items-center">
              <span class="text-green-700 text-2xl mr-2">✓</span>
              <span class="text-black">Без алкоголя</span>
            </div>
            <div class="flex items-center">
              <span class="text-green-700 text-2xl mr-2">✓</span>
              <span class="text-black">Всё включено</span>
            </div>
            <div class="flex items-center">
              <span class="text-green-700 text-2xl mr-2">✓</span>
              <span class="text-black">Нужен только купальник (по желанию)</span>
            </div>
          </div>
        </div>

        <p class="text-black text-sm italic">Здесь:</p>
        <div class="mt-2 space-y-1">
          <div class="flex items-center">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Безопасно и бережно</span>
          </div>
          <div class="flex items-center">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Без алкоголя</span>
          </div>
          <div class="flex items-center">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Всё включено</span>
          </div>
          <div class="flex items-center">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Нужен только купальник (по желанию)</span>
          </div>
        </div>
      </div>

      <!-- Особое предложение -->
      <div class="card">
        <h2 class="section-title">🎁 <b>Особое предложение для новых гостей:</b></h2>

        <div class="space-y-3">
          <div class="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-lg p-3">
            <p class="text-black font-medium">🎁 Скидка –20%</p>
            <p class="text-black text-sm">на первое посещение</p>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-3">
            <p class="text-black font-medium">🎁 Подарок</p>
            <p class="text-black text-sm">— мини-ритуал от мастера</p>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-100 rounded-lg p-3">
            <p class="text-black font-medium">🎁 Персональный подбор</p>
            <p class="text-black text-sm">программы под ваше состояние</p>
          </div>
        </div>

        <p class="text-black text-sm mt-3 italic">Позвольте нам позаботиться о вашем первом знакомстве с банной культурой.</p>
      </div>
      
      <!-- Кнопки действий -->
      <div class="space-y-3">
        <router-link
          :to="{ name: 'BookingWithParams', params: { programType: 'first_time' }}"
          class="btn-primary block text-center"
        >
          🎁 Получить предложение
        </router-link>

        <router-link
          :to="{ name: 'BookingWithParams', params: { programType: 'consultation' }}"
          class="btn-secondary block text-center"
        >
          👨‍💼 Хочу консультацию
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstTimePage'
}
</script>