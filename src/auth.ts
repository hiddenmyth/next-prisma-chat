import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';
import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/signin',
  },
  ...authConfig,
});

export const providers = authConfig.providers.map((provider) => ({
  id: provider.id,
  name: provider.name,
}));
