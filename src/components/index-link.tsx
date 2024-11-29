"use client";

import useBack from "@/hooks/useBack";
import { Undo2 as Undo } from "lucide-react";
import Link from "next/link";

export const IndexLink = () => {
  const { canGoBack, back } = useBack();

  return (
    <div>
      {canGoBack ? (
        <button
          onClick={back}
          className="flex items-center gap-1 font-serif italic transition-colors hover:text-muted-foreground max-md:mb-8"
        >
          <Undo className="h-4 w-4" /> Index
        </button>
      ) : (
        <Link
          href="/"
          className="flex items-center gap-1 font-serif italic transition-colors hover:text-muted-foreground max-md:mb-8"
        >
          <Undo className="h-4 w-4" /> Index
        </Link>
      )}
    </div>
  );
};
