import { Heart } from "lucide-react";
import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="prose text-sm text-muted-foreground">
      <Separator className="my-4" />
      <p>
        Skapad med{" "}
        <Heart className="h-4 inline-block w-4 fill-red-600 stroke-none" /> av{" "}
        <a
          className="text-muted-foreground no-underline hover:text-black transition-colors"
          href="https://davidpaulsson.se"
        >
          David Paulsson
        </a>
      </p>
    </footer>
  );
};
