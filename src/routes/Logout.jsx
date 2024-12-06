import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom";

export default function Logout() {
    
    const [status, setStatus] = useState("Logging out...");
    // API URL
    const apiUrl = import.meta.env.VITE_APP_HOST + '/api/user/logout';

    const {isLoggedIn, setIsLoggedIn} = useOutletContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function logOut() {
            const response = await fetch(apiUrl, {
                method: 'POST',
                credentials: 'include'
            });
    
            if (response.ok) {
                setIsLoggedIn(false);
                
                setStatus('Logout successful. You will be redirected to the Home Page!');

                setTimeout(() => {
                    navigate("/")
                }, 1500);
            } else {
                setStatus('Logout not successful. Try again!');
            }
        }
    
        logOut()
    }, [])
    

    return (
        <>
            <h1>Logout</h1>
            <p>{status}</p>
        </>
    )

}