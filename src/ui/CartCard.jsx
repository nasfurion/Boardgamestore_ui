export default function CartCard({ product, onAdd, onRemove }) {
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
            <div className="d-flex flex-column">
                <button onClick={onAdd} className="btn btn-sm btn-success mb-2">+</button>
                <button onClick={onRemove} className="btn btn-sm btn-danger">-</button>
            </div>
        </div>
    );
}