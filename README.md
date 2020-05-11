# Covid-19 : Demande des masques pour le grand public

Application destinée au grand public pour éditer un bon de perception de masques

*Une documentation plus détaillée se trouve dans le dossier [./doc](./doc).*

## Développer

### Installer le projet

```shell script
# Installer les dépendances
yarn

# Lancer le projet
yarn start
```

## Lancer les tests

Vous pouvez lancer les tests automatisés unitaires grâce à l'utilitaire Jest en lançant une des commandes suivantes

```shell script
# Lancer les tests une fois
yarn test

# Lancer les tests à chaque modification de fichiers
yarn test:watch
```

Vous pouvez lancer les tests de navigateur grâce à l'utilitaire Cypress en lançant une des commandes suivantes

```shell script
# Lancer les tests dans le terminal
yarn test:browser

# Lancer les tests via l'interface Cypress
yarn test:browser:open
```

### Générer le code de production

```shell script
yarn build
```

## Configuration et Hébergement

 * L'application peut être hébergée sur n'importe quel fournisseur.
 * Le paragraphe suivant indique la procédure à suivre pour un hébergement sur Scalingo

### Exemple : configuration pour Scalingo

Les variables d'environnements suivantes doivent être renseignées dans l'interface
Scalingo :

* `BUILDPACK_URL` Doit être valorisé à `https://github.com/Scalingo/multi-buildpack.git`
  afin de pouvoir utiliser plusieurs buildpack (cf le fichier `.buildpacks`)
* `ELK_URL` L'url de logstash avec la basic auth
* `NGINX_VERSION` La version de nginx à utiliser
* `NPM_CONFIG_PRODUCTION` À mettre à true pour builder sans les dev dependencies
* `PUBLIC_URL` À mettre à / pour que ça fonctionne avec la conf nginx
* `ACTIVATE_ANALYTICS` A mettre à true / false pour activer ou désactiver le script d'analytics AT Internet

Pour faire ça de manière automatique, il faut setter la variable `env_name` à `dev`, `recette` ou `prod` avant de démarrer.
```bash
export env_name=dev
scalingo --app demandeur-${env_name} env-set BUILDPACK_URL=https://github.com/Scalingo/multi-buildpack.git
eval $(scalingo -a logstash-${env_name} env | grep "^PASSWORD=" )
eval $(scalingo -a logstash-${env_name} env | grep "^USER=" )
LOGSTASH_URL=https://${USER}:${PASSWORD}@logstash-${env_name}.osc-fr1.scalingo.io
scalingo --app demandeur-${env_name} env-set ELK_URL=${LOGSTASH_URL}
scalingo --app demandeur-${env_name} env-set NGINX_VERSION=1.17.6
scalingo --app demandeur-${env_name} env-set NPM_CONFIG_PRODUCTION=true
scalingo --app demandeur-${env_name} env-set PUBLIC_URL=/
scalingo --app demandeur-${env_name} env-set ACTIVATE_ANALYTICS=false
```

### Forcer le https

```bash
scalingo --app demandeur-${env_name} force-https
```

## Crédits

Ce projet a été réalisé à partir d'un fork du dépôt [deplacement-covid-19](https://github.com/LAB-MI/deplacement-covid-19).

Les projets open source suivants ont été utilisés pour le développement de ce service :

- [PDF-LIB](https://pdf-lib.js.org/)
- [qrcode](https://github.com/soldair/node-qrcode)
- [Parcel](https://parceljs.org/)
