<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">События</h1>
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
      <!-- Список всех событий -->
      <div>
        <h2 class="section-title">📅 Все события</h2>
        <p class="text-black text-sm mb-3">Ближайшие мероприятия в САНСАРЕ</p>

        <!-- Список всех мероприятий -->
        <div v-if="allEvents.length > 0" class="space-y-3">
          <div
            v-for="event in allEvents"
            :key="event.id"
            class="card flex items-center justify-between cursor-pointer"
            @click="navigateToEventType(event)"
          >
            <div class="flex items-center">
              <div class="flex-1">
                <h3 class="font-semibold text-wood-900">{{ event.title }}</h3>
                <p class="text-sm text-wood-900">{{ formatDate(event.event_date) }}</p>
              </div>
              <span
                :class="event.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                class="text-xs px-2 py-1 rounded-full mr-2"
              >
                {{ event.is_active ? 'Активно' : 'Неактивно' }}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </div>
        </div>
        <div v-else class="bg-gray-50 rounded-lg p-3 mb-3">
          <p class="text-black font-medium">В ближайшее время нет запланированных мероприятий</p>
          <p class="text-black text-sm mt-1">Следите за анонсами в нашем канале!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'EventsPage',
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'events', 'programs', 'programsLoaded']),

    allEvents() {
      // Возвращаем все события
      return this.events || [];
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

    navigateToEventType(event) {
      // Определяем тип события и переходим на соответствующую страницу
      if (event.program?.program_type === 'bachelor' ||
          event.program?.program_type === 'bachelorette' ||
          event.title.toLowerCase().includes('мальчишник') ||
          event.title.toLowerCase().includes('девичник')) {
        this.$router.push('/bachelor');
      } else if (event.program?.program_type === 'club_event' ||
                 event.title.toLowerCase().includes('клуб') ||
                 event.title.toLowerCase().includes('мероприятие')) {
        this.$router.push('/club-events');
      } else if (event.program?.program_type === 'collective' ||
                 event.title.toLowerCase().includes('коллективн')) {
        this.$router.push('/collective-programs');
      } else if (event.program?.program_type === 'author' ||
                 event.title.toLowerCase().includes('авторск')) {
        this.$router.push('/author-programs');
      } else {
        // Для остальных событий переходим на страницу бронирования
        this.$router.push({
          name: 'BookingWithParams',
          params: {
            programId: event.program?.id || null,
            programType: event.program?.program_type || 'event',
            eventId: event.id
          }
        });
      }
    }
  }
}
</script>