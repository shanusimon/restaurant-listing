import { z } from "zod";


export const restaurantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Restaurant name must be at least 3 characters")
    .regex(/^[A-Za-z\s'-]+$/, "Restaurant name must contain only letters and spaces"),

  address: z.object({
    street: z
      .string()
      .trim()
      .min(3, "Street is required")
      .regex(/^[\w\s,'-]+$/, "Street must contain only valid characters"),

    city: z
      .string()
      .trim()
      .min(3, "City is required")
      .regex(/^[A-Za-z\s'-]+$/, "City must contain only letters and spaces"),

    country: z
      .string()
      .trim()
      .min(3, "Country is required")
      .regex(/^[A-Za-z\s'-]+$/, "Country must contain only letters and spaces"),

    postalCode: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9\s-]*$/, "Postal code contains invalid characters")
      .optional(),
  }),

  contact: z.object({
    phone: z
      .string()
      .trim()
      .min(10, "Phone number must be at least 10 digits")
      .regex(/^\+?\d{10,15}$/, "Invalid phone number format"),

    email: z
      .string()
      .trim()
      .or(z.literal(""))
      .refine(
        (val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        "Invalid email address"
      ),
  }),
});
export const validateWithZod = (values: any) => {
  const result = restaurantSchema.safeParse(values);
  const errors: any = {};

  if (!result.success) {
    for (const issue of result.error.issues) {
      const path = issue.path.join('.');
      errors[path] = issue.message;
    }
  }

  return errors;
};