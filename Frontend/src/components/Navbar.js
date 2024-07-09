import React from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>MyYouTubeClone</h1>
            </div>
            
            <div className="navbar-search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="navbar-links"> {/* Upewnij się, że klasa jest poprawna */}
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">User Profile</Link>
            </div>
        </nav>
    );
};

export default Navbar;
