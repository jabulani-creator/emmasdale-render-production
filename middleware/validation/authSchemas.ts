import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Name is required" } as any)
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" } as any)
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" } as any)
    .min(6, "Password must be at least 6 characters long"),
  position: z.string().optional(),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" } as any)
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" } as any)
    .min(1, "Password is required"),
});

export const updateUserSchema = z.object({
  name: z
    .string({ required_error: "Name is required" } as any)
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name cannot exceed 50 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" } as any)
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  lastname: z.string({ required_error: "Last name is required" } as any).min(1, "Last name cannot be empty"),
  position: z.string({ required_error: "Position is required" } as any).min(1, "Position cannot be empty"),
});
