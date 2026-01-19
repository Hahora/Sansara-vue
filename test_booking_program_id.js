// Тестовый скрипт для проверки передачи program_id в бронировании

// Имитация работы компонента BookingPage
const mockRoute = {
  params: {
    programId: '123',
    programType: 'author'
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
  participants: 2,
  comment: 'Test comment'
};

// Имитация mounted()
console.log('Тест 1: Установка programId из маршрута');
if (mockRoute.params.programId) {
  bookingForm.programId = parseInt(mockRoute.params.programId);
}
console.log('programId после установки из маршрута:', bookingForm.programId);

// Имитация submitBooking()
console.log('\nТест 2: Подготовка данных для отправки');
const bookingData = {
  contact_name: bookingForm.name,
  contact_phone: bookingForm.phone,
  booking_date: bookingForm.date,
  program_type: bookingForm.type ? bookingForm.type : undefined,
  program_id: bookingForm.programId, // Это ключевое изменение
  participants_count: bookingForm.participants,
  comment: bookingForm.comment,
  user_id: mockUser?.id,
  status: 'PENDING'
};

console.log('Данные для отправки:', bookingData);

// Проверка, что program_id присутствует
if (bookingData.program_id) {
  console.log('\n✅ Успешно: program_id передается в запросе:', bookingData.program_id);
} else {
  console.log('\n❌ Ошибка: program_id отсутствует в запросе');
}

// Тест с отсутствующим programId в маршруте
console.log('\nТест 3: Проверка случая без programId в маршруте');
const mockRouteWithoutProgramId = {
  params: {
    programType: 'author'
  }
};

const bookingForm2 = {
  name: 'Test User',
  phone: '+79991234567',
  date: '2024-12-25T10:00',
  type: 'author',
  programId: null,
  participants: 2,
  comment: 'Test comment'
};

if (mockRouteWithoutProgramId.params.programId) {
  bookingForm2.programId = parseInt(mockRouteWithoutProgramId.params.programId);
}

const bookingData2 = {
  contact_name: bookingForm2.name,
  contact_phone: bookingForm2.phone,
  booking_date: bookingForm2.date,
  program_type: bookingForm2.type ? bookingForm2.type : undefined,
  program_id: bookingForm2.programId,
  participants_count: bookingForm2.participants,
  comment: bookingForm2.comment,
  user_id: mockUser?.id,
  status: 'PENDING'
};

console.log('Данные для отправки без programId:', bookingData2);
if (bookingData2.program_id === null) {
  console.log('✅ Успешно: program_id корректно равен null, когда не передан в маршруте');
} else {
  console.log('❌ Ошибка: program_id не равен null, когда не передан в маршруте');
}