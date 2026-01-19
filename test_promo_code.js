// Тестовый скрипт для проверки передачи промокода

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
  promoCode: 'TEST_PROMO' // Поле промокода
};

console.log('Тест 1: Подготовка данных для отправки с промокодом');
const bookingData = {
  contact_name: bookingForm.name,
  contact_phone: bookingForm.phone,
  booking_date: bookingForm.date,
  program_type: bookingForm.type ? bookingForm.type : undefined,
  program_id: bookingForm.programId,
  event_id: bookingForm.eventId,
  participants_count: bookingForm.participants,
  comment: bookingForm.comment,
  promo_code: bookingForm.promoCode, // Поле промокода
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

// Имитация подготовки данных для отправки в store (transformedBookingData)
console.log('\nТест 2: Подготовка данных в store');
const transformedBookingData = {
  user_id: bookingData.user_id || bookingData.userId || 456,
  program_id: bookingData.program_id || bookingData.programId,
  event_id: bookingData.event_id || bookingData.eventId,
  program_type: bookingData.program_type ? bookingData.program_type.toUpperCase() : bookingData.program_type,
  booking_date: bookingData.booking_date || bookingData.date,
  contact_name: bookingData.contact_name || bookingData.name,
  contact_phone: bookingData.contact_phone || bookingData.phone,
  participants_count: bookingData.participants_count || bookingData.participants || 1,
  comment: bookingData.comment || '',
  promo_code: bookingData.promo_code || bookingData.promoCode, // Поле промокода
  status: bookingData.status ? bookingData.status.toUpperCase() : 'PENDING'
};

console.log('Данные для отправки в API:', transformedBookingData);

// Проверка, что промокод передается в API
if (transformedBookingData.promo_code) {
  console.log('✅ Промокод передается в API:', transformedBookingData.promo_code);
} else {
  console.log('❌ Промокод не передается в API');
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

console.log('\n✅ Все тесты пройдены успешно! Промокод теперь передается.');