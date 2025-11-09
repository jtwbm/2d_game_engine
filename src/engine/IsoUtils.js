/**
 * Утилиты для работы с изометрическими координатами
 */
export class IsoUtils {
    /**
     * Базовый размер тайла в изометрической проекции (zoom = 0, далеко)
     */
    static BASE_TILE_WIDTH = 64;
    static BASE_TILE_HEIGHT = 32;
    
    /**
     * Множители масштаба для каждого уровня зума
     * 0 = далеко (x1.0), 1 = средне (x1.5), 2 = близко (x2.0)
     */
    static ZOOM_MULTIPLIERS = [1.0, 1.5, 2.0];

    /**
     * Получить размер тайла с учетом масштаба
     * @param {number} zoom - Уровень масштаба (0 = далеко, 1 = средне, 2 = близко)
     * @returns {{width: number, height: number}}
     */
    static getTileSize(zoom = 0) {
        const multiplier = this.ZOOM_MULTIPLIERS[Math.max(0, Math.min(2, Math.floor(zoom)))];
        return {
            width: this.BASE_TILE_WIDTH * multiplier,
            height: this.BASE_TILE_HEIGHT * multiplier
        };
    }

    /**
     * Преобразование изометрических координат (x, y) в экранные координаты
     * @param {number} isoX - Изометрическая координата X
     * @param {number} isoY - Изометрическая координата Y
     * @param {number} zoom - Уровень масштаба
     * @returns {{x: number, y: number}} Экранные координаты
     */
    static isoToScreen(isoX, isoY, zoom = 0) {
        const tileSize = this.getTileSize(zoom);
        const screenX = (isoX - isoY) * (tileSize.width / 2);
        const screenY = (isoX + isoY) * (tileSize.height / 2);
        return { x: screenX, y: screenY };
    }

    /**
     * Преобразование экранных координат в изометрические координаты
     * @param {number} screenX - Экранная координата X
     * @param {number} screenY - Экранная координата Y
     * @param {number} zoom - Уровень масштаба
     * @returns {{x: number, y: number}} Изометрические координаты
     */
    static screenToIso(screenX, screenY, zoom = 0) {
        const tileSize = this.getTileSize(zoom);
        const isoX = (screenX / (tileSize.width / 2) + screenY / (tileSize.height / 2)) / 2;
        const isoY = (screenY / (tileSize.height / 2) - screenX / (tileSize.width / 2)) / 2;
        return { x: isoX, y: isoY };
    }
}

