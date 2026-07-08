# Top StackOverflow Questions

Веб-приложение для отображения 5 самых популярных вопросов с StackOverflow, содержащих `"react-redux"` в заголовке, начиная с выбранной пользователем даты.

## Функциональные возможности

- Автоматическая загрузка данных при старте (дата по умолчанию — 01.01.2026)
- Изменение рейтинга вопросов с помощью кнопок +/− (только в локальном хранилище, без API)
- Drag-and-drop для изменения порядка элементов в списке
- Обмен элементов двойным кликом (первый выделяет, второй — меняет местами)
- Раскрытие вопроса по клику с отображением подробной информации (автор, репутация, просмотры, дата активности)
- Зелёный фон для вопросов с ответом (`is_answered === true`)
- Выбор даты через MUI DatePicker, кнопка «Поиск» появляется только при изменении даты
- Индикация загрузки, сообщения об ошибках и отсутствии результатов

## Технологический стек

| Технология               | Назначение                                  |
| ------------------------ | ------------------------------------------- |
| React 19                 | UI-библиотека                               |
| TypeScript 5.7           | Статическая типизация                       |
| Redux Toolkit            | Управление состоянием и асинхронные запросы |
| React-DnD                | Drag-and-drop                               |
| MUI (Material-UI)        | Компоненты интерфейса и стилизация          |
| Zod                      | Валидация данных от API                     |
| Webpack 5                | Сборка проекта                              |
| Vitest + Testing Library | Unit-тестирование                           |
| ESLint + Prettier        | Линтинг и форматирование                    |

## Установка

```bash
git clone https://github.com/AlexArtsy/top-stackoverflow-questions.git
cd top-stackoverflow-questions
npm install
```

## Доступные команды

| Команда                | Описание                                |
| ---------------------- | --------------------------------------- |
| `npm start`            | Запуск dev-сервера (порт 3000)          |
| `npm run build`        | Production-сборка в папку `dist/`       |
| `npm run typecheck`    | Проверка типов TypeScript (без эмиссии) |
| `npm test`             | Запуск тестов (однократный прогон)      |
| `npm run test:watch`   | Тесты в режиме наблюдения               |
| `npm run lint`         | Проверка ESLint                         |
| `npm run lint:fix`     | Автоисправление ошибок ESLint           |
| `npm run format`       | Форматирование Prettier                 |
| `npm run format:check` | Проверка форматирования                 |

## Запуск

```bash
npm start
```

Приложение откроется в браузере по адресу [http://localhost:3000](http://localhost:3000).

## Структура проекта

```
src/
  api/           fetch-questions.ts        — асинхронный запрос к StackExchange API
  hooks/         use-click-handler.tsx     — различение одиночного/двойного клика
                 use-click-outside.tsx     — определение клика вне контейнера
                 use-double-click-swap.tsx — логика обмена элементов двойным кликом
                 use-drag-and-drop.tsx     — логика Drag-and-Drop
                 use-questions-state.tsx   — управление состоянием списка вопросов
  store/         question-slice.ts         — Redux-слайс (экшены, редьюсеры)
                 store.ts                  — конфигурация Redux-стора
  types/         question.ts              — Zod-схемы и типы
  view/
    layout/      body.tsx, header.tsx     — каркас страницы
    questions/   list.tsx                 — список вопросов (основной компонент)
                 list-item.tsx            — карточка вопроса (DnD, раскрытие)
                 list-item-content.tsx    — содержимое раскрытой карточки
                 score-controls.tsx       — кнопки +/−
                 no-data.tsx              — сообщение при отсутствии результатов
    search/      button.tsx               — кнопка «Поиск»
                 date-picker.tsx          — выбор даты
  app.tsx                                 — корневой компонент
  constants.ts                            — константы приложения
  index.tsx                               — точка входа
```

## Тестирование

Проект содержит 26 unit-тестов:

- **question-slice** — 7 тестов: редьюсеры `setFromDate`, `changeScore`, жизненный цикл `fetchQuestions`
- **useClickHandler** — 4 теста: одиночный/двойной клик, таймеры, cleanup
- **useDoubleClickSwap** — 4 теста: выделение, снятие, обмен, clearSelection
- **useClickOutside** — 3 теста: клик снаружи, внутри, после unmount
- **NoData** — 1 тест: рендер сообщения
- **ScoreControls** — 3 теста: клики +/−, блокировка всплытия dblclick
- **ListItemContent** — 1 тест: рендер полей вопроса и ссылки
- **SearchButton** — 3 теста: отображение, скрытие, отображение при loading

```bash
npm test
```

## API

Данные запрашиваются через [StackExchange API](https://api.stackexchange.com/docs) без ключа доступа (лимит: 300 запросов/день).

Эндпоинт: `https://api.stackexchange.com/2.3/search/advanced`

Параметры запроса: `order=desc`, `sort=votes`, `q=react-redux`, `site=stackoverflow`, `pagesize=5`, `fromdate=<unix>`, `filter=withbody`.
