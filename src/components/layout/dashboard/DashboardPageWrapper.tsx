"use client";

import useDashboardLayoutStore from "@/hooks/use-dashboard-layout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@nextui-org/button";
import { cn } from "@nextui-org/theme";
import { ReactNode } from "react";

export default function DashboardPageWrapper({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
}) {
  const { isColorful, isCollapsed, onOpenChange } = useDashboardLayoutStore();

  return (
    <main className="flex-1 w-full relative flex flex-col gap-4 p-4 mx-auto container">
      <div className={cn("border border-divider rounded-xl p-4 flex items-center gap-4", {
        "bg-gradient-to-r from-default-100 via-danger-100 to-secondary-100": isColorful
      })}>
        <Button isIconOnly onClick={onOpenChange} radius="sm" variant="ghost">
          <Icon
            icon={
              isCollapsed
                ? "solar:hamburger-menu-outline"
                : "solar:arrow-left-outline"
            }
            width={24}
          />
        </Button>
        <div className="flex-1">
          <div className="text-default-600 text-lg font-bold">{title}</div>
          <div className="text-default-500 text-sm">{subtitle}</div>
        </div>
      </div>
      <div className="flex-1 border border-divider rounded-xl p-4">{children}</div>
    </main>
  );
}
