import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const IndexLink = () => {
  return (
    <div>
      <Link
        href="/"
        className="flex items-center gap-1 font-serif italic transition-colors hover:text-muted-foreground max-md:mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Alla barnvisor
      </Link>
    </div>
  );
};
