import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const { user } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password
            });
            console.log('Registration successful:', response.data);
            setRedirectToProfile(true); // Ustawia przekierowanie po udanej rejestracji
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    if (redirectToProfile || user) {
        return <Redirect to="/Profile" />;
    }

    return (
        <div id="register-form" className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <label htmlFor="reg-username">Username</label>
                <input 
                    type="text" 
                    id="reg-username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label htmlFor="reg-password">Password</label>
                <input 
                    type="password" 
                    id="reg-password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
