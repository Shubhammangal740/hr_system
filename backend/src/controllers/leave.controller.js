const leaveService = require('../services/leave.service');

const applyLeave = async (req, res, next) => {
    try {
        const leave = await leaveService.applyLeave(req.user._id, req.body);
        res.status(201).json(leave);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const getMyLeaves = async (req, res, next) => {
    try {
        const leaves = await leaveService.getMyLeaves(req.user._id);
        res.json(leaves);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const updateLeave = async (req, res, next) => {
    try {
        const leave = await leaveService.updateLeave(req.params.id, req.user._id, req.body);
        res.json(leave);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const deleteLeave = async (req, res, next) => {
    try {
        const response = await leaveService.deleteLeave(req.params.id, req.user._id);
        res.json(response);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const cancelLeave = async (req, res, next) => {
    try {
        const leave = await leaveService.cancelLeave(req.params.id, req.user._id);
        res.json(leave);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

module.exports = {
    applyLeave,
    getMyLeaves,
    updateLeave,
    deleteLeave,
    cancelLeave
};
