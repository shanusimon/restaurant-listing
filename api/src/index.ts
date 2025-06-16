
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import restaurantRoutes from "./routes/restaurant.routes";
import cors from "cors";

console.log("ENV CHECK:", {
  PORT: process.env.PORT,
  CORS: process.env.CORS,
  MONGO_URL: process.env.MONGO_URL
});


const app = express();
const PORT = process.env.PORT;
const ALLOWED_URL = process.env.CORS

console.log(PORT,ALLOWED_URL);


connectDB();

app.use(cors({
  origin: ALLOWED_URL, 
}));


app.use(express.json());

app.use('/api/restaurants',restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});