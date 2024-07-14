import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/Login.css'; // Import CSS

const Login = () => {
    const { user, login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Login attempt with username:", username, "and password:", password); // Log data
        try {
            await login(username, password);
            setRedirectToProfile(true);
        } catch (error) {
            setError('There was an error logging in. Please check your credentials.');
            console.error('There was an error logging in!', error);
        }
    };

    if (user || redirectToProfile) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
