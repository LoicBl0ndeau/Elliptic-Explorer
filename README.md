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

A l'heure actuelle, nous n'utilisons que la librairie DesmosAPI (v1.7, avril 2022) pour générer les graphiques.
L'ensemble de nos fonctions pour générer ces courbes sont documentées dans ![GraphicalInterfaceDocumentation/index.html](https://github.com/DanielArian/elliptic-explorer/blob/main/GraphicalInterfaceDocumentation/index.html)

#### Calculs cryptographiques

Pour les calculs modulaires, nous utilisons la librairie ![elliptic](https://github.com/indutny/elliptic).
Pour le moment, nous avons uniquement implémenté l'arithmétiques modulaire sur les courbes de *Short Weierstrass*.
Vous retrouverez nos fonctions documentées dans ![/src/app/math/ShortWeierstrass.js](https://github.com/DanielArian/elliptic-explorer/blob/main/src/app/math/ShortWeierstrass.js)

#### Le site en lui même
