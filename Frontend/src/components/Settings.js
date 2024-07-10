import React, { useState } from 'react';


const Settings = () => {
    const [selectedOption, setSelectedOption] = useState('account');

    const renderContent = () => {
        switch (selectedOption) {
            case 'playbackSpeed':
                return <PlaybackSpeedSettings />;
            case 'account':
                return <AccountSettings />;
            default:
                return <AccountSettings />;
        }
    };

    return (
        <div className="settings-container">
            <div className="settings-sidebar">
                <ul>
                    <li
                        className={selectedOption === 'playbackSpeed' ? 'active' : ''}
                        onClick={() => setSelectedOption('playbackSpeed')}
                    >
                        Prędkość odtwarzania
                    </li>
                    <li
                        className={selectedOption === 'account' ? 'active' : ''}
                        onClick={() => setSelectedOption('account')}
                    >
                        Konto
                    </li>
                </ul>
            </div>
            <div className="settings-content">
                {renderContent()}
            </div>
        </div>
    );
};

const PlaybackSpeedSettings = () => {
    return (
        <div>
            <h2>Prędkość odtwarzania</h2>
            <p>Tutaj możesz ustawić preferowaną prędkość odtwarzania.</p>
            {/* Dodaj tutaj odpowiednie kontrolki dla prędkości odtwarzania */}
        </div>
    );
};

const AccountSettings = () => {
    return (
        <div>
            <h2>Konto</h2>
            <p>Tutaj możesz zarządzać ustawieniami konta.</p>
            {/* Dodaj tutaj odpowiednie kontrolki dla ustawień konta */}
        </div>
    );
};

export default Settings;
