import { auth } from '@/auth';
import DashboardLayoutComponent from '@/components/layout/dashboard/DashboardLayout';
import Footer from '@/components/layout/dashboard/Footer';
import Header from '@/components/layout/dashboard/Header';
import { ReactNode } from 'react';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return (
    <DashboardLayoutComponent>
      <Header session={session ?? undefined} />
      {children}
      <Footer />
    </DashboardLayoutComponent>
  );
}
