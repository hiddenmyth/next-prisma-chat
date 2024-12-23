import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';
import authConfig from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { ZSignInForm } from './types/auth';
import { compareSync } from 'bcrypt-edge';
import { getUser } from './actions/auth';
import { ZodError } from 'zod';

export const prismaAdapter = PrismaAdapter(prisma);

const authOptions = NextAuth({
  adapter: prismaAdapter,
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  ...authConfig,
  providers: [
    ...authConfig.providers,
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
          if (compareSync(password, user.password)) {
            return user;
          }
          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          } else return null;
        }
      },
    }),
  ],
});

export const { handlers, signIn, signOut, auth } = authOptions;

export const providers = authConfig.providers.map((provider) => ({
  id: provider.id,
  name: provider.name,
}));
