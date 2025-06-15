import { z } from "zod";

export const restaurantSchema = z.object({
  name: z.string().min(3, "Name is required"),
  address: z.object({
    street: z.string().min(3, "Street is required"),
    city: z.string().min(3, "City is required"),
    country: z.string().min(3, "Country is required"),
    postalCode: z.string().optional(),
  }),
  contact: z.object({
    phone: z.string().min(10, "Phone number is required"),
    email: z.string().email().optional(),
  }),
});
