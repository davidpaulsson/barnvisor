import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between gap-4 border-b p-4",
        className,
      )}
      {...props}
    >
      <h2>
        <Link href="/">Barnvisor</Link>
      </h2>

      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </header>
  );
};
