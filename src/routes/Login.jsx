import { useForm } from "react-hook-form"
import { useNavigate, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
    const navigate = useNavigate()
    // API URL
    const apiUrl = import.meta.env.VITE_APP_HOST + '/api/user/login';

    //react hook variables
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { isLoggedIn, setIsLoggedIn } = useOutletContext();

    async function formSubmit(data) {

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (response.ok) {
            setIsLoggedIn(true)

            // Redirect to login page
            navigate("/")

        } else {
            // Display error message
            alert("Login not successful.")
        }
    }



    return (
        <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit(formSubmit)} method="post" encType="form-data">
                <div className="mb-3">
                    <label className="form-label">E-Mail</label>
                    <input {...register("email", { required: true })} type="text" className="form-control bg-light" />
                    {errors.email && <span className="text-danger">E-Mail is required.</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input {...register("password", { required: true })} type="text" className="form-control bg-light" />
                    {errors.password && <span className="text-danger">Password is required.</span>}
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
            </form>

            <p>Don't have an account? <Link to={"/signup"}>Sign Up!</Link></p>
        </>
    )
}