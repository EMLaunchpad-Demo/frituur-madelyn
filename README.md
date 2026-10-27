# Frituur Madelyn: website

Website voor Frituur Madelyn, fietscafé en frituur met feestzaal Graethempoort,
Graethempoort 6, 3840 Borgloon. Gebouwd door EM Launchpad.

Gewone HTML, CSS en JavaScript, geen build-stap. De site draait als Cloudflare
Worker met statische bestanden, gekoppeld aan GitHub (zie "Online zetten").

## Pagina's

| URL | Bestand | Inhoud |
|---|---|---|
| `/` | `index.html` | Foto, welkom, aanbod, groepen en feestzaal, openingsuren, adres, kaart (laadt pas na een klik) |
| `/menu` | `menu.html` | Menukaart per categorie, zonder prijzen |
| `/feestzaal` | `feestzaal.html` | Feestzaal Graethempoort: 55 plaatsen, voorzieningen, waarvoor, eten, vragen |
| `/groepen` | `groepen.html` | Groepen en dagtoerisme: fietsers, autocars en verenigingen, groepsprijzen, Haspengouw |
| `/contact` | `contact.html` | Formulier (uit ons platform, zie hieronder), telefoon, e-mail, adres, openingsuren |
| (elke onbekende URL) | `404.html` | Foutpagina met `noindex` |

Verder:

