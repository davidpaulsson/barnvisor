import { getAllSongs } from "@/lib/md";
import type { Metadata } from "next";
import Link from "next/link";

const metadata: Metadata = {
  title: "Barnvisor - Samling av barnvisor",
  description: "En samling av populära barnvisor",
};

export { metadata };

export default function Home() {
  const songs = getAllSongs();

  return (
    <>
      <div className="col-start-2 col-end-5 [&_p:not(:last-child)]:mb-6 [&_p]:text-pretty">
        <h1 className="mb-1 font-medium">Barnvisor</h1>
        <p className="mb-12 text-muted-foreground">
          En samling av populära barnvisor med sångtexter.
        </p>
        <h2 className="mb-4 text-sm text-muted-foreground">Sångtexter</h2>
        <ul className="divide-y">
          {songs
            .sort((a, b) => {
              if (a.title < b.title) {
                return -1;
              }
              if (a.title > b.title) {
                return 1;
              }
              return 0;
            })
            .map((song) => (
              <li key={song.id}>
                <Link href={`/${song.id}`} className="group block py-2">
                  <span className="block underline decoration-muted-foreground/50 underline-offset-4 transition-colors group-hover:decoration-foreground">
                    {song.title}
                  </span>
                  <span className="block text-muted-foreground">
                    {song.author}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div />
    </>
  );
}
