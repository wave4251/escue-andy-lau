const LEVELS = [
    {
        name: "第一关：初出茅庐",
        blocks: [
            { x: 1, y: 0, width: 2, height: 2, type: 'star' },     // 刘德华
            { x: 1, y: 2, width: 2, height: 1, type: 'guard' },    // 保镖
            { x: 0, y: 0, width: 1, height: 2, type: 'barrier' },  // 助理
            { x: 3, y: 0, width: 1, height: 2, type: 'barrier' },  // 助理
            { x: 0, y: 2, width: 1, height: 1, type: 'block' },    // 粉丝
            { x: 3, y: 2, width: 1, height: 1, type: 'block' }     // 粉丝
        ],
        exit: { x: 1, width: 2, position: 'bottom' },
        maxMoves: 50
    },
    {
        name: "第二关：重重包围",
        blocks: [
            { x: 1, y: 1, width: 2, height: 2, type: 'star' },
            { x: 0, y: 0, width: 1, height: 2, type: 'barrier' },
            { x: 3, y: 0, width: 1, height: 2, type: 'barrier' },
            { x: 1, y: 0, width: 2, height: 1, type: 'guard' },
            { x: 1, y: 3, width: 2, height: 1, type: 'guard' },
            { x: 0, y: 2, width: 1, height: 2, type: 'block' },
            { x: 3, y: 2, width: 1, height: 2, type: 'block' }
        ],
        exit: { x: 1, width: 2, position: 'bottom' },
        maxMoves: 60
    },
    {
        name: "第三关：险象环生",
        blocks: [
            { x: 1, y: 2, width: 2, height: 2, type: 'star' },
            { x: 0, y: 0, width: 1, height: 3, type: 'barrier' },
            { x: 3, y: 0, width: 1, height: 3, type: 'barrier' },
            { x: 1, y: 0, width: 2, height: 1, type: 'guard' },
            { x: 1, y: 1, width: 2, height: 1, type: 'guard' },
            { x: 0, y: 3, width: 1, height: 2, type: 'block' },
            { x: 3, y: 3, width: 1, height: 2, type: 'block' }
        ],
        exit: { x: 1, width: 2, position: 'bottom' },
        maxMoves: 70
    },
    {
        name: "第四关：穿越时空",
        blocks: [/* ... */],
        specialEffects: {
            portalPairs: [
                { x1: 0, y1: 1, x2: 3, y2: 1 }, // 传送门对
                { x1: 1, y1: 0, x2: 1, y2: 3 }
            ],
            movingBlocks: [
                { block: { x: 2, y: 2, width: 1, height: 1, type: 'block' },
                  path: [{x: 2, y: 2}, {x: 2, y: 3}, {x: 2, y: 2}] }
            ]
        }
    }
]; 