import { z } from 'zod';

export const googleFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  place: z.string().min(1, "Place is required").max(100, "Place must be less than 100 characters"),
  hobi: z.string().min(1, "Hobi is required").max(100, "Hobi must be less than 100 characters"),
});

export type GoogleFormData = z.infer<typeof googleFormSchema>;
