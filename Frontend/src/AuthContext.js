import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.get('http://localhost:8080/api/auth/user')
                .then(response => {
                    console.log('Fetched user:', response.data);  // Debug log
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user:', error);
                    localStorage.removeItem('token');
                    setUser(null);
                });
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
            const token = response.data;
            console.log("Received token:", token);  // Debug log
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const userResponse = await axios.get('http://localhost:8080/api/auth/user');
            console.log('Fetched user after login:', userResponse.data);  // Debug log
            setUser(userResponse.data);
        } catch (error) {
            console.error('There was an error logging in!', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
