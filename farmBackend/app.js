// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Product from './models/product_schema.js';
import Shop from './models/shop_schema.js';

// Axios for http requests to map api
import axios from 'axios';



// Load environment variables
dotenv.config();


// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing in requests


// MongoDB connection using MongoClient
const uri = "mongodb+srv://" +
    "farmadmin:farmersunite@cluster0.jiatbwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(uri, {
    dbName: 'Farm_info' // Specify the database name if needed
})
    .then(() => console.log("Connected to MongoDB using Mongoose"))
    .catch(err => console.error("MongoDB connection error:", err));



// Geoc



// Example route NEED TO USE SCHEMAS HERE
app.post('/', (req, res) => {
    res.send('Welcome to the Harvest API!');
});

// Geocoding API endpoint
app.post('/api/geocode', async (req, res) => {
    const { address } = req.body;

    if (!address) {
        return res.status(400).json({ error: 'Address is required' });
    }

    try {
        const apiKey = process.env.GEOCODING_API_KEY; // Store your API key in .env
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address,
                key: apiKey
            }
        });

        if (response.data.status === 'OK') {
            const { lat, lng } = response.data.results[0].geometry.location;
            res.json({ latitude: lat, longitude: lng });
        } else {
            res.status(400).json({ error: 'Unable to geocode address' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Import routes
// Example: const farmRoutes = require('./routes/farms');
// app.use('/api/farms', farmRoutes);


