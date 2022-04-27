# elliptic-explorer

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

### Brève description de l'architecture du projet

#### Génération de graphiques

A l'heure actuelle, nous n'utilisons que la librairie ![DesmosAPI](https://www.desmos.com/api/v1.7/docs/index.html) pour générer les graphiques.
L'ensemble de nos fonctions pour générer ces courbes sont documentées dans ![GraphicalInterfaceDocumentation/index.html](https://github.com/DanielArian/elliptic-explorer/blob/main/GraphicalInterfaceDocumentation/index.html)

Remarque: afin de pouvoir la dernière version (v1.7) dans l'environnement NodeJs, nous avons du créer un package desmosAPI
sur npmjs.com. Pour y acceder : ![https://www.npmjs.com/package/desmosapi](https://www.npmjs.com/package/desmosapi)

#### Calculs cryptographiques

Pour les calculs modulaires, nous utilisons la librairie ![elliptic](https://github.com/indutny/elliptic).
Pour le moment, nous avons uniquement implémenté l'arithmétiques modulaire sur les courbes de *Short Weierstrass*.
Vous retrouverez nos fonctions documentées dans ![/src/app/math/ShortWeierstrass.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/app/math/ShortWeierstrass.js)

#### Le site en lui même

L'architecture du site est *classique* pour une app en VueJs.
Toutefois, les remarques ci-dessous pourront vous aider à le reprendre en main.

#### Le menu latéral

Si vous souhaitez créer une nouvelle *view*, il est nécessaire de reprendre la structure
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

Cela permet au 