import { IndexLink } from "@/components/index-link";
import { getSongData } from "@/lib/md";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const song = await getSongData((await params).id);
  const ogDescription =
    song.content && song.content.length > 260
      ? song.content.slice(0, 260) + "…"
      : song.content || null;

  return {
    title: `${song.title} | Barnvisor`,
    description: song.content || "Barnvisa",
    openGraph: {
      images: [
        {
          url: `http://localhost:3000/api/og?title=${song.title}${ogDescription ? `&description=${ogDescription}` : ""}`,
          width: 1200,
          height: 630,
          alt: ogDescription || "",
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

  return (
    <>
      <IndexLink />

      <article className="col-span-3 [&_p:not(:last-child)]:mb-6 [&_p]:text-pretty">
        <h1 className="mb-1 font-medium">{song.title}</h1>
        <p className="!mb-12 text-sm text-muted-foreground">{song.author}</p>
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
