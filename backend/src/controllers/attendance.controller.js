const attendanceService = require('../services/attendance.service');

const markAttendance = async (req, res, next) => {
    try {
        const attendance = await attendanceService.markAttendance(req.user._id, req.body);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const getMyAttendance = async (req, res, next) => {
    try {
        const records = await attendanceService.getMyAttendance(req.user._id);
        res.json(records);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

const getAllAttendance = async (req, res, next) => {
    try {
        const records = await attendanceService.getAllAttendance(req.query);
        res.json(records);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

module.exports = {
    markAttendance,
    getMyAttendance,
    getAllAttendance
};
