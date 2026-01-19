// Тестовый скрипт для проверки проверки промокода и добавления скидки

// Имитация API для проверки промокода
const mockPromoAPI = {
  getByCode: async (code) => {
    // Имитация базы данных промокодов
    const promoDatabase = {
      'VALID10': {
        code: 'VALID10',
        discount_percent: 10,
        discount_amount: 0,
        max_uses: 100,
        current_uses: 50,
        is_active: true,
        for_first_visit_only: false,
        program_types: null,
        valid_from: null,
        valid_until: '2025-12-31T23:59:59Z'
      },
      'FIRST_VISIT_ONLY': {
        code: 'FIRST_VISIT_ONLY',
        discount_percent: 20,
        discount_amount: 0,
        max_uses: 50,
        current_uses: 10,
        is_active: true,
        for_first_visit_only: true,
        program_types: null,
        valid_from: null,
        valid_until: '2025-12-31T23:59:59Z'
      },
      'EXPIRED_CODE': {
        code: 'EXPIRED_CODE',
        discount_percent: 15,
        discount_amount: 0,
        max_uses: 100,
        current_uses: 30,
        is_active: true,
        for_first_visit_only: false,
        program_types: null,
        valid_from: null,
        valid_until: '2020-12-31T23:59:59Z' // Просроченный
      },
      'LIMIT_EXCEEDED': {
        code: 'LIMIT_EXCEEDED',
        discount_percent: 5,
        discount_amount: 0,
        max_uses: 50,
        current_uses: 50, // Лимит достигнут
        is_active: true,
        for_first_visit_only: false,
        program_types: null,
        valid_from: null,
        valid_until: '2025-12-31T23:59:59Z'
      },
      'INACTIVE': {
        code: 'INACTIVE',
        discount_percent: 25,
        discount_amount: 0,
        max_uses: 100,
        current_uses: 20,
        is_active: false, // Неактивный
        for_first_visit_only: false,
        program_types: null,
        valid_from: null,
        valid_until: '2025-12-31T23:59:59Z'
      }
    };

    if (promoDatabase[code]) {
      return promoDatabase[code];
    } else {
      // Имитация ошибки 404 для несуществующего промокода
      throw new Error('404 Not Found');
    }
  }
};

// Имитация функции проверки промокода
async function validatePromoCode(bookingData, user = null) {
  let discountPercent = 0;
  if (bookingData.promo_code || bookingData.promoCode) {
    const promoCode = bookingData.promo_code || bookingData.promoCode;
    try {
      const promo = await mockPromoAPI.getByCode(promoCode);
      
      // Проверяем, активен ли промокод
      if (!promo.is_active) {
        throw new Error('Промокод не активен');
      }

      // Проверяем, достигнут ли лимит использования
      if (promo.max_uses && promo.current_uses >= promo.max_uses) {
        throw new Error('Достигнут лимит использования промокода');
      }

      // Проверяем, действителен ли промокод по дате
      if (promo.valid_from && new Date() < new Date(promo.valid_from)) {
        throw new Error('Промокод еще не действителен');
      }
      if (promo.valid_until && new Date() > new Date(promo.valid_until)) {
        throw new Error('Срок действия промокода истек');
      }

      // Проверяем, подходит ли промокод для типа программы
      if (promo.program_types && bookingData.program_type && !promo.program_types.includes(bookingData.program_type.toUpperCase())) {
        throw new Error('Промокод не применим к данной программе');
      }

      // Проверяем, применим ли промокод только для первого посещения
      if (promo.for_first_visit_only && user && user.status !== 'NEW') {
        throw new Error('Промокод применим только для первого посещения');
      }

      // Устанавливаем процент скидки
      discountPercent = promo.discount_percent || 0;
    } catch (error) {
      if (error.message.includes('404')) {
        throw new Error('Неверный промокод');
      } else {
        throw error;
      }
    }
  }
  
  return discountPercent;
}

// Тест 1: Проверка валидного промокода
console.log('Тест 1: Проверка валидного промокода VALID10');
const bookingData1 = {
  promo_code: 'VALID10',
  program_type: 'author'
};

validatePromoCode(bookingData1)
  .then(discount => {
    console.log('✅ Скидка:', discount + '%');
    if (discount === 10) {
      console.log('✅ Правильный процент скидки для валидного промокода');
    } else {
      console.log('❌ Неправильный процент скидки');
    }
  })
  .catch(error => {
    console.log('❌ Ошибка:', error.message);
  });

