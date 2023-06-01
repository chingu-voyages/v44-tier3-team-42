import z from 'zod';

import { SERVER_URL } from '@/config/constants';

/// ///////////////////////////////////
/// //////// SCHEMAS
/// ///////////////////////////////////

const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
});

export type User = z.infer<typeof userSchema>;

/// ///////////////////////////////////
/// //////// METHODS
/// ///////////////////////////////////

export const registerUserRequestSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: 'Include at least a single letter :¬)' })
    .max(40, { message: 'Something a bit shorter please :D' }),
  email: z
    .string()
    .email({ message: 'Must provide a valid email' })
    .max(50, { message: 'A different email address please :D' }),
  password: z
    .string()
    .min(1, { message: 'Include at least a single letter :¬)' }),
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;

export const registerUser = async (
  newUser: RegisterUserRequest,
): Promise<void> => {
  const res = await fetch(`${SERVER_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    // NOTE: Server doesn't respond with an error message
    throw new Error('Failed to register user');
  }
};
