import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MatchHistoryPage.css';

const MatchHistoryPage = () => {
    const [matches, setMatches] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatchHistory = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/'); // Redirect to login if no token
                }

                const response = await axios.get('/api/player/me/match-history', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setMatches(response.data.matches);
            } catch (err) {
                console.error(err);
                setError('Failed to load match history.');
            }
        };

        fetchMatchHistory();
    }, [navigate]);

    return (
        <div className="match-history-container">
            <h2>Match History</h2>
            {error && <p className="error-message">{error}</p>}
            {matches.length > 0 ? (
                <table className="match-history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Opponent</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => (
                            <tr key={index}>
                                <td>{new Date(match.date).toLocaleDateString()}</td>
                                <td>{match.opponent}</td>
                                <td>{match.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No match history available.</p>
            )}
        </div>
    );
};

export default MatchHistoryPage;
