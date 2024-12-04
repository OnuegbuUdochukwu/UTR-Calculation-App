const calculateUtr = (player1, player2, score) => {
    const maxAdjustment = 1.0;

    const [player1Wins, player2Wins] = score.split(',').reduce(
        ([p1, p2], set) => {
            const [p1Score, p2Score] = set.trim().split('-').map(Number);
            return p1Score > p2Score ? [p1 + 1, p2] : [p1, p2 + 1];
        },
        [0, 0]
    );

    const player1Won = player1Wins > player2Wins;
    const adjustment1 = maxAdjustment * (1 - Math.min(player1.matches.length, 10) / 10);
    const adjustment2 = maxAdjustment * (1 - Math.min(player2.matches.length, 10) / 10);

    if (player1Won) {
        player1.utr += adjustment1;
        player2.utr -= adjustment2 / 2;
    } else {
        player2.utr += adjustment2;
        player1.utr -= adjustment1 / 2;
    }

    return {
        player1Utr: Math.max(player1.utr, 0),
        player2Utr: Math.max(player2.utr, 0),
    };
};

module.exports = calculateUtr;
