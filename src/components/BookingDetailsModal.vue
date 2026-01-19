<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-wood-900">Детали бронирования #{{ booking?.id }}</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="booking" class="space-y-4">
          <!-- Информация о клиенте -->
          <div class="card p-4">
            <h4 class="font-semibold text-wood-900 mb-2">Клиент</h4>
            <div class="space-y-1">
              <p class="text-sm"><span class="font-medium">Имя:</span> {{ booking.contact_name }}</p>
              <p class="text-sm"><span class="font-medium">Телефон:</span> {{ booking.contact_phone }}</p>
              <p v-if="booking.user" class="text-sm"><span class="font-medium">Telegram ID:</span> {{ booking.user.telegram_id }}</p>
            </div>
          </div>

          <!-- Информация о программе -->
          <div class="card p-4">
            <h4 class="font-semibold text-wood-900 mb-2">Программа</h4>
            <div class="space-y-1">
              <p class="text-sm"><span class="font-medium">Тип:</span> {{ getProgramTypeName(booking.program_type) }}</p>
              <p v-if="booking.program" class="text-sm"><span class="font-medium">Название:</span> {{ booking.program.name }}</p>
              <p v-if="booking.event" class="text-sm"><span class="font-medium">Событие:</span> {{ booking.event.title }}</p>
            </div>
          </div>

          <!-- Дата и время -->
          <div class="card p-4">
            <h4 class="font-semibold text-wood-900 mb-2">Дата и время</h4>
            <div class="space-y-1">
              <p class="text-sm"><span class="font-medium">Дата:</span> {{ formatDate(booking.booking_date) }}</p>
              <p v-if="booking.booking_time" class="text-sm"><span class="font-medium">Время:</span> {{ booking.booking_time }}</p>
            </div>
          </div>

          <!-- Участники и статус -->
          <div class="card p-4">
            <h4 class="font-semibold text-wood-900 mb-2">Дополнительно</h4>
            <div class="space-y-1">
              <p class="text-sm"><span class="font-medium">Участники:</span> {{ booking.participants_count }}</p>
              <p class="text-sm">
                <span class="font-medium">Статус:</span>
                <span :class="getStatusClass(localStatus)" class="ml-2 px-2 py-1 rounded-full text-xs">
                  {{ getStatusName(localStatus) }}
                </span>
              </p>
              <p v-if="booking.promo_code" class="text-sm"><span class="font-medium">Промокод:</span> {{ booking.promo_code }}</p>
              <p v-if="booking.discount_percent" class="text-sm"><span class="font-medium">Скидка:</span> {{ booking.discount_percent }}%</p>
            </div>
          </div>

          <!-- Комментарии -->
          <div v-if="booking.comment" class="card p-4">
            <h4 class="font-semibold text-wood-900 mb-2">Комментарий</h4>
            <p class="text-sm">{{ booking.comment }}</p>
          </div>

          <!-- Дополнительные опции -->
          <div v-if="booking.additional_services && booking.additional_services.length > 0" class="card p-4">
            <h4 class="font-semibold text-wood-900 mb-2">Дополнительные услуги</h4>
            <ul class="list-disc list-inside text-sm space-y-1">
              <li v-for="(service, index) in booking.additional_services" :key="index">{{ service }}</li>
            </ul>
          </div>
        </div>

        <!-- Статус -->
        <div class="card p-4 mt-4">
          <h4 class="font-semibold text-wood-900 mb-2">Статус бронирования</h4>
          <div class="flex flex-col space-y-3">
            <select
              v-model="localStatus"
              class="form-input"
            >
              <option value="PENDING">Ожидает подтверждения</option>
              <option value="CONFIRMED">Подтверждено</option>
              <option value="CANCELLED">Отменено</option>
              <option value="COMPLETED">Завершено</option>
            </select>
            <button
              @click="updateStatus"
              class="btn-primary"
            >
              Сохранить
            </button>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="flex space-x-3 pt-4">
          <button
            @click="closeModal"
            class="btn-wood flex-1"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'BookingDetailsModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    booking: {
      type: Object,
      default: null
    }
  },
  emits: ['close', 'confirmed', 'cancelled'],
  data() {
    return {
      localStatus: this.booking?.status || ''
    };
  },
  watch: {
    booking(newBooking) {
      if (newBooking) {
        this.localStatus = newBooking.status;
      }
    }
  },
  methods: {
    ...mapActions(useAppStore, ['updateBookingStatus']),
    
    closeModal() {
      this.$emit('close');
    },
    
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
        'PENDING': 'Ожидает подтверждения',
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
    
    async confirmBooking() {
      try {
        await this.updateBookingStatus(this.booking.id, 'CONFIRMED');
        this.$emit('confirmed', this.booking.id);
        this.closeModal();
      } catch (error) {
        console.error('Ошибка при подтверждении бронирования:', error);
      }
    },
    
    async cancelBooking() {
      try {
        await this.updateBookingStatus(this.booking.id, 'CANCELLED');
        this.$emit('cancelled', this.booking.id);
        this.closeModal();
      } catch (error) {
        console.error('Ошибка при отмене бронирования:', error);
      }
    },

    async updateStatus() {
      if (!this.booking || !this.localStatus) return;

      try {
        // Обновляем статус бронирования
        await this.updateBookingStatus(this.booking.id, this.localStatus);

        // В зависимости от нового статуса, вызываем соответствующее событие
        if (this.localStatus === 'CONFIRMED') {
          this.$emit('confirmed', this.booking.id);
        } else if (this.localStatus === 'CANCELLED') {
          this.$emit('cancelled', this.booking.id);
        }

        // Обновляем статус в родительском компоненте
        this.booking.status = this.localStatus;
      } catch (error) {
        console.error('Ошибка при обновлении статуса бронирования:', error);
      }
    }
  }
}
</script>