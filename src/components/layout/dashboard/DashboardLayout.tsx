"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import SidebarModalWrapper from "./SidebarModalWrapper";
import SidebarWrapper from "./SidebarWrapper";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@nextui-org/button";
import { Icon } from "@iconify/react";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/theme";
import useDashboardLayoutStore from "@/hooks/use-dashboard-layout";
import Footer from "./Footer";

export default function DashboardLayoutComponent({
  children,
}: {
  children: ReactNode;
}) {
  const {
    isCollapsed,
    onClose,
    onOpen,
    onOpenChange,
    setIsCollapsed,
    setIsColorful,
    isColorful,
  } = useDashboardLayoutStore();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const renderFooter = useCallback(
    (props: { onOpenChange?: () => void; isOpen?: boolean }) => {
      return (
        <div
          className={cn("mt-auto flex flex-col text-default-500 relative", {
            "pr-6": props.isOpen,
          })}
        >
          <div className={cn({ "pl-3": !!props.isOpen })}>
            <Switch
              size="sm"
              color="secondary"
              isSelected={isColorful}
              onValueChange={setIsColorful}
            >
              {!!props.isOpen ? "Colorful" : null}
            </Switch>
          </div>
          <ThemeSwitcher
            className={cn(
              "text-default-500 data-[hover=true]:text-foreground",
              {
                "!w-full !justify-start": props.isOpen,
              }
            )}
            variant="light"
            isIconOnly={!props.isOpen}
          >
            {props.isOpen ? "Light/Dark" : null}
          </ThemeSwitcher>
          <Button
            className={cn(
              "text-default-500 data-[hover=true]:text-foreground",
              {
                "!w-full !justify-start": props.isOpen,
              }
            )}
            variant="light"
            isIconOnly={!props.isOpen}
            onClick={() => {
              props.onOpenChange?.();
            }}
          >
            <Icon
              icon={
                !props.isOpen
                  ? "material-symbols:expand-circle-right-outline-rounded"
                  : "material-symbols:arrow-circle-left-outline-rounded"
              }
              width={24}
            />
            {props.isOpen ? "Collapse Sidebar" : null}
          </Button>
        </div>
      );
    },
    [isColorful, isCollapsed, isMobile]
  );

  return (
    <div className="h-screen w-screen flex overflow-hidden relative">
      {isMobile && (
        <SidebarModalWrapper isOpen={!isCollapsed} onOpenChange={onOpenChange}>
          <SidebarWrapper isColorful={isColorful} isCompact={false}>
            {renderFooter({
              isOpen: true,
              onOpenChange: () => onClose(),
            })}
          </SidebarWrapper>
        </SidebarModalWrapper>
      )}
      <SidebarWrapper
        isColorful={isColorful}
        isCompact={isMobile ? true : isCollapsed}
        isMoved={isMobile ? !isCollapsed : false}
      >
        {renderFooter({
          isOpen: isMobile ? false : !isCollapsed,
          onOpenChange: () => onOpenChange(),
        })}
      </SidebarWrapper>
      <div className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative flex flex-col">
        {children}
        <Footer />
      </div>
    </div>
  );
}
