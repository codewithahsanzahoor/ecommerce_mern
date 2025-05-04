import React, { useState } from 'react';

const ProductsPage = () => {
	const [products, setProducts] = useState([
		{ id: 1, name: 'Keyboard', price: 50, stock: 20 },
		{ id: 2, name: 'Mouse', price: 30, stock: 40 },
	]);

	const [formData, setFormData] = useState({
		id: null,
		name: '',
		price: '',
		stock: '',
	});
	const [isEditing, setIsEditing] = useState(false);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isEditing) {
			// Update product
			setProducts((prev) =>
				prev.map((p) =>
					p.id === formData.id ? { ...formData, id: p.id } : p
				)
			);
			setIsEditing(false);
		} else {
			// Create new product
			const newProduct = {
				...formData,
				id: Date.now(),
			};
			setProducts((prev) => [...prev, newProduct]);
		}

		// Reset form
		setFormData({ id: null, name: '', price: '', stock: '' });
	};

	const handleEdit = (product) => {
		setFormData(product);
		setIsEditing(true);
	};

	const handleDelete = (id) => {
		setProducts((prev) => prev.filter((p) => p.id !== id));
	};

	return (
		<div className='container mt-4'>
			<h3>Manage Products</h3>

			<form
				onSubmit={handleSubmit}
				className='row g-3 mb-4'
			>
				<div className='col-md-4'>
					<input
						type='text'
						className='form-control'
						placeholder='Product Name'
						name='name'
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-3'>
					<input
						type='number'
						className='form-control'
						placeholder='Price'
						name='price'
						value={formData.price}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-3'>
					<input
						type='number'
						className='form-control'
						placeholder='Stock'
						name='stock'
						value={formData.stock}
						onChange={handleChange}
						required
					/>
				</div>
				<div className='col-md-2 d-grid'>
					<button
						type='submit'
						className='btn btn-success'
					>
						{isEditing ? 'Update' : 'Add'} Product
					</button>
				</div>
			</form>

			<table className='table table-striped table-bordered'>
				<thead>
					<tr>
						<th>#</th>
						<th>Name</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr key={product.id}>
							<td>{index + 1}</td>
							<td>{product.name}</td>
							<td>${product.price}</td>
							<td>{product.stock}</td>
							<td>
								<button
									className='btn btn-sm btn-primary me-2'
									onClick={() => handleEdit(product)}
								>
									Edit
								</button>
								<button
									className='btn btn-sm btn-danger'
									onClick={() => handleDelete(product.id)}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProductsPage;
