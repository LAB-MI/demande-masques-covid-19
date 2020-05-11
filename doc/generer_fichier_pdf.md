# Génération du fichier Pdf (du bon de perception)

## Introduction

Nous générons le bon de perception dans le module `js/generer-bon-de-perception.js`.
 
Nous utilisons pour cela la bibliothèque [pdf-lib](https://github.com/Hopding/pdf-lib). C'est une des rares bibliothèques qui permettent d'éditer un Pdf existant.

Les fichiers Pdf de base se trouvent dans le dossier `src/pdf`. Le script charge un des deux fichiers en fonction de s'il s'agit d'un formulaire avec ou sans mandataire. Il y inscrit ensuite le texte et le QR Code.

## QR Code

Le QR Code est généré dans le module `js/generer-qr-code.js`.

Nous utilisons pour cela la bibliothèque [qrcode](https://github.com/soldair/node-qrcode). Elle se charge d'encoder du texte en QR Code selon une qualité et un "niveau de correction" donnés.

Le texte que nous lui fournissons est un JSON des données remplies du formulaire (Grâce à la fonction `JSON.stringify()`).

L'image générée est incluse dans le Pdf via la fonction `drawImage()`. (La même image est incluse deux fois en deux tailles différentes.)

## Écrire du texte

Les fonctions de base de `pdf-lib` sont wrappées dans une fonction utilitaire `_écrireTexteSurDocument()`, qui est une closure.

La fonction retournée prend en paramètres obligatoires `texte`, `x`, `y` pour pouvoir écrire du texte à l'abscisse `x` et à l'ordonnée `y`.
 
Par ex: `écrireTexteSurPage1(nombreMineurs, 106, 314)`.

/!\ Attention ! L'origine de l'axe de référence est en bas à gauche de la page du Pdf ! Cela implique que `y = 0` correspond à tout en bas de la page et non tout en haut ! `y = 314` correspond à 314 pixels depuis le bas de la page.

La police utilisée est HelveticaBold, soit Helvetica en gras, pour bien faire ressortir les informations ajoutées.
