import React from 'react';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu'; // Import ProfileMenu

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>MyYouTubeClone</h1>
            </div>
            
            <div className="navbar-search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="navbar-links">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">User Profile</Link>
                <ProfileMenu /> {/* Dodaj ProfileMenu */}
            </div>
        </nav>
    );
};

export default Navbar;
