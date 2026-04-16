import { useState, useCallback } from 'react';
import api from '../services/api';

export const useAttendance = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const markAttendance = async (data) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/attendance/mark', data);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to mark attendance');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getMyAttendance = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/attendance/my?${params}`);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch attendance');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllAttendance = useCallback(async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams(filters).toString();
            const response = await api.get(`/admin/attendance?${params}`);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch all attendance');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, markAttendance, getMyAttendance, getAllAttendance };
};
