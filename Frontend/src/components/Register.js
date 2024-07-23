import React, { useState } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import '../css/Register.css'; // Importujemy CSS

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const { user } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                username,
                password,
                email
            });
            console.log('Registration successful:', response.data);
            setRedirectToLogin(true);
        } catch (error) {
            console.error('There was an error registering!', error);
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('There was an error registering!');
            }
        }
    };

    if (redirectToLogin || user) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="form-container">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
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
                    <label htmlFor="reg-email">Email</label>
                    <input 
                        type="email" 
                        id="reg-email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
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
