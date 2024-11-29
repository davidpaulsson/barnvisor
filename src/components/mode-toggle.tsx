"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      <button
        className={cn({
          "text-foreground": theme === "light",
        })}
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className={cn({
          "text-foreground": theme === "dark",
        })}
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        className={cn({
          "text-foreground": theme === "system",
        })}
        onClick={() => setTheme("system")}
      >
        System
      </button>
    </div>
  );
}
