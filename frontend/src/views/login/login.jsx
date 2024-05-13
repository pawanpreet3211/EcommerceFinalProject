import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigator = useNavigate();

    const validateEmail = () => {
        if (!email) {
            setEmailError("Email is required");
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError("Password is required");
        } else {
            setPasswordError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        validateEmail();
        validatePassword();

        // Check if there are any validation errors before submitting the form
        if (!emailError && !passwordError) {
            await fetch("http://localhost:5000/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.status) {
                        setEmail("");
                        setPassword("");

                        // console.log(response);
                        console.log("response.result: ", response.result);
                        localStorage.setItem("_id", response.result._id);
                        // localStorage.setItem("name", response.result.fullName);
                        localStorage.setItem("email", response.result.email);
                        localStorage.setItem("OTPemail", response.result.email);
                        localStorage.setItem("phoneNumber", response.result.phoneNumber);
                        localStorage.setItem("username", response.result.username);
                        localStorage.setItem("loginMessage", "true");

                        navigator("/dashboard");
                        
                        window.location.reload();
                    } else {
                        alert(response.err);
                    }
                });
            // Reset the form fields if needed
            setEmail("");
            setPassword("");
            setEmailError("");
            setPasswordError("");
        }
    };

    useEffect(() => {
        // Here you would check the user's authentication status when the component mounts
        // For now, we'll assume the user is not logged in by default
        // setIsLoggedIn(true or false based on auth status);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                <form
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-black font-bold text-center mb-6">
                        Login
                    </h2>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="text"
                            className="w-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-800 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                            placeholder="Enter your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={validateEmail}
                        />
                        <span className="text-red-500 text-xs italic">{emailError}</span>
                    </div>

                    <div className="mb-10">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password:
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full shadow appearance-none border rounded-lg py-2 px-3 text-gray-800 focus:border-blue-500 focus:bg-gray-200 focus:outline-none"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={validatePassword}
                        />
                        <span className="text-red-500 text-xs italic">{passwordError}</span>
                    </div>

                    <button
                        className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                        type="submit"
                    >
                        Login
                    </button>
                    <div className="py-5 text-black">
                        Dont have Account?{" "}
                        <button
                            onClick={() => {
                                localStorage.clear();
                                navigator(`/Signup`);
                            }}
                            className="hover:underline hover:text-blue-400"
                        >
                            SignUp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
