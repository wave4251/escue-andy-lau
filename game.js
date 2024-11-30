class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentLevel = 0;
        
        // 创建游戏板
        this.board = new Board(4, 5, 100);
        
        // 设置画布尺寸
        this.canvas.width = this.board.canvasWidth;
        this.canvas.height = this.board.canvasHeight;
        
        // 初始化事件处理
        this.bindEvents();
        
        // 初始化第一关
        this.loadLevel(0);
        
        // 开始游戏循环
        this.gameLoop();

        // 打印调试信息
        console.log('Game initialized');
        console.log('Canvas size:', this.canvas.width, this.canvas.height);
        console.log('Board:', this.board);

        // 添加分享按钮
        this.addShareButton();
    }

    loadLevel(levelIndex) {
        if (levelIndex < LEVELS.length) {
            this.currentLevel = levelIndex;
            this.board.initLevel(LEVELS[levelIndex]);
            document.getElementById('level-num').textContent = levelIndex + 1;
            
            // 打印调试信息
            console.log('Level loaded:', levelIndex);
            console.log('Blocks:', this.board.blocks);
        }
    }

    bindEvents() {
        // 鼠标点击事件
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.board.handleClick(x, y);
            console.log('Click event:', x, y); // 调试信息
        });

        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (this.board.selectedBlock) {
                switch (e.key) {
                    case 'ArrowUp': this.board.moveSelectedBlock('up'); break;
                    case 'ArrowDown': this.board.moveSelectedBlock('down'); break;
                    case 'ArrowLeft': this.board.moveSelectedBlock('left'); break;
                    case 'ArrowRight': this.board.moveSelectedBlock('right'); break;
                }
                console.log('Key event:', e.key); // 调试信息
            }
        });

        // 重置按钮
        document.getElementById('reset-btn').addEventListener('click', () => {
            this.loadLevel(this.currentLevel);
        });

        // 提示按钮
        document.getElementById('hint-btn').addEventListener('click', () => {
            console.log('Hint button clicked'); // 调试信息
        });
    }

    render() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制背景
        this.ctx.fillStyle = '#f0f0f0';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格
        this.drawGrid();

        // 检查并打印方块信息
        console.log('Rendering blocks:', this.board.blocks.length);

        // 绘制所有方块
        this.board.blocks.forEach((block, index) => {
            this.drawBlock(block);
            console.log(`Block ${index}:`, block);
        });
    }

    drawBlock(block) {
        const x = block.x * this.board.cellSize;
        const y = block.y * this.board.cellSize;
        const width = block.width * this.board.cellSize;
        const height = block.height * this.board.cellSize;

        // 绘制方块背景
        this.ctx.fillStyle = this.getBlockColor(block.type);
        this.ctx.fillRect(x, y, width, height);

        // 绘制边框
        this.ctx.strokeStyle = block.selected ? '#ffffff' : '#000000';
        this.ctx.lineWidth = block.selected ? 3 : 2;
        this.ctx.strokeRect(x, y, width, height);

        // 绘制文字
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const text = this.getBlockText(block.type);
        this.ctx.fillText(text, x + width/2, y + height/2);
    }

    getBlockColor(type) {
        switch (type) {
            case 'star': return '#ff4d4d';     // 更鲜艳的红色
            case 'guard': return '#4a90e2';    // 更鲜艳的蓝色
            case 'barrier': return '#2ecc71';  // 更鲜艳的绿色
            case 'block': return '#f1c40f';    // 更鲜艳的黄色
            default: return '#95a5a6';         // 默认颜色
        }
    }

    getBlockText(type) {
        switch (type) {
            case 'star': return '华仔';
            case 'guard': return '保镖';
            case 'barrier': return '助理';
            case 'block': return '粉丝';
            default: return '';
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = '#cccccc';
        this.ctx.lineWidth = 1;

        for (let x = 0; x <= this.board.width; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.board.cellSize, 0);
            this.ctx.lineTo(x * this.board.cellSize, this.board.height * this.board.cellSize);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.board.height; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.board.cellSize);
            this.ctx.lineTo(this.board.width * this.board.cellSize, y * this.board.cellSize);
            this.ctx.stroke();
        }
    }

    gameLoop() {
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    addShareButton() {
        const shareButton = document.createElement('button');
        shareButton.textContent = '分享游戏';
        shareButton.className = 'share-button';
        shareButton.style.cssText = `
            background: linear-gradient(45deg, #25D366, #128C7E);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            margin: 10px;
            font-family: 'Arial', sans-serif;
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        // 添加分享图标
        const shareIcon = document.createElement('span');
        shareIcon.textContent = '📢';
        shareButton.prepend(shareIcon);

        shareButton.onclick = () => this.shareGame();

        document.querySelector('.controls').appendChild(shareButton);
    }

    shareGame() {
        const shareData = {
            title: '拯救刘德华 - 华容道游戏',
            text: '来玩这个有趣的华容道游戏，帮助刘德华突出重围！',
            url: window.location.href
        };

        if (navigator.share) {
            // 使用原生分享API
            navigator.share(shareData)
                .catch(err => {
                    console.log('分享失败:', err);
                    this.showShareFallback();
                });
        } else {
            // 降级方案
            this.showShareFallback();
        }
    }

    showShareFallback() {
        const shareDialog = document.createElement('div');
        shareDialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            padding: 20px;
            border-radius: 10px;
            border: 2px solid var(--primary-color);
            text-align: center;
            z-index: 1000;
        `;

        const title = document.createElement('h3');
        title.textContent = '分享游戏';
        title.style.color = '#fff';
        shareDialog.appendChild(title);

        const url = window.location.href;
        const urlInput = document.createElement('input');
        urlInput.value = url;
        urlInput.readOnly = true;
        urlInput.style.cssText = `
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border-radius: 5px;
            border: 1px solid var(--primary-color);
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
        `;
        shareDialog.appendChild(urlInput);

        const copyButton = document.createElement('button');
        copyButton.textContent = '复制链接';
        copyButton.style.cssText = `
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        `;
        copyButton.onclick = () => {
            urlInput.select();
            document.execCommand('copy');
            copyButton.textContent = '已复制！';
            setTimeout(() => {
                copyButton.textContent = '复制链接';
            }, 2000);
        };
        shareDialog.appendChild(copyButton);

        const closeButton = document.createElement('button');
        closeButton.textContent = '关闭';
        closeButton.style.cssText = `
            background: #666;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 10px;
        `;
        closeButton.onclick = () => document.body.removeChild(shareDialog);
        shareDialog.appendChild(closeButton);

        document.body.appendChild(shareDialog);
    }
}

// 确保在 DOM 加载完成后初始化游戏
window.onload = () => {
    new Game();
}; 