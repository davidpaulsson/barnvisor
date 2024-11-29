"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <Sun className="mr-2 h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute mr-2 h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      <button
        className="text-foreground dark:text-muted-foreground"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="text-muted-foreground dark:text-foreground"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
    </div>
  );
}
