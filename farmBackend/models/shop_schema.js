const mongoose = require('mongoose');
import locations from '../utils/locations.js';


const shopSchema = new mongoose.Schema({
    shopID: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    farmName: { type: String, required: true },
    avgRating: { type: Number, default: 0 },
    areaOfInterest: { type: String,
        enum: locations
    },

    coordinates: {
        longitude: { type: Number, required: true },
        latitude: { type: Number, required: true }
    },
    address: {
        number: { type: String, required: true },
        street: { type: String, required: true },
        suburb: { type: String, required: true },
        postcode: { type: String, required: true }
    },
    // Description gives detailed list of products available in the farm
    description: { type: String, required: true },
    // Gives general information about the farm's produce
    farmType: [{
        type: String,
        enum: ['Dairy & Cheese', 'Fruits', 'Vegetables', 'Wine', 'Poultry', 'Honey', 'Eggs', 'Flowers & Plants', 'Other'],
        required: true
    }],
    photos: {
        type: [String],
        validate: {
            validator: function (photos) {
                return photos.every(photo => /\.(jpg|jpeg|png)$/i.test(photo));
            },
            message: 'Photos must be in .jpg, .jpeg, or .png format'
        }
    }
});

module.exports = mongoose.model('Shop', shopSchema);