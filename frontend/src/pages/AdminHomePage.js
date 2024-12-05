import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminHomePage.css';

const AdminHomePage = () => {
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/'); // Redirect to login if no token
                }

                const response = await axios.get('/api/admin/all-users', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAdminData(response.data.users);
            } catch (error) {
                console.error(error);
                navigate('/'); // Redirect to login if fetching fails
            }
        };

        fetchAdminData();
    }, [navigate]);

    return (
        <div className="admin-home-container">
            <div className="admin-profile">
                <h2>Admin Profile</h2>
                <p>Name: Admin</p>
                <p>Email: admin@example.com</p>
            </div>
            <div className="admin-actions">
                <h2>Admin Actions</h2>
                <button onClick={() => navigate('/add-match')}>Add Match Scores</button>
                <button onClick={() => navigate('/admin-profile')}>View All Players</button>
            </div>
        </div>
    );
};

export default AdminHomePage;
