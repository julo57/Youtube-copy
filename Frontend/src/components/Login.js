import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', {
                username,
                password
            });
            console.log('Login successful:', response.data);
            login(username);
            history.push('/profile');
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    };

    return (
        <div id="login-form" className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
                
            </form>
        </div>
    );
};

export default Login;
