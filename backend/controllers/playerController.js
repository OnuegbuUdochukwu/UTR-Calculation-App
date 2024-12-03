const User = require('../models/User');

exports.getMatchHistory = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ matches: user.matches });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching match history', error: error.message });
    }
};
