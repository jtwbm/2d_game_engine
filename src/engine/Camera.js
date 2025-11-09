/**
 * Класс камеры для управления видом на изометрическую сцену
 */
export class Camera {
    constructor() {
        // Позиция камеры в изометрических координатах
        this.x = 0;
        this.y = 0;
        
        // Скорость перемещения камеры
        this.speed = 2;
        
        // Состояния нажатых клавиш
        this.keys = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        
        // Границы камеры (null = без ограничений)
        this.minX = null;
        this.maxX = null;
        this.minY = null;
        this.maxY = null;
        
        // Масштаб (zoom): 0 = далеко, 1 = средне, 2 = близко
        this.zoom = 0;
    }

    /**
     * Обновление камеры
     * @param {number} deltaTime - Время с предыдущего кадра в миллисекундах
     */
    update(deltaTime) {
        // Нормализуем скорость относительно частоты кадров
        const moveSpeed = this.speed * (deltaTime / 16.67); // 16.67ms = 60fps
        
        // Перемещение по диагоналям
        if (this.keys.up && this.keys.left) {
            this.x -= moveSpeed * 0.707; // cos(45°)
            this.y -= moveSpeed * 0.707; // sin(45°)
        } else if (this.keys.up && this.keys.right) {
            this.x += moveSpeed * 0.707;
            this.y -= moveSpeed * 0.707;
        } else if (this.keys.down && this.keys.left) {
            this.x -= moveSpeed * 0.707;
            this.y += moveSpeed * 0.707;
        } else if (this.keys.down && this.keys.right) {
            this.x += moveSpeed * 0.707;
            this.y += moveSpeed * 0.707;
        } else {
            // Перемещение по осям
            if (this.keys.up) {
                this.y -= moveSpeed;
            }
            if (this.keys.down) {
                this.y += moveSpeed;
            }
            if (this.keys.left) {
                this.x -= moveSpeed;
            }
            if (this.keys.right) {
                this.x += moveSpeed;
            }
        }
        
        // Ограничиваем позицию камеры границами
        this.clampPosition();
    }
    
    /**
     * Ограничение позиции камеры границами
     */
    clampPosition() {
        if (this.minX !== null) {
            this.x = Math.max(this.minX, this.x);
        }
        if (this.maxX !== null) {
            this.x = Math.min(this.maxX, this.x);
        }
        if (this.minY !== null) {
            this.y = Math.max(this.minY, this.y);
        }
        if (this.maxY !== null) {
            this.y = Math.min(this.maxY, this.y);
        }
    }

    /**
     * Установка состояния клавиши
     * @param {string} direction - Направление ('up', 'down', 'left', 'right')
     * @param {boolean} pressed - Нажата ли клавиша
     */
    setKey(direction, pressed) {
        if (this.keys.hasOwnProperty(direction)) {
            this.keys[direction] = pressed;
        }
    }

    /**
     * Получить позицию камеры
     * @returns {{x: number, y: number}}
     */
    getPosition() {
        return { x: this.x, y: this.y };
    }

    /**
     * Установить позицию камеры
     * @param {number} x - Координата X
     * @param {number} y - Координата Y
     */
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.clampPosition();
    }
    
    /**
     * Установить границы камеры
     * @param {number} minX - Минимальная координата X
     * @param {number} maxX - Максимальная координата X
     * @param {number} minY - Минимальная координата Y
     * @param {number} maxY - Максимальная координата Y
     */
    setBounds(minX, maxX, minY, maxY) {
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;
        // Ограничиваем текущую позицию
        this.clampPosition();
    }
    
    /**
     * Получить текущий масштаб
     * @returns {number} Уровень масштаба (0 = далеко, 1 = средне, 2 = близко)
     */
    getZoom() {
        return this.zoom;
    }
    
    /**
     * Установить масштаб
     * @param {number} zoom - Уровень масштаба (0 = далеко, 1 = средне, 2 = близко)
     */
    setZoom(zoom) {
        this.zoom = Math.max(0, Math.min(2, Math.floor(zoom)));
    }
    
    /**
     * Увеличить масштаб
     */
    zoomIn() {
        if (this.zoom < 2) {
            this.zoom++;
        }
    }
    
    /**
     * Уменьшить масштаб
     */
    zoomOut() {
        if (this.zoom > 0) {
            this.zoom--;
        }
    }
}

