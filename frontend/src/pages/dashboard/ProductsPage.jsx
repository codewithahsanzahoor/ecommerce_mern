import React, { useState, useEffect } from 'react';
import useProductStore from '../../store/productStore';

const ProductsPage = () => {
  const {
    products,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading,
  } = useProductStore();

  const [formData, setFormData] = useState({
    _id: null,
    name: '',
    price: '',
    description: '',
    brand: '',
    category: '',
    countInStock: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateProduct(formData._id, formData);
      setIsEditing(false);
    } else {
      await createProduct(formData);
    }
    // Reset form
    setFormData({ _id: null, name: '', price: '', description: '', brand: '', category: '', countInStock: '' });
  };

  const handleEdit = (product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className='container mt-4'>
      <h3>Manage Products</h3>

      <form onSubmit={handleSubmit} className='row g-3 mb-4 align-items-end'>
        <div className='col-md-3'>
          <label>Name</label>
          <input type='text' className='form-control' placeholder='Product Name' name='name' value={formData.name} onChange={handleChange} required />
        </div>
        <div className='col-md-2'>
          <label>Price</label>
          <input type='number' className='form-control' placeholder='Price' name='price' value={formData.price} onChange={handleChange} required />
        </div>
        <div className='col-md-3'>
          <label>Description</label>
          <input type='text' className='form-control' placeholder='Description' name='description' value={formData.description} onChange={handleChange} required />
        </div>
        <div className='col-md-2'>
          <label>Brand</label>
          <input type='text' className='form-control' placeholder='Brand' name='brand' value={formData.brand} onChange={handleChange} required />
        </div>
        <div className='col-md-2'>
          <label>Category</label>
          <input type='text' className='form-control' placeholder='Category' name='category' value={formData.category} onChange={handleChange} required />
        </div>
        <div className='col-md-2'>
          <label>Stock</label>
          <input type='number' className='form-control' placeholder='Stock' name='countInStock' value={formData.countInStock} onChange={handleChange} required />
        </div>
        <div className='col-md-2 d-grid'>
          <button type='submit' className='btn btn-success'>
            {isEditing ? 'Update' : 'Add'} Product
          </button>
        </div>
      </form>

      {loading ? <p>Loading...</p> : (
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button className='btn btn-sm btn-primary me-2' onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button className='btn btn-sm btn-danger' onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductsPage;
