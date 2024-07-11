import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';

const UserProfile = () => {
    const { user } = useAuth();
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', videoFile); // ensure 'file' matches the parameter in the backend
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
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Response error:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Server responded with status ${error.response.status}: ${error.response.data}`);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Request error:', error.request);
                setError('No response received from the server. Please check your network connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
                setError(`Error in setting up the request: ${error.message}`);
            }
            console.error('Error config:', error.config);
        }
    };

    return (
        <div>
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <p>Welcome, {user.username}!</p>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <form onSubmit={handleUpload}>
                        <div>
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="video">Video File:</label>
                            <input
                                type="file"
                                id="video"
                                accept="video/*"
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <button type="submit">Upload Video</button>
                    </form>
                </div>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
