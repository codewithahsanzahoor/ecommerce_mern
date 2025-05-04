import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/productStore';

function HomePage() {
	const { products, fetchProducts } = useProductStore();

	React.useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	if (products.length === 0) {
		return (
			<div
				className='alert alert-info text-center'
				role='alert'
			>
				No products found
			</div>
		);
	}

	return (
		<div id='homePage'>
			<div className='album py-5 bg-light'>
				<div className='container'>
					<div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
						{products.map((product, index) => (
							<ProductCard
								product={product}
								key={index}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
