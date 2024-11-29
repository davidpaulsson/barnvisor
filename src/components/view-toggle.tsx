"use client";

import { cn } from "@/lib/utils";
import { LayoutGrid, Rows3 } from "lucide-react";
import { useQueryState } from "nuqs";

export const ViewToggle = () => {
  const [layout, setLayout] = useQueryState("layout", {
    defaultValue: "grid",
    parse: (value): "grid" | "rows" => (value === "rows" ? "rows" : "grid"),
  });

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLayout("grid")}
        className={cn("transition-colors", {
          "text-muted-foreground": layout === "rows",
        })}
      >
        <LayoutGrid className="h-5 w-5" />
      </button>
      <button
        onClick={() => setLayout("rows")}
        className={cn("transition-colors", {
          "text-muted-foreground": layout === "grid",
        })}
      >
        <Rows3 className="h-5 w-5" />
      </button>
    </div>
  );
};
