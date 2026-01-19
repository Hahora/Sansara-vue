<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-wood-900">{{ event.title }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <p class="text-wood-900">{{ event.description }}</p>
        </div>

        <div v-if="event.program" class="mb-4">
          <h4 class="text-md font-semibold text-wood-900">Программа:</h4>
          <p class="text-wood-900">{{ event.program.name }}</p>
          <p class="text-wood-900 text-sm mt-1">{{ event.program.description }}</p>
        </div>

        <div class="mb-4">
          <h4 class="text-md font-semibold text-wood-900">Дата и время:</h4>
          <p class="text-wood-900">{{ formatDate(event.event_date) }}</p>
        </div>

        <div class="mb-4">
          <h4 class="text-md font-semibold text-wood-900">Доступные места:</h4>
          <p class="text-wood-900">{{ event.slots_available }} из {{ event.slots_total }}</p>
        </div>

        <div class="mt-6">
          <router-link
            :to="{ name: 'BookingWithParams', params: { programId: event.program_id, programType: event.program?.program_type || event.program_type, eventId: event.program?.slug }}"
            class="btn-primary w-full text-center py-3 px-4 rounded-lg text-white font-medium transition-colors"
          >
            Забронировать
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventDetailsModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    event: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    },
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
    }
  }
}
</script>