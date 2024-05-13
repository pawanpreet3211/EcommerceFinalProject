import React, { useState, useEffect } from "react";
import TransactionCard from "../TransactionCard/TransactionCard"; // Assume this component is in the same directory

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    // const [userId, setuserId] = useState("");

    const getTransactions = async (IdUser) => {
        await fetch("http://localhost:5000/transactions/getUserTransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    IdUser: IdUser,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log(response);
                    console.log("response.message: ", response.message);
                    console.log("response.transactions: ", response.transactions);
                    setTransactions(response.transactions);
                });
    }

    useEffect(() => {
        // fetch("http://localhost:5000/transactions/getUserTransaction")
        //     .then((response) => response.json())
        //     .then((data) => setTransactions(data))
        //     .catch((error) =>
        //         console.error("Error fetching transactions:", error)
        //     );
        const IdUser = localStorage.getItem("_id");
        // const usrnm = localStorage.getItem("username");
        console.log("list IdUser x: ", IdUser);
        // console.log("username: ", usrnm);

        if (IdUser) {
            // If _id is found, retrieve and log the email
            // const userEmail = localStorage.getItem("email");
            // console.log("User Email:", userEmail);
            // console.log("hello");

            // setuserId(IdUser);
            
            getTransactions(IdUser);
        }

    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Your Transactions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {transactions.map((transaction) => (
                    <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                    />
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
