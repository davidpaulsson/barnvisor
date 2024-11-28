import { Separator } from "@/components/ui/separator";
import { getSongData } from "@/lib/md";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const song = await getSongData(params.id);
  return {
    title: `${song.title} | Barnvisor`,
    description: song.content || "Barnvisa",
  };
}

export default async function Page({ params }: Props) {
  const song = await getSongData(params.id);

  return (
    <>
      <div />
      <article className="[&_p]:text-pretty">
        <h1>{song.title}</h1>
        <p className="text-muted-foreground">{song.author}</p>
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
