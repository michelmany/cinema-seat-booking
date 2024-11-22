const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./config/mongo'); // Establishes MongoDB connection

const sessionRoutes = require('./routes/sessionRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const metricsRoutes = require('./routes/metricsRoutes');

const path = require('path');

const app = express();

// Allow requests from your React frontend
app.use(cors({
    origin: 'http://localhost:3001',
}));

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/sessions', sessionRoutes);
app.use('/reservations', reservationRoutes);
app.use('/metrics', metricsRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Serve React Static Files
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error Handling
app.use((req, res, next) => {
    res.status(404).json({error: 'Route not found'});
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Something went wrong!'});
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));