import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function Nav(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">

                <div className="d-flex justify-content-around align-items-center w-100 p-3">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/cart" className="nav-link"><CartIcon /></Link>

                    {props.isLoggedIn ?
                        <Link to="/logout" className="nav-link">Logout</Link> :
                        <Link to="/login" className="nav-link">Login</Link>
                    }
                    
                </div>
            </div>
        </nav>
    )
}