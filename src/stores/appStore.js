import { defineStore } from "pinia";
import {
  userAPI,
  authAPI,
  programAPI,
  eventAPI,
  bookingAPI,
  certificateAPI,
  promoAPI,
  lotteryAPI,
} from "@/utils/api";
import { getTelegramUserInfo } from "@/utils/telegram";

// Утилиты для преобразования enum значений
const transformEnumsToLowerCase = (obj) => {
  if (!obj) return obj;

  const transformed = { ...obj };

  // Список полей с enum значениями
  const enumFields = [
    "user_type",
    "gender",
    "status",
    "program_type",
    "club_type",
    "certificate_type",
    "promo_type",
    "format",
  ];

  enumFields.forEach((field) => {
    if (transformed[field] && typeof transformed[field] === "string") {
      transformed[field] = transformed[field].toLowerCase();
    }
  });

  return transformed;
};

const transformEnumsToUpperCase = (obj) => {
  if (!obj) return obj;

  const transformed = { ...obj };

  // Список полей с enum значениями
  const enumFields = [
    "user_type",
    "gender",
    "status",
    "program_type",
    "club_type",
    "certificate_type",
    "promo_type",
    "format",
  ];

  enumFields.forEach((field) => {
    if (transformed[field] && typeof transformed[field] === "string") {
      transformed[field] = transformed[field].toUpperCase();
    }
  });

  return transformed;
};

