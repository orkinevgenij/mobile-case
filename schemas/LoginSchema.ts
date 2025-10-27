import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),

  password: z.string().min(6, {
    message: 'Password enter a valid password',
  }),
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;
