import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';

function CartPage() {
	const [cartItems, setCartItems] = useState([]);
	const { fetchCart, updateCartItem, removeCartItem } = useCartStore();

	// Simulate fetching data from API
	useEffect(() => {
		const fetch = async () => {
			const cartItems = await fetchCart();

			setCartItems(cartItems);
		};

		fetch();
	}, [fetchCart]);

	// Handle quantity change
	const handleQuantityChange = async (productId, quantity) => {
		await updateCartItem(productId, quantity);
	};

	// Handle delete
	// const handleDelete = async (productId) => {
	// 	await removeCartItem(productId);
	// };

	// Calculate total
	// const total = cartItems.reduce((acc, item) => acc + item.price, 0);

	// console.log(cartItems);

	return (
		<div id='cart'>
			<div className='cart-wrapper'>
				<div className='container'>
					<div className='row g-4'>
						<div className='col-lg-8'>
							<div className='d-flex justify-content-between align-items-center mb-4'>
								<h4 className='mb-0'>Shopping Cart</h4>
								<span className='text-muted'>
									{cartItems.length} items
								</span>
							</div>
							<div className='d-flex flex-column gap-3'>
								{cartItems.map((item) => (
									<div
										key={item.id}
										className='product-card p-3 shadow-sm'
									>
										<div className='row align-items-center'>
											<div className='col-md-2'>
												<img
													src={item.image}
													alt={item.name}
													className='product-image'
												/>
											</div>
											<div className='col-md-4'>
												<h6 className='mb-1'>
													{item.name}
												</h6>
											</div>
											<div className='col-md-3'>
												<div className='d-flex align-items-center gap-2'>
													<button
														className='quantity-btn'
														onClick={() =>
															handleQuantityChange(
																item.items,
																-1
															)
														}
													>
														-
													</button>
													<input
														type='number'
														className='quantity-input'
														value={item.quantity}
														readOnly
													/>
													<button
														className='quantity-btn'
														onClick={() =>
															handleQuantityChange(
																item.id,
																1
															)
														}
													>
														+
													</button>
												</div>
											</div>
											<div className='col-md-2'>
												<span className='fw-bold'>
													$
													{(
														item.price *
														item.quantity
													).toFixed(2)}
												</span>
											</div>
											<div className='col-md-1'>
												<i
													className='bi bi-trash remove-btn'
													// onClick={() =>
													// 	// removeItem(item.id)
													// }
													style={{
														cursor: 'pointer',
													}}
												/>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* <div className='col-lg-4'>
							<div className='summary-card p-4 shadow-sm'>
								<h5 className='mb-4'>Order Summary</h5>
								<div className='d-flex justify-content-between mb-3'>
									<span className='text-muted'>Subtotal</span>
									<span>${subtotal.toFixed(2)}</span>
								</div>
								<hr />
								<div className='d-flex justify-content-between mb-4'>
									<span className='fw-bold'>Total</span>
									<span className='fw-bold'>
										${subtotal.toFixed(2)}
									</span>
								</div>
								<button className='btn btn-primary checkout-btn w-100 mb-3'>
									<Link
										to='/checkout'
										className='text-white text-decoration-none'
									>
										Checkout
									</Link>
								</button>
								<div className='d-flex justify-content-center gap-2'>
									<i className='bi bi-shield-check text-success' />
									<small className='text-muted'>
										Secure checkout
									</small>
								</div>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
