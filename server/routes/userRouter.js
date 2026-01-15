// routes/userRouter.js
import express from 'express';
import { getUserBookings } from '../controllers/bookingController.js';
import { protectUser } from '../middleware/auth.js'; // Add this middleware for Clerk user auth

const userRouter = express.Router();

userRouter.get('/bookings', protectUser, getUserBookings);

export default userRouter;
