import { getAllSongs } from "@/lib/md";
import type { MetadataRoute } from "next";

const siteUrl = "https://www.barnvistexter.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const songs = await getAllSongs();

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...songs.map((song) => ({
      url: `${siteUrl}/${song.id}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
