<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Клубные мероприятия</h1>
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
      <!-- Банный клуб С. Хачатурьяна -->
      <div class="card">
        <h2 class="section-title">♨️ Банный клуб С. Хачатурьяна</h2>
        <p class="text-black text-sm mb-3">Авторский банный клуб от основателя САНСАРЫ</p>

        <div class="bg-gray-50 rounded-lg p-3 mb-3">
          <p class="text-black"><b>Что это за формат:</b></p>
          <p class="text-black text-sm">Авторский банный клуб от основателя и идеолога САНСАРЫ. Глубокое погружение в банную культуру с философским подходом.</p>

          <p class="text-black mt-2"><b>Как проходит встреча:</b></p>
          <ul class="text-black text-sm list-disc pl-5">
            <li>Знакомство участников</li>
            <li>Лекционная часть о банных традициях</li>
            <li>Практика парения от мастера</li>
            <li>Обсуждение, чай, нетворкинг</li>
          </ul>

          <p class="text-black mt-2"><b>Для кого подходит:</b></p>
          <p class="text-black text-sm">Для тех, кто хочет понять суть банной культуры, найти единомышленников и получить опыт от первоисточника.</p>

          <p class="text-black mt-2"><b>Особенности:</b></p>
          <ul class="text-black text-sm list-disc pl-5">
            <li>Камерная атмосфера</li>
            <li>Авторские техники парения</li>
            <li>Передача знаний и традиций</li>
            <li>Сообщество постоянных участников</li>
          </ul>
        </div>

        <!-- Ищем программу для клубных мероприятий -->
        <div v-if="clubEventProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: clubEventProgram.id,
                programType: clubEventProgram.program_type,
                eventId: clubEventProgram.slug
              }
            }"
            class="btn-primary block text-center"
          >
            📝 Записаться
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'club_event' }}"
            class="btn-primary block text-center opacity-70 cursor-not-allowed"
            disabled
          >
            📝 Записаться
          </router-link>
          <p class="text-red-500 text-xs mt-1 text-center">
            Программа временно недоступна
          </p>
        </div>
      </div>

      <!-- Бизнес-баня с клубом МОСТ -->
      <div class="card">
        <h2 class="section-title">💼 Бизнес-баня с клубом МОСТ</h2>
        <p class="text-black text-sm mb-3">Нетворкинг в банном формате для предпринимателей</p>

        <div class="bg-gray-50 rounded-lg p-3 mb-3">
          <p class="text-black"><b>Что это за формат:</b></p>
          <p class="text-black text-sm">Нетворкинг в банном формате для предпринимателей и бизнесменов. Деловые знакомства в неформальной обстановке.</p>

          <p class="text-black mt-2"><b>Как проходит встреча:</b></p>
          <ul class="text-black text-sm list-disc pl-5">
            <li>Сбор участников, знакомство</li>
            <li>Банная часть с общением</li>
            <li>Нетворкинг-сессия</li>
            <li>Обмен контактами и опытом</li>
            <li>Совместный чай</li>
          </ul>

          <p class="text-black mt-2"><b>Для кого подходит:</b></p>
          <p class="text-black text-sm">Предприниматели, топ-менеджеры, фрилансеры — все, кто ценит деловые связи и нестандартные форматы общения.</p>

          <p class="text-black mt-2"><b>Особенности:</b></p>
          <ul class="text-black text-sm list-disc pl-5">
            <li>Проверенное сообщество</li>
            <li>Качественный нетворкинг</li>
            <li>Баланс дела и отдыха</li>
            <li>Регулярные встречи</li>
          </ul>
        </div>

        <!-- Ищем программу для клубных мероприятий -->
        <div v-if="clubEventProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: clubEventProgram.id,
                programType: clubEventProgram.program_type,
                eventId: clubEventProgram.slug
              }
            }"
            class="btn-primary block text-center"
          >
            📝 Записаться
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'club_event' }}"
            class="btn-primary block text-center opacity-70 cursor-not-allowed"
            disabled
          >
            📝 Записаться
          </router-link>
          <p class="text-red-500 text-xs mt-1 text-center">
            Программа временно недоступна
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'ClubEventsPage',
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'events', 'programs', 'programsLoaded']),


    // Находим программу для клубных мероприятий
    clubEventProgram() {
      if (!this.programs || this.programs.length === 0) return null;

      // Сначала ищем программу с типом 'club_event'
      let program = this.programs.find(p =>
        p.program_type === 'club_event'
      );

      // Если не нашли, ищем по названию
      if (!program) {
        program = this.programs.find(p =>
          p.name.toLowerCase().includes('клуб') ||
          p.name.toLowerCase().includes('банный')
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
    ...mapActions(useAppStore, ['loadPrograms']),

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
  }
}
</script>