

import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/db.js";
import { clerkMiddleware, getAuth } from '@clerk/express';
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const app = express();
const port = 3000;

await connectDB();

// Stripe webhooks Route - Must be before express.json()
app.use('/api/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});


// MiddleWare
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// Optional: for debugging authentication
app.use((req, res, next) => {
  const { userId, sessionId } = getAuth(req);
  console.log("[DEBUG] getAuth userId:", userId, "sessionId:", sessionId);
  next();
});

// Routes
app.get('/', (req, res) => res.send("Server is Live!"));
app.use('/api/inngest', serve({ client: inngest, functions }));
app.use('/api/show', showRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/admin', adminRouter); // Correctly mounts the admin router
app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
