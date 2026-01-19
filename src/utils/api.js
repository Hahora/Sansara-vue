// src/utils/api.js - Основной файл для взаимодействия с API

import { getTelegramInitData } from "./telegram.js";

// Базовый URL API
const API_BASE_URL = import.meta.env.VITE_API_URL || "";

// Функция для получения данных аутентификации из Telegram WebApp
function getTelegramAuthData() {
  const initData = getTelegramInitData();

  if (initData) {
    console.log("Telegram WebApp initData found");
    console.log("InitData length:", initData.length);
    console.log("InitData preview:", initData.substring(0, 150) + "...");

    const hasUser = initData.includes("user=");
    const hasHash = initData.includes("hash=");
    const hasAuthDate = initData.includes("auth_date=");

    console.log("InitData validation:", { hasUser, hasHash, hasAuthDate });

    if (!hasUser || !hasHash) {
      console.error("InitData missing required fields");
      return null;
    }
  } else {
    console.error("No Telegram WebApp initData available");
  }

  return initData;
}

// Функция для получения Telegram ID пользователя
function getTelegramUserId() {
  if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
    return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
  }
  return null;
}

// Базовая функция для выполнения запросов к API
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  // Добавляем данные аутентификации Telegram
  const telegramAuthData = getTelegramAuthData();

  // Если нет данных Telegram, не отправляем запрос (кроме health check)
  if (!telegramAuthData && !endpoint.includes("/health")) {
    console.error("No Telegram auth data available - request blocked");
    throw new Error(
      "Telegram authentication required. Please open the app through Telegram."
    );
  }

  // Для ВСЕХ типов запросов добавляем __init_data в тело
  if (telegramAuthData) {
    let bodyData = {};

    // Парсим существующее тело запроса, если оно есть
    if (config.body) {
      try {
        bodyData = JSON.parse(config.body);
      } catch (e) {
        console.warn("Could not parse existing request body:", e);
      }
    }

    // Добавляем __init_data (с двойным подчеркиванием)
    bodyData.__init_data = telegramAuthData;
    config.body = JSON.stringify(bodyData);
    console.log("Added __init_data to request body");
  }

  try {
    console.log(`Making ${config.method || "GET"} request to: ${url}`);

    const response = await fetch(url, config);

    console.log(`Response status: ${response.status}`);
    console.log(
      `Response content-type: ${response.headers.get("content-type")}`
    );

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.message || errorMessage;
          console.error("API Error:", errorData);
        } else {
          const errorText = await response.text();
          console.warn("Non-JSON error response:", errorText);
          errorMessage = errorText || errorMessage;
        }
      } catch (e) {
        console.warn("Could not parse error response:", e);
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return {};
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      console.warn(`Expected JSON response but got ${contentType}`);
    }

    const responseText = await response.text();

    if (!responseText.trim()) {
      console.log("Empty response body");
      return {};
    }

    try {
      const trimmedText = responseText.trim();

      if (!trimmedText.startsWith("{") && !trimmedText.startsWith("[")) {
        console.error(
          "Response does not appear to be JSON:",
          trimmedText.substring(0, 100)
        );
        throw new Error(
          `Response is not valid JSON. Received: ${trimmedText.substring(0, 100)}...`
        );
      }

      const data = JSON.parse(trimmedText);
      console.log("Successfully parsed response");
      return data;
    } catch (e) {
      console.error("Failed to parse JSON response:", e);
      console.error("Raw response:", responseText.substring(0, 500));
      throw new Error(`Invalid JSON response: ${e.message}`);
    }
  } catch (error) {
    console.error(`Request error for ${url}:`, error);

    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new Error(
        `Network error: Could not connect to ${url}. Please check your connection.`
      );
    }
    throw error;
  }
}

// ============================================================================
// ЭКСПОРТЫ API
// ============================================================================

// Аутентификация
export const authAPI = {
  verify: () => apiRequest("/api/v1/auth/verify", { method: "POST" }),
  getCurrentUser: () => apiRequest("/api/v1/auth/me", { method: "GET" }),
};

// Пользователи
export const userAPI = {
  getByTelegramId: (telegramId) =>
    apiRequest(`/api/v1/users/${telegramId}`, { method: "GET" }),

  updateProfile: (userData) => {
    const telegramId = getTelegramUserId();
    if (!telegramId) {
      return Promise.reject(
        new Error(
          "Telegram ID не найден. Убедитесь, что вы запустили приложение через Telegram."
        )
      );
    }
    return apiRequest(`/api/v1/users/profile/${telegramId}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  },

  getAll: (params = {}) => {
    const queryParams = new URLSearchParams(params);
    return apiRequest(`/api/v1/users/?${queryParams}`, { method: "GET" });
  },
};

// Программы
export const programAPI = {
  getAll: () => apiRequest("/api/v1/programs/", { method: "GET" }),
  getById: (programId) =>
    apiRequest(`/api/v1/programs/${programId}`, { method: "GET" }),
  getByType: (programType) =>
    apiRequest(`/api/v1/programs/type/${programType}`, { method: "GET" }),
};

// Мероприятия
export const eventAPI = {
  getAll: () => apiRequest("/api/v1/events/", { method: "GET" }),
  getById: (eventId) =>
    apiRequest(`/api/v1/events/${eventId}`, { method: "GET" }),
};

// Бронирования
export const bookingAPI = {
  create: (bookingData) =>
    apiRequest("/api/v1/bookings/", {
      method: "POST",
      body: JSON.stringify(bookingData),
    }),

  getUserBookings: (userId) =>
    apiRequest(`/api/v1/bookings/?user_id=${userId}`, { method: "GET" }),
  getById: (bookingId) =>
    apiRequest(`/api/v1/bookings/${bookingId}`, { method: "GET" }),

  update: (bookingId, bookingData) =>
    apiRequest(`/api/v1/bookings/${bookingId}`, {
      method: "PUT",
      body: JSON.stringify(bookingData),
    }),

  cancel: (bookingId) =>
    apiRequest(`/api/v1/bookings/${bookingId}`, {
      method: "DELETE",
    }),

  updateStatus: (bookingId, status) =>
    apiRequest(`/api/v1/bookings/${bookingId}/status?status=${status}`, {
      method: "PATCH",
    }),
};

// Сертификаты
export const certificateAPI = {
  getAll: () => apiRequest("/api/v1/certificates/", { method: "GET" }),
  getByCode: (code) =>
    apiRequest(`/api/v1/certificates/code/${code}`, { method: "GET" }),
  create: (certificateData) =>
    apiRequest("/api/v1/certificates/", {
      method: "POST",
      body: JSON.stringify(certificateData),
    }),
};

// Промокоды
export const promoAPI = {
  getAll: () =>
    apiRequest("/api/v1/certificates/promocodes/", { method: "GET" }),
  getByCode: (code) =>
    apiRequest(`/api/v1/certificates/promocodes/code/${code}`, {
      method: "GET",
    }),
};

// Лотерея
export const lotteryAPI = {
  getSettings: () => apiRequest("/api/v1/lottery/settings", { method: "GET" }),
  getCodes: () => apiRequest("/api/v1/lottery/codes/", { method: "GET" }),
  getPrizes: () => apiRequest("/api/v1/lottery/prizes/", { method: "GET" }),
  getUserTickets: (userId) =>
    apiRequest(`/api/v1/lottery/tickets/user/${userId}`, { method: "GET" }),
};
