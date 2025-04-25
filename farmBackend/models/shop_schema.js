const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shopID: { type: String, required: true, unique: true },
    productIDList: [{ type: String, ref: 'Product' }],
    ownerName: { type: String, required: true },
    farmName: { type: String, required: true },
    avgRating: { type: Number, default: 0 },
    areaOfInterest: { type: String },
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
    description: { type: String },
    photos: [String]
});

module.exports = mongoose.model('Shop', shopSchema);
