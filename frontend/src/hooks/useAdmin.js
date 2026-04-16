import { useState, useCallback } from 'react';
import api from '../services/api';

export const useAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/admin/users');
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch users');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, getAllUsers };
};
