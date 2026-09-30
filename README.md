# EndurSys — site statique

Version préparée le 07/09/2026 pour déploiement GitHub Pages.

Dépôt : `https://github.com/Hot-Prod/endursys-site` — publié via GitHub Pages sur `https://endursys.fr/` (fichier `CNAME`).

## Contenu
- `index.html` : accueil
- `expertises.html`
- `methode.html`
- `missions.html`
- `cas.html` : 3 études de cas anonymisées
- `a-propos.html`
- `contact.html` + `merci.html`
- `mentions-legales.html` / `confidentialite.html`
- `faq.html` : questions fréquentes (balisage `FAQPage`)
- `llms.txt` : résumé du site pour les assistants IA
- `assets/` : CSS, JS, logo et illustrations locales
- `sitemap.xml` / `robots.txt`

## Déploiement GitHub Pages
1. Sauvegarder l'ancien dépôt / travailler dans une branche si besoin.
2. Remplacer les fichiers du dépôt par le contenu de ce dossier.
3. Commit + push sur `main`.
4. Dans GitHub > Settings > Pages : `Deploy from a branch`, `main`, `/ (root)`.
5. Tester toutes les pages + le formulaire.

## Domaine endursys.fr
Actif : DNS chez OVH (A/AAAA GitHub Pages), fichier `CNAME` = `endursys.fr`, HTTPS servi par GitHub Pages.

## Formulaire
Le formulaire utilise FormSubmit vers `laurent@endursys.fr` et redirige vers `https://endursys.fr/merci.html`.

## Mesure d'audience
GA4 (`assets/analytics.js`) chargé uniquement après consentement explicite (bandeau Accepter / Refuser).

## Points encore ouverts
- Fiabilité du formulaire FormSubmit (test réel à renouveler).
- Direction graphique des visuels (remplacement des illustrations SVG).


## Mise à jour visuelle et études de cas
- Visuels locaux originaux, sans photo client ni dépendance externe.
- Les trois études de cas ont été resserrées en format Situation / Risque / Intervention / Impact.
- Adresse de contact et endpoint FormSubmit : `laurent@endursys.fr` (activation FormSubmit confirmée le 20/09/2026).
