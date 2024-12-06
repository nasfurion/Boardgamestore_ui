import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form"

export default function Checkout() {
    const navigate = useNavigate()
    const { isLoggedIn, setIsLoggedIn } = useOutletContext();

    const [cookies, setCookie] = useCookies(["cart"]);
    // API URL
    const apiUrl = import.meta.env.VITE_APP_HOST + '/api/products/purchase';

    //react hook variables
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function formSubmit(data) {
        const cart = cookies.cart;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...data,
                cart: cart
            }),
            credentials: 'include'
        });

        if (response.ok) {
            setCookie("cart", "", { path: "/" });
            navigate("/confirmation")
        } else {
            // Display error message
            alert("Purchase not successful. Try again.")

        }
    }

    return (
        <>
            <h1>Checkout</h1>

            {isLoggedIn ?
                <div>
                    <form onSubmit={handleSubmit(formSubmit)} method="post" encType="form-data">
                        <div className="mb-3">
                            <label className="form-label">Street</label>
                            <input {...register("street", { required: true })} type="text" className="form-control bg-light" />
                            {errors.street && <span className="text-danger">Street is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input {...register("city", { required: true })} type="text" className="form-control bg-light" />
                            {errors.city && <span className="text-danger">City is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Province</label>
                            <input {...register("province", { required: true })} type="text" className="form-control bg-light" />
                            {errors.province && <span className="text-danger">E-Mail is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input {...register("country", { required: true })} type="text" className="form-control bg-light" />
                            {errors.country && <span className="text-danger">Password is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Postal Code</label>
                            <input {...register("postal_code", { required: true })} type="text" className="form-control bg-light" />
                            {errors.postalCode && <span className="text-danger">Postal Code is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Credit Card Number</label>
                            <input {...register("credit_card", { required: true })} type="text" className="form-control bg-light" />
                            {errors.creditCard && <span className="text-danger">Credit Card Number is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Credit Card Expiry Date</label>
                            <input {...register("credit_expire", { required: true })} type="text" className="form-control bg-light" />
                            {errors.creditExpire && <span className="text-danger">Credit Card Expiry Date is required.</span>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">CVV</label>
                            <input {...register("credit_cvv", { required: true })} type="text" className="form-control bg-light" />
                            {errors.cvv && <span className="text-danger">CVV is required.</span>}
                        </div>

                        <button type="submit" className="btn btn-primary">Complete Purchase</button>
                    </form>
                </div> :
                <div>
                    <h2>You are not Logged In</h2>
                    <Link to={"/login"} className="btn btn-success">LogIn</Link>
                </div>

            }



        </>
    )
}