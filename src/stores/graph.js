import { defineStore } from 'pinia'

import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const graphStore = defineStore('graph', {
  state: () => ({
    // valeur par defaut, aucun graphique initialement dans le store
    graph: null,
    // méthodes des graphiques weierstrass sur R
    weierstrass: {
      create (a1, a3, a2, a4, a6) {
        // verifie si un graphique est déjà tracé sur la page, si oui l'efface
        if (this.graph != null) {
          this.graph.calculator.destroy();
        }
        // création du nouveau graphique
        this.graph = new WeierstrassGraph("calculator", a1, a3, a2, a4, a6);
        this.graph.showCurve();
        this.graph.addCurvePoint(0);
        this.graph.showDoublingPoint(1);
      },
      setParam (param, value) {
        this.graph.setValueOfParameter(param, value)
      }
    }
  }),
});