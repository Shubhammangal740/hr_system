const calculateLeaveDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const diffTime = end - start;
    if (diffTime < 0) {
        throw new Error('End date cannot be before start date');
    }
    
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
};

module.exports = { calculateLeaveDays };
