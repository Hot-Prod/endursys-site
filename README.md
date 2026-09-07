# EndurSys — site statique

Version préparée le 07/09/2026 pour déploiement GitHub Pages.

Dépôt cible actuel : `https://github.com/Hot-Prod/Webpage`.

## Contenu
- `index.html` : accueil
- `expertises.html`
- `methode.html`
- `missions.html`
- `cas.html` : 3 études de cas anonymisées
- `a-propos.html`
- `contact.html` + `merci.html`
- `mentions-legales.html` / `confidentialite.html`
- `assets/` : CSS, JS, logo et illustrations locales
- `sitemap.xml` / `robots.txt`

## Déploiement GitHub Pages
1. Sauvegarder l'ancien dépôt / travailler dans une branche si besoin.
2. Remplacer les fichiers du dépôt par le contenu de ce dossier.
3. Commit + push sur `main`.
4. Dans GitHub > Settings > Pages : `Deploy from a branch`, `main`, `/ (root)`.
5. Tester toutes les pages + le formulaire.

## Domaine endursys.fr
Le fichier `CNAME.example` est fourni volontairement sans activation.
Une fois `endursys.fr` acheté et les DNS configurés, le renommer en `CNAME` puis pousser le changement.

## Formulaire
Le formulaire utilise FormSubmit vers `l.garnier@hotmail.com` et redirige vers `https://endursys.fr/merci.html`.
Si le domaine n'est pas encore actif lors des tests GitHub Pages, modifier temporairement `_next` dans `contact.html` vers l'URL GitHub Pages de test.

## Points à vérifier avant publication finale
- Activation du domaine et HTTPS.
- Réception d'un test réel du formulaire.
- Exactitude des mentions légales / TVA.
- Confidentialité des chiffres des études de cas (déjà validés par Laurent dans la conversation source).
