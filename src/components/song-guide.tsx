import type { SongGuide as Guide } from "@/lib/song-guides";

export function SongGuide({ guide }: { guide: Guide }) {
  return (
    <section aria-labelledby="sangtips" className="mt-10 border-t pt-8">
      <h2 id="sangtips" className="mb-3 text-lg font-medium">
        {guide.title}
      </h2>
      <p className="text-sm text-muted-foreground">
        Ett eget aktivitetsförslag från Barnvistexter. Det beskriver ett sätt
        att använda visan, inte en dokumenterad traditionell lek.
      </p>
      <p className="text-muted-foreground">
        <strong className="font-medium text-foreground">Förbered: </strong>
        {guide.preparation}
      </p>
      <ol className="mb-8 list-decimal space-y-3 pl-6 text-muted-foreground marker:text-foreground">
        {guide.steps.map((step) => (
          <li key={step} className="pl-1">
            {step}
          </li>
        ))}
      </ol>
      <h3 className="mb-2 font-medium">Anpassa sångstunden</h3>
      <p className="whitespace-pre-line text-muted-foreground">
        {guide.adaptation}
      </p>
      <h3 className="mb-2 font-medium">Ord och innehåll att prata om</h3>
      <p className="text-muted-foreground">{guide.discussion}</p>
    </section>
  );
}
