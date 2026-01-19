<template>
  <div class="p-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Бронирования</h1>
        <div class="flex space-x-3">
          <button class="btn-secondary">
            Обновить список
          </button>
        </div>
      </div>

      <!-- Фильтры -->
      <div class="card p-4 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="form-label">Статус</label>
            <select class="form-input">
              <option value="">Все</option>
              <option value="PENDING">Ожидает подтверждения</option>
              <option value="CONFIRMED">Подтверждено</option>
              <option value="CANCELLED">Отменено</option>
              <option value="COMPLETED">Завершено</option>
            </select>
          </div>
          <div>
            <label class="form-label">Тип программы</label>
            <select class="form-input">
              <option value="">Все</option>
              <option value="bachelor">Мальчишник</option>
              <option value="bachelorette">Девичник</option>
              <option value="collective">Коллективная</option>
              <option value="author">Авторская</option>
              <option value="club_event">Клубное мероприятие</option>
            </select>
          </div>
          <div>
            <label class="form-label">Дата</label>
            <input type="date" class="form-input" />
          </div>
          <div>
            <label class="form-label">Поиск</label>
            <input type="text" class="form-input" placeholder="Имя, телефон..." />
          </div>
        </div>
      </div>

      <!-- Список бронирований в виде карточек -->
      <div class="space-y-4">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="card flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          @click="openDetailsModal(booking)"
        >
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-wood-900">#{{ booking.id }} {{ booking.contact_name }}</h3>
                <p class="text-sm text-wood-600">{{ booking.contact_phone }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium">{{ getProgramTypeName(booking.program_type) }}</p>
                <p class="text-sm text-wood-600">{{ formatDate(booking.booking_date) }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between mt-2">
              <div class="flex items-center space-x-4">
                <span :class="getStatusClass(booking.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ getStatusName(booking.status) }}
                </span>
                <span class="text-sm text-wood-600">Участники: {{ booking.participants_count }}</span>
              </div>

              <div class="flex items-center space-x-2">
                <button
                  @click.stop="confirmBooking(booking.id)"
                  v-if="booking.status === 'PENDING'"
                  class="text-green-600 hover:text-green-900 text-sm"
                >
                  Подтвердить
                </button>
                <button
                  @click.stop="cancelBooking(booking.id)"
                  v-if="booking.status === 'PENDING' || booking.status === 'CONFIRMED'"
                  class="text-red-600 hover:text-red-900 text-sm"
                >
                  Отменить
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-wood-900" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Пагинация -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Назад</a>
          <a href="#" class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Вперед</a>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Показано <span class="font-medium">1</span> до <span class="font-medium">10</span> из
              <span class="font-medium">20</span> результатов
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">‹</a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">1</a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">2</a>
              <a href="#" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">3</a>
              <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">›</a>
            </nav>
          </div>
        </div>
      </div>

      <!-- Модальное окно с деталями бронирования -->
      <BookingDetailsModal
        :is-open="showDetailsModal"
        :booking="selectedBooking"
        @close="closeDetailsModal"
        @confirmed="onBookingConfirmed"
        @cancelled="onBookingCancelled"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';
import BookingDetailsModal from '@/components/BookingDetailsModal.vue';

export default {
  name: 'AdminBookingsPage',
  components: {
    BookingDetailsModal
  },
  data() {
    return {
      showDetailsModal: false,
      selectedBooking: null
    };
  },
  computed: {
    ...mapState(useAppStore, ['bookings'])
  },
  methods: {
    ...mapActions(useAppStore, ['loadBookings', 'updateBookingStatus']),

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    },

    getProgramTypeName(type) {
      const types = {
        'bachelor': 'Мальчишник',
        'bachelorette': 'Девичник',
        'collective': 'Коллективная',
        'author': 'Авторская',
        'club_event': 'Клубное мероприятие'
      };
      return types[type] || type;
    },

    getStatusName(status) {
      const statuses = {
        'PENDING': 'Ожидает',
        'CONFIRMED': 'Подтверждено',
        'CANCELLED': 'Отменено',
        'COMPLETED': 'Завершено'
      };
      return statuses[status] || status;
    },

    getStatusClass(status) {
      const classes = {
        'PENDING': 'bg-yellow-100 text-yellow-800',
        'CONFIRMED': 'bg-green-100 text-green-800',
        'CANCELLED': 'bg-red-100 text-red-800',
        'COMPLETED': 'bg-blue-100 text-blue-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },

    async confirmBooking(bookingId) {
      try {
        await this.updateBookingStatus(bookingId, 'CONFIRMED');
        // Обновляем список бронирований
        await this.loadBookings();
      } catch (error) {
        console.error('Ошибка при подтверждении бронирования:', error);
      }
    },

    async cancelBooking(bookingId) {
      try {
        await this.updateBookingStatus(bookingId, 'CANCELLED');
        // Обновляем список бронирований
        await this.loadBookings();
      } catch (error) {
        console.error('Ошибка при отмене бронирования:', error);
      }
    },

    openDetailsModal(booking) {
      this.selectedBooking = booking;
      this.showDetailsModal = true;
    },

    closeDetailsModal() {
      this.showDetailsModal = false;
      this.selectedBooking = null;
    },

    async onBookingConfirmed(bookingId) {
      // Обновляем список бронирований после подтверждения
      await this.loadBookings();
    },

    async onBookingCancelled(bookingId) {
      // Обновляем список бронирований после отмены
      await this.loadBookings();
    }
  },

  async mounted() {
    // Загружаем бронирования при монтировании компонента
    await this.loadBookings();
  }
}
</script>