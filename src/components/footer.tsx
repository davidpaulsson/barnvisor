import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

const COLLECTION_LINKS = [
  { href: "/barnvisor", text: "Barnvisor" },
  { href: "/vaggvisor", text: "Vaggvisor" },
  { href: "/godnattsanger", text: "Godnattsånger" },
  { href: "/sanglekar", text: "Sånglekar" },
  { href: "/ramsor", text: "Ramsor" },
  { href: "/midsommarvisor", text: "Midsommarvisor" },
  { href: "/julsanger", text: "Julsånger" },
] as const;

const SOCIAL_LINKS = [
  {
    href: "https://davidpaulsson.se",
    label: "Personal website",
    text: "davidpaulsson.se",
  },
  {
    href: "https://x.com/davidpaulsson",
    label: "Twitter profile",
    text: "x.com/davidpaulsson",
  },
  {
    href: "https://bsky.app/profile/davidpaulsson.se",
    label: "Bluesky profile",
    text: "bsky.app/profile/davidpaulsson.se",
  },
] as const;

interface FooterLinkProps {
  href: string;
  label: string;
  text: string;
}

const FooterLink = ({ href, label, text }: FooterLinkProps) => (
  <a
    href={href}
    aria-label={label}
    className="no-underline transition-colors hover:text-foreground"
    target="_blank"
  >
    {text}
  </a>
);

export const Footer = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={cn(
        "mb-12 mt-24 text-sm text-muted-foreground/75 md:grid md:grid-cols-5 md:gap-4",
        className,
      )}
      {...props}
    >
      <div className="col-start-2 col-end-5 space-y-4">
        <ModeToggle />

        <nav aria-label="Samlingar">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {COLLECTION_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-foreground">
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Social links">
          <ul>
            {SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <FooterLink {...link} />
              </li>
            ))}
          </ul>
        </nav>

        <Heart
          className="inline-block h-5 w-5 fill-red-600 stroke-none"
          aria-hidden="true"
        />
      </div>
    </footer>
  );
};
