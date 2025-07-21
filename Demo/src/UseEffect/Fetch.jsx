import { useState,useEffect } from "react";
import './Fetch.css'

function ProductList(){
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data);
            setLoading(false);
        });
    },[]);

    if (loading) return <p className="loading">Loading...</p>

    return(
        <div className="product-list">
            {products.map(product=>(
                <div key={product.id} className="product-card">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">{product.price}</p>
                    <img src={product.image} alt={product.title} width={100} className="product-image" />
                </div>
            ))}
        </div>
    );
}
export default ProductList;