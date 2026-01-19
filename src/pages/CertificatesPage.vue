<template>
  <div class="p-4">
    <div class="flex items-center mb-4">
      <router-link to="/" class="btn-back mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Назад
      </router-link>
      <h1 class="page-title text-xl">Подарочные сертификаты</h1>
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
      <!-- Основное описание -->
      <div class="card">
        <h2 class="section-title">🎁 <b>Подарочные сертификаты</b></h2>
        <p class="text-black text-sm mb-3">Подарите заботу, счастье и ресурсное состояние</p>

        <div class="bg-gray-50 rounded-lg p-3 mb-3">
          <p class="text-black"><b>Виды сертификатов:</b></p>
        </div>

        <div class="space-y-3">
          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-black font-medium">📋 На конкретную программу</p>
            <p class="text-black text-sm">Выберите программу — получатель придёт на неё</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-3">
            <p class="text-black font-medium">💰 На депозит (номинал)</p>
            <p class="text-black text-sm">Получатель сам выберет программу на указанную сумму</p>
          </div>
        </div>
      </div>

      <!-- Кнопки выбора типа сертификата -->
      <div class="card">
        <div class="space-y-3">
          <button @click="openCertificateModal('program')" class="w-full bg-wood-50 text-black font-medium py-3 px-4 rounded-lg border border-wood-300 transition-colors duration-200 text-left">
            📋 На программу
          </button>

          <button @click="openCertificateModal('deposit')" class="w-full bg-wood-50 text-black font-medium py-3 px-4 rounded-lg border border-wood-300 transition-colors duration-200 text-left">
            💰 На депозит
          </button>
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


      <!-- Кнопки действий -->
      <div class="space-y-3">
        <router-link to="/programs" class="btn-secondary block text-center">
          📋 Посмотреть программы
        </router-link>
      </div>
    </div>

    <!-- Модальное окно для оформления сертификата -->
    <div v-if="showCertificateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-black">🎁 Оформление сертификата</h3>
            <button @click="closeModal" class="text-black hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Шаг 1: Тип сертификата (только если не выбран заранее) -->
          <div v-if="currentStep === 1 && !selectedCertType">
            <h4 class="font-medium text-black mb-3">🛒 Выберите тип сертификата:</h4>

            <div class="space-y-3">
              <button
                @click="selectedCertType = 'program'; nextStep()"
                class="w-full bg-wood-50 text-black font-medium py-3 px-4 rounded-lg border border-wood-300 transition-colors duration-200 text-left"
              >
                📋 На программу
              </button>

              <button
                @click="selectedCertType = 'deposit'; nextStep()"
                class="w-full bg-wood-50 text-black font-medium py-3 px-4 rounded-lg border border-wood-300 transition-colors duration-200 text-left"
              >
                💰 На депозит
              </button>
            </div>
          </div>

          <!-- Если тип уже выбран, сразу показываем выбор программы или суммы -->
          <div v-if="currentStep === 1 && selectedCertType && !selectedProgram && !selectedAmount">
            <h4 class="font-medium text-black mb-3" v-if="selectedCertType === 'program'">📋 Выберите программу:</h4>
            <h4 class="font-medium text-black mb-3" v-else>💰 Выберите номинал:</h4>

            <div v-if="selectedCertType === 'program'" class="space-y-3 max-h-60 overflow-y-auto">
              <div
                v-for="program in certificatePrograms"
                :key="program.id"
                @click="selectProgram(program)"
                :class="{'bg-wood-200': selectedProgram && selectedProgram.id === program.id}"
                class="bg-gray-50 rounded-lg p-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
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

            <div v-else class="space-y-3">
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="amount in depositAmounts"
                  :key="amount.value"
                  @click="selectAmount(amount)"
                  :class="{'bg-wood-200': selectedAmount && selectedAmount.value === amount.value}"
                  class="bg-gray-50 text-black font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                >
                  {{ amount.label }}
                </button>
              </div>

              <div class="mt-3">
                <label class="block text-sm font-medium text-black mb-1">Или введите свою сумму:</label>
                <input
                  v-model="customAmount"
                  type="number"
                  min="1000"
                  class="form-input w-full"
                  placeholder="Введите сумму в рублях"
                />
                <button
                  v-if="customAmount && parseInt(customAmount) >= 1000"
                  @click="selectCustomAmount"
                  class="mt-2 btn-primary block text-center w-full"
                >
                  Выбрать {{ customAmount }} ₽
                </button>
              </div>
            </div>

            <div class="mt-6 flex justify-between">
              <button @click="prevStep" class="btn-secondary py-2 px-6 rounded-lg">
                Назад
              </button>
              <button
                @click="nextStep"
                :disabled="!(selectedProgram || selectedAmount)"
                :class="{'opacity-50 cursor-not-allowed': !(selectedProgram || selectedAmount)}"
                class="btn-primary py-2 px-6 rounded-lg"
              >
                Далее
              </button>
            </div>
          </div>

          <!-- Шаг 2: Выбор программы или суммы (для обычной навигации, когда тип уже выбран, но программа/сумма еще не выбраны) -->
          <div v-if="currentStep === 2 && selectedCertType && !selectedProgram && !selectedAmount">
            <h4 class="font-medium text-black mb-3" v-if="selectedCertType === 'program'">📋 Выберите программу:</h4>
            <h4 class="font-medium text-black mb-3" v-else>💰 Выберите номинал:</h4>

            <div v-if="selectedCertType === 'program'" class="space-y-3 max-h-60 overflow-y-auto">
              <div
                v-for="program in certificatePrograms"
                :key="program.id"
                @click="selectProgram(program)"
                :class="{'bg-wood-200': selectedProgram && selectedProgram.id === program.id}"
                class="bg-gray-50 rounded-lg p-3 border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
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

            <div v-else class="space-y-3">
              <div class="grid grid-cols-2 gap-2">
                <button
                  v-for="amount in depositAmounts"
                  :key="amount.value"
                  @click="selectAmount(amount)"
                  :class="{'bg-wood-200': selectedAmount && selectedAmount.value === amount.value}"
                  class="bg-gray-50 text-black font-medium py-3 px-4 rounded-lg border border-gray-300 transition-colors duration-200"
                >
                  {{ amount.label }}
                </button>
              </div>

              <div class="mt-3">
                <label class="block text-sm font-medium text-black mb-1">Или введите свою сумму:</label>
                <input
                  v-model="customAmount"
                  type="number"
                  min="1000"
                  class="form-input w-full"
                  placeholder="Введите сумму в рублях"
                />
                <button
                  v-if="customAmount && parseInt(customAmount) >= 1000"
                  @click="selectCustomAmount"
                  class="mt-2 btn-primary block text-center w-full"
                >
                  Выбрать {{ customAmount }} ₽
                </button>
              </div>
            </div>

            <div class="mt-6 flex justify-between">
              <button @click="prevStep" class="btn-secondary py-2 px-6 rounded-lg">
                Назад
              </button>
              <button
                @click="nextStep"
                :disabled="!(selectedProgram || selectedAmount)"
                :class="{'opacity-50 cursor-not-allowed': !(selectedProgram || selectedAmount)}"
                class="btn-primary py-2 px-6 rounded-lg"
              >
                Далее
              </button>
            </div>
          </div>

          <!-- Шаг 2 (при предварительно выбранном типе) или шаг 3 (при обычной навигации): Выбор формата -->
          <div v-if="(currentStep === 2 && selectedCertType && (selectedProgram || selectedAmount)) || (currentStep === 3 && !selectedCertType && (selectedProgram || selectedAmount))">
            <h4 class="font-medium text-black mb-3">📄 Выберите формат сертификата:</h4>
            
            <div class="space-y-3">
              <button 
                @click="selectedFormat = 'electronic'; nextStep()" 
                class="w-full bg-wood-50 text-black font-medium py-3 px-4 rounded-lg border border-wood-300 transition-colors duration-200 text-left"
              >
                📱 Электронный — моментальная доставка на email
              </button>

              <button 
                @click="selectedFormat = 'printed'; nextStep()" 
                class="w-full bg-wood-50 text-black font-medium py-3 px-4 rounded-lg border border-wood-300 transition-colors duration-200 text-left"
              >
                📄 Печатный — красивое оформление в конверте (+500 ₽)
              </button>
            </div>

            <div class="mt-6 flex justify-between">
              <button @click="prevStep" class="btn-secondary py-2 px-6 rounded-lg">
                Назад
              </button>
              <button
                @click="nextStep"
                :disabled="!selectedFormat"
                :class="{'opacity-50 cursor-not-allowed': !selectedFormat}"
                class="btn-primary py-2 px-6 rounded-lg"
              >
                Далее
              </button>
            </div>
          </div>

          <!-- Шаг 4 (при обычной навигации) или шаг 3 (при предварительно выбранном типе): Данные получателя -->
          <div v-if="(currentStep === 4 && !selectedCertType && (selectedProgram || selectedAmount)) || (currentStep === 3 && selectedCertType && (selectedProgram || selectedAmount))">
            <h4 class="font-medium text-black mb-3">Recipient Information</h4>
            
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-black mb-1">Имя получателя:</label>
                <input
                  v-model="recipientName"
                  type="text"
                  class="form-input w-full"
                  placeholder="Введите имя получателя"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-black mb-1">Телефон получателя:</label>
                <input
                  v-model="recipientPhone"
                  type="tel"
                  class="form-input w-full"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
            </div>

            <div class="mt-6 flex justify-between">
              <button @click="prevStep" class="btn-secondary py-2 px-6 rounded-lg">
                Назад
              </button>
              <button
                @click="nextStep"
                :disabled="!recipientName || !recipientPhone"
                :class="{'opacity-50 cursor-not-allowed': !recipientName || !recipientPhone}"
                class="btn-primary py-2 px-6 rounded-lg"
              >
                Далее
              </button>
            </div>
          </div>

          <!-- Шаг 5 (при обычной навигации) или шаг 4 (при предварительно выбранном типе): Данные покупателя -->
          <div v-if="(currentStep === 5 && !selectedCertType && (selectedProgram || selectedAmount)) || (currentStep === 4 && selectedCertType && (selectedProgram || selectedAmount))">
            <h4 class="font-medium text-black mb-3">Buyer Information</h4>

            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-black mb-1">Ваше имя:</label>
                <input
                  v-model="buyerName"
                  type="text"
                  class="form-input w-full"
                  placeholder="Введите ваше имя"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-black mb-1">Ваш телефон:</label>
                <input
                  v-model="buyerPhone"
                  type="tel"
                  class="form-input w-full"
                  placeholder="+7 (XXX) XXX-XX-XX"
                />
              </div>
            </div>

            <div class="mt-6 flex justify-between">
              <button @click="prevStep" class="btn-secondary py-2 px-6 rounded-lg">
                Назад
              </button>
              <button
                @click="nextStep"
                :disabled="!buyerName || !buyerPhone"
                :class="{'opacity-50 cursor-not-allowed': !buyerName || !buyerPhone}"
                class="btn-primary py-2 px-6 rounded-lg"
              >
                Далее
              </button>
            </div>
          </div>

          <!-- Шаг 6 (при обычной навигации) или шаг 5 (при предварительно выбранном типе): Подтверждение заказа -->
          <div v-if="(currentStep === 6 && !selectedCertType && (selectedProgram || selectedAmount)) || (currentStep === 5 && selectedCertType && (selectedProgram || selectedAmount))">
            <h4 class="font-medium text-black mb-3">Подтверждение заказа</h4>

            <div class="bg-gray-50 rounded-lg p-4 space-y-2">
              <p><b>Тип сертификата:</b> {{ selectedCertType === 'program' ? 'На программу' : 'На депозит' }}</p>
              <p v-if="selectedProgram"><b>Программа:</b> {{ selectedProgram.name }}</p>
              <p v-if="selectedAmount"><b>Сумма:</b> {{ selectedAmount.label }}</p>
              <p><b>Формат:</b> {{ selectedFormat === 'electronic' ? 'Электронный' : 'Печатный' }}</p>
              <p><b>Получатель:</b> {{ recipientName }}</p>
              <p><b>Телефон получателя:</b> {{ recipientPhone }}</p>
              <p><b>Покупатель:</b> {{ buyerName }}</p>
              <p><b>Телефон покупателя:</b> {{ buyerPhone }}</p>
            </div>

            <div class="mt-6 flex justify-between">
              <button @click="prevStep" class="btn-secondary py-2 px-6 rounded-lg">
                Назад
              </button>
              <button @click="finishOrder" class="btn-primary py-2 px-6 rounded-lg">
                Подтвердить заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно подтверждения -->
  <div v-if="showConfirmationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl max-w-md w-full p-6">
      <div class="text-center">
        <div class="text-4xl mb-4">✅</div>
        <h3 class="text-xl font-bold text-black mb-2">Заявка отправлена!</h3>
        <p class="text-black mb-4">Наш менеджер свяжется с вами для подтверждения и оплаты.</p>

        <div class="bg-gray-100 rounded-lg p-4 mb-4">
          <p class="text-sm text-gray-600">Код сертификата:</p>
          <p class="text-lg font-mono font-bold text-black">{{ certificateCode }}</p>
        </div>

        <button @click="closeConfirmationModal" class="btn-primary block w-full text-center">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '@/stores/appStore';

