export default function CartCard(props) {
    const product = props.product

    const hostUrl = import.meta.env.VITE_APP_HOST;

    return (
        <div className="border rounded d-flex justify-content-around align-items-center m-2 p-2">
            <img src={`${hostUrl}/images/${product.image_filename}`} className="thumbnail rounded" alt="..." />
            <div>
                <h5>{product.name}</h5>
                <p>Price: ${product.cost}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Subtotal: ${(product.cost * product.quantity).toFixed(2)}</p>
            </div>
        </div>
    )
}