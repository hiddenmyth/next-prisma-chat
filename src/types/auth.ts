import z from 'zod';

export const ZSignInForm = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInForm = z.infer<typeof ZSignInForm>;

export const ZSignUpForm = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
    name: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export type TSignUpForm = z.infer<typeof ZSignUpForm>;
