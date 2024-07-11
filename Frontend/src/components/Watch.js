import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/Watch.css'; // Make sure to create and import Watch.css for styling

const Watch = () => {
    const { id } = useParams();  // Get video ID from URL parameters
    const [video, setVideo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/videos/${id}`);
                setVideo(response.data);
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

        fetchVideo();
    }, [id]);

    return (
        <div className="watch-container">
            {error && <div className="error">{error}</div>}
            {video && (
                <div className="video-details">
                    <h2>{video.title}</h2>
                    <p>{video.description}</p>
                    <video width="640" height="480" controls>
                        <source src={`http://localhost:8080${video.url}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
        </div>
    );
};

export default Watch;
