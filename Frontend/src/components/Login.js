import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Redirect } from 'react-router-dom';

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </div>
                <div>
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
