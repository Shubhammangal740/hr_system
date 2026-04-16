const express = require('express');
const router = express.Router();
const { 
    markAttendance, 
    getMyAttendance, 
    getAllAttendance 
} = require('../controllers/attendance.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.post('/mark', protect, markAttendance);
router.get('/my', protect, getMyAttendance);
router.get('/all', protect, authorize('admin'), getAllAttendance);

module.exports = router;
