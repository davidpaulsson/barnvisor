import Link from "next/link";
import type { Song } from "@/lib/md";
import { cn } from "@/lib/utils";

export type SongListItem = Pick<Song, "id" | "title" | "author">;

interface SongsListProps {
  songs: SongListItem[];
  layout?: "grid" | "rows";
}

function SongsListContent({
  songs,
  layout,
}: {
  songs: SongListItem[];
  layout: "grid" | "rows";
}) {
  return (
    <ul
      className={cn("gap-4", {
        "divide-y md:grid md:grid-cols-2 md:divide-y-0": layout === "grid",
        "divide-y": layout === "rows",
      })}
    >
      {songs.map((song) => (
        <li
          key={song.id}
          className={cn({
            "py-2 first:pt-0": layout === "rows",
            "py-3 first:pt-0 md:py-0": layout === "grid",
          })}
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

export function SongsList({ songs, layout = "grid" }: SongsListProps) {
  return <SongsListContent songs={songs} layout={layout} />;
}
