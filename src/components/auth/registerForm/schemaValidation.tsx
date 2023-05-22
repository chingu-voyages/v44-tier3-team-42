import { z } from 'zod';

export type RegisterValidationSchema = z.infer<typeof registerValidationSchema>;

const registerValidationSchema = z
  .object({
    username: z.string().min(2, { message: 'Username is required' }),
    email: z.string().min(2, { message: 'Email is required' }).email({
      message: 'Must be a valid email',
    }),
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z.string().min(1, { message: 'Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

export type LoginValidationSchema = z.infer<typeof registerValidationSchema>;
const logInValidationSchema = z.object({
  username: z.string().min(2, { message: 'Username is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export { registerValidationSchema, logInValidationSchema };
