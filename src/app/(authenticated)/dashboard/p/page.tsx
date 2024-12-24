import { getPosts } from '@/actions/post';
import DashboardPageWrapper from '@/components/layout/dashboard/DashboardPageWrapper';
import ProfileAvatar from '@/components/layout/dashboard/ProfileAvatar';
import Link from 'next/link';

export default async function FeedsPage() {
  const posts = await getPosts();
  return (
    <DashboardPageWrapper title={'Feeds'} subtitle={'My Feeds'}>
      <div className="flex flex-col gap-2 w-full">
        {posts.map((post) => (
          <Link
            href={`/dashboard/p/${post.id}`}
            key={post.id}
            className="hover:bg-default-50 p-1 rounded-md transition-colors"
          >
            {post.title}
            <div className="flex items-center gap-2 text-xs">
              <ProfileAvatar
                name={post.author?.name ?? undefined}
                size="sm"
                radius="full"
              />
              {post.author?.name ?? 'Unknown'}
            </div>
          </Link>
        ))}
      </div>
    </DashboardPageWrapper>
  );
}
