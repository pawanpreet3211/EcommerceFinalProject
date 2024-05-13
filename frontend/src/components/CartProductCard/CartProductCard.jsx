import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CartProductCard = ({ product, removeFromCart }) => {
    const { productId, name, image, quantity, price } = product;
    const subPrice = quantity * price;

    return (
        <div className="flex items-center justify-between border-b border-gray-300 p-4 bg-white rounded-lg overflow-hidden mt-3 mx-48">
            <div className="flex items-center">
                <img src={image} alt={name} className="w-28 h-28 object-cover mr-4 border border-gray-200 rounded-xl hover:border-gray-400" />
                <div>
                    <h3 className="font-bold">{name}</h3>
                    <p className="text-gray-600">Quantity: {quantity}</p>
                    <p className="text-gray-600">Unit Price: ${price}</p>
                    <p className="text-gray-600">Subtotal: ${subPrice}</p>
                </div>
            </div>
            <button onClick={() => removeFromCart(productId)} className="text-red-600 hover:text-red-800 focus:outline-none">
                <FontAwesomeIcon icon={faTrash} className="w-6 h-6" />
            </button>
        </div>
    );
};

export default CartProductCard;