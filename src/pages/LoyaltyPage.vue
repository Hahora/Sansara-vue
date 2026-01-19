<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Система лояльности</h1>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4e5d51]"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
      {{ error }}
    </div>

    <div v-else class="space-y-4">
      <!-- Акции и скидки -->
      <div class="card">
        <h2 class="section-title">🎁 <b>Система лояльности</b></h2>

        <div class="space-y-3">
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg p-3">
            <p class="text-blue-800 font-medium">💎 –20% на программу «Очищение и сила»</p>
            <p class="text-blue-600 text-sm">Для первого посещения</p>
          </div>

          <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-3">
            <p class="text-green-800 font-medium">🎂 Подарок именинникам</p>
            <p class="text-green-600 text-sm">Чан на Сибирском огне или скидка 10%</p>
          </div>

          <div class="bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-100 rounded-lg p-3">
            <p class="text-purple-800 font-medium">🔥 Чан на день рождения</p>
            <p class="text-purple-600 text-sm">Подарок при первом визите</p>
          </div>

          <div class="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-100 rounded-lg p-3">
            <p class="text-amber-800 font-medium">🎟 Спецусловия на клубные мероприятия</p>
            <p class="text-amber-600 text-sm">Для постоянных гостей</p>
          </div>
        </div>

        <p class="text-black text-sm mt-3 italic">Актуальные скидки и специальные предложения:</p>
      </div>

      <!-- Промокоды -->
      <div class="card">
        <h2 class="section-title">Доступные промокоды</h2>

        <!-- Список промокодов -->
        <div v-if="activePromos.length > 0" class="space-y-3">
          <div
            v-for="promo in activePromos"
            :key="promo.id"
            class="bg-gray-50 rounded-lg p-3"
          >
            <p class="text-black font-medium">🎟 <code>{{ promo.code }}</code> — скидка
              <b>{{ promo.discount_percent }}%</b>
              <span v-if="promo.discount_amount">или {{ promo.discount_amount / 100 }} ₽</span>
            </p>

            <div v-if="promo.for_first_visit_only" class="text-xs text-indigo-600 mt-1">
              Только для первого визита
            </div>

            <div v-if="promo.max_uses" class="text-xs text-black mt-1">
              Осталось использований: {{ promo.max_uses - promo.current_uses }}
            </div>
          </div>
        </div>
        <div v-else class="bg-gray-50 rounded-lg p-3 mb-3">
          <p class="text-black font-medium">К сожалению, сейчас нет доступных промокодов</p>
          <p class="text-black text-sm mt-1">Следите за нашими новостями — мы регулярно проводим акции!</p>
        </div>

        <router-link
          :to="{ name: 'BookingWithParams', params: { programType: 'discount' }}"
          class="btn-secondary block text-center"
        >
          📝 Забронировать с промокодом
        </router-link>
      </div>

      <!-- Кнопки действий -->
      <div class="space-y-3">
        <router-link
          :to="{ name: 'AuthorPrograms' }"
          class="btn-primary block text-center"
        >
          📋 Подробнее о программах
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'LoyaltyPage',
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'promos']),
    ...mapGetters(useAppStore, ['getActivePromos']),

    activePromos() {
      return this.promos.filter(promo => promo.is_active) || [];
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    }
  }
}
</script>