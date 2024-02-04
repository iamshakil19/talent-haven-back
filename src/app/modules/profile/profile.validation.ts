import { z } from "zod";

const updateProfileZodSchema = z.object({
    body: z.object({
        user: z.string({
            required_error: 'User is required',
        }),
        image: z.string().optional(),
        permanentAddress: z.string().optional(),
        presentAddress: z.string().optional(),
        dateOfBirth: z.string().optional(),
    }),
});

export const ProfileValidation = {
    updateProfileZodSchema,
};