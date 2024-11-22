const Session = require('../models/session');
const Reservation = require('../models/reservation');

const {
    incrementReservationAttempt,
    incrementConflictCount,
    trackProcessingTime,
} = require('./metricsController');

exports.reserveSeats = async (req, res) => {
    const {seatNumbers, userId} = req.body;
    const sessionId = req.params.id;

    const startTime = Date.now(); // Track processing time
    incrementReservationAttempt(); // Increment reservation attempts

    try {
        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({error: 'Session not found'});

        // Check and update seat status
        const updatedSeats = session.seats.map(seat => {
            if (seatNumbers.includes(seat.seatNumber)) {
                if (seat.reserved) {
                    incrementConflictCount(); // Increment conflict count
                    throw new Error(`Seat ${seat.seatNumber} already reserved`);
                }
                return {...seat, reserved: true, version: seat.version + 1};
            }
            return seat;
        });

        session.seats = updatedSeats;
        await session.save();

        // Create reservation
        const reservation = new Reservation({sessionId, userId, seats: seatNumbers});
        await reservation.save();

        trackProcessingTime(Date.now() - startTime); // Track processing time

        res.json({message: 'Seats reserved successfully', reservation});
    } catch (error) {
        trackProcessingTime(Date.now() - startTime); // Track processing time even if it fails
        console.error('Error reserving seats:', error);
        res.status(400).json({error: error.message});
    }
};