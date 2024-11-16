# Лаборатория

## Деплой https://scmp-laboratory.netlify.app

## Эндпоинты:

### GET

Общее:
/hello - проверка работоспособности сервера **(публичный)**
/jwtHello - проверка актуальности JWT-токена

Пользователи:
/users/{user login} - данные аккаунта
/users - список пользователей

Оборудование:
/equipments - список оборудования  **(публичный)**
/equipments/favorite/{user login} - список избранного оборудования для конкретного пользователя
/equipments/operate/{user login} - список оборудования в работе для конкретного пользователя
/equipments/{equipment ID} - информация об единице оборудования **(публичный)**
/equipments/search-history/{user login} - история поиска оборудования для конкретного пользователя

### POST

Пользователи:
/auth/login - войти
/auth/users - зарегистрировать нового пользователя

Оборудование:
/equipments/operate/{equipment ID} - добавить оборудование в список работающего в данный момент
/equipments/favorite/{equipment ID} - добавить оборудование в список избранного для данного пользователя
/equipments/search-history - добавить поисковый запрос в историю поиска оборудования

### DELETE

Пользователи:
/users/{user login} - удалить аккаунт пользователя

Оборудование:
/equipments/operate/{equipment ID} - удалить оборудование из списка работающего в данный момент

### PATCH
/users/{user login} - обновить данные пользователя

