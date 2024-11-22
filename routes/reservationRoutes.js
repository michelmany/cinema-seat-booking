const express = require('express');
const {reserveSeats} = require('../controllers/reservationController');
const router = express.Router();

router.post('/:id/seats/reserve', reserveSeats);

module.exports = router;