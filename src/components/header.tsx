import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";
import { ModeToggle } from "@/components/mode-toggle";

export const Header = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <header className={cn(className)} {...props}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      <ModeToggle />
    </header>
  );
};
