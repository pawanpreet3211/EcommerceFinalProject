const TransactionModel = require("../models/transactions");

exports.getUserTransactions = async (req, res) => {
    try {
        const userId = req.body.IdUser;
        console.log("req.body: ", req.body);

        if (!userId) {
            console.log("UserID is required");
            return res.status(400).json({ error: 'UserID is required' });
        }

        console.log("Getting Transactions of user with id: ", userId);
        
        // Fetch all user's transactions from the database
        const transactions = await TransactionModel.find({ userId: userId });
        console.log("Done!");

        res.json({
            transactions: transactions,
            message: "Got all user transactions!"
        });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({
            error: "Internal Server Error"
        }); // Send error response
    }
};

exports.makeTransaction = async (req, res) => {
    const transaction = req.body.transaction;

    console.log("Transaction: ", transaction);

    try {
        if (!transaction) {
            res.status(400).json({
                message: "Cannot process null transaction."
            })
        }

        const updatedTransaction = { ...transaction }; // Cloning the transaction object
        updatedTransaction.status = "completed";
        updatedTransaction.transactionDate = Date.now();

        // console.log("Updated transaction: ", updatedTransaction.userId);

        // console.log("Transaction2: ", updatedTransaction);
        // console.log("Adding Transaction!");

        const newTransaction = new TransactionModel(updatedTransaction);
        // console.log(" --- 1 --- ");
        await newTransaction.save();

        console.log("Transaction successfull!!!!!!!!!!");

        res.status(200).json({
            message: "Transaction made successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create Transaction. Server Error"
        });
    }
}
