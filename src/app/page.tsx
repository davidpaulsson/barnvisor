import { Card, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="container py-8">
      <div className="flex flex-col items-start gap-4 md:gap-8">
        <div className="grid gap-4">
          <h1 className="font-bold text-3xl md:text-4xl">Barnvisor</h1>
          <p className="text-xl text-muted-foreground">
            En samling av populära barnvisor
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {songs.map((song) => (
            <Card key={song.id} className="transition-colors hover:bg-muted/50">
              <Link href={`/${song.id}`}>
                <CardHeader>
                  <CardTitle>{song.title}</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
