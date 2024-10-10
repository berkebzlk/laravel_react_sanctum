import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

import axios from '../../axios'

const ProtectedRoute = ({ children }) => {
    const token = useAuthStore((state) => state.token);
    const login = useAuthStore((state) => state.login);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            console.log('token', token)
            if (token) {
                console.log('token var')
                try {
                    const response = await axios.get('/user');

                    console.log('dashboard user', response)

                    login(token, response.data);

                    setIsAuthenticated(true);
                } catch (error) {
                    console.log('error', error)
                    setIsAuthenticated(false);
                }
            }
            setLoading(false);
        };

        fetchUser();
    }, [token, login]);

    if (loading) return <div>Loading...</div>;

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;
