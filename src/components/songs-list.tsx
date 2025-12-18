"use client";

import Link from "next/link";
import { Song } from "@/lib/md";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";

interface SongsListProps {
  songs: Song[];
}

export function SongsList({ songs }: SongsListProps) {
  const [layout] = useQueryState("layout", {
    defaultValue: "grid",
    parse: (value): "grid" | "rows" => (value === "rows" ? "rows" : "grid"),
  });

  return (
    <ul
      className={cn("gap-4", {
        "grid grid-cols-2": layout === "grid",
        "divide-y": layout === "rows",
      })}
    >
      {songs.map((song) => (
        <li
          key={song.id}
          className={cn({ "py-2 first:pt-0": layout === "rows" })}
        >
          <Link href={`/${song.id}`} className="group block">
            <span className="line-clamp-1 underline decoration-muted-foreground/50 underline-offset-4 transition-colors group-hover:decoration-foreground">
              {song.title}
            </span>
            <span className="line-clamp-1 text-sm text-muted-foreground">
              {song.author}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
