import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(express.json());
dotenv.config();
connectDB();

app.use(morgan('dev'));

// Routes
// auth routes
import authRoute from './routes/authRoute.js';
app.use('/api/auth', authRoute);
// user routes
import userRoute from './routes/userRoute.js';
app.use('/api/users', userRoute);
// product routes
import productRoute from './routes/productRoute.js';
app.use('/api/products', productRoute);
// order routes
import orderRoutes from './routes/orderRoute.js';
app.use('/api/orders', orderRoutes);
// cart routes
import cartRoutes from './routes/cartRoute.js';
app.use('/api/cart', cartRoutes);

// payment routes
import paymentRoute from './routes/paymentRoute.js';
app.use('/api/payment', paymentRoute);

app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
