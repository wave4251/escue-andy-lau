const ACHIEVEMENTS = {
    SPEEDRUNNER: {
        id: 'speedrunner',
        name: '闪电侠',
        description: '在30秒内完成一关',
        icon: '⚡',
        check: (game) => game.levelTime <= 30
    },
    MINIMALIST: {
        id: 'minimalist',
        name: '极简主义者',
        description: '使用最少步数完成关卡',
        icon: '🎯',
        check: (game) => game.board.moveCount <= game.currentLevel.minMoves
    },
    POWERUP_MASTER: {
        id: 'powerup_master',
        name: '道具大师',
        description: '在一关中使用所有类型的道具',
        icon: '🎭',
        check: (game) => game.usedPowerUps.size >= 3
    }
};

class AchievementSystem {
    constructor() {
        this.unlockedAchievements = new Set();
    }

    checkAchievements(game) {
        Object.values(ACHIEVEMENTS).forEach(achievement => {
            if (!this.unlockedAchievements.has(achievement.id) &&
                achievement.check(game)) {
                this.unlockAchievement(achievement);
            }
        });
    }

    unlockAchievement(achievement) {
        this.unlockedAchievements.add(achievement.id);
        this.showAchievementNotification(achievement);
    }

    showAchievementNotification(achievement) {
        // 显示成就解锁提示
    }
} 