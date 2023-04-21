# Projet : Explorateur Elliptique

![Elliptic Explorer v1](https://i.imgur.com/vnKWUWQ.gif)

---

[Version française](#french)

[English version](#english)

---

<a id="french"></a>
# Version française


## Configuration du projet
Veuillez prendre connaissance de ces étapes pour configurer correctement le projet sur votre machine.

### Installation des dépendances
```
npm install
```

### Compilation et rechargement à chaud pour le développement
```
npm run serve
```

### Compilation et minification pour la production
```
npm run build
```

### Linter et correction de fichiers
```
npm run lint
```

### Personnalisation de la configuration
Voir [Référence de configuration](https://cli.vuejs.org/config/).

---
## Description du projet

### Technologies utilisées

Ce projet utilise le framework [**VueJs**](https://vuejs.org/) pour la partie front-end et [**NodeJs**](https://nodejs.org/en/) pour la partie back-end.

Les librairies utilisées sont visibles dans le fichier **package.json**, mais sont notamment utilisées : 
- **desmosapi** : librairie pour l'affichage des graphiques et des courbes.
- **elliptic** : librairie permettant de manipuler les courbes elliptiques et d'effectuer des calculs cryptographiques.
- **katex** : librairie pour l'affichage des formules mathématiques en LaTeX.

### **Fonctionnement technique du projet** 

Tout commence du fichier **Home.vue** où sont déclarés les templates HTML suivants : 
- **EnglishIntroduction.vue** : destiné à afficher une introduction à l'application des courbes elliptiques et à en dégager une compréhension basique. 
Son équivalent en français est disponible dans le fichier **FrenchIntroduction.vue**.
- **MyMenu.vue** : destiné à afficher le menu de configuration de la courbe elliptique et les différents sous-menus en fonction du corps, de la forme et de la vue choisis.
-  **MyGraph.vue** : destiné à afficher le graphique et la courbe elliptique configurée.

Un **controleur**, issu du fichier **Controleur.js** et déclaré dans le fichier ***MyMenu.vue***, permet de gérer les interactions entre l'utilisateur (via les entrées des différents templates) et les propriétés de la courbe elliptique (le corps selectionné, ses différents coefficients, la vue actuellement choisie, etc...) et d'en avertir la librairie **desmos** pour actualiser le graphique situé à droite de l'écran.

Nous n'expliquerons que les templates ***MyMenu*** et ***MyGraph*** car le premier n'est que de l'affichage HTML statique.

#### ***MyMenu***
 
Le menu est composé de 3 parties : 
- la ***définition du corps de la courbe elliptique***, les choix disponibles sont "**Réels**" ou "**Modulo P**".
- la ***définition de la forme de la courbe elliptique***, déployant un template adapté à la forme choisie et permettant d'intéragir avec les coefficients en question et d'effectuer des opérations d'addition ou de multiplication sur les points de la courbe. Les formes actuellement disponibles sont "**Short Weierstrass**", "**Weierstrass**", "**Montgomery**" et "**Edwards**".
- la ***définition de la vue de la courbe elliptique***, actualisant l'affichage du graphique en fonction de la vue souhaitée. Les vues actuellement disponibles dans le corps des réels sont "**Vue 2D**", "**Vue 3D**" et "**Vue en perspective**" tandis que dans le corps modulo p ce sont "**Vue finie**" et "**Vue periodique**". Seules les vues 2D, finie et periodique sont implémentées pour le moment. 

Le menu a été pensé pour permettre une grande flexibilité de modification à l'avenir, notamment pour l'ajout de nouveaux corps, formes ou vues.
N'oubliez cependant pas de déclarer ces nouveaux états dans les classes "**Corps.js**", "**Forms.js**" et "**Views.js**" qui sont des énumérations utilisées dans le controleur pour définir les états actuels de la courbe elliptique.

#### ***MyGraph***

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

### **Rajouter une nouvelle courbe (sous-menu) au menu**

1. Créer un component dans [src/components/menu](https://github.com/DanielArian/elliptic-explorer/tree/main/src/components/menu). Ce component doit **au minimum** avoir cette structure, afin d'interagir correctement avec le controlleur et de pouvoir afficher une courbe provenant de l'API Desmos :

```html
<template>
  <div class="submenu">
    <!-- whatever you want -->
</template>

<script>
export default {
  name: "YourComponentName",
  props: {
    controleur: {
      type: Object,
      required: true
    }
  },
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();

    return { graphS, menuS };
  },
  methods: {
    updateAll() {
      // update the inputs value regarding controller coefficients
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

Dans ***MyMenu.vue***, commencez par importer votre component `YourComponentName` dans la section **script** : 

```html
<script>
// some imports
import YourComponentName from "@/components/menu/YourComponentName.vue"; // <-- add

export default {
  name: "MyMenu",
  components: {
    MenuShortWeierstrass,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards
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
        NewForm: false, // <-- add this line
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

Puis rajouter dans la partie **template** les lignes précédant un commentaire 'add', pour ouvrir votre nouvelle vue une fois celle-ci selectionnée dans la selection des formes :

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
```

3. Fini ! Votre template est maintenant accessible depuis le menu, et vous pouvez y intégrer vos propres méthodes et variables tout en interagissant avec le controlleur.

## **Améliorations apportées au projet**

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

---

<a id="english"></a>

# English Version

## Project Configuration
Please follow these steps to properly configure the project on your machine.

### Installing Dependencies
```
npm install
```

### Compiling and Hot-reloading for Development
```
npm run serve
```

### Compiling and Minifying for Production
```
npm run build
```

### Linting and Fixing Files
```
npm run lint
```

### Customizing Configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

---
## Project Description

### Technologies Used

This project uses the [**VueJs**](https://vuejs.org/) framework for the front-end and [**NodeJs**](https://nodejs.org/en/) for the back-end.

The libraries used can be found in the **package.json** file, but notably include:
- **desmosapi** : library for displaying graphs and curves.
- **elliptic** : library for manipulating elliptic curves and performing cryptographic calculations.
- **katex** : library for displaying mathematical formulas in LaTeX.

### **Technical Operation of the Project** 

Everything starts from the **Home.vue** file where the following HTML templates are declared:
- **EnglishIntroduction.vue** : designed to display an introduction to elliptic curve applications and provide basic understanding. 
Its French equivalent is available in the **FrenchIntroduction.vue** file.
- **MyMenu.vue** : designed to display the elliptic curve configuration menu and the different sub-menus depending on the chosen field, form, and view.
-  **MyGraph.vue** : designed to display the configured graph and elliptic curve.

A **controller**, from the **Controleur.js** file and declared in the ***MyMenu.vue*** file, manages interactions between the user (via inputs from the different templates) and the properties of the elliptic curve (selected field, its different coefficients, currently chosen view, etc.) and notifies the  **desmos** library to update the graph located on the right side of the screen.

We will only explain the ***MyMenu*** and ***MyGraph*** templates because the first is only for static HTML display.

#### ***MyMenu***
 
The menu consists of 3 parts:
- the **definition of the elliptic curve field**, with available choices being "**Real**" or "**Modulo P**".
- the **definition of the elliptic curve form**, displaying a template adapted to the chosen form and allowing interaction with the relevant coefficients and performing addition or multiplication operations on the points of the curve. The currently available forms are "**Short Weierstrass**", "**Weierstrass**", "**Montgomery**", and "**Edwards**".
- the **definition of the elliptic curve view**, updating the graph display depending on the desired view. The currently available views in the real field are "**2D View**", "**3D View**", and "**Perspective View**", while in the modulo p field they are "**Finite View**" and "**Periodic View**". Only 2D, finite, and periodic views are currently implemented.

The menu was designed to allow for great flexibility in future modifications, particularly for adding new fields, forms, or views.
However, don't forget to declare these new states in the "**Corps.js**", "**Forms.js**", and "**Views.js**" classes, which are enumerations used in the controller to define the current states of the elliptic curve.

#### ***MyGraph***

The graph is simply a **div** tag with the id "**graph-div**" containing an essential div with the id "**calculator**" in which all **desmos** calls are displayed.


### **Generating Graphs**

At present, we only use the [DesmosAPI](https://www.desmos.com/api/v1.7/docs/index.html) library to generate graphs.
All of our functions for generating these curves are documented in [GraphicalInterfaceDocumentation/index.html](https://github.com/DanielArian/elliptic-explorer/blob/main/GraphicalInterfaceDocumentation/index.html)

Note: In order to use the latest version (v1.7) in the NodeJs environment, we had to create a desmosAPI package on npmjs.com. To access it:[https://www.npmjs.com/package/desmosapi](https://www.npmjs.com/package/desmosapi)

### **Cryptographic Calculations**

For modular calculations, we use the [elliptic](https://github.com/indutny/elliptic) library.
You will find our functions documented in [/src/app/math/ShortWeierstrass.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/app/math/ShortWeierstrass.js)

### **The Website Itself**

The architecture of the website is standard for a VueJs app.
However, the remarks below may help you to take control of it.

#### **Adding a View**

If you want to create a new view on the site, you need to follow the following structure:

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

This allows CSS to work properly, especially if you want to reduce the menu, to adjust the content to the dimensions of the page.

#### **The Stores (Pinia library)**

To understand the concept of stores and the benefits of the Pinia library: ![https://pinia.vuejs.org/introduction.html](https://pinia.vuejs.org/introduction.html)

`"Pinia is a store library for Vue, it allows you to share a state across components/pages."`

The interest of stores is therefore to be able to share the reading/writing of the same variable between several components/pages, but also to make methods accessible to all components/pages.

We use two *stores* for this app.

- [src/stores/menu.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/stores/menu.js) to centralize certain methods used by menu components.
- [src/stores/graph.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/stores/graph.js) which initializes the display of desmosAPI graphs from our library
[GraphicalInterface](https://github.com/DanielArian/elliptic-explorer/tree/main/src/app/graph).
Additionally, it centralizes the methods used on the site and available to all instances of graphs generated by this library.

### **Adding a new curve (submenu) to the menu**

1. Create a component in [src/components/menu](https://github.com/DanielArian/elliptic-explorer/tree/main/src/components/menu). This component must **at minimum** have this structure, in order to interact correctly with the controller and be able to display a curve from the Desmos API:

```html
<template>
  <div class="submenu">
    <!-- whatever you want -->
</template>

<script>
export default {
  name: "YourComponentName",
  props: {
    controleur: {
      type: Object,
      required: true
    }
  },
  setup() {
    const graphS = graphStore();
    const menuS = menuStore();

    return { graphS, menuS };
  },
  methods: {
    updateAll() {
      // update the inputs value regarding controller coefficients
    },
    // whatever you want
  }
</script>

<style lang="css" scoped >
    @import "@/css/submenu.css";
</style>
```

For the rest, we will assume that this file is `YourComponentName.vue`.

2. Integrate this submenu into the menu.

In ***MyMenu.vue***, start by importing your `YourComponentName` component in the **script** section: 

```html
<script>
// some imports
import YourComponentName from "@/components/menu/YourComponentName.vue"; // <-- add

export default {
  name: "MyMenu",
  components: {
    MenuShortWeierstrass,
    MenuWeierstrass,
    MenuMontgomery,
    MenuEdwards
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
        NewForm: false, // <-- add this line
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

Then, add in the **template** section the lines preceding a 'add' comment, to open your new view once it is selected in the form selection:

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
```

3. Done! Your template is now accessible from the menu, and you can integrate your own methods and variables while interacting with the controller.

## **Improvements made to the project**

Never forget those who contributed to this project!

### **Equipe V1**
No data.

### **Equipe V2**
No data.

### **Equipe V3**
No data.

### **Equipe V4** 
Team : Sheron Millien, Loïc Blondeau, Loïc Géneau de Lamarlière, Maxence Verbeke, Swan Jean-de-Dieu, Paul Hornain 
- Harmonization of the project in English EVERYWHERE (variables, functions, comments, etc...)
- Restructuring of file tree in a logical and coherent way
- Restructuring and redesign of the menu and submenus
- Centralization of curve properties (body, form, view) in a single controller accessible from all submenus
- Implementation of "user-controller" interactions
- Implementation of 2D and periodic view for Short Weierstrass form
- Fixes for bugs in finite view under Short Weierstrass form
- Fixes for security issues related to dependencies
- Improvement of LaTex display of equations and discriminants (display of general and current equation, dynamic display of variable values, highlighting of variables, display of discriminant and its result)