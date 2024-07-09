import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Redirect } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
    const { user, login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [setRedirectToProfile] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        setRedirectToProfile(true);
    };

    if (user) {
        return <Redirect to="/Profile" />;
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
