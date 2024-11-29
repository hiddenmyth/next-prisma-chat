import { getPost, publishPost } from '@/actions/post';
import { auth } from '@/auth';
import DashboardPageWrapper from '@/components/layout/dashboard/DashboardPageWrapper';
import ProfileAvatar from '@/components/layout/dashboard/ProfileAvatar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '@nextui-org/button';
import { Chip } from '@nextui-org/chip';
import { cn } from '@nextui-org/theme';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const post = await getPost(id);
  if (!post) notFound();
  const session = await auth();
  if (!post.published && session?.user?.email !== post.author?.email) return notFound();
  return (
    <DashboardPageWrapper
      title={post.title ?? id}
      subtitle={`By ${post.author?.name ?? 'Unknown author'}`}
    >
      <div className="size-full space-y-4">
        <div className="flex items-center gap-4">
          <Button as={Link} href="/dashboard" isIconOnly variant="ghost" radius="full">
            <Icon icon={'solar:home-2-broken'} width={24} />
          </Button>
          <ProfileAvatar name={post.author?.name ?? undefined} />
          {post.author?.name ?? 'Unknown'}
        </div>
        <div
          className={cn('text-2xl font-bold', {
            'text-primary': post.published,
            'text-default-500': !post.published,
          })}
        >
          {post.title}
        </div>
        {!post.published && (
          <Chip size="sm" color="warning">
            Draft
          </Chip>
        )}
        <div className="bg-default-100 p-2 rounded-md">{post?.content}</div>
        {!post.published && (
          <Button
            onClick={async () => {
              'use server';
              await publishPost(id);
              revalidatePath(`/dashboard/p/${id}`);
            }}
            color="success"
          >
            PUBLISH
          </Button>
        )}
      </div>
    </DashboardPageWrapper>
  );
}
