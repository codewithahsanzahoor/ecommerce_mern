import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';
import toast from 'react-hot-toast';

// --- Stripe Promise --- //
// You must call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
let stripePromise;
const getStripePromise = async () => {
  if (!stripePromise) {
    const { data } = await api.get('/payment/config');
    stripePromise = loadStripe(data.publishableKey);
  }
  return stripePromise;
};

// --- Checkout Form Component --- //
const CheckoutForm = ({ orderDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();
  const { createOrder, markAsPaid } = useOrderStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    setIsProcessing(true);

    try {
      // 1. Create the order in our database
      const newOrder = await createOrder(orderDetails);
      if (!newOrder) {
        throw new Error('Failed to create order before payment.');
      }

      // 2. Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/profile`,
        },
        redirect: 'if_required', // Important: Prevents immediate redirection
      });

      if (error) {
        toast.error(error.message);
        // Optional: Delete the created order if payment fails
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 3. Mark the order as paid
        await markAsPaid(newOrder._id);
        toast.success('Payment successful!');
        clearCart();
        navigate('/profile');
      } else {
        toast.error('Payment did not succeed.');
      }
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" className="btn btn-primary w-100 mt-4" disabled={isProcessing || !stripe || !elements}>
        {isProcessing ? 'Processing...' : `Pay $${orderDetails.totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};

// --- Payment Page Component --- //
const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useCartStore.getState(); // Get latest state

  useEffect(() => {
    // If there's no total price or the cart is empty, redirect
    if (!totalPrice || totalPrice <= 0) {
      toast.error('Your cart is empty or total is invalid.');
      navigate('/cart');
      return;
    }

    const createPaymentIntent = async () => {
      try {
        const { data } = await api.post('/payment/create-payment-intent', {
          amount: Math.round(totalPrice * 100), // Amount in cents
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error('Failed to initialize payment. Please try again.');
        navigate('/checkout');
      }
    };

    createPaymentIntent();
    getStripePromise(); // Pre-load stripe
  }, [totalPrice, navigate]);

  const orderDetails = {
    orderItems: cartItems.map(item => ({...item, product: item._id})),
    totalPrice,
    // You should get shippingAddress and paymentMethod from a form in a previous step
    shippingAddress: { address: '123 Main St', city: 'Anytown', postalCode: '12345', country: 'USA' },
    paymentMethod: 'Stripe',
  };

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Complete Your Payment</h3>
              {clientSecret && (
                <Elements options={options} stripe={getStripePromise()}>
                  <CheckoutForm orderDetails={orderDetails} />
                </Elements>
              )}
              {!clientSecret && <p className="text-center">Loading payment form...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
