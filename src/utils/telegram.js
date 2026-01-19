// Утилиты для работы с Telegram WebApp

// Получение данных пользователя из Telegram WebApp
export function getTelegramUserInfo() {
  try {
    const tgApp = window.Telegram?.WebApp;
    
    if (!tgApp) {
      console.warn('Telegram WebApp not available');
      return null;
    }

    const initData = tgApp.initDataUnsafe;
    
    if (!initData || !initData.user) {
      console.warn('No user data in Telegram WebApp');
      return null;
    }

    const user = initData.user;
    return {
      id: user.id,
      username: user.username || `user_${user.id}`,
      firstName: user.first_name,
      lastName: user.last_name || '',
      photoUrl: user.photo_url,
      authDate: initData.auth_date || Date.now()
    };
  } catch (error) {
    console.error('Error getting Telegram user info:', error);
    return null;
  }
}

// Получение initData для отправки на бэкенд
export function getTelegramInitData() {
  try {
    const tgApp = window.Telegram?.WebApp;
    
    if (!tgApp) {
      console.warn('Telegram WebApp not available');
      return null;
    }

    const initData = tgApp.initData;
    
    if (!initData) {
      console.warn('No init data in Telegram WebApp');
      return null;
    }

    return initData;
  } catch (error) {
    console.error('Error getting Telegram init data:', error);
    return null;
  }
}

// Проверка наличия валидных данных Telegram
export function hasValidTelegramData() {
  const userInfo = getTelegramUserInfo();
  const initData = getTelegramInitData();
  
  return !!(userInfo && initData);
}

// Инициализация Telegram WebApp
export function initTelegramWebApp() {
  try {
    const tgApp = window.Telegram?.WebApp;
    
    if (!tgApp) {
      console.warn('Telegram WebApp not available, running in browser mode');
      return false;
    }

    // Инициализация WebApp
    tgApp.ready();
    
    // Настройка внешнего вида
    tgApp.expand();
    tgApp.setBackgroundColor('#f9eee0');
    tgApp.setHeaderColor('bg_color');
    
    // Показываем кнопку "Назад"
    tgApp.BackButton.show();
    
    // Устанавливаем обработчик кнопки "Назад"
    tgApp.BackButton.onClick(() => {
      window.history.back();
    });
    
    console.log('Telegram WebApp initialized successfully');
    return true;
  } catch (error) {
    console.error('Error initializing Telegram WebApp:', error);
    return false;
  }
}

// Создание тестовых данных для разработки (больше не используется)
export function createTestTelegramData() {
  return null;
}
