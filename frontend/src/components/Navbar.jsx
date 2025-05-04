import React from 'react';
import { Link } from 'react-router-dom';
import { HeartCrackIcon, ShoppingCartIcon } from 'lucide-react';
import useAuthStore from '../store/authStore';

function Navbar() {
	const { user, logout } = useAuthStore();
	const logoutHandler = async () => await logout();
	return (
		<div id='navbar'>
			<div className='container'>
				<header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
					<Link
						to='/'
						className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'
					>
						<HeartCrackIcon size={32} />
					</Link>
					<ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0'>
						<li>
							<Link
								to='/'
								className='nav-link px-2 link-secondary'
							>
								Home
							</Link>
						</li>
					</ul>
					<div className='col-md-3 text-end'>
						<button
							type='button'
							className='btn btn-outline-primary me-2'
						>
							<Link to='/cart'>
								<ShoppingCartIcon
									size={24}
									className='ml-2 cursor-pointer text-dark'
								/>
							</Link>
						</button>

						{!user && (
							<>
								<button
									type='button'
									className='btn btn-outline-primary me-2'
								>
									<Link
										to='/login'
										className='text-decoration-none text-dark'
									>
										Login
									</Link>
								</button>
								<button
									type='button'
									className='btn btn-primary me-2'
								>
									<Link
										to='/register'
										className='text-dark text-decoration-none'
									>
										Register
									</Link>
								</button>
							</>
						)}
						{user && (
							<button
								type='button'
								className='btn btn-outline-danger'
								onClick={() => logoutHandler()}
							>
								Logout
							</button>
						)}
					</div>
				</header>
			</div>
		</div>
	);
}

export default Navbar;