- `assets/css/styles.css`: de enige stylesheet. Kleuren en lettertypes bovenaan.
- `assets/js/main.js`: openingsuren en "nu open", mobiel menu, kaart na klik, terugval voor het formulier, actieve rubriek in de springbalk van de menukaart, fade-in. Het script zet zelf de class `js` op `<html>` (er staat geen inline script in de pagina's): laadt het niet, dan blijft alle inhoud gewoon zichtbaar. Elk onderdeel draait apart (`run()`), zodat een fout in het ene de andere niet tegenhoudt.
- `assets/img/`: alle foto's (webp), `og.jpg` (1200x630, voor delen op sociale media) en `favicon.svg`.
- `assets/fonts/`: Barlow en Barlow Condensed (SIL Open Font License), lokaal, zodat er niets van Google geladen wordt.
- `sitemap.xml`, `robots.txt`, `_redirects`, `_headers`, `wrangler.jsonc`, `.assetsignore`.
- `.htaccess`: alleen voor Apache (oude Hostinger-aanpak). Wordt op Cloudflare niet gebruikt en niet gepubliceerd.
- `_oude-site/`: kopie van de vorige website (HTML en foto's), de controle-screenshots en ongebruikte foto's (`ongebruikt/`). Alleen lokaal: niet op de site (`.assetsignore`) en niet in git (`.gitignore`).

## Bevestigd

Bron: de vorige website frituurmadelyn.be, gelezen op 26/10/2026. De HTML staat in
`_oude-site/paginas/`, de foto's in `_oude-site/fotos/`.

- **Naam:** Frituur Madelyn, "fietscafé en frituur", met feestzaal Graethempoort. Op de gevel staat "Taverne Graethempoort" en "feestzaal".
- **Adres:** Graethempoort 6, 3840 Borgloon.
- **Telefoon:** 012 74 20 24 (vast, `+3212742024`) is het hoofdnummer en staat overal eerst (Madelyn via Martijn, 27/10/2026); daarna 0465 64 62 25 (gsm, `+32465646225`).
- **E-mail:** frituurmadelynbv6@gmail.com. (Het vroegere `info@frituurmadelyn.be` bestaat niet aantoonbaar en is overal weg, ook in de structured data.)
- **Btw:** BE1012.043.560 (klein in de footer).
- **Facebook:** https://www.facebook.com/Madelyn-Frituur-Borgloon-317933245322579
- **Uitbaters:** Ravi en Sam.
- **Openingsuren:** elke dag 11:00-14:00 en 16:30-22:00, vrijdag en zaterdag 16:30-23:00. Open 7 op 7, ook op zon- en feestdagen. (De oude site schrijft "zondag tot maandag", bedoeld is zondag tot donderdag.)
- **Betalen:** ook met Bancontact (betaalkaart).
- **Aanbod:** friet en snacks, verse dagsoep met brood, koude en warme broodjes, ambachtelijk ijs, huisbereide gerechten (spaghetti, stoofvlees naar bomma's idee, varkentje Amor, vidé), koude schotels.
- **Menukaart:** de lijst gerechten van de oude site, per categorie, zonder prijzen. Alleen kleine spellingcorrecties: Saté, Hawaïburger, Hawaï, Vidé, Gehaktstaaf, Kippenbil, ½ kip, "Nuggets (5 st.)". Namen als Shalick, Carrero, Stache en "Sweet chic inn chili" zijn overgenomen zoals ze op de oude site stonden.
- **Dagtoerisme en groepen:** specialist in dagtoerisme, in groep of individueel; toeristische info en Haspengouwse streekproducten; vaste groepsarrangementen; speciale prijzen voor autocars en verenigingen; picknick toegestaan mits 1 consumptie; koffiestop, middagmaal, vieruurtje, warm of koud avondmaal; reservatie gewenst.
- **Feestzaal:** 55 plaatsen, airconditioning en rookafzuiging, ruime parking voor autocars op 100 m, aangepast toilet voor rolstoelgebruikers, laadpaal voor elektrische fietsen. Voor vergaderingen, privégelegenheden, communiefeesten, trouwfeesten, workshops, demonstraties, hobby's. Kan ook verhuurd worden aan traiteurs.

## Nog te bevestigen door Frituur Madelyn

- [ ] **Groepsprijzen** op `/groepen` (koffie- of theestop € 3,00, met koek € 5,00, broodmaaltijd € 6,00 of € 8,00, menu's € 11,00 en € 13,00 p.p.). Ze komen van de oude site en zijn jaren oud. Op de pagina staat "Prijzen onder voorbehoud, vraag een offerte op maat." Ze staan bewust niet in de structured data.
- [ ] **Is `snackvitrine.jpg` een foto van jullie eigen vitrine?** Op de oude site was het de algemene achtergrond bovenaan elke pagina, en het lijkt een professionele productfoto (merkverpakkingen, andere bakken dan op de toogfoto). Zo niet: als stockfoto behandelen. Tot dan staat er een neutrale alt-tekst ("Een snackvitrine ...").
- [ ] **Eigen foto's van de zaal binnen** (feestzaal, taverne, terras) en van eigen gerechten. Nu is er alleen de gevel; de feestzaal wordt met geen enkele stockfoto voorgesteld.
- [ ] **Coördinaten** in de structured data: nu `50.80338, 5.34087`, het gebouw Graethempoort 6 volgens OpenStreetMap. Vergelijk met de pin in het Google Bedrijfsprofiel. Staan op drie plekken: `index.html`, `contact.html`, `feestzaal.html`.
- [ ] **Google Bedrijfsprofiel:** naam, adres, telefoon en uren moeten daar exact gelijk zijn aan de site. Welk nummer staat daar als hoofdnummer?
- [ ] **Facebook-link** werkt nog (de link van de oude site, met paginanummer).

## Foto's

Echte foto's van de zaak (van de oude site, omgezet naar webp):

| Waar | Bestand | Bron |
|---|---|---|
| Home (welkom) | `gevel-graethempoort.webp` (+ `-800`) | `_oude-site/fotos/gevel-graethempoort.jpg` |
| Feestzaal (bovenaan) | `gevel-feestzaal.webp` (700x525) | uitsnede van dezelfde gevelfoto, op de luifel met "feestzaal" |
| Menukaart (tussen de lijsten) | `toog-snacks.webp` (+ `-800`) | `_oude-site/fotos/toog-snacks.jpg`, witbalans gecorrigeerd (paarse zweem weg) |
| Home (burgers en broodjes) | `toog-hamburgers.webp` (800x600) | uitsnede van dezelfde toogfoto: platte hamburgers, kroketten en friet |
| Home (groepen en feestzaal), groepen (bovenaan) | `fietsers-terras.webp` | `_oude-site/fotos/dagtoerist.jpg` |
| Delen op sociale media | `og.jpg` (1200x630) | uit de gevelfoto |

Herkomst onzeker (zie "Nog te bevestigen"): `snackvitrine-1600.webp` (+ `-800`), uit `_oude-site/fotos/snackvitrine.jpg`, op home (snacks) en bovenaan de menukaart. Alleen met een neutrale alt-tekst gebruiken, nooit als "onze vitrine".

Niet gebruikt: `dagtoerist-2.jpg` (mosselen met friet; mosselen staan niet op de menukaart), `Bancontact.jpg` (betaalterminal) en het oude logo.

Stockfoto's van [Pexels](https://www.pexels.com/license/) (gratis, ook commercieel, naamsvermelding niet verplicht), lokaal opgeslagen. Ze tonen alleen eten, nooit de zaak of de feestzaal:

| Waar | Bestand | Foto |
|---|---|---|
| Home, bovenaan | `friet-friteuse-1600.webp` (+ `-800`) | [pexels.com/photo/15234683](https://www.pexels.com/photo/15234683/) (Wijs) |
| Home, huisbereid | `stoofvlees-1600.webp` (+ `-800`) | [pexels.com/photo/8024112](https://www.pexels.com/photo/8024112/) (Mateusz Feliksik) |

De vroegere stockfoto van een burger met spek (`burger-friet-*.webp`, Pexels 2983101) stelde het aanbod verkeerd voor en staat nu in `_oude-site/ongebruikt/`. Vervang de stoofvleesfoto en de friet bovenaan door eigen foto's zodra die er zijn (bicky met friet aan de toog, stoofvlees in hun eigen bakje).

De friet bovenaan is maar 1600 px breed. Op een gsm laadt de 1600-versie (`sizes` met 180vw) en is ze ongeveer 1,3 keer vergroot; op een retina-laptop ongeveer 1,8 keer. Scherper kan met het Pexels-origineel (15234683) in hoge resolutie: een staande uitsnede voor gsm (bv. 1000x1500, via `<picture>`) en een 2400w-versie voor desktop.

Geen enkele afbeelding of lettertype komt nog van een andere server.

## Contactformulier (voor Boma)

Op `/contact` staat de plek voor het formulier uit ons platform:

```html
<div class="contact-form" id="formulier">
  <!-- FORMULIER-EMBED -->
  <noscript>...</noscript>
</div>
```

1. Maak het formulier in ons platform (velden bv. naam, e-mail, telefoon, bericht; in het bericht vragen we datum, aantal personen en wat ze willen).
2. Kies de **inline** embed (een `iframe` + het embed-script) en zet die in `contact.html` op de plaats van `<!-- FORMULIER-EMBED -->`. Laat de `div` met `id="formulier"` en de `noscript` staan: de knoppen "Vraag een offerte" op home, feestzaal en groepen linken naar `/contact#formulier`.
3. Geef de `iframe` `class="form-frame"` en een `title` (bv. "Contactformulier Frituur Madelyn"). De CSS toont hem dan op volle breedte, minimaal 640 px hoog, wit, met afgeronde hoeken. Zodra er een `iframe` in de `div` staat, valt de rand rond het vak weg (`.contact-form:has(iframe)`), zodat er geen kader in een kader komt. Neem het embed-script mee: dat laat de `iframe` meegroeien als het formulier hoger is dan 640 px, zonder tweede schuifbalk.
4. Zet in de formulierinstellingen geen tracking aan (geen pixel, geen analytics). De site zelf zet geen cookies en laadt niets van derden, daarom is er geen cookiebanner. Komt er toch tracking bij, dan is een cookiebanner nodig.
5. Test het formulier zelf in ons platform, niet door op de live site te versturen.

Zolang er geen `iframe` in de `div` staat, toont `main.js` daar de telefoonnummers en het e-mailadres, zodat de pagina nooit leeg is. Onder het formulier staat: "We gebruiken je gegevens alleen om je vraag te beantwoorden."

## Online zetten (Cloudflare)

Zelfde werkwijze als Clinic3D (zie `ai-team/kennis/martijn/claudecode-06-klantsites-op-cloudflare.md`).

1. **Repo op GitHub** in de organisatie EMLaunchpad-Demo (bv. `EMLaunchpad-Demo/frituur-madelyn`), branch `main`. Martijn maakt de repo aan en koppelt Cloudflare.
2. **Cloudflare:** Workers & Pages, nieuwe Worker vanuit de GitHub-repo. Geen build-commando; het deploy-commando is `npx wrangler deploy`. De instellingen staan in `wrangler.jsonc`:
   - `name`: `frituur-madelyn`, `compatibility_date`: `2026-10-20`, observability aan;
   - `assets.directory`: `.` (de hele map), `not_found_handling`: `404-page` (echte 404 met `404.html`).
   - `.assetsignore` houdt `.git`, `_oude-site`, `README.md`, `.htaccess`, de wrangler-bestanden en andere werkbestanden uit de publieke site.
3. **Domein:** koppel `frituurmadelyn.be` als Custom Domain aan de Worker. Vraag eerst toestemming aan de klant en kijk waar het domein nu geregistreerd is (de oude site is gemaakt door Wikon Computers). Pas de website-records pas aan op het moment van de overstap. Het e-mailadres op de site is een Gmail-adres; kijk toch of er MX- of andere records op het domein staan en neem die mee.
4. **www doorsturen** (Rules, Redirect Rule), zoals bij Clinic3D:

   | Veld | Waarde |
   |---|---|
   | Request URL | `*www.frituurmadelyn.be/*` |
   | Target URL | `https://frituurmadelyn.be/${2}` |
   | Status code | `301` |
   | Preserve query string | aan |

   Vraagt Cloudflare om een DNS-record: "Create a new proxied DNS record", type `A`, naam `www`, IPv4 `192.0.2.1`.
5. **SSL/TLS:** "Always Use HTTPS" aan.
6. **Na de livegang:** controleer elke URL uit `sitemap.xml` (200), elke regel uit `_redirects` (301) en dat `/README.md`, `/.htaccess`, `/wrangler.jsonc` en `/_oude-site/...` een 404 geven. Dien `https://frituurmadelyn.be/sitemap.xml` in bij Google Search Console en Bing Webmaster Tools.

### Schone URL's en doorverwijzingen

- Elke pagina is een `x.html` in de hoofdmap; Cloudflare toont die op `/x`. Alle interne links, canonicals en `og:url` gebruiken `https://frituurmadelyn.be/x` (zonder www, zonder `.html`, zonder slash op het einde; home is `https://frituurmadelyn.be/`).
- `_redirects` geeft een 301 voor de oude URL's van de vorige site:

  | Oud | Nieuw |
  |---|---|
  | `/index.html` | `/` |
  | `/menu.html` | `/menu` |
  | `/feestzaal.html` | `/groepen` |
  | `/aan-het-fornuis.html` | `/groepen` |
  | `/speciale-prijzen.html` | `/groepen` |
  | `/contact.html` | `/contact` |
  | `/foto.html` | `/` |
  | `/feestzaal-greathempoort`, `/feestzaal-greathempoort/` en `/feestzaal-greathempoort/index.html` | `/feestzaal` |

  Daarnaast `/groepen.html` en de slash-varianten `/menu/`, `/feestzaal/`, `/groepen/`, `/contact/` naar de URL zonder slash (anders geeft Cloudflare een tijdelijke 307).
- **Keuze voor `/feestzaal.html`:** op de oude site was `feestzaal.html` de pagina "Dagtoerist" (de echte feestzaalpagina stond op `/feestzaal-greathempoort/`). Daarom gaat `/feestzaal.html` met een 301 naar `/groepen`. Dat breekt de nieuwe feestzaalpagina niet: Cloudflare kijkt in `_redirects` alleen naar het gevraagde pad. Wie `/feestzaal` opvraagt, krijgt direct `feestzaal.html` (200); alleen wie letterlijk `/feestzaal.html` opvraagt (oude links), gaat naar `/groepen`. Zonder die regel zou Cloudflare `/feestzaal.html` zelf met een 307 naar `/feestzaal` sturen. Geen enkele regel verwijst naar zichzelf en er zijn geen ketens.
- Lokaal getest met `wrangler dev` (zelfde gedrag als Cloudflare): `/`, `/menu`, `/feestzaal`, `/groepen`, `/contact` geven 200; alle regels hierboven geven 301 naar het juiste doel; `/bestaat-niet` geeft 404 met de foutpagina; `/README.md`, `/.htaccess`, `/wrangler.jsonc`, `/_redirects`, `/_headers`, `/.git/HEAD` en `/_oude-site/...` geven 404.

### `_headers`

Beveiligingsheaders op alle pagina's (`X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`) en een week browsercache voor `/assets/*`. Daarom staat er `?v=20261026` achter `styles.css` en `main.js`: verhoog dat getal op alle pagina's als je de CSS of JS wijzigt.

### Lokaal bekijken

`py -m http.server` kent geen schone URL's. Gebruik wrangler (staat in `Websites/Clinic3D/kennis/tools/playwright/node_modules`), vanuit deze map:

```
node "<pad>/node_modules/wrangler/bin/wrangler.js" dev --port 8788 --compatibility-date 2026-10-19
```

(De lokale wrangler-versie kent `2026-10-20` nog niet; op Cloudflare zelf is dat geen probleem.)

## Onderhoud

- **Openingsuren wijzigen:** `HOURS` in `assets/js/main.js`, de vaste tabel en de `openingHoursSpecification` in `index.html` en `contact.html`, en de footer van alle pagina's.
- **Structured data van de frituur:** het `FastFoodRestaurant`-blok staat twee keer, in `index.html` en (als `mainEntity`) in `contact.html`, met dezelfde `@id` (`https://frituurmadelyn.be/#frituur`). Google voegt die niet samen over pagina's heen: houd beide blokken altijd gelijk (naam, beschrijving, telefoon, e-mail, btw, betalen, adres, coördinaten, uren, `containsPlace`, Facebook).
- **Telefoon of e-mail wijzigen:** zoek en vervang in alle `.html`-bestanden en in `assets/js/main.js` (terugval van het formulier).
- **Menukaart wijzigen:** `menu.html`, en ook de Menu-structured data bovenaan dezelfde pagina.
- **Header en footer** staan in elke pagina apart (geen build-stap): pas ze overal gelijk aan.

## SEO

Per pagina een eigen titel (max. ongeveer 60 tekens) en beschrijving, één H1, alt-teksten,
canonical en og-tags met `og.jpg`. Structured data: `FastFoodRestaurant` (home en contact, met
adres, telefoon, uren en Facebook), `Menu` zonder prijzen, `EventVenue` en `FAQPage` (feestzaal),
`BreadcrumbList` op elke subpagina. Geen Google Analytics of andere tracking.

Wat buiten de site het meeste oplevert: het Google Bedrijfsprofiel. Houd naam, adres,
telefoon en openingsuren daar exact gelijk aan de site, zet er eigen foto's op en vraag
klanten om een review.

## Controle

Screenshots van elke pagina (desktop 1440 px en mobiel 390 px) staan in `_oude-site/controle/` (niet publiek, en via `.gitignore` ook niet in git).
