const mongoose = require("mongoose");

// Assuming you've already imported ProductModel for fetching product IDs

// Sample product IDs
const productIds = [
    "660d84445e963e71b40cdf16",
    "660d84445e963e71b40cdf19",
    "660d84445e963e71b40cdf1a",
    "660d84445e963e71b40cdf1b",
    "660d84445e963e71b40cdf1c",
    "660d84445e963e71b40cdf18",
    "660d84445e963e71b40cdf1e",
    "660d84445e963e71b40cdf17",
    "660d84445e963e71b40cdf1d",
    "660d84445e963e71b40cdf1f",
];

// Sample user IDs
const userIds = ["660d4dcf7f5914f2e69eaa73", "660d91592031f8b94afeb0a4"];

// Generate random quantity for products
function generateRandomQuantity() {
    return Math.floor(Math.random() * 5) + 1; // Random quantity between 1 and 5
}

// Generate random transaction date within the last month
function generateRandomTransactionDate() {
    const currentDate = new Date();
    const monthAgo = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - 1,
        currentDate.getDate()
    );
    return new Date(
        monthAgo.getTime() +
            Math.random() * (currentDate.getTime() - monthAgo.getTime())
    );
}

// Generate random risk level
function generateRandomRiskLevel() {
    const riskLevels = ["low", "medium", "high"];
    return riskLevels[Math.floor(Math.random() * riskLevels.length)];
}

// Generate random authentication required
function generateRandomAuthenticationRequired() {
    const authenticationOptions = ["OTP", "biometric", "password"];
    const numOptions = Math.floor(Math.random() * 3) + 1; // Randomly choose 1 to 3 options
    const selectedOptions = [];
    while (selectedOptions.length < numOptions) {
        const option =
            authenticationOptions[
                Math.floor(Math.random() * authenticationOptions.length)
            ];
        if (!selectedOptions.includes(option)) {
            selectedOptions.push(option);
        }
    }
    return selectedOptions;
}

// Generate random status
function generateRandomStatus() {
    const statuses = ["pending", "completed", "cancelled"];
    return statuses[Math.floor(Math.random() * statuses.length)];
}

// Sample transactions data
const transactions = [];
for (let i = 0; i < 10; i++) {
    const numProducts = Math.floor(Math.random() * 10) + 1; // Random number of products between 1 and 10
    const selectedProductIds = [];
    for (let j = 0; j < numProducts; j++) {
        selectedProductIds.push(
            productIds[Math.floor(Math.random() * productIds.length)]
        );
    }
    const transaction = {
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        productDetails: selectedProductIds.map((productId) => ({
            productId: productId,
            quantity: generateRandomQuantity(),
        })),
        totalAmount: 0, // Calculate total amount based on product prices
        transactionDate: generateRandomTransactionDate(),
        riskLevel: generateRandomRiskLevel(),
        authenticationRequired: generateRandomAuthenticationRequired(),
        status: generateRandomStatus(),
    };
    transactions.push(transaction);
}

module.exports = transactions;
