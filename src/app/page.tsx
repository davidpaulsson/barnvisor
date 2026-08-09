import type { Metadata } from "next";
import Link from "next/link";

import { SongSearch } from "@/components/song-search";
import { SongsList } from "@/components/songs-list";
import {
  getCollectionSongs,
  publishedCollections,
  siteUrl,
} from "@/lib/collections";
import { getAllSongs } from "@/lib/md";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  title: "Svenska barnvisor – texter till barnsånger | Barnvistexter.se",
  description:
    "Hitta texten till svenska barnvisor, vaggvisor, sånglekar och sånger för barn. Sök bland fler än 100 visor eller utforska våra samlingar.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Svenska barnvisor – texter till barnsånger",
    description:
      "Hitta texten till svenska barnvisor, vaggvisor, sånglekar och sånger för barn.",
    url: siteUrl,
    images: [
      {
        url:
          siteUrl +
          "/api/og?title=Barnvisor&description=Sångtexter till svenska barnvisor och vaggvisor",
        width: 1200,
        height: 630,
        alt: "Sångtexter till svenska barnvisor och vaggvisor",
      },
    ],
  },
};

const homeCollectionSlugs = [
  "vaggvisor",
  "sanglekar",
  "sommarsanger",
] as const;

export default async function Home() {
  const songs = (await getAllSongs()).sort((a, b) =>
    a.title.localeCompare(b.title, "sv"),
  );
  const featuredSongs = songs
    .filter((song) => song.featuredRank)
    .sort((a, b) => a.featuredRank! - b.featuredRank!);
  const searchableSongs = songs.map(({ id, title, author, aliases }) => ({
    id,
    title,
    author,
    aliases,
  }));
  const homeCollections = publishedCollections.filter((collection) =>
    homeCollectionSlugs.includes(
      collection.slug as (typeof homeCollectionSlugs)[number],
    ),
  );
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Barnvistexter.se",
    url: siteUrl,
    inLanguage: "sv",
    description:
      "Texter till svenska barnvisor, vaggvisor, sånglekar och sånger för barn.",
  };

  return (
    <>
      <div className="col-start-2 col-end-5 space-y-14">
        <header>
          <p className="mb-2 font-serif italic text-muted-foreground">
            Barnvistexter.se
          </p>
          <h1 className="mb-3 text-balance text-2xl font-medium">
            Svenska barnvisor – texter till våra mest älskade barnsånger
          </h1>
          <p className="mb-8 text-pretty text-muted-foreground">
            Hitta texten till klassiska svenska barnvisor, vaggvisor och sånger
            för barn.
          </p>
          <SongSearch songs={searchableSongs} />
        </header>

        <section aria-labelledby="populara-barnvisor">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <h2 id="populara-barnvisor" className="font-medium">
              Populära barnvisor
            </h2>
            <Link
              href="/barnvisor"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Visa alla
            </Link>
          </div>
          <SongsList songs={featuredSongs} layout="grid" />
        </section>

        {homeCollections.map((collection) => {
          const collectionSongs = getCollectionSongs(songs, collection).slice(
            0,
            4,
          );
          return (
            <section key={collection.slug} aria-labelledby={collection.slug}>
              <div className="mb-5 flex items-baseline justify-between gap-4">
                <h2 id={collection.slug} className="font-medium">
                  {collection.name}
                </h2>
                <Link
                  href={"/" + collection.slug}
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  Visa alla
                </Link>
              </div>
              <SongsList songs={collectionSongs} layout="grid" />
            </section>
          );
        })}

        <section aria-labelledby="alla-barnvisor">
          <div className="mb-5">
            <h2 id="alla-barnvisor" className="font-medium">
              Alla barnvisor A–Ö
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {songs.length} sångtexter i alfabetisk ordning
            </p>
          </div>
          <SongsList songs={songs} layout="grid" />
        </section>
      </div>
      <div />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
    </>
  );
}
