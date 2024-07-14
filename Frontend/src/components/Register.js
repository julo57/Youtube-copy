import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/Register.css'; // Importujemy CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    const { user } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        // Additional validation rules can be added here

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password
            });
            console.log('Registration successful:', response.data);
            setRedirectToProfile(true);
        } catch (error) {
            console.error('There was an error registering!', error);
        }
    };

    if (redirectToProfile || user) {
        return <Redirect to="/Login" />;
    }

    return (
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label htmlFor="reg-username">Username</label>
                    <input 
                        type="text" 
                        id="reg-username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="reg-password">Password</label>
                    <input 
                        type="password" 
                        id="reg-password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
