import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password
            });
            console.log('Registration successful:', response.data);
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    return (
        <div id="register-form" className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="reg-username">Username</label>
                <input type="text" id="reg-username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <label htmlFor="reg-password">Password</label>
                <input type="password" id="reg-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
