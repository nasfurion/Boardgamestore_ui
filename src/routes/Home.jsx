import { useEffect, useState } from "react"
import Card from "../ui/Card"

function Home(){
    const [boardGames, setBoardGames] = useState([]);

    const hostUrl = import.meta.env.VITE_APP_HOST;
    const url = hostUrl + "/api/products/all"

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                if (!ignore) {
                    setBoardGames(data);
                }
            } else {
                setBoardGames(null);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);

    return(
        <div className="d-flex flex-wrap justify-content-center">
            {
                boardGames.length > 0 ?
                    boardGames.map((item, index) => (
                       <Card product={item} key={index} /> 
                    )) :
                
                <h2>No products available</h2>
            }
        </div>
    ) 
}

export default Home