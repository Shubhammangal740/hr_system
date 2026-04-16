const adminService = require('../services/admin.service');
const leaveService = require('../services/leave.service');
const attendanceService = require('../services/attendance.service');

const getUsers = async (req, res, next) => {
    try {
        const users = await adminService.getAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

const getLeaves = async (req, res, next) => {
    try {
        const leaves = await adminService.getAllLeaves();
        res.json(leaves);
    } catch (error) {
        next(error);
    }
};

const getAttendance = async (req, res, next) => {
    try {
        const records = await attendanceService.getAllAttendance(req.query);
        res.json(records);
    } catch (error) {
        next(error);
    }
};

const updateLeaveStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const leave = await leaveService.updateLeaveStatus(req.params.id, status);
        res.json(leave);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

module.exports = {
    getUsers,
    getLeaves,
    getAttendance,
    updateLeaveStatus
};
