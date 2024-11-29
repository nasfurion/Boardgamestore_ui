import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";


export default function Details() {
    const { id } = useParams()
    const [boardGame, setBoardGame] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(["cart"]);

    const hostUrl = import.meta.env.VITE_APP_HOST;
    const getUrl = hostUrl + `/api/products/${id}`;


    useEffect(() => {
        // Fetch data from API
        async function fetchData() {

            const response = await fetch(getUrl);
            if (response.ok) {
                const data = await response.json();
                if (!ignore) {
                    setBoardGame(data);
                    console.log(boardGame)
                }
            } else {
                setBoardGame(null);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);

    // Add a product to the cart cookie
    const addToCart = (productId) => {
        
        // Retrieve the current cart value or default to an empty string
        const currentCart = cookies.cart || '';

        // Create a new cart value by appending the new product ID
        const updatedCart = currentCart ? `${currentCart},${productId}` : productId;

        // Update the cookie with the new cart value
        setCookie('cart', updatedCart, { maxAge: 3600 });
    };

    return (
        boardGame &&
        <div className="d-flex flex-column align-items-center">
            <div className="link card m-2">
                <img src={`${hostUrl}/images/${boardGame.image_filename}`} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{boardGame.name}</h5>
                    <p className="card-text">{boardGame.description}</p>
                    <p>Price: {boardGame.cost}$</p>
                </div>
            </div>
            <div>
                <button className="btn btn-success btn-sm m-1" onClick={() => addToCart(id)}>Add to cart</button>
                <Link to={"/"} className="btn btn-primary btn-sm m-1">Back to Homepage</Link>
            </div>
        </div>





    )
}