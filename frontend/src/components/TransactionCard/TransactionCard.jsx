import React from "react";

const TransactionCard = ({ transaction }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-2">Transaction Details</h3>
            <div className="text-gray-800 mb-2">
                Date:{" "}
                {new Date(transaction.transactionDate).toLocaleDateString()}
            </div>
            <div className="text-gray-800 mb-2">
                Total Amount: ${transaction.totalAmount.toFixed(2)}
            </div>
            <div className="text-gray-800 mb-2">
                Risk Level: {transaction.riskLevel}
            </div>
            <div className="text-gray-800 mb-2">
                Status:{" "}
                <span
                    className={`font-bold ${
                        transaction.status === "completed"
                            ? "text-green-500"
                            : transaction.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                    }`}
                >
                    {transaction.status}
                </span>
            </div>
            {/* <div className="mb-2">
                <h4 className="font-semibold">Products:</h4>
                {transaction.productDetails.map((item, index) => (
                    <div key={index} className="text-gray-700">
                        - Product ID: {item.productId.toString()}, Quantity:{" "}
                        {item.quantity}
                    </div>
                ))}
            </div> */}
            <div className="text-right">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default TransactionCard;
