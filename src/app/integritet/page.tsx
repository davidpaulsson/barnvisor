import { IndexLink } from "@/components/index-link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Integritet och kakor | Barnvistexter.se",
  description:
    "Så behandlar Barnvistexter.se uppgifter om besök, annonser och kontakt.",
  alternates: { canonical: "https://www.barnvistexter.se/integritet" },
};

export default function PrivacyPage() {
  return (
    <>
      <IndexLink />
      <article className="col-span-3 space-y-8 [&_a]:underline [&_h2]:mb-3 [&_h2]:font-medium [&_p+p]:mt-3">
        <header>
          <h1 className="mb-3 text-2xl font-medium">Integritet och kakor</h1>
          <p className="text-sm text-muted-foreground">
            Uppdaterad 27 oktober 2026
          </p>
        </header>

        <section>
          <h2>Ansvarig och kontakt</h2>
          <p>
            David Paulsson ansvarar för Barnvistexter.se och behandlingen av
            personuppgifter på webbplatsen. Frågor om integritet skickas till{" "}
            <a href="mailto:david@davidpaulsson.se">david@davidpaulsson.se</a>.
            Sajten riktar sig främst till vuxna som söker sångtexter, till
            exempel föräldrar och pedagoger.
          </p>
        </section>

        <section>
          <h2>När du besöker sajten</h2>
          <p>
            Du behöver inget konto för att läsa texterna. Sökningar bland
            sångerna hanteras i din webbläsare. Ditt val av ljust eller mörkt
            tema sparas lokalt i webbläsaren.
          </p>
          <p>
            Webbplatsen driftas av Vercel. IP-adress, webbläsaruppgifter och
            tekniska loggar kan behandlas för att leverera sidorna, hantera fel
            och skydda webbplatsen. Den rättsliga grunden är vårt berättigade
            intresse av en fungerande och säker webbplats. Läs mer i{" "}
            <a href="https://vercel.com/legal/privacy-policy">
              Vercels integritetspolicy
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Besöksstatistik</h2>
          <p>
            Vi använder Umami Cloud för att förstå vilka sidor som används och
            förbättra sajten. Statistiken omfattar sidvisningar, hänvisande
            webbplatser, webbläsare, enhetstyp och ungefärlig geografisk plats.
            Umamis webbspårare använder inte kakor. IP-adressen behandlas vid
            insamlingen men sparas inte som ett fält i statistikens besöksdata.
          </p>
          <p>
            Den rättsliga grunden är vårt berättigade intresse av att följa upp
            och förbättra webbplatsen. Lagringstiden för statistik styrs av
            tjänstens abonnemang och inställningar. Information om tjänstens
            behandling och lagring finns i{" "}
            <a href="https://umami.is/privacy">Umamis integritetspolicy</a> och{" "}
            <a href="https://docs.umami.is/docs/cloud/faq">
              Umami Clouds dokumentation
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Annonser och ditt samtycke</h2>
          <p>
            Sångsidorna har en annonsplats under sångtexten. Google AdSense och
            dess annonspartners kan behandla IP-adress, enhetsuppgifter,
            annonsidentifierare och uppgifter om din användning samt använda
            kakor eller lokal lagring för annonsering och mätning.
          </p>
          <p>
            För besökare i EES, Storbritannien och Schweiz hanteras annonsvalen
            genom Googles samtyckesmeddelande. Du kan samtycka, neka eller välja
            vilka ändamål och leverantörer du accepterar. Där samtycke krävs
            grundas behandlingen på ditt val. Meddelandet beskriver också de
            ändamål för vilka annonspartners åberopar berättigat intresse och
            hur du kan invända. Även utan samtycke till personanpassning kan
            begränsade annonser förekomma.
          </p>
          <p>
            Du kan ändra eller återkalla ditt val via länken för integritets-
            och cookieinställningar längst ner på sidor där Googles
            samtyckesmeddelande visas. Du kan också radera kakor och lokalt
            sparade uppgifter i webbläsarens inställningar. Återkallat samtycke
            påverkar inte behandling som redan har skett.
          </p>
          <p>
            Mer information finns i{" "}
            <a href="https://policies.google.com/technologies/partner-sites">
              Så använder Google information från webbplatser som använder
              Googles tjänster
            </a>{" "}
            och{" "}
            <a href="https://policies.google.com/technologies/cookies">
              Googles information om kakor
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Lagring och leverantörer</h2>
          <p>
            Uppgifter som du skickar via e-post behandlas för att besvara ditt
            ärende och sparas så länge de behövs för detta. Drift-, statistik-
            och annonsuppgifter hanteras även av leverantörerna ovan enligt
            deras villkor och lagringsregler. Leverantörer kan behandla
            uppgifter utanför EES; deras integritetspolicyer beskriver
            överföringar och tillämpliga skyddsåtgärder.
          </p>
        </section>

        <section>
          <h2>Dina rättigheter</h2>
          <p>
            Du kan kontakta oss för att begära tillgång, rättelse, radering,
            begränsning eller överföring av dina personuppgifter, i den
            utsträckning rättigheterna gäller. Du kan invända mot behandling som
            grundas på berättigat intresse och återkalla samtycke. Du har också
            rätt att klaga hos{" "}
            <a href="https://www.imy.se/privatperson/utfora-arenden/lamna-ett-klagomal/">
              Integritetsskyddsmyndigheten
            </a>
            .
          </p>
        </section>
      </article>
      <div />
    </>
  );
}
