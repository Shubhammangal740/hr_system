import { useState, useCallback } from 'react';
import api from '../services/api';

export const useLeave = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const applyLeave = async (leaveData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/leaves', leaveData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to apply for leave');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getMyLeaves = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/leaves/my');
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch leaves');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateLeaveStatus = async (id, status) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.patch(`/admin/leaves/${id}/status`, { status });
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update leave status');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const getAllLeaves = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.get('/admin/leaves');
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch all leaves');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateLeave = async (id, leaveData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.put(`/leaves/${id}`, leaveData);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update leave');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteLeave = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.delete(`/leaves/${id}`);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete leave');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const cancelLeave = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await api.patch(`/leaves/${id}/cancel`);
            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to cancel leave');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { 
        loading, 
        error, 
        applyLeave, 
        getMyLeaves, 
        updateLeaveStatus, 
        getAllLeaves,
        updateLeave,
        deleteLeave,
        cancelLeave
    };
};
