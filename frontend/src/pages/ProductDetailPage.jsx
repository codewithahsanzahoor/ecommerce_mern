import { Star, StarIcon, ShoppingCartIcon, HeartIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import useProductStore from '../store/productStore';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

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

      {/* Reviews Section */}
      <div className="row mt-5">
        <div className="col-md-8">
          <h3>Reviews ({ProductDetail.reviews?.length || 0})</h3>
          {ProductDetail.reviews && ProductDetail.reviews.length > 0 ? (
            <ul className="list-group">
              {ProductDetail.reviews.map((review) => (
                <li key={review._id} className="list-group-item">
                  <strong>{review.name}</strong>
                  <div className="mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} fill={i < review.rating ? 'gold' : 'gray'} size={16} />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                  <small className="text-muted">{new Date(review.createdAt).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Write a Review Form */}
      <div className="row mt-4">
        <div className="col-md-8">
          <h4>Write a Customer Review</h4>
          <ReviewForm productId={id} />
        </div>
      </div>
		</div>
	);
}

// --- Review Form Component --- //
const ReviewForm = ({ productId }) => {
  const { createReview } = useProductStore();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { user, isAuthenticated } = useAuthStore.getState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Please enter a comment.');
      return;
    }
    await createReview(productId, { rating, comment });
    setComment('');
    setRating(5);
  };

  if (!isAuthenticated) {
    return <p>Please <Link to="/login">log in</Link> to write a review.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rating</label>
        <select id="rating" className="form-select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Good</option>
          <option value="3">3 - Average</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="comment" className="form-label">Comment</label>
        <textarea id="comment" className="form-control" rows="3" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit Review</button>
    </form>
  );
};
export default ProductDetailPage;
