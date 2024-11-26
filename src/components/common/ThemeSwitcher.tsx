"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/spinner";
import { Icon } from "@iconify/react";

export default function ThemeSwitcher() {
  const [mounted, steMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    steMounted(true);
  }, []);

  return (
    <div>
      <Button isIconOnly isLoading={!mounted} onClick={()=>{
        setTheme(prev => prev === "light" ? "dark" : "light")
      }} color="primary" radius="full" size="sm" variant="ghost">
        {mounted ? <Icon
          icon={
            theme === "light"
              ? "material-symbols:light-mode-rounded"
              : "material-symbols:dark-mode-rounded"
          }
        /> : <Spinner />}
      </Button>
    </div>
  );
}
