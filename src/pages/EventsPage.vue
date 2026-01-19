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
          📅
        </div>
        <div class="ml-4 flex-1">
          <h1 class="text-2xl font-bold">События</h1>
          <p class="text-white text-opacity-90 text-sm mt-1">
            Ближайшие мероприятия в САНСАРЕ
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

    <!-- Список событий -->
    <div v-else class="px-4 py-5">
      <!-- Есть события -->
      <div v-if="allEvents.length > 0" class="space-y-3">
        <div
          v-for="event in allEvents"
          :key="event.id"
          @click="navigateToEventType(event)"
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all duration-200 active:scale-98 hover:shadow-md cursor-pointer"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center mb-2">
                <span class="text-2xl mr-2">📅</span>
                <h3 class="font-semibold text-gray-900">{{ event.title }}</h3>
              </div>
              <div class="flex items-center text-sm text-gray-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ formatDate(event.event_date) }}
              </div>
              <div class="flex items-center">
                <span
                  :class="
                    event.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  "
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  <span
                    :class="event.is_active ? 'bg-green-400' : 'bg-red-400'"
                    class="w-1.5 h-1.5 rounded-full mr-1.5"
                  ></span>
                  {{ event.is_active ? "Активно" : "Неактивно" }}
                </span>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400 flex-shrink-0 ml-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- Нет событий -->
      <div v-else class="text-center py-12">
        <div
          class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-4xl">📅</span>
        </div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Нет запланированных мероприятий
        </h3>
        <p class="text-sm text-gray-600 mb-6">
          В ближайшее время нет доступных событий.<br />Следите за анонсами в
          нашем канале!
        </p>
        <router-link
          to="/"
          class="inline-flex items-center px-6 py-3 bg-[#4e5d51] text-white rounded-xl font-medium hover:bg-[#3d4a40] transition-colors"
        >
          На главную
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useAppStore } from "@/stores/appStore";

export default {
  name: "EventsPage",
  computed: {
    ...mapState(useAppStore, [
      "isLoading",
      "error",
      "events",
      "programs",
      "programsLoaded",
    ]),
    allEvents() {
      return this.events || [];
    },
  },
  async mounted() {
    if (!this.programsLoaded && this.loadPrograms) {
      await this.loadPrograms();
    }
  },
  methods: {
    ...mapActions(useAppStore, ["loadPrograms"]),
    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    navigateToEventType(event) {
      if (
        event.program?.program_type === "bachelor" ||
        event.program?.program_type === "bachelorette" ||
        event.title.toLowerCase().includes("мальчишник") ||
        event.title.toLowerCase().includes("девичник")
      ) {
        this.$router.push("/bachelor");
      } else if (
        event.program?.program_type === "club_event" ||
        event.title.toLowerCase().includes("клуб") ||
        event.title.toLowerCase().includes("мероприятие")
      ) {
        this.$router.push("/club-events");
      } else if (
        event.program?.program_type === "collective" ||
        event.title.toLowerCase().includes("коллективн")
      ) {
        this.$router.push("/collective-programs");
      } else if (
        event.program?.program_type === "author" ||
        event.title.toLowerCase().includes("авторск")
      ) {
        this.$router.push("/author-programs");
      } else {
        this.$router.push({
          name: "BookingWithParams",
          params: {
            programId: event.program?.id || null,
            programType: event.program?.program_type || "event",
            eventId: event.id,
          },
        });
      }
    },
  },
};
</script>

<style scoped>
.active\:scale-98:active {
  transform: scale(0.98);
}
</style>
