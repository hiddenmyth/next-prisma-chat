import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { title, content } = (await req.json()) as { title: string; content?: string };
  const session = await auth();
  if (!session?.user?.email) return NextResponse.error();
  const result = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: { email: session?.user?.email },
      },
    },
  });
  return NextResponse.json(result);
}
