import { useState } from 'react';
import './ProductCardGenerator.css';

function ProductCardGenerator() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      setProducts([...products, { ...formData, id: Date.now() }]);
      setFormData({ name: '', price: '', image: '', description: '' });
    }
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container">
      <h1 className="main-title">Product Card Generator</h1>
      
      {/* Form Section */}
      <div className="form-container">
        <h2 className="form-title">Add New Product</h2>
        <div onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-textarea"
            />
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="form-button"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <button
              onClick={() => handleDelete(product.id)}
              className="delete-button"
            >
              ×
            </button>
            
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">${product.price}</p>
            
            {product.description && (
              <p className="product-description">{product.description}</p>
            )}
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="empty-state">
          No products added yet. Add your first product above!
        </div>
      )}
    </div>
  );
}

export default ProductCardGenerator;