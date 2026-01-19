// Тестовый скрипт для проверки автоматического скрытия ошибок

// Имитация работы store
const testStore = {
  error: null,
  errorTimeoutId: null,
  
  setError(error) {
    // Очищаем предыдущий таймер, если он существует
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
      this.errorTimeoutId = null;
    }
    
    this.error = error;
    console.log('Ошибка установлена:', error);
    
    // Автоматически скрываем ошибку через 10 секунд
    this.errorTimeoutId = setTimeout(() => {
      this.clearError();
    }, 2000); // Для теста используем 2 секунды вместо 10
  },
  
  clearError() {
    this.error = null;
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
      this.errorTimeoutId = null;
    }
    console.log('Ошибка автоматически скрыта');
  },
  
  setLoading(loading) {
    if (loading && this.error) {
      this.clearError();
    }
  }
};

// Тестирование
console.log('Тест 1: Установка ошибки');
testStore.setError('Произошла тестовая ошибка');

setTimeout(() => {
  console.log('Тест 2: Состояние через 3 секунды (ошибка должна быть скрыта):', testStore.error);
  
  console.log('Тест 3: Установка новой ошибки');
  testStore.setError('Новая тестовая ошибка');
  
  setTimeout(() => {
    console.log('Тест 4: Состояние через 5 секунд (новая ошибка должна быть скрыта):', testStore.error);
    
    console.log('Тест 5: Установка ошибки и немедленная очистка через setLoading');
    testStore.setError('Ошибка, которую нужно очистить');
    console.log('Ошибка до вызова setLoading:', testStore.error);
    testStore.setLoading(true);
    console.log('Ошибка после вызова setLoading:', testStore.error);
  }, 3000);
  
}, 3000);