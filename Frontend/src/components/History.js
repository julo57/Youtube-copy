import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';
import '../css/History.css';

const History = () => {
    const { user } = useAuth(); // Get the authenticated user
    const [watchedVideos, setWatchedVideos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchWatchedVideos = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/videos/watched/${user.username}`);
                    setWatchedVideos(response.data);
                } catch (error) {
                    setError('Error fetching watched videos.');
                    console.error(error);
                }
            }
        };
        fetchWatchedVideos();
    }, [user]);

    return (
        <div className="history-container">
            {error && <div className="error">{error}</div>}
            {watchedVideos.length > 0 ? (
                <div className="watched-videos-list">
                    {watchedVideos.slice().reverse().map((watchedVideo, index) => (
                        <div key={index} className="watched-video-item">
                            <Link to={`/Watch/${watchedVideo.video.id}`}>
                                <h3>{watchedVideo.video.title}</h3>
                            </Link>
                            <p>Watched at: {new Date(watchedVideo.watchedAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No watched videos yet.</p>
            )}
        </div>
    );
};

export default History;
