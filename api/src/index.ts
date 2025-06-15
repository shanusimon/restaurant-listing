import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import restaurantRoutes from "./routes/restaurant.routes";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(cors({
  origin: 'http://localhost:5173', 
}));


app.use(express.json());

app.use('/api/restaurants',restaurantRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});