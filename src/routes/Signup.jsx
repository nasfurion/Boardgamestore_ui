import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate()
    // API URL
    const apiUrl = import.meta.env.VITE_APP_HOST + '/api/user/signup';

    //react hook variables
    const { register, handleSubmit, formState: { errors } } = useForm();

    async function formSubmit(data) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.ok) {
            // Redirect to login page

            navigate("/login")
            console.log("successful")
        } else {
            // Display error message
            const errorData = await response.json();
            
            if (errorData.error) {
                alert(`Sign-up failed: \n- ${errorData.error.join('\n- ')}`);
            } else {
                alert("Sign-up not successful. Please try again.");
            }
        }
    }

    return (
        <>
            <h1>Sign Up</h1>

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
                <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input {...register("firstName", { required: true })} type="text" className="form-control bg-light" />
                    {errors.firstName && <span className="text-danger">First Name is required.</span>}
                </div>
                <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input {...register("lastName", { required: true })} type="text" className="form-control bg-light" />
                    {errors.lastName && <span className="text-danger">Last Name is required.</span>}
                </div>

                <button type="submit" className="btn btn-primary">Create Account</button>
                <Link to="/" className="btn btn-outline-secondary ms-3">Cancel</Link>
            </form>
        </>
    )
}

