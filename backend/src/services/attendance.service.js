const Attendance = require('../models/Attendance');

const markAttendance = async (userId, attendanceData) => {
    const { date, status } = attendanceData;

    if (!date || !status) {
        throw new Error('Please provide all required fields: date, status');
    }

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (attendanceDate > today) {
        throw new Error('Cannot mark attendance for future dates');
    }

    const existingAttendance = await Attendance.findOne({
        userId,
        date: attendanceDate
    });

    if (existingAttendance) {
        throw new Error('Attendance already marked for this day');
    }

    const attendance = await Attendance.create({
        userId,
        date: attendanceDate,
        status
    });

    return attendance;
};

const getMyAttendance = async (userId) => {
    return await Attendance.find({ userId }).sort({ date: -1 });
};

const getAllAttendance = async (filters) => {
    const query = {};
    
    if (filters.date) {
        const date = new Date(filters.date);
        date.setHours(0, 0, 0, 0);
        query.date = date;
    } else if (filters.startDate || filters.endDate) {
        query.date = {};
        if (filters.startDate) {
            const start = new Date(filters.startDate);
            start.setHours(0, 0, 0, 0);
            query.date.$gte = start;
        }
        if (filters.endDate) {
            const end = new Date(filters.endDate);
            end.setHours(23, 59, 59, 999);
            query.date.$lte = end;
        }
    }

    if (filters.userId) {
        query.userId = filters.userId;
    }

    return await Attendance.find(query).populate('userId', 'name email role').sort({ date: -1 });
};

module.exports = {
    markAttendance,
    getMyAttendance,
    getAllAttendance
};
