import { IndexLink } from "@/components/index-link";
import { getAllSongs, getSongData } from "@/lib/md";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const songs = await getAllSongs();
  return songs.map((song) => ({
    id: song.id,
  }));
}

function truncateText(text: string, length = 150) {
  if (text.length <= length) return text;
  return text.slice(0, length).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const song = await getSongData((await params).id);
  const canonicalUrl = `https://www.barnvistexter.se/${song.id}`;
  const cleanDescription = song.content
    ? truncateText(song.content.replace(/\n/g, " "))
    : `Text till barnvisa "${song.title}"`;

  return {
    title: `${song.title} - Text till barnvisa | Barnvistexter.se`,
    description: cleanDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      url: canonicalUrl,
      images: [
        {
          url: `https://www.barnvistexter.se/api/og?title=${encodeURIComponent(
            song.title,
          )}&description=${encodeURIComponent(cleanDescription)}`,
          width: 1200,
          height: 630,
          alt: cleanDescription.slice(0, 100),
        },
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const song = await getSongData((await params).id);
  const lyricsText = song.content
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const canonicalUrl = `https://www.barnvistexter.se/${song.id}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    name: song.title,
    composer: {
      "@type": "Person",
      name: song.author,
    },
    inLanguage: "sv",
    url: canonicalUrl,
    lyrics: {
      "@type": "CreativeWork",
      text: lyricsText,
    },
  } as const;

  return (
    <>
      <IndexLink />

      <article className="col-span-3 [&_p:not(:last-child)]:mb-6 [&_p]:text-pretty">
        <h1 className="mb-1 font-medium">{song.title}</h1>
        <p className="!mb-12 text-sm text-muted-foreground">{song.author}</p>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <div
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: song.content,
          }}
        />
      </article>
      <div />
    </>
  );
}
