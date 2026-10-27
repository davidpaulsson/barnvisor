# Barnvistexter.se

Sångtexter till svenska barnvisor, vaggvisor, sånglekar och ramsor.

## Innehåll

Sångerna ligger i content/songs och måste ha följande frontmatter:

    title: "Sångens titel"
    author: "Upphovsperson eller Traditionell"
    categories: ["barnvisa", "klassisk"]
    audiences: ["förskola"]
    aliases: []
    rightsStatus: "public-domain"
    rightsSource: "https://kalla.example"
    rightsCheckedAt: "2026-08-09"

Tillåtna kategorier och målgrupper definieras i src/lib/md.ts. Befintliga
texter är märkta legacy-unreviewed. En ny text får bara använda public-domain
eller licensed och måste ha en dokumenterad källa och ett kontroldatum.

Samlingarna och deras SEO-innehåll definieras i src/lib/collections.ts.
Sätt inte published till true förrän samlingen har ett relevant urval och
innehållet är granskat. Endast publicerade samlingar genererar routes och
poster i sitemap.

## Uppföljning

Ta en Search Console-baslinje för sex månader före publicering. Följ klick,
visningar, CTR, position och indexering efter 28, 56 och 84 dagar. Prioritera
därefter individuella innehållsförbättringar för sökfrågor där sajten redan
ligger ungefär position 5–20.

## Annonser

Varje sångsida har en enda annonsplats direkt efter sångtexten. Startsidan
och samlingssidorna har inga annonsplatser. Bannern följer textkolumnens bredd
och är 90 px hög. Tomma annonsplatser och annonser vid utskrift döljs.

Ingen automatisk annonsuppdatering används. Lokalt visas endast den reserverade
platsen, utan annonsanrop.
