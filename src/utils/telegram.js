// Утилиты для работы с Telegram WebApp

// Получение данных пользователя из Telegram WebApp
export function getTelegramUserInfo() {
  try {
    const tgApp = window.Telegram?.WebApp;

    if (!tgApp) {
      console.warn("Telegram WebApp not available");
      return null;
    }

    const initData = tgApp.initDataUnsafe;

    if (!initData || !initData.user) {
      console.warn("No user data in Telegram WebApp");
      console.log("initDataUnsafe:", initData);
      return null;
    }

    const user = initData.user;
    return {
      id: user.id,
      username: user.username || `user_${user.id}`,
      firstName: user.first_name,
      lastName: user.last_name || "",
      photoUrl: user.photo_url,
      authDate: initData.auth_date || Date.now(),
    };
  } catch (error) {
    console.error("Error getting Telegram user info:", error);
    return null;
  }
}

// Получение initData для отправки на бэкенд
export function getTelegramInitData() {
  try {
    const tgApp = window.Telegram?.WebApp;

    if (!tgApp) {
      console.warn("Telegram WebApp not available");
      return null;
    }

    // КРИТИЧНО: Используем ТОЛЬКО оригинальный initData от Telegram
    // НЕ пересоздаём его из initDataUnsafe - hash будет неправильный!
    const initData = tgApp.initData;

    console.log("=== TELEGRAM INIT DATA DEBUG ===");
    console.log("window.Telegram exists:", !!window.Telegram);
    console.log("window.Telegram.WebApp exists:", !!window.Telegram?.WebApp);
    console.log("initData exists:", !!initData);
    console.log("initData length:", initData ? initData.length : 0);
    console.log(
      "initData preview:",
      initData ? initData.substring(0, 200) : "EMPTY"
    );
    console.log("initDataUnsafe:", tgApp.initDataUnsafe);
    console.log("================================");

    if (!initData) {
      console.error(
        "CRITICAL: No init data in Telegram WebApp - initData is empty!"
      );
      console.error(
        "This means the app was not opened through Telegram bot menu button"
      );
      return null;
    }

    return initData;
  } catch (error) {
    console.error("Error getting Telegram init data:", error);
    return null;
  }
}

// Проверка наличия валидных данных Telegram
export function hasValidTelegramData() {
  const userInfo = getTelegramUserInfo();
  const initData = getTelegramInitData();

  console.log("hasValidTelegramData check:");
  console.log("  userInfo:", userInfo);
  console.log("  initData exists:", !!initData);

  return !!(userInfo && initData);
}

// Инициализация Telegram WebApp
export function initTelegramWebApp() {
  try {
    const tgApp = window.Telegram?.WebApp;

    if (!tgApp) {
      console.warn("Telegram WebApp not available");
      return false;
    }

    console.log("=== TELEGRAM WEBAPP INITIALIZATION ===");
    console.log("Telegram WebApp version:", tgApp.version);
    console.log("Telegram WebApp platform:", tgApp.platform);
    console.log("Is Telegram WebApp:", tgApp.initData ? "YES" : "NO");

    // Инициализация WebApp
    tgApp.ready();
    console.log("Telegram WebApp ready() called");

    // Настройка внешнего вида
    tgApp.expand();
    tgApp.setBackgroundColor("#f9eee0");
    tgApp.setHeaderColor("bg_color");

    // Показываем кнопку "Назад"
    tgApp.BackButton.show();

    // Устанавливаем обработчик кнопки "Назад"
    tgApp.BackButton.onClick(() => {
      window.history.back();
    });

    console.log("Telegram WebApp initialized successfully");
    console.log("======================================");
    return true;
  } catch (error) {
    console.error("Error initializing Telegram WebApp:", error);
    return false;
  }
}
