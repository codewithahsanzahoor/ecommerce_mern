import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

connectDB();

// Routes
import authRoute from "./routes/authRoute.js";
app.use("/api/auth", authRoute);
import userRoute from "./routes/userRoute.js";
app.use("/api/users", userRoute);
import productRoute from "./routes/productRoute.js";
app.use("/api/products", productRoute);
import orderRoutes from "./routes/orderRoute.js";
app.use("/api/orders", orderRoutes);
import cartRoutes from "./routes/cartRoute.js";
app.use("/api/cart", cartRoutes);
import paymentRoute from "./routes/paymentRoute.js";
app.use("/api/payment", paymentRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});