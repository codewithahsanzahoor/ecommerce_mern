import { ShoppingBasketIcon } from 'lucide-react';
import React, { useState } from 'react';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login } = useAuthStore();
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log({ email, password });
		await login(email, password);
		navigate('/');
	};

	return (
		<main className='form-signin'>
			<form onSubmit={handleSubmit}>
				<ShoppingBasketIcon
					size={90}
					color='#000'
					className='mb-4'
				/>
				<h1 className='h3 mb-3 fw-normal'>Please sign in</h1>
				<div className='form-floating'>
					<input
						type='email'
						className='form-control'
						id='floatingInput'
						placeholder='name@example.com'
						name='email'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<label htmlFor='floatingInput'>Email address</label>
				</div>
				<div className='form-floating mb-3'>
					<input
						type='password'
						className='form-control'
						id='floatingPassword'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<label htmlFor='floatingPassword'>Password</label>
				</div>
				{/* <div className='checkbox mb-3'>
					<label>
						<input
							type='checkbox'
							defaultValue='remember-me'
						/>{' '}
						Remember me
					</label>
				</div> */}
				<button
					className='w-100 btn btn-lg btn-primary'
					type='submit'
				>
					Sign in
				</button>
				<p className='mt-5 mb-3 text-muted'>© 2025</p>
			</form>
		</main>
	);
}

export default LoginPage;
