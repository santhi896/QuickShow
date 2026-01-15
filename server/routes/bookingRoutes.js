import express from 'express';
import { createBooking, getOccupiedSeats,getUserBookings } from '../controllers/bookingController.js';
import { requireAuth } from '@clerk/express';

const bookingRouter = express.Router();

bookingRouter.post('/create',createBooking)
bookingRouter.get('/seats/:showId',getOccupiedSeats);
bookingRouter.get('/user/bookings', requireAuth, getUserBookings);

export default bookingRouter;
