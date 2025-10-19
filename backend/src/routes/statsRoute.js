import express from "express";
import { getStats } from "../controllers/statsController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET /api/stats
router.get("/", protect, admin, getStats);

// router.get("/", protect, admin, (req, res) => {
//     res.json({ user: req.user });
// });

export default router;
