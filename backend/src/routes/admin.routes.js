const express = require('express');
const router = express.Router();
const { 
    getUsers, 
    getLeaves, 
    getAttendance, 
    updateLeaveStatus 
} = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(protect);
router.use(authorize('admin'));

router.get('/users', getUsers);
router.get('/leaves', getLeaves);
router.patch('/leaves/:id/status', updateLeaveStatus);
router.get('/attendance', getAttendance);

module.exports = router;
