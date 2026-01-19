<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-wood-900">{{ program.name }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <p class="text-wood-900">{{ program.description }}</p>
        </div>

        <div v-if="program.price" class="mb-4">
          <p class="text-wood-900 font-medium">{{ program.price / 100 }} ₽</p>
        </div>

        <div class="mt-6">
          <router-link
            :to="{ name: 'BookingWithParams', params: { programId: program.id, programType: program.program_type, eventId: program.slug }}"
            class="btn-primary w-full text-center py-3 px-4 rounded-lg text-white font-medium transition-colors"
          >
            📝 Забронировать
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgramDetailsModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    program: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
}
</script>