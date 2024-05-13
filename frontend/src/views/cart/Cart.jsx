import React, { useEffect, useState } from "react";
import CartList from "../../components/CartList/CartList";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [cartItemCount, setCartItemCount] = useState(0);
    const navigator = useNavigate();

    useEffect(() => {
        updateCartItemCount();
    }, []);
    
    const updateCartItemCount = () => {
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        const uniqueItemCount = new Set(cartItems.map(item => item.productId)).size;
        setCartItemCount(uniqueItemCount);
    };

    const handleCheckout = () => {
        navigator("/checkout");
    };

    return (
        <>
            {cartItemCount ? ( 
                <div className="cart-container mx-10">
                    <h2 className="text-2xl font-bold ml-10 mt-5 mb-4">Shopping Cart</h2>
                    <CartList />
                    <div className="checkout-button m-10">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            ) : (
                <div className="cart-container">
                    <h2 className="text-2xl font-bold ml-10 mt-5 mb-4">Cart Empty</h2>
                </div>
            )}
        </>
    );
};

export default Cart;
