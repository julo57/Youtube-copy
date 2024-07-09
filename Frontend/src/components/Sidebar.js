import React, { useState } from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                &#9776;
            </button>
            <div className="sidebar-content">
                <ul>
                    <li>Home</li>
                    <li>Trending</li>
                    <li>Subscriptions</li>
                    <li>Library</li>
                    <li>History</li>
                </ul>
                <button className="toggle-theme-button" onClick={toggleDarkMode}>
                    Toggle Theme
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
