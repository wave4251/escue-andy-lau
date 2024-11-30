class Board {
    /**
     * 创建游戏棋盘
     * @param {number} width - 棋盘宽度（格子数）
     * @param {number} height - 棋盘高度（格子数）
     * @param {number} cellSize - 每个格子的像素大小
     */
    constructor(width = 4, height = 5, cellSize = 80) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.blocks = [];
        this.selectedBlock = null;
        this.moveCount = 0;
        
        // 计算画布尺寸
        this.canvasWidth = width * cellSize;
        this.canvasHeight = height * cellSize;
    }

    /**
     * 初始化关卡
     * @param {object} level - 关卡配置
     */
    initLevel(level) {
        this.blocks = level.blocks.map(blockData => 
            new Block(
                blockData.x,
                blockData.y,
                blockData.width,
                blockData.height,
                blockData.type,
                blockData.movable
            )
        );
        this.moveCount = 0;
        this.selectedBlock = null;
        this.updateMoveCount();
    }

    /**
     * 处理鼠标点击事件
     * @param {number} x - 鼠标x坐标
     * @param {number} y - 鼠标y坐标
     */
    handleClick(x, y) {
        const gridX = Math.floor(x / this.cellSize);
        const gridY = Math.floor(y / this.cellSize);
        
        // 取消之前选中的方块
        if (this.selectedBlock) {
            this.selectedBlock.selected = false;
        }

        // 查找点击的方块
        this.selectedBlock = this.blocks.find(block => 
            gridX >= block.x && 
            gridX < block.x + block.width && 
            gridY >= block.y && 
            gridY < block.y + block.height
        );

        // 选中新方块
        if (this.selectedBlock) {
            this.selectedBlock.selected = true;
        }
    }

    /**
     * 移动选中的方块
     * @param {string} direction - 移动方向
     * @returns {boolean} 是否成功移动
     */
    moveSelectedBlock(direction) {
        if (!this.selectedBlock) return false;

        const block = this.selectedBlock;
        let newX = block.x;
        let newY = block.y;

        switch (direction) {
            case 'up': newY--; break;
            case 'down': newY++; break;
            case 'left': newX--; break;
            case 'right': newX++; break;
        }

        if (block.canMoveTo(newX, newY, this.blocks, this.width, this.height)) {
            block.x = newX;
            block.y = newY;
            this.moveCount++;
            this.updateMoveCount();
            return true;
        }
        return false;
    }

    /**
     * 更新移动步数显示
     */
    updateMoveCount() {
        const moveCountElement = document.getElementById('move-count');
        if (moveCountElement) {
            moveCountElement.textContent = this.moveCount;
        }
    }
} 