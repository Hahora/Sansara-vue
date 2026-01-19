// Тестовый скрипт для проверки обработки enum-значений

// Имитируем полученные данные от бэкенда (в верхнем регистре)
const backendResponse = {
  id: 1,
  name: "Тестовое бронирование",
  program_type: "BACHELOR", // Верхний регистр, как возвращается от бэкенда
  status: "PENDING", // Верхний регистр, как возвращается от бэкенда
  contact_name: "Иван Иванов",
  contact_phone: "+79991234567",
  booking_date: "2023-12-25T10:00:00",
  participants_count: 4,
  comment: "Тестовое бронирование",
  user_id: 1
};

console.log("Оригинальные данные от бэкенда:");
console.log(backendResponse);

// Функция преобразования данных (как в нашем сторе)
function transformEnumValues(data) {
  return {
    ...data,
    program_type: data.program_type ? data.program_type.toLowerCase() : data.program_type,
    status: data.status ? data.status.toLowerCase() : data.status
  };
}

// Применяем преобразование
const processedData = transformEnumValues(backendResponse);

console.log("\nОбработанные данные в сторе:");
console.log(processedData);

// Проверяем фильтрацию по типу (как в getter'е)
function filterByType(data, type) {
  const normalizedType = type.toLowerCase();
  return data.program_type === normalizedType;
}

const isBachelor = filterByType(processedData, 'bachelor');
const isPending = processedData.status === 'pending';

console.log("\nФильтрация по типу 'bachelor':", isBachelor);
console.log("Фильтрация по статусу 'pending':", isPending);

// Проверяем отправку данных на сервер
function prepareForBackendSend(data) {
  return {
    ...data,
    program_type: data.program_type ? data.program_type.toUpperCase() : data.program_type,
    status: data.status ? data.status.toUpperCase() : data.status
  };
}

const frontendData = {
  contact_name: "Иван Иванов",
  contact_phone: "+79991234567",
  booking_date: "2023-12-25T10:00:00",
  program_type: "bachelor", // Нижний регистр, как хранится во фронтенде
  participants_count: 4,
  comment: "Тестовое бронирование",
  user_id: 1,
  status: "pending" // Нижний регистр, как хранится во фронтенде
};

const transformedForBackend = prepareForBackendSend(frontendData);

console.log("\nДанные для отправки на бэкенд (преобразованные в верхний регистр):");
console.log(transformedForBackend);

// Проверяем, что после обратного преобразования значения остаются корректными
const roundTripProcessed = transformEnumValues(transformedForBackend);
console.log("\nОбратное преобразование после отправки и получения:", roundTripProcessed);

console.log("\nПроверка соответствия исходного и конечного значения:", 
  processedData.program_type === roundTripProcessed.program_type &&
  processedData.status === roundTripProcessed.status);