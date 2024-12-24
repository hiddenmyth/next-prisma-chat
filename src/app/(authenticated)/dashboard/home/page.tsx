import DashboardPageWrapper from "@/components/layout/dashboard/DashboardPageWrapper";

export default function HomePage() {
  return <DashboardPageWrapper title={'Home'} subtitle={'My home page'}>
        <div className="flex flex-col gap-2 w-full"></div>
  </DashboardPageWrapper>
}
