import React, { useState } from 'react';
import '../css/Settings.css';

const Settings = () => {
    const [selectedOption, setSelectedOption] = useState('account');

    const renderContent = () => {
        switch (selectedOption) {
            case 'playbackSpeed':
                return <PlaybackSpeedSettings />;
            case 'quality':
                return <QualitySettings />;
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
                        className={selectedOption === 'quality' ? 'active' : ''}
                        onClick={() => setSelectedOption('quality')}
                    >
                        Jakość
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
    const [playbackSpeed, setPlaybackSpeed] = useState('1.0');

    return (
        <div>
            <h2>Prędkość odtwarzania</h2>
            <p>Tutaj możesz ustawić preferowaną prędkość odtwarzania.</p>
            <label htmlFor="playbackSpeed">Prędkość:</label>
            <select
                id="playbackSpeed"
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(e.target.value)}
            >
                <option value="0.5">0.5x</option>
                <option value="1.0">1.0x</option>
                <option value="1.5">1.5x</option>
                <option value="2.0">2.0x</option>
            </select>
        </div>
    );
};

const QualitySettings = () => {
    const [quality, setQuality] = useState('1080p');

    return (
        <div>
            <h2>Jakość</h2>
            <p>Tutaj możesz ustawić preferowaną jakość odtwarzania.</p>
            <label htmlFor="quality">Jakość:</label>
            <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
            >
                <option value="144p">144p</option>
                <option value="240p">240p</option>
                <option value="360p">360p</option>
                <option value="480p">480p</option>
                <option value="720p">720p</option>
                <option value="1080p">1080p</option>
            </select>
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
