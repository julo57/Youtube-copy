import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = ({ toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const renderMenuItems = () => {
        if (location.pathname === '/Settings') {
            return (
                <ul>
                    <li>Konto</li>
                    <li>Prędkość odtwarzania</li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li>Home</li>
                    <li>Trending</li>
                    <li>Subscriptions</li>
                    <li>Library</li>
                    <li>History</li>
                </ul>
            );
        }
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                &#9776;
            </button>
            <div className="sidebar-content">
                {renderMenuItems()}
                <button className="toggle-theme-button" onClick={toggleDarkMode}>
                    Toggle Theme
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
