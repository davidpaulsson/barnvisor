"use client";

import Link from "next/link";
import { Song } from "@/lib/md";
import { cn } from "@/lib/utils";
import { useLayoutStore } from "@/store";

interface SongsListProps {
  songs: Song[];
}

export function SongsList({ songs }: SongsListProps) {
  const { layout } = useLayoutStore();

  return (
    <ul
      className={cn("gap-4", {
        "grid grid-cols-2 md:grid-cols-3": layout === "grid",
        "divide-y": layout === "rows",
      })}
    >
      {songs
        .sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        })
        .map((song) => (
          <li
            key={song.id}
            className={cn({ "py-2 first:pt-0": layout === "rows" })}
          >
            <Link href={`/${song.id}`} className="group block">
              <span className="line-clamp-1 underline decoration-muted-foreground/50 underline-offset-4 transition-colors group-hover:decoration-foreground">
                {song.title}
              </span>
              <span className="line-clamp-1 text-muted-foreground">
                {song.author}
              </span>
            </Link>
          </li>
        ))}
    </ul>
  );
}
