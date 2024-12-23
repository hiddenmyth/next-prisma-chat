import { auth } from '@/auth';
import { Spinner } from '@nextui-org/spinner';
import { redirect } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (session) return redirect('/dashboard')
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
