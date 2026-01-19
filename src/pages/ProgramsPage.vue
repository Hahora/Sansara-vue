<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
    <!-- Шапка -->
    <div
      class="bg-gradient-to-br from-[#4e5d51] via-[#5a6d5e] to-[#4e5d51] text-white px-5 py-6"
    >
      <div class="flex items-center mb-4">
        <router-link
          to="/"
          class="flex items-center text-white hover:text-gray-200 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="font-medium">Назад</span>
        </router-link>
      </div>

      <div class="flex items-center">
        <div
          class="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl border-2 border-white border-opacity-30"
        >
          📋
        </div>
        <div class="ml-4 flex-1">
          <h1 class="text-2xl font-bold">Программы</h1>
          <p class="text-white text-opacity-90 text-sm mt-1">
            Наши услуги и предложения
          </p>
        </div>
      </div>
    </div>

    <!-- Индикатор загрузки -->
    <div v-if="isLoading" class="flex justify-center items-center py-16">
      <div class="relative">
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-gray-200"
        ></div>
        <div
          class="animate-spin rounded-full h-12 w-12 border-4 border-[#4e5d51] border-t-transparent absolute top-0 left-0"
        ></div>
      </div>
    </div>

    <!-- Ошибка -->
    <div
      v-else-if="error"
      class="mx-4 mt-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg p-4 shadow-sm"
    >
      <div class="flex items-start">
        <svg
          class="h-5 w-5 text-red-500 mt-0.5 mr-3"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="text-sm text-red-800">{{ error }}</p>
      </div>
    </div>

    <!-- Программы -->
    <div v-else class="px-4 py-5 space-y-4">
      <!-- Коллективные программы -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          class="px-4 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center flex-1">
              <span class="text-2xl mr-3">👥</span>
              <div>
                <h2 class="font-semibold text-gray-900">
                  Коллективные программы
                </h2>
                <p class="text-sm text-gray-600 mt-0.5">
                  Тепло, живой пар, общее действие и единение
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="collectivePrograms.length > 0"
          class="divide-y divide-gray-100"
        >
          <div
            v-for="program in collectivePrograms"
            :key="program.id"
            @click="openProgramDetails(program)"
            class="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <h3 class="font-medium text-gray-900">{{ program.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ truncateText(program.description, 60) }}
            </p>
          </div>
        </div>
        <div v-else class="px-4 py-3">
          <p class="text-sm text-gray-500">Программы временно недоступны</p>
        </div>

        <div class="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <router-link
            to="/collective-programs"
            class="text-[#4e5d51] text-sm font-medium hover:text-[#3d4a40] transition-colors"
          >
            Посмотреть все программы →
          </router-link>
        </div>
      </div>

      <!-- Авторские программы -->
      <div
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div
          class="px-4 py-4 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-gray-100"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center flex-1">
              <span class="text-2xl mr-3">✨</span>
              <div>
                <h2 class="font-semibold text-gray-900">Авторские программы</h2>
                <p class="text-sm text-gray-600 mt-0.5">
                  Уникальные техники, глубокие состояния
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="authorPrograms.length > 0" class="divide-y divide-gray-100">
          <div
            v-for="program in authorPrograms"
            :key="program.id"
            @click="openProgramDetails(program)"
            class="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <h3 class="font-medium text-gray-900">{{ program.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ truncateText(program.description, 60) }}
            </p>
          </div>
        </div>
        <div v-else class="px-4 py-3">
          <p class="text-sm text-gray-500">Программы временно недоступны</p>
        </div>

        <div class="px-4 py-3 bg-gray-50 border-t border-gray-100">
          <router-link
            to="/author-programs"
            class="text-[#4e5d51] text-sm font-medium hover:text-[#3d4a40] transition-colors"
          >
            Смотреть авторские программы →
          </router-link>
        </div>
      </div>

      <!-- Банные ритуалы -->
      <router-link
        :to="{ name: 'BookingWithParams', params: { programType: 'ritual' } }"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🎭</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">
              Банные ритуалы
            </h3>
            <p class="text-sm text-gray-500 mt-0.5 truncate">
              Традиционные и современные практики
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>

      <!-- СПА-процедуры -->
      <router-link
        :to="{ name: 'BookingWithParams', params: { programType: 'spa' } }"
        class="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md"
      >
        <div class="flex items-center">
          <div
            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl flex items-center justify-center"
          >
            <span class="text-2xl">🌸</span>
          </div>
          <div class="ml-4 flex-1 min-w-0">
            <h3 class="font-semibold text-gray-900 text-base">СПА-процедуры</h3>
            <p class="text-sm text-gray-500 mt-0.5 truncate">
              Уход за телом и расслабление
            </p>
          </div>
          <svg
            class="h-5 w-5 text-gray-400 flex-shrink-0 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </router-link>
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
import { mapState, mapGetters, mapActions } from "pinia";
import { useAppStore } from "@/stores/appStore";
import ProgramDetailsModal from "@/components/ProgramDetailsModal.vue";

export default {
  name: "ProgramsPage",
  components: {
    ProgramDetailsModal,
  },
  data() {
    return {
      showProgramDetails: false,
      selectedProgram: {},
    };
  },
  computed: {
    ...mapState(useAppStore, ["isLoading", "error", "programs", "user"]),
    ...mapGetters(useAppStore, ["getProgramsByType"]),
    collectivePrograms() {
      return this.getProgramsByType("collective") || [];
    },
    authorPrograms() {
      return this.getProgramsByType("author") || [];
    },
  },
  methods: {
    ...mapActions(useAppStore, ["createBooking"]),
    truncateText(text, maxLength) {
      if (!text) return "";
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    },
    openProgramDetails(program) {
      this.selectedProgram = program;
      this.showProgramDetails = true;
    },
    closeProgramDetails() {
      this.showProgramDetails = false;
      this.selectedProgram = {};
    },
  },
};
</script>

<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}
</style>
