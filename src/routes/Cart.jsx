import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import CartCard from "../ui/CartCard";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cookies, setCookie] = useCookies(["cart"]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const hostUrl = import.meta.env.VITE_APP_HOST;

    const taxRate = 0.15;

    useEffect(() => {
        async function fetchCartProducts() {
            const cart = cookies.cart ? cookies.cart.split(",") : [];

            if (cart.length > 0) {
                // Group product IDs and calculate quantities
                const cartWithQuantities = cart.reduce((acc, curr) => {
                    const existingItem = acc.find(item => item.product_id === parseInt(curr));
                    if (existingItem) {
                        existingItem.quantity += 1;
                    } else {
                        acc.push({
                            product_id: parseInt(curr),
                            quantity: 1,
                        });
                    }
                    return acc;
                }, []);

                try {
                    // Fetch product details for each unique product ID
                    const fetchPromises = cartWithQuantities.map(item =>
                        fetch(`${hostUrl}/api/products/${item.product_id}`)
                            .then(res => res.ok ? res.json() : null)
                    );

                    const productDetails = await Promise.all(fetchPromises);

                    // Combine product details with quantities
                    const detailedProducts = cartWithQuantities.map(item => {
                        const product = productDetails.find(
                            p => p && parseInt(p.product_id) === item.product_id
                        );
                        return product
                            ? { ...product, quantity: item.quantity }
                            : null; // Handle missing product details gracefully
                    }).filter(Boolean); // Remove nulls

                    setProducts(detailedProducts);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                }
            }

            setLoading(false);
        }

        fetchCartProducts();
    }, [cookies.cart]);

    // Calculate total cost
    const totalCost = products.reduce(
        (total, product) => total + product.cost * product.quantity,
        0
    );

    if (loading) return <p>Loading your cart...</p>;

    return (
        <div className="container mt-3">
            <h1>Shopping Cart</h1>
            {products.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <div>
                        {products.map((product, index) => (
                            <CartCard product={product} key={index} />
                        ))}
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                        <div>
                            <h4 className="mt-3">Tax: ${(totalCost * taxRate).toFixed(2)}</h4>
                            <h4 className="mt-3">Total Cost: ${(totalCost + (totalCost * taxRate)).toFixed(2)}</h4>
                        </div>
                        <div className="d-flex flex-column pt-3">
                            <Link to={"/"} className="btn btn-primary btn-sm m-1">Continue Shopping</Link>
                            <Link to={"/checkout"} className="btn btn-success btn-sm m-1">Proceed to Checkout</Link>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
