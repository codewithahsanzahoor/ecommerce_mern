import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
	return (
		<div id='productCard'>
			<div className='col'>
				<div className='card shadow-sm'>
					<svg
						className='bd-placeholder-img card-img-top'
						width='100%'
						height={225}
						xmlns='http://www.w3.org/2000/svg'
						role='img'
						aria-label='Placeholder: Thumbnail'
						preserveAspectRatio='xMidYMid slice'
						focusable='false'
					>
						<title>{product.name}</title>
						<rect
							width='100%'
							height='100%'
							fill='#55595c'
						/>
						<text
							x='50%'
							y='50%'
							fill='#eceeef'
							dy='.3em'
						>
							Thumbnail
						</text>
					</svg>
					<div className='card-body'>
						<p className='card-text'>{product.name}</p>
						<div className='d-flex justify-content-between align-items-center'>
							<div className='btn-group'>
								<button
									type='button'
									className='btn btn-sm btn-outline-secondary'
								>
									<Link
										to={`/product/${product._id}`}
										className='text-decoration-none'
									>
										Buy
									</Link>
								</button>
							</div>
							<small className='text-muted'>
								{product.price}
							</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
