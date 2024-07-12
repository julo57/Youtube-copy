import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import '../css/Sidebar.css';

const Sidebar = ({ toggleDarkMode }) => {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();
    const history = useHistory();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleNavigation = (path) => {
        history.push(path);
    };

    const renderMenuItems = () => {
        if (location.pathname === '/Settings') {
            return (
                <ul>
                    <li onClick={() => handleNavigation('/Settings/Account')}>Konto</li>
                    <li onClick={() => handleNavigation('/Settings/PlaybackSpeed')}>Prędkość odtwarzania</li>
                </ul>
            );
        } else {
            return (
                <ul>
                    <li onClick={() => handleNavigation('/')}>Home</li>
                    <li onClick={() => handleNavigation('/Trending')}>Trending</li>
                    <li onClick={() => handleNavigation('/Subscriptions')}>Subscriptions</li>
                    <li onClick={() => handleNavigation('/Library')}>Library</li>
                    <li onClick={() => handleNavigation('/History')}>History</li>
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
