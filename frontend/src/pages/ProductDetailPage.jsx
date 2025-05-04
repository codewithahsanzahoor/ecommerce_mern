import { Star, StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import useCartStore from '../store/cartStore';

function ProductDetailPage() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { fetchProduct, product: ProductDetail } = useProductStore();
	const { addToCart } = useCartStore();

	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const fetching = async () => {
			await fetchProduct(id); // Fetch product details using product id
		};
		fetching();
	}, [id, fetchProduct]);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleAddToCart = async (productId) => {
		// console.log(productId, inputValue);
		await addToCart(productId, parseInt(inputValue) || 1);
		navigate('/cart');
	};
	return (
		<div className='container mt-5'>
			<div className='row'>
				{/* Product Images */}
				{/* <div className='col-md-6 mb-4'>
					<img
						src={mainImage}
						alt='Product'
						className='img-fluid rounded mb-3 product-image'
					/>
					<div className='d-flex justify-content-between'>
						{images.map((img, index) => (
							<img
								key={index}
								src={img}
								alt={`Thumbnail ${index + 1}`}
								className={`thumbnail rounded ${
									activeIndex === index ? 'active' : ''
								}`}
								style={{
									cursor: 'pointer',
									width: '80px',
									height: '80px',
									border:
										activeIndex === index
											? '2px solid #0d6efd'
											: '1px solid #ccc',
								}}
								onClick={() => {
									setMainImage(img);
									setActiveIndex(index);
								}}
							/>
						))}
					</div>
				</div> */}

				{/* Product Details */}
				<div className='col-md-6'>
					<h2 className='mb-3'>{ProductDetail.name}</h2>
					{/* <p className='text-muted mb-4'>SKU: WH1000XM4</p> */}
					<div className='mb-3'>
						<span className='h4 me-2'>{ProductDetail.price}</span>
						{/* <span className='text-muted'>
							<s>$399.99</s>
						</span> */}
					</div>
					<div className='mb-3'>
						<i className='bi bi-star-fill text-warning' />
						<i className='bi bi-star-fill text-warning' />
						<i className='bi bi-star-fill text-warning' />
						<i className='bi bi-star-fill text-warning' />
						<i className='bi bi-star-half text-warning' />
						<span className='ms-2'></span>
					</div>
					<p className='mb-4'>{ProductDetail.description}</p>
					{/* <div className='mb-3'>
						<p className='mb-0'>Rating: </p>
						<div className='d-flex'>{stars}</div>
					</div> */}

					{/* <div className='mb-4'>
						<h5>Color:</h5>
						<div
							className='btn-group'
							role='group'
						>
							<input
								type='radio'
								className='btn-check'
								name='color'
								id='black'
								autoComplete='off'
								defaultChecked
							/>
							<label
								className='btn btn-outline-dark'
								htmlFor='black'
							>
								Black
							</label>
							<input
								type='radio'
								className='btn-check'
								name='color'
								id='silver'
								autoComplete='off'
							/>
							<label
								className='btn btn-outline-secondary'
								htmlFor='silver'
							>
								Silver
							</label>
							<input
								type='radio'
								className='btn-check'
								name='color'
								id='blue'
								autoComplete='off'
							/>
							<label
								className='btn btn-outline-primary'
								htmlFor='blue'
							>
								Blue
							</label>
						</div>
					</div> */}

					<div className='mb-4'>
						<label
							htmlFor='quantity'
							className='form-label'
						>
							Quantity:
						</label>
						<input
							type='number'
							className='form-control'
							id='quantity'
							value={inputValue}
							onChange={handleInputChange}
							min={1}
							style={{ width: 80 }}
						/>
					</div>

					<button
						className='btn btn-primary btn-lg mb-3 me-2'
						onClick={() => handleAddToCart(ProductDetail._id)}
					>
						<ShoppingCartIcon className='me-2' /> Add to Cart
					</button>
					{/* <button className='btn btn-outline-secondary btn-lg mb-3'>
						<HeartIcon className='me-2' /> Add to Wishlist
					</button> */}

					{/* <div className='mt-4'>
						<h5>Key Features:</h5>
						<ul>
							<li>Industry-leading noise cancellation</li>
							<li>30-hour battery life</li>
							<li>Touch sensor controls</li>
							<li>Speak-to-chat technology</li>
						</ul>
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default ProductDetailPage;
