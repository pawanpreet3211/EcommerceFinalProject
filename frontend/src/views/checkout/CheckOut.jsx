import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckOut = () => {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const grandTotal = parseFloat(localStorage.getItem("grandTotal")) || 0;
        setTotalPrice(grandTotal);

        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setCurrentDate(formattedDate);

        localStorage.removeItem("transaction");

        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

        const productDetails = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity
        }));

        const newTransaction = {
            userId: localStorage.getItem("_id"),
            productDetails: productDetails,
            totalAmount: grandTotal,
            transactionDate: formattedDate,
            // riskLevel: "Low",
            // authenticationRequired: [],
            status: "pending"
        };
        localStorage.setItem("transaction", JSON.stringify(newTransaction));
        localStorage.setItem("transactionProcess", true);

        console.log("New Transaction: ", localStorage.getItem("transaction"));
    }, []);

    const handleMakeTransaction = () => {
        // navigate("/verify-transaction");
        // navigate("/otp-sms");

        const randomNumber = Math.floor(Math.random() * 4); // Generates a random number between 0-3

    // Conditions based on the generated random number
    if (randomNumber === 2) {
        navigate("/otp-sms");
    } else if (randomNumber === 3) {
        navigate("/verify-transaction");
    }
    // else if (randomNumber === 1) {
    //     navigate("/some-other-route2");
    // }
    else {
        const transaction = localStorage.getItem("transaction");

        var TransactionToastId3 = toast.info("Safe user, Performing transaction.", {
            position: toast.POSITION.TOP_CENTER,
        });

        setTimeout(() => {
            fetch("http://localhost:5000/transactions/makeTransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    transaction: transaction
                }),
            })
            .then((res) => res.json())
            .then((transactionResponse) => {
                console.log("transactionResponse: ", transactionResponse);

                toast.dismiss(TransactionToastId3);

                toast.success("Transaction Successfull!", {
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => {
                        navigate('/dashboard');
                    }
                });

                localStorage.removeItem("transaction");
                localStorage.removeItem("cart");
                // navigator("/dashboard");
            })
            .catch((error) => {
                console.error("Error processing transaction:", error);
                
                toast.dismiss(TransactionToastId3);
                
                toast.error("Transaction Failed!", {
                    position: toast.POSITION.TOP_CENTER,
                    onClose: () => {
                        navigate('/dashboard');
                    }
                });
            });
        }, 1000);
    }
    };

    return (
        <div className="container mx-auto mt-8 bg-white rounded-lg p-8 w-1/2">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>
            <div className="border-b border-gray-300 mb-4"></div>
            <div className="mb-4">
                <p className="font-bold">Final Total Price:</p>
                <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mb-4">
                <p className="font-bold">Current Date:</p>
                <p>{currentDate}</p>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleMakeTransaction}
            >
                Make Transaction
            </button>
        </div>
    );
};

export default CheckOut;
