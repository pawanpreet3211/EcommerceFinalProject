const ProductModel = require("../models/products");

exports.get = async (req, res) => {
    try {
        // console.log("Getting products!");
        // Fetch all products from the database
        const products = await ProductModel.find({});

        res.json({
            products: products,
            message: "Got all products!"
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            error: "Internal Server Error"
        }); // Send error response
    }
};

exports.add = async (req, res) => {
    console.log("Adding Product");
    try {
        console.log("req.body: ", req.body);
        const newProduct = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stockQuantity: req.body.stockQuantity,
            categories: req.body.categories,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: req.body.image
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        console.log("Product added!");

        res.status(201).json({
            newProduct: savedProduct,
            message: "Product Added!"
        });
    } catch (err) {
        console.log("Failed to add product.");
        console.log("Error: ", err.message);
        res.status(400).json({ message: err.message });
    }
};
