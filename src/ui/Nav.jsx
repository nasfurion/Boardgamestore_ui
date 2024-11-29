import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <div className="d-flex justify-content-around align-items-center w-100">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/cart" className="nav-link">Cart</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/logout" className="nav-link">Logout</Link>
                </div>
            </div>
        </nav>
    )
}