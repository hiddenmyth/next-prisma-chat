import { NextRequest, NextResponse } from 'next/server';
import authConfig from './auth.config';
import NextAuth from 'next-auth';

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth(async function middleware(req: NextRequest) {
  // Your custom middleware logic goes here
  const url = req.nextUrl;
  if (url.pathname.startsWith('/dashboard')) {
    const session = await auth();
    if (!session)
      return NextResponse.redirect(
        new URL(`/auth/signin?redirect=${req.nextUrl.pathname}`, req.url),
      );
  }
});
