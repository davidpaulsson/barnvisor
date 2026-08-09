import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const songsDirectory = path.join(process.cwd(), "content/songs");

export const songCategories = [
  "barnvisa",
  "vaggvisa",
  "godnattsång",
  "klassisk",
  "sånglek",
  "ramsa",
  "jul",
  "lucia",
  "sommar",
  "midsommar",
  "påsk",
] as const;

export const songAudiences = ["bebis", "förskola"] as const;
export const songRightsStatuses = [
  "legacy-unreviewed",
  "public-domain",
  "licensed",
] as const;

export type SongCategory = (typeof songCategories)[number];
export type SongAudience = (typeof songAudiences)[number];
export type SongRightsStatus = (typeof songRightsStatuses)[number];

export type Song = {
  id: string;
  title: string;
  author: string;
  content: string;
  categories: SongCategory[];
  audiences: SongAudience[];
  aliases: string[];
  featuredRank?: number;
  rightsStatus: SongRightsStatus;
  rightsSource?: string;
  rightsCheckedAt?: string;
};

function isOneOf<T extends string>(value: unknown, values: readonly T[]): value is T {
  return typeof value === "string" && values.includes(value as T);
}

function stringArray(value: unknown, field: string, id: string) {
  if (value === undefined) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`${id}: ${field} måste vara en lista med textvärden`);
  }
  return value as string[];
}

function parseSong(id: string, data: Record<string, unknown>, content: string): Song {
  if (typeof data.title !== "string" || !data.title.trim()) {
    throw new Error(`${id}: title saknas`);
  }
  if (typeof data.author !== "string" || !data.author.trim()) {
    throw new Error(`${id}: author saknas`);
  }

  const categories = stringArray(data.categories, "categories", id);
  const audiences = stringArray(data.audiences, "audiences", id);
  const aliases = stringArray(data.aliases, "aliases", id);

  if (categories.length === 0 || !categories.every((item) => isOneOf(item, songCategories))) {
    throw new Error(`${id}: categories saknas eller innehåller ett okänt värde`);
  }
  if (!audiences.every((item) => isOneOf(item, songAudiences))) {
    throw new Error(`${id}: audiences innehåller ett okänt värde`);
  }
  if (!isOneOf(data.rightsStatus, songRightsStatuses)) {
    throw new Error(`${id}: rightsStatus saknas eller är ogiltig`);
  }
  if (
    data.rightsStatus !== "legacy-unreviewed" &&
    (typeof data.rightsSource !== "string" ||
      !data.rightsSource.trim() ||
      typeof data.rightsCheckedAt !== "string" ||
      !/^\d{4}-\d{2}-\d{2}$/.test(data.rightsCheckedAt))
  ) {
    throw new Error(
      `${id}: granskade verk måste ha rightsSource och rightsCheckedAt (YYYY-MM-DD)`,
    );
  }

  const featuredRank = data.featuredRank;
  if (
    featuredRank !== undefined &&
    (typeof featuredRank !== "number" ||
      !Number.isInteger(featuredRank) ||
      featuredRank < 1)
  ) {
    throw new Error(`${id}: featuredRank måste vara ett positivt heltal`);
  }

  return {
    id,
    title: data.title,
    author: data.author,
    content,
    categories: categories as SongCategory[],
    audiences: audiences as SongAudience[],
    aliases,
    featuredRank: featuredRank as number | undefined,
    rightsStatus: data.rightsStatus,
    rightsSource: typeof data.rightsSource === "string" ? data.rightsSource : undefined,
    rightsCheckedAt:
      typeof data.rightsCheckedAt === "string" ? data.rightsCheckedAt : undefined,
  };
}

async function readSong(id: string, renderHtml: boolean) {
  const fullPath = path.join(songsDirectory, `${id}.md`);
  const fileContents = await fs.promises.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const renderedContent = renderHtml
    ? (await remark().use(html).process(content)).toString()
    : content;

  return parseSong(id, data, renderedContent);
}

export async function getAllSongs() {
  const fileNames = (await fs.promises.readdir(songsDirectory)).filter((name) =>
    name.endsWith(".md"),
  );
  const songs = await Promise.all(
    fileNames.map((fileName) => readSong(fileName.replace(/\.md$/, ""), false)),
  );

  const titles = new Map<string, string>();
  for (const song of songs) {
    const normalizedTitle = song.title.toLocaleLowerCase("sv");
    const duplicate = titles.get(normalizedTitle);
    if (duplicate) {
      throw new Error(`Duplicerad sångtitel: ${duplicate} och ${song.id}`);
    }
    titles.set(normalizedTitle, song.id);
  }

  return songs;
}

export async function getSongData(id: string) {
  return readSong(id, true);
}

export function plainText(content: string) {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/[\\\n]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
