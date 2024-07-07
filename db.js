const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/student';

// Set up MongoDB connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get default connection
// Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;

// Define event listener for successful connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

// Define event listener for connection errors
db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
});

// Define event listener for disconnection
db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

// Export database connection
module.exports = db;