// Тест 2: Проверка несуществующего промокода
console.log('\nТест 2: Проверка несуществующего промокода');
const bookingData2 = {
  promo_code: 'NONEXISTENT',
  program_type: 'author'
};

validatePromoCode(bookingData2)
  .then(discount => {
    console.log('Скидка:', discount + '%');
  })
  .catch(error => {
    console.log('✅ Ошибка (ожидаемая):', error.message);
    if (error.message === 'Неверный промокод') {
      console.log('✅ Правильно обработан несуществующий промокод');
    } else {
      console.log('❌ Неправильная обработка несуществующего промокода');
    }
  });

// Тест 3: Проверка просроченного промокода
console.log('\nТест 3: Проверка просроченного промокода');
const bookingData3 = {
  promo_code: 'EXPIRED_CODE',
  program_type: 'author'
};

validatePromoCode(bookingData3)
  .then(discount => {
    console.log('Скидка:', discount + '%');
  })
  .catch(error => {
    console.log('✅ Ошибка (ожидаемая):', error.message);
    if (error.message === 'Срок действия промокода истек') {
      console.log('✅ Правильно обработан просроченный промокод');
    } else {
      console.log('❌ Неправильная обработка просроченного промокода');
    }
  });

// Тест 4: Проверка промокода с превышением лимита
console.log('\nТест 4: Проверка промокода с превышением лимита');
const bookingData4 = {
  promo_code: 'LIMIT_EXCEEDED',
  program_type: 'author'
};

validatePromoCode(bookingData4)
  .then(discount => {
    console.log('Скидка:', discount + '%');
  })
  .catch(error => {
    console.log('✅ Ошибка (ожидаемая):', error.message);
    if (error.message === 'Достигнут лимит использования промокода') {
      console.log('✅ Правильно обработан промокод с превышением лимита');
    } else {
      console.log('❌ Неправильная обработка промокода с превышением лимита');
    }
  });

// Тест 5: Проверка неактивного промокода
console.log('\nТест 5: Проверка неактивного промокода');
const bookingData5 = {
  promo_code: 'INACTIVE',
  program_type: 'author'
};

validatePromoCode(bookingData5)
  .then(discount => {
    console.log('Скидка:', discount + '%');
  })
  .catch(error => {
    console.log('✅ Ошибка (ожидаемая):', error.message);
    if (error.message === 'Промокод не активен') {
      console.log('✅ Правильно обработан неактивный промокод');
    } else {
      console.log('❌ Неправильная обработка неактивного промокода');
    }
  });

// Тест 6: Проверка промокода для первого посещения с новым пользователем
console.log('\nТест 6: Проверка промокода для первого посещения с новым пользователем');
const bookingData6 = {
  promo_code: 'FIRST_VISIT_ONLY',
  program_type: 'author'
};
const newUser = { status: 'NEW' };

validatePromoCode(bookingData6, newUser)
  .then(discount => {
    console.log('✅ Скидка:', discount + '%');
    if (discount === 20) {
      console.log('✅ Правильно применен промокод для нового пользователя');
    } else {
      console.log('❌ Неправильно применен промокод для нового пользователя');
    }
  })
  .catch(error => {
    console.log('❌ Ошибка:', error.message);
  });

// Тест 7: Проверка промокода для первого посещения с существующим пользователем
console.log('\nТест 7: Проверка промокода для первого посещения с существующим пользователем');
const bookingData7 = {
  promo_code: 'FIRST_VISIT_ONLY',
  program_type: 'author'
};
const existingUser = { status: 'ACTIVE' };

validatePromoCode(bookingData7, existingUser)
  .then(discount => {
    console.log('Скидка:', discount + '%');
  })
  .catch(error => {
    console.log('✅ Ошибка (ожидаемая):', error.message);
    if (error.message === 'Промокод применим только для первого посещения') {
      console.log('✅ Правильно обработан промокод для существующего пользователя');
    } else {
      console.log('❌ Неправильная обработка промокода для существующего пользователя');
    }
  });

// Тест 8: Проверка без промокода
console.log('\nТест 8: Проверка без промокода');
const bookingData8 = {
  program_type: 'author'
};

validatePromoCode(bookingData8)
  .then(discount => {
    console.log('✅ Скидка:', discount + '%');
    if (discount === 0) {
      console.log('✅ Правильно обработан случай без промокода');
    } else {
      console.log('❌ Неправильно обработан случай без промокода');
    }
  })
  .catch(error => {
    console.log('❌ Ошибка:', error.message);
  });

console.log('\n✅ Все тесты проверки промокода завершены!');