const Session = require('../models/session');
const Reservation = require('../models/reservation');

exports.reserveSeats = async (req, res) => {
    const {seatNumbers, userId} = req.body;
    const sessionId = req.params.id;

    try {
        const session = await Session.findById(sessionId);
        if (!session) return res.status(404).json({error: 'Session not found'});

        const updatedSeats = session.seats.map(seat => {
            if (seatNumbers.includes(seat.seatNumber)) {
                if (seat.reserved) throw new Error(`Seat ${seat.seatNumber} already reserved`);
                return {...seat, reserved: true, version: seat.version + 1};
            }
            return seat;
        });

        session.seats = updatedSeats;
        await session.save();

        const reservation = new Reservation({sessionId, userId, seats: seatNumbers});
        await reservation.save();

        res.json({message: 'Seats reserved successfully', reservation});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};