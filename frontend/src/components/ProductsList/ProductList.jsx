import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard/ProductCard"; // Assume this component is in the same directory

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        fetch("http://localhost:5000/products/get")
            .then((res) => res.json())
            .then((response) => {
                // console.log("response: ", response);
                // console.log("response: ", response.products);

                setProducts(response.products);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductList;
