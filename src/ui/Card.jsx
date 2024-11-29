import { Link } from "react-router-dom";

export default function Card(props) {

    const boardgame = props.product

    const hostUrl = import.meta.env.VITE_APP_HOST;

    return (
        <Link to={`/details/${boardgame.product_id}`}className="link card preview m-2" key={props.index}>
            <img src={`${hostUrl}/images/${boardgame.image_filename}`} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{boardgame.name}</h5>
                    <p className="card-text">{boardgame.description}</p>
                    <p>{boardgame.cost}$</p>
                </div>
        </Link>
    )


}