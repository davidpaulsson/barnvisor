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
      <h1 className="py-8 text-8xl font-bold tracking-tight">{song.title}</h1>

      <div className="grid grid-cols-4 gap-4">
        <p className="mt-0 text-muted-foreground">{song.author}</p>

        <article className="prose col-span-1 col-start-2 max-w-none dark:prose-invert">
          <div
            className="prose prose-zinc dark:prose-invert [&_p]:text-pretty"
            dangerouslySetInnerHTML={{
              __html: song.content,
            }}
          />
        </article>
      </div>
    </>
  );
}
