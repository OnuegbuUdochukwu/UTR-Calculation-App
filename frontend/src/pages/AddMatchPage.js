import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddMatchPage.css';

const AddMatchPage = () => {
    const [players, setPlayers] = useState([]);
    const [player1Id, setPlayer1Id] = useState('');
    const [player2Id, setPlayer2Id] = useState('');
    const [score, setScore] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/'); // Redirect to login if no token
                }

                const response = await axios.get('/api/admin/all-users', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setPlayers(response.data.users);
            } catch (err) {
                console.error(err);
                setError('Failed to load players.');
            }
        };

        fetchPlayers();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!player1Id || !player2Id || !score) {
            setError('All fields are required.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                '/api/admin/upload-score',
                { player1Id, player2Id, score },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage('Match score added successfully!');
            setPlayer1Id('');
            setPlayer2Id('');
            setScore('');
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to add match score.');
        }
    };

    return (
        <div className="add-match-container">
            <h2>Add Match Score</h2>
            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Player 1</label>
                    <select value={player1Id} onChange={(e) => setPlayer1Id(e.target.value)} required>
                        <option value="">Select Player 1</option>
                        {players.map((player) => (
                            <option key={player._id} value={player._id}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Player 2</label>
                    <select value={player2Id} onChange={(e) => setPlayer2Id(e.target.value)} required>
                        <option value="">Select Player 2</option>
                        {players.map((player) => (
                            <option key={player._id} value={player._id}>
                                {player.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Score</label>
                    <input
                        type="text"
                        placeholder="e.g., 6-3, 7-5"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Match</button>
            </form>
        </div>
    );
};

export default AddMatchPage;
