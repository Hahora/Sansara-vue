<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Корпоративные программы</h1>
    </div>
    
    <div class="space-y-4">
      <!-- Описание -->
      <div class="card">
        <h2 class="section-title">🏢 <b>Корпоративные программы</b></h2>
        <p class="text-black text-sm italic mb-3">«Отдых, после которого не нужен отдых»</p>

        <div class="bg-gray-50 rounded-lg p-3 mb-3">
          <p class="text-black font-medium"><b>Что мы делаем для компаний:</b></p>
        </div>

        <div class="space-y-2">
          <div class="flex items-start">
            <span class="text-indigo-500 mr-2 font-bold">🎯</span>
            <span class="text-black"><strong>Корпоративные банные ретриты</strong> — Полноценный отдых для команды с программой и организацией</span>
          </div>
          <div class="flex items-start">
            <span class="text-indigo-500 mr-2 font-bold">👥</span>
            <span class="text-black"><strong>Командные программы</strong> — Тимбилдинг в банном формате</span>
          </div>
          <div class="flex items-start">
            <span class="text-indigo-500 mr-2 font-bold">🎁</span>
            <span class="text-black"><strong>Подарочные сертификаты для сотрудников</strong> — С возможностью оплаты с р/с</span>
          </div>
          <div class="flex items-start">
            <span class="text-indigo-500 mr-2 font-bold">🎄</span>
            <span class="text-black"><strong>Новогодние лимитированные пакеты</strong> — Праздничные программы для коллективов</span>
          </div>
        </div>
      </div>

      <!-- Преимущества -->
      <div class="card">
        <h2 class="section-title">✅ <b>Преимущества работы с нами</b></h2>

        <div class="space-y-2">
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Оплата с расчётного счёта</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Закрывающие документы</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Полная организация под ключ</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Возможность выезда большой группой</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Индивидуальные условия для компаний</span>
          </div>
        </div>
      </div>
      
      <!-- Кнопки действий -->
      <div class="space-y-3">
        <!-- Ищем программу для корпоративных программ -->
        <div v-if="corporateProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: corporateProgram.id,
                programType: corporateProgram.program_type,
                eventId: corporateProgram.slug
              }
            }"
            class="btn-primary block text-center"
          >
            📝 Забронировать корпоративную программу
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'corporate' }}"
            class="btn-primary block text-center opacity-70 cursor-not-allowed"
            disabled
          >
            📝 Забронировать корпоративную программу
          </router-link>
          <p class="text-red-500 text-xs mt-1 text-center">
            Программа временно недоступна
          </p>
        </div>

        <button class="btn-secondary">
          👨‍💼 Связаться с менеджером
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'CorporatePage',
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'programs', 'programsLoaded']),

    // Находим программу для корпоративных программ
    corporateProgram() {
      if (!this.programs || this.programs.length === 0) return null;

      // Сначала ищем программу с типом 'corporate'
      let program = this.programs.find(p =>
        p.program_type === 'corporate'
      );

      // Если не нашли, ищем по названию
      if (!program) {
        program = this.programs.find(p =>
          p.name.toLowerCase().includes('корпоратив') ||
          p.name.toLowerCase().includes('team building') ||
          p.name.toLowerCase().includes('business') ||
          p.name.toLowerCase().includes('company')
        );
      }

      return program || null;
    }
  },
  async mounted() {
    // Загружаем программы, если они еще не загружены
    if (!this.programsLoaded && this.loadPrograms) {
      await this.loadPrograms();
    }
  },
  methods: {
    ...mapActions(useAppStore, ['loadPrograms'])
  }
}
</script>