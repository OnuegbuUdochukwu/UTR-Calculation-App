import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Navigation bar
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminHomePage from './pages/AdminHomePage';
import UserHomePage from './pages/UserHomePage';
import MatchHistoryPage from './pages/MatchHistoryPage';
import AddMatchPage from './pages/AddMatchPage';
import AdminProfilePage from './pages/AdminProfilePage';
// import './App.css'; // Custom styles for the app

const App = () => {
    return (
        <Router>
            <div>
                <Navbar /> {/* Persistent navigation bar */}
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/admin-home" element={<AdminHomePage />} />
                    <Route path="/user-home" element={<UserHomePage />} />
                    <Route path="/match-history" element={<MatchHistoryPage />} />
                    <Route path="/add-match" element={<AddMatchPage />} />
                    <Route path="/admin-profile" element={<AdminProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
