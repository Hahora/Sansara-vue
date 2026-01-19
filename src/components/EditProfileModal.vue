<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-wood-900">Редактировать профиль</h3>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="saveProfile" class="space-y-4">
          <div>
            <label class="form-label">Имя</label>
            <input 
              v-model="formData.first_name" 
              type="text" 
              class="form-input" 
              placeholder="Введите имя"
            />
          </div>

          <div>
            <label class="form-label">Фамилия</label>
            <input 
              v-model="formData.last_name" 
              type="text" 
              class="form-input" 
              placeholder="Введите фамилию"
            />
          </div>

          <div>
            <label class="form-label">Телефон</label>
            <input 
              v-model="formData.phone" 
              type="tel" 
              class="form-input" 
              placeholder="Введите телефон"
            />
          </div>


          <div>
            <label class="form-label">Дата рождения</label>
            <input 
              v-model="formData.date_of_birth" 
              type="date" 
              class="form-input"
            />
          </div>

          <div class="flex space-x-3 pt-4">
            <button 
              type="button" 
              @click="closeModal"
              class="btn-secondary flex-1"
            >
              Отмена
            </button>
            <button 
              type="submit"
              :disabled="isSaving"
              class="btn-primary flex-1"
            >
              <span v-if="isSaving">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span v-else>Сохранить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'EditProfileModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    userData: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['close', 'saved'],
  data() {
    return {
      formData: {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        date_of_birth: ''
      },
      isSaving: false
    };
  },
  computed: {
    ...mapState(useAppStore, ['user'])
  },
  watch: {
    userData: {
      handler(newUser) {
        if (newUser) {
          this.formData = {
            first_name: newUser.first_name || '',
            last_name: newUser.last_name || '',
            phone: newUser.phone || '',
            email: newUser.email || '',
            date_of_birth: newUser.date_of_birth ? this.formatDateForInput(newUser.date_of_birth) : ''
          };
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(useAppStore, ['updateUserProfile']),
    
    closeModal() {
      this.$emit('close');
    },
    
    formatDateForInput(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      // Преобразуем в формат YYYY-MM-DD
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    
    async saveProfile() {
      this.isSaving = true;
      try {
        // Подробное логирование для отладки
        console.log('=== Начало сохранения профиля ===');
        console.log('Данные пользователя (this.user):', this.user);
        console.log('Данные формы (this.formData):', this.formData);
        console.log('userData (props):', this.userData);

        // Подготовим данные для отправки, проверяя, что дата рождения не пустая
        // Отправляем только те поля, которые можно обновить
        const payload = {};

        // Копируем только обновляемые поля
        if (this.formData.first_name !== undefined) {
          payload.first_name = this.formData.first_name;
        }
        if (this.formData.last_name !== undefined) {
          payload.last_name = this.formData.last_name;
        }
        if (this.formData.phone !== undefined) {
          payload.phone = this.formData.phone;
        }
        // Обрабатываем дату рождения отдельно
        if (this.formData.date_of_birth) {
          payload.date_of_birth = this.formData.date_of_birth;
        } else {
          payload.date_of_birth = null;
        }

        console.log('Payload для отправки:', payload);

        // Обновляем профиль через API
        // telegram_id должен быть доступен в this.user, который хранится в хранилище
        // из примера ответа от /auth/me видно, что поле называется telegram_id
        const telegramId = this.user?.telegram_id;

        console.log('Полученное telegram_id:', telegramId);
        console.log('Тип telegram_id:', typeof telegramId);
        console.log('isNaN(telegramId):', isNaN(Number(telegramId)));

        // Убедимся, что telegramId - это число и доступен
        if (!telegramId || telegramId === 'undefined' || telegramId === 'null' || isNaN(Number(telegramId))) {
          console.error('Ошибка: telegram_id недоступен или некорректен');
          console.error('Значение telegramId:', telegramId);
          console.error('typeof telegramId:', typeof telegramId);
          // Если telegramId недоступен, выбрасываем ошибку
          throw new Error('Не удалось получить идентификатор пользователя для обновления профиля');
        }

        // Преобразуем к числу, если это необходимо
        const numericTelegramId = Number(telegramId);
        console.log('Преобразованный numericTelegramId:', numericTelegramId);

        const updatedData = await this.updateUserProfile({
          telegram_id: numericTelegramId,
          ...payload
        });

        console.log('Ответ от сервера:', updatedData);
        console.log('=== Конец сохранения профиля ===');

        // Вызываем событие об успешном сохранении
        this.$emit('saved', updatedData);

        // Закрываем модальное окно
        this.closeModal();
      } catch (error) {
        console.error('=== ОШИБКА при обновлении профиля ===');
        console.error('Ошибка:', error);
        console.error('Stack trace:', error.stack);
        // Здесь можно добавить уведомление об ошибке
      } finally {
        this.isSaving = false;
      }
    }
  }
};
</script>