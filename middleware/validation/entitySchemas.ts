import { z } from "zod";

export const eventSchema = z.object({
  eventTitle: z.string({ required_error: "Event title is required" } as any).min(1, "Event title cannot be empty").max(100, "Event title too long"),
  eventDate: z.string({ required_error: "Event date is required" } as any).min(1, "Event date cannot be empty"),
  venue: z.string({ required_error: "Venue is required" } as any).min(1, "Venue cannot be empty"),
  time: z.string({ required_error: "Time is required" } as any).min(1, "Time cannot be empty"),
});

export const postSchema = z.object({
  postTitle: z.string({ required_error: "Post title is required" } as any).min(1, "Post title cannot be empty").max(100, "Post title too long"),
  postDesc: z.string({ required_error: "Post description is required" } as any).min(1, "Post description cannot be empty"),
});

export const healthSchema = z.object({
  healthTitle: z.string({ required_error: "Health title is required" } as any).min(1, "Health title cannot be empty").max(100, "Health title too long"),
  healthDesc: z.string({ required_error: "Health description is required" } as any).min(1, "Health description cannot be empty"),
});

export const contactSchema = z.object({
  firstName: z.string({ required_error: "First Name is required" } as any).min(2, "First Name must be at least 2 characters").max(30, "First Name cannot exceed 30 characters"),
  lastName: z.string({ required_error: "Last Name is required" } as any).min(2, "Last Name must be at least 2 characters").max(30, "Last Name cannot exceed 30 characters"),
  phone: z.string({ required_error: "Phone is required" } as any).min(1, "Phone cannot be empty"),
  email: z.string().email("Invalid email").optional().or(z.literal('')),
  purpose: z.enum(['prayer', 'baptism', 'membership', 'visitation', 'general', 'wedding']).optional(),
  message: z.string().optional().or(z.literal('')),
  additionalInfo: z.any().optional(), // Accept dynamic JSON string
});

export const personnelSchema = z.object({
  name: z.string({ required_error: "Name is required" } as any).min(1, "Name cannot be empty"),
  position: z.string({ required_error: "Position is required" } as any).min(1, "Position cannot be empty"),
  phone: z.string({ required_error: "Phone is required" } as any).min(1, "Phone cannot be empty"),
  email: z.string({ required_error: "Email is required" } as any).email("Invalid email format"),
});

export const reviewSchema = z.object({
  ReviewName: z.string({ required_error: "Review Name is required" } as any).min(1, "Review Name cannot be empty").max(100, "Review Name too long"),
  ReviewDesc: z.string({ required_error: "Review description is required" } as any).min(1, "Review description cannot be empty"),
});

export const resourceSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});

export const pdfSchema = z.object({
  name: z.string().optional(),
});

export const gallerySchema = z.object({
  department: z.enum(["Youth", "Women", "Music", "Amo"]).optional(),
});
