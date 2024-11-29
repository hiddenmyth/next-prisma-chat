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

export const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return post;
};
