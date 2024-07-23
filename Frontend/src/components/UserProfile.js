import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import '../css/UserProfile.css';

const UserProfile = () => {
    const { user } = useAuth();
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', videoFile);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('username', user.username);

        try {
            const response = await axios.post('http://localhost:8080/api/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload successful:', response.data);
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

    const handleGoToChannel = () => {
        history.push('/channel');
    };

    const handleGoToSubscriptions = () => {
        history.push('/subscriptions');
    };

    return (
        <div className="user-profile-container">
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleUpload}>
                        <div className="form-group">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="video">Video File:</label>
                            <input
                                type="file"
                                id="video"
                                accept="video/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit" className="upload-button">Upload Video</button>
                    </form>
                    <button onClick={handleGoToChannel} className="channel-button">Go to My Channel</button>
                    <button onClick={handleGoToSubscriptions} className="subscriptions-button">View Subscriptions</button>
                </div>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
