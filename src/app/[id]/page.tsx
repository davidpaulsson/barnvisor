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
    <div className="container max-w-3xl py-8">
      <Link
        href="/"
        className="group mb-8 flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Tillbaka
      </Link>

      <article className="prose max-w-none dark:prose-invert">
        <h1>{song.title}</h1>

        {song.author && song.author !== "Traditionell" && (
          <p className="mt-0 text-muted-foreground">av {song.author}</p>
        )}

        <Separator className="my-4" />

        <div
          className="prose prose-zinc dark:prose-invert [&_p]:text-pretty"
          dangerouslySetInnerHTML={{
            __html: song.content,
          }}
        />
      </article>
    </div>
  );
}
