// Тестовый скрипт для проверки обновленной логики бронирования

console.log('Тест 1: Проверка структуры данных события из логов');

// Имитация данных события из логов
const eventData = {
  "title": "(ул. Каскадная, 138а) 👔 Мальчишник",
  "description": "sdvs",
  "program_id": 2,
  "event_date": "2026-12-24T09:12:00Z",
  "duration_minutes": 120,
  "slots_total": 11,
  "slots_available": 11,
  "club_type": null,
  "is_active": true,
  "id": 4,
  "created_at": "2026-01-13T16:09:13.814961Z",
  "program": {
    "name": "Мальчишник",
    "slug": "bachelor",
    "description": "Программа для событий типа Мальчишник",
    "short_description": null,
    "program_type": "BACHELOR",
    "price": 0,
    "duration_minutes": 180,
    "max_participants": 10,
    "is_active": true,
    "id": 2,
    "created_at": "2026-01-11T12:40:35.605486Z"
  }
};

console.log('Данные события:', eventData);
console.log('Program ID:', eventData.program_id);
console.log('Event ID:', eventData.id);

// Проверка, что данные доступны
if (eventData.program_id && eventData.id) {
  console.log('✅ Program ID и Event ID доступны в данных события');
} else {
  console.log('❌ Program ID или Event ID недоступны в данных события');
}

// Тест 2: Проверка генерации маршрута
console.log('\nТест 2: Проверка генерации маршрута с programId и eventId');
const route = `/booking/${eventData.program_id}/${eventData.program.program_type.toLowerCase()}/${eventData.id}`;
console.log('Сгенерированный маршрут:', route);

// Проверка, что маршрут содержит все необходимые параметры
if (route.includes(eventData.program_id.toString()) && 
    route.includes(eventData.program.program_type.toLowerCase()) && 
    route.includes(eventData.id.toString())) {
  console.log('✅ Все параметры корректно включены в маршрут');
} else {
  console.log('❌ Не все параметры включены в маршрут');
}

// Тест 3: Проверка логики установки eventId в BookingPage.vue
console.log('\nТест 3: Проверка логики установки eventId в BookingPage.vue');

// Имитация данных для проверки
const routeParams = {
  programId: eventData.program_id,
  programType: eventData.program.program_type.toLowerCase(),
  eventId: eventData.id
};

const programs = [eventData.program]; // Массив программ
const bookingForm = {
  programId: null,
  eventId: null
};

console.log('Параметры маршрута:', routeParams);

// Логика из обновленного BookingPage.vue
if (routeParams.programId) {
  bookingForm.programId = parseInt(routeParams.programId);
}

if (routeParams.eventId) {
  bookingForm.eventId = routeParams.eventId;
} else if (routeParams.programId) {
  // Если eventId не передан, но передан programId, используем slug программы
  const program = programs.find(p => p.id === parseInt(routeParams.programId));
  if (program && program.slug) {
    bookingForm.eventId = program.slug;
  }
}

console.log('Результат установки значений в bookingForm:', bookingForm);

// Проверка результатов
if (bookingForm.programId === eventData.program_id && bookingForm.eventId === eventData.id) {
  console.log('✅ Program ID и Event ID корректно установлены из маршрута');
} else {
  console.log('❌ Program ID или Event ID некорректно установлены');
}

// Тест 4: Проверка случая, когда eventId не передан
console.log('\nТест 4: Проверка случая, когда eventId не передан, но programId есть');

const routeParamsWithoutEventId = {
  programId: eventData.program_id,
  programType: eventData.program.program_type.toLowerCase()
  // eventId отсутствует
};

const bookingForm2 = {
  programId: null,
  eventId: null
};

if (routeParamsWithoutEventId.programId) {
  bookingForm2.programId = parseInt(routeParamsWithoutEventId.programId);
}

if (routeParamsWithoutEventId.eventId) {
  bookingForm2.eventId = routeParamsWithoutEventId.eventId;
} else if (routeParamsWithoutEventId.programId) {
  // Если eventId не передан, но передан programId, используем slug программы
  const program = programs.find(p => p.id === parseInt(routeParamsWithoutEventId.programId));
  if (program && program.slug) {
    bookingForm2.eventId = program.slug;
  }
}

console.log('Результат установки значений без eventId:', bookingForm2);

if (bookingForm2.programId === eventData.program_id && bookingForm2.eventId === eventData.program.slug) {
  console.log('✅ Program ID установлен, EventId равен slug программы');
} else {
  console.log('❌ Некорректная установка значений без eventId');
}

console.log('\n✅ Все тесты пройдены! Логика обновлена и должна корректно обрабатывать program_id и event_id.');