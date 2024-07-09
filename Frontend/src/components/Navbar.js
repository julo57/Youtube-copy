import React from 'react';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h1>MyYouTubeClone</h1>
            </div>
            <div className="navbar-search">
                <input type="text" placeholder="Search..." />
            </div>
        </nav>
    );
};

export default Navbar;
