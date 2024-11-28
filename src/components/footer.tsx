import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export const Footer = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <footer
      className={cn(
        "mb-12 mt-24 text-sm text-muted-foreground/75 md:grid md:grid-cols-5 md:gap-4",
        className,
      )}
      {...props}
    >
      <div className="col-start-2 col-end-5">
        <Heart className="inline-block h-5 w-5 fill-red-600 stroke-none" />
        <ul>
          <li>
            <a
              href="https://davidpaulsson.se"
              className="no-underline transition-colors hover:text-foreground"
            >
              davidpaulsson.se
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/davidpaulsson"
              className="no-underline transition-colors hover:text-foreground"
            >
              twitter.com/davidpaulsson
            </a>
          </li>
          <li>
            <a
              href="https://bsky.app/profile/davidpaulsson.se"
              className="no-underline transition-colors hover:text-foreground"
            >
              bsky.app/profile/davidpaulsson.se
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
