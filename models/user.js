const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    reservationHistory: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
});

module.exports = mongoose.model('User', userSchema);