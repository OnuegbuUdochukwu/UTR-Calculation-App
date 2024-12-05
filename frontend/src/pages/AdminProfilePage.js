import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminProfilePage.css';

const AdminProfilePage = () => {
    const [players, setPlayers] = useState([]);
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

    return (
        <div className="admin-profile-container">
            <h2>All Players</h2>
            {error && <p className="error-message">{error}</p>}
            {players.length > 0 ? (
                <table className="players-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>UTR Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player, index) => (
                            <tr key={index}>
                                <td>{player.name}</td>
                                <td>{player.email}</td>
                                <td>{player.utr}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No players found.</p>
            )}
        </div>
    );
};

export default AdminProfilePage;
