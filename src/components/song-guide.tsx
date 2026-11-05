import type { SongGuide as Guide } from "@/lib/song-guides";

export function SongGuide({ guide }: { guide: Guide }) {
  return (
    <section aria-labelledby="sangtips" className="mt-10 border-t pt-6">
      <h2 id="sangtips" className="mb-3 text-base font-medium text-foreground">
        {guide.title}
      </h2>
      <p className="text-muted-foreground">
        <strong className="font-medium text-foreground">Förbered: </strong>
        {guide.preparation}
      </p>
      <ol className="mb-6 list-decimal space-y-1 pl-6 leading-6 text-muted-foreground marker:text-foreground">
        {guide.steps.map((step) => (
          <li key={step} className="pl-1">
            {step}
          </li>
        ))}
      </ol>
      <h3 className="mb-3 text-base font-medium text-foreground">
        Anpassa sångstunden
      </h3>
      <p className="whitespace-pre-line text-muted-foreground">
        {guide.adaptation}
      </p>
      <h3 className="mb-3 text-base font-medium text-foreground">
        Ord och innehåll att prata om
      </h3>
      <p className="text-muted-foreground">{guide.discussion}</p>
    </section>
  );
}
