import { IndexLink } from "@/components/index-link";
import { getSongData } from "@/lib/md";
import { Undo2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const song = await getSongData((await params).id);
  return {
    title: `${song.title} | Barnvisor`,
    description: song.content || "Barnvisa",
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
        <p className="mb-12 text-sm text-muted-foreground">{song.author}</p>
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
