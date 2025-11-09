import { Camera } from './Camera.js';
import { Grid } from './Grid.js';

/**
 * Основной класс игрового движка для изометрической 2D игры
 */
export class GameEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isRunning = false;
        this.lastTime = 0;
        
        // Размеры canvas
        this.width = 0;
        this.height = 0;
        
        // Центр экрана для изометрической проекции
        this.centerX = 0;
        this.centerY = 0;
        
        // Камера
        this.camera = new Camera();
        
        // Сетка 100x100
        this.grid = new Grid(100, 100);
        
        // Устанавливаем границы камеры с запасом в 5 клеток от края сетки
        const margin = 5;
        this.camera.setBounds(
            -margin,           // minX: можно выйти на 5 клеток влево
            100 + margin,      // maxX: можно выйти на 5 клеток вправо
            -margin,           // minY: можно выйти на 5 клеток вверх
            100 + margin       // maxY: можно выйти на 5 клеток вниз
        );
        
        // Устанавливаем камеру в центр сетки при старте
        this.camera.setPosition(50, 50);
    }

    /**
     * Запуск игрового цикла
     */
    start() {
        this.isRunning = true;
        this.updateDimensions();
        this.gameLoop(0);
    }

    /**
     * Остановка игрового цикла
     */
    stop() {
        this.isRunning = false;
    }

    /**
     * Обновление размеров canvas
     */
    updateDimensions() {
        // Получаем размеры окна напрямую
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
    }

    /**
     * Обработка изменения размера окна
     */
    handleResize() {
        this.updateDimensions();
    }

    /**
     * Основной игровой цикл
     */
    gameLoop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Обновление логики игры
        this.update(deltaTime);

        // Отрисовка
        this.render();

        // Следующий кадр
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    /**
     * Обновление логики игры
     */
    update(deltaTime) {
        // Обновление камеры
        this.camera.update(deltaTime);
    }

    /**
     * Отрисовка кадра
     */
    render() {
        // Используем кэшированные размеры (обновляются только при ресайзе)
        // Очистка canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Установка стилей для изометрической графики
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';

        // Отрисовка сетки
        this.grid.render(this.ctx, this.camera);

        // Отладочная информация
        this.drawDebug();
    }
    
    /**
     * Получить камеру (для управления извне)
     */
    getCamera() {
        return this.camera;
    }

    /**
     * Временная отрисовка для отладки
     */
    drawDebug() {
        // Используем кэшированные размеры (обновляются только при ресайзе)
        // Рисуем центр экрана
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(this.centerX - 2, this.centerY - 2, 4, 4);

        // Рисуем текст с информацией
        const cameraPos = this.camera.getPosition();
        const zoom = this.camera.getZoom();
        const zoomNames = ['Далеко', 'Средне', 'Близко'];
        
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`Canvas: ${Math.round(this.width)}x${Math.round(this.height)}`, 10, 30);
        this.ctx.fillText(`Camera: (${Math.round(cameraPos.x)}, ${Math.round(cameraPos.y)})`, 10, 50);
        this.ctx.fillText(`Zoom: ${zoomNames[zoom]} (${zoom})`, 10, 70);
        this.ctx.fillText(`Grid: 100x100`, 10, 90);
        this.ctx.fillText(`Controls: WASD/Arrows | Zoom: Mouse Wheel or [ ]`, 10, 110);
    }
}

