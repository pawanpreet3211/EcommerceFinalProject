import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState({});
    const navigator = useNavigate();

    const validateEmail = () => {
        let tempErrors = {};

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const validateUsername = () => {
        let tempErrors = {};

        if (!formData.username.trim())
            tempErrors.username = "Username is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const validatePassword = () => {
        let tempErrors = {};

        if (!formData.password) tempErrors.password = "Password is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const validatePhoneNumber = () => {
        let tempErrors = {};

        if (!formData.phoneNumber.trim()) {
            tempErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\+[0-9]+$/.test(formData.phoneNumber)) {
            tempErrors.phoneNumber = "Phone number is invalid.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.username.trim())
            tempErrors.username = "Username is required.";
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email is invalid.";
        }
        if (!formData.password) tempErrors.password = "Password is required.";
        if (!formData.phoneNumber.trim()) {
            tempErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\+[0-9]+$/.test(formData.phoneNumber)) {
            tempErrors.phoneNumber = "Phone number is invalid.";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Proceed with API call to backend to create user
            console.log("Form is valid. Submitting data...", formData);

            await fetch("http://localhost:5000/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber,
                }),
            })
                .then((res) => res.json())
                .then((response) => {
                    if (response.status) {
                        alert("Signed up successfully!");

                        // console.log(response);
                        console.log("response.result: ", response.result);
                        
                        localStorage.setItem("OTPemail", response.result.email);
                        
                        navigator("/Login");
                    } else {
                        alert("Error: ", response.message);
                    }
                });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
    }, []);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                <form
                    className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-4xl text-black font-bold text-center mb-6">
                        SignUp
                    </h2>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            onBlur={validateUsername}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs italic">
                                {errors.username}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={validateEmail}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs italic">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="phoneNumber"
                        >
                            Phone Number
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phoneNumber"
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            onBlur={validatePhoneNumber}
                        />
                        {errors.phoneNumber && (
                            <p className="text-red-500 text-xs italic">
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******************"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={validatePassword}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs italic">
                                {errors.password}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className="py-5 text-black">
                        Already have an Account?{" "}
                        <button
                            onClick={() => {
                                localStorage.clear();
                                navigator(`/login`);
                            }}
                            className="hover:underline hover:text-blue-400"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
