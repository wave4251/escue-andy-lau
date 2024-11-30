class GameStorage {
    static saveProgress(levelIndex, moveCount) {
        const progress = {
            levelIndex,
            moveCount,
            timestamp: Date.now()
        };
        localStorage.setItem('gameProgress', JSON.stringify(progress));
    }

    static loadProgress() {
        const progress = localStorage.getItem('gameProgress');
        return progress ? JSON.parse(progress) : null;
    }

    static saveBestMoves(levelIndex, moveCount) {
        const key = `bestMoves_${levelIndex}`;
        const currentBest = localStorage.getItem(key);
        if (!currentBest || moveCount < parseInt(currentBest)) {
            localStorage.setItem(key, moveCount.toString());
        }
    }
} 