const express = require('express');
const router = express.Router();
const { 
    applyLeave, 
    getMyLeaves, 
    updateLeave, 
    deleteLeave, 
    cancelLeave 
} = require('../controllers/leave.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/', protect, applyLeave);
router.get('/my', protect, getMyLeaves);
router.put('/:id', protect, updateLeave);
router.delete('/:id', protect, deleteLeave);
router.patch('/:id/cancel', protect, cancelLeave);

module.exports = router;
