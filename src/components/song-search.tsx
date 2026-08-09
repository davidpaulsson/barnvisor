"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import {
  SongsList,
  type SongListItem,
} from "@/components/songs-list";

type SearchableSong = SongListItem & { aliases: string[] };

function normalize(value: string) {
  return value.toLocaleLowerCase("sv").trim();
}

export function SongSearch({ songs }: { songs: SearchableSong[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalize(query);
  const results = useMemo(() => {
    if (normalizedQuery.length < 2) return [];

    return songs
      .filter((song) =>
        [song.title, song.author, ...song.aliases]
          .map(normalize)
          .some((value) => value.includes(normalizedQuery)),
      )
      .slice(0, 8);
  }, [normalizedQuery, songs]);

  return (
    <div className="relative">
      <label htmlFor="song-search" className="sr-only">
        Sök efter en barnvisa
      </label>
      <Search
        aria-hidden="true"
        className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground"
      />
      <input
        id="song-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Sök efter en barnvisa…"
        className="w-full rounded-lg border bg-background py-3 pl-12 pr-4 outline-none transition-shadow focus:ring-2 focus:ring-ring"
      />
      {normalizedQuery.length >= 2 ? (
        <div
          className="absolute z-20 mt-2 w-full rounded-lg border bg-background p-4 shadow-lg"
          aria-live="polite"
        >
          {results.length ? (
            <SongsList songs={results} layout="rows" />
          ) : (
            <p className="text-sm text-muted-foreground">
              Ingen sång matchar ”{query}”.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
