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

    // Update cart cookie with the correct cart data
    const updateCartCookie = (updatedCart) => {
        setCookie("cart", updatedCart.join(","), { path: "/" });
    };

    // Add item to cart
    const addItem = (productId) => {
        var cart;

        if (cookies.cart) {
            if (cookies.cart.toString().length == 1) {
                cart = [cookies.cart]
            } else {
                cart = cookies.cart.split(",")
            }
        } else {
            cart = []
        }
        cart.push(productId.toString());
        updateCartCookie(cart);
    };

    const removeItem = (productId) => {
        let cart;

        if (cookies.cart) {
            cart = cookies.cart.toString().split(",");
        } else {
            cart = [];
        }

        // Find the index of the productId in the cart
        const index = cart.indexOf(productId.toString());

        if (index > -1) {
            // Remove the product from the cart
            cart.splice(index, 1);
        }

        // If the cart is empty after removal, clear the cookie
        if (cart.length === 0) {
            setCookie("cart", "", { path: "/" });
            setProducts([]);
        } else {
            updateCartCookie(cart);  // Otherwise, update the cart cookie with the new list
        }
    };

    useEffect(() => {
        async function fetchCartProducts() {
            var cart;

            if (cookies.cart) {
                if (cookies.cart.toString().length == 1) {
                    cart = [cookies.cart]
                } else {
                    cart = cookies.cart.split(",")
                }
            } else {
                cart = []
            }
            if (cart.length > 0) {
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
                    const fetchPromises = cartWithQuantities.map(item =>
                        fetch(`${hostUrl}/api/products/${item.product_id}`)
                            .then(res => res.ok ? res.json() : null)
                    );

                    const productDetails = await Promise.all(fetchPromises);

                    const detailedProducts = cartWithQuantities.map(item => {
                        const product = productDetails.find(
                            p => p && parseInt(p.product_id) === item.product_id
                        );
                        return product
                            ? { ...product, quantity: item.quantity }
                            : null;
                    }).filter(Boolean);

                    setProducts(detailedProducts);
                } catch (error) {
                    console.error("Error fetching product details:", error);
                }
            }

            setLoading(false);
        }

        fetchCartProducts();
    }, [cookies.cart]);

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
                            <CartCard
                                product={product}
                                key={index}
                                onAdd={() => addItem(product.product_id)}
                                onRemove={() => removeItem(product.product_id)}
                            />
                        ))}
                    </div>
                    <div className="d-flex justify-content-around align-items-center">
                        <div>
                            <h4 className="mt-3">SubTotal: ${(totalCost).toFixed(2)}</h4>
                            <h4 className="mt-3">Tax: ${(totalCost * taxRate).toFixed(2)}</h4>
                            <h4 className="mt-3">Final Cost: ${(totalCost + (totalCost * taxRate)).toFixed(2)}</h4>
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