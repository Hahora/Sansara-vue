// Тестовый скрипт для проверки использования slug программы как event_id

// Имитация данных программы
const mockPrograms = [
  {
    id: 123,
    name: 'Тестовая программа',
    slug: 'test-program-slug',
    description: 'Описание тестовой программы',
    program_type: 'author',
    price: 500000
  },
  {
    id: 456,
    name: 'Другая программа',
    slug: 'another-program-slug',
    description: 'Описание другой программы',
    program_type: 'collective',
    price: 300000
  }
];

// Имитация работы компонента BookingPage
const mockRoute = {
  params: {
    programId: '123',
    programType: 'author'
    // eventId отсутствует, будет использован slug
  }
};

// Имитация формы бронирования
const bookingForm = {
  name: 'Test User',
  phone: '+79991234567',
  date: '2024-12-25T10:00',
  type: 'author',
  programId: null,
  eventId: null,
  participants: 2,
  comment: 'Test comment'
};

// Имитация mounted()
console.log('Тест 1: Установка eventId как slug программы');
if (mockRoute.params.programId) {
  bookingForm.programId = parseInt(mockRoute.params.programId);
}

// Имитация логики установки eventId
if (mockRoute.params.eventId) {
  bookingForm.eventId = mockRoute.params.eventId;
} else if (mockRoute.params.programId) {
  // Если eventId не передан, но передан programId, используем slug программы
  const program = mockPrograms.find(p => p.id === parseInt(mockRoute.params.programId));
  if (program && program.slug) {
    bookingForm.eventId = program.slug;
  }
}

console.log('programId после установки:', bookingForm.programId);
console.log('eventId после установки:', bookingForm.eventId);

// Имитация submitBooking()
console.log('\nТест 2: Подготовка данных для отправки');
const programSlug = bookingForm.programId ? mockPrograms.find(p => p.id === bookingForm.programId)?.slug : null;

const bookingData = {
  contact_name: 'Test User',
  contact_phone: '+79991234567',
  booking_date: '2024-12-25T10:00',
  program_type: 'author',
  program_id: bookingForm.programId,
  event_id: bookingForm.eventId || programSlug, // Используем eventId из маршрута или slug программы
  participants_count: 2,
  comment: 'Test comment',
  user_id: 456,
  status: 'PENDING'
};

console.log('Данные для отправки:', bookingData);

// Проверка, что event_id содержит slug программы
if (bookingData.event_id === 'test-program-slug') {
  console.log('\n✅ Успешно: event_id содержит slug программы:', bookingData.event_id);
} else {
  console.log('\n❌ Ошибка: event_id не содержит ожидаемый slug программы');
  console.log('Ожидалось: test-program-slug, получено:', bookingData.event_id);
}

// Тест с переданным eventId (должен иметь приоритет над slug)
console.log('\nТест 3: Проверка приоритета переданного eventId над slug');
const mockRouteWithEventId = {
  params: {
    programId: '123',
    programType: 'author',
    eventId: 'explicit-event-id' // Переданный eventId должен иметь приоритет
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

if (mockRouteWithEventId.params.programId) {
  bookingForm2.programId = parseInt(mockRouteWithEventId.params.programId);
}

if (mockRouteWithEventId.params.eventId) {
  bookingForm2.eventId = mockRouteWithEventId.params.eventId;
} else if (mockRouteWithEventId.params.programId) {
  const program = mockPrograms.find(p => p.id === parseInt(mockRouteWithEventId.params.programId));
  if (program && program.slug) {
    bookingForm2.eventId = program.slug;
  }
}

const programSlug2 = bookingForm2.programId ? mockPrograms.find(p => p.id === bookingForm2.programId)?.slug : null;

const bookingData2 = {
  contact_name: 'Test User',
  contact_phone: '+79991234567',
  booking_date: '2024-12-25T10:00',
  program_type: 'author',
  program_id: bookingForm2.programId,
  event_id: bookingForm2.eventId || programSlug2,
  participants_count: 2,
  comment: 'Test comment',
  user_id: 456,
  status: 'PENDING'
};

console.log('Данные для отправки с явным eventId:', bookingData2);

if (bookingData2.event_id === 'explicit-event-id') {
  console.log('✅ Успешно: переданный eventId имеет приоритет над slug программы:', bookingData2.event_id);
} else {
  console.log('❌ Ошибка: переданный eventId не имеет приоритета');
}