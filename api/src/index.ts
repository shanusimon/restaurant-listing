import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import restaurantRoutes from "./routes/restaurant.routes";
import cors from "cors";

dotenv.config();

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