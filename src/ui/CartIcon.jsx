import { useCookies } from "react-cookie";

export default function CartIcon() {
    const [cookies] = useCookies(["cart"]);

    var cartItems;

    if (cookies.cart) {
        if (cookies.cart.toString().length == 1) {
            cartItems = 1
        } else {
            cartItems = cookies.cart.split(",").length
        }
    } else {
        cartItems = 0
    }

    return (
        <div className="cart-icon">
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
            {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
        </div>
    );
}