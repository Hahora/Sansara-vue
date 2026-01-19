// Тестовый скрипт для проверки передачи event_id в бронировании

// Имитация работы компонента BookingPage
const mockRoute = {
  params: {
    programId: '123',
    programType: 'author',
    eventId: 'event-slug-456' // Добавляем eventId
  }
};

const mockUser = {
  id: 456,
  first_name: 'Test User',
  phone: '+79991234567'
};

// Имитация формы бронирования
const bookingForm = {
  name: 'Test User',
  phone: '+79991234567',
  date: '2024-12-25T10:00',
  type: 'author',
  programId: null, // Будет установлено из маршрута
  eventId: null,   // Будет установлено из маршрута
  participants: 2,
  comment: 'Test comment'
};

// Имитация mounted()
console.log('Тест 1: Установка programId и eventId из маршрута');
if (mockRoute.params.programId) {
  bookingForm.programId = parseInt(mockRoute.params.programId);
}
if (mockRoute.params.eventId) {
  bookingForm.eventId = mockRoute.params.eventId;
}

console.log('programId после установки из маршрута:', bookingForm.programId);
console.log('eventId после установки из маршрута:', bookingForm.eventId);

// Имитация submitBooking()
console.log('\nТест 2: Подготовка данных для отправки');
const bookingData = {
  contact_name: bookingForm.name,
  contact_phone: bookingForm.phone,
  booking_date: bookingForm.date,
  program_type: bookingForm.type ? bookingForm.type : undefined,
  program_id: bookingForm.programId,
  event_id: bookingForm.eventId, // Это ключевое изменение
  participants_count: bookingForm.participants,
  comment: bookingForm.comment,
  user_id: mockUser?.id,
  status: 'PENDING'
};

console.log('Данные для отправки:', bookingData);

// Проверка, что event_id присутствует
if (bookingData.event_id) {
  console.log('\n✅ Успешно: event_id передается в запросе:', bookingData.event_id);
} else {
  console.log('\n❌ Ошибка: event_id отсутствует в запросе');
}

// Проверка, что program_id также присутствует
if (bookingData.program_id) {
  console.log('✅ Успешно: program_id передается в запросе:', bookingData.program_id);
} else {
  console.log('❌ Ошибка: program_id отсутствует в запросе');
}

// Тест с отсутствующим eventId в маршруте
console.log('\nТест 3: Проверка случая без eventId в маршруте');
const mockRouteWithoutEventId = {
  params: {
    programId: '123',
    programType: 'author'
    // eventId отсутствует
  }
};

const bookingForm2 = {
  name: 'Test User',
  phone: '+79991234567',
  date: '2024-12-25T10:00',
  type: 'author',
  programId: null,
  eventId: null,
  participants: 2,
  comment: 'Test comment'
};

if (mockRouteWithoutEventId.params.programId) {
  bookingForm2.programId = parseInt(mockRouteWithoutEventId.params.programId);
}
if (mockRouteWithoutEventId.params.eventId) {
  bookingForm2.eventId = mockRouteWithoutEventId.params.eventId;
}

const bookingData2 = {
  contact_name: bookingForm2.name,
  contact_phone: bookingForm2.phone,
  booking_date: bookingForm2.date,
  program_type: bookingForm2.type ? bookingForm2.type : undefined,
  program_id: bookingForm2.programId,
  event_id: bookingForm2.eventId,
  participants_count: bookingForm2.participants,
  comment: bookingForm2.comment,
  user_id: mockUser?.id,
  status: 'PENDING'
};

console.log('Данные для отправки без eventId:', bookingData2);
if (bookingData2.event_id === null) {
  console.log('✅ Успешно: event_id корректно равен null, когда не передан в маршруте');
} else {
  console.log('❌ Ошибка: event_id не равен null, когда не передан в маршруте');
}