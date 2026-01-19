# Sansara MiniApp API

Это бэкенд на основе FastAPI для MiniApp бального комплекса Сансара, преобразованный из исходного Telegram-бота.

## Обзор

Sansara MiniApp API предоставляет конечные точки для управления пользователями, программами, мероприятиями, бронированиями, сертификатами, акциями и функциональностью лотереи. Он разработан для работы с Telegram Mini Apps, позволяя пользователям получать доступ к услугам Сансары через веб-интерфейс внутри приложения Telegram.

## Особенности

- **Управление пользователями**: создание, обновление и получение профилей пользователей
- **Управление программами**: управление различными программами (мальчишники/девичники, клубные мероприятия, коллективные/авторские программы)
- **Календарь мероприятий**: просмотр и управление запланированными мероприятиями
- **Система бронирования**: позволяет пользователям бронировать программы и мероприятия
- **Сертификаты**: выпуск и управление подарочными сертификатами
- **Акции**: управление промо-кодами и скидками
- **Лотерея**: поддержка участия в лотерее и призов
- **Интеграция с Telegram**: безопасная аутентификация с использованием данных Telegram Mini App

## Архитектура

API следует чистому шаблону архитектуры с:

- **Routers**: определяют конечные точки API
- **Schemas**: модели Pydantic для валидации запросов/ответов
- **Models**: модели SQLAlchemy для сущностей базы данных
- **Repositories**: уровень доступа к данным
- **Utils**: вспомогательные функции и утилиты
- **Auth**: аутентификация и авторизация для Telegram MiniApp

## Установка

1. Установите зависимости:
   ```bash
   pip install -r requirements.txt
   ```

2. Настройте переменные окружения в `.env`:
   ```
   DATABASE_URL=postgresql+asyncpg://user:password@localhost/dbname
   SECRET_KEY=your-secret-key
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   ```

3. Запустите приложение:
   ```bash
   uvicorn api.main:app --reload
   ```

## Конечные точки API

### Аутентификация
- `POST /api/v1/auth/login` - Вход с использованием аутентификации Telegram MiniApp
- `GET /api/v1/auth/me` - Получить информацию о текущем пользователе
- `POST /api/v1/auth/verify` - Проверить данные аутентификации Telegram

### Пользователи
- `POST /api/v1/users/` - Создать пользователя
- `GET /api/v1/users/{telegram_id}` - Получить пользователя по Telegram ID
- `PUT /api/v1/users/{user_id}` - Обновить пользователя
- `PATCH /api/v1/users/profile/{telegram_id}` - Обновить профиль пользователя
- `GET /api/v1/users/` - Получить список пользователей

### Программы
- `POST /api/v1/programs/` - Создать программу
- `GET /api/v1/programs/` - Получить программы
- `GET /api/v1/programs/{program_id}` - Получить программу по ID
- `PUT /api/v1/programs/{program_id}` - Обновить программу
- `DELETE /api/v1/programs/{program_id}` - Удалить программу
- `GET /api/v1/programs/type/{program_type}` - Получить программы по типу

### Мероприятия
- `POST /api/v1/events/` - Создать мероприятие
- `GET /api/v1/events/` - Получить мероприятия
- `GET /api/v1/events/{event_id}` - Получить мероприятие по ID
- `PUT /api/v1/events/{event_id}` - Обновить мероприятие
- `DELETE /api/v1/events/{event_id}` - Удалить мероприятие

### Бронирования
- `POST /api/v1/bookings/` - Создать бронирование
- `GET /api/v1/bookings/` - Получить бронирования
- `GET /api/v1/bookings/{booking_id}` - Получить бронирование по ID
- `PUT /api/v1/bookings/{booking_id}` - Обновить бронирование
- `PATCH /api/v1/bookings/{booking_id}/status` - Обновить статус бронирования
- `DELETE /api/v1/bookings/{booking_id}` - Отменить бронирование

### Сертификаты
- `POST /api/v1/certificates/` - Создать сертификат
- `GET /api/v1/certificates/` - Получить сертификаты
- `GET /api/v1/certificates/{certificate_id}` - Получить сертификат по ID
- `GET /api/v1/certificates/code/{code}` - Получить сертификат по коду
- `PUT /api/v1/certificates/{certificate_id}` - Обновить сертификат

### Промокоды
- `POST /api/v1/certificates/promocodes/` - Создать промокод
- `GET /api/v1/certificates/promocodes/` - Получить промокоды
- `GET /api/v1/certificates/promocodes/{promo_id}` - Получить промокод по ID
- `GET /api/v1/certificates/promocodes/code/{code}` - Получить промокод по коду
- `PUT /api/v1/certificates/promocodes/{promo_id}` - Обновить промокод
- `DELETE /api/v1/certificates/promocodes/{promo_id}` - Удалить промокод

### Лотерея
- `GET /api/v1/lottery/settings` - Получить настройки лотереи
- `PUT /api/v1/lottery/settings` - Обновить настройки лотереи
- `POST /api/v1/lottery/codes/` - Создать код лотереи
- `GET /api/v1/lottery/codes/` - Получить коды лотереи
- `GET /api/v1/lottery/codes/{code_id}` - Получить код лотереи по ID
- `GET /api/v1/lottery/codes/code/{code_str}` - Получить код лотереи по строке
- `PUT /api/v1/lottery/codes/{code_id}` - Обновить код лотереи
- `POST /api/v1/lottery/prizes/` - Создать приз лотереи
- `GET /api/v1/lottery/prizes/` - Получить призы лотереи
- `GET /api/v1/lottery/prizes/{prize_id}` - Получить приз лотереи по ID
- `GET /api/v1/lottery/prizes/ticket/{ticket_number}` - Получить приз лотереи по номеру билета
- `PUT /api/v1/lottery/prizes/{prize_id}` - Обновить приз лотереи
- `POST /api/v1/lottery/tickets/` - Создать билет лотереи
- `GET /api/v1/lottery/tickets/` - Получить билеты лотереи
- `GET /api/v1/lottery/tickets/{ticket_id}` - Получить билет лотереи по ID
- `GET /api/v1/lottery/tickets/user/{user_id}` - Получить билеты лотереи пользователя
- `PUT /api/v1/lottery/tickets/{ticket_id}` - Обновить билет лотереи

## Интеграция с Telegram MiniApp

API поддерживает безопасную аутентификацию с использованием данных Telegram Mini App. Клиенты должны отправлять `authData`, предоставленные SDK Telegram WebApp, в заголовке `X-Telegram-Init-Data` или как параметр запроса.

## Обработка ошибок

API использует согласованные ответы об ошибках с форматом:
```json
{
  "detail": "Сообщение об ошибке"
}
```

Используются стандартные коды состояния HTTP:
- 200: Успешно
- 400: Неверный запрос
- 401: Не авторизован
- 404: Не найдено
- 500: Внутренняя ошибка сервера

## Тестирование

Запустите тесты с помощью pytest:
```bash
pytest api/tests/
```

## Развертывание

Для развертывания в продакшене:
1. Используйте производственный WSGI-сервер, например Gunicorn
2. Настройте обратный прокси-сервер (Nginx)
3. Настройте SSL-сертификаты
4. Используйте конфигурации, специфичные для среды
5. Настройте правильное ведение логов