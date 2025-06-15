import express, { Router } from "express";
import { getAllRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from "../controllers/restaurant.controllers";

const router: Router = express.Router();

router.get("/", getAllRestaurant);       
router.post("/", createRestaurant);       
router.patch("/:id", updateRestaurant);   
router.delete("/:id", deleteRestaurant);   

export default router;