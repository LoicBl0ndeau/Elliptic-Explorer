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

Ce projet utilise le framework [**VueJs**](https://vuejs.org/) pour la partie front-end et [**NodeJs**](https://nodejs.org/en/) pour la partie back-end.

Les librairies utilisées sont visibles dans le fichier **package.json**, mais sont notamment utilisées : 
- **desmosapi** : librairie pour l'affichage des graphiques et des courbes.
- **elliptic** : librairie permettant de manipuler les courbes elliptiques et d'effectuer des calculs cryptographiques.
- **katex** : librairie pour l'affichage des formules mathématiques en LaTeX.

## Fonctionnement technique du projet 

Tout commence du fichier **Home.vue** où sont déclarés les templates HTML suivants : 
- **EnglishIntroduction.vue** : destiné à afficher une introduction à l'application des courbes elliptiques et à en dégager une compréhension basique. 
Son équivalent en français est disponible dans le fichier **FrenchIntroduction.vue**.
- **MyMenu.vue** : destiné à afficher le menu de configuration de la courbe elliptique et les différents sous-menus en fonction du corps, de la forme et de la vue choisis.
-  **MyGraph.vue** : destiné à afficher le graphique et la courbe elliptique configurée.

Un **controleur**, issu du fichier **Controleur.js** et déclaré dans le fichier ***MyMenu.vue***, permet de gérer les interactions entre l'utilisateur (via les entrées des différents templates) et les propriétés de la courbe elliptique (le corps selectionné, ses différents coefficients, la vue actuellement choisie, etc...) et d'en avertir la librairie **desmos** pour actualiser le graphique situé à droite de l'écran.

Nous n'expliquerons que les templates ***MyMenu*** et ***MyGraph*** car le premier n'est que de l'affichage HTML statique.

### ***MyMenu***
 
Le menu est composé de 3 parties : 
- la ***définition du corps de la courbe elliptique***, les choix disponibles sont "**Réels**" ou "**Modulo P**".
- la ***définition de la forme de la courbe elliptique***, déployant un template adapté à la forme choisie et permettant d'intéragir avec les coefficients en question et d'effectuer des opérations d'addition ou de multiplication sur les points de la courbe. Les formes actuellement disponibles sont "**Short Weierstrass**", "**Weierstrass**", "**Montgomery**" et "**Edwards**".
- la ***définition de la vue de la courbe elliptique***, actualisant l'affichage du graphique en fonction de la vue souhaitée. Les vues actuellement disponibles dans le corps des réels sont "**Vue 2D**", "**Vue 3D**" et "**Vue en perspective**" tandis que dans le corps modulo p ce sont "**Vue finie**" et "**Vue periodique**". Seules les vues 2D, finie et periodique sont implémentées pour le moment. 

Le menu a été pensé pour permettre une grande flexibilité de modification à l'avenir, notamment pour l'ajout de nouveaux corps, formes ou vues.
N'oubliez cependant pas de déclarer ces nouveaux états dans les classes "**Corps.js**", "**Forms.js**" et "**Views.js**" qui sont des énumérations utilisées dans le controleur pour définir les états actuels de la courbe elliptique.

### ***MyGraph***

Le graphique est simplement une balise **div** dont l'id est **"graph-div"** contenant une div indispensable d'id **"calculator"** dans laquelle sont affichés tous les appels **desmos**.


### **Génération de graphiques**

A l'heure actuelle, nous n'utilisons que la librairie [DesmosAPI](https://www.desmos.com/api/v1.7/docs/index.html) pour générer les graphiques.
L'ensemble de nos fonctions pour générer ces courbes sont documentées dans [GraphicalInterfaceDocumentation/index.html](https://github.com/DanielArian/elliptic-explorer/blob/main/GraphicalInterfaceDocumentation/index.html)

Remarque: afin de pouvoir utiliser la dernière version (v1.7) dans l'environnement NodeJs, nous avons dû créer un package desmosAPI
sur npmjs.com. Pour y accéder : [https://www.npmjs.com/package/desmosapi](https://www.npmjs.com/package/desmosapi)

### **Calculs cryptographiques**

Pour les calculs modulaires, nous utilisons la librairie [elliptic](https://github.com/indutny/elliptic).
Vous retrouverez nos fonctions documentées dans [/src/app/math/ShortWeierstrass.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/app/math/ShortWeierstrass.js)

### **Le site en lui même**

L'architecture du site est *classique* pour une app en VueJs.
Toutefois, les remarques ci-dessous pourront vous aider à le reprendre en main.

#### **Ajouter une view**

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

Cela permet au CSS de correctement fonctionner, notamment si vous souhaitez réduire le menu, pour réajuster le contenu aux dimensions de la page.

#### **Les Stores (librairie Pinia)**

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
    updateAll() {
      // update the inputs value
    },
    // whatever you want
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
<template>
  <div id="mySidebar" ...>
  <!-- Pin icon : keep the menu attached or not -->
  <!-- Graph settings icon -->
  <!-- Graph settings section : ... -->
  <!-- Corps section -->
  <!-- Equation section -->
    <div id="equation">
      <h1>
        Equation definition
      </h1>

      <h2>
        Form :
        <select name="form" id="form" @change="formChange()">
          <option value="Undefined" selected>Undefined</option>
          <option value="ShortWeierstrass">Short Weierstrass</option>
          <option value="Weierstrass">Weierstrass</option>
          <option value="Montgomery">Montgomery</option>
          <option value="Edwards">Edwards</option>
          <option value="NewForm">New Form</option> // <-- add this line
          // "NewForm" doit être une énumération existante dans Form.js
        </select>
      </h2>

      <p id="warningForm">Please choose a form.</p>

      <MenuShortWeierstrass ... />
      <MenuWeierstrass ... />
      <MenuEdwards ... />
      <MenuMontgomery ... />
      <YourComponentName v-show="isOpen.NewForm" ref="YourComponentName" :controleur='controleurReference' /> // <-- add this line
    </div>

    <!-- Views section -->
    <!-- About section -->
    </div>
</template>

<script>
// some imports
import YourComponentName from "@/components/menu/YourComponentName.vue"; // <-- add

export default {
  name: "MyMenu",
  components: {
    MenuShortWeierstrass,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards,
    YourComponentName, // <-- add this line
  },
  setup() {
    ...
  },
  mounted() {
    ...
  },
  data() {
    return {
      controleurReference: controleur,
      isOpen: {
        about: false,
        Undefined: false,
        ShortWeierstrass: false,
        Weierstrass: false,
        Montgomery: false,
        Edwards: false,
        YourComponentName: false, // <-- add this line
      },
      ...
    };
  },
  methods: {
    ...
  }
}
<style lang="css" scoped>
@import "@/css/menu.css";
</style>
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
    YourComponentName: false,    // <-- new line added
    },
```

3. Fini !

## Améliorations apportées au projet

Ne jamais oublier ceux qui ont contribué à ce projet !

### **Equipe V1**
Aucune donnée

### **Equipe V2**
Aucune donnée

### **Equipe V3**
Aucune donnée

### **Equipe V4** 
Equipe : Sheron Millien, Loïc Blondeau, Loïc Géneau de Lamarlière, Maxence Verbeke, Swan Jean-de-Dieu, Paul Hornain 
- Harmonisation du projet en anglais **EVERYWHERE** (variables, fonctions, commentaires, etc...)
- Restructuration de l'arborescence de fichiers de manière logique et cohérente
- Restructuration et refonte du menu et des sous-menus 
- Centralisation des propriétés de la courbe (corps, forme, vue) dans un controleur unique et accessible depuis tous les sous-menus
- Implémentation des interactions "utilisateur-contrôleur"
- Implémentation de la vue 2D et périodique pour la forme Short Weierstrass
- Fixes de bugs de la vue finie sous la forme Short Weierstrass
- Fixes de problèmes de sécurité liées aux dépendances
- Amélioration des affichages LaTex des équations et des discrimiants (affichage de l'équation générale et actuelle, affichage dynamique de la valeur des variables, mise en évidence des variables, affichage du discrimiant et de son résultat) 