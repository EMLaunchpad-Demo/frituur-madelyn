# Frituur Madelyn — demo-website

Een demo-/voorbeeldwebsite voor **Frituur Madelyn** (Graethempoort 6, 3840 Borgloon),
gemaakt door **EM Launchpad** als aanzet voor de kennismaking. Eén zelfstandig HTML-bestand,
geen build-stap, geen frameworks — gewoon `index.html` openen in een browser.

## Wat zit erin

- **Uniek, warm "avondfriet"-design** — goud-amber + petrol-groen palet (bewust geen standaard
  rood/geel fastfood-look), met een handgetekende puntzak-illustratie, dampende friet en
  kraftpapier-textuur. Donker- én lichtthema (schakelaar in de navigatie).
- **Volledig online afhaal-bestelsysteem** (`Bestellen`):
  - 9 categorieën, ~55 authentieke Belgische frituurgerechten met prijzen.
  - Opties-venster voor o.a. frietjesformaat, mitraillette-snack en kindermenu.
  - Winkelmandje vormgegeven als een echte **kassabon/bestelbon** die uitschuift, met
    aantal-teller, afhaaltijd-keuze, naam/telefoon en een bevestigingsbon met bestelnummer.
  - Mandje blijft bewaard (localStorage). Openingsstatus ("nu open / gesloten") wordt live berekend.
- **Extra secties**: toppers van 't huis, "ons verhaal", **Feestzaal Graethempoort**,
  reviews, openingsuren met "vandaag"-markering, en een gestileerde kaart van Borgloon.
- Responsief (mobiel/tablet/desktop), toegankelijk (focus-states, toetsenbord, `prefers-reduced-motion`).

## Bekijken

Open `index.html` rechtstreeks in de browser (dubbelklik). Alles werkt lokaal.
Er is ook een deelbare online-preview beschikbaar (zie de begeleidende boodschap).

## Nog aan te vullen / te controleren vóór livegang

Dit is een **demo** — sommige gegevens zijn plausibele voorbeelden en moeten door de klant bevestigd worden:

- **Echte foto's.** De site toont nu nette illustratie-tegels als val-terug. Op de plekken met
  `class="photo"` (hero-toppers, "ons verhaal") staat al een `<img>` klaar: vervang de `src` door
  de eigen foto's van Frituur Madelyn (bv. van hun Facebook) en de foto verschijnt automatisch;
  faalt het laden, dan blijft de illustratie staan. Geen codewijziging nodig behalve de URL.
- **Telefoonnummer** (`012 74 20 24`), **e-mail**, **oprichtingsjaar** ("sinds '82") en de exacte
  **openingsuren** en **prijzen**: even aftoetsen met de klant.
- Menu-items en beschrijvingen zijn samengesteld uit publiek beschikbare info + typische
  frituurkaart — laten nakijken/aanvullen door de zaak.

## Technisch

- `index.html` — de volledige site (HTML + CSS + JS inline).
- Lettertypes via Google Fonts (Bricolage Grotesque, Anton, Hanken Grotesk, Caveat).
- Geen externe libraries, geen tracking, geen betaalintegratie (bestelling is een demo-flow).
