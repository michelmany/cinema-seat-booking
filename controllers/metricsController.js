const Session = require('../models/session');
const Reservation = require('../models/reservation');
const User = require('../models/user');

// Mock in-memory storage for conflict tracking (replace with a database in production)
let totalReservationAttempts = 0;
let conflictCount = 0;
let totalProcessingTime = 0;

exports.incrementReservationAttempt = () => {
    totalReservationAttempts++;
};

exports.incrementConflictCount = () => {
    conflictCount++;
};

exports.trackProcessingTime = (time) => {
    totalProcessingTime += time;
};

exports.getMetrics = async (req, res) => {
    try {
        const totalSessions = await Session.countDocuments();
        const totalReservations = await Reservation.countDocuments();
        const totalUsers = await User.countDocuments();

        const successfulReservations = totalReservations; // Assume all saved reservations are successful
        const successfulRate = totalReservationAttempts
            ? (successfulReservations / totalReservationAttempts) * 100
            : 100;

        const averageLatency = totalReservationAttempts
            ? totalProcessingTime / totalReservationAttempts
            : 0;

        const conflictRate = totalReservationAttempts
            ? (conflictCount / totalReservationAttempts) * 100
            : 0;

        const activeSessions = await Session.countDocuments({showtime: {$gt: new Date()}});

        res.json({
            totalSessions,
            totalReservations,
            totalUsers,
            successfulRate,
            averageLatency,
            conflictRate,
            activeSessions,
        });
    } catch (err) {
        console.error('Error fetching metrics:', err);
        res.status(500).json({error: 'Failed to fetch metrics'});
    }
};