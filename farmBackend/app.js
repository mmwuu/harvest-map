// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Farm from './models/farm.js';



// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing in requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/harvest', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Example route (you can replace this with your actual routes)
app.get('/', (req, res) => {
    res.send('Welcome to the Harvest API!');
});

// Import routes
// Example: const farmRoutes = require('./routes/farms');
// app.use('/api/farms', farmRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});