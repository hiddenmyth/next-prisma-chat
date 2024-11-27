"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import {
  Listbox,
  ListboxItem,
  ListboxSection,
  type ListboxProps,
  type ListboxSectionProps,
} from "@nextui-org/listbox";

import type { SharedSelection } from "@nextui-org/system";
import React, { forwardRef, Key, useCallback } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import { Icon } from "@iconify/react";
import { cn } from "@nextui-org/theme";
import useDashboardLayoutStore from "@/hooks/use-dashboard-layout";

export enum SidebarItemType {
  nested = "nested",
}

export type SidebarItem = {
  key: string;
  title: string;
  icon?: string;
  href?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  items?: SidebarItem[];
  className?: string;
  itemType?: SidebarItemType;
};

export type SidebarProps = Omit<ListboxProps<SidebarItem>, "children"> & {
  items: SidebarItem[];
  isCompact?: boolean;
  hideEndContent?: boolean;
  iconClassName?: string;
  sectionClasses?: ListboxSectionProps["classNames"];
  classNames?: ListboxProps["classNames"];
  selected?: string;
  onNavigate?: (key?: string) => void;
};

const Sidebar = forwardRef<HTMLElement, SidebarProps>(function RenderSidebar(
  {
    items,
    isCompact,
    hideEndContent,
    sectionClasses: sectionClassesProp = {},
    itemClasses: itemClassesProp = {},
    iconClassName,
    classNames,
    className,
    selected,
    onNavigate,
    ...props
  },
  ref
) {

  const {onOpen} = useDashboardLayoutStore();

  const sectionClasses = {
    ...sectionClassesProp,
    base: cn(sectionClassesProp?.base, {
      "p-0 max-w-[44px]": isCompact,
    }),
    group: cn(sectionClassesProp?.group, {
      "flex flex-col gap-1": isCompact,
    }),
    heading: cn(sectionClassesProp?.heading, {
      hidden: isCompact,
    }),
  };

  const itemClasses = {
    ...itemClassesProp,
    base: cn(itemClassesProp?.base, {
      "w-11 h-11 gap-0 p-0": isCompact,
    }),
  };

  const renderNestItem = useCallback(
    (item: SidebarItem) => {
      const isNestType =
        item.itemType === SidebarItemType.nested &&
        item.items &&
        item.items?.length > 0;

      if (isNestType) {
        delete item.href;
      }

      return (
        <ListboxItem
          {...item}
          key={item.key}
          aria-label="sidebarItem"
          classNames={{
            base: cn(
              {
                "h-auto p-0": !isCompact && isNestType,
              },
              {
                "inline-block w-11": isCompact && isNestType,
              }
            ),
          }}
          endContent={
            isCompact || isNestType || hideEndContent
              ? null
              : item.endContent ?? null
          }
          startContent={
            isCompact || isNestType ? null : item.icon ? (
              <Icon
                className={cn(
                  "text-default-500 group-data-[selected=true]:text-foreground",
                  iconClassName
                )}
                icon={item.icon}
                width={24}
              />
            ) : (
              item.startContent ?? null
            )
          }
          title={isCompact || isNestType ? null : item.title}
        >
          {isCompact ? (
            <Tooltip content={item.title} placement="right">
              <div className="flex w-full items-center justify-center" onClick={()=>{onOpen()}}>
                {item.icon ? (
                  <Icon
                    className={cn(
                      "text-default-500 group-data-[selected=true]:text-foreground",
                      iconClassName
                    )}
                    icon={item.icon}
                    width={24}
                  />
                ) : (
                  item.startContent ?? null
                )}
              </div>
            </Tooltip>
          ) : null}
          {!isCompact && isNestType ? (
            <Accordion className={"p-0"}>
              <AccordionItem
                key={item.key}
                aria-label={item.title}
                classNames={{
                  heading: "pr-3",
                  trigger: "p-0",
                  content: "py-0 pl-4",
                }}
                title={
                  item.icon ? (
                    <div className={"flex h-11 items-center gap-2 px-2 py-1.5"}>
                      <Icon
                        className={cn(
                          "text-default-500 group-data-[selected=true]:text-foreground",
                          iconClassName
                        )}
                        icon={item.icon}
                        width={24}
                      />
                      <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">
                        {item.title}
                      </span>
                    </div>
                  ) : (
                    item.startContent ?? null
                  )
                }
              >
                {item.items && item.items?.length > 0 ? (
                  <Listbox
                    className={"mt-0.5"}
                    classNames={{
                      list: cn("border-l border-default-200 pl-4"),
                    }}
                    items={item.items}
                    variant="flat"
                    aria-label="sidebar"
                  >
                    {item.items.map(renderItem)}
                  </Listbox>
                ) : (
                  renderItem(item)
                )}
              </AccordionItem>
            </Accordion>
          ) : null}
        </ListboxItem>
      );
    },
    [isCompact, hideEndContent, iconClassName, items, onOpen]
  );

  const renderItem = useCallback(
    (item: SidebarItem) => {
      const isNestType =
        item.itemType === SidebarItemType.nested &&
        item.items &&
        item.items?.length > 0;

      if (isNestType) {
        return renderNestItem(item);
      }

      return (
        <ListboxItem
          {...item}
          key={item.key}
          aria-label="sidebarItem"
          classNames={{
            base: cn("min-h-11", itemClasses?.base),
          }}
          endContent={
            isCompact || hideEndContent ? null : item.endContent ?? null
          }
          startContent={
            isCompact ? null : item.icon ? (
              <Icon
                className={cn(
                  "text-default-500 group-data-[selected=true]:text-foreground",
                  iconClassName
                )}
                icon={item.icon}
                width={24}
              />
            ) : (
              item.startContent ?? null
            )
          }
          textValue={item.title}
          title={isCompact ? null : item.title}
        >
          {isCompact ? (
            <Tooltip content={item.title} placement="right">
              <div className="flex w-full items-center justify-center">
                {item.icon ? (
                  <Icon
                    className={cn(
                      "text-default-500 group-data-[selected=true]:text-foreground",
                      iconClassName
                    )}
                    icon={item.icon}
                    width={24}
                  />
                ) : (
                  item.startContent ?? null
                )}
              </div>
            </Tooltip>
          ) : null}
        </ListboxItem>
      );
    },
    [
      itemClasses?.base,
      renderNestItem,
    ]
  );

  return (
    <Listbox
      ref={ref}
      hideSelectedIcon
      as="nav"
      aria-label="sidebar"
      className={cn("list-none", className)}
      classNames={{
        ...classNames,
        list: cn("items-center", classNames?.list),
      }}
      color="default"
      itemClasses={{
        ...itemClasses,
        base: cn(
          "px-3 rounded-large h-[44px] data-[selected=true]:bg-default-100",
          itemClasses?.base
        ),
        title: cn(
          "text-small font-medium text-default-500 group-data-[selected=true]:text-foreground",
          itemClasses?.title
        ),
      }}
      selectedKeys={[selected] as unknown as SharedSelection}
      selectionMode="single"
      variant="flat"
      onSelectionChange={(keys: SharedSelection) => {
        const key = Array.from(keys)[0];
        onNavigate?.(key.toString());
      }}
      {...props}
    >
      {items.map((item: SidebarItem) => {
        return item.itemType === SidebarItemType.nested &&
          item.items &&
          item.items?.length > 0 ? (
          renderNestItem(item)
        ) : item.items && item.items?.length > 0 ? (
          <ListboxSection
            key={item.key}
            classNames={sectionClasses}
            showDivider={isCompact}
            title={item.title}
          >
            {item.items.map(renderItem)}
          </ListboxSection>
        ) : (
          renderItem(item)
        );
      })}
    </Listbox>
  );
});

export default Sidebar;
