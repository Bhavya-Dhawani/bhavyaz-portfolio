import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    email: z.string().email("Please enter a valid email"),
    message: z.string().min(1, "Message is required"),
});
