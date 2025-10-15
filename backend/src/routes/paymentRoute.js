import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
    createPaymentIntent,
    sendStripePublishableKey,
} from "../controllers/paymentController.js";

const router = express.Router();

router.get("/config", protect, sendStripePublishableKey);
router.post("/create-payment-intent", protect, createPaymentIntent);

export default router;
