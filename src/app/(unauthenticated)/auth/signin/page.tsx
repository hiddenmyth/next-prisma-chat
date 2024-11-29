'use client';

import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import authConfig from '@/auth.config';
import { Spinner } from '@nextui-org/spinner';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo =
    searchParams && searchParams.has('redirect')
      ? searchParams.get('redirect')
      : undefined;
  if (session && status === 'authenticated') router.push(redirectTo ?? '/dashboard');

  if (status === 'loading') return <Spinner />;
  return (
    <div className="bg-background flex flex-col items-center justify-center gap-4 p-16 relative container m-auto">
      <Link href="/">
        <Icon icon={'solar:home-2-bold-duotone'} width={64} />
      </Link>
      <div className="flex justify-center text-4xl font-bold uppercase">Sign In By</div>
      {authConfig.providers.map((provider) => (
        <div
          onClick={async () => {
            signIn(provider.id);
          }}
          key={provider.id}
          className="w-full p-4 rounded-xl flex items-center gap-4 hover:bg-default-100 transition-all hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: provider.style?.bg,
            color: provider.style?.text,
          }}
        >
          <Image
            src={`https://authjs.dev/img/providers/${provider.id}.svg`}
            width={30}
            height={30}
            alt={provider.id}
          />
          {provider.name}
        </div>
      ))}
    </div>
  );
}
