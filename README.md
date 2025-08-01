# Premium Auto - Сайт автосалона
https://jet-car2-0.vercel.app/
## Обзор проекта

Premium Auto - это современный веб-сайт для автосалона, разработанный с использованием React. Сайт включает в себя каталог автомобилей, страницы с подробной информацией об автомобилях, формы заявок на тест-драйв, контактные формы и административную панель для управления контентом.

## Установка и запуск

### Требования
- Node.js (версия 14 или выше)
- npm (версия 6 или выше)

### Установка
1. Клонируйте репозиторий:
```
git clone <url-репозитория>
```

2. Перейдите в директорию проекта:
```
cd premium-auto
```

3. Установите зависимости:
```
npm install
```

### Запуск проекта
1. Запустите проект в режиме разработки:
```
npm start
```

2. Откройте [http://localhost:3000](http://localhost:3000) в вашем браузере.

## Структура проекта

```
premium-auto/
├── public/                 # Статические файлы
├── src/                    # Исходный код
│   ├── components/         # Компоненты React
│   │   ├── admin/          # Компоненты админ-панели
│   │   ├── layout/         # Компоненты макета (Header, Footer)
│   │   └── ui/             # UI компоненты
│   ├── data/               # Данные и мок-данные
│   ├── pages/              # Страницы приложения
│   │   ├── admin/          # Страницы административной панели
│   │   └── ...             # Основные страницы сайта
│   ├── services/           # Сервисы для работы с данными
│   ├── types/              # TypeScript типы и интерфейсы
│   ├── utils/              # Утилиты и вспомогательные функции
│   ├── App.tsx             # Корневой компонент приложения
│   └── index.tsx           # Точка входа
└── package.json            # Зависимости и скрипты
```

## Основные файлы и их назначение

### Ключевые файлы

- `src/App.tsx` - Корневой компонент с настройкой маршрутизации
- `src/data/cars.ts` - Данные об автомобилях
- `src/types/car.ts` - TypeScript типы и интерфейсы для автомобилей и других сущностей
- `src/services/carService.ts` - Сервис для работы с данными автомобилей (для публичной части)
- `src/services/adminService.ts` - Сервис для работы с данными в админ-панели

### Страницы публичного сайта

- `src/pages/HomePage.tsx` - Главная страница
- `src/pages/CatalogPage.tsx` - Каталог автомобилей
- `src/pages/CarDetailPage.tsx` - Страница с подробной информацией об автомобиле
- `src/pages/TestDrivePage.tsx` - Страница заявки на тест-драйв
- `src/pages/ContactPage.tsx` - Страница контактов и обратной связи
- `src/pages/AboutPage.tsx` - Страница "О компании"

### Страницы административной панели

- `src/pages/admin/LoginPage.tsx` - Страница входа в админ-панель
- `src/pages/admin/DashboardPage.tsx` - Главная страница административной панели
- `src/pages/admin/CarsPage.tsx` - Страница управления автомобилями
- `src/pages/admin/TestDriveRequestsPage.tsx` - Страница управления заявками на тест-драйв
- `src/pages/admin/ContactsPage.tsx` - Страница управления заявками с формы контактов

## Функциональность и особенности

### Публичная часть

1. **Каталог автомобилей**
   - Просмотр списка автомобилей
   - Фильтрация по маркам, моделям, характеристикам
   - Сортировка по цене, году, пробегу

2. **Страница автомобиля**
   - Подробная информация и характеристики
   - Галерея изображений
   - Возможность оставить заявку на тест-драйв

3. **Заявка на тест-драйв**
   - Форма для выбора автомобиля
   - Выбор даты и времени
   - Подтверждение заявки

4. **Контактная форма**
   - Отправка сообщений автосалону
   - Контактная информация
   - Карта с местоположением

### Административная панель

1. **Управление автомобилями**
   - Просмотр списка автомобилей
   - Добавление новых автомобилей
   - Редактирование существующих автомобилей
   - Удаление автомобилей

2. **Управление заявками на тест-драйв**
   - Просмотр всех заявок
   - Фильтрация по статусу
   - Изменение статуса заявок (ожидание, подтверждено, завершено, отменено)

3. **Управление контактными сообщениями**
   - Просмотр входящих сообщений
   - Ответы на сообщения
   - Архивирование сообщений

## Использование административной панели

### Вход в административную панель

1. Перейдите на страницу `/admin/login`
2. Введите следующие данные для входа:
   - Логин: `admin`
   - Пароль: `admin`
   
   или
   
   - Логин: `manager`
   - Пароль: `manager`

### Управление автомобилями

1. После входа перейдите в раздел "Автомобили"
2. Для добавления нового автомобиля нажмите кнопку "Добавить автомобиль"
3. Заполните форму с данными автомобиля и нажмите "Добавить автомобиль"
4. Для редактирования существующего автомобиля нажмите на иконку редактирования (карандаш)
5. Для удаления автомобиля нажмите на иконку удаления (корзина) и подтвердите действие

### Управление заявками на тест-драйв

1. Перейдите в раздел "Заявки на тест-драйв"
2. Используйте фильтры для просмотра заявок по статусу
3. Для изменения статуса заявки используйте соответствующие кнопки:
   - "Подтвердить" - для подтверждения заявки
   - "Отменить" - для отмены заявки
   - "Отметить как завершенный" - для завершенных тест-драйвов

### Управление сообщениями

1. Перейдите в раздел "Сообщения"
2. Выберите сообщение из списка для просмотра деталей
3. Используйте кнопку "Ответить" для создания ответа
4. Используйте кнопку "Архивировать" для перемещения сообщения в архив

## Техническая информация

### Хранение данных

В данном приложении использована эмуляция базы данных с помощью localStorage:

- Все данные хранятся в localStorage браузера
- При первом запуске приложения данные инициализируются из предопределенных массивов 
- При добавлении, изменении или удалении данных, они сохраняются в localStorage

### Аутентификация

- Базовая аутентификация с предопределенными пользователями
- Отсутствует хеширование паролей (в реальном проекте должно быть реализовано)
- Сессии не имеют времени истечения

### Масштабирование

Для использования с реальным backend API необходимо:

1. Заменить функции в services на реальные запросы к API
2. Добавить обработку ошибок и состояний загрузки
3. Реализовать полноценную аутентификацию с JWT токенами

## Разработка

### Добавление новых функций

1. Создайте компоненты в соответствующих директориях
2. Добавьте новые маршруты в App.tsx
3. При необходимости расширьте типы в types/car.ts
4. Добавьте новые сервисы в services/

### Стилизация

Проект использует styled-components для стилизации:

- Глобальные стили находятся в src/index.css
- Компонентные стили определены внутри файлов компонентов
- Для создания новых стилей используйте подход CSS-in-JS с styled-components

## Заключение

Проект Premium Auto представляет собой готовый к использованию веб-сайт автосалона с административной панелью. Для внедрения в реальной среде рекомендуется заменить эмуляцию данных на подключение к реальному backend API и улучшить систему аутентификации.
