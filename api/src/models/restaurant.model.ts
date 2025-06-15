import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      country: {
        type: String,
        required: true,
        trim: true,
      },
      postalCode: {
        type: String,
        trim: true,
      },
    },
    contact: {
      phone: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model("Restaurant", restaurantSchema);
