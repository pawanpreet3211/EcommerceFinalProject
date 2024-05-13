
exports.test = async (req, res) => {
    try {
        res.json({
            message: "Hi! Server is working fine"
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            error: "Internal Server Error"
        }); // Send error response
    }
};
