import restaurantModel from "../models/restaurant.model";
import { Request, Response } from "express";
import { restaurantSchema } from "../validators/restaurant.validator";

export const createRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = restaurantSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: "Validation error",
        error: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const newRestaurant = new restaurantModel(parsed.data);
    const savedRestaurant = await newRestaurant.save();

    res.status(201).json({
      message: "Restaurant created successfully",
      data: savedRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getAllRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurants = await restaurantModel.find();
    res.status(200).json({
      message: "Restaurants fetched successfully",
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Restaurant ID is not provided" });
      return;
    }
    const parsedData = restaurantSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "Validation error",
        error: parsedData.error.flatten().fieldErrors,
      });
      return;
    }
    const restaurant = await restaurantModel.findByIdAndUpdate(
      id,
      parsedData.data,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }
    res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Restaurant ID is not provided" });
      return;
    }

    const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      res.status(404).json({ message: "Restaurant not found" });
      return;
    }

    res.status(200).json({
      message: "Restaurant deleted successfully",
      data: deletedRestaurant,
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
