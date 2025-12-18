import { getAllSongs } from "@/lib/md";
import type { Metadata } from "next";

import { ViewToggle } from "@/components/view-toggle";
import { SongsList } from "@/components/songs-list";

export const dynamic = "force-static";
export const revalidate = false;

const metadata: Metadata = {
  title: "Barnvistexter.se - texter till svenska barnvisor och vaggvisor",
  description:
    "Här hittar du texter till klassiska och nya svenska barnvisor och vaggvisor. Perfekt för föräldrar, pedagoger och barn i alla åldrar.",
  openGraph: {
    images: [
      {
        url: "https://www.barnvistexter.se/api/og?title=Barnvisor&description=Sångtexter till svenska barnvisor och vaggvisor",
        width: 1200,
        height: 630,
        alt: "Sångtexter till svenska barnvisor och vaggvisor",
      },
    ],
  },
};

export { metadata };

export default async function Home() {
  const songs = await getAllSongs();

  return (
    <>
      <div className="col-start-2 col-end-5">
        <h1 className="mb-1 font-medium">
          Texter till svenska barnvisor och vaggvisor
        </h1>
        <p className="mb-12 text-muted-foreground">
          Välkommen till Barnvistexter.se! Här finns texter till alla dina
          favoritbarnvisor och vaggvisor, från klassiker till moderna sånger.
        </p>

        <div className="mb-4 flex gap-4">
          <ViewToggle />

          <h2 className="text-sm text-muted-foreground">Sångtexter</h2>
        </div>

        <SongsList songs={songs} />
      </div>
      <div />
    </>
  );
}
