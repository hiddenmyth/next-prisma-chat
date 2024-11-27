"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, ButtonProps } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { Icon } from "@iconify/react";

export default function ThemeSwitcher(props: Partial<ButtonProps>) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button
      isLoading={!mounted}
      onClick={() => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
      }}
      {...props}
    >
      {mounted ? (
        <Icon
          icon={
            theme === "light"
              ? "material-symbols:light-mode-rounded"
              : "material-symbols:dark-mode-rounded"
          }
          width={24}
        />
      ) : (
        <Spinner />
      )}
      {props.children}
    </Button>
  );
}
