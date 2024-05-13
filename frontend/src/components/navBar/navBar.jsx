import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        if (userId) {
            // If _id is found, retrieve and log the email
            const userEmail = localStorage.getItem("email");
            console.log("User Email:", userEmail);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        // const itemCount = parseInt(localStorage.getItem("cartItemCount")) || 0;
        // setCartItemCount(itemCount);
        updateCartItemCount();
    }, []);

    const updateCartItemCount = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const uniqueItemCount = new Set(cartItems.map(item => item.productId)).size;
        setCartItemCount(uniqueItemCount);
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.reload();
    }

    return (
        <nav className="flex justify-between items-center bg-indigo-600 text-white h-20">
            <div className="ml-4">
                {isLoggedIn ? (
                    <h1>
                        <a className="font-serif italic text-white text-4xl hover:text-slate-400" href="/dashboard">SecureCommerce</a>
                    </h1>
                ) : (
                    <h1>
                        <a className="font-serif italic text-white text-4xl hover:text-slate-400" href="/">SecureCommerce</a>
                    </h1>
                )}
            </div>
            <ul className="flex mr-4">
                {isLoggedIn ? (
                    <>
                        <li className="mt-2 mr-4">
                            <a href="/dashboard" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">Dashboard</a>
                        </li>
                        <li className="mt-2 mr-4">
                            <a href="/user-profile" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">Profile</a>
                        </li>
                        <li className="mt-2 mr-4">
                            <a href="/transactions" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">Transaction History</a>
                        </li>
                        <li className="mt-2 mr-4">
                        <a href="/cart" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <span className="ml-1">{cartItemCount}</span>
                            </a>
                        </li>
                        {/* <li className="mr-4">
                            <a href="/send-otp" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">OTP</a>
                        </li> */}
                        <li>
                            <button onClick={handleLogout} className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="mt-2 mr-4">
                            <a href="/add-product" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded-lg">Add Product</a>
                        </li>
                        <li className="mt-2 mr-4">
                            <a href="/login" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded">Login</a>
                        </li>
                        <li className="mt-2 mr-4">
                            <a href="/signup" className="hover:bg-blue-800 hover:text-white px-4 py-2 rounded">Sign Up</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
