const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productID: { type: String, required: true, unique: true },  // PK
    productName: { type: String, required: true },
    productBenefits: { type: String }
});

module.exports = mongoose.model('Product', productSchema);
