<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Программы</h1>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-wood-600"></div>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
      {{ error }}
    </div>

    <div v-else class="space-y-4">
      <!-- Коллективные программы -->
      <div class="card">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-wood-900">👥 <b>Коллективные программы</b></h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-wood-600 text-sm mt-1">Тепло, живой пар, общее действие и единение</p>

        <!-- Список программ -->
        <div v-if="collectivePrograms.length > 0" class="mt-3 space-y-2">
          <div
            v-for="program in collectivePrograms"
            :key="program.id"
            class="bg-wood-50 rounded-lg p-3 cursor-pointer hover:bg-wood-100 transition-colors"
            @click="openProgramDetails(program)"
          >
            <p class="text-wood-700 font-medium">{{ program.name }}</p>
            <p class="text-wood-600 text-sm">{{ truncateText(program.description, 60) }}</p>
          </div>
        </div>
        <div v-else class="mt-3 text-wood-500 text-sm">
          Программы временно недоступны
        </div>

        <div class="mt-3">
          <router-link to="/collective-programs" class="text-wood-600 text-sm font-medium underline cursor-pointer">
            Посмотреть все коллективные программы
          </router-link>
        </div>
      </div>

      <!-- Авторские программы -->
      <div class="card">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-wood-900">✨ <b>Авторские программы</b></h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-wood-600 text-sm mt-1">Уникальные техники, глубокие состояния, работа с телом и энергией</p>

        <!-- Список программ -->
        <div v-if="authorPrograms.length > 0" class="mt-3 space-y-2">
          <div
            v-for="program in authorPrograms"
            :key="program.id"
            class="bg-wood-50 rounded-lg p-3 cursor-pointer hover:bg-wood-100 transition-colors"
            @click="openProgramDetails(program)"
          >
            <p class="text-wood-700 font-medium">{{ program.name }}</p>
            <p class="text-wood-600 text-sm">{{ truncateText(program.description, 60) }}</p>
          </div>
        </div>
        <div v-else class="mt-3 text-wood-500 text-sm">
          Программы временно недоступны
        </div>

        <div class="mt-3">
          <router-link to="/author-programs" class="text-wood-600 text-sm font-medium underline cursor-pointer">
            Смотреть авторские программы
          </router-link>
        </div>
      </div>

      <!-- Банные ритуалы -->
      <div class="card">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-wood-900">🎭 <b>Банные ритуалы</b></h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-wood-600 text-sm mt-1">Традиционные и современные практики</p>

        <!-- Ссылка для бронирования -->
        <div class="mt-3">
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'ritual' }}"
            class="text-wood-600 text-sm font-medium underline cursor-pointer"
          >
            Записаться
          </router-link>
        </div>
      </div>

      <!-- СПА-процедуры -->
      <div class="card">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-wood-900">🌸 <b>СПА-процедуры</b></h2>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </div>
        <p class="text-wood-600 text-sm mt-1">Уход за телом и расслабление</p>

        <!-- Ссылка для бронирования -->
        <div class="mt-3">
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'spa' }}"
            class="text-wood-600 text-sm font-medium underline cursor-pointer"
          >
            Записаться
          </router-link>
        </div>
      </div>
    </div>

    <!-- Модальное окно с деталями программы -->
    <ProgramDetailsModal
      :is-open="showProgramDetails"
      :program="selectedProgram"
      @close="closeProgramDetails"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';
import ProgramDetailsModal from '@/components/ProgramDetailsModal.vue';

export default {
  name: 'ProgramsPage',
  components: {
    ProgramDetailsModal
  },
  data() {
    return {
      showProgramDetails: false,
      selectedProgram: {}
    };
  },
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'programs', 'user']),
    ...mapGetters(useAppStore, ['getProgramsByType']),

    collectivePrograms() {
      return this.getProgramsByType('collective') || []; // Теперь используем lowercase, т.к. стор преобразует enum-значения
    },

    authorPrograms() {
      return this.getProgramsByType('author') || []; // Теперь используем lowercase, т.к. стор преобразует enum-значения
    }
  },
  methods: {
    ...mapActions(useAppStore, ['createBooking']),

    truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    },

    openProgramDetails(program) {
      this.selectedProgram = program;
      this.showProgramDetails = true;
    },

    closeProgramDetails() {
      this.showProgramDetails = false;
      this.selectedProgram = {};
    }
  }
}
</script>