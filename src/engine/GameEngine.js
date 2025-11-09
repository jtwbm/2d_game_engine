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
        // Здесь будет логика обновления игры
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

        // Здесь будет отрисовка изометрической графики
        this.drawDebug();
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
        this.ctx.fillStyle = '#00ff00';
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`Canvas: ${Math.round(this.width)}x${Math.round(this.height)}`, 10, 30);
        this.ctx.fillText(`Center: (${Math.round(this.centerX)}, ${Math.round(this.centerY)})`, 10, 50);
        this.ctx.fillText(`DPR: ${window.devicePixelRatio || 1}`, 10, 70);
    }
}

