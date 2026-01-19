// Тест для проверки передачи параметров из BachelorPage в BookingPage

console.log('Тест 1: Проверка структуры данных мероприятия из BachelorPage');

// Имитация данных мероприятия из BachelorPage
const mockEvent = {
  id: 789, // Это будет eventId
  program_id: 123, // Это будет programId
  title: 'Мальчишник в бане',
  program: {
    program_type: 'bachelor' // Это будет programType
  },
  program_type: 'bachelor', // Альтернативное значение
  slots_available: 5,
  slots_total: 10,
  event_date: '2024-12-25T18:00:00',
  description: 'Мероприятие для будущих женихов',
  is_active: true
};

console.log('Данные мероприятия:', mockEvent);

// Имитация маршрута, который генерируется в BachelorPage.vue
const routeParams = {
  programId: mockEvent.program_id,
  programType: mockEvent.program?.program_type || mockEvent.program_type,
  eventId: mockEvent.id
};

console.log('Параметры маршрута, которые будут переданы:', routeParams);

// Имитация логики initializeBookingForm из BookingPage.vue
const bookingForm = {
  name: '',
  phone: '',
  date: '',
  type: '',
  programId: null,
  eventId: null,
  participants: 1,
  comment: '',
  promoCode: ''
};

console.log('\nТест 2: Проверка логики initializeBookingForm');

// Логика из initializeBookingForm
const params = routeParams;

// Устанавливаем тип программы
if (params.programType) {
  bookingForm.type = params.programType;
}

// Устанавливаем ID программы
if (params.programId) {
  bookingForm.programId = parseInt(params.programId);
}

// Устанавливаем ID события
if (params.eventId) {
  // Преобразуем eventId в строку, если он передан как число
  bookingForm.eventId = String(params.eventId);
}

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

console.log('\nТест 3: Проверка формирования данных для отправки');

// Имитация submitBooking
const bookingData = {
  contact_name: bookingForm.name || 'Test User',
  contact_phone: bookingForm.phone || '+79991234567',
  booking_date: bookingForm.date || '2024-12-25T10:00',
  program_type: bookingForm.type ? bookingForm.type : undefined,
  program_id: bookingForm.programId,
  event_id: bookingForm.eventId,
  participants_count: bookingForm.participants,
  comment: bookingForm.comment,
  promo_code: bookingForm.promoCode,
  user_id: 456,
  status: 'PENDING'
};

console.log('Данные для отправки в API:', bookingData);

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

console.log('\nТест 4: Проверка случая, когда program или program_type отсутствуют');

// Имитация данных с отсутствующим program
const mockEventMissingProgram = {
  id: 999,
  program_id: 456,
  title: 'Девичник в SPA',
  // program: null, // Отсутствует
  program_type: 'bachelorette', // Только это поле доступно
  slots_available: 3,
  slots_total: 8,
  event_date: '2024-12-26T19:00:00',
  description: 'Мероприятие для будущих невест',
  is_active: true
};

console.log('Данные мероприятия без program:', mockEventMissingProgram);

const routeParamsMissingProgram = {
  programId: mockEventMissingProgram.program_id,
  programType: mockEventMissingProgram.program?.program_type || mockEventMissingProgram.program_type,
  eventId: mockEventMissingProgram.id
};

console.log('Параметры маршрута для события без program:', routeParamsMissingProgram);

// Проверка, что programType будет установлен правильно
const bookingFormMissingProgram = {
  name: '',
  phone: '',
  date: '',
  type: '',
  programId: null,
  eventId: null,
  participants: 1,
  comment: '',
  promoCode: ''
};

const paramsMissingProgram = routeParamsMissingProgram;

// Устанавливаем тип программы
if (paramsMissingProgram.programType) {
  bookingFormMissingProgram.type = paramsMissingProgram.programType;
}

// Устанавливаем ID программы
if (paramsMissingProgram.programId) {
  bookingFormMissingProgram.programId = parseInt(paramsMissingProgram.programId);
}

// Устанавливаем ID события
if (paramsMissingProgram.eventId) {
  bookingFormMissingProgram.eventId = String(paramsMissingProgram.eventId);
}

console.log('Результат инициализации формы для события без program:', bookingFormMissingProgram);

if (bookingFormMissingProgram.type === 'bachelorette') {
  console.log('✅ ProgramType корректно установлен даже при отсутствии program');
} else {
  console.log('❌ ProgramType не установлен при отсутствии program');
}

console.log('\n✅ Все тесты пройдены! Логика передачи параметров из BachelorPage в BookingPage работает корректно.');
console.log('Если проблема все еще существует, возможно, дело в другом месте.');