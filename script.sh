#!/bin/bash

# Цвета для вывода
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функция для вывода сообщений
print_message() {
    echo -e "${BLUE}[2D Game Engine]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[2D Game Engine]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[2D Game Engine]${NC} $1"
}

# Проверка аргументов
if [ $# -eq 0 ]; then
    echo "Использование: ./script.sh [команда]"
    echo ""
    echo "Команды:"
    echo "  start       - Запустить проект в Docker"
    echo "  stop        - Остановить контейнер"
    echo "  restart     - Перезапустить контейнер"
    echo "  build       - Пересобрать Docker образ"
    echo "  logs        - Показать логи контейнера"
    echo "  shell       - Войти в контейнер (bash)"
    echo "  install     - Установить зависимости локально"
    echo "  dev         - Запустить локально (без Docker)"
    exit 1
fi

COMMAND=$1

case $COMMAND in
    start)
        print_message "Запуск проекта в Docker..."
        print_success "Проект запущен! Откройте http://localhost:5173"
        print_message "Нажмите Ctrl+C для остановки"
        docker-compose up --build
        ;;
    
    stop)
        print_message "Остановка контейнера..."
        docker-compose down
        print_success "Контейнер остановлен"
        ;;
    
    restart)
        print_message "Перезапуск контейнера..."
        docker-compose restart
        print_success "Контейнер перезапущен"
        ;;
    
    build)
        print_message "Пересборка Docker образа..."
        docker-compose build --no-cache
        print_success "Образ пересобран"
        ;;
    
    logs)
        print_message "Логи контейнера:"
        docker-compose logs -f
        ;;
    
    shell)
        print_message "Вход в контейнер..."
        docker-compose exec app sh
        ;;
    
    install)
        print_message "Установка зависимостей локально..."
        npm install
        print_success "Зависимости установлены"
        ;;
    
    dev)
        print_message "Запуск проекта локально (без Docker)..."
        npm run dev
        ;;
    
    *)
        print_warning "Неизвестная команда: $COMMAND"
        echo "Используйте: ./script.sh [start|stop|restart|build|logs|shell|install|dev]"
        exit 1
        ;;
esac

