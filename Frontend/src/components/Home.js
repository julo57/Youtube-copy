import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import axios from 'axios';
import '../css/Home.css'; // Make sure to create and import Home.css for styling

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/videos/all');
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

        fetchVideos();
    }, []);

    const getRandomVideos = (videos, count) => {
        const shuffled = videos.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const randomVideos = getRandomVideos(videos, 5); // Display 5 random videos

    return (
        <div className="home-container">
            <h1>Home Page</h1>
            {error && <div className="error">{error}</div>}
            <div className="videos-container">
                {randomVideos.map((video) => (
                    <div className="video-card" key={video.id}>
                        <h2>{video.title}</h2>
                        <p>{video.description}</p>
                        <Link to={`/watch/${video.id}`}>
                            <video width="320" height="240" controls>
                                <source src={`http://localhost:8080${video.url}`} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
