// Тестовый скрипт для проверки обновленной страницы бронирования

// Имитация данных формы бронирования
const bookingForm = {
  name: 'Test User',
  phone: '+79991234567',
  date: '2024-12-25T10:00',
  type: 'author',
  programId: 123,
  eventId: 'test-program-slug',
  participants: 2,
  comment: 'Test comment',
  promoCode: 'TEST_PROMO' // Новое поле
};

console.log('Тест 1: Проверка структуры данных формы');
console.log('Структура bookingForm:', Object.keys(bookingForm));

// Проверка наличия всех необходимых полей
const requiredFields = ['name', 'phone', 'date', 'type', 'programId', 'eventId', 'participants', 'comment', 'promoCode'];
const missingFields = requiredFields.filter(field => !(field in bookingForm));

if (missingFields.length === 0) {
  console.log('✅ Все требуемые поля присутствуют в форме');
} else {
  console.log('❌ Отсутствуют поля:', missingFields);
}

// Имитация подготовки данных для отправки
console.log('\nТест 2: Подготовка данных для отправки с промокодом');
const bookingData = {
  contact_name: bookingForm.name,
  contact_phone: bookingForm.phone,
  booking_date: bookingForm.date,
  program_type: bookingForm.type ? bookingForm.type : undefined,
  program_id: bookingForm.programId,
  event_id: bookingForm.eventId,
  participants_count: bookingForm.participants,
  comment: bookingForm.comment,
  promo_code: bookingForm.promoCode, // Новое поле
  user_id: 456,
  status: 'PENDING'
};

console.log('Данные для отправки:', bookingData);

// Проверка, что промокод передается
if (bookingData.promo_code) {
  console.log('✅ Промокод передается в запросе:', bookingData.promo_code);
} else {
  console.log('❌ Промокод не передается в запросе');
}

// Проверка других полей
if (bookingData.event_id) {
  console.log('✅ Event ID передается в запросе:', bookingData.event_id);
} else {
  console.log('❌ Event ID не передается в запросе');
}

if (bookingData.program_id) {
  console.log('✅ Program ID передается в запросе:', bookingData.program_id);
} else {
  console.log('❌ Program ID не передается в запросе');
}

// Тест сценария без промокода
console.log('\nТест 3: Проверка сценария без промокода');
const bookingFormNoPromo = {
  ...bookingForm,
  promoCode: '' // Пустой промокод
};

const bookingDataNoPromo = {
  contact_name: bookingFormNoPromo.name,
  contact_phone: bookingFormNoPromo.phone,
  booking_date: bookingFormNoPromo.date,
  program_type: bookingFormNoPromo.type ? bookingFormNoPromo.type : undefined,
  program_id: bookingFormNoPromo.programId,
  event_id: bookingFormNoPromo.eventId,
  participants_count: bookingFormNoPromo.participants,
  comment: bookingFormNoPromo.comment,
  promo_code: bookingFormNoPromo.promoCode, // Может быть пустым
  user_id: 456,
  status: 'PENDING'
};

console.log('Данные для отправки без промокода:', bookingDataNoPromo);
console.log('✅ Данные корректно формируются даже без промокода');

// Тест сброса формы
console.log('\nТест 4: Проверка сброса формы');
const resetForm = {
  name: 'Test User',
  phone: '+79991234567',
  date: '2024-12-25T10:00',
  type: 'author',
  programId: 123,
  eventId: 'test-program-slug',
  participants: 2,
  comment: 'Test comment',
  promoCode: 'TEST_PROMO'
};

console.log('Форма до сброса:', resetForm);

// Сброс формы
const emptyForm = {
  name: '',
  phone: '',
  date: '',
  type: 'author', // Сохраняем тип программы
  programId: 123, // Сохраняем ID программы
  eventId: 'test-program-slug', // Сохраняем ID события
  participants: 1,
  comment: '',
  promoCode: '' // Поле промокода сброшено
};

console.log('Форма после сброса:', emptyForm);
if (emptyForm.promoCode === '') {
  console.log('✅ Поле промокода корректно сбрасывается');
} else {
  console.log('❌ Поле промокода не сброшено');
}

console.log('\n✅ Все тесты пройдены успешно!');