import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import your routes
import queryRoute from "./routes/queryRoute.js";

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Parses incoming JSON data

// Basic health check route (optional, good for testing Vercel deployment)
app.get("/", (req, res) => {
  res.send("SuperValue Backend is running!");
});

// Mount the contact form route
app.use("/api", queryRoute);

// Add this right above export default app;
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend is running locally on http://localhost:${PORT}`);
  });
}

export default app;