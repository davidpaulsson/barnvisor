import type { Song, SongAudience, SongCategory } from "@/lib/md";

export const siteUrl = "https://www.barnvistexter.se";

export type CollectionSection = {
  title: string;
  description?: string;
  categories?: SongCategory[];
  audiences?: SongAudience[];
};

export type CollectionDefinition = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  categories?: SongCategory[];
  audiences?: SongAudience[];
  sections?: CollectionSection[];
  faqs: { question: string; answer: string }[];
  priority: number;
  published: boolean;
};

export const collections: CollectionDefinition[] = [
  {
    slug: "barnvisor",
    name: "Barnvisor",
    title: "Barnvisor – texter till svenska barnsånger",
    description:
      "Hitta texter till klassiska och moderna svenska barnvisor, från sånger för de minsta till välkända sånglekar.",
    intro:
      "Här hittar du svenska barnvisor samlade på ett ställe. Sök bland klassiker, vaggvisor, sånglekar och sånger som passar hemma eller i förskolan.",
    categories: ["barnvisa"],
    sections: [
      { title: "Klassiska barnvisor", categories: ["klassisk"] },
      { title: "Vaggvisor", categories: ["vaggvisa"] },
      { title: "Sånglekar", categories: ["sånglek"] },
    ],
    faqs: [
      {
        question: "Vilka svenska barnvisor är mest kända?",
        answer:
          "Björnen sover, Imse vimse spindel, Bä bä vita lamm och Blinka lilla stjärna hör till de mest välkända svenska barnvisorna.",
      },
      {
        question: "Var hittar jag visor för små barn?",
        answer:
          "I samlingarna för bebisar, förskolan, vaggvisor och sånglekar går det att hitta visor efter situation och ålder.",
      },
    ],
    priority: 1,
    published: true,
  },
  {
    slug: "vaggvisor",
    name: "Vaggvisor",
    title: "Vaggvisor – klassiska godnattsånger för barn",
    description:
      "Texter till svenska vaggvisor och lugna sånger för läggningen, från Trollmors vaggvisa till Byssan lull.",
    intro:
      "Vaggvisor är lugna sånger som hjälper barn att komma till ro. Här finns både gamla svenska vaggvisor och nyare favoriter att sjunga vid läggningen.",
    categories: ["vaggvisa"],
    sections: [
      { title: "Klassiska svenska vaggvisor", categories: ["vaggvisa", "klassisk"] },
      { title: "Vaggvisor för bebisar", categories: ["vaggvisa"], audiences: ["bebis"] },
    ],
    faqs: [
      {
        question: "Vad är en vaggvisa?",
        answer:
          "En vaggvisa är en lugn sång som traditionellt sjungs för att trösta ett barn eller hjälpa barnet att somna.",
      },
      {
        question: "Vilka vaggvisor passar för bebisar?",
        answer:
          "Korta och återkommande visor som Blinka lilla stjärna, Trollmors vaggvisa och Sov du lilla videung är vanliga val.",
      },
    ],
    priority: 0.9,
    published: true,
  },
  {
    slug: "godnattsanger",
    name: "Godnattsånger",
    title: "Godnattsånger för barn – lugna sånger vid läggdags",
    description:
      "Lugna godnattsånger för barn, med texter som passar kvällsrutinen och stunden innan barnet ska sova.",
    intro:
      "Godnattsånger passar i kvällsrutinen när tempot ska gå ner. Samlingen innehåller lugna sånger om sömn och natt, inklusive men inte begränsat till traditionella vaggvisor.",
    categories: ["godnattsång"],
    sections: [
      { title: "Sånger om sömn och natt", categories: ["godnattsång"] },
      { title: "Vaggvisor vid läggningen", categories: ["vaggvisa", "godnattsång"] },
    ],
    faqs: [
      {
        question: "Vad är skillnaden mellan en godnattsång och en vaggvisa?",
        answer:
          "Vaggvisor är en traditionell typ av lugn sång. Godnattsånger är ett bredare urval av sånger om kväll, sömn och trygghet.",
      },
    ],
    priority: 0.85,
    published: true,
  },
  {
    slug: "klassiska-barnvisor",
    name: "Klassiska barnvisor",
    title: "Klassiska barnvisor – välkända svenska sånger",
    description:
      "Texter till klassiska svenska barnvisor som har sjungits av flera generationer barn och vuxna.",
    intro:
      "Det här är barnvisor som många känner igen från barndomen. Samlingen rymmer traditionella visor och äldre svenska favoriter som fortfarande sjungs i dag.",
    categories: ["klassisk"],
    faqs: [
      {
        question: "Vad räknas som en klassisk barnvisa?",
        answer:
          "Här används begreppet för traditionella och äldre välkända visor som har levt vidare mellan generationer.",
      },
    ],
    priority: 0.85,
    published: true,
  },
  {
    slug: "barnvisor-forskola",
    name: "Barnvisor för förskolan",
    title: "Barnvisor för förskolan – sånger och sånglekar",
    description:
      "Barnvisor, rörelsesånger och sånglekar som passar samlingar och musikstunder i förskolan.",
    intro:
      "Här finns lättsjungna barnvisor för samlingen, rörelsepausen och förskolans gemensamma musikstunder.",
    audiences: ["förskola"],
    sections: [
      { title: "Sånglekar med rörelser", categories: ["sånglek"], audiences: ["förskola"] },
      { title: "Klassiker i samlingen", categories: ["klassisk"], audiences: ["förskola"] },
    ],
    faqs: [
      {
        question: "Vilka visor passar på förskolan?",
        answer:
          "Tydliga melodier, upprepningar och rörelser gör visor som Imse vimse spindel och Björnen sover lätta att använda i en grupp.",
      },
    ],
    priority: 0.75,
    published: true,
  },
  {
    slug: "barnvisor-bebis",
    name: "Barnvisor för bebisar",
    title: "Barnvisor för bebisar – enkla och lugna sånger",
    description:
      "Korta, trygga och återkommande barnvisor för bebisar och barn omkring ett år.",
    intro:
      "För en bebis är rösten och upprepningen viktigare än en lång text. Här finns korta visor, ramsor och vaggvisor som passar de allra minsta.",
    audiences: ["bebis"],
    sections: [
      { title: "Lugna visor för de minsta", categories: ["vaggvisa"], audiences: ["bebis"] },
      { title: "Korta visor och ramsor", categories: ["ramsa"], audiences: ["bebis"] },
    ],
    faqs: [
      {
        question: "Vilka barnvisor passar en ettåring?",
        answer:
          "Korta visor med upprepningar och enkla rörelser passar ofta bra, till exempel Imse vimse spindel och Bä bä vita lamm.",
      },
    ],
    priority: 0.75,
    published: true,
  },
  {
    slug: "sanglekar",
    name: "Sånglekar",
    title: "Sånglekar för barn – visor med rörelser",
    description:
      "Texter till svenska sånglekar och rörelsesånger för barn hemma och i förskolan.",
    intro:
      "Sånglekar kombinerar musik, rörelse och gemenskap. Här finns visor där barnen kan härma rörelser, räkna eller leka tillsammans.",
    categories: ["sånglek"],
    faqs: [
      {
        question: "Vad är en sånglek?",
        answer:
          "En sånglek är en visa som kombineras med bestämda rörelser, en ringdans eller en gemensam lek.",
      },
    ],
    priority: 0.75,
    published: true,
  },
  {
    slug: "ramsor",
    name: "Ramsor för barn",
    title: "Ramsor för barn – korta svenska rim och verser",
    description:
      "Korta ramsor, rim och verser för små barn, lekstunder och förskolan.",
    intro:
      "Ramsor använder rytm, rim och upprepning och är enkla att säga tillsammans. Här samlas korta svenska ramsor och ramsliknande visor.",
    categories: ["ramsa"],
    faqs: [
      {
        question: "Varför är ramsor bra för barn?",
        answer:
          "Rytm och upprepning kan göra det lättare att leka med språk, ljud och nya ord tillsammans.",
      },
    ],
    priority: 0.7,
    published: true,
  },
  {
    slug: "sommarsanger",
    name: "Sommarsånger",
    title: "Sommarsånger för barn – svenska visor om sommaren",
    description:
      "Texter till svenska sommarsånger för barn, skolavslutning och lediga sommardagar.",
    intro:
      "Här finns barnvisor om sol, blommor och sommarlov – från klassiska sommarvisor till nyare favoriter.",
    categories: ["sommar"],
    faqs: [
      {
        question: "Vilka sommarsånger brukar barn sjunga?",
        answer:
          "Idas sommarvisa, Ute blåser sommarvind och andra visor om natur och sommarlov är vanliga val.",
      },
    ],
    priority: 0.7,
    published: true,
  },
  {
    slug: "midsommarvisor",
    name: "Midsommarvisor",
    title: "Midsommarvisor för barn – sånger till dansen",
    description:
      "Texter till svenska midsommarvisor och sånglekar för barn, från Små grodorna till Skära, skära havre.",
    intro:
      "Här hittar du klassiska midsommarvisor för dansen och lekarna runt midsommarstången. Samlingen innehåller både enkla sånglekar och äldre svenska ringdanser.",
    categories: ["midsommar"],
    faqs: [
      {
        question: "Vilka visor brukar barn sjunga på midsommar?",
        answer:
          "Små grodorna, Skära, skära havre och andra enkla ring- och sånglekar hör till de vanligaste valen runt midsommarstången.",
      },
    ],
    priority: 0.6,
    published: true,
  },
  {
    slug: "julsanger",
    name: "Julsånger för barn",
    title: "Julsånger för barn – klassiska svenska julsånger",
    description:
      "Texter till klassiska svenska julsånger för barn, julfirandet och dansen runt granen.",
    intro:
      "Här hittar du klassiska julsånger för barn, från lugna julvisor till sånglekar för dansen runt granen.",
    categories: ["jul"],
    faqs: [
      {
        question: "Vilka julsånger passar barn?",
        answer:
          "En sockerbagare, Nu är det jul igen, Hej tomtegubbar och Midnatt råder är välkända julsånger som är lätta att sjunga tillsammans.",
      },
    ],
    priority: 0.75,
    published: true,
  },
  {
    slug: "luciasanger",
    name: "Luciasånger",
    title: "Luciasånger för barn – sånger till lucia",
    description: "Texter till svenska luciasånger för barn, skola och förskola.",
    intro: "Här samlas välkända sånger till luciatåg i skola och förskola.",
    categories: ["lucia"],
    faqs: [],
    priority: 0.65,
    published: false,
  },
  {
    slug: "pasksanger",
    name: "Påsksånger",
    title: "Påsksånger för barn – visor till påsk",
    description: "Svenska påsksånger för barn, förskola och påskfirande.",
    intro: "Här samlas barnvisor som passar påskfirandet.",
    categories: ["påsk"],
    faqs: [],
    priority: 0.55,
    published: false,
  },
];

