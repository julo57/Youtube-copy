import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import '../css/Channel.css';

const Channel = () => {
    const { user } = useAuth();
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/videos?username=${user.username}`);
                setVideos(response.data);
            } catch (error) {
                if (error.response) {
                    console.error('Response error:', error.response.data);
                    console.error('Response status:', error.response.status);
                    console.error('Response headers:', error.response.headers);
                    setError(`Server responded with status ${error.response.status}: ${error.response.data}`);
                } else if (error.request) {
                    console.error('Request error:', error.request);
                    setError('No response received from the server. Please check your network connection.');
                } else {
                    console.error('Error:', error.message);
                    setError(`Error in setting up the request: ${error.message}`);
                }
                console.error('Error config:', error.config);
            }
        };

        if (user) {
            fetchVideos();
        }
    }, [user]);

    return (
        <div className="channel-container">
            <h1>{user ? `${user.username}'s Channel` : 'Channel'}</h1>
            {error && <div className="error">{error}</div>}
            <div className="videos-container">
                {videos.map((video) => (
                    <div className="video-card" key={video.id}>
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                        <video width="320" height="240" controls>
                            <source src={`http://localhost:8080${video.url}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channel;
