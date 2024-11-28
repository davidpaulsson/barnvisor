import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const songsDirectory = path.join(process.cwd(), "content/songs");

export type Song = {
  id: string;
  title: string;
  author: string;
  content: string;
};

export function getAllSongs() {
  const fileNames = fs.readdirSync(songsDirectory);

  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(songsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      content,
      ...data,
    } as Song;
  });
}

export async function getSongData(id: string) {
  const fullPath = path.join(songsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    id,
    ...matterResult.data,
    content: contentHtml,
  } as Song;
}
