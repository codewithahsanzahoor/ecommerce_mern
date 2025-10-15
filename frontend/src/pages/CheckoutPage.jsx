import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCartStore();

  const handleProceedToPayment = () => {
    // Here you could save shipping info if you had a form for it.
    // For now, we navigate directly to the payment page.
    navigate('/payment');
  };

  return (
    <div className='container my-5'>
      <main>
        <div className='py-5 text-center'>
          <h2>Order Summary</h2>
          <p className='lead'>Review your items before proceeding to payment.</p>
        </div>
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <h4 className='d-flex justify-content-between align-items-center mb-3'>
              <span className='text-primary'>Your cart</span>
              <span className='badge bg-primary rounded-pill'>{cartItems.length}</span>
            </h4>
            <ul className='list-group mb-3'>
              {cartItems.map((item) => (
                <li key={item._id} className='list-group-item d-flex justify-content-between lh-sm'>
                  <div>
                    <h6 className='my-0'>{item.name}</h6>
                    <small className='text-muted'>Quantity: {item.quantity}</small>
                  </div>
                  <span className='text-muted'>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
              <li className='list-group-item d-flex justify-content-between'>
                <span>Total (USD)</span>
                <strong>${totalPrice.toFixed(2)}</strong>
              </li>
            </ul>
            <button
              onClick={handleProceedToPayment}
              className='w-100 btn btn-primary btn-lg'
              disabled={cartItems.length === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
