import { GameEngine } from './engine/GameEngine.js';

class App {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.engine = null;
        this.init();
    }

    init() {
        // Устанавливаем размер canvas равным размеру окна
        this.resizeCanvas();
        
        // Обработчик изменения размера окна с debounce
        let resizeTimeout;
        window.addEventListener('resize', () => {
            // Отменяем предыдущий таймер
            if (resizeTimeout) {
                clearTimeout(resizeTimeout);
            }
            // Устанавливаем новый таймер с небольшой задержкой
            resizeTimeout = setTimeout(() => {
                this.resizeCanvas();
                if (this.engine) {
                    this.engine.handleResize();
                }
            }, 16); // ~60fps, обновление раз в кадр
        });

        // Инициализируем игровой движок
        this.engine = new GameEngine(this.canvas);
        this.engine.start();
    }

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        
        // Получаем размеры окна напрямую
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Устанавливаем размер canvas в логических пикселях (CSS)
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        // Устанавливаем реальный размер canvas с учетом DPR
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        
        // Масштабируем контекст для высоких DPI экранов
        const ctx = this.canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0); // Сбрасываем трансформацию
        ctx.scale(dpr, dpr);
    }
}

// Запускаем приложение после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

