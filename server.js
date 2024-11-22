const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./config/mongo');
const sessionRoutes = require('./routes/sessionRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/sessions', sessionRoutes);
app.use('/reservations', reservationRoutes);

// Serve React static files
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));