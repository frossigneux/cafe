# Pizzeria: commande en ligne via WhatsApp

Site statique Astro, en trois langues : géorgien (`/`), anglais (`/en/`) et russe (`/ru/`).

- **Menu et réglages** : `content/menu.json` et `content/settings.json`. Le mode d'emploi pour l'équipe de la pizzeria est dans [`content/README.md`](content/README.md), en anglais.
- **En local** : `npm install`, puis `npm run dev`.

## Mise en ligne actuelle : GitHub Pages

Le site est publié sur https://frossigneux.github.io/cafe/ par le workflow `.github/workflows/deploy.yml`, à chaque commit sur `main`. Une erreur dans un fichier JSON fait échouer la compilation, avec un message dans l'onglet **Actions**, et le site en ligne garde la version précédente. Ce mode demande un dépôt public.

## Passer plus tard à Cloudflare Pages (dépôt privé possible)

Supprimez d'abord `.github/workflows/deploy.yml` et désactivez Pages dans **Settings → Pages**, puis suivez les étapes ci-dessous.

Le dépôt GitHub peut rester **privé** ; les offres gratuites de GitHub et de Cloudflare suffisent.

1. Poussez ce dossier dans un dépôt GitHub, sur la branche `main`.
2. Dans Cloudflare, ouvrez **Workers & Pages → Create → Pages → Connect to Git**. Autorisez l'accès à GitHub (vous pouvez le limiter à ce seul dépôt), puis choisissez le dépôt.
3. Réglages de compilation :
   - Framework preset : **Astro**
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Variable d'environnement : `NODE_VERSION` = `22`
4. Chaque commit sur `main` republie le site, y compris une modification faite directement sur github.com.

Si un fichier JSON contient une erreur, la compilation échoue avec un message qui indique où corriger, et le site en ligne garde la version précédente. Cloudflare affiche le résultat sur le commit dans GitHub (coche verte ou croix rouge).

## Nom de domaine

Dans le projet Cloudflare Pages, ouvrez **Custom domains → Set up a custom domain**. Si le domaine est géré chez Cloudflare, le DNS se configure tout seul ; sinon, Cloudflare indique l'enregistrement CNAME à créer chez votre registraire.

Ajoutez ensuite la variable d'environnement `SITE_ORIGIN` = `https://votre-domaine.ge`, puis relancez un déploiement. Elle sert à indiquer aux moteurs de recherche l'adresse de chaque version linguistique.
