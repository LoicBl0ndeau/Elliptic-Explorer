# Projet Explorateur Elliptique

![Elliptic Explorer v1](https://i.imgur.com/vnKWUWQ.gif)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

 
# Description du projet

## Technologies utilisées

Ce projet utilise le framework [VueJs](https://vuejs.org/) pour la partie front-end et [NodeJs](https://nodejs.org/en/) pour la partie back-end.

Les librairies utilisées sont visibles dans le fichier **package.json**, mais sont notamment utilisées : 
- desmosapi : librairie pour l'affichage des graphiques et des courbes
- elliptic : librairie permettant de manipuler les courbes elliptiques
- katex : librairie pour l'affichage des formules mathématiques en LaTeX

## Fonctionnement du projet 

Tout commence du fichier **Home.vue** où sont déclarés les templates HTML suivants : 
- **EnglishIntroduction** : destiné à afficher une introduction à l'application des courbes elliptiques et à en dégager une compréhension basique.
- **MyMenu** : destiné à afficher le menu de configuration de la courbe elliptique et les différents sous-menus en fonction du corps, de la forme et de la vue choisis.
-  **MyGraph** : destiné à afficher le graphique et la courbe elliptique configurée.

Un **controleur** issu du fichier **Controleur.js** et déclaré dans le fichier ***MyMenu.vue*** permet de gérer les interactions entre l'utilisateur (via les entrées des différents templates) et les propriétés de la courbe elliptique (le corps selectionné, ses différents coefficients, la vue actuellement choisie, etc...) et d'en avertir la librairie **desmos** pour actualiser le graphique situé à droite de l'écran.

Nous n'expliquerons que les templates ***MyMenu*** et ***MyGraph*** car le premier n'est que de l'affichage HTML statique.

### ***MyMenu***
 
Le menu est composé de 3 parties : 
- la définition du corps de la courbe elliptique, les choix actuels sont 'Réels' ou 'Modulo P'
- la définition de la forme de la courbe elliptique, déployant un template adapté à la forme choisie et permettant d'intéragir avec les coefficients en question et d'effectuer des opérations d'addition ou de multiplication sur les points de la courbe.
- la définition de la vue de la courbe elliptique, actualisant l'affichage du graphique en fonction de la vue souhaitée.

Le menu a été pensé pour permettre une grande flexibilité de modification à l'avenir, notamment pour l'ajout de nouveaux corps, formes ou vues.

### ***MyGraph***

Le graphique est composé de 2 parties :
### Génération de graphiques

A l'heure actuelle, nous n'utilisons que la librairie [DesmosAPI](https://www.desmos.com/api/v1.7/docs/index.html) pour générer les graphiques.
L'ensemble de nos fonctions pour générer ces courbes sont documentées dans [GraphicalInterfaceDocumentation/index.html](https://github.com/DanielArian/elliptic-explorer/blob/main/GraphicalInterfaceDocumentation/index.html)

Remarque: afin de pouvoir utiliser la dernière version (v1.7) dans l'environnement NodeJs, nous avons dû créer un package desmosAPI
sur npmjs.com. Pour y accéder : [https://www.npmjs.com/package/desmosapi](https://www.npmjs.com/package/desmosapi)

### Calculs cryptographiques

Pour les calculs modulaires, nous utilisons la librairie [elliptic](https://github.com/indutny/elliptic).
Pour le moment, nous avons uniquement implémenté l'arithmétique modulaire sur les courbes de *Short Weierstrass*.
Vous retrouverez nos fonctions documentées dans [/src/app/math/ShortWeierstrass.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/app/math/ShortWeierstrass.js)

### Le site en lui même

L'architecture du site est *classique* pour une app en VueJs.
Toutefois, les remarques ci-dessous pourront vous aider à le reprendre en main.

#### Ajouter une view

Si vous souhaitez créer une nouvelle *view* au site, il est nécessaire de reprendre la structure
suivante :

```html
<template>
  <MyMenu />
  <!-- the content outside the menu should always be
  in this "main" div. -->
  <div id="main">
    <!-- whatever you want -->
  </div>
</template>

<script>
// @ is an alias to /src
import MyMenu from "@/components/MyMenu.vue";

export default {
  name: "YourView",
  components: {
    MyMenu,
  },
};
</script>
```

Cela permet au CSS de correctement fonctionner, notamment si vous souhaitez réduire
le menu, pour réajuster le contenu aux dimensions de la page.

#### Les Stores (librairie Pinia)

Pour comprendre le concept de stores et les avantages de la libraire Pinia : 
![https://pinia.vuejs.org/introduction.html](https://pinia.vuejs.org/introduction.html)

`"Pinia is a store library for Vue, it allows you to share a state across components/pages."`

L'intérêt des stores est donc de pouvoir partager la lecture/écriture d'une même variable entre plusieurs components/pages, mais également de rendre accessibles des méthodes à tous les components/pages.

Nous utilisons deux *stores* pour cette app. 

- [src/stores/menu.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/stores/menu.js) pour centraliser certaines méthodes utilisées par les components du menu.
- [src/stores/graph.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/stores/graph.js) qui initialise l'affichage des graphiques desmosAPI à partir de notre librairie 
[GraphicalInterface](https://github.com/DanielArian/elliptic-explorer/tree/main/src/app/graph) .
De plus, elle centralise les méthodes utilisées sur le site et disponibles pour toutes les 
instances de graph générées par cette librairie. 

#### Rajouter une nouvelle courbe (sous-menu) au menu

1. Créer un component dans [src/components/menu](https://github.com/DanielArian/elliptic-explorer/tree/main/src/components/menu). Ce component doit **au minimum** avoir cette structure :

```html
<template>
  <div class="submenu">
      <!-- whatever you want -->
</template>

<script>
export default {
  name: "<YourComponentName>",
  methods: {
    displayDefaultCurve() {
      // whatever you want
    },
  }
</script>

<style lang="css" scoped >
    @import "@/css/submenu.css";
</style>
```

Pour la suite, on supposera que ce fichier est `YourComponentName.vue`.

2. Intégrer ce sous-menu au menu. 

Commencez par importer votre component dans la section *script* du component. Puis, rajouter dans
la partie *template* le code suivant :

```html
<a @click="open('<YourCurveName>')">
      <img
        id="menu-<YourCurveName>"
        class="material-icons filter-orange"
        src="images/chevron_right_black_24dp.svg"
      />
      <span class="icon-text">Title of submenu</span> </a
    ><br />
    <YourComponentName v-show="isOpen.<YourCurveName>" ref="<YourCurveName>" />
```

Puis dans la partie script, dans la méthode `data()`, rajouter une entrée au dictionnaire
`isOpen` avec le nom de votre courbe dont la valeur est false. Par exemple :

```js
isOpen: {
    about: false,
    shortmod: false,
    weierstrass: false,
    montgomery: false,
    edwards: false,
    <YourCurveName>: false,       // <-- new line added
    },
```

3. Fini !
