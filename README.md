# Frituur Madelyn — website

Website voor Frituur Madelyn, Graethempoort 6, 3840 Borgloon.
Gebouwd door EM Launchpad. Gewone HTML en CSS, geen build-stap: de bestanden
kunnen zo naar Hostinger.

## Pagina's

| Bestand | Inhoud |
|---|---|
| `index.html` | Foto, korte welkomsttekst, klassiekers, feestzaal, openingsuren, adres en kaart |
| `menu.html` | Menukaart met prijzen |
| `feestzaal.html` | Feestzaal Graethempoort, met veelgestelde vragen |
| `404.html` | Foutpagina |

Verder: `assets/css/styles.css`, `assets/js/main.js`, `assets/img/favicon.svg`,
`sitemap.xml`, `robots.txt`, `.htaccess`.

## Foto's

De foto's komen van [Pexels](https://www.pexels.com/license/): gratis te gebruiken,
ook commercieel, naamsvermelding niet verplicht. Ze worden nu rechtstreeks van
Pexels geladen.

| Waar | Foto | Fotograaf |
|---|---|---|
| Home, bovenaan | [Freshly Fried French Fries](https://www.pexels.com/photo/15234683/) | Wijs |
| Home, welkom | [French Fries Being Deep Fried](https://www.pexels.com/photo/8879636/) | Ron Lach |
| Home, friet | [French Fries with Ketchup and Mayonnaise](https://www.pexels.com/photo/20205481/) | — |
| Home, burgers | [Hamburger and Fries](https://www.pexels.com/photo/2983101/) | Jonathan Borba |
| Home, stoofvlees | [A Stew Dish in Macro Shot](https://www.pexels.com/photo/8024112/) | Mateusz Feliksik |
| Home + feestzaal | [People Giving a Toast](https://www.pexels.com/photo/8507671/) | Kampus Production |
| Menukaart | [French Fries on White Paper](https://www.pexels.com/photo/12946719/) | — |

**Voor livegang aanbevolen:** download ze (breedte ±1600 px), zet ze in
`assets/img/` en vervang de `images.pexels.com`-links door het lokale pad.
Dan laadt de site sneller en hangt ze niet af van Pexels.

**Nog beter:** vervang ze door eigen foto's van de zaak. Een foto van de gevel
en van de echte feestzaal ontbreekt bewust: een stockfoto zou die verkeerd
voorstellen.

## Nog te bevestigen door Madelyn

- [ ] **Openingsuren.** Nu: elke dag 11:00–14:00 en 16:30–22:00, vrijdag en
      zaterdag tot 23:00. Bronnen spreken elkaar tegen. Aanpassen op drie
      plekken: `HOURS` in `assets/js/main.js`, de tabel in `index.html` en de
      `openingHoursSpecification` in `index.html`.
- [ ] **Telefoon.** Nu `012 74 20 24`. Er circuleert ook `0465 64 62 25`.
- [ ] **E-mail.** `info@frituurmadelyn.be` is aangenomen.
- [ ] **Menukaart en prijzen** in `menu.html` — de gerechten komen uit
      publieke bronnen, de prijzen zijn een inschatting.
- [ ] **Coördinaten** in de structured data (nu bij benadering 50.8033, 5.3433).

## Online zetten (Hostinger)

1. hPanel → Bestandsbeheer → `public_html`.
2. Upload alle bestanden en de map `assets/`. Zet "verborgen bestanden tonen"
   aan zodat `.htaccess` mee gaat.
3. Koppel `frituurmadelyn.be` en zet SSL aan.
4. Meld de site aan bij Google Search Console en dien `sitemap.xml` in.

## Lokale SEO

Op de site: per pagina een eigen titel en beschrijving, één H1, alt-teksten,
structured data (`Restaurant`, `Menu`, `EventVenue`, `FAQPage`, breadcrumbs),
sitemap en canonicals.

Wat buiten de site het meeste oplevert: het **Google Bedrijfsprofiel**. Zorg dat
naam, adres, telefoon en openingsuren daar exact gelijk zijn aan de website, zet
er eigen foto's op en vraag klanten om een review.
