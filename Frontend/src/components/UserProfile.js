import React from 'react';
import { useAuth } from '../AuthContext';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>User Profile</h1>
            {user ? (
                <p>Welcome, {user.username}!</p>
            ) : (
                <p>Please log in to see your profile.</p>
            )}
        </div>
    );
};

export default UserProfile;
