import { getAllSongs } from "@/lib/md";
import type { MetadataRoute } from "next";

const siteUrl = "https://www.barnvistexter.se";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const songs = await getAllSongs();

  return [
    {
      url: siteUrl,
      changefreq: "weekly",
      priority: 1,
    },
    ...songs.map((song) => ({
      url: `${siteUrl}/${song.id}`,
      changefreq: "monthly",
      priority: 0.7,
    })),
  ];
}
