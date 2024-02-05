import { z } from 'zod';

const registerZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Passwords is required',
    }),
    role: z.string().optional(),
    phone: z.string().optional(),
    status: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});


export const UserValidation = {
  registerZodSchema,
};
