const express = require('express');
const {getSessions, getSeats} = require('../controllers/sessionController');
const router = express.Router();

router.get('/', getSessions);
router.get('/:id/seats', getSeats);

module.exports = router;