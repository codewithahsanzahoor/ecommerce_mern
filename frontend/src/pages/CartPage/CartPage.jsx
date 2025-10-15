import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';

function CartPage() {
  const { cartItems: getCartItems, totalPrice: getTotalPrice, updateCartItem, removeCartItem, clearCart } = useCartStore();
  const cartItems = getCartItems();
  const totalPrice = getTotalPrice();

  return (
    <div id='cart'>
      <div className='cart-wrapper'>
        <div className='container'>
          <div className='row g-4'>
            <div className='col-lg-8'>
              <div className='d-flex justify-content-between align-items-center mb-4'>
                <h4 className='mb-0'>Shopping Cart</h4>
                <span className='text-muted'>{cartItems.length} items</span>
              </div>
              {cartItems.length === 0 ? (
                <div className="alert alert-info">Your cart is empty. <Link to="/">Go shopping</Link></div>
              ) : (
                <div className='d-flex flex-column gap-3'>
                  {cartItems.map((item) => (
                    <div key={item.product._id} className='product-card p-3 shadow-sm'>
                      <div className='row align-items-center'>
                        <div className='col-md-2'>
                          <img src={item.product.image || '/placeholder.png'} alt={item.product.name} className='product-image' />
                        </div>
                        <div className='col-md-4'>
                          <h6 className='mb-1'>{item.product.name}</h6>
                        </div>
                        <div className='col-md-3'>
                          <div className='d-flex align-items-center gap-2'>
                            <button className='quantity-btn' onClick={() => updateCartItem(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                            <input type='number' className='quantity-input' value={item.quantity} readOnly />
                            <button className='quantity-btn' onClick={() => updateCartItem(item.product._id, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                        <div className='col-md-2'>
                          <span className='fw-bold'>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div className='col-md-1'>
                          <button className='btn btn-sm btn-danger' onClick={() => removeCartItem(item.product._id)}>Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className='col-lg-4'>
              <div className='summary-card p-4 shadow-sm'>
                <h5 className='mb-4'>Order Summary</h5>
                <div className='d-flex justify-content-between mb-3'>
                  <span className='text-muted'>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <hr />
                <div className='d-flex justify-content-between mb-4'>
                  <span className='fw-bold'>Total</span>
                  <span className='fw-bold'>${totalPrice.toFixed(2)}</span>
                </div>
                <Link to='/checkout' className='btn btn-primary checkout-btn w-100 mb-3'>
                  Checkout
                </Link>
                <button onClick={clearCart} className='btn btn-outline-danger w-100'>Clear Cart</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;