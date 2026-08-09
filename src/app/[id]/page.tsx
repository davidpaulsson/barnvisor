import { IndexLink } from "@/components/index-link";
import { SongsList } from "@/components/songs-list";
import {
  getCollection,
  getCollectionSongs,
  getPrimaryCollection,
  getRelatedSongs,
  getSectionSongs,
  getSongCollections,
  publishedCollections,
  siteUrl,
} from "@/lib/collections";
import { getAllSongs, getSongData, plainText } from "@/lib/md";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const songs = await getAllSongs();
  return [
    ...songs.map((song) => ({ id: song.id })),
    ...publishedCollections.map((collection) => ({ id: collection.slug })),
  ];
}

function truncateText(text: string, length = 150) {
  if (text.length <= length) return text;
  return text.slice(0, length).replace(/\s+\S*$/, "") + "…";
}

async function findSong(id: string) {
  try {
    return await getSongData(id);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const collection = getCollection(id);

  if (collection) {
    const canonicalUrl = siteUrl + "/" + collection.slug;
    return {
      title: collection.title + " | Barnvistexter.se",
      description: collection.description,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        type: "website",
        title: collection.title,
        description: collection.description,
        url: canonicalUrl,
        images: [
          {
            url:
              siteUrl +
              "/api/og?title=" +
              encodeURIComponent(collection.name) +
              "&description=" +
              encodeURIComponent(collection.description),
            width: 1200,
            height: 630,
            alt: collection.title,
          },
        ],
      },
    };
  }

  const song = await findSong(id);
  if (!song) return {};
  const canonicalUrl = siteUrl + "/" + song.id;
  const cleanDescription = song.content
    ? truncateText(plainText(song.content))
    : 'Text till barnvisan "' + song.title + '"';

  return {
    title: song.title + " – text till barnvisa | Barnvistexter.se",
    description: cleanDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "music.song",
      title: song.title + " – text till barnvisa | Barnvistexter.se",
      description: cleanDescription,
      url: canonicalUrl,
      images: [
        {
          url:
            siteUrl +
            "/api/og?title=" +
            encodeURIComponent(song.title) +
            "&description=" +
            encodeURIComponent(cleanDescription),
          width: 1200,
          height: 630,
          alt: cleanDescription.slice(0, 100),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: song.title + " – text till barnvisa | Barnvistexter.se",
      description: cleanDescription,
    },
  };
}

async function CollectionPage({ id }: { id: string }) {
  const collection = getCollection(id);
  if (!collection) notFound();

  const allSongs = await getAllSongs();
  const songs = getCollectionSongs(allSongs, collection).sort((a, b) =>
    a.title.localeCompare(b.title, "sv"),
  );
  const relatedCollections = publishedCollections
    .filter(
      (candidate) =>
        candidate.slug !== collection.slug &&
        candidate.slug !== "barnvisor" &&
        getCollectionSongs(songs, candidate).length > 0,
    )
    .slice(0, 4);
  const canonicalUrl = siteUrl + "/" + collection.slug;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl + "#collection",
        name: collection.title,
        description: collection.description,
        url: canonicalUrl,
        inLanguage: "sv",
        mainEntity: { "@id": canonicalUrl + "#songs" },
      },
      {
        "@type": "ItemList",
        "@id": canonicalUrl + "#songs",
        numberOfItems: songs.length,
        itemListElement: songs.map((song, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: song.title,
          url: siteUrl + "/" + song.id,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Barnvisor",
            item: siteUrl + "/barnvisor",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: collection.name,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <IndexLink />
      <article className="col-span-3">
        <header className="mb-10">
          <h1 className="mb-3 text-balance text-2xl font-medium">
            {collection.title}
          </h1>
          <p className="text-pretty text-muted-foreground">
            {collection.intro}
          </p>
        </header>

        {collection.sections?.map((section) => {
          const sectionSongs = getSectionSongs(songs, section);
          if (sectionSongs.length < 2) return null;
          return (
            <section key={section.title} className="mb-12">
              <h2 className="mb-2 font-medium">{section.title}</h2>
              {section.description ? (
                <p className="mb-5 text-sm text-muted-foreground">
                  {section.description}
                </p>
              ) : null}
              <div className="mt-5">
                <SongsList songs={sectionSongs} layout="grid" />
              </div>
            </section>
          );
        })}

        <section aria-labelledby="alla-i-samlingen" className="mb-12">
          <h2 id="alla-i-samlingen" className="mb-2 font-medium">
            Alla {collection.name.toLocaleLowerCase("sv")}
          </h2>
          <p className="mb-5 text-sm text-muted-foreground">
            {songs.length} {songs.length === 1 ? "sångtext" : "sångtexter"}
          </p>
          <SongsList songs={songs} layout="grid" />
        </section>

        {collection.faqs.length ? (
          <section className="mb-12 border-t pt-8" aria-labelledby="fragor">
            <h2 id="fragor" className="mb-5 font-medium">
              Vanliga frågor
            </h2>
            <dl className="space-y-6">
              {collection.faqs.map((faq) => (
                <div key={faq.question}>
                  <dt className="font-medium">{faq.question}</dt>
                  <dd className="mt-1 text-muted-foreground">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {relatedCollections.length ? (
          <nav className="border-t pt-8" aria-label="Relaterade samlingar">
            <h2 className="mb-4 font-medium">Fler samlingar</h2>
            <ul className="flex flex-wrap gap-2">
              {relatedCollections.map((related) => (
                <li key={related.slug}>
                  <Link
                    href={"/" + related.slug}
                    className="block rounded-full border px-3 py-1.5 text-sm hover:bg-muted"
                  >
                    {related.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </article>
      <div />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

async function SongPage({ id }: { id: string }) {
  const song = await findSong(id);
  if (!song) notFound();

  const allSongs = await getAllSongs();
  const primaryCollection = getPrimaryCollection(song);
  const songCollections = getSongCollections(song);
  const scoredRelated = getRelatedSongs(song, allSongs);
  const fallbackRelated = allSongs
    .filter(
      (candidate) =>
        candidate.id !== song.id &&
        !scoredRelated.some((relatedSong) => relatedSong.id === candidate.id),
    )
    .sort((a, b) => a.title.localeCompare(b.title, "sv"))
    .slice(0, 6 - scoredRelated.length);
  const related =
    scoredRelated.length >= 4
      ? scoredRelated
      : [...scoredRelated, ...fallbackRelated].slice(0, 6);
  const canonicalUrl = siteUrl + "/" + song.id;
  const composition: Record<string, unknown> = {
    "@type": "MusicComposition",
    "@id": canonicalUrl + "#song",
    name: song.title,
    inLanguage: "sv",
    url: canonicalUrl,
    lyrics: {
      "@type": "CreativeWork",
      text: plainText(song.content),
    },
  };
  if (song.author !== "Okänd" && song.author !== "Traditionell") {
    composition.composer = {
      "@type": "Person",
      name: song.author,
    };
  }
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      composition,
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: primaryCollection.name,
            item: siteUrl + "/" + primaryCollection.slug,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: song.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <IndexLink />
      <article className="col-span-3 [&_p:not(:last-child)]:mb-6 [&_p]:text-pretty">
        <header className="mb-10">
          <nav aria-label="Brödsmulor" className="mb-4 text-sm text-muted-foreground">
            <Link href={"/" + primaryCollection.slug} className="hover:text-foreground">
              {primaryCollection.name}
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{song.title}</span>
          </nav>
          <h1 className="mb-1 text-2xl font-medium">{song.title} – text</h1>
          <p className="!mb-0 text-sm text-muted-foreground">{song.author}</p>
        </header>

        <section aria-labelledby="sangtext">
          <h2 id="sangtext" className="sr-only">
            Text till {song.title}
          </h2>
          <div
            className="text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: song.content }}
          />
        </section>

        {songCollections.length ? (
          <nav className="mt-10 border-t pt-6" aria-label="Sångens samlingar">
            <h2 className="mb-3 text-sm font-medium">Finns i samlingarna</h2>
            <ul className="flex flex-wrap gap-2">
              {songCollections.map((collection) => (
                <li key={collection.slug}>
                  <Link
                    href={"/" + collection.slug}
                    className="block rounded-full border px-3 py-1.5 text-sm hover:bg-muted"
                  >
                    {collection.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {related.length ? (
          <section className="mt-10 border-t pt-6">
            <h2 className="mb-5 font-medium">Liknande barnvisor</h2>
            <SongsList songs={related} layout="rows" />
          </section>
        ) : null}
      </article>
      <div />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return getCollection(id) ? <CollectionPage id={id} /> : <SongPage id={id} />;
}
