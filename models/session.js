const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    hallId: {type: mongoose.Schema.Types.ObjectId, ref: 'Hall'},
    showtime: Date,
    seats: [{
        seatNumber: String,
        reserved: Boolean,
        version: Number,
    }],
});

module.exports = mongoose.model('Session', sessionSchema);