const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    sessionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    userId: {type: String, ref: 'User'},
    seats: [String],
});

module.exports = mongoose.model('Reservation', reservationSchema);