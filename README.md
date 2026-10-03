# Frituur Madelyn — website

Statische website voor **Frituur Madelyn**, Graethempoort 6, 3840 Borgloon.
Gebouwd door **EM Launchpad**. Geen frameworks, geen build-stap: de bestanden
kunnen rechtstreeks naar Hostinger geüpload worden.

---

## 1. Wat er in zit

**5 pagina's**

| Bestand | Pagina | Doel |
|---|---|---|
| `index.html` | Home | Merkverhaal, toppers, categorieën, uren |
| `menu.html` | Menukaart | Volledige kaart met prijzen (hoofdpagina voor SEO) |
| `over-ons.html` | Ons verhaal | Verhaal, werkwijze, Haspengouw |
| `feestzaal.html` | Feestzaal Graethempoort | Feesten, FAQ, reserveren |
| `contact.html` | Contact | Openingsuren, adres, kaart, route |
| `404.html` | Foutpagina | Netjes terugleiden |

**Functioneel**
- Live **"nu open / gesloten"**-status, berekend uit één uren-tabel.
- Openingsuren-tabel met **"vandaag"** gemarkeerd.
- Donker én licht thema (volgt het systeem, met handmatige schakelaar).
- Volledig responsief, toetsenbord-toegankelijk, respecteert `prefers-reduced-motion`.
- Geen bestel- of afhaalsysteem — bestellen gebeurt aan de toonbank of telefonisch.

**Lokale SEO**
- `Restaurant`-schema met adres, geo, openingsuren, telefoon en prijsklasse.
- `Menu`-schema op de menukaart, `EventVenue` + `FAQPage` op de feestzaal.
- Breadcrumb-schema, canonicals, Open Graph, `sitemap.xml`, `robots.txt`.
- Eigen title + description per pagina, gericht op *frituur Borgloon / Haspengouw*.

---

## 2. Bestandsstructuur

```
index.html  menu.html  over-ons.html  feestzaal.html  contact.html  404.html
robots.txt  sitemap.xml  .htaccess
assets/
  css/styles.css     ← alle styling (design tokens bovenaan)
  js/main.js         ← alle interactie + de openingsuren
  img/               ← HIER KOMEN DE FOTO'S
```

---

## 3. Foto's aanleveren

De site toont nu nette getekende illustraties als terugval. Zodra je een foto
met de **juiste bestandsnaam** in `assets/img/` zet, verschijnt die automatisch —
er hoeft niets in de code te veranderen. Ontbreekt een foto, dan blijft de
illustratie staan (nooit een gebroken-afbeelding-icoon).

| Bestandsnaam | Waar | Formaat (ong.) |
|---|---|---|
| `stoofvlees-friet.jpg` | Home — grote topper | 900 × 900 |
| `bicky-burger.jpg` | Home — topper | 700 × 500 |
| `frikandel-speciaal.jpg` | Home — topper | 700 × 500 |
| `mitraillette.jpg` | Home — topper | 700 × 500 |
| `loempia.jpg` | Home — topper | 700 × 500 |
| `frituur-madelyn-buitenkant.jpg` | Home + Ons verhaal | 800 × 1000 (staand) |
| `haspengouw-bloesem.jpg` | Ons verhaal | 800 × 600 |
| `feestzaal-graethempoort.jpg` | Feestzaal | 1200 × 675 |
| `og-frituur-madelyn.jpg` | Deelafbeelding (WhatsApp/Facebook) | 1200 × 630 |
| `og-feestzaal.jpg` | Deelafbeelding feestzaal | 1200 × 630 |

> Tip: comprimeer de foto's (bv. via squoosh.app) tot onder ~300 kB per stuk.
> Dat houdt de site snel, wat ook meetelt voor SEO.

---

## 4. Vóór livegang controleren

Deze gegevens zijn samengesteld uit publieke bronnen en moeten **door Madelyn
bevestigd** worden:

- [ ] **Telefoonnummer** — nu `012 74 20 24`. Er circuleert ook `0465 64 62 25`.
- [ ] **E-mailadres** — nu `info@frituurmadelyn.be` (aangenomen).
- [ ] **Openingsuren** — nu: ma gesloten, di–do 11–14 & 16.30–22, vr–za tot 23, zo tot 22.
      Aanpassen op **één plek**: `HOURS` bovenaan `assets/js/main.js`, én de
      `openingHoursSpecification` in `index.html` + de footer-lijstjes.
- [ ] **Menukaart en prijzen** — volledige kaart nakijken in `menu.html`.
- [ ] **Reviews** — op de home staan drie **voorbeeld**-kaarten, zichtbaar
      gemarkeerd. Vervang ze door echte Google-reviews of verwijder de sectie.
      *Zet hier geen verzonnen reviews in — dat is misleidend en in strijd met
      de richtlijnen van Google.*
- [ ] **Oprichtingsjaar** — bewust nergens hard genoemd. Voeg toe als het klopt.
- [ ] **GPS-coördinaten** in de schema's (nu bij benadering: 50.8033, 5.3433).
- [ ] **Facebook-link** nakijken (staat in de footer van elke pagina).

---

## 5. Online zetten (Hostinger)

1. Log in op hPanel → **Bestandsbeheer** → map `public_html`.
2. Upload **alle** bestanden en de map `assets/` (behoud de mappenstructuur).
3. Zorg dat `.htaccess` mee geüpload is (verborgen bestand — zet "verborgen
   bestanden tonen" aan). Die regelt HTTPS, caching en de 404-pagina.
4. Koppel het domein `frituurmadelyn.be` en activeer het gratis SSL-certificaat.
5. Controleer: `https://www.frituurmadelyn.be/menu.html` moet werken.

> Werkt de site liever zonder `www`? Verwijder dan het www-blok in `.htaccess`
> en pas de canonicals/sitemap aan.

---

## 6. Lokale SEO — volgende stappen

De techniek op de site is klaar. Wat daarnaast het meeste oplevert:

1. **Google Bedrijfsprofiel** claimen/bijwerken — veruit de grootste factor voor
   "frituur Borgloon". Zorg dat naam, adres, telefoon en uren **exact** gelijk
   zijn aan de website.
2. Foto's op het bedrijfsprofiel zetten (gevel, friet, interieur, feestzaal).
3. Klanten vragen om een review; reageren op elke review.
4. Site aanmelden in **Google Search Console** en `sitemap.xml` indienen.
5. Vermeldingen gelijktrekken op Facebook, Bottin, Goudengids, Restaurantguru
   (zelfde NAW-gegevens = sterker lokaal signaal).

---

## 7. Onderhoud

- **Prijs of gerecht wijzigen** → `menu.html`.
- **Openingsuren wijzigen** → `HOURS` in `assets/js/main.js` (+ schema & footer).
- **Kleuren of lettertypes** → de tokens bovenaan `assets/css/styles.css`.

De eerdere demo mét online bestelsysteem blijft bewaard in de git-geschiedenis
(commit `3007113`), mocht Madelyn er later toch voor kiezen.
