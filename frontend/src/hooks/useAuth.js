import { useState, useCallback } from 'react';
import api from '../services/api';
import { useAuth as useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useAuthContext();

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/auth/profile');
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch profile');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [setUser]);

    return { loading, error, fetchProfile, getProfile: fetchProfile };
};
