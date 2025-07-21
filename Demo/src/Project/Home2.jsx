import { useState, useEffect } from 'react';
import './ProductCardGenerator.css';

export default function ProductCardGenerator() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price) {
      if (editingId) {
        // Update existing product
        setProducts(products.map(product => 
          product.id === editingId 
            ? { ...formData, id: editingId }
            : product
        ));
        setEditingId(null);
      } else {
        // Add new product
        setProducts([...products, { ...formData, id: Date.now() }]);
      }
      setFormData({ name: '', price: '', image: '', description: '' });
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description
    });
    setEditingId(product.id);
  };

  const handleCancelEdit = () => {
    setFormData({ name: '', price: '', image: '', description: '' });
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="container">
      <h1 className="main-title">Product Card Generator</h1>
      
      {/* Form Section */}
      <div className="form-container">
        <h2 className="form-title">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>
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
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="form-button cancel-button"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="card-actions">
              <button
                onClick={() => handleEdit(product)}
                className="edit-button"
                title="Edit Product"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-button"
                title="Delete Product"
              >
                ×
              </button>
            </div>
            
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