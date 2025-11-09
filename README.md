# 2D Isometric Game Engine

Игровой движок для 2D изометрических игр на чистом JavaScript.

## Технологии

- **Vite** - современный сборщик и dev-сервер
- **Docker** - контейнеризация для разработки
- **Pure JavaScript** - без готовых 2D библиотек

## Быстрый старт

### Через Docker (рекомендуется)

1. Запустить проект:
```bash
./script.sh start
```

2. Открыть в браузере: http://localhost:5173

3. Просмотр логов:
```bash
./script.sh logs
```

### Локально (без Docker)

1. Установить зависимости:
```bash
./script.sh install
```

2. Запустить dev-сервер:
```bash
./script.sh dev
```

## Управление проектом

Используйте `script.sh` для управления проектом:

- `./script.sh start` - Запустить проект в Docker
- `./script.sh stop` - Остановить контейнер
- `./script.sh restart` - Перезапустить контейнер
- `./script.sh build` - Пересобрать Docker образ
- `./script.sh logs` - Показать логи контейнера
- `./script.sh shell` - Войти в контейнер (bash)
- `./script.sh install` - Установить зависимости локально
- `./script.sh dev` - Запустить локально (без Docker)

## Структура проекта

```
.
├── src/
│   ├── engine/
│   │   └── GameEngine.js    # Основной класс игрового движка
│   └── main.js              # Точка входа приложения
├── index.html               # HTML страница
├── package.json             # Зависимости проекта
├── vite.config.js           # Конфигурация Vite
├── Dockerfile               # Docker образ
├── docker-compose.yml       # Docker Compose конфигурация
└── script.sh                # Скрипт управления проектом
```

## Особенности

- ✅ Responsive canvas на всю страницу
- ✅ Поддержка высоких DPI экранов
- ✅ Hot reload при изменении файлов
- ✅ Готов к разработке изометрической графики

