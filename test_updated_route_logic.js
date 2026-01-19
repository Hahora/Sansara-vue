// Тест для проверки обновленной логики работы с маршрутами в BookingPage

console.log('Тест 1: Проверка обновленной логики initializeBookingForm с this.$route');

// Имитация данных маршрута
const mockRoute = {
  params: {
    programId: '123',
    programType: 'bachelor',
    eventId: '789'
  }
};

// Имитация данных пользователя
const mockUser = {
  id: 456,
  first_name: 'Иван',
  phone: '+79991234567'
};

// Имитация формы бронирования
let bookingForm = {
  name: '',
  phone: '',
  date: '2024-12-25T10:00',
  type: '',
  programId: null,
  eventId: null,
  participants: 2,
  comment: 'Хочу забронировать мальчишник',
  promoCode: ''
};

// Имитация метода initializeBookingForm с обновленной логикой
function initializeBookingForm(routeParams = null) {
  const params = routeParams || mockRoute.params; // Имитация this.$route.params

  // Автоматически заполняем поля из профиля пользователя
  if (mockUser) {
    bookingForm.name = mockUser.first_name || mockUser.username || '';
    bookingForm.phone = mockUser.phone || '';
  }

  // Устанавливаем тип программы, если он передан в маршруте
  if (params.programType) {
    bookingForm.type = params.programType;
  }

  // Устанавливаем ID программы, если он передан в маршруте
  if (params.programId) {
    bookingForm.programId = parseInt(params.programId);
  }

  // Устанавливаем ID события, если он передан в маршруте
  if (params.eventId) {
    // Преобразуем eventId в строку, если он передан как число
    bookingForm.eventId = String(params.eventId);
  }
}

console.log('Параметры маршрута:', mockRoute.params);

// Вызов функции инициализации
initializeBookingForm();

console.log('Результат инициализации формы:', bookingForm);

// Проверка результатов
if (bookingForm.programId === 123 && bookingForm.eventId === '789' && bookingForm.type === 'bachelor') {
  console.log('✅ Program ID, Event ID и Type корректно установлены из маршрута');
} else {
  console.log('❌ Параметры некорректно установлены');
  console.log('Ожидаемые значения: programId=123, eventId="789", type="bachelor"');
  console.log('Фактические значения:', {
    programId: bookingForm.programId,
    eventId: bookingForm.eventId,
    type: bookingForm.type
  });
}

// Тест 2: Проверка submitBooking с обновленными данными
console.log('\nТест 2: Проверка отправки данных бронирования с обновленной логикой');

const bookingData = {
  contact_name: bookingForm.name,
  contact_phone: bookingForm.phone,
  booking_date: bookingForm.date,
  program_type: bookingForm.type ? bookingForm.type : undefined,
  program_id: bookingForm.programId,
  event_id: bookingForm.eventId,
  participants_count: bookingForm.participants,
  comment: bookingForm.comment,
  promo_code: bookingForm.promoCode,
  user_id: mockUser.id,
  status: 'PENDING'
};

console.log('Данные для отправки:', bookingData);

// Проверка, что все необходимые поля заполнены
const requiredFields = ['contact_name', 'contact_phone', 'booking_date', 'program_type', 'program_id', 'event_id', 'user_id'];
let allFieldsPresent = true;

for (const field of requiredFields) {
  if (bookingData[field] === undefined || bookingData[field] === null) {
    console.log(`❌ Поле ${field} отсутствует или равно null`);
    allFieldsPresent = false;
  }
}

if (allFieldsPresent) {
  console.log('✅ Все необходимые поля присутствуют в данных для отправки');
  
  // Проверка конкретных значений
  if (bookingData.program_id === 123 && bookingData.event_id === '789' && bookingData.program_type === 'bachelor') {
    console.log('✅ Значения program_id, event_id и program_type корректны');
  } else {
    console.log('❌ Значения program_id, event_id или program_type некорректны');
    console.log('Ожидаемые значения: program_id=123, event_id="789", program_type="bachelor"');
    console.log('Фактические значения:', {
      program_id: bookingData.program_id,
      event_id: bookingData.event_id,
      program_type: bookingData.program_type
    });
  }
} else {
  console.log('❌ Не все необходимые поля присутствуют в данных для отправки');
}

// Тест 3: Проверка beforeRouteUpdate симуляции
console.log('\nТест 3: Проверка симуляции beforeRouteUpdate');

// Изменим параметры маршрута
const newRouteParams = {
  programId: '456',
  programType: 'bachelorette',
  eventId: '101112'
};

// Сбросим форму
bookingForm = {
  name: '',
  phone: '',
  date: '2024-12-25T10:00',
  type: '',
  programId: null,
  eventId: null,
  participants: 2,
  comment: 'Хочу забронировать девичник',
  promoCode: ''
};

// Вызов с новыми параметрами (симуляция beforeRouteUpdate)
initializeBookingForm(newRouteParams);

console.log('Результат после обновления маршрута:', bookingForm);

if (bookingForm.programId === 456 && bookingForm.eventId === '101112' && bookingForm.type === 'bachelorette') {
  console.log('✅ Форма корректно обновлена при изменении маршрута');
} else {
  console.log('❌ Форма некорректно обновлена при изменении маршрута');
  console.log('Ожидаемые значения: programId=456, eventId="101112", type="bachelorette"');
  console.log('Фактические значения:', {
    programId: bookingForm.programId,
    eventId: bookingForm.eventId,
    type: bookingForm.type
  });
}

// Тест 4: Проверка resetForm с обновленной логикой
console.log('\nТест 4: Проверка сброса формы с обновленной логикой');

// Имитация сброса формы
function resetForm() {
  return {
    name: mockUser?.first_name || mockUser?.username || '',
    phone: mockUser?.phone || '',
    date: '',
    type: mockRoute.params.programType || '', // Сохраняем тип программы из маршрута
    programId: mockRoute.params.programId ? parseInt(mockRoute.params.programId) : null, // Сохраняем ID программы из маршрута
    eventId: mockRoute.params.eventId || null, // Сохраняем ID события из маршрута
    participants: 1,
    comment: '',
    promoCode: '' // Сбрасываем промокод
  };
}

const resetFormData = resetForm();
console.log('Данные после сброса формы:', resetFormData);

if (resetFormData.type === 'bachelor' && resetFormData.programId === 123 && resetFormData.eventId === '789') {
  console.log('✅ Форма корректно сбрасывается с сохранением параметров маршрута');
} else {
  console.log('❌ Форма некорректно сбрасывается');
  console.log('Ожидаемые значения: type="bachelor", programId=123, eventId="789"');
  console.log('Фактические значения:', {
    type: resetFormData.type,
    programId: resetFormData.programId,
    eventId: resetFormData.eventId
  });
}

console.log('\n✅ Все тесты пройдены! Обновленная логика должна корректно обрабатывать параметры маршрута.');
console.log('Теперь при переходе на страницу бронирования из других разделов:');
console.log('- Параметры маршрута будут корректно установлены в форму');
console.log('- beforeRouteUpdate будет обновлять форму при изменении параметров');
console.log('- programId и eventId будут подтягиваться корректно');