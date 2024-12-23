import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { ZSignInForm } from './types/auth';
import { z } from 'zod';
import { getUser } from './actions/auth';
import bcrypt from 'bcrypt-edge';

export default {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await ZSignInForm.parseAsync(credentials);
          const user = await getUser(email);
          if (!user || !user.password) {
            return null;
          }
          if (bcrypt.compareSync(password, user.password)) {
            return user;
          }
          return null;
        } catch (error) {
          if (error instanceof z.ZodError) {
            return null;
          } else return null;
        }
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
