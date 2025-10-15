import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Send Stripe publishable key to client
// @route   GET /api/payment/config
// @access  Private
export const sendStripePublishableKey = (req, res) => {
    res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

// @desc    Create a payment intent
// @route   POST /api/payment/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
    const { amount } = req.body; // Amount should be in the smallest currency unit (e.g., cents)

    if (!amount || amount <= 0) {
        return res.status(400).json({ message: "Invalid amount" });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd", // or your desired currency
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Stripe Error:", error);
        res.status(500).json({
            message: "Failed to create payment intent",
            error: error.message,
        });
    }
};
