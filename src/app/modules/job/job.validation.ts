import { z } from 'zod';

const JobCreateZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    category: z.string({ required_error: 'Category is required' }),
    type: z.string({ required_error: 'Job type is required' }),
    location: z.string({ required_error: 'Location is required' }),
    experience: z.number({ required_error: 'Experience is required' }),
    isUrgent: z.boolean().optional(),
    salary: z.number({ required_error: 'Salary is required' }),
    technology: z.array(z.string()).refine(value => value.some(item => item), {
      message: 'Technology is required',
    }),
    expDate: z.string({ required_error: 'Expiry Date is required' }),
    slug: z.string({ required_error: 'Slug is required' }),
    status: z.string().optional(),
    views: z.number().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const JobValidation = {
  JobCreateZodSchema,
};
