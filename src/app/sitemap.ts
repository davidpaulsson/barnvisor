import { getAllSongs } from "@/lib/md";
import type { MetadataRoute } from "next";
import { publishedCollections, siteUrl } from "@/lib/collections";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const songs = await getAllSongs();

  return [
    {
      url: siteUrl,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    ...publishedCollections.map((collection) => ({
      url: siteUrl + "/" + collection.slug,
      changeFrequency: "weekly" as const,
      priority: collection.priority,
    })),
    ...songs.map((song) => ({
      url: `${siteUrl}/${song.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
