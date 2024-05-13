import React, { useState, useEffect } from "react";
import CartProductCard from "../CartProductCard/CartProductCard";
import { toast } from "react-toastify";

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items from local storage or API
        const fetchedCartItems = localStorage.getItem("cart");
        if (fetchedCartItems) {
            const parsedCartItems = JSON.parse(fetchedCartItems);
            setCartItems(parsedCartItems);
            
            const total = parsedCartItems.reduce((acc, item) => {
                return acc + item.quantity * item.price;
            }, 0);
            localStorage.setItem("grandTotal", total);
        }
    }, []);

    const removeFromCart = (productId) => {
        // setCartItems(cartItems.filter(item => item.productId !== productId));

        // Retrieve cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];

        // Find the index of the cart item to be removed
        const indexToRemove = existingCartItems.findIndex(item => item.productId === productId);

        if (indexToRemove !== -1) {
            // Remove the cart item from the array
            existingCartItems.splice(indexToRemove, 1);

            // Update the cart items in local storage
            localStorage.setItem("cart", JSON.stringify(existingCartItems));

            // Show success message or perform any other action
            toast.warn("Removed cart item", {
                position: toast.POSITION.TOP_CENTER,
            });

            window.location.reload();
        }
    };

    return (
        <div className="cart-list mt-10">
            {cartItems.map(item => (
                <CartProductCard key={item.productId} product={item} removeFromCart={removeFromCart} />
            ))}
        </div>
    );
};

export default CartList;
