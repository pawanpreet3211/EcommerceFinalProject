const mongoose = require("mongoose");

// Schema for Transactions Collection
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    productDetails: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: Number
    }],
    totalAmount: Number,
    transactionDate: Date,
    riskLevel: String,
    authenticationRequired: [String],
    status: String
});

const TransactionModel = mongoose.model("Transactions", TransactionSchema);
module.exports = TransactionModel;
