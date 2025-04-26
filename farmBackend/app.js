// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Shop from './models/shop_schema.js';

// Axios for http requests to map api
import axios from 'axios';

import locations from './utils/locations.js';


// Load environment variables
dotenv.config();


// Initialize Express app
const app = express();

// Middleware new
app.use(cors({
    origin: '*', // Allow all origins
})); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable JSON body parsing in requests


// MongoDB connection using MongoClient
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    dbName: 'Farm_Info',  // database name
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
        const shops = await Shop.find({ areaOfInterest: region }, {},  {});
        console.log(shops)
        if (shops.length === 0) {
            return res.status(404).json({ error: 'No shops found in the specified region' });
        }

        res.json({ region, shops });
    } catch (error) {
        console.error('Error querying the database:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.get('/api/farmshops/byFarmType', async (req, res) => {
    const { farmType } = req.query;

    if (!farmType) {
        return res.status(400).json({ error: 'Farm type is required' });
    }

    try {
        const shops = await Shop.find({ farmType: { $in: [farmType] } });
        if (shops.length === 0) {
            return res.status(404).json({ error: 'No shops found with that farm type' });
        }
        res.json({ farmType, shops });
    } catch (error) {
        console.error('Error querying by farm type:\\', error);
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
        const {shopID, coordinates} = req.body;

        if (!shopID || !coordinates || !coordinates.latitude || !coordinates.longitude) {
            return res.status(400).json({error: 'shopID and valid coordinates are required'});
        }

        // Find the closest region
        const {latitude, longitude} = coordinates;
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
                {shopID},
                {areaOfInterest: closestRegion},
                {return: true} // Return the updated document
            );

            if (!updatedShop) {
                return res.status(404).json({error: 'Shop not found'});
            }

            res.json({message: 'Area of interest updated successfully', shop: updatedShop});
        } catch (error) {
            console.error('Error updating area of interest:', error);
            res.status(500).json({error: 'Server error'});
        }
    }
)

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


