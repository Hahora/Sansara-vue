<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Бронирование</h1>
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
      <!-- Форма бронирования -->
      <div class="card">
        <h2 class="section-title">📝 <b>Бронирование</b></h2>
        <p class="text-gray-900 text-sm mb-3">Давайте оформим вашу заявку!</p>

        <form @submit.prevent="submitBooking" class="space-y-4">
          <!-- Имя -->
          <div class="form-group">
            <label class="form-label">👤 <b>Как к вам обращаться?</b></label>
            <input
              v-model="bookingForm.name"
              type="text"
              class="form-input"
              :placeholder="user?.first_name || 'Введите ваше имя'"
              required
            />
            <div v-if="!user?.first_name" class="mt-1 text-sm text-amber-600">
              💡 Для удобства заполните имя в профиле
            </div>
          </div>

          <!-- Телефон -->
          <div class="form-group">
            <label class="form-label">📱 <b>Контактный телефон</b></label>
            <input
              v-model="bookingForm.phone"
              type="tel"
              class="form-input"
              :placeholder="user?.phone || '+7 (___) ___-__-__'"
              required
            />
            <div v-if="!user?.phone" class="mt-1 text-sm text-amber-600">
              💡 Для удобства заполните телефон в профиле
            </div>
            <button type="button" @click="useTelegramContact" class="btn-secondary mt-2">📱 Использовать контакт из Telegram</button>
          </div>

          <!-- Дата -->
          <div class="form-group">
            <label class="form-label">📅 <b>Желаемая дата</b></label>
            <input
              v-model="bookingForm.date"
              type="datetime-local"
              class="form-input"
              required
            />
            <p class="text-wood-900 text-sm mt-1">Введите дату и время визита</p>
          </div>

          <!-- Тип бронирования (скрытое поле, автоматически устанавливается) -->
          <input
            v-model="bookingForm.type"
            type="hidden"
          />

          <!-- ID программы (скрытое поле, автоматически устанавливается) -->
          <input
            v-model="bookingForm.programId"
            type="hidden"
          />

          <!-- ID события (скрытое поле, автоматически устанавливается) -->
          <input
            v-model="bookingForm.eventId"
            type="hidden"
          />

          <!-- Количество гостей -->
          <div class="form-group">
            <label class="form-label">👥 <b>Количество гостей</b></label>
            <div class="grid grid-cols-4 sm:grid-cols-7 gap-2">
              <button
                v-for="n in [1,2,3,4,5,6,7]"
                :key="n"
                type="button"
                @click="bookingForm.participants = n"
                :class="{'bg-wood-600 text-white': bookingForm.participants === n}"
                class="btn-secondary py-2"
              >
                {{ n }}
              </button>
              <button
                v-for="n in [8,9,10,11,12]"
                :key="n"
                type="button"
                @click="bookingForm.participants = n"
                :class="{'bg-wood-600 text-white': bookingForm.participants === n}"
                class="btn-secondary py-2 hidden sm:block"
              >
                {{ n }}
              </button>
              <button
                type="button"
                @click="bookingForm.participants = 13"
                :class="{'bg-wood-600 text-white': bookingForm.participants >= 13}"
                class="btn-secondary py-2"
              >
                13+
              </button>
            </div>
          </div>

          <!-- Промокод -->
          <div class="form-group">
            <label class="form-label">🎟 <b>Промокод</b></label>
            <input
              v-model="bookingForm.promoCode"
              type="text"
              class="form-input"
              placeholder="Введите промокод"
            />
          </div>

          <!-- Комментарий -->
          <div class="form-group">
            <label class="form-label">💬 <b>Пожелания</b></label>
            <textarea
              v-model="bookingForm.comment"
              class="form-input"
              rows="3"
              placeholder="Особые пожелания или вопросы"
            ></textarea>
          </div>

          <!-- Кнопка подтверждения -->
          <button
            type="submit"
            :disabled="isLoading"
            class="btn-primary"
          >
            {{ isLoading ? 'Обработка...' : '✅ Подтвердить бронирование' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Модальное окно для сообщений -->
    <div v-if="message.isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6 relative"
           :class="{
             'border border-green-400' : message.type === 'success',
             'border border-red-400' : message.type === 'error'
           }">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold"
              :class="{
                'text-green-600': message.type === 'success',
                'text-red-600': message.type === 'error'
              }">
            {{ message.type === 'success' ? 'Успех!' : 'Ошибка!' }}
          </h3>
          <button @click="closeMessage" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p :class="{
             'text-green-700': message.type === 'success',
             'text-red-700': message.type === 'error'
           }">
          {{ message.text }}
        </p>
        <div class="mt-4">
          <button @click="closeMessage" class="btn-primary w-full text-center py-2 px-4 rounded-lg text-white font-medium">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';
