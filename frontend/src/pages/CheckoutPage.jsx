import React, { useState } from 'react';
import { Trash, Plus, Minus } from 'lucide-react';

function CheckoutPage() {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		address: '',
		address2: '',
		country: '',
		state: '',
		zip: '',
		paymentMethod: 'credit',
		ccName: '',
		ccNumber: '',
		ccExpiration: '',
		ccCvv: '',
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[id]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Optional: Form validation logic here

		console.log('Form Data to Submit:', formData);

		// 🚀 Send data to backend
		// Example:
		// await axios.post('/api/checkout', formData);
	};

	return (
		<div id='checkout'>
			<div className='container mb-5'>
				<main>
					<div className='py-5 text-center'>
						<h2>Checkout Form</h2>
					</div>
					<div className='row g-5'>
						<div className='col-md-5 col-lg-4 order-md-last'>
							{/* Your cart UI stays same */}
						</div>
						<div className='col-md-7 col-lg-8'>
							<h4 className='mb-3'>Billing address</h4>
							<form onSubmit={handleSubmit}>
								<div className='row g-3'>
									<div className='col-sm-6'>
										<label htmlFor='firstName'>
											First name
										</label>
										<input
											type='text'
											id='firstName'
											className='form-control'
											value={formData.firstName}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='col-sm-6'>
										<label htmlFor='lastName'>
											Last name
										</label>
										<input
											type='text'
											id='lastName'
											className='form-control'
											value={formData.lastName}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='col-12'>
										<label htmlFor='username'>
											Username
										</label>
										<div className='input-group'>
											<span className='input-group-text'>
												@
											</span>
											<input
												type='text'
												id='username'
												className='form-control'
												value={formData.username}
												onChange={handleChange}
												required
											/>
										</div>
									</div>

									<div className='col-12'>
										<label htmlFor='email'>Email</label>
										<input
											type='email'
											id='email'
											className='form-control'
											value={formData.email}
											onChange={handleChange}
										/>
									</div>

									<div className='col-12'>
										<label htmlFor='address'>Address</label>
										<input
											type='text'
											id='address'
											className='form-control'
											value={formData.address}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='col-12'>
										<label htmlFor='address2'>
											Address 2
										</label>
										<input
											type='text'
											id='address2'
											className='form-control'
											value={formData.address2}
											onChange={handleChange}
										/>
									</div>

									<div className='col-md-5'>
										<label htmlFor='country'>Country</label>
										<select
											id='country'
											className='form-select'
											value={formData.country}
											onChange={handleChange}
											required
										>
											<option value=''>Choose...</option>
											<option value='USA'>USA</option>
											<option value='Pakistan'>
												Pakistan
											</option>
										</select>
									</div>

									<div className='col-md-4'>
										<label htmlFor='state'>State</label>
										<select
											id='state'
											className='form-select'
											value={formData.state}
											onChange={handleChange}
											required
										>
											<option value=''>Choose...</option>
											<option value='Punjab'>
												Punjab
											</option>
											<option value='Sindh'>Sindh</option>
										</select>
									</div>

									<div className='col-md-3'>
										<label htmlFor='zip'>Zip</label>
										<input
											type='text'
											id='zip'
											className='form-control'
											value={formData.zip}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<hr className='my-4' />
								<h4 className='mb-3'>Payment</h4>
								<div className='my-3'>
									<div className='form-check'>
										<input
											type='radio'
											id='credit'
											name='paymentMethod'
											className='form-check-input'
											checked={
												formData.paymentMethod ===
												'credit'
											}
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													paymentMethod: 'credit',
												}))
											}
										/>
										<label htmlFor='credit'>
											Credit Card
										</label>
									</div>

									<div className='form-check'>
										<input
											type='radio'
											id='debit'
											name='paymentMethod'
											className='form-check-input'
											checked={
												formData.paymentMethod ===
												'debit'
											}
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													paymentMethod: 'debit',
												}))
											}
										/>
										<label htmlFor='debit'>
											Debit Card
										</label>
									</div>

									<div className='form-check'>
										<input
											type='radio'
											id='paypal'
											name='paymentMethod'
											className='form-check-input'
											checked={
												formData.paymentMethod ===
												'paypal'
											}
											onChange={() =>
												setFormData((prev) => ({
													...prev,
													paymentMethod: 'paypal',
												}))
											}
										/>
										<label htmlFor='paypal'>PayPal</label>
									</div>
								</div>

								<div className='row gy-3'>
									<div className='col-md-6'>
										<label htmlFor='ccName'>
											Name on Card
										</label>
										<input
											type='text'
											id='ccName'
											className='form-control'
											value={formData.ccName}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='col-md-6'>
										<label htmlFor='ccNumber'>
											Card Number
										</label>
										<input
											type='text'
											id='ccNumber'
											className='form-control'
											value={formData.ccNumber}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='col-md-3'>
										<label htmlFor='ccExpiration'>
											Expiration
										</label>
										<input
											type='text'
											id='ccExpiration'
											className='form-control'
											value={formData.ccExpiration}
											onChange={handleChange}
											required
										/>
									</div>

									<div className='col-md-3'>
										<label htmlFor='ccCvv'>CVV</label>
										<input
											type='text'
											id='ccCvv'
											className='form-control'
											value={formData.ccCvv}
											onChange={handleChange}
											required
										/>
									</div>
								</div>

								<hr className='my-4' />
								<button
									type='submit'
									className='w-100 btn btn-primary btn-lg'
								>
									Continue to checkout
								</button>
							</form>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export default CheckoutPage;
