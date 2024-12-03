const User = require('../models/User');
const calculateUtr = require('../util/calculateUtr');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('name utr email');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.addMatch = async (req, res) => {
    const { player1Id, player2Id, score } = req.body;

    try {
        const player1 = await User.findById(player1Id);
        const player2 = await User.findById(player2Id);

        if (!player1 || !player2) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const { player1Utr, player2Utr } = calculateUtr(player1, player2, score);

        player1.utr = player1Utr;
        player2.utr = player2Utr;

        player1.matches.push({ opponent: player2.name, score, date: new Date() });
        player2.matches.push({ opponent: player1.name, score, date: new Date() });

        await player1.save();
        await player2.save();

        res.status(200).json({ message: 'Match scores updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating UTR', error: error.message });
    }
};
