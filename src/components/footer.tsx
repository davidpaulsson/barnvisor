import { Heart } from "lucide-react";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Footer = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer
      className={cn("prose text-sm text-muted-foreground", className)}
      {...props}
    >
      <Separator className="my-4" />
      <p>
        Skapad med{" "}
        <Heart className="h-4 inline-block w-4 fill-red-600 stroke-none" /> av{" "}
        <a
          className="text-muted-foreground no-underline hover:text-foreground transition-colors"
          href="https://davidpaulsson.se"
        >
          David Paulsson
        </a>
      </p>
    </footer>
  );
};
