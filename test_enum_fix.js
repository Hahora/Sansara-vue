// Тестовый скрипт для проверки корректности обработки enum-значений

// Имитируем полученные данные от бэкенда (в верхнем регистре)
const backendResponse = [
  {
    id: 1,
    name: "Тестовая программа",
    program_type: "BACHELOR", // Верхний регистр, как возвращается от бэкенда
    description: "Описание программы",
    price: 5000
  },
  {
    id: 2,
    name: "Коллективная программа",
    program_type: "COLLECTIVE", // Верхний регистр, как возвращается от бэкенда
    description: "Описание коллективной программы",
    price: 10000
  }
];

// Функция преобразования данных (как в нашем сторе)
function transformEnumValues(data) {
  if (Array.isArray(data)) {
    return data.map(item => ({
      ...item,
      program_type: item.program_type ? item.program_type.toLowerCase() : item.program_type
    }));
  } else {
    return {
      ...data,
      program_type: data.program_type ? data.program_type.toLowerCase() : data.program_type
    };
  }
}

// Применяем преобразование
const processedData = transformEnumValues(backendResponse);

console.log("Оригинальные данные от бэкенда:");
console.log(backendResponse);

console.log("\nОбработанные данные в сторе:");
console.log(processedData);

// Проверяем фильтрацию по типу (как в getter'е)
function filterByType(data, type) {
  const normalizedType = type.toLowerCase();
  return data.filter(program => program.program_type === normalizedType);
}

const bachelorPrograms = filterByType(processedData, 'bachelor');
const collectivePrograms = filterByType(processedData, 'collective');

console.log("\nФильтрация по типу 'bachelor':");
console.log(bachelorPrograms);

console.log("\nФильтрация по типу 'collective':");
console.log(collectivePrograms);

// Проверяем отправку данных на сервер
function prepareForBackendSend(data) {
  return {
    ...data,
    program_type: data.program_type ? data.program_type.toUpperCase() : data.program_type
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
  status: "pending"
};

const transformedForBackend = prepareForBackendSend(frontendData);

console.log("\nДанные для отправки на бэкенд (преобразованные в верхний регистр):");
console.log(transformedForBackend);