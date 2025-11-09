import { IsoUtils } from './IsoUtils.js';

/**
 * Класс для отрисовки изометрической сетки
 */
export class Grid {
    constructor(width, height) {
        this.width = width;  // Количество тайлов по ширине
        this.height = height; // Количество тайлов по высоте
    }

    /**
     * Отрисовка сетки
     * @param {CanvasRenderingContext2D} ctx - Контекст canvas
     * @param {Camera} camera - Камера для учета смещения
     */
    render(ctx, camera) {
        const cameraPos = camera.getPosition();
        const zoom = camera.getZoom();
        
        // Получаем размеры экрана в логических пикселях
        const screenWidth = ctx.canvas.width / (window.devicePixelRatio || 1);
        const screenHeight = ctx.canvas.height / (window.devicePixelRatio || 1);
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;
        
        // Вычисляем видимую область в изометрических координатах
        // Конвертируем все углы экрана в изометрические координаты с учетом масштаба
        const topLeftIso = IsoUtils.screenToIso(-centerX, -centerY, zoom);
        const topRightIso = IsoUtils.screenToIso(centerX, -centerY, zoom);
        const bottomLeftIso = IsoUtils.screenToIso(-centerX, centerY, zoom);
        const bottomRightIso = IsoUtils.screenToIso(centerX, centerY, zoom);
        
        // Находим минимальные и максимальные значения с учетом камеры
        const minX = Math.min(topLeftIso.x, topRightIso.x, bottomLeftIso.x, bottomRightIso.x);
        const maxX = Math.max(topLeftIso.x, topRightIso.x, bottomLeftIso.x, bottomRightIso.x);
        const minY = Math.min(topLeftIso.y, topRightIso.y, bottomLeftIso.y, bottomRightIso.y);
        const maxY = Math.max(topLeftIso.y, topRightIso.y, bottomLeftIso.y, bottomRightIso.y);
        
        // Определяем диапазон тайлов для отрисовки с учетом камеры и добавляем запас
        const margin = 5; // Запас для плавной отрисовки
        const startX = Math.max(0, Math.floor(minX + cameraPos.x) - margin);
        const endX = Math.min(this.width, Math.ceil(maxX + cameraPos.x) + margin);
        const startY = Math.max(0, Math.floor(minY + cameraPos.y) - margin);
        const endY = Math.min(this.height, Math.ceil(maxY + cameraPos.y) + margin);
        
        // Настройка стиля линий
        ctx.strokeStyle = '#4a5568';
        ctx.lineWidth = 1;
        
        // Отрисовка линий сетки
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                this.drawTile(ctx, x, y, cameraPos, centerX, centerY, zoom);
            }
        }
    }

    /**
     * Отрисовка одного тайла сетки
     * @param {CanvasRenderingContext2D} ctx - Контекст canvas
     * @param {number} x - Изометрическая координата X тайла
     * @param {number} y - Изометрическая координата Y тайла
     * @param {{x: number, y: number}} cameraPos - Позиция камеры в изометрических координатах
     * @param {number} centerX - Центр экрана по X
     * @param {number} centerY - Центр экрана по Y
     * @param {number} zoom - Уровень масштаба
     */
    drawTile(ctx, x, y, cameraPos, centerX, centerY, zoom) {
        // Вычисляем относительную позицию тайла относительно камеры
        const relativeX = x - cameraPos.x;
        const relativeY = y - cameraPos.y;
        
        // Преобразуем в экранные координаты с учетом масштаба
        const screenPos = IsoUtils.isoToScreen(relativeX, relativeY, zoom);
        
        // Позиция на экране
        const screenX = centerX + screenPos.x;
        const screenY = centerY + screenPos.y;
        
        const tileSize = IsoUtils.getTileSize(zoom);
        
        // Рисуем ромб (изометрический тайл)
        ctx.beginPath();
        // Верхняя точка
        ctx.moveTo(screenX, screenY);
        // Правая точка
        ctx.lineTo(screenX + tileSize.width / 2, screenY + tileSize.height / 2);
        // Нижняя точка
        ctx.lineTo(screenX, screenY + tileSize.height);
        // Левая точка
        ctx.lineTo(screenX - tileSize.width / 2, screenY + tileSize.height / 2);
        // Замыкаем ромб
        ctx.closePath();
        ctx.stroke();
    }
}

