import { getPost } from '@/actions/post';
import DashboardPageWrapper from '@/components/layout/dashboard/DashboardPageWrapper';
import ProfileAvatar from '@/components/layout/dashboard/ProfileAvatar';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PostPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const post = await getPost(id);
  if (!post) notFound();
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
        <div className="bg-default-100 p-2 rounded-md">{post?.content}</div>
      </div>
    </DashboardPageWrapper>
  );
}
