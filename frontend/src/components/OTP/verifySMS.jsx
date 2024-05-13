import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
// import SendSMSOTP from "./sendSmsOTP";
import { toast } from "react-toastify";
import axios from 'axios';

const VerifySMSOTP = () => {
    const [phone, setPhoneNumber] = useState("");
    const [OTP, setOTP] = useState(null);
    const [OTP_Error, setOTP_Error] = useState("");
    const [OTP_sent, setOTP_sent] = useState(false);
    // const navigator = useNavigate();
    const navigator = useCallback(useNavigate(), []);

    const validateOTP = () => {
        if(!OTP){
            setOTP_Error("Must Enter OTP");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!OTP_Error) {
            await fetch("http://localhost:5000/otp/verify-otp-sms", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone: phone,
                    otp: OTP
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    console.log("Verify response: ", response);
                    if (response.verified) {
                        setOTP("");

                        var TransactionToastId1 = toast.success("OTP verified successfully!", {
                            position: toast.POSITION.TOP_CENTER,
                        });

                        var TransactionToastId2 = toast.loading("Verification Success. Processing transaction. Please wait", {
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

                            toast.dismiss(TransactionToastId2);
                            toast.dismiss(TransactionToastId1);

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
                            
                            toast.dismiss(TransactionToastId2);
                            toast.dismiss(TransactionToastId1);
                            
                            toast.error("Transaction Failed!", {
                                position: toast.POSITION.TOP_CENTER,
                                onClose: () => {
                                    navigator('/dashboard');
                                }
                            });
                            // localStorage.removeItem("transaction");
                            // localStorage.removeItem("cart");
                        });

                        // navigator("/dashboard");
                        window.location.reload();
                    } else {
                        alert(response.error);
                        toast.error("OTP verification failed!", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                });
            // Reset the form fields if needed
            setOTP("");
        }
    };

    const SendSMSOTP = async (phone) => {
        try {
            const response = await axios.post('http://localhost:5000/otp/send-otp-sms', {
                phone: phone
            });
    
            return response.data;
        } catch (error) {
            console.error('Error sending OTP via SMS:', error);
            throw new Error('Failed to send OTP via SMS. Please try again later.');
        }
    };

    // useEffect(() => {
    //     console.log("Effect runs with OTP_sent:", OTP_sent);

    //     const userId = localStorage.getItem("_id");
    //     if (userId) {
    //         const phoneNumber = localStorage.getItem("phoneNumber");
    //         console.log("User phoneNumber: ", phoneNumber);
    //         setPhoneNumber(phoneNumber);
    
    //         // Check if OTP has not been sent, then send OTP
    //         if (!OTP_sent) {
    //             console.log("OTP sending initiated");

    //             const sendSMS = async () => {
    //                 try {
    //                     const result = await SendSMSOTP(phoneNumber);
    //                     console.log("OTP result: ", result);
    
    //                     if (result) {
    //                         toast.info("OTP sent to your registered phone number", {
    //                             position: toast.POSITION.TOP_CENTER,
    //                         });
    
    //                         setOTP_sent(true); // Set OTP_sent to true after successful sending
    //                     } else {
    //                         toast.error("Failed to send OTP to your registered phone number", {
    //                             position: toast.POSITION.TOP_CENTER,
    //                         });
    //                     }
    //                 } catch (error) {
    //                     console.error('Error sending OTP via SMS:', error);
    //                     toast.error("Failed to send OTP via SMS. Please try again later.", {
    //                         position: toast.POSITION.TOP_CENTER,
    //                     });
    //                 }
    //             };
    
    //             sendSMS();
    //         }
    //     } else {
    //         navigator('/login');
    //     }
    // }, [OTP_sent, navigator]);

    useEffect(() => {
        console.log("Component Mounted"); // To check if component mounts multiple times
    
        return () => {
            console.log("Component Unmounted"); // To check if it unmounts unexpectedly
        };
    }, []); // This effect only runs on mount and unmount
    
    useEffect(() => {
        console.log("Effect runs with OTP_sent:", OTP_sent);
    
        const userId = localStorage.getItem("_id");
        if (userId && !OTP_sent) {
            console.log("OTP sending initiated"); // Should log only once if all is well
            const phoneNumber = localStorage.getItem("phoneNumber");
            console.log("User phoneNumber: ", phoneNumber);
            setPhoneNumber(phoneNumber);
    
            const sendSMS = async () => {
                try {
                    const result = await SendSMSOTP(phoneNumber);
                    console.log("OTP result: ", result);
    
                    if (result.status) {
                        toast.info("OTP sent to your registered phone number", {
                            position: toast.POSITION.TOP_CENTER,
                        });
    
                        setOTP_sent(true); // Set OTP_sent to true after successful sending
                    } else {
                        toast.error("Failed to send OTP to your registered phone number", {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                } catch (error) {
                    console.error('Error sending OTP via SMS:', error);
                    toast.error("Failed to send OTP via SMS. Please try again later.", {
                        position: toast.POSITION.TOP_CENTER,
                    });
                }
            };
    
            sendSMS();
        } else if (!userId) {
            navigator('/login');
        }
    }, [OTP_sent, navigator]);

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="w-full max-w-md">
                <form
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-black font-bold text-center mb-6">
                        Verify OTP
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                            OTP:
                        </label>
                        <input
                            id="OTP"
                            type="number"
                            className="w-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-800 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                            placeholder="Enter OTP here"
                            value={OTP}
                            onChange={(e) => setOTP(e.target.value)}
                            onBlur={validateOTP}
                        />
                        <span className="text-red-500 text-xs italic">{OTP_Error}</span>
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

export default VerifySMSOTP;