export const useAppStore = defineStore("app", {
  persist: {
    pick: ["user", "isAuthenticated"], // Сохраняем только пользователя и статус аутентификации
  },
  state: () => ({
    // Состояние пользователя
    user: null,
    isAuthenticated: false,
    userLoaded: false,

    // Состояние программ
    programs: [],
    collectivePrograms: [],
    authorPrograms: [],
    programsLoaded: false,

    // Состояние мероприятий
    events: [],
    eventsLoaded: false,

    // Состояние бронирований
    bookings: [],
    bookingsLoaded: false,

    // Состояние сертификатов и промокодов
    certificates: [],
    promos: [],
    certificatesLoaded: false,
    promosLoaded: false,

    // Состояние лотереи
    lotterySettings: null,
    lotteryCodes: [],
    lotteryPrizes: [],
    userLotteryTickets: [],
    lotteryDataLoaded: false,

    // Состояние загрузки
    isLoading: false,
    error: null,
    errorTimeoutId: null,

    // Состояние контента
    contentData: {},

    // Список пользователей (для админки)
    users: [],
    usersLoaded: false,
  }),

  getters: {
    // Получить пользователя
    getUser: (state) => state.user,

    // Получить программы определенного типа
    getProgramsByType: (state) => (type) => {
      const normalizedType = type.toLowerCase();
      return state.programs.filter(
        (program) => program.program_type === normalizedType
      );
    },

    // Получить активные промокоды
    getActivePromos: (state) => {
      return state.promos.filter((promo) => promo.is_active);
    },

    // Получить бронирования пользователя
    getUserBookings: (state) => {
      if (!state.user) return [];
      return state.bookings.filter(
        (booking) => booking.user_id === state.user.id
      );
    },

    // Проверка, является ли пользователь администратором
    isAdmin: (state) => {
      return state.user?.user_type === "admin";
    },
  },

  actions: {
    // Установить состояние загрузки
    setLoading(loading) {
      this.isLoading = loading;
      if (loading && this.error) {
        this.clearError();
      }
    },

    // Установить ошибку
    setError(error) {
      if (this.errorTimeoutId) {
        clearTimeout(this.errorTimeoutId);
        this.errorTimeoutId = null;
      }

      this.error = error;
      console.error("Store error:", error);

      // Автоматически скрываем ошибку через 10 секунд
      this.errorTimeoutId = setTimeout(() => {
        this.clearError();
      }, 10000);
    },

    // Очистить ошибку
    clearError() {
      this.error = null;
      if (this.errorTimeoutId) {
        clearTimeout(this.errorTimeoutId);
        this.errorTimeoutId = null;
      }
    },

    // Аутентифицировать пользователя
    async authenticate(force = false) {
      try {
        if (this.userLoaded && !force) {
          console.log("User already loaded, skipping authentication");
          return;
        }

        this.setLoading(true);
        console.log("Authenticating user...");

        // Получаем информацию о пользователе из Telegram
        const telegramUser = getTelegramUserInfo();
        if (telegramUser) {
          console.log("Telegram user info:", {
            id: telegramUser.id,
            username: telegramUser.username,
            firstName: telegramUser.firstName,
          });
        }

        // Проверяем аутентификацию через API
        const userData = await authAPI.getCurrentUser();
        console.log("User data received from API:", userData);

        // Преобразуем enum-значения
        this.user = transformEnumsToLowerCase(userData);
        this.isAuthenticated = true;
        this.userLoaded = true;

        console.log("Authentication successful, user:", this.user);
      } catch (error) {
        console.error("Authentication failed:", error);
        this.setError(error.message);
        this.isAuthenticated = false;
        this.userLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Обновить профиль пользователя
    async updateUserProfile(userData) {
      try {
        this.setLoading(true);
        console.log("Updating user profile with data:", userData);

        // Преобразуем enum-значения в верхний регистр перед отправкой
        const transformedUserData = transformEnumsToUpperCase(userData);
        console.log("Transformed user data for API:", transformedUserData);

        const updatedUser = await userAPI.updateProfile(transformedUserData);
        console.log("Profile updated successfully:", updatedUser);

        // Преобразуем enum-значения в нижний регистр
        this.user = { ...this.user, ...transformEnumsToLowerCase(updatedUser) };
        return this.user;
      } catch (error) {
        console.error("Profile update failed:", error);
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить программы
    async loadPrograms(force = false) {
      try {
        if (this.programsLoaded && !force) {
          console.log("Programs already loaded, skipping");
          return;
        }

        this.setLoading(true);
        const programs = await programAPI.getAll();

        // Преобразуем enum-значения
        this.programs = programs.map(transformEnumsToLowerCase);

        // Разделяем программы по типам
        this.collectivePrograms = this.getProgramsByType("collective");
        this.authorPrograms = this.getProgramsByType("author");

        this.programsLoaded = true;
        console.log(`Loaded ${this.programs.length} programs`);
      } catch (error) {
        console.error("Failed to load programs:", error);
        this.setError(error.message);
        this.programsLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить мероприятия
    async loadEvents(force = false) {
      try {
        if (this.eventsLoaded && !force) {
          console.log("Events already loaded, skipping");
          return;
        }

        this.setLoading(true);
        const events = await eventAPI.getAll();

        // Преобразуем enum-значения
        this.events = events.map(transformEnumsToLowerCase);
        this.eventsLoaded = true;
        console.log(`Loaded ${this.events.length} events`);
      } catch (error) {
        console.error("Failed to load events:", error);
        this.setError(error.message);
        this.eventsLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить бронирования пользователя
    async loadUserBookings(force = false) {
      try {
        if (this.bookingsLoaded && !force) {
          console.log("Bookings already loaded, skipping");
          return;
        }

        if (!this.user) {
          console.warn("No user available, cannot load bookings");
          return;
        }

        this.setLoading(true);
        const bookings = await bookingAPI.getUserBookings(this.user.id);

        // Преобразуем enum-значения
        this.bookings = bookings.map(transformEnumsToLowerCase);
        this.bookingsLoaded = true;
        console.log(`Loaded ${this.bookings.length} bookings`);
      } catch (error) {
        console.error("Failed to load bookings:", error);
        this.setError(error.message);
        this.bookingsLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Создать бронирование
    async createBooking(bookingData) {
      try {
        this.setLoading(true);

        // Проверяем наличие обязательных полей
        if (!bookingData.user_id && !bookingData.userId && !this.user?.id) {
          throw new Error(
            "Необходимо указать user_id для создания бронирования"
          );
        }

        if (!bookingData.program_type) {
          throw new Error(
            "Необходимо указать program_type для создания бронирования"
          );
        }

        if (!bookingData.booking_date && !bookingData.date) {
          throw new Error("Необходимо указать дату бронирования");
        }

        if (!bookingData.contact_name && !bookingData.name) {
          throw new Error("Необходимо указать имя контакта");
        }

        if (!bookingData.contact_phone && !bookingData.phone) {
          throw new Error("Необходимо указать телефон контакта");
        }

        // Проверяем промокод, если он предоставлен
        let discountPercent = 0;
        const promoCode = bookingData.promo_code || bookingData.promoCode;

        if (promoCode) {
          try {
            const promo = await promoAPI.getByCode(promoCode);

            if (!promo.is_active) {
              throw new Error("Промокод не активен");
            }

            if (promo.max_uses && promo.current_uses >= promo.max_uses) {
              throw new Error("Достигнут лимит использования промокода");
            }

            const now = new Date();
            if (promo.valid_from && now < new Date(promo.valid_from)) {
              throw new Error("Промокод еще не действителен");
            }
            if (promo.valid_until && now > new Date(promo.valid_until)) {
              throw new Error("Срок действия промокода истек");
            }

            if (
              promo.program_types?.length &&
              bookingData.program_type &&
              !promo.program_types.includes(
                bookingData.program_type.toUpperCase()
              )
            ) {
              throw new Error("Промокод не применим к данной программе");
            }

            if (promo.for_first_visit_only && this.user?.status !== "new") {
              throw new Error("Промокод применим только для первого посещения");
            }

            discountPercent = promo.discount_percent || 0;
          } catch (error) {
            if (error.message.includes("404")) {
              throw new Error("Неверный промокод");
            }
            throw error;
          }
        }

        // Подготовка данных для отправки
        const transformedBookingData = {
          user_id: bookingData.user_id || bookingData.userId || this.user?.id,
          program_id: bookingData.program_id || bookingData.programId,
          event_id: bookingData.event_id || bookingData.eventId,
          program_type: (bookingData.program_type || "").toUpperCase(),
          booking_date: bookingData.booking_date || bookingData.date,
          contact_name: bookingData.contact_name || bookingData.name,
          contact_phone: bookingData.contact_phone || bookingData.phone,
          participants_count:
            bookingData.participants_count || bookingData.participants || 1,
          comment: bookingData.comment || "",
          promo_code: promoCode,
          discount_percent: discountPercent,
          status: bookingData.status
            ? bookingData.status.toUpperCase()
            : "PENDING",
        };

        const newBooking = await bookingAPI.create(transformedBookingData);

        // Преобразуем и добавляем в список
        const processedBooking = transformEnumsToLowerCase(newBooking);
        this.bookings.push(processedBooking);

        console.log("Booking created successfully:", processedBooking);
        return processedBooking;
      } catch (error) {
        console.error("Failed to create booking:", error);
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
        const result = await bookingAPI.updateStatus(bookingId, "CANCELLED");

        const processedBooking = transformEnumsToLowerCase(result);

        // Обновляем бронирование в списке
        const index = this.bookings.findIndex((b) => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index] = processedBooking;
        }

        console.log("Booking cancelled:", bookingId);
        return processedBooking;
      } catch (error) {
        console.error("Failed to cancel booking:", error);
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
        const result = await bookingAPI.updateStatus(
          bookingId,
          status.toUpperCase()
        );

        const processedBooking = transformEnumsToLowerCase(result);

        // Обновляем бронирование в списке
        const index = this.bookings.findIndex((b) => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index] = processedBooking;
        }

        console.log("Booking status updated:", { bookingId, status });
        return processedBooking;
      } catch (error) {
        console.error("Failed to update booking status:", error);
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Обновить бронирование
    async updateBooking(bookingId, bookingData) {
      try {
        this.setLoading(true);

        // Проверяем промокод
        let discountPercent = 0;
        const promoCode = bookingData.promo_code || bookingData.promoCode;

        if (promoCode) {
          try {
            const promo = await promoAPI.getByCode(promoCode);

            if (!promo.is_active) {
              throw new Error("Промокод не активен");
            }

            if (promo.max_uses && promo.current_uses >= promo.max_uses) {
              throw new Error("Достигнут лимит использования промокода");
            }

            const now = new Date();
            if (promo.valid_from && now < new Date(promo.valid_from)) {
              throw new Error("Промокод еще не действителен");
            }
            if (promo.valid_until && now > new Date(promo.valid_until)) {
              throw new Error("Срок действия промокода истек");
            }

            if (
              promo.program_types?.length &&
              bookingData.program_type &&
              !promo.program_types.includes(
                bookingData.program_type.toUpperCase()
              )
            ) {
              throw new Error("Промокод не применим к данной программе");
            }

            if (promo.for_first_visit_only && this.user?.status !== "new") {
              throw new Error("Промокод применим только для первого посещения");
            }

            discountPercent = promo.discount_percent || 0;
          } catch (error) {
            if (error.message.includes("404")) {
              throw new Error("Неверный промокод");
            }
            throw error;
          }
        }

        // Подготовка данных
        const transformedBookingData = {
          user_id: bookingData.userId || bookingData.user_id,
          program_id: bookingData.programId || bookingData.program_id,
          event_id: bookingData.event_id || bookingData.eventId,
          program_type: bookingData.program_type
            ? bookingData.program_type.toUpperCase()
            : undefined,
          booking_date: bookingData.booking_date || bookingData.date,
          contact_name: bookingData.contact_name || bookingData.name,
          contact_phone: bookingData.contact_phone || bookingData.phone,
          participants_count:
            bookingData.participants_count || bookingData.participants || 1,
          comment: bookingData.comment || "",
          promo_code: promoCode,
          discount_percent: discountPercent,
          status: bookingData.status
            ? bookingData.status.toUpperCase()
            : undefined,
        };

        const updatedBooking = await bookingAPI.update(
          bookingId,
          transformedBookingData
        );

        const processedBooking = transformEnumsToLowerCase(updatedBooking);

        // Обновляем в списке
        const index = this.bookings.findIndex((b) => b.id === bookingId);
        if (index !== -1) {
          this.bookings[index] = processedBooking;
        }

        console.log("Booking updated:", bookingId);
        return processedBooking;
      } catch (error) {
        console.error("Failed to update booking:", error);
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить сертификаты
    async loadCertificates(force = false) {
      try {
        if (this.certificatesLoaded && !force) {
          console.log("Certificates already loaded, skipping");
          return;
        }

        this.setLoading(true);
        const certificates = await certificateAPI.getAll();

        this.certificates = certificates.map(transformEnumsToLowerCase);
        this.certificatesLoaded = true;
        console.log(`Loaded ${this.certificates.length} certificates`);
      } catch (error) {
        console.error("Failed to load certificates:", error);
        this.setError(error.message);
        this.certificatesLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить промокоды
    async loadPromos(force = false) {
      try {
        if (this.promosLoaded && !force) {
          console.log("Promos already loaded, skipping");
          return;
        }

        this.setLoading(true);
        const promos = await promoAPI.getAll();

        this.promos = promos.map(transformEnumsToLowerCase);
        this.promosLoaded = true;
        console.log(`Loaded ${this.promos.length} promos`);
      } catch (error) {
        console.error("Failed to load promos:", error);
        this.setError(error.message);
        this.promosLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить настройки лотереи
    async loadLotteryData(force = false) {
      try {
        if (this.lotteryDataLoaded && !force) {
          console.log("Lottery data already loaded, skipping");
          return;
        }

        this.setLoading(true);

        const [settings, codes, prizes] = await Promise.all([
          lotteryAPI.getSettings(),
          lotteryAPI.getCodes(),
          lotteryAPI.getPrizes(),
        ]);

        this.lotterySettings = settings;
        this.lotteryCodes = codes;
        this.lotteryPrizes = prizes;

        if (this.user) {
          this.userLotteryTickets = await lotteryAPI.getUserTickets(
            this.user.id
          );
        }

        this.lotteryDataLoaded = true;
        console.log("Lottery data loaded successfully");
      } catch (error) {
        console.error("Failed to load lottery data:", error);
        this.setError(error.message);
        this.lotteryDataLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Загрузить пользователей
    async loadUsers(force = false) {
      try {
        if (this.usersLoaded && !force) {
          console.log("Users already loaded, skipping");
          return;
        }

        this.setLoading(true);
        const users = await userAPI.getAll();

        this.users = users.map(transformEnumsToLowerCase);
        this.usersLoaded = true;
        console.log(`Loaded ${this.users.length} users`);
      } catch (error) {
        console.error("Failed to load users:", error);
        this.setError(error.message);
        this.usersLoaded = false;
        throw error;
      } finally {
        this.setLoading(false);
      }
    },

    // Установить пользователя (для обновления данных)
    setUser(userData) {
      this.user = transformEnumsToLowerCase(userData);
    },

    // Получить пользователя по Telegram ID
    async getUserByTelegramId(telegramId) {
      try {
        this.setLoading(true);
        const user = await userAPI.getByTelegramId(telegramId);

        return transformEnumsToLowerCase(user);
      } catch (error) {
        console.error("Failed to get user by Telegram ID:", error);
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

        const transformedCertificateData = {
          certificate_type: certificateData.certificate_type?.toUpperCase(),
          format: certificateData.format,
          recipient_name: certificateData.recipient_name,
          recipient_phone: certificateData.recipient_phone,
          buyer_name: certificateData.buyer_name,
          buyer_phone: certificateData.buyer_phone,
          program_id: certificateData.program_id,
          amount: certificateData.amount,
          user_id: this.user?.id,
        };

        const newCertificate = await certificateAPI.create(
          transformedCertificateData
        );

        const processedCertificate = transformEnumsToLowerCase(newCertificate);
        this.certificates.push(processedCertificate);

        console.log("Certificate created successfully:", processedCertificate);
        return processedCertificate;
      } catch (error) {
        console.error("Failed to create certificate:", error);
        this.setError(error.message);
        throw error;
      } finally {
        this.setLoading(false);
      }
    },
  },
});
