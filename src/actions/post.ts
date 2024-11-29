'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export const getPosts = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return feed;
};

export const getDraftPosts = async () => {
  const session = await auth();
  const feed = await prisma.post.findMany({
    where: { published: false, author: { email: session?.user?.email } },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return feed;
};

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return post;
};

export const publishPost = async (id: string) => {
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  });
  return post;
};
