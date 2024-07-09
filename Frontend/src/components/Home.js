import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
                <Link to="/profile">User Profile</Link>
            </nav>
        </div>
    );
};

export default Home;
