# Environnement de développement

## Description de l'environnement de développement

L'application de génération de bons de perception est un projet Web multi-pages dont les sources sont contenues dans 
le dosser `src/`.
Le point d'entrée de chaque page est un fichier `.html`, qui pointe vers une stylesheet `css` et des 
fichiers `javascript`.

Le projet utilise [Parcel](https://parceljs.org/) pour bundler toutes les ressources statiques. Cette application doit 
fonctionner offline, pour cela, nous utilisons le plugin 
[parcel-plugin-sw-cache](https://github.com/mischnic/parcel-plugin-sw-cache#readme). Pour obtenir plus d'informations
sur la configuration du plugin et la génération du service worker, merci de se diriger vers 
[cette page](./service_worker.md).

## Prérequis

Le projet utilise [Parcel](https://parceljs.org/) pour bundler l'ensemble des assets. Pour tourner, il nécessite 
l'installation de Node.js. 

**Installation de Node.js**

Pour installer Node, nous utilisons [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm/blob/master/README.md), 
qu'il faudra installer en premier. Une fois nvm installé, il faudra l'utiliser pour télécharger la version de Node 
utilisée par le projet. Pour cela :

```shell script
cd chemin/vers/le/projet

nvm install
```

La commande `nvm install` va installer automatiquement la version de Node inscrite dans le fichier `.nvmrc`.

**Installation de Yarn**

Nous utilisons `yarn` pour installer nos dépendances et lancer le projet. Pour installer `yarn`, se
réferrer à [la documentation officielle](https://classic.yarnpkg.com/fr/docs/install/).

Une fois `yarn` installé, nous pouvons installer les dépendances du projet en utilisant la commande suivante :

````shell script
cd chemin/vers/le/projet

yarn install
````

## Lancement du projet

Pour lancer le projet en développement, utiliser la commande `yarn start`.
Le projet sera accessible à l'adresse [http://localhost:1234](http://localhost:1234).

## FAQ

### J'ai des erreurs étranges lorsque j'exécute yarn start

Si des erreurs apparaissent lors du lancement du serveur de développement :

**Nettoyer le cache des builds précédents**

Pour cela, exécuter `rm -rf .cache dist`.

**Réinstaller les node_modules**

Si cela ne fonctionne pas, essayer de réinstaller le projet :

```shell script
rm -rf node_modules

yarn install
```