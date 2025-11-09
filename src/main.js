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
        
        // Настройка обработки клавиатуры и мыши
        this.setupKeyboard();
        this.setupMouse();
    }
    
    setupKeyboard() {
        const camera = this.engine.getCamera();
        
        // Маппинг клавиш на направления
        const keyMap = {
            // WASD
            'KeyW': 'up',
            'KeyS': 'down',
            'KeyA': 'left',
            'KeyD': 'right',
            // Стрелки
            'ArrowUp': 'up',
            'ArrowDown': 'down',
            'ArrowLeft': 'left',
            'ArrowRight': 'right'
        };
        
        // Обработчик нажатия клавиш
        window.addEventListener('keydown', (event) => {
            const direction = keyMap[event.code];
            if (direction) {
                event.preventDefault();
                camera.setKey(direction, true);
            }
            
            // Обработка масштабирования
            if (event.code === 'BracketLeft') { // [
                event.preventDefault();
                camera.zoomOut();
            } else if (event.code === 'BracketRight') { // ]
                event.preventDefault();
                camera.zoomIn();
            }
        });
        
        // Обработчик отпускания клавиш
        window.addEventListener('keyup', (event) => {
            const direction = keyMap[event.code];
            if (direction) {
                event.preventDefault();
                camera.setKey(direction, false);
            }
        });
        
        // Обработка потери фокуса (отпускаем все клавиши)
        window.addEventListener('blur', () => {
            camera.setKey('up', false);
            camera.setKey('down', false);
            camera.setKey('left', false);
            camera.setKey('right', false);
        });
    }
    
    setupMouse() {
        const camera = this.engine.getCamera();
        
        // Обработка колесика мыши для масштабирования
        this.canvas.addEventListener('wheel', (event) => {
            event.preventDefault();
            
            if (event.deltaY < 0) {
                // Прокрутка вверх - увеличить масштаб
                camera.zoomIn();
            } else if (event.deltaY > 0) {
                // Прокрутка вниз - уменьшить масштаб
                camera.zoomOut();
            }
        }, { passive: false });
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

