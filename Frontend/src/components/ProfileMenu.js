import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/ProfileMenu.css';

const ProfileMenu = () => {
    const { user, logout,email } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const menuRef = useRef(null);
    const history = useHistory();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setShowLogoutModal(false); // Close the modal
        history.push('/login');
    };

    return (
        <div className="profile-menu-container" ref={menuRef}>
            <div className="profile-icon" onClick={toggleMenu}>
                <span>Profile</span>
            </div>
            {isOpen && (
                <div className="profile-menu">
                    <div className="profile-menu-header">
                        <div className="profile-info">
                            <h4>{user ? user.username : 'Guest'}</h4>
                            <p>{user ? `@${user.email}` : '@guest'}</p>
                        </div>
                    </div>
                    <div className="profile-menu-links">
                        <Link to="/profile">Wyświetl swój kanał</Link>
                        <Link to="/Settings">Ustawienia</Link>
                        
                        {user && <button onClick={() => setShowLogoutModal(true)}>Wyloguj się</button>}
                    </div>
                </div>
            )}
            {showLogoutModal && (
                <div className="logout-modal">
                    <div className="logout-modal-content">
                        <p>Czy na pewno chcesz się wylogować?</p>
                        <button onClick={handleLogout}>Tak</button>
                        <button onClick={() => setShowLogoutModal(false)}>Nie</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
