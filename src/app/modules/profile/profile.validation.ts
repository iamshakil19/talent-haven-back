import { z } from "zod";

const updateProfileZodSchema = z.object({
    body: z.object({
        user: z.string({
            required_error: 'User is required',
        }),
        profileImage: z.string().optional(),
        address: z.string().optional(),
        dateOfBirth: z.string().optional(),
        social: z.object({
            facebook: z.string().optional(),
            website: z.string().optional(),
            twitter: z.string().optional(),
            linkedin: z.string().optional(),
            instagram: z.string().optional(),
        })
    }),
});

export const ProfileValidation = {
    updateProfileZodSchema,
};