# მაი & Family (café, Natakhtari) : commande en ligne via WhatsApp

Site statique Astro, en trois langues : géorgien (`/`), anglais (`/en/`) et russe (`/ru/`). Le client remplit un panier puis envoie sa commande sous forme de message WhatsApp prérempli. Il n'y a ni serveur ni base de données, et aucun paiement en ligne. Le client paie au café par carte ou en espèces, ou par virement BOG ou TBC si ces options sont activées.

En ligne : https://frossigneux.github.io/cafe/

## Modifier le contenu

- **Pages CMS** (recommandé) : sur [app.pagescms.org](https://app.pagescms.org), les sections « მენიუ · Menu » et « პარამეტრები · Settings » sont des formulaires en géorgien et en anglais, décrits dans [`.pages.yml`](.pages.yml). Les photos envoyées vont dans `content/photos/`.
  - Le propriétaire se connecte avec GitHub et installe l'application Pages CMS sur ce dépôt.
  - Le personnel est invité par e-mail (**Admin → Collaborators**), sans compte GitHub.
- **Directement sur GitHub** : les fichiers `content/menu.json` et `content/settings.json`. Le mode d'emploi, en anglais, est dans [`content/README.md`](content/README.md).

Chaque enregistrement crée un commit sur `main` et republie le site en 2 minutes environ. Les données sont vérifiées à la compilation. En cas d'erreur, la publication échoue avec un message lisible dans l'onglet **Actions**, et le site en ligne garde la version précédente.

**Paramètres disponibles (`settings.json`)**

- nom du café ;
- galerie d'images du haut de page ;
- numéro WhatsApp qui reçoit les commandes ;
- horaires jour par jour, avec la possibilité de fermer un jour ;
- adresse et point sur la carte ;
- page Facebook ;
- comptes BOG et TBC, chacun activable séparément.

**Options d'un plat (`menu.json`)**

- prix et prix promo ;
- photo ;
- « disponible » (désactivé : grisé, impossible à commander) ;
- « masqué » (retiré du site mais gardé dans le fichier) ;
- par catégorie, « commandable en ligne » (désactivé pour le café et le thé, servis sur place).

## Documentation

| Document | Pour qui |
|---|---|
| [`docs/guide/`](docs/guide/) : `guide-ka.pdf` et `guide-en.pdf` | Personnel et futur informaticien. Couvre Pages CMS, GitHub, le domaine chez Worldbus.ge et Google Business Profile. Après modification des sources HTML, régénérer avec `docs/guide/build.sh`. |
| [`content/README.md`](content/README.md) | Modifier le JSON directement sur GitHub |
| [`CLAUDE.md`](CLAUDE.md) | Règles et pièges pour un agent ou un développeur |
| [`DESIGN.md`](DESIGN.md), [`PRODUCT.md`](PRODUCT.md) | Système de design et décisions produit |

## Développement

```sh
npm ci
npm run dev      # http://localhost:4321
npm run build    # même vérification que la publication
```

Faites toujours un `git pull` d'abord, car le personnel commite via Pages CMS.

| Emplacement | Rôle |
|---|---|
| `src/components/OrderPage.astro` | La page |
| `src/scripts/order.ts` | Panier, horaires, message WhatsApp |
| `src/i18n.ts` | Textes de l'interface et du message dans les 3 langues |
| `src/data/*.ts` | Chargement et validation du contenu |

L'image de partage (`public/og.jpg`) est recréée à chaque publication par `scripts/make-og.py`, à partir du nom du café et de la première image de la galerie. Polices dans `scripts/fonts/`.

## Mise en ligne actuelle : GitHub Pages

Le workflow `.github/workflows/deploy.yml` compile et publie le site à chaque commit sur `main`. L'adresse du site (origine et préfixe `/cafe/`) est fournie automatiquement par GitHub Pages. Ce mode demande un dépôt public.

### Nom de domaine (.ge chez Worldbus.ge)

1. Enregistrez le domaine sur [worldbus.ge](https://worldbus.ge/domains/) et renouvelez-le chaque année.
2. Dans le DNS Worldbus, créez :
   - quatre enregistrements `A` sur `@` : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ;
   - un enregistrement `CNAME` sur `www`, pointant vers `frossigneux.github.io.`.
3. Sur GitHub, dans **Settings → Pages → Custom domain**, saisissez le domaine, attendez la vérification DNS, puis cochez **Enforce HTTPS**. Avec un déploiement par Actions, aucun fichier `CNAME` n'est nécessaire.
4. Relancez la publication (**Actions → Publish site → Run workflow**). Les liens, le sitemap et les balises de partage passent alors sur le nouveau domaine, et le préfixe `/cafe/` disparaît.
5. Mettez à jour le lien sur Google Business Profile, Facebook et les supports imprimés.

## Alternative : Cloudflare Pages (dépôt privé possible)

Supprimez d'abord `.github/workflows/deploy.yml` et désactivez Pages dans **Settings → Pages**. Les offres gratuites de GitHub et de Cloudflare suffisent.

1. Dans Cloudflare, ouvrez **Workers & Pages → Create → Pages → Connect to Git**. Autorisez l'accès à GitHub (vous pouvez le limiter à ce dépôt), puis choisissez le dépôt.
2. Réglages de compilation :
   - Framework preset : **Astro**
   - Build command : `pip install pillow && python3 -I scripts/make-og.py && npm run build` (le début recrée l'image de partage)
   - Build output directory : `dist`
   - Variable d'environnement : `NODE_VERSION` = `22`
3. Chaque commit sur `main` republie le site. Cloudflare affiche le résultat sur le commit dans GitHub (coche verte ou croix rouge).
4. Nom de domaine :
   - Dans **Custom domains → Set up a custom domain**, Cloudflare indique l'enregistrement à créer chez Worldbus.
   - Ajoutez ensuite la variable `SITE_ORIGIN` = `https://votre-domaine.ge` et relancez un déploiement. Elle sert aux liens canoniques et aux versions linguistiques pour les moteurs de recherche.
