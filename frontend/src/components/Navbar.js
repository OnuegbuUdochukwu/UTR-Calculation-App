import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // Retrieve the user role from localStorage
    const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is logged in

    const handleLogout = () => {
        localStorage.clear(); // Clear all stored data
        navigate('/'); // Redirect to login
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>Tennis UTR</h1>
            </div>
            <ul className="navbar-links">
                {!isAuthenticated ? (
                    <>
                        <li><Link to="/">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                ) : (
                    <>
                        {role === 'admin' && (
                            <>
                                <li><Link to="/admin-home">Admin Home</Link></li>
                                <li><Link to="/add-match">Add Match</Link></li>
                                <li><Link to="/admin-profile">Admin Profile</Link></li>
                            </>
                        )}
                        {role === 'player' && (
                            <>
                                <li><Link to="/user-home">Home</Link></li>
                                <li><Link to="/match-history">Match History</Link></li>
                                <li><Link to="/leaderboard">Leaderboard</Link></li>
                            </>
                        )}
                        <li>
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
