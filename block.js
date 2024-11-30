class Block {
    /**
     * 创建一个游戏方块
     * @param {number} x - 方块的x坐标
     * @param {number} y - 方块的y坐标
     * @param {number} width - 方块的宽度（以格子为单位）
     * @param {number} height - 方块的高度（以格子为单位）
     * @param {string} type - 方块类型
     */
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.selected = false;
    }

    /**
     * 检查是否可以移动到新位置
     * @param {number} newX - 新的x坐标
     * @param {number} newY - 新的y坐标
     * @param {Block[]} blocks - 所有方块的数组
     * @param {number} boardWidth - 棋盘宽度
     * @param {number} boardHeight - 棋盘高度
     * @returns {boolean} 是否可以移动
     */
    canMoveTo(newX, newY, blocks, boardWidth, boardHeight) {
        // 检查边界 - 所有方块都不允许超出边界
        if (newX < 0 || newX + this.width > boardWidth || 
            newY < 0 || newY + this.height > boardHeight) {
            return false;
        }

        // 检查碰撞
        for (let block of blocks) {
            if (block === this) continue;
            if (this.isColliding(newX, newY, block)) {
                return false;
            }
        }

        return true;
    }

    /**
     * 检查是否与其他方块碰撞
     * @param {number} newX - 新的x坐标
     * @param {number} newY - 新的y坐标
     * @param {Block} other - 其他方块
     * @returns {boolean} 是否发生碰撞
     */
    isColliding(newX, newY, other) {
        return !(newX + this.width <= other.x || 
                newX >= other.x + other.width ||
                newY + this.height <= other.y || 
                newY >= other.y + other.height);
    }
} 