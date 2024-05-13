import React, { useEffect } from "react";
import TransactionList from "../../components/TransactionList/TransactionList";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
    const navigator = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        if (!userId) {
            navigator('/');
        }
    }, []);

    return (
        <>
            <TransactionList />
        </>
    );
};

export default Transactions;
