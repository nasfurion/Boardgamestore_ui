import { Link } from "react-router-dom"
export default function Confirmation(){
    return (
        <>
            <h1>Confirmation:</h1>
            <p>Your purchase has been successful!</p>
            <Link to={"/"} className="btn btn-primary">Continue Shopping</Link>
        </>
    )
}