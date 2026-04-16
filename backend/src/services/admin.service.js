const User = require('../models/User');
const Leave = require('../models/Leave');
const Attendance = require('../models/Attendance');

const getAllUsers = async () => {
    return await User.find({}).select('-password').lean();
};

const getAllLeaves = async () => {
    return await Leave.find({}).populate('userId', 'name email role').sort({ createdAt: -1 }).lean();
};

module.exports = {
    getAllUsers,
    getAllLeaves
};