export default {
  name: 'CertificatesPage',
  data() {
    return {
      showCertificateModal: false,
      showConfirmationModal: false,
      certificateCode: null,
      currentStep: 1,
      selectedCertType: null,
      selectedProgram: null,
      selectedAmount: null,
      customAmount: '',
      selectedFormat: null,
      recipientName: '',
      recipientPhone: '',
      buyerName: '',
      buyerPhone: '',
      depositAmounts: [
        { value: 5000, label: '5 000 ₽' },
        { value: 7000, label: '7 000 ₽' },
        { value: 10000, label: '10 000 ₽' },
        { value: 15000, label: '15 000 ₽' },
        { value: 20000, label: '20 000 ₽' },
      ]
    };
  },
  computed: {
    ...mapState(useAppStore, ['isLoading', 'error', 'programs', 'user', 'certificates']),

    certificatePrograms() {
      // Фильтруем программы, которые подходят для сертификатов
      return this.programs.filter(program =>
        program.program_type !== 'certificate' &&
        program.is_active !== false
      );
    }
  },
  methods: {
    ...mapActions(useAppStore, ['createCertificate']),

    openCertificateModal(certType) {
      this.showCertificateModal = true;
      this.resetForm();
      this.selectedCertType = certType;
      this.currentStep = 1; // Показываем первый шаг, но с предопределенным типом

      // Автоматически заполняем данные покупателя из профиля
      if (this.user) {
        this.buyerName = this.user.first_name || this.user.username || '';
        this.buyerPhone = this.user.phone || '';
      }
    },

    closeModal() {
      this.showCertificateModal = false;
      this.resetForm();
    },

    closeConfirmationModal() {
      this.showConfirmationModal = false;
      this.certificateCode = null;
    },

    nextStep() {
      if (this.selectedCertType) {
        // Если тип сертификата уже выбран, максимум 5 шагов (без первого шага выбора типа)
        if (this.currentStep < 5) {
          this.currentStep++;
        }
      } else {
        // Если тип сертификата не выбран, используем обычную навигацию (6 шагов)
        if (this.currentStep < 6) {
          this.currentStep++;
        }
      }
    },

    prevStep() {
      // В обоих случаях можно вернуться к шагу 1
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },

    selectProgram(program) {
      this.selectedProgram = program;
      this.nextStep(); // Переходим к следующему шагу (выбор формата)
    },

    selectAmount(amount) {
      this.selectedAmount = amount;
      this.nextStep(); // Переходим к следующему шагу (выбор формата)
    },

    selectCustomAmount() {
      if (parseInt(this.customAmount) >= 1000) {
        this.selectedAmount = { label: `${this.customAmount} ₽`, value: parseInt(this.customAmount) };
        this.nextStep(); // Переходим к следующему шагу (выбор формата)
      } else {
        alert('Минимальная сумма — 1 000 ₽');
      }
    },

    async finishOrder() {
      try {
        // Подготовим данные для создания сертификата
        const certificateData = {
          certificate_type: this.selectedCertType === 'program' ? 'certificate' : 'deposit',
          format: this.selectedFormat === 'printed' ? 'Печатный' : 'Электронный',
          recipient_name: this.recipientName,
          recipient_phone: this.recipientPhone,
          buyer_name: this.buyerName,
          buyer_phone: this.buyerPhone,
          program_id: this.selectedProgram ? this.selectedProgram.id : null,
          amount: this.selectedAmount ? this.selectedAmount.value * 100 : 0, // в копейках
        };

        // Вызовем метод создания сертификата из стора
        const result = await this.createCertificate(certificateData);

        // Закроем модальное окно оформления
        this.closeModal();

        // Сохраним код сертификата и покажем модальное окно подтверждения
        this.certificateCode = result.code || 'неизвестен';
        this.showConfirmationModal = true;
      } catch (error) {
        console.error('Ошибка при оформлении сертификата:', error);
        alert('Произошла ошибка при оформлении сертификата. Пожалуйста, попробуйте еще раз.');
      }
    },

    resetForm() {
      this.currentStep = 1;
      this.selectedCertType = null;
      this.selectedProgram = null;
      this.selectedAmount = null;
      this.customAmount = '';
      this.selectedFormat = null;
      this.recipientName = '';
      this.recipientPhone = '';
      // Не очищаем данные покупателя, они будут заполнены из профиля при открытии
    },

    truncateText(text, maxLength) {
      if (!text) return '';
      return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    }
  }
}
</script>