export const publishedCollections = collections.filter((collection) => collection.published);

export function getCollection(slug: string) {
  return publishedCollections.find((collection) => collection.slug === slug);
}

function matchesAny<T>(values: T[], requested?: T[]) {
  return !requested?.length || requested.some((value) => values.includes(value));
}

export function matchesCollection(song: Song, collection: CollectionDefinition) {
  return (
    matchesAny(song.categories, collection.categories) &&
    matchesAny(song.audiences, collection.audiences)
  );
}

export function getCollectionSongs(songs: Song[], collection: CollectionDefinition) {
  return songs.filter((song) => matchesCollection(song, collection));
}

export function getSectionSongs(songs: Song[], section: CollectionSection) {
  return songs.filter(
    (song) =>
      (!section.categories?.length ||
        section.categories.every((category) =>
          song.categories.includes(category),
        )) &&
      matchesAny(song.audiences, section.audiences),
  );
}

export function getSongCollections(song: Song) {
  return publishedCollections.filter(
    (collection) => collection.slug !== "barnvisor" && matchesCollection(song, collection),
  );
}

export function getPrimaryCollection(song: Song) {
  return getSongCollections(song)[0] ?? getCollection("barnvisor")!;
}

export function getRelatedSongs(song: Song, songs: Song[], limit = 6) {
  return songs
    .filter((candidate) => candidate.id !== song.id)
    .map((candidate) => ({
      song: candidate,
      score:
        candidate.categories.filter(
          (category) =>
            category !== "barnvisa" && song.categories.includes(category),
        ).length *
          3 +
        candidate.audiences.filter((audience) => song.audiences.includes(audience)).length * 2 +
        (candidate.author === song.author && song.author !== "Okänd" ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.song.title.localeCompare(b.song.title, "sv"))
    .slice(0, limit)
    .map(({ song: candidate }) => candidate);
}
