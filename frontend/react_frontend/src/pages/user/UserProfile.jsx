import React, { useEffect } from 'react';
import useUserStore from './store/useUserStore';

function UserProfile() {
    const { user, loading, error, fetchUser } = useUserStore();

    useEffect(() => {
        fetchUser(); // Bileşen yüklendiğinde kullanıcıyı çek
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>No user data</p>
            )}
        </div>
    );
}

export default UserProfile;
