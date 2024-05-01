import { z } from 'zod';

const JobCreateZodSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    description: z.string({ required_error: 'Description is required' }),
    category: z.string({ required_error: 'Category is required' }),
    type: z.string({ required_error: 'Job type is required' }),
    location: z.string({ required_error: 'Location is required' }),
    experience: z.string({ required_error: 'Experience is required' }),
    isUrgent: z.boolean().optional(),
    salary: z.string({ required_error: 'Salary is required' }),
    technology: z.array(z.string()).refine(value => value.some(item => item), {
      message: 'Technology is required',
    }),
  }),
});

export const JobValidation = {
  JobCreateZodSchema,
};