import { onBeforeRouteUpdate } from 'vue-router';

export default {
  name: 'BookingPage',
  // Удаляем setup, будем использовать this.$route
  data() {
    return {
      bookingForm: {
        name: '',
        phone: '',
        date: '',
        type: '',
        programId: null,
        eventId: null, // Добавляем поле для event_id
        participants: 1,
        comment: '',
        promoCode: '' // Добавляем поле для промокода
      },
      message: {
        text: '',
        type: '', // 'success' или 'error'
        isVisible: false
      }
    }
  },
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'user', 'programs', 'programsLoaded', 'events', 'eventsLoaded']),
    programSlug() {
      if (this.bookingForm.programId && this.programs) {
        const program = this.programs.find(p => p.id === this.bookingForm.programId);
        return program ? program.slug : null;
      }
      return null;
    }
  },
  async mounted() {
    // Загружаем программы и события, если они еще не загружены
    if (!this.programsLoaded) {
      await this.loadPrograms();
    }

    if (!this.eventsLoaded) {
      await this.loadEvents();
    }

    // Обрабатываем параметры маршрута немедленно при загрузке компонента
    this.handleRouteParams();
  },

  async beforeRouteUpdate(to, from) {
    // Обновляем форму при изменении параметров маршрута
    this.handleRouteParams();
  },
  methods: {
    ...mapActions(useAppStore, ['createBooking', 'loadPrograms', 'loadEvents']),

    // Новый метод для обработки параметров маршрута с логированием и коррекцией
    handleRouteParams() {
      console.log('handleRouteParams вызван');
      const params = this.$route.params;
      console.log('Параметры маршрута:', params);

      // Проверяем и корректируем параметры, если они перепутаны
      let correctedParams = { ...params };

      // Если programId является строкой типа 'bachelor', 'bachelorette', и т.д.,
      // а programType пустой, значит параметры перепутаны
      if (typeof correctedParams.programId === 'string' &&
          isNaN(parseInt(correctedParams.programId)) &&
          (correctedParams.programId === 'bachelor' ||
           correctedParams.programId === 'bachelorette' ||
           correctedParams.programId === 'author' ||
           correctedParams.programId === 'collective' ||
           correctedParams.programId === 'ritual' ||
           correctedParams.programId === 'spa') &&
          (!correctedParams.programType || correctedParams.programType === '')) {

        console.log('Обнаружено перепутывание параметров: перемещаем programId в programType');
        correctedParams.programType = correctedParams.programId;
        correctedParams.programId = undefined;
      }

      // Проверяем, есть ли необходимые параметры из BachelorPage
      if (correctedParams.programId) {
        const parsedProgramId = parseInt(correctedParams.programId);
        if (!isNaN(parsedProgramId)) {
          console.log('Устанавливаем programId:', parsedProgramId);
          this.bookingForm.programId = parsedProgramId;
        } else {
          console.log('programId не является числом, пропускаем:', correctedParams.programId);
        }
      } else {
        console.log('programId не передан в параметрах маршрута');
      }

      if (correctedParams.programType) {
        console.log('Устанавливаем programType:', correctedParams.programType);
        this.bookingForm.type = correctedParams.programType;
      } else {
        console.log('programType не передан в параметрах маршрута');
      }

      if (correctedParams.eventId) {
        console.log('Устанавливаем eventId:', String(correctedParams.eventId));
        this.bookingForm.eventId = String(correctedParams.eventId);
      } else {
        console.log('eventId не передан в параметрах маршрута');

        // Если eventId не передан, но передан programId, используем slug программы
        // Это обеспечивает одинаковую логику с вкладкой "Программы"
        if (correctedParams.programId) {
          const parsedProgramId = parseInt(correctedParams.programId);
          if (!isNaN(parsedProgramId)) {
            console.log('Пытаемся получить slug программы для eventId');
            // Ждем, пока программы загрузятся, если они еще не загружены
            if (this.programs && this.programs.length > 0) {
              const program = this.programs.find(p => p.id === parsedProgramId);
              if (program && program.slug) {
                console.log('Найден slug программы:', program.slug);
                this.bookingForm.eventId = program.slug;
              } else {
                console.log('Slug программы не найден для programId:', correctedParams.programId);
              }
            } else {
              console.log('Программы еще не загружены, eventId останется пустым');
            }
          }
        }
      }

      // Автоматически заполняем поля из профиля пользователя
      if (this.user) {
        this.bookingForm.name = this.user.first_name || this.user.username || '';
        this.bookingForm.phone = this.user.phone || '';
      }

      console.log('Состояние формы после обработки параметров:', this.bookingForm);
    },

    async initializeBookingForm(routeParams = null) {
      const params = routeParams || this.$route.params;

      // Автоматически заполняем поля из профиля пользователя
      if (this.user) {
        this.bookingForm.name = this.user.first_name || this.user.username || '';
        this.bookingForm.phone = this.user.phone || '';
      }

      // Устанавливаем тип программы, если он передан в маршруте
      if (params.programType) {
        this.bookingForm.type = params.programType;
      }

      // Устанавливаем ID программы, если он передан в маршруте
      if (params.programId) {
        this.bookingForm.programId = parseInt(params.programId);
      }

      // Устанавливаем ID события, если он передан в маршруте
      if (params.eventId) {
        // Преобразуем eventId в строку, если он передан как число
        this.bookingForm.eventId = String(params.eventId);
      } else if (params.programId && this.programs && this.programs.length > 0) {
        // Если eventId не передан, но передан programId, используем slug программы
        const program = this.programs.find(p => p.id === parseInt(params.programId));
        if (program && program.slug) {
          this.bookingForm.eventId = program.slug;
        }
      }
    },
    async submitBooking() {
      try {
        console.log('submitBooking вызван');
        console.log('Состояние формы перед отправкой:', this.bookingForm);
        console.log('programSlug:', this.programSlug);

        // Подготовка данных для отправки
        const bookingData = {
          contact_name: this.bookingForm.name,
          contact_phone: this.bookingForm.phone,
          booking_date: this.bookingForm.date,
          program_type: this.bookingForm.type ? this.bookingForm.type : undefined,
          program_id: this.bookingForm.programId,
          event_id: this.bookingForm.eventId || this.programSlug, // Используем eventId из маршрута или slug программы
          participants_count: this.bookingForm.participants,
          comment: this.bookingForm.comment,
          promo_code: this.bookingForm.promoCode, // Добавляем промокод
          user_id: this.user?.id,
          status: 'PENDING'
        };

        console.log('Данные для отправки в API:', bookingData);

        // Отправка запроса на бронирование
        const result = await this.createBooking(bookingData);

        // Показать сообщение об успехе
        this.showMessage(`Бронирование успешно создано! Номер заявки: ${result.id}`, 'success');

        // Сброс формы
        this.resetForm();
      } catch (error) {
        console.error('Ошибка бронирования:', error);
        this.showMessage('Ошибка при создании бронирования: ' + error.message, 'error');
      }
    },
    resetForm() {
      this.bookingForm = {
        name: this.user?.first_name || this.user?.username || '',
        phone: this.user?.phone || '',
        date: '',
        type: this.$route.params.programType || '', // Сохраняем тип программы, если он был установлен
        programId: this.$route.params.programId ? parseInt(this.$route.params.programId) : null, // Сохраняем ID программы, если он был установлен
        eventId: this.$route.params.eventId || null, // Сохраняем ID события, если он был установлен
        participants: 1,
        comment: '',
        promoCode: '' // Сбрасываем промокод
      };
    },
    useTelegramContact() {
      // Использование контакта из Telegram WebApp, если доступен
      if (window.Telegram && window.Telegram.WebApp) {
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        if (user && user.phone) {
          this.bookingForm.phone = user.phone;
        }
      }
    },
    showMessage(text, type) {
      this.message.text = text;
      this.message.type = type;
      this.message.isVisible = true;

      // Автоматически скрываем сообщение через 5 секунд
      setTimeout(() => {
        this.message.isVisible = false;
      }, 5000);
    },
    closeMessage() {
      this.message.isVisible = false;
    }
  }
}
</script>
