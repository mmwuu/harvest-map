import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shopID: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    farmName: { type: String, required: true },
    avgRating: { type: Number, default: 0 },

    areaOfInterest: { type: String, required: true },

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
    // Image URL list (all images stored in google cloud)
    photos: [{ type: [String], required: true }],
}, { collection: 'Shops' });

export default mongoose.model('Shop', shopSchema);