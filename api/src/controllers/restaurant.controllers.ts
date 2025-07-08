import restaurantModel from "../models/restaurant.model";
import { Request, Response } from "express";
import { restaurantSchema } from "../validators/restaurant.validator";
import { HTTP_STATUS, HTTP_MESSAGE } from "../constants/httpConstants";

export const createRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = restaurantSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: HTTP_MESSAGE.VALIDATION_ERROR,
        error: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const newRestaurant = new restaurantModel(parsed.data);
    const savedRestaurant = await newRestaurant.save();

    res.status(HTTP_STATUS.CREATED).json({
      message: HTTP_MESSAGE.CREATED_SUCCESS,
      data: savedRestaurant,
    });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    res.status(HTTP_STATUS.SERVER_ERROR).json({ message: HTTP_MESSAGE.SERVER_ERROR, error });
  }
};

export const getAllRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const restaurants = await restaurantModel.find().sort({ createdAt: -1 });

    res.status(HTTP_STATUS.OK).json({
      message: HTTP_MESSAGE.FETCH_SUCCESS,
      data: restaurants,
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res.status(HTTP_STATUS.SERVER_ERROR).json({ message: HTTP_MESSAGE.SERVER_ERROR, error });
  }
};

export const updateRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: HTTP_MESSAGE.ID_MISSING });
      return;
    }

    const parsedData = restaurantSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: HTTP_MESSAGE.VALIDATION_ERROR,
        error: parsedData.error.flatten().fieldErrors,
      });
      return;
    }

    const restaurant = await restaurantModel.findByIdAndUpdate(id, parsedData.data, {
      new: true,
      runValidators: true,
    });

    if (!restaurant) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: HTTP_MESSAGE.NOT_FOUND });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: HTTP_MESSAGE.UPDATE_SUCCESS,
      data: restaurant,
    });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res.status(HTTP_STATUS.SERVER_ERROR).json({ message: HTTP_MESSAGE.SERVER_ERROR, error });
  }
};

export const deleteRestaurant = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: HTTP_MESSAGE.ID_MISSING });
      return;
    }

    const deletedRestaurant = await restaurantModel.findByIdAndDelete(id);

    if (!deletedRestaurant) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: HTTP_MESSAGE.NOT_FOUND });
      return;
    }

    res.status(HTTP_STATUS.OK).json({
      message: HTTP_MESSAGE.DELETE_SUCCESS,
      data: deletedRestaurant,
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(HTTP_STATUS.SERVER_ERROR).json({ message: HTTP_MESSAGE.SERVER_ERROR, error });
  }
};
