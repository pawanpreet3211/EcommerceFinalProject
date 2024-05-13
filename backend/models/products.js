const mongoose = require("mongoose");

// Schema for Products Collection
const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stockQuantity: Number,
    categories: [String],
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    image: String
});

const ProductModel = mongoose.model("Products", ProductSchema);
module.exports = ProductModel;
