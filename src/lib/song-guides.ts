import content from "../../content/song-guides.json";

export type SongGuide = {
  intro: string;
  title: string;
  preparation: string;
  steps: string[];
  adaptation: string;
  discussion: string;
};

const guides: Record<string, SongGuide> = content;

export function getSongGuide(id: string): SongGuide | undefined {
  return Object.hasOwn(guides, id) ? guides[id] : undefined;
}
