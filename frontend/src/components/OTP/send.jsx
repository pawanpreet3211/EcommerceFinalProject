import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SendOTP = () => {
    const [phone, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const navigator = useNavigate();

    const validatePhoneNumber = () => {
        if (!phone) {
            setPhoneError("Email is required");
        } else {
            setPhoneError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        validatePhoneNumber();

        // Check if there are any validation errors before submitting the form
        if (!phoneError) {
            await fetch("http://localhost:5000/otp/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: phone,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.status) {
                        setPhoneNumber("");

                        // // console.log(response);
                        // console.log("response.result: ", response.result);
                        // localStorage.setItem("_id", response.result._id);
                        // // localStorage.setItem("name", response.result.fullName);
                        // localStorage.setItem("phone", response.result.phone);
                        // localStorage.setItem("username", response.result.username);

                        navigator("/verify-otp");
                        
                        window.location.reload();
                    } else {
                        alert(response.err);
                    }
                });
            // Reset the form fields if needed
            setPhoneNumber("");
        }
    };

    useEffect(() => {
        // Here you would check the user's authentication status when the component mounts
        // For now, we'll assume the user is not logged in by default
        // setIsLoggedIn(true or false based on auth status);
    }, []);

    return (
        <div className="flex justify-center items-center mt-20">
            <div className="w-full max-w-md">
                <form
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-black font-bold text-center mb-6">
                        Send OTP
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            id="phone"
                            type="email"
                            className="w-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-800 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                            placeholder="Enter your email"
                            value={phone}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            onBlur={validatePhoneNumber}
                        />
                        <span className="text-red-500 text-xs italic">{phoneError}</span>
                    </div>

                    <button
                        className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SendOTP;
