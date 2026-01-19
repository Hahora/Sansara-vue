<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Коллективные программы</h1>
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
        <h2 class="section-title">👥 <b>Коллективные программы</b></h2>
        <p class="text-black text-sm mb-3">Тепло, живой пар, общее действие и единение</p>

        <div class="bg-wood-50 rounded-lg p-3 mb-3">
          <p class="text-black"><b>Что такое коллективные программы:</b></p>
          <p class="text-black">Это банные сессии для компаний, где вы вместе проходите через общие ритуалы и практики. Погружение в традиции русской бани в кругу близких людей.</p>

          <p class="text-black mt-2"><b>Для каких компаний подходят:</b></p>
          <ul class="text-black text-sm list-disc pl-5">
            <li>Друзья и семьи</li>
            <li>Рабочие коллективы</li>
            <li>Творческие группы</li>
            <li>Спортивные команды</li>
            <li>Любые компании от 4 человек</li>
          </ul>

          <p class="text-black mt-2"><b>Популярные программы:</b></p>
          <ul class="text-black text-sm list-disc pl-5">
            <li>🔥 <b>«Пар на весь мир»</b> — классическое парение для компании</li>
            <li>🐉 <b>«Жар Горыныч»</b> — интенсивная программа с контрастами</li>
            <li>🌿 <b>«Банный круг»</b> — мягкое парение с травами и ароматами</li>
          </ul>

          <p class="text-black mt-2"><b>Атмосфера:</b></p>
          <p class="text-black">Живой пар, аромат веников, единение с компанией, ощущение обновления и легкости после программы.</p>
        </div>
      </div>

      <!-- Популярные программы -->
      <div v-if="collectivePrograms.length > 0" class="card">
        <h2 class="section-title">Доступные программы</h2>

        <div class="space-y-3">
          <div
            v-for="program in collectivePrograms"
            :key="program.id"
            class="bg-wood-50 rounded-lg p-3 border border-wood-200 cursor-pointer hover:bg-wood-100 transition-colors"
            @click="openProgramDetails(program)"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-black font-medium">{{ program.name }}</p>
                <p class="text-black text-sm">{{ truncateText(program.description, 80) }}</p>
              </div>
              <span class="text-black font-medium">{{ program.price ? program.price / 100 : 'Цена по запросу' }} ₽</span>
            </div>
          </div>
        </div>
      </div>
      <!-- Популярные программы (если нет данных из API) -->
      <div v-else class="card">
        <h2 class="section-title">Популярные программы</h2>

        <div class="space-y-3">
          <div class="bg-wood-50 rounded-lg p-3">
            <p class="text-black font-medium">🔥 «Пар на весь мир»</p>
            <p class="text-black text-sm">Классическое парение для компании</p>
          </div>

          <div class="bg-wood-50 rounded-lg p-3">
            <p class="text-black font-medium">🐉 «Жар Горыныч»</p>
            <p class="text-black text-sm">Интенсивная программа с контрастами</p>
          </div>

          <div class="bg-wood-50 rounded-lg p-3">
            <p class="text-black font-medium">🌿 «Банный круг»</p>
            <p class="text-black text-sm">Мягкое парение с травами и ароматами</p>
          </div>
        </div>
      </div>

      <!-- Ссылки действий -->
      <div class="space-y-3">
        <router-link to="/programs" class="text-black text-base font-medium underline cursor-pointer block text-center">
          📋 Посмотреть все программы
        </router-link>

        <!-- Ищем программу для коллективных программ -->
        <div v-if="collectiveProgram">
          <router-link
            :to="{
              name: 'BookingWithParams',
              params: {
                programId: collectiveProgram.id,
                programType: collectiveProgram.program_type,
                eventId: collectiveProgram.slug
              }
            }"
            class="btn-primary block text-center"
          >
            📝 Забронировать
          </router-link>
        </div>
        <div v-else>
          <router-link
            :to="{ name: 'BookingWithParams', params: { programType: 'collective' }}"
            class="btn-primary block text-center opacity-70 cursor-not-allowed"
            disabled
          >
            📝 Забронировать
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
  name: 'CollectiveProgramsPage',
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

    collectivePrograms() {
      return this.getProgramsByType('collective') || []; // Теперь используем lowercase, т.к. стор преобразует enum-значения
    },

    // Находим программу для коллективных программ
    collectiveProgram() {
      if (!this.programs || this.programs.length === 0) return null;

      // Сначала ищем программу с типом 'collective'
      let program = this.programs.find(p =>
        p.program_type === 'collective'
      );

      // Если не нашли, ищем по названию
      if (!program) {
        program = this.programs.find(p =>
          p.name.toLowerCase().includes('коллектив') ||
          p.name.toLowerCase().includes('групповой') ||
          p.name.toLowerCase().includes('team') ||
          p.name.toLowerCase().includes('group')
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
