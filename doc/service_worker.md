# Service Worker

Le service worker permet à la page de génération du bon de perception de fonctionner offline.

## Configuration du plugin

La confifguration du plugin Parcel générant les service workers se trouve dans le `package.json`. Il s'agit de la 
clé `cache`. **Cette configuration comporte quelques subtilités...**

1. Le service worker ne tourne pas en local, sur l'environnement de dev. Pour le voir en fonctionnement :
    - se rendre sur un environnement iso-prod (dev ou recette)
    - faire un build local en utilisant `yarn build` (attention, le script `postbuild` sera lancé et les node_modules seront supprimés. Vous pouvez commenter le script `postbuild` temporairement !)
2. Seule la page `index.html` est cachée par le service worker (puisque les autres pages n'ont pas de bouton de mise à jour.)
    - c'est pour cette raison que la configuration est `"navigateFallbackWhitelist": []` - cette option override la configuration par défaut du plugin qui est `navigateFallback: publicURL + "/index.html"`.

## Ressources 

- [Documentation](https://developer.mozilla.org/fr/docs/Web/API/Service_Worker_API/Using_Service_Workers)
- [Plugin parcel utilisé](https://github.com/mischnic/parcel-plugin-sw-cache#readme)
- [Documentation Workbox (utilisé par le plugin)](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-build#.generateSW)