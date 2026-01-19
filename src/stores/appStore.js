import { defineStore } from 'pinia';
import { userAPI, authAPI, programAPI, eventAPI, bookingAPI, certificateAPI, promoAPI, lotteryAPI } from '@/utils/api';

export const useAppStore = defineStore('app', {
  persist: {
    pick: ['user', 'isAuthenticated'], // Сохраняем только пользователя и статус аутентификации
  },
  state: () => ({
    // Состояние пользователя
    user: null,
    isAuthenticated: false,
    userLoaded: false, // Флаг для отслеживания загрузки пользователя

    // Состояние программ
    programs: [],
    collectivePrograms: [],
    authorPrograms: [],
    programsLoaded: false, // Флаг для отслеживания загрузки программ

    // Состояние мероприятий
    events: [],
    eventsLoaded: false, // Флаг для отслеживания загрузки мероприятий

    // Состояние бронирований
    bookings: [],
    bookingsLoaded: false, // Флаг для отслеживания загрузки бронирований

    // Состояние сертификатов и промокодов
    certificates: [],
    promos: [],
    certificatesLoaded: false, // Флаг для отслеживания загрузки сертификатов
    promosLoaded: false, // Флаг для отслеживания загрузки промокодов

    // Состояние лотереи
    lotterySettings: null,
    lotteryCodes: [],
    lotteryPrizes: [],
    userLotteryTickets: [],
    lotteryDataLoaded: false, // Флаг для отслеживания загрузки данных лотереи

    // Состояние загрузки
    isLoading: false,
    error: null,
    errorTimeoutId: null, // Для хранения ID таймера

    // Состояние контента
    contentData: {},
  }),

  getters: {
    // Получить пользователя
    getUser: (state) => state.user,
    
    // Получить программы определенного типа
    getProgramsByType: (state) => (type) => {
      // Преобразуем запрашиваемый тип в нижний регистр для совместимости
      const normalizedType = type.toLowerCase();
      return state.programs.filter(program => program.program_type === normalizedType);
    },
    
    // Получить активные промокоды
    getActivePromos: (state) => {
      return state.promos.filter(promo => promo.active);
    },
    
    // Получить бронирования пользователя
    getUserBookings: (state) => {
      if (!state.user) return [];
      return state.bookings.filter(booking => booking.userId === state.user.id);
    },
  },

  actions: {
    // Установить состояние загрузки
    setLoading(loading) {
      this.isLoading = loading;
      // Если начинается загрузка, очищаем предыдущую ошибку
      if (loading && this.error) {
        this.clearError();
      }
    },
    
    // Установить ошибку
    setError(error) {
      // Очищаем предыдущий таймер, если он существует
      if (this.errorTimeoutId) {
        clearTimeout(this.errorTimeoutId);
        this.errorTimeoutId = null;
      }

      this.error = error;
      console.error('Store error:', error);

      // Автоматически скрываем ошибку через 10 секунд
      this.errorTimeoutId = setTimeout(() => {
        this.clearError();
      }, 10000); // 10 секунд
    },

    // Очистить ошибку
    clearError() {
      this.error = null;
      if (this.errorTimeoutId) {
        clearTimeout(this.errorTimeoutId);
        this.errorTimeoutId = null;
      }
    },
    
    // Получить Telegram ID из WebApp
    getTelegramUserIdFromWebApp() {
      // Получаем из Telegram WebApp
      if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe?.user?.id) {
        return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
      }

      return null;
    },
    
    // Аутентифицировать пользователя
    async authenticate(force = false) {
      try {
        // Проверяем, не загружали ли мы уже пользователя, если не указано принудительное обновление
        if (this.userLoaded && !force) {
          return;
        }

        this.setLoading(true);
        console.log('Authenticating user...');
        
        // Проверяем аутентификацию через API
        let userData = await authAPI.getCurrentUser();

        console.log('User data received:', userData);

        // Преобразуем enum-значения в нижний регистр для совместимости
        userData = {
          ...userData,
          user_type: userData.user_type ? userData.user_type.toLowerCase() : userData.user_type,
          gender: userData.gender ? userData.gender.toLowerCase() : userData.gender,
          status: userData.status ? userData.status.toLowerCase() : userData.status
        };

        this.user = userData;
        this.isAuthenticated = true;
        this.userLoaded = true; // Устанавливаем флаг, что пользователь загружен
        
        console.log('Authentication successful, user:', this.user);
      } catch (error) {
        console.error('Authentication failed:', error);
        this.setError(error.message);
        this.isAuthenticated = false;
        this.userLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },
    
    // Обновить профиль пользователя
    async updateUserProfile(userData) {
      try {
        this.setLoading(true);
        console.log('Updating user profile with data:', userData);
        
        // Преобразуем enum-значения в верхний регистр перед отправкой на сервер
        const transformedUserData = {
          ...userData,
          user_type: userData.user_type ? userData.user_type.toUpperCase() : userData.user_type,
          gender: userData.gender ? userData.gender.toUpperCase() : userData.gender,
          status: userData.status ? userData.status.toUpperCase() : userData.status
        };

        console.log('Transformed user data for API:', transformedUserData);

        // Вызываем userAPI.updateProfile без передачи telegramId, он получит его сам
        const updatedUser = await userAPI.updateProfile(transformedUserData);

        console.log('Profile updated successfully:', updatedUser);

        // Преобразуем enum-значения в нижний регистр при получении ответа
        const processedUser = {
          ...updatedUser,
          user_type: updatedUser.user_type ? updatedUser.user_type.toLowerCase() : updatedUser.user_type,
          gender: updatedUser.gender ? updatedUser.gender.toLowerCase() : updatedUser.gender,
          status: updatedUser.status ? updatedUser.status.toLowerCase() : updatedUser.status
        };

        this.user = { ...this.user, ...processedUser };
        return processedUser;
      } catch (error) {
        console.error('Profile update failed:', error);
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Загрузить программы
    async loadPrograms(force = false) {
      try {
        // Проверяем, не загружали ли мы уже программы, если не указано принудительное обновление
        if (this.programsLoaded && !force) {
          return;
        }

        this.setLoading(true);
        let programs = await programAPI.getAll();

        // Преобразуем enum-значения в нижний регистр для совместимости
        programs = programs.map(program => ({
          ...program,
          program_type: program.program_type ? program.program_type.toLowerCase() : program.program_type
        }));

        this.programs = programs;

        // Разделяем программы по типам
        this.collectivePrograms = this.getProgramsByType('collective');
        this.authorPrograms = this.getProgramsByType('author');

        this.programsLoaded = true; // Устанавливаем флаг, что программы загружены
      } catch (error) {
        this.setError(error.message);
        this.programsLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },
    
    // Загрузить мероприятия
    async loadEvents(force = false) {
      try {
        // Проверяем, не загружали ли мы уже мероприятия, если не указано принудительное обновление
        if (this.eventsLoaded && !force) {
          return;
        }

        this.setLoading(true);
        let events = await eventAPI.getAll();

        // Преобразуем enum-значения в нижний регистр для совместимости
        events = events.map(event => ({
          ...event,
          club_type: event.club_type ? event.club_type.toLowerCase() : event.club_type,
          program_type: event.program_type ? event.program_type.toLowerCase() : event.program_type
        }));

        this.events = events;

        this.eventsLoaded = true; // Устанавливаем флаг, что мероприятия загружены
      } catch (error) {
        this.setError(error.message);
        this.eventsLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },
    
    // Загрузить бронирования пользователя
    async loadUserBookings(force = false) {
      try {
        // Проверяем, не загружали ли мы уже бронирования, если не указано принудительное обновление
        if (this.bookingsLoaded && !force) {
          return;
        }

        this.setLoading(true);
        if (this.user) {
          let bookings = await bookingAPI.getUserBookings(this.user.id);

          // Преобразуем enum-значения в нижний регистр для совместимости
          bookings = bookings.map(booking => ({
            ...booking,
            program_type: booking.program_type ? booking.program_type.toLowerCase() : booking.program_type,
            status: booking.status ? booking.status.toLowerCase() : booking.status
          }));

          this.bookings = bookings;

          this.bookingsLoaded = true; // Устанавливаем флаг, что бронирования загружены
        }
      } catch (error) {
        this.setError(error.message);
        this.bookingsLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },
    
    // Создать бронирование
    async createBooking(bookingData) {
      try {
        this.setLoading(true);

        // Проверяем наличие обязательных полей
        if (!bookingData.user_id && !bookingData.userId && (!this.user || !this.user.id)) {
          throw new Error('Необходимо указать user_id для создания бронирования');
        }

        if (!bookingData.program_type) {
          throw new Error('Необходимо указать program_type для создания бронирования');
        }

        if (!bookingData.booking_date && !bookingData.date) {
          throw new Error('Необходимо указать дату бронирования');
        }

        if (!bookingData.contact_name && !bookingData.name) {
          throw new Error('Необходимо указать имя контакта');
        }

        if (!bookingData.contact_phone && !bookingData.phone) {
          throw new Error('Необходимо указать телефон контакта');
        }

        // Проверяем промокод, если он предоставлен
        let discountPercent = 0;
        if (bookingData.promo_code || bookingData.promoCode) {
          const promoCode = bookingData.promo_code || bookingData.promoCode;
          try {
            const promo = await promoAPI.getByCode(promoCode);

            // Проверяем, активен ли промокод
            if (!promo.is_active) {
              throw new Error('Промокод не активен');
            }

            // Проверяем, достигнут ли лимит использования
            if (promo.max_uses && promo.current_uses >= promo.max_uses) {
              throw new Error('Достигнут лимит использования промокода');
            }

            // Проверяем, действителен ли промокод по дате
            if (promo.valid_from && new Date() < new Date(promo.valid_from)) {
              throw new Error('Промокод еще не действителен');
            }
            if (promo.valid_until && new Date() > new Date(promo.valid_until)) {
              throw new Error('Срок действия промокода истек');
            }

            // Проверяем, подходит ли промокод для типа программы
            if (promo.program_types && bookingData.program_type && !promo.program_types.includes(bookingData.program_type.toUpperCase())) {
              throw new Error('Промокод не применим к данной программе');
            }

            // Проверяем, применим ли промокод только для первого посещения
            if (promo.for_first_visit_only && this.user && this.user.status !== 'NEW') {
              throw new Error('Промокод применим только для первого посещения');
            }

            // Устанавливаем процент скидки
            discountPercent = promo.discount_percent || 0;
          } catch (error) {
            if (error.message.includes('404')) {
              throw new Error('Неверный промокод');
            } else {
              throw error;
            }
          }
        }

        // Подготовка данных для отправки в соответствии со схемой бэкенда
        const transformedBookingData = {
          user_id: bookingData.user_id || bookingData.userId || this.user?.id,
          program_id: bookingData.program_id || bookingData.programId,
          event_id: bookingData.event_id || bookingData.eventId, // Добавляем event_id, если он передан
          program_type: bookingData.program_type ? bookingData.program_type.toUpperCase() : bookingData.program_type,
          booking_date: bookingData.booking_date || bookingData.date,
          contact_name: bookingData.contact_name || bookingData.name,
          contact_phone: bookingData.contact_phone || bookingData.phone,
          participants_count: bookingData.participants_count || bookingData.participants || 1,
          comment: bookingData.comment || '',
          promo_code: bookingData.promo_code || bookingData.promoCode, // Добавляем промокод, если он передан
          discount_percent: discountPercent, // Добавляем процент скидки
          status: bookingData.status ? bookingData.status.toUpperCase() : 'PENDING'
        };

        const newBooking = await bookingAPI.create(transformedBookingData);

        // Преобразуем enum-значения в нижний регистр при получении ответа
        const processedBooking = {
          ...newBooking,
          program_type: newBooking.program_type ? newBooking.program_type.toLowerCase() : newBooking.program_type,
          status: newBooking.status ? newBooking.status.toLowerCase() : newBooking.status
        };

        this.bookings.push(processedBooking);
        return processedBooking;
      } catch (error) {
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
    
    // Отменить бронирование
    async cancelBooking(bookingId) {
      try {
        this.setLoading(true);
        // Используем обновление статуса вместо удаления
        const result = await bookingAPI.updateStatus(bookingId, 'CANCELLED');

        // Преобразуем enum-значения в нижний регистр при получении ответа
        const processedBooking = {
          ...result,
          program_type: result.program_type ? result.program_type.toLowerCase() : result.program_type,
          status: result.status ? result.status.toLowerCase() : result.status
        };

        // Обновляем бронирование в списке
        const index = this.bookings.findIndex(b => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index] = processedBooking;
        }
      } catch (error) {
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Обновить статус бронирования
    async updateBookingStatus(bookingId, status) {
      try {
        this.setLoading(true);
        // Используем обновление статуса
        const result = await bookingAPI.updateStatus(bookingId, status);

        // Преобразуем enum-значения в нижний регистр при получении ответа
        const processedBooking = {
          ...result,
          program_type: result.program_type ? result.program_type.toLowerCase() : result.program_type,
          status: result.status ? result.status.toLowerCase() : result.status
        };

        // Обновляем бронирование в списке
        const index = this.bookings.findIndex(b => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index] = processedBooking;
        }

        return processedBooking;
      } catch (error) {
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить сертификаты
    async loadCertificates(force = false) {
      try {
        // Проверяем, не загружали ли мы уже сертификаты, если не указано принудительное обновление
        if (this.certificatesLoaded && !force) {
          return;
        }

        this.setLoading(true);
        let certificates = await certificateAPI.getAll();

        // Преобразуем enum-значения в нижний регистр для совместимости
        certificates = certificates.map(certificate => ({
          ...certificate,
          certificate_type: certificate.certificate_type ? certificate.certificate_type.toLowerCase() : certificate.certificate_type,
          status: certificate.status ? certificate.status.toLowerCase() : certificate.status
        }));

        this.certificates = certificates;

        this.certificatesLoaded = true; // Устанавливаем флаг, что сертификаты загружены
      } catch (error) {
        this.setError(error.message);
        this.certificatesLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },
    
    // Загрузить промокоды
    async loadPromos(force = false) {
      try {
        // Проверяем, не загружали ли мы уже промокоды, если не указано принудительное обновление
        if (this.promosLoaded && !force) {
          return;
        }

        this.setLoading(true);
        let promos = await promoAPI.getAll();

        // Преобразуем enum-значения в нижний регистр для совместимости
        promos = promos.map(promo => ({
          ...promo,
          promo_type: promo.promo_type ? promo.promo_type.toLowerCase() : promo.promo_type
        }));

        this.promos = promos;

        this.promosLoaded = true; // Устанавливаем флаг, что промокоды загружены
      } catch (error) {
        this.setError(error.message);
        this.promosLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },
    
    // Загрузить настройки лотереи
    async loadLotteryData(force = false) {
      try {
        // Проверяем, не загружали ли мы уже данные лотереи, если не указано принудительное обновление
        if (this.lotteryDataLoaded && !force) {
          return;
        }

        this.setLoading(true);
        this.lotterySettings = await lotteryAPI.getSettings();
        this.lotteryCodes = await lotteryAPI.getCodes();
        this.lotteryPrizes = await lotteryAPI.getPrizes();

        if (this.user) {
          this.userLotteryTickets = await lotteryAPI.getUserTickets(this.user.id);
        }

        this.lotteryDataLoaded = true; // Устанавливаем флаг, что данные лотереи загружены
      } catch (error) {
        this.setError(error.message);
        this.lotteryDataLoaded = false; // Сбрасываем флаг, если произошла ошибка
      } finally {
        this.setLoading(false);
      }
    },

    // Обновить бронирование
    async updateBooking(bookingId, bookingData) {
      try {
        this.setLoading(true);

        // Проверяем промокод, если он предоставлен
        let discountPercent = 0;
        if (bookingData.promo_code || bookingData.promoCode) {
          const promoCode = bookingData.promo_code || bookingData.promoCode;
          try {
            const promo = await promoAPI.getByCode(promoCode);

            // Проверяем, активен ли промокод
            if (!promo.is_active) {
              throw new Error('Промокод не активен');
            }

            // Проверяем, достигнут ли лимит использования
            if (promo.max_uses && promo.current_uses >= promo.max_uses) {
              throw new Error('Достигнут лимит использования промокода');
            }

            // Проверяем, действителен ли промокод по дате
            if (promo.valid_from && new Date() < new Date(promo.valid_from)) {
              throw new Error('Промокод еще не действителен');
            }
            if (promo.valid_until && new Date() > new Date(promo.valid_until)) {
              throw new Error('Срок действия промокода истек');
            }

            // Проверяем, подходит ли промокод для типа программы
            if (promo.program_types && bookingData.program_type && !promo.program_types.includes(bookingData.program_type.toUpperCase())) {
              throw new Error('Промокод не применим к данной программе');
            }

            // Проверяем, применим ли промокод только для первого посещения
            if (promo.for_first_visit_only && this.user && this.user.status !== 'NEW') {
              throw new Error('Промокод применим только для первого посещения');
            }

            // Устанавливаем процент скидки
            discountPercent = promo.discount_percent || 0;
          } catch (error) {
            if (error.message.includes('404')) {
              throw new Error('Неверный промокод');
            } else {
              throw error;
            }
          }
        }

        // Подготовка данных для отправки в соответствии со схемой бэкенда
        const transformedBookingData = {
          user_id: bookingData.userId || bookingData.user_id,
          program_id: bookingData.programId || bookingData.program_id,
          event_id: bookingData.event_id || bookingData.eventId, // Добавляем event_id, если он передан
          program_type: bookingData.program_type ? bookingData.program_type.toUpperCase() : bookingData.program_type,
          booking_date: bookingData.booking_date || bookingData.date,
          contact_name: bookingData.contact_name || bookingData.name,
          contact_phone: bookingData.contact_phone || bookingData.phone,
          participants_count: bookingData.participants_count || bookingData.participants || 1,
          comment: bookingData.comment || '',
          promo_code: bookingData.promo_code || bookingData.promoCode, // Добавляем промокод, если он передан
          discount_percent: discountPercent, // Добавляем процент скидки
          status: bookingData.status ? bookingData.status.toUpperCase() : bookingData.status
        };

        const updatedBooking = await bookingAPI.update(bookingId, transformedBookingData);

        // Преобразуем enum-значения в нижний регистр при получении ответа
        const processedBooking = {
          ...updatedBooking,
          program_type: updatedBooking.program_type ? updatedBooking.program_type.toLowerCase() : updatedBooking.program_type,
          status: updatedBooking.status ? updatedBooking.status.toLowerCase() : updatedBooking.status
        };

        // Обновляем бронирование в списке
        const index = this.bookings.findIndex(b => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index] = processedBooking;
        }

        return processedBooking;
      } catch (error) {
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить пользователей
    async loadUsers() {
      try {
        this.setLoading(true);
        let users = await userAPI.getAll();

        // Преобразуем enum-значения в нижний регистр для совместимости
        users = users.map(user => ({
          ...user,
          user_type: user.user_type ? user.user_type.toLowerCase() : user.user_type,
          gender: user.gender ? user.gender.toLowerCase() : user.gender,
          status: user.status ? user.status.toLowerCase() : user.status
        }));

        this.users = users;
      } catch (error) {
        this.setError(error.message);
      } finally {
        this.setLoading(false);
      }
    },

    // Установить пользователя (для обновления данных)
    setUser(userData) {
      // Преобразуем enum-значения в нижний регистр для совместимости
      const processedUser = {
        ...userData,
        user_type: userData.user_type ? userData.user_type.toLowerCase() : userData.user_type,
        gender: userData.gender ? userData.gender.toLowerCase() : userData.gender,
        status: userData.status ? userData.status.toLowerCase() : userData.status
      };
      this.user = processedUser;
    },

    // Получить пользователя по Telegram ID
    async getUserByTelegramId(telegramId) {
      try {
        this.setLoading(true);
        let user = await userAPI.getByTelegramId(telegramId);

        // Преобразуем enum-значения в нижний регистр для совместимости
        user = {
          ...user,
          user_type: user.user_type ? user.user_type.toLowerCase() : user.user_type,
          gender: user.gender ? user.gender.toLowerCase() : user.gender,
          status: user.status ? user.status.toLowerCase() : user.status
        };

        return user;
      } catch (error) {
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Создать сертификат
    async createCertificate(certificateData) {
      try {
        this.setLoading(true);

        // Подготовим данные для отправки в соответствии со схемой бэкенда
        const transformedCertificateData = {
          certificate_type: certificateData.certificate_type ? certificateData.certificate_type.toUpperCase() : certificateData.certificate_type,
          format: certificateData.format,
          recipient_name: certificateData.recipient_name,
          recipient_phone: certificateData.recipient_phone,
          buyer_name: certificateData.buyer_name,
          buyer_phone: certificateData.buyer_phone,
          program_id: certificateData.program_id,
          amount: certificateData.amount,
          user_id: this.user?.id
        };

        const newCertificate = await certificateAPI.create(transformedCertificateData);

        // Преобразуем enum-значения в нижний регистр при получении ответа
        const processedCertificate = {
          ...newCertificate,
          certificate_type: newCertificate.certificate_type ? newCertificate.certificate_type.toLowerCase() : newCertificate.certificate_type,
          format: newCertificate.format ? newCertificate.format.toLowerCase() : newCertificate.format
        };

        // Добавим сертификат в список
        this.certificates.push(processedCertificate);

        return processedCertificate;
      } catch (error) {
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
});
