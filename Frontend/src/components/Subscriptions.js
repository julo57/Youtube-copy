import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';


const Subscriptions = () => {
    const { user } = useAuth();
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            const fetchSubscriptions = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/users/subscriptions/${user.username}`);
                    setSubscriptions(response.data);
                } catch (error) {
                    console.error('Error fetching subscriptions:', error);
                    setError('Error fetching subscriptions. Please try again later.');
                }
            };

            fetchSubscriptions();
        }
    }, [user]);

    return (
        <div className="subscriptions-container">
            <h1>Subscriptions</h1>
            {error && <div className="error">{error}</div>}
            <ul>
                {subscriptions.map((subscribedUser) => (
                    <li key={subscribedUser.id}>
                        <Link to={`/profile/${subscribedUser.username}`}>{subscribedUser.username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Subscriptions;
