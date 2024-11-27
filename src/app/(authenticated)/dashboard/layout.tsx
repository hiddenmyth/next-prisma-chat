import DashboardLayoutComponent from "@/components/layout/dashboard/DashboardLayout";
import { ReactNode } from "react";

export default function DashboardLayout({children}: {children:ReactNode}) {
    return <DashboardLayoutComponent>{children}</DashboardLayoutComponent>
}