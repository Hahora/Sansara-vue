<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Авторские программы</h1>
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
      <!-- Информация о программах -->
      <div class="card">
        <h2 class="section-title">✨ <b>Авторские программы</b></h2>
        <p class="text-black text-sm mb-3">Уникальные техники, глубокие состояния, работа с телом и энергией</p>

        <div class="bg-wood-50 rounded-lg p-3 mb-3">
          <p class="text-black"><b>Что такое авторские программы:</b></p>
          <p class="text-black">Это индивидуальные или парные сессии с мастером, созданные для глубокого расслабления и обновления. Каждая программа — авторская разработка наших мастеров.</p>

          <p class="text-black mt-2"><b>Программы подбираются под ваше состояние и запрос.</b></p>
        </div>
      </div>

      <!-- Что вы получите -->
      <div class="card">
        <h2 class="section-title">Что вы получите</h2>

        <div class="space-y-2">
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Полное расслабление тела</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Освобождение от напряжения и стресса</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Погружение в медитативное состояние</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Ощущение обновления и перезагрузки</span>
          </div>
          <div class="flex items-start">
            <span class="text-green-700 text-2xl mr-2">✓</span>
            <span class="text-black">Работа с дыханием и телом</span>
          </div>
        </div>
      </div>

      <!-- Элементы программ -->
      <div class="card">
        <h2 class="section-title">Элементы программ</h2>

        <div class="grid grid-cols-2 gap-2">
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">🤲 Парение в четыре руки</p>
          </div>
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">🎭 Банные церемонии</p>
          </div>
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">🌿 Фито-паузы с травами</p>
          </div>
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">🔔 Звуковая терапия</p>
          </div>
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">🌸 Аромапрактики</p>
          </div>
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">💧 Купель и контрасты</p>
          </div>
          <div class="bg-wood-50 rounded-lg p-2 text-center">
            <p class="text-black text-sm">♨️ Глубокий догрев</p>
          </div>
        </div>
      </div>

      <!-- Список авторских программ -->
      <div v-if="authorPrograms.length > 0" class="card">
        <h2 class="section-title">Доступные авторские программы</h2>

        <div class="space-y-3">
          <div
            v-for="program in authorPrograms"
            :key="program.id"
            class="bg-wood-50 rounded-lg p-3 border border-wood-200 cursor-pointer hover:bg-wood-100 transition-colors"
            @click="openProgramDetails(program)"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-black font-medium">{{ program.name }}</p>
                <p class="text-black text-sm">{{ truncateText(program.description, 80) }}</p>
              </div>
              <span class="text-black font-medium whitespace-nowrap">{{ program.price ? program.price / 100 : 'По запросу' }} ₽</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Ссылки действий -->
      <div class="space-y-3">
        <!-- Ищем программу для авторских программ -->
        <div v-if="authorProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: authorProgram.id,
                programType: authorProgram.program_type,
                eventId: authorProgram.slug
              }
            }"
            class="btn-primary block text-center text-black font-semibold"
          >
            🎯 Подобрать программу под моё состояние
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'author' }}"
            class="btn-primary block text-center text-black font-semibold opacity-70 cursor-not-allowed"
            disabled
          >
            🎯 Подобрать программу под моё состояние
          </router-link>
          <p class="text-red-500 text-xs mt-1 text-center">
            Программа временно недоступна
          </p>
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
  name: 'AuthorProgramsPage',
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
    ...mapState(useAppStore, ['isLoading', 'error', 'programs', 'user', 'programsLoaded']),
    ...mapGetters(useAppStore, ['getProgramsByType']),

    authorPrograms() {
      return this.getProgramsByType('author') || []; // Теперь используем lowercase, т.к. стор преобразует enum-значения
    },

    // Находим программу для авторских программ
    authorProgram() {
      if (!this.programs || this.programs.length === 0) return null;

      // Сначала ищем программу с типом 'author'
      let program = this.programs.find(p =>
        p.program_type === 'author'
      );

      // Если не нашли, ищем по названию
      if (!program) {
        program = this.programs.find(p =>
          p.name.toLowerCase().includes('автор') ||
          p.name.toLowerCase().includes('мастер') ||
          p.name.toLowerCase().includes('индивидуальн') ||
          p.name.toLowerCase().includes('author') ||
          p.name.toLowerCase().includes('master')
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