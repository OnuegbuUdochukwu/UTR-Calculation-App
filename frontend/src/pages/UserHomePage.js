import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserHomePage.css';

const UserHomePage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/'); // Redirect to login if no token
                }

                const response = await axios.get('/api/player/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(response.data);
            } catch (error) {
                console.error(error);
                navigate('/'); // Redirect to login if fetching fails
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="user-home-container">
            <div className="user-profile">
                <h2>Player Profile</h2>
                {userData ? (
                    <>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                        <p>UTR Rating: {userData.utr}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <div className="user-actions">
                <h2>Quick Actions</h2>
                <button onClick={() => navigate('/match-history')}>View Match History</button>
                <button onClick={() => navigate('/leaderboard')}>View Leaderboard</button>
            </div>
        </div>
    );
};

export default UserHomePage;
