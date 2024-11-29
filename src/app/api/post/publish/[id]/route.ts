import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const postId = req.nextUrl.searchParams.get('id');
  if (!postId) return NextResponse.error();
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  return NextResponse.json(post);
}
