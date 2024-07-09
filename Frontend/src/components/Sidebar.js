import React, { useState } from 'react';
import '../css/Sidebar.css';

const Sidebar = () => {
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
                    <li><span>Home</span></li>
                    <li><span>Trending</span></li>
                    <li><span>Subscriptions</span></li>
                    <li><span>Library</span></li>
                    <li><span>History</span></li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
