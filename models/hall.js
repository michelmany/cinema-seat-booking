const mongoose = require('mongoose');

const hallSchema = new mongoose.Schema({
    name: String,
    seatLayout: [[String]],
});

module.exports = mongoose.model('Hall', hallSchema);