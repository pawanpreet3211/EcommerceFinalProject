import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyPhrase = () => {
    const [userID, setUserID] = useState(null);
    const [phraseError, serPhraseError] = useState("");
    const [phrase, setPhrase] = useState("");
    const navigator = useNavigate();

    const validateUniquePhrase = () => {
        if (!phrase) {
            serPhraseError("Unique Phrase is required to process your transaction");
        } else {
            serPhraseError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateUniquePhrase();

        if (!phraseError) {
            await fetch("http://localhost:5000/user/verify-phrase", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: userID,
                    uniquePhrase: phrase,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    setPhrase("");
                        if (response.message === "User verified successfully") {


                            console.log("user verification response: ", response);
                            console.log("user verification response.status: ", response.status);
                            console.log("user verification response.result: ", response.result);
    
                            var toastId = toast.loading("Verification Success. Processing transaction. Please wait", {
                                position: toast.POSITION.TOP_CENTER,
                            });
    
                            const transaction = localStorage.getItem("transaction");
    
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
    
                                toast.dismiss(toastId);
    
                                toast.success("Transaction Successfull!", {
                                    position: toast.POSITION.TOP_CENTER,
                                    onClose: () => {
                                        navigator('/dashboard');
                                    }
                                });
    
                                localStorage.removeItem("transaction");
                                localStorage.removeItem("cart");
                                // navigator("/dashboard");
                            })
                            .catch((error) => {
                                console.error("Error processing transaction:", error);
                                toast.dismiss(toastId);
                                toast.error("Transaction Failed!", {
                                    position: toast.POSITION.TOP_CENTER,
                                    onClose: () => {
                                        navigator('/dashboard');
                                    }
                                });
                                // localStorage.removeItem("transaction");
                                // localStorage.removeItem("cart");
                            });
                        } else {
                            toast.error("Verification Failed!", {
                                position: toast.POSITION.TOP_CENTER,
                                onClose: () => {
                                    navigator('/dashboard');
                                }
                            });
                        }
                        
                        
                        // navigator("/dashboard");
                })
                .catch((error) => {
                    console.error("Error verifying User:", error);
                    // alert(response.err);

                    toast.error("Verification Failed!", {
                        position: toast.POSITION.TOP_CENTER,
                        onClose: () => {
                            navigator('/dashboard');
                        }
                    });

                    // localStorage.removeItem("transaction");
                    // localStorage.removeItem("cart");
                    // localStorage.removeItem();
                    
                    // navigator("/dashboard");
                });
            setPhrase("");
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        if (userId) {
            console.log("User Email:", localStorage.getItem("email"));
            setUserID(userId);
        } else {
            navigator('/login');
        }
    }, []);

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="w-full max-w-md">
                <form
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-black font-bold text-center mb-6">
                        Verify Transaction
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                            Enter your unique phrase:
                        </label>
                        <input
                            id="phrase"
                            type="text"
                            className="w-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-800 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                            placeholder="Unique Phrase"
                            value={phrase}
                            onChange={(e) => setPhrase(e.target.value)}
                            onBlur={validateUniquePhrase}
                        />
                        <span className="text-red-500 text-xs italic">{phraseError}</span>
                    </div>

                    <button
                        className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                        type="submit"
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VerifyPhrase;
