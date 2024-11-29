import { redirect } from 'next/navigation';

export default async function DashboardIndexPage() {
  return redirect('/dashboard/p');
}
