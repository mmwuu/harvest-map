// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Shop from './models/shop_schema.js';

// Axios for http requests to map api
import axios from 'axios';

import locations from './utils/locations.js';


// Load environment variables
dotenv.config();


// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing in requests


// MongoDB connection using MongoClient
const uri = MONGODB_URI;

mongoose.connect(uri, {
    dbName: 'Farm_Info' // database name
})
    .then(() => console.log("Connected to MongoDB using Mongoose"))
    .catch(err => console.error("MongoDB connection error:", err));


// Endpoint to retrieve farm shops by region
app.get('/api/farmshops/byRegion', async (req, res) => {
    const { region } = req.query;

    if (!region) {
        return res.status(400).json({ error: 'Region is required' });
    }

    try {
        // Query the database for shops in the given region
        const shops = await Shop.find({ areaOfInterest: region }).populate('productIDList');

        if (shops.length === 0) {
            return res.status(404).json({ error: 'No shops found in the specified region' });
        }

        res.json({ region, shops });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/farmshops/byProduct', async (req, res) => {
    const { productName } = req.query;

    if (!productName) {
        return res.status(400).json({ error: 'Product name is required' });
    }

    try {
        // Step 1: Find products that match the name (case-insensitive)
        const matchingProducts = await Products.find({
            productName: { $regex: new RegExp(productName, 'i') }
        });

        if (matchingProducts.length === 0) {
            return res.status(404).json({ error: 'No products found with that name' });
        }

        // Step 2: Get the productIDs from the matching products
        const productIDs = matchingProducts.map(p => p.productID);

        // Step 3: Find shops that list any of these product IDs
        const shops = await Shop.find({ productIDList: { $in: productIDs } });

        if (shops.length === 0) {
            return res.status(404).json({ error: 'No shops found selling that product' });
        }

        res.json({ productName, shops });
    } catch (error) {
        console.error('Error querying shops by product name:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Geocoding endpoint to convert address to coordinates
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


// Endpoint to add the area of interest to a shop when we get its address from the request body
app.post('/api/farmshops/areaOfInterest', async (req, res) => {
    const { shopID, coordinates } = req.body;

    if (!shopID || !coordinates || !coordinates.latitude || !coordinates.longitude) {
        return res.status(400).json({ error: 'shopID and valid coordinates are required' });
    }

    // Find the closest region
    const { latitude, longitude } = coordinates;
    let closestRegion = 'Other';
    let minDistance = Infinity;

    for (const location of locations) {
        const distance = Math.sqrt(
            Math.pow(location.latitude - latitude, 2) + Math.pow(location.longitude - longitude, 2)
        );

        if (distance < minDistance) {
            minDistance = distance;
            closestRegion = location.region;
        }
    }
    // Check if the closest region is within 70 km (0.7 degrees)
    if (minDistance > 0.7) {
        closestRegion = 'Other';
    }

    try {
        const updatedShop = await Shop.findOneAndUpdate(
            { shopID },
            { areaOfInterest: closestRegion },
            { new: true }
        );

        if (!updatedShop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.json({ message: 'Area of interest updated successfully', shop: updatedShop });
    } catch (error) {
        console.error('Error updating area of interest:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Fallback route
app.use((req, res) => {
    res.status(404).send('Route not found');
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




// Import routes
// Example: const farmRoutes = require('./routes/farms');
// app.use('/api/farms', farmRoutes);


