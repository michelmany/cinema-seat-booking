const Session = require('../models/session');
const Hall = require('../models/hall');

exports.getSessions = async (req, res) => {
    const sessions = await Session.find().populate('hallId');
    res.json(sessions);
};

exports.getSeats = async (req, res) => {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({error: 'Session not found'});
    res.json(session.seats);
};