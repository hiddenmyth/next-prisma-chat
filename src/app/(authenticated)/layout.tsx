import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

export default async function AuthenticatedLayout(props: { children: ReactNode }) {
  const session = await auth();
  if (!session) return redirect('/auth/signin');
  return props.children;
}
