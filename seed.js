const mongoose = require('mongoose');
const Hall = require('./models/hall');
const Session = require('./models/session');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/cinema', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Hall.deleteMany({});
        await Session.deleteMany({});
        await User.deleteMany({});

        // Create a sample hall
        const hall = new Hall({
            name: 'Main Hall',
            seatLayout: [
                ['A1', 'A2', 'A3', 'A4'],
                ['B1', 'B2', 'B3', 'B4'],
                ['C1', 'C2', 'C3', 'C4'],
            ],
        });
        await hall.save();

        // Create a sample session
        const session = new Session({
            hallId: hall._id,
            showtime: new Date(),
            seats: [
                {seatNumber: 'A1', reserved: false, version: 0},
                {seatNumber: 'A2', reserved: false, version: 0},
                {seatNumber: 'A3', reserved: false, version: 0},
                {seatNumber: 'A4', reserved: false, version: 0},
                {seatNumber: 'B1', reserved: false, version: 0},
                {seatNumber: 'B2', reserved: false, version: 0},
                {seatNumber: 'B3', reserved: false, version: 0},
                {seatNumber: 'B4', reserved: false, version: 0},
                {seatNumber: 'C1', reserved: false, version: 0},
                {seatNumber: 'C2', reserved: false, version: 0},
                {seatNumber: 'C3', reserved: false, version: 0},
                {seatNumber: 'C4', reserved: false, version: 0},
            ],
        });
        await session.save();

        console.log('Database seeded successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error seeding database:', err);
        mongoose.connection.close();
    }
};

seedDatabase();