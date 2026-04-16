const Leave = require('../models/Leave');
const User = require('../models/User');
const { calculateLeaveDays } = require('../utils/date');

const applyLeave = async (userId, leaveData) => {
    const { leaveType, startDate, endDate, reason } = leaveData;

    if (!leaveType || !startDate || !endDate) {
        throw new Error('Please provide all required fields: leaveType, startDate, endDate');
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);

    const overlappingLeave = await Leave.findOne({
        userId,
        status: { $ne: 'Rejected' },
        $or: [
            { startDate: { $lte: end }, endDate: { $gte: start } }
        ]
    });

    if (overlappingLeave) {
        throw new Error('You already have a leave request for these dates');
    }

    const totalDays = calculateLeaveDays(startDate, endDate);

    const leave = await Leave.create({
        userId,
        leaveType,
        startDate: start,
        endDate: end,
        totalDays,
        reason
    });

    return leave;
};

const getMyLeaves = async (userId) => {
    return await Leave.find({ userId }).sort({ createdAt: -1 });
};

const updateLeave = async (leaveId, userId, leaveData) => {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
        throw new Error('Leave request not found');
    }

    if (leave.userId.toString() !== userId.toString()) {
        throw new Error('Not authorized to update this leave');
    }

    if (leave.status !== 'Pending') {
        throw new Error('Cannot update leave after it has been processed');
    }

    const { leaveType, startDate, endDate, reason } = leaveData;
    
    if (startDate || endDate) {
        const newStartDate = startDate || leave.startDate;
        const newEndDate = endDate || leave.endDate;
        leave.totalDays = calculateLeaveDays(newStartDate, newEndDate);
    }

    leave.leaveType = leaveType || leave.leaveType;
    leave.startDate = startDate || leave.startDate;
    leave.endDate = endDate || leave.endDate;
    leave.reason = reason || leave.reason;

    return await leave.save();
};

const deleteLeave = async (leaveId, userId) => {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
        throw new Error('Leave request not found');
    }

    if (leave.userId.toString() !== userId.toString()) {
        throw new Error('Not authorized to delete this leave');
    }

    if (leave.status !== 'Pending') {
        throw new Error('Cannot delete leave after it has been processed');
    }

    await leave.deleteOne();
    return { message: 'Leave request removed' };
};

const updateLeaveStatus = async (leaveId, status) => {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
        throw new Error('Leave request not found');
    }

    if (leave.status === status) {
        return leave;
    }

    const user = await User.findById(leave.userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (leave.status === 'Approved') {
        user.leaveBalance += leave.totalDays;
    }

    if (status === 'Approved') {
        if (user.leaveBalance < leave.totalDays) {
            throw new Error('Insufficient leave balance');
        }
        user.leaveBalance -= leave.totalDays;
    }

    await user.save();
    leave.status = status;
    return await leave.save();
};

const cancelLeave = async (leaveId, userId) => {
    const leave = await Leave.findById(leaveId);

    if (!leave) {
        throw new Error('Leave request not found');
    }

    if (leave.userId.toString() !== userId.toString()) {
        throw new Error('Not authorized to cancel this leave');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(leave.startDate) < today) {
        throw new Error('Cannot cancel leave that has already started or is in the past');
    }

    if (leave.status === 'Approved') {
        const user = await User.findById(userId);
        user.leaveBalance += leave.totalDays;
        await user.save();
    }

    leave.status = 'Cancelled';
    return await leave.save();
};

module.exports = {
    applyLeave,
    getMyLeaves,
    updateLeave,
    deleteLeave,
    updateLeaveStatus,
    cancelLeave
};
