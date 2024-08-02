# Лаборатория

В проекте использована UI-библиотека Material UI

В качестве бекэнда используется простой сервер NodeJS + Express (https://scmp-bot-server.ru/hello, https://github.com/Ivkin-Alexey/tg-bot-sc/), который я писал в качестве pet-проекта до старта обучения.

Приложение позволяет искать научное оборудование, имеющееся в организации, и смотреть о нем информацию.

Деплой https://scmp-laboratory.netlify.app

### **1 уровень (обязательный - необходимый минимум)**

- [x] Реализованы **Требования к функциональности.**
- [x] Хранение учетных записей пользователей, их избранного и истории поиска реализовано на стороне сервера

**React**

- [x] **Использованы функциональные компоненты c хуками**
- [x] Есть разделение на **умные и глупые компоненты**
- [x] Есть **рендеринг списков** (equipment-card-list, history-list)
- [x] Реализована одна **форма** (компонент SignForm)
- [x] Есть применение **Контекст API** (для смены цвета карточек)
- [x] Есть применение **предохранителя** (на странице SignIn, срабатывает, если ввести креды несуществующего пользователя)
- [x] Есть **кастомный хук** (useTheme)
- [x] 3 компонента используют **PropTypes** (equipment-card-list, equipment-card, history-list)
- [x] Поиск не триггерит много запросов к серверу (**debounce**)
- [x] Есть применение **lazy + Suspense** (nav-buttons-list)

**Redux**

- [x] Использован **Modern Redux with Redux Toolkit**
- [x] Использованы **слайсы**
- [x] Есть одна **кастомная мидлвара** (authMiddleware)
- [x] Используется **RTK Query**
- [x] Используется **Transforming Responses** (для эндпоинта fetchFavoriteEquipments)

### **2 уровень (необязательный)**

- [x] Использование **TypeScript**
- [ ] (**не реализовано**) Использование **Storybook**
- [x] Использование **Firebase** - вместо Firebase хранение пользовательских данных реализовано на простом сервере NodeJS + Express
- [ ] (**не реализовано**) **Низкая связанность клиентского кода с хранилищем**
- [ ] (**не реализовано**) Настроен **CI/CD**
- [ ] (**не реализовано**) Реализована **виртуализация списков**
- [ ] (**не реализовано**) Используются **мемоизированные селекторы**
- [ ] (**не реализовано**) Используется **нормализованная структура стейта**
- [ ] (**не реализовано**) Проведена **оптимизация приложения**
- [ ] (**не реализовано**) **Feature Flags**
- [ ] (**не реализовано**) Добавлены **тесты**
- [ ] (**не реализовано**) Связь UI и бизнес-логики построена не через команды, а через **события**
- [ ] (**не реализовано**) **Project Console API**
