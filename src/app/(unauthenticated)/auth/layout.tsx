import { Spinner } from '@nextui-org/spinner';
import { ReactNode, Suspense } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
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
