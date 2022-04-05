import { defineStore } from 'pinia'

import { WeierstrassGraph } from "@/app/graph/supported_curves_on_R/weierstrass/WeierstrassGraph.js";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const graphStore = defineStore('graph', {
  state: () => ({
    // valeur par defaut
    graph: null,
    weierstrass: {
      create (a1, a3, a2, a4, a6) {
        if (this.graph != null) {
          this.graph.calculator.destroy();
        }
        this.graph = new WeierstrassGraph("calculator", a1, a3, a2, a4, a6);
        this.graph.showCurve();
      },
    }
  }),
});