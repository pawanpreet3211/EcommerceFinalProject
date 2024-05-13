const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// function AddProducts() {
//     const ProductModel = require("./models/products");
//     const products = require("./data/products");

//     // Assuming you have already connected to MongoDB Atlas using mongoose.connect()

//     // Inserting products into the database
//     ProductModel.create(products)
//         .then(() => {
//             console.log("Products added successfully!");
//             // mongoose.connection.close(); // Close the connection after adding products
//         })
//         .catch((err) => {
//             console.error("Error adding products:", err);
//             // mongoose.connection.close(); // Close the connection in case of error
//         });
// }

// function AddTransactions() {
//     const TransactionModel = require("./models/transactions");
//     const transactions = require("./data/transactions");

//     // Assuming you have already connected to MongoDB Atlas using mongoose.connect()

//     // Inserting products into the database
//     TransactionModel.create(transactions)
//         .then(() => {
//             console.log("Transactions added successfully!");
//             // mongoose.connection.close(); // Close the connection after adding products
//         })
//         .catch((err) => {
//             console.error("Error adding Transactions:", err);
//             // mongoose.connection.close(); // Close the connection in case of error
//         });
// }

const app = express();
app.use(cors("*"));
app.use(express.json());

app.use("/user", require("./routes/user"));
app.use("/products", require("./routes/products"));
app.use("/test", require("./routes/test"));
app.use("/transactions", require("./routes/transaction"));
app.use("/otp", require("./routes/otp"));

mongoose.connect(process.env.DB)
    .then(() => {
        console.log('MongoDB connection established successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log("Server listening on port => ", process.env.PORT);
    console.log("DB URL: ", process.env.DB);
    // AddProducts();
    // AddTransactions();
});
