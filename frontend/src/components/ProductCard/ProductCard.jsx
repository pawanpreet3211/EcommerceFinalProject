import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1); // Initial quantity set to 1
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userId = localStorage.getItem("_id");
        console.log("userId: ", userId);

        if (userId) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity < 1) {
            setQuantity(1);
        } else if (newQuantity > product.stockQuantity) {
            setQuantity(product.stockQuantity);
        } else {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (isLoggedIn) {
            // Retrieve cart items from local storage
            const existingCartItems = JSON.parse(localStorage.getItem("cart")) || [];
            
            // Check if the product already exists in the cart
            const existingProductIndex = existingCartItems.findIndex(item => item.productId === product._id);

            if (existingProductIndex !== -1) {
                // If the product already exists, update the quantity
                existingCartItems[existingProductIndex].quantity += quantity;
            } else {
                // If the product doesn't exist, add it to the cart
                const newCartItem = {
                    productId: product._id,
                    name: product.name,
                    image: product.image,
                    quantity: quantity,
                    price: product.price
                };
                existingCartItems.push(newCartItem);
            }

            // Update the cart items in local storage
            localStorage.setItem("cart", JSON.stringify(existingCartItems));

            // Show success message
            toast.success("Product added to cart", {
                position: toast.POSITION.TOP_CENTER,
            });

            window.location.reload();
        } else {
            toast.warn("You must login to buy", {
                position: toast.POSITION.TOP_CENTER,
            });
        }
    }

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-700 text-base">{product.description}</p>
                <div className="flex flex-col items-center mt-2">

                    <img className="border border-gray-200 w-48 h-48 rounded-xl hover:border-gray-400" src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="p-4 border-t border-gray-200">
                <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                </span>
            </div>
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                    <label htmlFor="quantity" className="text-base font-bold mr-4">
                        Quantity:
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max={product.stockQuantity}
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="border border-gray-200 w-20 h-10 rounded-md text-center"
                    />
                    {/* <h3 className="ml-5 text-red-500">{product.stockQuantity}</h3> */}
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 text-right">
                <button className="bg-indigo-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
