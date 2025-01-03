const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: {
        type: Number, // Optional, for discounted price
    },
    isOnOffer: {
        type: Boolean,
        default: false, // Defaults to false if not explicitly set
      },
    brand: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true, // e.g., "Clothing", "Electronics"
    },
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store',
    },
    image: {
        type: String, // URL of the image or file path
        required: true, // Optional if not all products have images
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product

